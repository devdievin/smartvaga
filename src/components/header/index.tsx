import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

type HeaderProps = {
    logoLink: string;
    children: JSX.Element;
}

const HeaderComponent = ({ logoLink, children }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Link href={logoLink}>
                {/* <span className={styles.brand}>
                    <span>SMART</span>VAGA
                </span> */}
                {/* <Image src={"/logo.svg"} alt={"SmartVaga"} width={120} height={28} /> */}
                <div className={styles.brand}></div>
            </Link>
            <div>
                {children}
            </div>
        </header>
    );
}

export default HeaderComponent;