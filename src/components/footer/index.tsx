import Link from 'next/link';
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
            <span>© {currentYear}, Smartvaga - feito por <Link href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}`}>Dievin</Link></span>
        </footer>
    );
}

export default FooterComponent;