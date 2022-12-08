import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Help.module.css";

export const HelpComponent = () => {
    const [currentYear, setCurrentYear] = useState(2022);

    useEffect(() => {
        const date = new Date();
        setCurrentYear(date.getFullYear());
    }, []);

    return (
        <div className={styles.helpContainer}>
            <div>
                <h3>Smartvaga</h3>

                <p>É uma plataforma de consulta e reserva de vagas de estacionamento. De maneira simples e intuitiva, reserve a vaga do seu carro no dia e horário disponível. Faça tudo pelo seu celular ou computador.</p>

                <h3>ATENÇÃO:</h3>

                <p>Esta plataforma é apenas um projeto teste, todos os processos são em ambiente simulado.</p>
            </div>

            <div className={styles.footer}>
                <span>©{currentYear}, Smartvaga - feito por <Link href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}`} target={"_blank"}>Dievin</Link></span>
            </div>
        </div>
    );
}