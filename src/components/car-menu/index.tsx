import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import LoadingComponent from '../loading';
import { QuestionerComponent } from '../questioner';

import styles from './CarMenu.module.css';

export const CarMenuComponent = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [deleteCardId, setdeleteCardId] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [cars, setCars] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            api.get(`/cars/${user.id}`)
                .then(response => {
                    setCars(response.data);
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

    const negativeAction = () => setDeleted(false);

    const positiveAction = async () => {
        try {
            const response = await api.delete(`/car/${deleteCardId}`);

            console.log(response);

            if (response.status === 200) {
                return router.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        isLoading ? <LoadingComponent /> :
            <div className={styles.container}>
                <div>
                    {cars.length === 0 ? <div>Você não tem nenhum carro cadastrado!</div> :
                        cars.map((car, index) => {
                            return <div className={styles.card} key={index}>
                                <div className={styles.infoWrapper}>
                                    <div className={styles.cardTitle}>{car.brand} {car.name} {car.model}</div>
                                    <div>Ano: {car.year} | Cor: {car.color}</div>
                                    <div>Placa: {car.licensePlate}</div>
                                </div>
                                <Image src={"/icons/icon-trash-delete.svg"} alt={"Excluir"} width={26} height={29} className={styles.btnDelete} onClick={() => { setdeleteCardId(car.id); setDeleted(true); }} />
                            </div>;
                        })
                    }

                    <span className={styles.btnAdd} onClick={() => router.push("/car/add")}>
                        <Image src={"/icons/icon-add.svg"} alt={"Add"} width={44} height={44} />
                    </span>
                </div>
                {deleted && <QuestionerComponent message='Você tem certeza que quer excluir esse veículo?' negativeAction={negativeAction} positiveAction={positiveAction} />}
            </div >
    );
}