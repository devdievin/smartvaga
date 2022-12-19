import Image from 'next/image';
import { useState } from 'react';
import { CarMenuComponent } from '../car-menu';
import { ContentMenuComponent } from '../content-menu';
import { HelpComponent } from '../help-menu';
import { ReserveMenuComponent } from '../reserve-menu';
import styles from './Menu.module.css';

type MenuProps = {
    name: string;
    title: string;
}

enum MENUS { reserves = "reserves", cars = "cars", help = "help" };

const MenuComponent = () => {
    const [menuOpenned, setMenuOpenned] = useState(false);
    const [menu, setMenu] = useState<MenuProps>({ name: MENUS.reserves, title: "Minhas Reservas" });
    const [reserveStatus, setReserveStatus] = useState(styles.iconLink);
    const [carStatus, setCarStatus] = useState(styles.iconLink);
    const [helpStatus, setHelpStatus] = useState(styles.iconLink);

    const showMenu = (menuName: string, menuTitle: string) => {
        setMenu({ name: menuName, title: menuTitle });

        setIconStatus(menuName);

        if (menuOpenned && (menuName === menu.name)) {
            setIconStatus("none");
        }

        if (menuOpenned && menuName !== menu.name) {
            return setMenuOpenned(true);
        }

        setMenuOpenned(!menuOpenned);
    }

    const menuSwitch = (name: string) => {
        switch (name) {
            case MENUS.reserves:
                return <ReserveMenuComponent />;
            case MENUS.cars:
                return <CarMenuComponent />;
            case MENUS.help:
                return <HelpComponent />;
        }
    }

    const closeMenu = () => {
        setMenuOpenned(false);
        setIconStatus("none");
    }

    const setIconStatus = (menu: string) => {
        switch (menu) {
            case MENUS.reserves:
                setReserveStatus(`${styles.iconLink} ${styles.active}`);
                setCarStatus(styles.iconLink);
                setHelpStatus(styles.iconLink);
                break;
            case MENUS.cars:
                setCarStatus(`${styles.iconLink} ${styles.active}`);
                setReserveStatus(styles.iconLink);
                setHelpStatus(styles.iconLink);
                break;
            case MENUS.help:
                setHelpStatus(`${styles.iconLink} ${styles.active}`);
                setReserveStatus(styles.iconLink);
                setCarStatus(styles.iconLink);
                break;
            default:
                setReserveStatus(styles.iconLink);
                setCarStatus(styles.iconLink);
                setHelpStatus(styles.iconLink);
                break;
        }
    }

    return (
        <div className='h-100'>
            {(menuOpenned) &&
                <ContentMenuComponent>
                    <div className='h-100'>
                        <div className={styles.headerMenu}>
                            <div className={styles.title}>{menu.title}</div>
                            <div onClick={closeMenu} className={styles.iconClose}>
                                <Image src={"/icons/icon-close.svg"} alt={"Botão fechar"} width={16} height={16} />
                            </div>
                        </div>

                        <div className={styles.componentWrapper}>
                            {menuSwitch(menu.name)}
                        </div>
                    </div>
                </ContentMenuComponent>
            }
            <div className={styles.menu}>
                <div className={reserveStatus} onClick={() => showMenu(MENUS.reserves, "Minhas Reservas")}>
                    <Image src={"/icons/archive.svg"} alt={"reservas"} width={32} height={32} />
                    <span className={styles.labelBtn}>Minhas Reservas</span>
                </div>
                <div className={carStatus} onClick={() => showMenu(MENUS.cars, "Meus Carros")}>
                    <Image src={"/icons/car.svg"} alt={"carros"} width={32} height={32} />
                    <span className={styles.labelBtn}>Meus Carros</span>
                </div>
                <div className={helpStatus} onClick={() => showMenu(MENUS.help, "Ajuda")}>
                    <Image src={"/icons/help.svg"} alt={"ajuda"} width={32} height={32} />
                    <span className={styles.labelBtn}>Ajuda</span>
                </div>
                <div className={styles.version}>
                    <span>Smartvaga - versão 1.1.0</span>
                </div>
            </div>
        </div>
    );
}

export default MenuComponent;