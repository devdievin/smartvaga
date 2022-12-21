import { useRouter } from "next/router";
import { useState } from "react"
import { useForm } from "react-hook-form";
import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import { CheckboxComponent } from "../../components/checkbox";
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
    const { register, handleSubmit } = useForm();
    const [check, setCheck] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            const { name, email, password, cpassword } = data;

            // console.log(name, email, password, cpassword);

            if (!checkPasswords(password, cpassword)) return alert("As senhas não são iguais");

            if (!check) return alert("É necessário aceitar os termos de uso");

            console.log(data);
            const response = await api.post('/register', {
                name: name,
                email: email,
                password: password
            });

            if (response.status === 201) {
                router.push('/comecando');
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

            <HeaderComponent logoLink="/">
                <LinkComponent text='Login' style='btn btn-primary btn-small' url={"/login"} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className="wrapper">
                    <CardComponent title="Criar conta" color="primary">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputComponent register={register} placeholder="Nome" name="name" type={"text"} required={true} />
                            <InputComponent register={register} placeholder="Email" name="email" type={"email"} required={true} />
                            <InputComponent register={register} placeholder="Senha" name="password" type={"password"} required={true} />
                            <InputComponent register={register} placeholder="Confirma senha" name="cpassword" type={"password"} required={true} />

                            <CheckboxComponent name="check" label="Concordo com os Termos de uso" checked={() => setCheck(!check)}>
                                <span>Concordo com os Termos de uso</span>
                            </CheckboxComponent>

                            <div className={styles.btnGroup}>
                                <ButtonComponent text="CRIAR" type="submit" style="btn btn-secondary btn-large btn-full" />
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </MainComponent>

            <FooterComponent />
        </>
    );
}