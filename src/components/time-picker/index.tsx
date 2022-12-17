import styles from "./TimePicker.module.css";

type TimePickerProps = {
    name: string;
    value: string;
    data: string[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TimePickerComponent = ({ name, value, data, onChange }: TimePickerProps) => {

    return (
        <div className={styles.containerSelect}>
            <select name={name} onChange={onChange} value={value} className={styles.selectTime}>
                {data.map((element, index) => {
                    return <option value={element} key={index}>{element}</option>
                })}
            </select>
        </div>
    );
}