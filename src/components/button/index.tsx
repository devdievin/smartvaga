import styles from './Button.module.css';

type ButtonProps = {
    text: string,
    type?: 'submit' | 'reset' | 'button',
    size: string,
    color: string
}

const ButtonComponent = ({ text, type, size, color }: ButtonProps) => {

    const btnColor = (color === 'primary') ? styles.btnPrimary : styles.btnSecondary;

    const btnSize = (size === 'lg') ? styles.btnLarge : styles.btnSmall;

    return (
        <button type={type} className={`${styles.btn} ${btnSize} ${btnColor}`}>
            {text}
        </button>
    );
}

export default ButtonComponent;