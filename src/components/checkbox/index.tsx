import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./Checkbox.module.css";

type CheckboxProps = {
    name: string;
    label: string;
    children: JSX.Element;
    checked: () => void;
}

export const CheckboxComponent = ({ name, label, children, checked }: CheckboxProps) => {
    const [status, setStatus] = useState(false);

    const handleCheckbox = () => {
        setStatus(!status);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.checkbox} ${status ? styles.checked : styles.unchecked}`} onClick={() => { handleCheckbox(); checked() }}>
                <span className={styles.checkmark}></span>
            </div>
            {children}
        </div>
    );
}