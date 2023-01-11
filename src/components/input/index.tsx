import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

import styles from './Input.module.css';

type InputProps = {
    label?: string;
    type: HTMLInputTypeAttribute;
    name: string;
    value?: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    mask?: string;
    state?: [string, Dispatch<SetStateAction<string>>];
    register: UseFormRegister<any>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const InputComponent = ({ label, type, name, value, placeholder, minLength, maxLength, required, disabled, mask, state, register, onChange, onClick }: InputProps) => {

    const inputMask = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        let data = e.target.value;

        switch (type) {
            case "cpf":
                data = data.replace(/[^\d]/g, "");
                data = data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                break;
            case "phone":
                data = data.replace(/[^\d]/g, "");
                data = data.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
                break;
            case "birth":
                data = data.replace(/[^\d]/g, "");
                data = data.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
                break;
        }

        state?.[1](data);
    }



    return (
        <div className={styles.inputGroup}>
            {(label) && <label>{label}</label>}
            {(state)
                ?
                <input {...register(name)} type={type} name={name} value={state[0]} placeholder={placeholder} minLength={minLength} maxLength={maxLength} required={required} disabled={disabled} onChange={(e) => { (mask) && inputMask(e, mask); onChange }} onClick={onClick} />
                :
                <input {...register(name)} type={type} name={name} value={value} placeholder={placeholder} minLength={minLength} maxLength={maxLength} required={required} disabled={disabled} onChange={onChange} onClick={onClick} />
            }
        </div>
    );
}

export default InputComponent;