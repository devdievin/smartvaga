import React, { useContext } from "react";
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

import styles from './Login.module.css';

export default function Login() {
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        const { email, password } = data;

        await signIn({ email: email, password: password });
    }

    return (
        <>
            <HeadComponent title="Login - Smartvaga" description="Fazer o login para acessar o Smartvaga" />

            <HeaderComponent>
                <LinkComponent text='Sign Up' style='btn btn-secondary btn-small' url={"/register"} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <CardComponent title="Login" color="primary">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputComponent register={register} placeholder="Seu e-mail" name="email" type={"email"} required={true} />
                            <InputComponent register={register} placeholder="Sua senha" name="password" type={"password"} required={true} />
                            <div className={`${styles.helpLink} align-end`}>
                                <Link href={"/"}>
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
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}