import { HTMLInputTypeAttribute } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

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
    register: UseFormRegister<FieldValues>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = ({ label, type, name, value, placeholder, minLength, maxLength, required, register, onChange }: InputProps) => {
    return (
        <div className={styles.inputGroup}>
            {(label) && <label>{label}</label>}
            <input {...register(name)} type={type} name={name} value={value} placeholder={placeholder} minLength={minLength} maxLength={maxLength} required={required} onChange={onChange} />
        </div>
    );
}

export default InputComponent;