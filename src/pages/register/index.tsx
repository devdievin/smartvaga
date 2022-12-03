import { useRouter } from "next/router";
import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import LinkComponent from "../../components/link";
import MainComponent from "../../components/main";

import styles from './Register.module.css';

export default function Register() {
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { name, email, password, cpassword } = event.target;

        if (!checkPasswords(password.value, cpassword.value)) return alert("Senhas não são iguais");

        const response = await fetch(`${process.env.API_URL}/register`, {
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        console.log(result);

        if (response.status === 200) {
            router.push('/login');
        }
    }

    const checkPasswords = (pass: string, cpass: string) => {
        return (pass === cpass) ? true : false;
    }

    return (
        <>
            <HeadComponent title="Criar conta - Smartvaga" description="Crie sua conta e comece a facilitar seu dia-a-dia ao estacionar." />

            <HeaderComponent>
                <LinkComponent text='Login' style='btn btn-primary btn-small' url={"/login"} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <CardComponent title="Criar conta" color="primary">
                        <form onSubmit={handleSubmit} method="post">
                            <InputComponent label="Nome:" name="name" type={"text"} required={true} />
                            <InputComponent label="E-mail:" name="email" type={"email"} required={true} />
                            <InputComponent label="Senha:" name="password" type={"password"} required={true} />
                            <InputComponent label="Confirma senha:" name="cpassword" type={"password"} required={true} />
                            <div className={styles.btnGroup}>
                                <ButtonComponent text="Criar" type="submit" style="btn btn-secondary btn-large"/>
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}