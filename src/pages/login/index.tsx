import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";

import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import LinkComponent from "../../components/link";
import MainComponent from "../../components/main";
import ModalComponent from "../../components/modal";
import PreloadComponent from "../../components/preload";

import styles from './Login.module.css';

type ErrorProps = {
    isError: boolean;
    status: number;
    message: string;
}

export default function Login() {
    const { signIn, isAuthenticated } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorProps>({ isError: false, status: 500, message: "Internal server error" });


    const onError = (errors: any, e: any) => console.log(errors, e);

    const onSubmit = async (data: any) => {
        try {
            const { email, password } = data;

            if (!isAuthenticated) {
                setLoading(true);
            }

            await signIn({ email: email, password: password });
        } catch (error) {
            // console.log(error);
            setLoading(false);
            setError({
                isError: true,
                status: error.response.status,
                message: error.response.data
            });
        }
    }

    const checkKeyDown = (e: any) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <>
            <HeadComponent title="Login - SmartVaga" description="Faça o login para acessar a plataforma SmartVaga" />

            <HeaderComponent logoLink="/">
                <LinkComponent text='Sign Up' style='btn btn-secondary btn-small' url={"/register"} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className="wrapper">
                    <CardComponent title="Login" color="primary">
                        <form onSubmit={handleSubmit(onSubmit, onError)} onKeyDown={(e) => checkKeyDown(e)} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <InputComponent register={register} placeholder="Seu e-mail" name="email" type={"email"} required={true} />
                                <InputComponent register={register} placeholder="Sua senha" name="password" type={"password"} required={true} />
                            </div>
                            <div className={`${styles.helpLink} align-end`}>
                                <Link href={"/recuperar"}>
                                    <span>Esqueceu sua senha?</span>
                                </Link>
                            </div>
                            <div className={styles.btnGroup}>
                                <ButtonComponent text="ENTRAR" type="submit" style="btn btn-primary btn-large btn-full" />
                            </div>
                            <div className={`${styles.helpLink} align-center`}>
                                <Link href={"/register"}>
                                    <span>Não tenho conta</span>
                                </Link>
                            </div>
                        </form>
                    </CardComponent>
                    {loading && <PreloadComponent />}

                    {error.isError && <ModalComponent status={error.status} message={error.message} textBtn={"Entendi"} action={() => setError({ ...error, isError: false })} />}
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}