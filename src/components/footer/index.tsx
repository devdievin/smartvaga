import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

const FooterComponent = () => {
    const [currentYear, setCurrentYear] = useState(2022);

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <footer className={styles.footer}>
            <span>© {currentYear}, Smartvaga - feito por Dievin</span>
        </footer>
    );
}

export default FooterComponent;