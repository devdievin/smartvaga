import Link from 'next/link';
import styles from './Header.module.css';

type HeaderProps = {
    logoLink: string;
    children: JSX.Element;
}

const HeaderComponent = ({ logoLink, children }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Link href={logoLink}><span className={styles.brand}>SMARTVAGA</span></Link>
            <div>
                {children}
            </div>
        </header>
    );
}

export default HeaderComponent;