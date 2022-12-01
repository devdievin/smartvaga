import Link from 'next/link';
import styles from './Header.module.css';

type HeaderProps = {
    children: JSX.Element
}

const HeaderComponent = ({children}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Link href="/"><span className={styles.brand}>SMARTVAGA</span></Link>
            <div>
                {children}
            </div>
        </header>
    );
}

export default HeaderComponent;