import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { parseCookies } from 'nookies';
import { AuthContext } from "../../contexts/AuthContext";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";
import moment from 'moment';

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { TimePickerComponent } from "../../components/time-picker";
import { timeRange } from "../../utils/time";
import { ProfileComponent } from "../../components/profile";

// import { tVacancies } from "../../utils/reserves-test";

import styles from './Dashboard.module.css';

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

    const selectDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        setReserveDate(date);
    }

    const selectHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReserveTime(e.target.value);
    }

    const searchReserves = (reserveDate: string, entry_time: string) => {
        let reserve;
        let carIcon, carIconFocus;

        return vacancies.map((vacancy, index) => {
            let reserves: any[] = vacancy.reserves;

            reserve = reserves.find(reserve => reserve.date === reserveDate && reserve.entry_time === `${entry_time}:00`);

            { carIcon = (index % 2 === 1) ? "/images/car-default-right.svg" : "/images/car-default-left.svg" }
            { carIconFocus = (index % 2 === 1) ? "/images/car-focus-right.svg" : "/images/car-focus-left.svg" }

            return <div key={index}>
                {
                    (reserve) ?
                        <>
                            {/* Renderiza os carros nas vagas */}
                            {findMyCar(reserve.car.id, carIconFocus, carIcon, vacancy.num)}
                        </>
                        :
                        <span onClick={() => addReserve(vacancy.num)}>
                            {vacancy.num}
                        </span>
                }
            </div>
        });
    }

    const findMyCar = (id: string, myCarIcon: string, carIcon: string, vacancyNum: number) => {
        if (id === null || id === undefined) throw new Error("Car ID in reserve nullable");

        const cars = user?.cars;

        const result = cars?.find(car => car.id === id);

        if (result) {
            return <Image src={myCarIcon} alt={"meu carro"} title={`Meu carro`} width={150} height={130} />
        }
        return <Image src={carIcon} alt={"carro"} title={`Vaga ${vacancyNum}`} width={150} height={130} />
    }

    const addReserve = (num: number) => {
        Router.push(`/create/reserve/${num}/${reserveDate}/${reserveTime}`);
    }

    return (
        <>
            <HeadComponent title="Dashboard" description="dashboard smartvaga" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div>
                    <div className={styles.datetimeHeader}>
                        <input type="date" className={styles.dateInput} value={reserveDate} onChange={selectDate} />
                        <TimePickerComponent name="hora" data={timeRange} value={reserveTime} onChange={selectHour} />
                    </div>

                    <div className={styles.vacanciesGrid}>
                        {searchReserves(reserveDate, reserveTime)}
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