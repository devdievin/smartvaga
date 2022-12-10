import Router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContentMenuComponent } from "../../components/content-menu";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import MenuComponent from "../../components/menu";
import { ProfileComponent } from "../../components/profile";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const Complete = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const updateData = { ...user, cpf: data.cpf, birth_date: data.birth_date };
            const response = await api.put(`/account/update/${user?.id}`, updateData);
            
            if (response.status === 200) return Router.push("/dashboard");

            console.log(response.data);
        } catch (err) {
            console.error(err.response.data);
        }
    }

    return (
        <div>
            <HeadComponent title="complete" description="bla bla bla" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>
            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div>
                        <h4>Olá {user?.name},</h4>
                        <p>Para ter acesso a plataforma com mais segurança, complete seus dados cadastrais.</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("cpf")} type="text" className="input-default" placeholder="Seu cpf" required />
                            <input {...register("birth_date")} type="text" className="input-default" placeholder="Data de nascimento" required />
                            <button type="submit" className="btn btn-primary btn-small">Terminar</button>
                        </form>
                    </div>
                </ContentMenuComponent>
            </MainComponent>

            <MenuComponent />
        </div>
    );
}

export default Complete;