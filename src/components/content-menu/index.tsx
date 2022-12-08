import styles from "./ContentMenu.module.css";

type ContentMenuProps = {
    children: JSX.Element
}

export const ContentMenuComponent = ({ children }: ContentMenuProps) => {
    return (
        <div className={styles.contentMenu}>
            {children}
        </div>
    );
}