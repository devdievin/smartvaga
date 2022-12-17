import Router from "next/router";
import { useForm } from "react-hook-form";

import ButtonComponent from "../../components/button";
import CardComponent from "../../components/card";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import MainComponent from "../../components/main";

import styles from "./Recover.module.css";

export default function Recover() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <div>
            <HeadComponent title={"Recuperar conta Smartvaga"} description={"Recupere sua conta Smartvaga"} />

            <HeaderComponent logoLink="/">
                <ButtonComponent text={"Sign Up"} type={"button"} style={"btn btn-secondary btn-small"} callback={() => Router.push("/register")} />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <CardComponent color={"primary"}>
                        <div>
                            <div className={styles.header}>
                                <h3>Recuperar conta</h3>
                                <h4>Recupere sua conta Smartvaga</h4>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <InputComponent type={"email"} name={"email"} placeholder={"Seu e-mail"} register={register} required={true} />

                                    <div>
                                        <ButtonComponent type="submit" text="PRÓXIMO" style="btn btn-primary btn-large" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </CardComponent>
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}