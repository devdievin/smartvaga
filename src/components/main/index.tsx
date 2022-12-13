import styles from './Main.module.css';

type MainProps = {
    hideFooter: boolean;
    dark?: boolean;
    children: JSX.Element;
}

const MainComponent = ({ hideFooter, dark, children }: MainProps) => {

    const mainStyle = (hideFooter) ? styles.main : styles.mainFooter;

    const mainColor = (dark) ? styles.mainDark : "";

    return (
        <main className={`${mainStyle} ${mainColor}`}>
            {children}
        </main>
    );
}

export default MainComponent;