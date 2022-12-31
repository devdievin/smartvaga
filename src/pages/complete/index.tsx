import Router from "next/router";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { api } from "../../services/api";
import { getAPIClient } from "../../services/axios";
import { AuthContext } from "../../contexts/AuthContext";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import MainComponent from "../../components/main";
import FooterComponent from "../../components/footer";
import { ProfileComponent } from "../../components/profile";
import LoadingComponent from "../../components/loading";
import ModalComponent from "../../components/modal";

import styles from "./Complete.module.css";

type ErrorProps = {
    isError: boolean;
    status: number;
    message: string;
}

export default function Complete() {
    const { user } = useContext(AuthContext);
    const [cpf, setCpf] = useState("");
    const [birth, setBirth] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorProps>({ isError: false, status: 500, message: "Internal server error" });
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        try {
            let b_date = data.birth_date.replaceAll("/", "-");
            b_date = b_date.split("-").reverse().join("-");

            const updateData = { ...user, cpf: data.cpf, birth_date: b_date };

            setLoading(true);

            if (user) {
                const response = await api.put(`/account/update/${user.id}`, updateData);

                if (response.status === 200) return Router.push("/dashboard");

                return setError({ isError: true, status: response.status, message: response.data.message });
            }

            return setError({ isError: true, status: 400, message: "ID do usuário inválido!" });
        } catch (err) {
            console.error(err.response.data);
            setLoading(false);
            setError({
                isError: true,
                status: err.response.status,
                message: err.response.data.message
            });
        }
    }

    return (
        <div>
            <HeadComponent title="Complete seu cadastro - SmartVaga" description="Complete seu cadastro para começar a utilizar todos os serviços da plataforma com segurança." />

            <HeaderComponent logoLink="/">
                <ProfileComponent />
            </HeaderComponent>
            <MainComponent hideFooter={false} dark={true}>
                <div className="h-100">
                    {loading ? <LoadingComponent /> :
                        <div className={styles.container}>
                            <div className={styles.wrapper}>
                                <p className={styles.title}>Olá {user?.name ? user.name : "Motorista"},</p>
                                <p>Para você usar todas as funcionalidades da plataforma com segurança. Precisamos que conclua seu cadastro.</p>

                                <p>Fica tranquilo(a), leva menos de 1 minuto.</p>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <InputComponent register={register} type={"text"} label={"CPF:"} name="cpf" placeholder="Ex.: 000.000.000-00" mask="cpf" state={[cpf, setCpf]} minLength={11} maxLength={11} required={true} />
                                    <InputComponent register={register} type={"text"} label={"Data de nascimento:"} name="birth_date" placeholder="Ex.:01/01/2000" mask="birth" state={[birth, setBirth]} minLength={8} maxLength={8} required={true} />
                                    <div className={styles.btnGroup}>
                                        <ButtonComponent type="submit" text={"COMPLETAR CADASTRO"} style={"btn btn-secondary btn-large"} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {error.isError && <ModalComponent status={error.status} message={error.message} textBtn={"Entendi"} action={() => setError({ ...error, isError: false })} />}
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 'smartvaga.token': token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    await apiClient.get('/profile');

    return {
        props: {}
    }
}