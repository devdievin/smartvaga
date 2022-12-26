import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../components/button";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import InputComponent from "../../components/input";
import MainComponent from "../../components/main";
import { setTimeRange, TIME_RANGE, TODAY, WORKING_DAY } from "../../utils/time";

import styles from "./Mask.module.css";

type FormInputs = {
    cpf: string;
    email: string;
    phone: string;
}

const Mask = () => {
    const [user, setUser] = useState<FormInputs | null>(null);
    const [cpf, setCpf] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [data, setData] = useState<string>("");
    const { register, handleSubmit, control, reset, setError, formState: { errors } } = useForm<FormInputs>();
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleHours = () => {
        console.log("HORA ATUAL:", TODAY);
        console.log("HORA DE TRABALHO", WORKING_DAY);

        setTimeRange("2022-12-26", TIME_RANGE);
    }

    // const onSubmit = (data: any) => {
    //     console.log(data);
    //     // resetForm();
    // }

    // const resetForm = () => {
    //     formRef.current?.reset();
    // }

    // useEffect(() => {
    //     setError("cpf", {
    //         // types: {
    //         //     required: "Cpf requerido",
    //         //     minLength: "Cpf precisa de 11 dígitos"
    //         // },
    //         type: "required",
    //         message: "CPF inválido!"
    //     });
    // }, [setError]);

    return (
        <div>
            <HeadComponent title="Teste Máscara" description="test input mask" />

            <HeaderComponent logoLink={"/"}>
                <span>teste</span>
            </HeaderComponent>

            <MainComponent hideFooter={false} dark>
                <div className={styles.container}>
                    {/* <form onSubmit={handleSubmit(onSubmit)} ref={formRef}> */}
                    <form>

                        <InputComponent register={register} name={"cpf"} type={"text"} placeholder={"Seu cpf"} minLength={11} maxLength={14} mask={"cpf"} state={[data, setData]} required={true} />
                        {errors.cpf && <p>{errors.cpf.message}</p>}
                        {/* {errors.cpf && errors.cpf.types && <p>{errors.cpf.types.required}</p>} */}
                        {/* {errors.cpf && errors.cpf.types && <p>{errors.cpf.types.minLength}</p>} */}

                        <InputComponent register={register} name={"phone"} type={"text"} placeholder={"Seu telefone"} minLength={11} maxLength={11} mask={"phone"} state={[phone, setPhone]} required={true} />

                        <InputComponent register={register} name={"birth_date"} type={"text"} placeholder={"Data de nascimento"} minLength={8} maxLength={8} mask={"birth"} state={[birth, setBirth]} required={true} />

                        {/* <InputComponent register={register} name={"email"} type={"email"} value={"zedarampa@email.com"} required={true}/> */}

                        {/* <input {...register("cpf")} type="text" className="input-default" value={data} minLength={11} maxLength={14} placeholder={"Seu cpf"} onChange={cpfMask} required={true}/>

                        <input {...register("phone")} type="text" className="input-default" value={data} minLength={11} maxLength={11} placeholder={"Seu telefone"} onChange={phoneMask} required={true}/> */}

                        {/* <InputComponent register={register} type={"text"} name={"cpf"} label={"Digite o cpf:"} maxLength={11}/> */}
                        {/* <InputMask
                            mask='999.999.999-99'
                            value={user?.cpf}
                            onChange={(e) => setUser({ ...user, cpf: e.target.value })}>
                        </InputMask> */}

                        {/* <Controller control={control} name="cpf" defaultValue={""} rules={{ required: true, minLength: 11 }} render={
                            ({ field: { onChange, onBlur, value, name, ref } }) => {
                                return <>
                                    <InputMask
                                        type={"text"}
                                        mask='999.999.999-99'
                                        name={name}
                                        value={value}
                                        placeholder={"Seu cpf"}
                                        minLength={11}
                                        required={true}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="input-default"
                                        inputRef={ref}
                                    >
                                    </InputMask>
                                    {errors.cpf && <p>{errors.cpf.message}</p>}
                                </>;
                            }
                        } /> */}
                        {/* <Controller control={control} name="cpf" defaultValue={""} rules={{ required: true, minLength: 11 }} render={
                            ({ field: { onChange, onBlur, value, name, ref } }) => {
                                return <>
                                    <input
                                        type={"text"}
                                        name={name}
                                        value={value}
                                        ref={ref}
                                        placeholder={"Seu cpf"}
                                        maxLength={11}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="input-default"
                                    />
                                    {errors.cpf && <p>{errors.cpf.message}</p>}
                                </>;
                            }
                        } />

                        <Controller control={control} name="email" defaultValue={""} rules={{ required: true, maxLength: 30 }} render={
                            ({ field: { onChange, onBlur, value, name, ref } }) => {
                                return <input
                                    type={"email"}
                                    name={name}
                                    value={value}
                                    ref={ref}
                                    placeholder={"Seu e-mail"}
                                    maxLength={20}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="input-default"
                                />
                            }
                        } /> */}

                        <div className={styles.btnGroup}>
                            {/* <ButtonComponent type="button" text="Limpar" style="btn btn-outline-secondary btn-small" callback={reset}/> */}
                            {/* <ButtonComponent type="submit" text="OK" style="btn btn-secondary btn-small" /> */}
                            <ButtonComponent type="button" text="Hora server" style="btn btn-secondary btn-small" callback={handleHours} />
                        </div>
                    </form>
                </div>
            </MainComponent>

            <FooterComponent />
        </div>
    );
}

export default Mask;