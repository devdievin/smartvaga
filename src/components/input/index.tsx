import { HTMLInputTypeAttribute } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from './Input.module.css';

type InputProps = {
    label?: string;
    type: HTMLInputTypeAttribute;
    name: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = ({ label, type, name, value, placeholder, required, register, onChange }: InputProps) => {
    return (
        <div className={styles.inputGroup}>
            {(label) && <label>{label}</label>}
            <input {...register(name)} type={type} name={name} value={value} placeholder={placeholder} required={required} onChange={onChange} />
        </div>
    );
}

export default InputComponent;