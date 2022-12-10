import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContentMenuComponent } from "../../../components/content-menu";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import MainComponent from "../../../components/main";
import MenuComponent from "../../../components/menu";
import { ProfileComponent } from "../../../components/profile";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";

import styles from "./CarAdd.module.css";

const CarAdd = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        data.user = user;
        // console.log(data);
        const response = await api.post("/car", data);
        console.log(response.data);
    }

    return (
        <div>
            <HeadComponent title="add car" description="lorem..." />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div>
                        <h3>Cadastrar veículo</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("name")} type="text" placeholder="Nome" className="input-default" required />
                            <input {...register("model")} type="text" placeholder="Modelo" className="input-default" required />
                            <input {...register("year")} type="text" placeholder="Ano" className="input-default" required />
                            <input {...register("brand")} type="text" placeholder="Marca" className="input-default" required />
                            <input {...register("color")} type="text" placeholder="Cor" className="input-default" required />
                            <input {...register("licensePlate")} type="text" placeholder="Placa do veículo" className="input-default" required />
                            <button type="button" className="btn btn-default btn-small" onClick={() => router.push("/dashboard")}>Voltar</button>
                            <button type="submit" className="btn btn-primary btn-small">Salvar</button>
                        </form>
                    </div>
                </ContentMenuComponent>
            </MainComponent>

            <MenuComponent />
        </div>
    );
}

export default CarAdd;