import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./Profile.module.css";

export const ProfileComponent = () => {
    const router = useRouter();
    const { user, signOut } = useContext(AuthContext);
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleProfile = () => {
        setToggleMenu(toggleMenu => !toggleMenu);
    }

    const logout = async (event: any) => {
        await signOut();
    }

    return (
        <div className={styles.profileMenu}>
            <div className={styles.profile} onClick={handleProfile}></div>

            <div className={`${styles.menu} ${toggleMenu ? styles.menuActive : styles.menuHidden}`}>
                <div className={styles.header}>
                    <h3>{user?.name ? user.name : "usuário"}</h3>
                    <h4>{user?.email ? user.email : "user@email.com"}</h4>
                </div>
                <ul>
                    <li onClick={() => router.push("/minha-conta")}>
                        <div className={styles.btn}>
                            <Image src={"/icons/icon-settings-account.svg"} alt={"minha conta"} width={16} height={16} />
                            <span>Minha conta</span>
                        </div>
                    </li>
                    <li onClick={logout}>
                        <div className={styles.btn} >
                            <Image src={"/icons/icon-turn-off.svg"} alt={"sair"} width={16} height={16} />
                            <span>Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}