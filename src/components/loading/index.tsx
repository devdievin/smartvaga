import styles from "./Loading.module.css";

export default function LoadingComponent() {
    return (
        <div className={styles.container}>
            <span className={styles.spinner}></span>
        </div>
    );
}