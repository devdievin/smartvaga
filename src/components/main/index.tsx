import styles from './Main.module.css';

type MainProps = {
    hideFooter: boolean,
    children: JSX.Element
}

const MainComponent = ({ hideFooter, children }: MainProps) => {

    const mainStyle = (hideFooter) ? styles.main : styles.mainFooter;

    return (
        <main className={mainStyle}>
            {children}
        </main>
    );
}

export default MainComponent;