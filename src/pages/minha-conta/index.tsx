import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

import ButtonComponent from "../../components/button";
// import { ContentMenuComponent } from "../../components/content-menu";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { ProfileComponent } from "../../components/profile";
import InputComponent from "../../components/input";
import { QuestionerComponent } from "../../components/questioner";
import LoadingComponent from "../../components/loading";

import styles from "./MyAccount.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function MyAccount() {
    const router = useRouter();
    const { signOut } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [userData, setUserData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

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

    const onSubmit = (data: any) => {
        console.log(data);
    }

    const handleDeleteAccount = async () => {
        await signOut();
        router.push("/");
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
                                                <Image src={"/icons/icon-edit.svg"} alt={"editar minha conta"} width={26} height={26} onClick={() => setEdit(true)} />
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

                                        {edit &&
                                            <div className={styles.containerModal}>
                                                <div className={styles.modalForm}>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <InputComponent type={"text"} name={"name"} label={"Nome:"} value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} register={register} />
                                                        <InputComponent type={"email"} name={"email"} label={"E-mail:"} value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} register={register} />
                                                        <InputComponent type={"date"} name={"birth_date"} label={"Data de nascimento:"} value={userData.birth_date} onChange={(e) => setUserData({ ...userData, birth_date: e.target.value })} register={register} />
                                                        <InputComponent type={"number"} name={"cpf"} label={"Cpf:"} value={userData.cpf} onChange={(e) => setUserData({ ...userData, cpf: e.target.value })} register={register} />
                                                        <InputComponent type={"password"} name={"password"} label={"Senha:"} value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} register={register} />

                                                        <ButtonComponent type="submit" text="Salvar" style="btn btn-secondary btn-small w-100" />
                                                        <ButtonComponent type="button" text="Cancelar" style="btn btn-outline-secondary btn-small mt-1 w-100" callback={() => { setEdit(false); }} />
                                                    </form>
                                                </div>
                                            </div>
                                        }

                                        {deleteAccount &&
                                            <QuestionerComponent message={"Tem certeza que deseja excluir sua conta?"} negativeAction={() => setDeleteAccount(false)} positiveAction={handleDeleteAccount} />
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

            {/* <MenuComponent /> */}
        </div>
    );
}