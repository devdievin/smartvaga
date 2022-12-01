import Link from "next/link";
import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import MainComponent from "../../components/main";

import styles from './Login.module.css';

export default function Login() {
    return (
        <>
            <HeadComponent title="Login - Smartvaga" description="Fazer o login para acessar o Smartvaga" />

            <HeaderComponent>
                <ButtonComponent text='Sign Up' size='sm' color='secondary' type="button" />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <CardComponent title="Login" color="primary">
                        <form>
                            <InputComponent label="E-mail" name="email" type={"email"} required={true} />
                            <InputComponent label="Senha" name="password" type={"password"} required={true} />
                            <div className={`${styles.helpLink} align-end`}>
                                <Link href={"/"}>
                                    <span>Esqueceu sua senha?</span>
                                </Link>
                            </div>
                            <div className={styles.btnGroup}>
                                <ButtonComponent text="Entrar" color="primary" size="lg" type="submit" />
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