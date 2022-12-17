import Image from "next/image";
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

            <MainComponent hideFooter={false}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Image src={"/icons/icon-check.svg"} alt={"Certo"} width={60} height={60} />
                        <div className={styles.text}>
                            <h3>Uhull!</h3>
                            <h4>Estamos quase lá...</h4>
                        </div>
                    </div>

                    <div className={styles.content1}>
                        <p>Isso quer dizer que você quer mudar o jeito
                            que estaciona seu carro.</p>

                        <ul>
                            <li>Sem surpresas</li>
                            <li>Sem complicações</li>
                            <li>Tudo na palma da sua mão</li>
                        </ul>
                    </div>

                    <div className={styles.content2}>
                        <p>Tudo certo, podemos começar?</p>

                        <ButtonComponent text={"VAMOS NESSA!"} type={"button"} style={"btn btn-primary btn-large"} callback={() => Router.push("/login")} />
                    </div>
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}