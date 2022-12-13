import styles from './Card.module.css';

type CardProps = {
    title?: string,
    color: string,
    children: JSX.Element
}

const CardComponent = ({ title, color, children }: CardProps) => {

    const cardColor = (color === 'primary') ? styles.cardPrimary : styles.cardDefault;

    return (
        <div className={`${styles.card} ${cardColor}`}>
            {title && <div className={styles.cardHeader}>
                <span>{title}</span>
            </div>}
            {children}
        </div>
    );
}

export default CardComponent;