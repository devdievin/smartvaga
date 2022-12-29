import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

import ButtonComponent from "../../components/button";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { ProfileComponent } from "../../components/profile";
import { QuestionerComponent } from "../../components/questioner";
import LoadingComponent from "../../components/loading";
import ModalComponent from "../../components/modal";

import styles from "./MyAccount.module.css";

type ErrorProps = {
    isError: boolean;
    status: number;
    message: string;
}

export default function MyAccount() {
    const router = useRouter();
    const { user, signOut } = useContext(AuthContext);
    const [userData, setUserData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [error, setError] = useState<ErrorProps>({ isError: false, status: 500, message: "Internal server error" });

    useEffect(() => {
        api.get("/profile")
            .then(response => {
                // console.log(response.data);
                setUserData(response.data);
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1 * 1000);
            });
    }, []);

    const handleDeleteAccount = async () => {
        try {
            setIsLoading(true);

            if (user) {
                const response = await api.delete(`/account/delete/${user.id}`);

                if (response.status === 200) {
                    await signOut();
                    return router.push("/");
                }

                return setError({ isError: true, status: response.status, message: response.data.message });
            }

            return setError({ isError: true, status: 400, message: "ID do usuário inválido!" });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setError({
                isError: true,
                status: error.response.status,
                message: error.response.data.message
            });
        }
    }

    return (
        <div>
            <HeadComponent title={"Minha Conta - Smartvaga"} description={"Confira e altere seus dados na Smartvaga."} />

            <HeaderComponent logoLink="/dashboard">
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={true} dark={true}>
                <div className={`main-container`}>
                    {userData &&
                        <>
                            <div className="container bg-dark">
                                {isLoading ? <LoadingComponent /> :
                                    <div className={styles.wrapper}>
                                        <div className={styles.backPage}>
                                            <Link href={"/dashboard"}>
                                                <Image src={"/icons/icon-arrow-back.svg"} alt={"início"} width={14} height={12.25} />
                                                <span>Início</span>
                                            </Link>
                                        </div>
                                        <div className={styles.header}>
                                            <div className={styles.imgProfile}>
                                                <Image src={"/icons/profilecircle.svg"} alt={"minha foto"} width={64} height={64} />
                                            </div>

                                            <div className={styles.text}>
                                                <h3>{userData.name}</h3>
                                                <p>{userData.email}</p>
                                            </div>

                                            <div className={styles.iconEdit}>
                                                <Image src={"/icons/icon-edit.svg"} alt={"editar minha conta"} title={"Editar"} width={26} height={26} onClick={() => router.push("/minha-conta/editar")} />
                                            </div>
                                        </div>

                                        <div className={styles.info}>
                                            <p><span className={styles.label}>Email:</span>{userData.email}</p>
                                            <p><span className={styles.label}>Data de nascimento:</span>{moment(userData.birth_date).format("DD/MM/YYYY")}</p>
                                            <p><span className={styles.label}>Cpf:</span>{userData.cpf}</p>
                                            <p className={styles.passwordWrapper}>
                                                <span className={styles.label}>Senha:</span>
                                                <input type="password" value={userData.password} className={styles.input} disabled={true} />
                                            </p>

                                            <p><span className={styles.label}>Usuário desde:</span>{moment(userData.created_at).locale('pt-br').format("MMM/YYYY")}</p>

                                            <ButtonComponent type="button" text="Remover Conta" style="btn btn-outline-primary btn-small" callback={() => setDeleteAccount(true)} />
                                        </div>

                                        {deleteAccount &&
                                            <QuestionerComponent message={"Tem certeza que deseja excluir sua conta?"} negativeAction={() => setDeleteAccount(false)} positiveAction={handleDeleteAccount} />
                                        }

                                        {error.isError &&
                                            <ModalComponent status={error.status} message={error.message} textBtn={"Entendi"} action={() => setError({ ...error, isError: false })} />
                                        }
                                    </div>
                                }
                            </div>
                            <div className={`menu-left`}>
                                <MenuComponent />
                            </div>
                        </>
                    }
                </div>
            </MainComponent>
        </div>
    );
}