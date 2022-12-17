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
                {(status === 200 || status === 201) ?
                    <Image src={"/icons/icon-check-circle-outline.svg"} alt={"Sucesso"} width={40} height={40} />
                    :
                    <Image src={"/icons/icon-circle-error.svg"} alt={"Erro"} width={40} height={40} className={styles.iconError} />
                }
                <p className="mt-1">{message}</p>
                <ButtonComponent text={"Continuar"} type={"button"} style={"btn btn-secondary btn-small mt-1"} callback={() => { router.push(redirectPath); }} />
            </div>
        </div>
    );
}