import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import moment from 'moment';

import styles from './ReserveMenu.module.css';
import { formatTimeZero, hourFormat } from '../../utils/format';
import { timeNow, TODAY } from '../../utils/time';

export const ReserveMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const [reserves, setReserves] = useState<any[] | null>([]);

    useEffect(() => {
        api.get(`/reserves/${user?.id}`)
            .then(response => {
                setReserves(response.data);
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    const checkReserveDate = (date: string, exit_time: string) => {
        // console.log(date, formatTimeZero(exit_time));
        if (date < TODAY || (date === TODAY && (formatTimeZero(exit_time) <= timeNow()))) {
            return <div>Reserva expirada!</div>
        }
        return <></>;
    }

    return (
        <div className={styles.container}>
            {reserves?.map((reserve, index) => {
                return <div className={styles.card} key={index}>
                    <div className={styles.reserveId}>#{reserve.id}</div>
                    <div>Vaga: Nº {reserve.vacancy.num}</div>
                    <div>Veículo: {reserve.car.name} - Placa: {reserve.car.licensePlate}</div>
                    <div>
                        Validade: {moment(reserve.date).format("DD/MM/YYYY")} - {hourFormat(reserve.entry_time, "HH:MM")} às {hourFormat(reserve.exit_time, "HH:MM")}
                    </div>
                    <>
                        {checkReserveDate(reserve.date, reserve.exit_time)}
                    </>
                </div>;
            })}
        </div>
    );
}