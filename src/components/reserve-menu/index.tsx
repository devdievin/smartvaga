import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { hourFormat } from '../../utils/format';
import moment from 'moment';

import LoadingComponent from '../loading';
import ExpiredTagComponent from '../expired-tag';

import styles from './ReserveMenu.module.css';

export const ReserveMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [reserves, setReserves] = useState<any[] | null>([]);

    useEffect(() => {
        if (user) {
            api.get(`/reserves/${user.id}`)
                .then(response => {
                    setReserves(response.data);
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1 * 1000);
                });
        }
    }, [user]);

    const handleClick = (id: string) => {
        router.push(`/reserve/${id}`);
    }

    return (
        isLoading ? <LoadingComponent /> :
            <div className={styles.container}>
                {reserves?.length === 0 ? <div>Você não tem nenhuma reserva</div> :
                    reserves?.map((reserve, index) => {
                        return <div className={styles.card} key={index} onClick={() => handleClick(reserve.id)}>
                            <div className={styles.reserveId}>#{reserve.id}</div>
                            <div className={styles.infoText}><span className={styles.label}>Vaga:</span> Nº {reserve.vacancy.num}</div>
                            <div className={styles.infoText}><span className={styles.label}>Veículo:</span> {reserve.car.name}<span className={styles.label}> - Placa:</span> {reserve.car.licensePlate}</div>
                            <div className={styles.infoText}>
                                <span className={styles.label}>Validade:</span> {moment(reserve.date).format("DD/MM/YYYY")}<span className={styles.label}> das </span>{hourFormat(reserve.entry_time, "HH:MM")} <span className={styles.label}>às</span> {hourFormat(reserve.exit_time, "HH:MM")}
                            </div>

                            <div className={styles.tag}>
                                <ExpiredTagComponent date={reserve.date} exit_time={reserve.exit_time} />
                            </div>
                        </div>;

                    })}
            </div>
    );
}