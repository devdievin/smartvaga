import styles from "./Preload.module.css";

export default function PreloadComponent() {
    return (
        <div className={styles.loadWrapper}>
            <div className={styles.spinner}></div>
        </div>
    );
}