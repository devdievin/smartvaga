import Image from "next/image";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../../services/axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import { setExitTime } from "../../../utils/time";
import moment from "moment";

import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import MainComponent from "../../../components/main";
import MenuComponent from "../../../components/menu";
import { ContentMenuComponent } from "../../../components/content-menu";
import { ProfileComponent } from "../../../components/profile";
import LoadingComponent from "../../../components/loading";
import ModalComponent from "../../../components/modal";

import styles from "./CreateReserve.module.css";

export default function CreateReserve() {
    const router = useRouter();
    const { param } = router.query; // param é array de [0] = número vaga, [1] = data, [2] = horário entrada
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [modalResponseStatus, setModalResponseStatus] = useState(200);
    const [modalResponseData, setModalResponseData] = useState("");
    const [vacancy, setVacancy] = useState();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        api.get(`/vacancy/${param![0]}`)
            .then(response => {
                setVacancy(response.data);
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

    const exit_time = setExitTime(param![2], 1);

    const onSubmit = async (data: any) => {
        try {
            data.date = param![1];
            data.entry_time = param![2];
            data.exit_time = exit_time;
            data.car = JSON.parse(data.car);
            data.vacancy = vacancy;

            const response = await api.post("/reserve", data);

            console.log(response);

            if (response) {
                setModalResponseStatus(response.status);
                setModalResponseData(response.data.message);
                setSubmitted(true);
            }
        } catch (error) {
            setModalResponseStatus(error.response.status);
            setModalResponseData(error.response.data.message);
            setSubmitted(true);
            console.error(error);
        }
    };

    return (
        <div>
            <HeadComponent title="Criar Reserva" description="teste" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    {isLoading ? <LoadingComponent /> :
                        <div className={styles.container}>
                            <div>
                                <h3>Criar uma reserva</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className={styles.text1}>Você está reservando a vaga {param![0]} para o dia <strong>{moment(param![1]).format("DD/MM/YYYY")}</strong> das <strong>{param![2]}</strong> às <strong>{exit_time}</strong>.</p>

                                    <div className={styles.selectCar}>
                                        <label>VEÍCULO:</label>
                                        <select {...register("car")} className="select-default" id="selectCars">
                                            {user?.cars ?
                                                user?.cars.map((car, index) => {
                                                    return <option value={JSON.stringify(car)} key={index}>{car.brand} {car.name} {car.model}</option>
                                                }) :
                                                <option disabled={true} defaultValue={undefined}>Nenhum veículo cadastrado</option>
                                            }
                                        </select>
                                    </div>

                                    <div className={styles.text2}>
                                        <p>Está certo?</p>
                                    </div>

                                    <div className={styles.btnGroup}>
                                        <span onClick={() => router.push("/dashboard")} className={styles.btnCancel}>
                                            <Image src={"/icons/icon-circle-error.svg"} alt={"Não"} width={50} height={50} />
                                        </span>
                                        <button type="submit" className="btn btn-transparent">
                                            <Image src={"/icons/icon-check-circle-outline.svg"} alt={"Sim"} width={50} height={50} />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {submitted && <ModalComponent status={modalResponseStatus} message={modalResponseData} redirectPath={"/dashboard"} />}

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