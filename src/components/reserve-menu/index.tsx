import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { formatTimeZero, hourFormat } from '../../utils/format';
import { timeNow, TODAY } from '../../utils/time';
import moment from 'moment';

import LoadingComponent from '../loading';

import styles from './ReserveMenu.module.css';

export const ReserveMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [reserves, setReserves] = useState<any[] | null>([]);

    useEffect(() => {
        api.get(`/reserves/${user?.id}`)
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
    }, []);

    const checkReserveDate = (date: string, exit_time: string) => {
        // console.log(date, formatTimeZero(exit_time));
        if (date < TODAY || (date === TODAY && (formatTimeZero(exit_time) <= timeNow()))) {
            return <div className={styles.expiredTag}>Reserva expirada!</div>
        }
        return <></>;
    }

    const handleClick = (id: string) => {
        // console.log("clicou", id);
        router.push(`/reserve/${id}`);
    }

    return (
        isLoading ? <LoadingComponent /> :
            <div className={styles.container}>
                {reserves?.length === 0 ? <div>Você não tem nenhuma reserva</div> :
                    reserves?.map((reserve, index) => {
                        return <div className={styles.card} key={index} onClick={() => handleClick(reserve.id)}>
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