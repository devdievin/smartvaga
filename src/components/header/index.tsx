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
                <div className={styles.brand}></div>
            </Link>
            <div>
                {children}
            </div>
        </header>
    );
}

export default HeaderComponent;