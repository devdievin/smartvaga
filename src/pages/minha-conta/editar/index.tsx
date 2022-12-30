import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

import ButtonComponent from "../../../components/button";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import InputComponent from "../../../components/input";
import LoadingComponent from "../../../components/loading";
import MainComponent from "../../../components/main";
import ModalComponent from "../../../components/modal";
import { ProfileComponent } from "../../../components/profile";

import styles from "./AccountEdit.module.css";

type ResponseResultProps = {
    status: number;
    message: string;
}

export default function AccountEdit() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>();
    const [cpf, setCpf] = useState("");
    const [profileCompare, setProfileCompare] = useState<any>();
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [responseResult, setResponseResult] = useState<ResponseResultProps>({ status: 200, message: "OK" });
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        api.get("/profile")
            .then(response => {
                // console.log(response.data);
                setUserData(response.data);
                setCpf(response.data.cpf);
                setProfileCompare(response.data);
            })
            .catch(err => {
                console.error(err)
                setResponseResult({
                    status: err.response.status,
                    message: err.response.data.message
                });
                setIsLoading(false);
                setSubmitted(true);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1 * 1000);
            });
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const { password, ...rest } = data;

            const result = (password === profileCompare.password) ? rest : { ...rest, password };

            setIsLoading(true);

            const response = await api.put(`/account/update/${userData.id}`, result);

            setResponseResult({
                status: response.status,
                message: response.data.message
            });

            if (response) setIsLoading(false);

            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setResponseResult({
                status: error.response.status,
                message: error.response.data.message
            });
            setIsLoading(false);
            setSubmitted(true);
        }
    }

    const clearInputPassword = (e: any) => {
        if (e.target.value === profileCompare.password) {
            setUserData({...userData, password: ""});
        }
    }

    return (
        <div>
            <HeadComponent title="Editar Conta" description="Edite os dados da sua conta Smartvaga" />

            <HeaderComponent logoLink={"/dashboard"}>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                <div className="h-100">
                    {isLoading ? <LoadingComponent /> :
                        <div className={styles.container}>
                            <div className={styles.header}>
                                <h3>Editar conta</h3>
                            </div>

                            <div >
                                {userData &&
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <InputComponent type={"text"} name={"name"} label={"Nome:"} value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} register={register} required={true} />
                                        <InputComponent type={"email"} name={"email"} label={"E-mail:"} value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} register={register} required={true} />
                                        <div className={styles.group}>
                                            <InputComponent type={"date"} name={"birth_date"} label={"Nascimento:"} value={userData.birth_date} onChange={(e) => setUserData({ ...userData, birth_date: e.target.value })} register={register} required={true} />
                                            <InputComponent type={"text"} name={"cpf"} label={"Cpf:"} mask={"cpf"} state={[cpf, setCpf]} minLength={11} maxLength={11} register={register} required={true} />
                                        </div>

                                        <InputComponent type={"password"} name={"password"} label={"Senha:"} value={userData.password} minLength={8} onChange={(e) => setUserData({ ...userData, password: e.target.value })} register={register} onClick={clearInputPassword} required={true} />

                                        <div className={styles.btnGroup}>
                                            <ButtonComponent type="submit" text="Salvar" style="btn btn-secondary btn-small w-100" />
                                            <ButtonComponent type="button" text="Cancelar" style="btn btn-outline-secondary btn-small w-100" callback={() => { router.back(); }} />
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    }

                    {submitted && <ModalComponent status={responseResult.status} message={responseResult.message} textBtn={"Continuar"} action={() => { router.push("/minha-conta"); }} />}
                </div>
            </MainComponent>
        </div>
    );
}