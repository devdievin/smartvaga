import { HTMLInputTypeAttribute } from "react";

import styles from './Input.module.css';

type InputProps = {
    label: string,
    type: HTMLInputTypeAttribute
    name: string
    placeholder?: string,
    required: boolean
}

const InputComponent = ({ label, type, name, placeholder, required }: InputProps) => {
    return (
        <div className={styles.inputGroup}>
            <label>{label}</label>
            <input type={type} name={name} placeholder={placeholder} required={required} />
        </div>
    );
}

export default InputComponent;