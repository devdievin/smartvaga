import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { parseCookies } from 'nookies';
import { AuthContext } from "../../contexts/AuthContext";
import { getAPIClient } from "../../services/axios";
import { api } from "../../services/api";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import InputComponent from "../../components/input";

import styles from './Dashboard.module.css';

// const vacancies = [
//     { num: 1, status: true },
//     { num: 2, status: true },
//     { num: 3, status: true },
//     { num: 4, status: true, focus: true },
//     { num: 5, status: false },
//     { num: 6, status: true },
// ];

const Dashboard = () => {
    const { user, signOut } = useContext(AuthContext);
    const [vacancies, setVacancies] = useState<any[]>([]);

    useEffect(() => {
        api.get('/vacancies')
            .then(response => {
                setVacancies(response.data);
                console.log(response.data);
            })
            .catch(err => console.error(err));
    }, [])

    const logout = async (event: any) => {
        await signOut();
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    let carIcon;
    let carIconFocus;

    return (
        <>
            <HeadComponent title="Dashboard" description="dashboard smartvaga" />

            <HeaderComponent>
                <span>{user?.name}</span>
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div>
                    {/* <h1>Dashboard...</h1>
                    <button onClick={logout}>Logout</button> */}
                    <div className={styles.datetimeHeader}>
                        <InputComponent type={"date"} name="date-field" onChange={change} />
                        <InputComponent type={"time"} name="hour-field" onChange={change} />
                    </div>

                    <div className={styles.vacanciesGrid}>
                        {vacancies.map((vacancy, index) => {
                            { carIcon = (index % 2 === 1) ? "/images/car-default-right.svg" : "/images/car-default-left.svg" }
                            { carIconFocus = (index % 2 === 1) ? "/images/car-focus-right.svg" : "/images/car-focus-left.svg" }
                            return <div key={index}>
                                {(vacancy.status) ?
                                    <>
                                        {(vacancy.focus) ?
                                            <Image src={carIconFocus} alt={"car"} title={`Meu carro`} width={150} height={130} />
                                            :
                                            <Image src={carIcon} alt={"car"} title={`Vaga ${vacancy.num}`} width={150} height={130} />
                                        }
                                    </>
                                    :
                                    vacancy.num}
                            </div>;
                        })}
                    </div>
                </div>
            </MainComponent>

            <MenuComponent />
        </>
    );
}

export default Dashboard;

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