import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SendEmailButton } from '@/features/sendEmail';
import BackIcon from '@/shared/assets/icons/back.svg?react';
import { Button, Switch } from '@/shared/ui';

import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false);

    return (
        <div className={styles.readyPhoto}>
            <div className={styles.titleWrap}>
                <BackIcon onClick={() => navigate('/')} />
                <div>
                    <h2>Выберите действие</h2>
                    <p>
                        Вы можете добавить рамку, сделать обработку фото с помощью нейросети, напечатать фото или
                        отправить на почту
                    </p>
                </div>
            </div>
            <div className={styles.photoWrap}>
                <div className={styles.photoActions}>
                    <div className={styles.title}>Редактирование фотографии</div>
                    <div className={styles.switchs}>
                        <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} label={'Рамка'} />
                        <Switch isOn={false} onClick={() => {}} label={'Обработка нейросетью'} />
                    </div>
                    <div className={styles.buttons}>
                        <Button theme={'accent'} size={'lg'}>
                            Напечатать фото
                        </Button>
                        <SendEmailButton />
                    </div>
                </div>
                <div className={styles.photo}>
                    <img src='/images/image.png' alt='photo' />
                    <Button className={styles.button} onClick={() => navigate('/')}>
                        Попробовать снова
                    </Button>
                </div>
            </div>
        </div>
    );
};
