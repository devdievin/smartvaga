import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import styles from './CarMenu.module.css';

export const CarMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [cars, setCars] = useState<any[]>([]);

    useEffect(() => {
        api.get(`/cars/${user?.id}`)
            .then(response => {
                setCars(response.data);
            })
            .catch(err => console.error(err))
    }, []);

    const handleAddCar = () => {
        router.push("/car/add");
    }

    return (
        <div className={styles.container}>
            {cars.map((car, index) => {
                return <div className={styles.card} key={index}>
                    <div className={styles.cardTitle}>{car.brand} {car.name} {car.model} - {car.year}</div>
                    <div>Placa: {car.licensePlate}</div>
                    <div>Cor: {car.color}</div>
                </div>;
            })}

            <button type='button' className={`btn btn-primary btn-small ${styles.btnAdd}`} onClick={handleAddCar}>ADD</button>
        </div>
    );
}