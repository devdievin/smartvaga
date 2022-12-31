import { useRouter } from "next/router";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import CardComponent from "../../components/card";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import { CheckboxComponent } from "../../components/checkbox";
import LinkComponent from "../../components/link";
import FooterComponent from "../../components/footer";
import PreloadComponent from "../../components/preload";
import ModalComponent from "../../components/modal";
import Link from "next/link";

import styles from './Register.module.css';

type ErrorProps = {
    isError: boolean;
    status: number;
    message: string;
}

export default function Register() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorProps>({ isError: false, status: 500, message: "Internal server error" });

    const onSubmit = async (data: any) => {
        try {
            const { name, email, password, cpassword } = data;

            if (!checkPasswords(password, cpassword)) return setError({ isError: true, status: 409, message: "As senhas não são iguais" });

            if (!check) return setError({ isError: true, status: 400, message: "É necessário aceitar os termos de uso" });

            setLoading(true);

            const response = await api.post('/register', {
                name: name,
                email: email,
                password: password
            });

            if (response.status === 201) {
                return router.push('/comecando');
            }

            return setError({ isError: true, status: response.status, message: response.data.message });
        } catch (err) {
            setLoading(false);
            setError({
                isError: true,
                status: err.response.status,
                message: err.response.data.message
            });
        }
    }

    const checkPasswords = (pass: string, cpass: string) => {
        return (pass === cpass) ? true : false;
    }

    return (
        <>
            <HeadComponent title="Criar conta - SmartVaga" description="Crie sua conta e comece a facilitar seu dia-a-dia ao estacionar." />

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
                                <span className={styles.termsOfUse}>Concordo com os <Link href={"/register"}>Termos de uso</Link></span>
                            </CheckboxComponent>

                            <div className={styles.btnGroup}>
                                <ButtonComponent text="CRIAR" type="submit" style="btn btn-secondary btn-large btn-full" />
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