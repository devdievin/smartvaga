import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import { AuthContext } from "../../contexts/AuthContext";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";
import moment from 'moment';

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";

import styles from './Dashboard.module.css';
import { TimePickerComponent } from "../../components/time-picker";
import { timeRange } from "../../utils/time";
import { ProfileComponent } from "../../components/profile";
import Router from "next/router";

// const nVacancies = [
//     { num: 1, status: true, reserve: { id: "2bh123sassd", date: "2022-12-06", entry_time: "15:00:00", car: { id: "afe1cea6-ec42-474a-ba40-a665b42c2caf" } } },
//     { num: 2, status: false, reserve: null },
//     { num: 3, status: true, reserve: { id: "ubwbh27382v", date: "2022-12-08", entry_time: "13:00:00", car: { id: "asdajsheb-jas322e-3nj211" } } },
//     { num: 4, status: false, reserve: null },
//     { num: 5, status: false, reserve: null },
//     { num: 6, status: true, reserve: { id: "ywbsa97382o", date: "2022-12-07", entry_time: "10:00:00", car: { id: "afe1cea6-ec42-82nd-72yb-a665b42c2caf" } } },
// ];

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [reserveDate, setReserveDate] = useState(moment().format('YYYY-MM-DD'));
    const [reserveTime, setReserveTime] = useState("08:00");

    useEffect(() => {
        api.get('/vacancies')
            .then(response => {
                setVacancies(response.data);
            })
            .catch(err => console.error(err));
    }, [])

    const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        setReserveDate(date);
    }

    const selectHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReserveTime(e.target.value);
    }

    const findMyCar = (id: string) => {
        if (id === null || id === undefined) throw new Error("Car ID in reserve nullable");

        const cars = user?.cars;

        const result = cars?.find(car => car.id === id);

        return result;
    }

    const addReserve = (num: number) => {
        console.log("click", num);

        Router.push(`/create/reserve/${num}`);
    }

    let carIcon;
    let carIconFocus;

    return (
        <>
            <HeadComponent title="Dashboard" description="dashboard smartvaga" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div>
                    <div className={styles.datetimeHeader}>
                        <input type="date" className={styles.dateInput} value={reserveDate} onChange={change} />
                        <TimePickerComponent name="hora" data={timeRange} onChange={selectHour} value={reserveTime} />
                    </div>

                    <div className={styles.vacanciesGrid}>
                        {vacancies.map((vacancy, index) => {
                            { carIcon = (index % 2 === 1) ? "/images/car-default-right.svg" : "/images/car-default-left.svg" }
                            { carIconFocus = (index % 2 === 1) ? "/images/car-focus-right.svg" : "/images/car-focus-left.svg" }
                            return <div key={index}>
                                {(vacancy.reserve !== null && (vacancy.reserve?.date === reserveDate && vacancy.reserve?.entry_time === `${reserveTime}:00`)) ?
                                    <>
                                        {(findMyCar(vacancy.reserve?.car.id)) ?
                                            <Image src={carIconFocus} alt={"car"} title={`Meu carro`} width={150} height={130} />
                                            :
                                            <Image src={carIcon} alt={"car"} title={`Vaga ${vacancy.num}`} width={150} height={130} />
                                        }
                                    </>
                                    :
                                    <span onClick={() => addReserve(vacancy.num)}>
                                        {vacancy.num}
                                    </span>
                                }
                            </div>;
                        })}
                    </div>
                </div>
            </MainComponent>

            <MenuComponent />
        </>
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