import React, { useContext } from "react";
import Link from "next/link";
// import { useForm } from 'react-hook-form';

import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import LinkComponent from "../../components/link";
import MainComponent from "../../components/main";

import styles from './Login.module.css';
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
    const { signIn } = useContext(AuthContext);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target;

        await signIn({ email: email.value, password: password.value });
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
                        <form onSubmit={handleSubmit} method={"POST"}>
                            <InputComponent label="E-mail" name="email" type={"email"} required={true} />
                            <InputComponent label="Senha" name="password" type={"password"} required={true} />
                            <div className={`${styles.helpLink} align-end`}>
                                <Link href={"/"}>
                                    <span>Esqueceu sua senha?</span>
                                </Link>
                            </div>
                            <div className={styles.btnGroup}>
                                <ButtonComponent text="Entrar" type="submit" style="btn btn-primary btn-large btn-full" />
                            </div>
                            <div className={`${styles.helpLink} align-center`}>
                                <Link href={"/"}>
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