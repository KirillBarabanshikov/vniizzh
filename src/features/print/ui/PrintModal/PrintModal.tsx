import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { printPhotoHandler } from '@/shared/api';
import { API_URL, MAX_PHOTO_COUNT } from '@/shared/consts';
import { AlertModal, Button, InputCounter, Loader, Modal } from '@/shared/ui';

import styles from './PrintModal.module.scss';

interface IPrintModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEmail: () => void;
    currentImage: string;
}

export const PrintModal: FC<IPrintModalProps> = ({ isOpen, onClose, onEmail, currentImage }) => {
    const [alertState, setAlertState] = useState<'none' | 'loading' | 'success' | 'error'>('none');
    const [photoCount, setPhotoCount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setPhotoCount(1);
    }, [isOpen]);

    const onPrint = async () => {
        try {
            onClose();
            setAlertState('loading');
            await printPhotoHandler({ path: `${API_URL}/${currentImage}`, count: photoCount });
            setAlertState('success');
        } catch (error) {
            console.error(error);
            setAlertState('error');
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={styles.modalBody}>
                    <div>
                        <h3>Выберите, сколько фото вы хотите напечатать</h3>
                        <p>Напечатать можно не более 5 фотографий</p>
                    </div>
                    <InputCounter
                        defaultCount={1}
                        min={1}
                        max={MAX_PHOTO_COUNT}
                        onChange={(count) => setPhotoCount(count)}
                    />
                    <div className={styles.buttons}>
                        <Button variant={'outline'} onClick={onClose}>
                            Назад
                        </Button>
                        <Button theme={'accent'} onClick={onPrint}>
                            Напечатать
                            <br />
                            фото
                        </Button>
                    </div>
                </div>
            </Modal>
            <Loader
                isLoading={alertState === 'loading'}
                title={'Идет печать'}
                subtitle={'Пожалуйста, подождите, пока\nмы напечатаем ваш снимок'}
            />
            <AlertModal
                isOpen={alertState === 'success' || alertState === 'error'}
                isError={alertState === 'error'}
                title={alertState === 'error' ? 'не удалось\nнапечатать фото' : 'Заберите ваш снимок'}
                subtitle={
                    alertState === 'error'
                        ? 'К сожалению на данный момент функция недоступна. Вы можете\nполучить электронную версию фотографии'
                        : 'Спасибо, что воспользовались нашим терминалом. Вы также можете\nполучить электронную версию фотографии'
                }
                actions={
                    <>
                        <Button
                            theme={'accent'}
                            onClick={() => {
                                setAlertState('none');
                                onEmail();
                            }}
                            fullWidth
                        >
                            Отправить на почту
                        </Button>
                        <Button variant={'outline'} onClick={() => setAlertState('none')}>
                            Назад
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                setAlertState('none');
                                navigate('/');
                            }}
                        >
                            На главную
                        </Button>
                    </>
                }
            />
        </>
    );
};
