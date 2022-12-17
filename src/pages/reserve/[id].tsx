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
import { ContentMenuComponent } from "../../components/content-menu";
import ButtonComponent from "../../components/button";
import LoadingComponent from "../../components/loading";
import ExpiredTagComponent from "../../components/expired-tag";
import ModalComponent from "../../components/modal";

import styles from "./ShowReserve.module.css";

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

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    {isLoading ? <LoadingComponent /> :
                        <div className={styles.container}>
                            <div>
                                <h3><span className={styles.label}>Reserva:</span> # {reserve.id}</h3>

                                <div className={styles.reserveInfo}>
                                    <p><span className={styles.label}>Nº da vaga:</span> {reserve.vacancy.num}</p>
                                    <p><span className={styles.label}>Dia:</span> {moment(reserve.date).format("DD/MM/YYYY")}</p>
                                    <p><span className={styles.label}>Entrada:</span> {formatTimeZero(reserve.entry_time)} <span className={styles.label}>| Saída:</span> {formatTimeZero(reserve.exit_time)}</p>
                                    <p><span className={styles.label}>Veículo:</span> {reserve.car.brand} {reserve.car.name}</p>
                                    <p><span className={styles.label}>Modelo:</span> {reserve.car.model}</p>
                                    <p><span className={styles.label}>Placa:</span> {reserve.car.licensePlate}</p>
                                    <p><span className={styles.label}>Cor:</span> {reserve.car.color}</p>
                                    <ExpiredTagComponent date={reserve.date} exit_time={reserve.exit_time} />
                                </div>


                                <ButtonComponent text={"EXCLUIR"} type={"button"} style={"btn btn-secondary btn-small w-100 mb-1"} callback={handleDeleteReserve} />
                                <ButtonComponent text={"VOLTAR"} type={"button"} style={"btn btn-outline-secondary btn-small w-100"} callback={() => router.push("/dashboard")} />
                            </div>
                            {showModal && <ModalComponent status={reserveResponseStatus} message={reserveResponseMessage} redirectPath={"/dashboard"} />}
                        </div>
                    }
                </ContentMenuComponent>
            </MainComponent>

            <MenuComponent />
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