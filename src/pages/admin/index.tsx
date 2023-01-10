import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { formatTimeZero } from "../../utils/format";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import { ProfileComponent } from "../../components/profile";
import MainComponent from "../../components/main";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import LoadingComponent from "../../components/loading";
import ModalComponent from "../../components/modal";
import MenuAdminComponent from "../../components/menu-admin";

import styles from "./Admin.module.css";

type SubmittedProps = {
    isSubmitted: boolean;
    status: number;
    message: string;
    action: () => void;
}

type WorkTimeProps = {
    open: string;
    close: string;
}

export default function Admin() {
    const [isLoading, setIsLoading] = useState(true);
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [cars, setCars] = useState([]);
    const [num, setNum] = useState("");
    const [reserves, setReserves] = useState([]);
    const [workTime, setWorkTime] = useState<WorkTimeProps | null>(null);
    const [submitted, setSubmitted] = useState<SubmittedProps>({ isSubmitted: false, status: 200, message: "OK", action: () => { } });
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (!workTime) {
            console.log("Dados estacionamento");

            api.get("/parking/info")
                .then(response => {
                    setWorkTime({
                        open: response.data.opening_time,
                        close: response.data.closing_time
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [workTime]);

    useEffect(() => {
        api.get("/vacancies")
            .then(response => {
                setVacancies(response.data);
            })
            .catch(err => {
                console.error(err);
            })

        api.get("/users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => {
                console.error(err);
            })

        api.get("/cars")
            .then(response => {
                setCars(response.data);
            })
            .catch(err => {
                console.error(err);
            })

        api.get("/reserves")
            .then(response => {
                setReserves(response.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setNum("");
            console.log(data);

            const response = await api.post("/vacancy", { num: data.num });

            console.log(response);

            if (response) {
                setSubmitted({
                    isSubmitted: true,
                    status: response.status,
                    message: response.data.message,
                    action: () => router.reload()
                });
            }
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
            <HeadComponent title="Área do Administrador - SmartVaga" description="Painel de controle da administração da aplicação SmartVaga." />

            <HeaderComponent logoLink="/admin">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                <div className={`main-container`}>
                    <div className="container bg-dark">
                        {isLoading ? <LoadingComponent /> :
                            <div className={styles.wrapper}>
                                <section className={styles.section1}>
                                    <p>Vagas cadastradas: <span>{vacancies.length}</span></p>
                                    <p>Total de usuários: <span>{users.length}</span></p>
                                    <p>Total de carros: <span>{cars.length}</span></p>
                                    <p>Total de reservas: <span>{reserves.length}</span></p>
                                </section>

                                <section className={styles.section2}>
                                    <div className={styles.card}>
                                        <div className={styles.header}>
                                            <p>Cadastrar Nova Vaga</p>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <InputComponent type={"text"} name="num" label="Nº da vaga:" placeholder="Ex.: 4" state={[num, setNum]} register={register} required={true} />
                                            <InputComponent type={"text"} name="price" label="Preço por hora da vaga:" placeholder="Ex.: R$ 5,00" register={register} disabled={true} />

                                            <ButtonComponent type="submit" text="Salvar" style="btn btn-primary btn-large btn-full" />
                                        </form>
                                    </div>

                                    <div className={styles.card}>
                                        <div className={styles.header}>
                                            <p>Lista de vagas</p>
                                        </div>
                                        <div className={styles.vacanciesList}>
                                            {vacancies.map((vacancy, index) => {
                                                return <div key={index}>Vaga: {(vacancy.num < 10) ? "0" : ""}{vacancy.num}</div>;
                                            })}
                                        </div>
                                    </div>
                                </section>

                                <section className={styles.section3}>
                                    {workTime && <p>Horário de estacionamento das <strong>{formatTimeZero(workTime.open)}</strong>h às <strong>{formatTimeZero(workTime.close)}</strong>h</p>}
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