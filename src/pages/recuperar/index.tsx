import Router from "next/router";
import { useForm } from "react-hook-form";

import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import ButtonComponent from "../../components/button";
import FooterComponent from "../../components/footer";

import styles from "./Recover.module.css";

type FormProps = {
    email: string;
}

export default function Recover() {
    const { register, handleSubmit } = useForm<FormProps>();

    const onSubmit = async (data: FormProps) => {
        console.log(data);
    }

    return (
        <div>
            <HeadComponent title={"Recuperar conta Smartvaga"} description={"Recupere sua conta Smartvaga"} />

            <HeaderComponent logoLink="/">
                <ButtonComponent text={"Sign Up"} type={"button"} style={"btn btn-secondary btn-small"} callback={() => Router.push("/register")} />
            </HeaderComponent>

            <MainComponent hideFooter={true}>
                <div className={styles.container}>

                    <h3>Recuperar Conta</h3>

                    <p>Recupere sua conta Smartvaga</p>

                    <div className={styles.vectorImg}>
                        {/* Image here */}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} type="email" placeholder="Seu e-mail" required={true} />

                        <div className={styles.btnGroup}>
                            <ButtonComponent type="submit" text="PRÓXIMO" style="btn btn-primary btn-small" />
                        </div>
                    </form>
                </div>
            </MainComponent >

            <FooterComponent />
        </div >
    );
}