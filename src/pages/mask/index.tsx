import { useRef } from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../components/button";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import MainComponent from "../../components/main";

import styles from "./Mask.module.css";

const Mask = () => {
    const { register, handleSubmit } = useForm();
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (data: any) => {
        console.log(data);
        resetForm();
    }

    const resetForm = () => {
        formRef.current?.reset();
    }

    return (
        <div>
            <HeadComponent title="Teste Máscara" description="test input mask" />

            <HeaderComponent logoLink={"/"}>
                <span>teste</span>
            </HeaderComponent>

            <MainComponent hideFooter={false} dark>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                        <InputComponent register={register} type={"text"} name={"cpf"} label={"Digite o cpf:"} placeholder={"cpf"} />

                        <div className={styles.btnGroup}>
                            <ButtonComponent type="reset" text="Limpar" style="btn btn-outline-secondary btn-small" />
                            <ButtonComponent type="submit" text="OK" style="btn btn-secondary btn-small"/>
                        </div>
                    </form>
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}

export default Mask;