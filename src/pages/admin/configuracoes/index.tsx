import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { getAPIClient } from "../../../services/axios";
import { api } from "../../../services/api";
import { formatTimeZero } from "../../../utils/format";
import { useForm } from "react-hook-form";

import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import { ProfileComponent } from "../../../components/profile";
import MainComponent from "../../../components/main";
import MenuAdminComponent from "../../../components/menu-admin";
import ButtonComponent from "../../../components/button";
import LoadingComponent from "../../../components/loading";
import ModalComponent from "../../../components/modal";

import styles from "./Configurations.module.css";

type SubmittedProps = {
    isSubmitted: boolean;
    status: number;
    message: string;
    action: () => void;
}

export default function Configurations() {
    const [parkingId, setParkingId] = useState<string | null>(null);
    const [open, setOpen] = useState<string | null>(null);
    const [close, setClose] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<SubmittedProps>({ isSubmitted: false, status: 200, message: "OK", action: () => { } });
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (!open && !close && !parkingId) {
            console.log("Dados estacionamento");

            api.get("/parking/info")
                .then(response => {
                    setParkingId(response.data.id);
                    setOpen(formatTimeZero(response.data.opening_time));
                    setClose(formatTimeZero(response.data.closing_time));
                })
                .catch(err => {
                    console.error(err);
                }).finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1 * 1000);
                })
        }
    }, [open, close, parkingId]);

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const response = await api.put(`/parking/${parkingId}`, data);
            console.log(response);
            setSubmitted({
                isSubmitted: true,
                status: response.status,
                message: response.data.message,
                action: () => Router.reload()
            });

        } catch (error) {
            console.error(error);
            setSubmitted({
                isSubmitted: true,
                status: error.response.status,
                message: error.response.data.message,
                action: () => setSubmitted({ ...submitted, isSubmitted: false })
            });
        }
    }

    return (
        <div className="bg-dark">
            <HeadComponent title="Configurações do Administrador - SmartVaga" description="Configurações da administração na aplicação SmartVaga." />

            <HeaderComponent logoLink="/admin">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                <div className={`main-container`}>
                    <div className="container bg-dark">
                        {isLoading ? <LoadingComponent /> :
                            <div className={styles.wrapper}>
                                <div className={styles.backPage}>
                                    <Link href={"/admin"}>
                                        <Image src={"/icons/icon-arrow-back.svg"} alt={"início"} width={14} height={12.25} />
                                        <span>Início</span>
                                    </Link>
                                </div>

                                <section className={styles.section1}>
                                    <div className={styles.header}>
                                        <h3>Horário do Estacionamento</h3>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="">Abertura:</label>
                                            <input {...register("opening_time")} type="text" minLength={5} maxLength={5} className={styles.input} value={open as string} onChange={(e) => setOpen(e.target.value)} required={true} />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="">Fechamento:</label>
                                            <input {...register("closing_time")} type="text" minLength={5} maxLength={5} className={styles.input} value={close as string} onChange={(e) => setClose(e.target.value)} required={true} />
                                        </div>

                                        <div className={styles.btnGroup}>
                                            <ButtonComponent text={"Salvar"} type={"submit"} style={"btn btn-primary btn-small"} />
                                        </div>
                                    </form>
                                </section>

                                {submitted.isSubmitted &&
                                    <ModalComponent status={submitted.status} message={submitted.message} textBtn={"Entendi"} action={submitted.action} />
                                }
                            </div>
                        }
                    </div>
                    <div className={`menu-left`}>
                        <MenuAdminComponent />
                    </div>
                </div>
            </MainComponent>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 'smartvaga.token': token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = await apiClient.get('/profile');

    if (!user.data.isAdmin) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}