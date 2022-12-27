import Image from "next/image";
import { useRouter } from "next/router";
import ButtonComponent from "../button";
import styles from "./Modal.module.css";

type ModalProps = {
    status: number;
    message: string;
    redirectPath: string;
}

export default function ModalComponent({ status, message, redirectPath }: ModalProps) {
    const router = useRouter();

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
                    <ButtonComponent text={"Continuar"} type={"button"} style={"btn btn-secondary btn-large"} callback={() => { router.push(redirectPath); }} />
                </div>
            </div>
        </div>
    );
}