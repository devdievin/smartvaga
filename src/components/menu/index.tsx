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

    const showMenu = (menuName: string, menuTitle: string) => {
        setMenu({ name: menuName, title: menuTitle });
        setMenuOpenned(true);
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
    }

    return (
        <div>
            {(menuOpenned) &&
                <ContentMenuComponent>
                    <div className='h-100'>
                        <div className={styles.headerMenu}>
                            <div className={styles.title}>{menu.title}</div>
                            <div onClick={closeMenu}>
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
                <div className={styles.iconLink} onClick={() => showMenu(MENUS.reserves, "Minhas Reservas")}>
                    <Image src={"/icons/archive.svg"} alt={"reservas"} width={32} height={32} />
                </div>
                <div className={styles.iconLink} onClick={() => showMenu(MENUS.cars, "Meus Carros")}>
                    <Image src={"/icons/car.svg"} alt={"carros"} width={32} height={32} />
                </div>
                <div className={styles.iconLink} onClick={() => showMenu(MENUS.help, "Ajuda")}>
                    <Image src={"/icons/help.svg"} alt={"ajuda"} width={32} height={32} />
                </div>
            </div>
        </div>
    );
}

export default MenuComponent;