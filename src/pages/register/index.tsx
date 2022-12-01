import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import MainComponent from "../../components/main";

import styles from './Register.module.css';

export default function Register() {
    return (
        <>
            <HeadComponent title="Criar conta - Smartvaga" description="Crie sua conta e comece a facilitar seu dia-a-dia ao estacionar." />

            <HeaderComponent>
                <ButtonComponent text='Login' size='sm' color='primary' type="button"/>
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <CardComponent title="Criar conta" color="primary">
                        <form>
                            <InputComponent label="Nome:" name="name" type={"text"} required={true} />
                            <InputComponent label="E-mail:" name="email" type={"email"} required={true} />
                            <InputComponent label="Senha:" name="password" type={"password"} required={true} />
                            <InputComponent label="Confirma senha:" name="cpassword" type={"password"} required={true} />
                            <div className={styles.btnGroup}>
                                <ButtonComponent text="Criar" color="secondary" size="lg" type="submit"/>
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}