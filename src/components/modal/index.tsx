import Image from "next/image";
import ButtonComponent from "../button";
import styles from "./Modal.module.css";

type ModalProps = {
    status: number;
    message: string;
    textBtn: string;
    action: () => Promise<void> | void;
}

export default function ModalComponent({ status, message, textBtn, action }: ModalProps) {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div>
                    {(status === 200 || status === 201) ?
                        <Image src={"/icons/icon-check-circle-outline.svg"} alt={"Sucesso"} width={60} height={61} />
                        :
                        <Image src={"/icons/icon-circle-error.svg"} alt={"Erro"} width={60} height={61} className={styles.iconError} />
                    }
                </div>
                <p className={styles.message}>{message}</p>
                <div className={styles.btnGroup}>
                    <ButtonComponent text={textBtn} type={"button"} style={"btn btn-secondary btn-large"} callback={action} />
                </div>
            </div>
        </div>
    );
}