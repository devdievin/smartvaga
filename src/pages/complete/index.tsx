import Router from "next/router";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { api } from "../../services/api";
import { getAPIClient } from "../../services/axios";
import { AuthContext } from "../../contexts/AuthContext";

import { ContentMenuComponent } from "../../components/content-menu";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import MainComponent from "../../components/main";
import FooterComponent from "../../components/footer";
import { ProfileComponent } from "../../components/profile";

import styles from "./Complete.module.css";

export default function Complete() {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const updateData = { ...user, cpf: data.cpf, birth_date: data.birth_date };
            const response = await api.put(`/account/update/${user?.id}`, updateData);

            if (response.status === 200) return Router.push("/dashboard");

            console.log(response.data);
        } catch (err) {
            console.error(err.response.data);
        }
    }

    return (
        <div>
            <HeadComponent title="complete" description="bla bla bla" />

            <HeaderComponent logoLink="/">
                <ProfileComponent />
            </HeaderComponent>
            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div className={styles.container}>
                        <p className={styles.title}>Olá {user?.name},</p>
                        <p>Para usar todas as funcionalidades da plataforma com segurança. Precisamos que conclua seu cadastro.</p>

                        <p>Fica tranquilo(a), leva menos de 1 minuto.</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputComponent register={register} type={"text"} label={"CPF:"} name="cpf" required={true} />
                            <InputComponent register={register} type={"text"} label={"Data de nascimento:"} name="birth_date" required={true} />
                            <div className={styles.btnGroup}>
                                <ButtonComponent type="submit" text={"COMPLETAR CADASTRO"} style={"btn btn-secondary btn-large"} />
                            </div>
                        </form>
                    </div>
                </ContentMenuComponent>
            </MainComponent>

            <FooterComponent />
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