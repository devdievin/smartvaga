import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { parseCookies } from 'nookies';
import { AuthContext } from "../../contexts/AuthContext";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";
// import moment from 'moment';

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { TimePickerComponent } from "../../components/time-picker";
import { setTimeRange, timeRangeNow, TIME_RANGE, WORKING_DAY } from "../../utils/time";
import { ProfileComponent } from "../../components/profile";
import LoadingComponent from "../../components/loading";

// import { tVacancies } from "../../utils/reserves-test";

import styles from './Dashboard.module.css';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [userCars, setUserCars] = useState<any[]>([]);
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [reserveDate, setReserveDate] = useState(WORKING_DAY);
    const [reserveTime, setReserveTime] = useState(timeRangeNow(TIME_RANGE)[0]);

    useEffect(() => {
        if (user) {
            api.get(`/cars/${user.id}`)
                .then(response => {
                    setUserCars(response.data);
                })
                .catch(err => {
                    console.error(err)
                });

            api.get('/vacancies')
                .then(response => {
                    setVacancies(response.data);
                })
                .catch(err => {
                    console.error(err)
                }).finally(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1 * 1000);
                });
        }
    }, [user]);

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
                        <div className={styles.imgCar}>
                            {/* Renderiza os carros nas vagas */}
                            {findMyCar(reserve.car.id, carIconFocus, carIcon, vacancy.num)}
                        </div>
                        :
                        <span className={styles.freeVacancy} onClick={() => addReserve(vacancy.num)}>
                            <span>V-0{vacancy.num}</span>
                            <span className={styles.btnAdd}>
                                <Image src={"/icons/icon-add.svg"} alt={"add"} width={36} height={36} />
                            </span>
                        </span>
                }
            </div>
        });
    }

    const findMyCar = (id: string, myCarIcon: string, carIcon: string, vacancyNum: number) => {
        if (id === null || id === undefined) throw new Error("Car ID in reserve nullable");

        const result = userCars.find(car => car.id === id);

        console.log(result);

        if (result) {
            return <Image src={myCarIcon} alt={"meu carro"} title={`${result.brand} ${result.name} ${result.color}`} width={140} height={70} />
        }
        return <Image src={carIcon} alt={"carro"} title={`Vaga ${vacancyNum}`} width={140} height={70} />
    }

    const addReserve = (num: number) => {
        Router.push(`/reserve/create/${num}/${reserveDate}/${reserveTime}`);
    }

    return (
        <>
            <HeadComponent title="Dashboard" description="dashboard smartvaga" />

            <HeaderComponent logoLink="/dashboard">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                {isLoading ? <LoadingComponent /> :
                    <div className={styles.mainContainerDashboard}>
                        <div className="container">
                            <div className={styles.datetimeHeader}>
                                <input type="date" className={styles.dateInput} value={reserveDate} min={WORKING_DAY} onChange={selectDate} />
                                <TimePickerComponent name="hora" data={setTimeRange(reserveDate, TIME_RANGE)} value={reserveTime} onChange={selectHour} />
                            </div>

                            <div className={styles.vacanciesGrid}>
                                {searchReserves(reserveDate, reserveTime)}
                            </div>
                        </div>
                        <div className={styles.sideLeft}>
                            <MenuComponent />
                        </div>
                        <div className={styles.sideRight}>
                            <div>
                                <input type="date" className={styles.dateInput} value={reserveDate} min={WORKING_DAY} onChange={selectDate} />
                            </div>
                            <div>
                                <TimePickerComponent name="hora" data={setTimeRange(reserveDate, TIME_RANGE)} value={reserveTime} onChange={selectHour} />
                            </div>
                        </div>
                    </div>
                }
            </MainComponent>

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