import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import moment from 'moment';

import styles from './ReserveMenu.module.css';
import { hourFormat } from '../../utils/format';

export const ReserveMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const [reserves, setReserves] = useState<any[]>([]);

    useEffect(() => {
        api.get(`/reserves/${user?.id}`)
            .then(response => {
                setReserves(response.data);
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <div className={styles.container}>
            {reserves.map((reserve, index) => {
                return <div className={styles.card} key={index}>
                    <div className={styles.reserveId}>#{reserve.id}</div>
                    <div>Vaga: Nº {reserve.vacancy.num}</div>
                    <div>Veículo: {reserve.car.name} - Placa: {reserve.car.licensePlate}</div>
                    <div>
                        Validade: {moment(reserve.date).format("DD/MM/YYYY")} - {hourFormat(reserve.entry_time, "HH:MM")} às {hourFormat(reserve.exit_time, "HH:MM")}
                    </div>
                </div>;
            })}
        </div>
    );
}