import { HTMLInputTypeAttribute } from "react";

import styles from './Input.module.css';

type InputProps = {
    label?: string,
    type: HTMLInputTypeAttribute
    name: string
    placeholder?: string,
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = ({ label, type, name, placeholder, required, onChange }: InputProps) => {
    return (
        <div className={styles.inputGroup}>
            {(label) && <label>{label}</label>}
            <input type={type} name={name} placeholder={placeholder} required={required} onChange={onChange} />
        </div>
    );
}

export default InputComponent;