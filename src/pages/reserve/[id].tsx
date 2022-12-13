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

import styles from "./ShowReserve.module.css";

export default function ShowReserve() {
    const router = useRouter();
    const { id } = router.query;
    const [reserve, setReserve] = useState<any>();

    useEffect(() => {
        api.get(`/reserve/${id}`)
            .then(response => {
                console.log(response.data);
                setReserve(response.data);
            })
            .catch(err => console.error(err));
        // console.log("Reserva:", id);
    }, [])

    return (
        <div>
            <HeadComponent title={"Informações da reserva - Smartvaga"} description={"Veja informações detalhadas sobre sua reserva Smartvaga."} />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div className={styles.container}>
                        <h3>Reserva: # {reserve.id}</h3>

                        <div className={styles.reserveInfo}>
                            <p>Nº da vaga: {reserve.vacancy.num}</p>
                            <p>Dia: {moment(reserve.date).format("DD/MM/YYYY")}</p>
                            <p>Entrada: {formatTimeZero(reserve.entry_time)} | Saída: {formatTimeZero(reserve.exit_time)}</p>
                            <p>Veículo: {reserve.car.brand} {reserve.car.name} {reserve.car.model}</p>
                            <p>Placa: {reserve.car.licensePlate} | Cor: {reserve.car.color}</p>
                        </div>

                        <ButtonComponent text={"EDITAR"} type={"button"} style={"btn btn-secondary btn-small w-100 mb-1"} />
                        <ButtonComponent text={"EXCLUIR"} type={"button"} style={"btn btn-outline-secondary btn-small w-100"} />
                    </div>
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