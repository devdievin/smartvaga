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
import { ProfileComponent } from "../../../components/profile";
import LoadingComponent from "../../../components/loading";
import { PaymentComponent } from "../../../components/payment";
import ModalComponent from "../../../components/modal";

import styles from "./CreateReserve.module.css";

type ErrorProps = {
    isError: boolean;
    status: number;
    message: string;
}

export default function CreateReserve() {
    const router = useRouter();
    const { param } = router.query; // param é array de [0] = número vaga, [1] = data, [2] = horário entrada
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [paymentResponseStatus, setPaymentResponseStatus] = useState(200);
    const [paymentResponseData, setPaymentResponseData] = useState("");
    const [errors, setErrors] = useState<ErrorProps>({ isError: false, status: 500, message: "Internal server error" });
    const [userCars, setUserCars] = useState<any[]>([]);
    const [vacancy, setVacancy] = useState();
    const [reserve, setReserve] = useState();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (user) {
            api.get(`/cars/${user.id}`)
                .then(response => {
                    setUserCars(response.data);

                    // console.log(response.data.length);
                    
                    if (response.data.length === 0) {
                        setErrors({ isError: true, status: 404, message: "Você precisa ter pelo menos um veículo cadastrado para criar uma reserva!" });
                    }
                })
                .catch(err => {
                    console.error(err)
                    setErrors({ isError: true, status: err.response.status, message: err.response.data.message });
                });

            api.get(`/vacancy/${param![0]}`)
                .then(response => {
                    setVacancy(response.data);
                })
                .catch(err => {
                    console.error(err)
                    setErrors({ isError: true, status: err.response.status, message: err.response.data.message });
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1 * 1000);
                });
        }
    }, [user]);

    const exit_time = setExitTime(param![2], 1);

    const onSubmit = async (data: any) => {
        data.date = param![1];
        data.entry_time = param![2];
        data.exit_time = exit_time;
        data.car = JSON.parse(data.car);
        data.vacancy = vacancy;

        // console.log(data);

        setReserve(data);
        setSubmitted(true);
    };

    const confirmPayment = async () => {
        try {
            const response = await api.post("/reserve", reserve);

            console.log(response);

            if (response) {
                setPaymentResponseStatus(response.status);
                setPaymentResponseData(response.data.message);
            }
        } catch (error) {
            setPaymentResponseStatus(error.response.status);
            setPaymentResponseData(error.response.data.message);
            console.error(error);
        }
    }

    return (
        <div>
            <HeadComponent title="Criar Reserva" description="teste" />

            <HeaderComponent logoLink="/dashboard">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                {isLoading ? <LoadingComponent /> :
                    <div className={`main-container`}>
                        <div className="container bg-dark">
                            <div className={styles.wrapper}>
                                <h3>Criar uma reserva</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className={styles.text1}>Você está reservando a vaga {param![0]} para o dia <strong>{moment(param![1]).format("DD/MM/YYYY")}</strong> das <strong>{param![2]}</strong> às <strong>{exit_time}</strong>.</p>

                                    <div className={styles.selectCar}>
                                        <label>VEÍCULO:</label>
                                        <select {...register("car")} className="select-default" id="selectCars">
                                            {userCars ?
                                                userCars.map((car, index) => {
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

                            {submitted && <PaymentComponent status={paymentResponseStatus} message={paymentResponseData} redirectPath={"/dashboard"} onSubmit={confirmPayment} onClose={() => setSubmitted(false)} />}

                            {errors.isError && <ModalComponent status={errors.status} message={errors.message} textBtn={"Entendi"} action={() => { router.push("/car/add"); }} />}

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