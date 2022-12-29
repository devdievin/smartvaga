import Router from "next/router";

import ButtonComponent from "../../components/button";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";

import styles from "./Starting.module.css";

export default function Starting() {
    return (
        <div>
            <HeadComponent title="Iniciando no Smartvaga" description="lorem ipsum" />

            <HeaderComponent logoLink="/">
                <ButtonComponent text={"Login"} type={"button"} style={"btn btn-primary btn-small"} callback={() => Router.push("/login")} />
            </HeaderComponent>

            <MainComponent hideFooter={true}>
                <div className={styles.container}>
                    <h3>Seja bem-vindo(a) a bordo!</h3>

                    <p>Parabéns! Agora você faz parte do time dos
                        que buscam segurança e rapidez para
                        estacionar o carro.</p>

                    <div className={styles.vectorImg}>
                        {/* Image here */}
                    </div>

                    <ButtonComponent text={"VAMOS NESSA!"} type={"button"} style={"btn btn-secondary btn-large"} callback={() => Router.push("/login")} />
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}