
import Image from 'next/image';
import { useState } from 'react';
import styles from './Menu.module.css';

type MenuProps = {
    showMenu: (menuName: string) => void
}

const MenuComponent = () => {
    const [menuOpenned, setMenuOpenned] = useState(false);
    const [menuName, setMenuName] = useState("");

    const showMenu = (menuName: string) => {
        setMenuName(menuName);
        setMenuOpenned(true);
    }

    const closeMenu = () => {
        setMenuOpenned(false);
    }

    return (
        <div>
            {(menuOpenned) &&
                <div className={styles.contentMenu}>
                    <div>Menu: {menuName}</div>
                    <div onClick={closeMenu}>
                        X
                    </div>
                </div>
            }
            <div className={styles.menu}>
                <div className={styles.iconLink} onClick={() => showMenu("reserves")}>
                    <Image src={"/icons/archive.svg"} alt={"reservas"} width={32} height={32} />
                </div>
                <div className={styles.iconLink} onClick={() => showMenu("cars")}>
                    <Image src={"/icons/car.svg"} alt={"carros"} width={32} height={32} />
                </div>
                <div className={styles.iconLink} onClick={() => showMenu("help")}>
                    <Image src={"/icons/help.svg"} alt={"ajuda"} width={32} height={32} />
                </div>
            </div>
        </div>
    );
}

export default MenuComponent;