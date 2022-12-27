import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import ButtonComponent from "../button";
import styles from "./Payment.module.css";

type PaymentProps = {
    status: number;
    message: string;
    redirectPath: string;
    onSubmit: () => Promise<void>;
    onClose: MouseEventHandler<HTMLImageElement>
}

export const PaymentComponent = ({ status, message, redirectPath, onSubmit, onClose }: PaymentProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [finish, setFinish] = useState(false);
    const router = useRouter();

    const submitPayment = () => {
        onSubmit();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setFinish(true);
        }, 3 * 1000);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {!isLoading && !finish &&
                    <>
                        <div className={styles.header}>
                            <span className={styles.title}>Forma de pagamento</span>
                            <span className={styles.iconClose}>
                                <Image src={"/icons/icon-close.svg"} alt={"fechar"} width={16} height={16} onClick={onClose} />
                            </span>
                        </div>

                        <div className={styles.payments}>
                            <label className={styles.formControl}>
                                <input type="radio" name="radio" defaultChecked />
                                <Image src={"/icons/icon-credit-card.svg"} alt={"cartão de crédito"} width={32} height={24} />
                                Cartão de crédito
                            </label>
                            <label className={styles.formControl}>
                                <input type="radio" name="radio" />
                                <Image src={"/icons/icon-pix.svg"} alt={"pix"} width={32} height={24} />
                                Pix
                            </label>
                        </div>

                        <div className={styles.infos}>
                            <p className={styles.total}>Total: <span>R$ 5,00</span></p>
                            <p className={styles.obs}>*Obs: Este é um pagamento simulado.</p>
                        </div>

                        <div className={styles.bntGroup}>
                            <ButtonComponent type="button" text="PAGAR" style="btn btn-secondary btn-large w-100" callback={submitPayment} />
                        </div>
                    </>
                }
                {isLoading && !finish &&
                    <div className={styles.loader}>
                        <p>Processando pagamento...</p>
                        <div className={styles.spinner}></div>
                    </div>
                }

                {finish &&
                    <div className={styles.result}>
                        {(status === 200 || status === 201) ?
                            <Image src={"/icons/icon-check-circle-outline.svg"} alt={"Sucesso"} width={60} height={61} />
                            :
                            <Image src={"/icons/icon-circle-error.svg"} alt={"Erro"} width={60} height={61} className={styles.iconError} />
                        }
                        <p className={styles.message}>{message}</p>
                        <ButtonComponent text={"Continuar"} type={"button"} style={"btn btn-secondary btn-large mt-1"} callback={() => { router.push(redirectPath); }} />
                    </div>
                }
            </div>
        </div>
    );
}