import Image from "next/image";
import ButtonComponent from "../button";
import styles from "./Questioner.module.css";

type QuestionerProps = {
    message: string;
    negativeAction?: () => void;
    positiveAction?: () => void;
}

export const QuestionerComponent = ({ message, negativeAction, positiveAction }: QuestionerProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardIcon}>
                    <Image src={"/icons/icon-alert-triangle-outline.svg"} alt={"Alerta"} width={72} height={72} />
                </div>

                <div className={styles.cardMessage}>
                    <p>{message}</p>
                </div>

                <div className={styles.btnGroup}>
                    <ButtonComponent text={"Não"} type={"button"} style={"btn btn-outline-secondary btn-large"} callback={negativeAction} />
                    <ButtonComponent text={"Sim"} type={"button"} style={"btn btn-secondary btn-large"} callback={positiveAction} />
                </div>
            </div>
        </div>
    );
}