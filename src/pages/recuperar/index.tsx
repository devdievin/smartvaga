import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import ButtonComponent from "../../components/button";
import FooterComponent from "../../components/footer";

import styles from "./Recover.module.css";
import { useState } from "react";
import ModalComponent from "../../components/modal";

type FormProps = {
    email: string;
}

type SubmitProps = {
    isSubmit: boolean;
    status: number;
    message: string;
    action: () => void;
}

export default function Recover() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormProps>();
    const [submitted, setSubmitted] = useState<SubmitProps>({ isSubmit: false, status: 200, message: "Ok", action: () => router.push("/login") });

    const onSubmit = async (data: FormProps) => {
        try {
            const response = await api.post(`/forgot-password`, data);
            console.log(response);

            setSubmitted({
                isSubmit: true,
                status: response.status,
                message: response.data.message,
                action: () => router.push("/login")
            });
        } catch (error) {
            console.error(error);
            setSubmitted({
                isSubmit: true,
                status: error.response.status,
                message: error.response.data.message,
                action: () => setSubmitted({ ...submitted, isSubmit: false })
            });
        }
    }

    return (
        <div>
            <HeadComponent title={"Recuperar conta SmartVaga"} description={"Esqueceu sua senha? Recupere sua conta SmartVaga aqui."} />

            <HeaderComponent logoLink="/">
                <ButtonComponent text={"Sign Up"} type={"button"} style={"btn btn-secondary btn-small"} callback={() => Router.push("/register")} />
            </HeaderComponent>

            <MainComponent hideFooter={true}>
                <div className={styles.container}>

                    <h3>Recuperar Conta</h3>

                    <p className={styles.text}>Recupere sua conta Smartvaga</p>

                    <div className={styles.vectorImg}>
                        {/* Image here */}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} type="email" placeholder="Seu e-mail" required={true} />

                        <div className={styles.btnGroup}>
                            <ButtonComponent type="submit" text="PRÓXIMO" style="btn btn-primary btn-small" />
                        </div>
                    </form>
                    {submitted.isSubmit && <ModalComponent status={submitted.status} message={submitted.message} textBtn={"Continuar"} action={submitted.action} />}
                </div>
            </MainComponent >

            <FooterComponent />
        </div >
    );
}