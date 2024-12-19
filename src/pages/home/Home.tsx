import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

import styles from './Home.module.scss';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.home}>
            <img src='/images/logo.png' alt='logo' className={styles.logo} />
            <h1 className={styles.title}>Стань героем новогодней сказки</h1>
            <p className={styles.subtitle}>Примерь на себя образ сказочного персонажа в режиме реального времени</p>
            <Button onClick={() => navigate('/create-photo')} className={styles.button}>
                Сделать фото
            </Button>
        </div>
    );
};
