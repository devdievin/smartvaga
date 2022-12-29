import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";
import { formatTimeZero } from "../../utils/format";
import moment from "moment";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { ProfileComponent } from "../../components/profile";
// import { ContentMenuComponent } from "../../components/content-menu";
import ButtonComponent from "../../components/button";
import LoadingComponent from "../../components/loading";
import ExpiredTagComponent from "../../components/expired-tag";
import ModalComponent from "../../components/modal";

import styles from "./ShowReserve.module.css";
import Image from "next/image";

export default function ShowReserve() {
    const router = useRouter();
    const { id } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [reserveResponseStatus, setReserveResponseStatus] = useState(200);
    const [reserveResponseMessage, setReserveResponseMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [reserve, setReserve] = useState<any>();

    useEffect(() => {
        api.get(`/reserve/${id}`)
            .then(response => {
                console.log(response.data);
                setReserve(response.data);
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1 * 1000);
            });
    }, []);

    const handleDeleteReserve = async () => {
        try {
            const response = await api.delete(`/reserve/${id}`);
            console.log(response);
            if (response) {
                setReserveResponseStatus(response.status);
                setReserveResponseMessage(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            setReserveResponseStatus(error.response.status);
            setReserveResponseMessage(error.response.data.message);
            console.error(error);
        }
    }

    return (
        <div>
            <HeadComponent title={"Informações da reserva - Smartvaga"} description={"Veja informações detalhadas sobre sua reserva Smartvaga."} />

            <HeaderComponent logoLink="/dashboard">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                {isLoading ? <LoadingComponent /> :
                    <div className={`main-container`}>
                        <div className="container bg-dark">
                            <div className={styles.wrapper}>
                                <div className={styles.headerMenu}>
                                    <div className={styles.title}>Detalhes da Reserva</div>
                                    <div onClick={() => router.push("/dashboard")} className={styles.iconClose}>
                                        <Image src={"/icons/icon-close.svg"} alt={"Botão fechar"} width={16} height={16} />
                                    </div>
                                </div>

                                <div className={styles.section1}>
                                    <h3><span className={styles.label}>Reserva:</span> # {reserve.id}</h3>
                                    <ExpiredTagComponent date={reserve.date} exit_time={reserve.exit_time} />
                                </div>

                                <div className={styles.reserveInfo}>
                                    <p><span className={styles.label}>Nº da vaga:</span> {reserve.vacancy.num}</p>
                                    <p><span className={styles.label}>Dia:</span> {moment(reserve.date).format("DD/MM/YYYY")}</p>
                                    <p><span className={styles.label}>Entrada:</span> {formatTimeZero(reserve.entry_time)} <span className={styles.label}>| Saída:</span> {formatTimeZero(reserve.exit_time)}</p>
                                    <p><span className={styles.label}>Veículo:</span> {reserve.car.brand} {reserve.car.name}</p>
                                    <p><span className={styles.label}>Modelo:</span> {reserve.car.model}</p>
                                    <p><span className={styles.label}>Placa:</span> {reserve.car.licensePlate}</p>
                                    <p><span className={styles.label}>Cor:</span> {reserve.car.color}</p>
                                </div>

                                <div className={styles.btnGroup}>
                                    <ButtonComponent text={"EXCLUIR"} type={"button"} style={"btn btn-outline-secondary btn-small w-100"} callback={handleDeleteReserve} />
                                </div>
                                {/* <ButtonComponent text={"VOLTAR"} type={"button"} style={"btn btn-outline-secondary btn-small w-100"} callback={() => router.push("/dashboard")} /> */}
                            </div>
                            {showModal && <ModalComponent status={reserveResponseStatus} message={reserveResponseMessage} textBtn={"Continuar"} action={() => { router.push("/dashboard"); }} />}
                        </div>

                        <div className={`menu-left`}>
                            <MenuComponent />
                        </div>
                    </div>
                }
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

    await apiClient.get('/profile');

    return {
        props: {}
    }
}