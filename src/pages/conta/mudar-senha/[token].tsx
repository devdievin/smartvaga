
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

import ButtonComponent from "../../../components/button";
import FooterComponent from "../../../components/footer";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import MainComponent from "../../../components/main";
import InputComponent from "../../../components/input";

import styles from "./ForgotPassword.module.css";
import ModalComponent from "../../../components/modal";

type PayloadProps = {
    exp: number
    iat: number
    id: string;
}

type FormProps = {
    password: string;
    cpassword: string;
}

type SubmittedProps = {
    isSubmitted: boolean;
    status: number;
    message: string;
    action?: () => void;
}

export default function ForgotPassword() {
    const router = useRouter();
    const { token } = router.query;
    const [userId, setUserId] = useState("");
    const [submitted, setSubmitted] = useState<SubmittedProps>({ isSubmitted: false, status: 200, message: "OK", action: () => router.push("/login") });
    const { register, handleSubmit } = useForm<FormProps>();

    useEffect(() => {
        if (token) {
            const payload: PayloadProps = jwt_decode(token as string);

            setUserId(payload.id);
        }
    }, [token]);

    const onSubmit = async (data: FormProps) => {
        try {
            const { password, cpassword } = data;

            if (password !== cpassword) return setSubmitted({
                isSubmitted: true,
                status: 409,
                message: "Senhas não são iguais!",
                action: () => setSubmitted({ ...submitted, isSubmitted: false })
            });

            const response = await api.put(`/update/password/${userId}`, { password: password });

            console.log(response);

            setSubmitted({
                isSubmitted: true,
                status: response.status,
                message: response.data.message,
                action: () => router.push("/")
            });
        } catch (error) {
            console.error(error);
            setSubmitted({
                isSubmitted: true,
                status: error.response.status,
                message: error.response.data.message,
                action: () => setSubmitted({ ...submitted, isSubmitted: false })
            });
        }
    }

    return (
        <div>
            <HeadComponent title="Mudar Senha - SmartVaga" description="Mude sua senha e recupere sua conta SmartVaga" />

            <HeaderComponent logoLink="/">
                <ButtonComponent type="button" text="Login" style="btn btn-primary btn-small" callback={() => router.push("/login")} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
                        {/* ID do usuário: {userId} */}
                        <div className={styles.header}>
                            <h3>Criar nova senha</h3>
                            <p>Informe sua nova senha:</p>
                        </div>
                        <div className={styles.inputGroup}>
                            <InputComponent type={"password"} name={"password"} placeholder={"Senha"} minLength={8} register={register} required={true} />
                            <InputComponent type={"password"} name={"cpassword"} placeholder={"Confirma Senha"} minLength={8} register={register} required={true} />
                        </div>

                        <div className={styles.btnGroup}>
                            <ButtonComponent text="Salvar" type="submit" style="btn btn-primary btn-small btn-full" />
                        </div>
                    </form>

                    {submitted.isSubmitted && <ModalComponent status={submitted.status} message={submitted.message} textBtn={"Continuar"} action={submitted.action as () => void} />}
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}