// import { formatTimeZero } from "../../utils/format";
import { timeNow, TODAY } from "../../utils/time";

import styles from "./ExpiredTag.module.css";

type ExpiredTagProps = {
    date: string;
    exit_time: string
}

export default function ExpiredTagComponent({ date, exit_time }: ExpiredTagProps) {
    return (
        <div>
            {(date < TODAY || (date === TODAY && (exit_time <= timeNow()))) ?
                <div className={styles.expiredTag}>Reserva expirada!</div>
                :
                <></>
            }
        </div>
    );
}