import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./Checkbox.module.css";

type CheckboxProps = {
    name: string;
    label: string;
    required: boolean;
    children: JSX.Element;
    register: UseFormRegister<FieldValues>;
}

export const CheckboxComponent = ({ name, label, required, children, register }: CheckboxProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.checkmark}>
                <input {...register(name)} type={"checkbox"} required={required} className={styles.checkbox} />
            </span>
            {children}
        </div>
    );
}