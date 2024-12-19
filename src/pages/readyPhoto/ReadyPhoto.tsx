import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PrintModal } from '@/features/print';
import { SendEmailModal } from '@/features/sendEmail';
import BackIcon from '@/shared/assets/icons/back.svg?react';
import { Button, Switch } from '@/shared/ui';

import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const [modalState, setModalState] = useState<'none' | 'print' | 'email'>('none');

    const navigate = useNavigate();

    return (
        <>
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
                            <Switch isOn={true} onClick={() => {}} label={'Рамка'} />
                            <Switch isOn={false} onClick={() => {}} label={'Обработка нейросетью'} />
                        </div>
                        <div className={styles.buttons}>
                            <Button theme={'accent'} size={'lg'} onClick={() => setModalState('print')}>
                                Напечатать фото
                            </Button>
                            <Button theme={'accent'} size={'lg'} onClick={() => setModalState('email')}>
                                Отправить на почту
                            </Button>
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
            <PrintModal
                isOpen={modalState === 'print'}
                onClose={() => setModalState('none')}
                onEmail={() => setModalState('email')}
            />
            <SendEmailModal
                isOpen={modalState === 'email'}
                onClose={() => setModalState('none')}
                onPrint={() => setModalState('print')}
            />
        </>
    );
};
