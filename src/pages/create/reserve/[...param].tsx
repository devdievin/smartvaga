import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { ContentMenuComponent } from "../../../components/content-menu";
import HeadComponent from "../../../components/head";
import HeaderComponent from "../../../components/header";
import MainComponent from "../../../components/main";
import MenuComponent from "../../../components/menu";
import { ProfileComponent } from "../../../components/profile";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import { setExitTime } from "../../../utils/time";


export default function CreateReserve() {
    const router = useRouter();
    const { param } = router.query; // param é array de [0] = número vaga, [1] = data, [2] = horário entrada
    const { user } = useContext(AuthContext);
    const [vacancy, setVacancy] = useState();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        // console.log(param);
        api.get(`/vacancy/${param![0]}`)
            .then(response => {
                // console.log(response.data);
                setVacancy(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const onSubmit = async (data: any) => {
        data.car = JSON.parse(data.car);
        data.vacancy = vacancy;
        // console.log(data);
        const response = await api.post("/reserve", data);
        console.log(response.data);
    };

    const goBack = () => {
        router.push("/dashboard");
    }

    const exit_time = setExitTime(param![2], 1);

    return (
        <div>
            <HeadComponent title="Criar Reserva" description="teste" />

            <HeaderComponent>
                <ProfileComponent />
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <ContentMenuComponent>
                    <div className="h-100">
                        <h3>Reservar Vaga {param![0]}</h3>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* date - entry_time - exit_time - car - vacancy */}
                            <input readOnly {...register("date")} type={"date"} value={param![1]} className="input-default" />
                            <input readOnly {...register("entry_time")} type={"text"} value={param![2]} placeholder={"Horário de entrada"} className="input-default" />
                            <input readOnly {...register("exit_time")} type={"text"} value={exit_time} placeholder={"Horário de saída"} className="input-default" />

                            <select {...register("car")} className="select-default" id="selectCars">
                                {user?.cars ?
                                    user?.cars.map((car, index) => {
                                        return <option value={JSON.stringify(car)} key={index}>{car.brand} {car.name} {car.model}</option>
                                    }) :
                                    <option disabled={true} defaultValue={undefined}>Nenhum veículo cadastrado</option>
                                }
                            </select>

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