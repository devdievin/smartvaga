
import styles from './Menu.module.css';

type MenuProps = {
    children: JSX.Element;
}

const MenuComponent = () => {
    return (
        <div className={styles.menu}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>
    );
}

export default MenuComponent;