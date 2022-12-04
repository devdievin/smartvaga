import { useRouter } from "next/router";
import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import LinkComponent from "../../components/link";
import MainComponent from "../../components/main";
import { api } from "../../services/api";

import styles from './Register.module.css';

export default function Register() {
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();
            const { name, email, password, cpassword } = event.target;

            if (!checkPasswords(password.value, cpassword.value)) return alert("As senhas não são iguais");

            const response = await api.post('/register', {
                name: name.value,
                email: email.value,
                password: password.value
            });

            if (response.status === 201) {
                router.push('/login');
            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
                console.error("Response Error:", err.response);
            } else {
                console.error("Error:", err.message);
            }
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
                                <ButtonComponent text="Criar" type="submit" style="btn btn-secondary btn-large btn-full" />
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}