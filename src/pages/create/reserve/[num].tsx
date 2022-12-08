import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ContentMenuComponent } from "../../../components/content-menu";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import MainComponent from "../../../components/main";
import MenuComponent from "../../../components/menu";
import { ProfileComponent } from "../../../components/profile";

export default function CreateReserve() {
    const router = useRouter();
    const { num } = router.query;
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        // console.log(num);
    }, []);

    const onSubmit = (data: any) => {
        console.log(data)
    };

    const goBack = () => {
        router.push("/dashboard");
    }

    return (
        <div>
            <HeadComponent title="Criar Reserva" description="teste" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div className="h-100">
                        <h3>Reservar Vaga {num}</h3>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* date - entry_time - exit_time - car - vacancy */}
                            <input {...register("date")} type={"date"} className="input-default" required={true}/>
                            <input {...register("entry_time")} type={"text"} placeholder={"Horário de entrada"} className="input-default" required={true}/>
                            <input {...register("exit_time")} type={"text"} placeholder={"Horário de saída"} className="input-default" required={true}/>
                            <button type="button" className="btn btn-large" onClick={goBack}>Cancelar</button>
                            <button type="submit" className="btn btn-primary btn-large">Salvar</button>
                        </form>
                    </div>
                </ContentMenuComponent>
            </MainComponent>

            <MenuComponent />
        </div>
    );
}