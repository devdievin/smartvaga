import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./MenuAdmin.module.css";

export default function MenuAdminComponent() {
    const [link1, setLink1] = useState(`${styles.menuLink}`);
    const [link2, setLink2] = useState(`${styles.menuLink}`);
    const [link3, setLink3] = useState(`${styles.menuLink}`);
    const router = useRouter();

    useEffect(() => {
        console.log(router.pathname);
        switch (router.pathname) {
            case "/admin/vagas":
                setLink1(`${styles.menuLink} ${styles.menuLinkActive}`);
                setLink2(`${styles.menuLink}`);
                setLink3(`${styles.menuLink}`);
                break;
            case "/admin/relatorios":
                setLink2(`${styles.menuLink} ${styles.menuLinkActive}`);
                setLink1(`${styles.menuLink}`);
                setLink3(`${styles.menuLink}`);
                break;
            case "/admin/configuracoes":
                setLink3(`${styles.menuLink} ${styles.menuLinkActive}`);
                setLink1(`${styles.menuLink}`);
                setLink2(`${styles.menuLink}`);
                break;
            default:
                setLink1(`${styles.menuLink}`);
                setLink2(`${styles.menuLink}`);
                setLink3(`${styles.menuLink}`);
                break;
        }
    }, [router.pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Painel do Administrador</p>
            </div>

            <div>
                <Link href={"/admin"} className={`${link1} ${styles.menuLinkDisable}`} >
                    <Image src={"/icons/icon-user.svg"} alt={"reservas"} width={26} height={26} />
                    <span>Lista de usuários</span>
                </Link>
                <Link href={"/admin"} className={`${link2} ${styles.menuLinkDisable}`}>
                    <Image src={"/icons/icon-reports.svg"} alt={"reservas"} width={26} height={26} />
                    <span>Relatórios</span>
                </Link>
                <Link href={"/admin/configuracoes"} className={`${link3}`}>
                    <Image src={"/icons/icon-settings-account.svg"} alt={"configurações"} width={26} height={26} />
                    <span>Configurações</span>
                </Link>
            </div>

            <div className={styles.appVersion}>
                © SmartVaga, versão {process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
        </div>
    );
}