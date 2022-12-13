import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import { getAPIClient } from "../../../services/axios";

import ButtonComponent from "../../../components/button";
import { ContentMenuComponent } from "../../../components/content-menu";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import InputComponent from "../../../components/input";
import MainComponent from "../../../components/main";
import MenuComponent from "../../../components/menu";
import { ProfileComponent } from "../../../components/profile";

import styles from "./CarAdd.module.css";

export default function CarAdd() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        data.user = user;
        // console.log(data);
        const response = await api.post("/car", data);
        console.log(response.data);
    }

    return (
        <div>
            <HeadComponent title="add car" description="lorem..." />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div className={styles.container}>
                        <h3>Adicionar carro</h3>
                        <p>Informações do veículo:</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputComponent register={register} type={"text"} name={"name"} placeholder={"Nome"} required={true} />
                            <InputComponent register={register} type={"text"} name={"brand"} placeholder={"Marca"} required={true} />
                            <InputComponent register={register} type={"text"} name={"model"} placeholder={"Modelo"} required={true} />
                            <div className={styles.inlineTwo}>
                                <InputComponent register={register} type={"text"} name={"year"} placeholder={"Ano"} required={true} />
                                <InputComponent register={register} type={"text"} name={"color"} placeholder={"Cor"} required={true} />
                            </div>

                            <InputComponent register={register} type={"text"} name={"licensePlate"} placeholder={"Placa do veículo"} required={true} />

                            <ButtonComponent type="submit" text="SALVAR" style="btn btn-secondary btn-small w-100 mb-1" />
                            <ButtonComponent type="reset" text="CANCELAR" style="btn btn-outline-secondary btn-small w-100" callback={() => router.push("/dashboard")} />
                        </form>
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