import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PrintModal } from '@/features/print';
import { SendEmailModal } from '@/features/sendEmail';
import { generateFrame, generatePhoto } from '@/shared/api';
import BackIcon from '@/shared/assets/icons/back.svg?react';
import { API_URL, INACTIVITY_TIMEOUT } from '@/shared/consts';
import { AlertModal, Button, Loader, Switch } from '@/shared/ui';

import styles from './ReadyPhoto.module.scss';

export const ReadyPhoto = () => {
    const [modalState, setModalState] = useState<'none' | 'print' | 'email' | 'loading' | 'error'>('none');
    const location = useLocation();
    const navigate = useNavigate();
    const originalImage = (location.state as string) || '';
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [photo, setPhoto] = useState<{
        currentImage: string;
        originalImageWithFrame: string;
        generatedImage: string;
        generatedImageWithFrame: string;
        origin: boolean;
        decorative: boolean;
    }>({
        currentImage: originalImage,
        originalImageWithFrame: '',
        generatedImage: '',
        generatedImageWithFrame: '',
        origin: true,
        decorative: false,
    });

    const handleToggleFrame = async () => {
        if (photo.decorative) {
            return setPhoto((prevState) => ({
                ...prevState,
                currentImage: prevState.origin ? originalImage : prevState.generatedImage,
                decorative: false,
            }));
        }

        try {
            setModalState('loading');
            const { generatedImage } = await generateFrame({ origin: photo.origin });
            setPhoto((prevState) => ({
                ...prevState,
                currentImage: generatedImage,
                originalImageWithFrame: prevState.origin ? generatedImage : prevState.originalImageWithFrame,
                generatedImageWithFrame: prevState.origin ? prevState.generatedImageWithFrame : generatedImage,
                decorative: true,
            }));
            setModalState('none');
        } catch (error) {
            console.error(error);
            setModalState('error');
        }
    };

    const handleToggleGenerate = async () => {
        if (!photo.origin) {
            return setPhoto((prevState) => ({
                ...prevState,
                currentImage: prevState.decorative ? prevState.originalImageWithFrame : originalImage,
                origin: true,
            }));
        }

        try {
            setModalState('loading');
            const { generatedImage } = await generatePhoto();

            if (photo.decorative) {
                const { generatedImage: generatedImageWithFrame } = await generateFrame({ origin: false });
                setPhoto((prevState) => ({
                    ...prevState,
                    currentImage: generatedImageWithFrame,
                    generatedImage: generatedImage,
                    generatedImageWithFrame: generatedImageWithFrame,
                    origin: false,
                    decorative: true,
                }));
            } else {
                setPhoto((prevState) => ({
                    ...prevState,
                    currentImage: generatedImage,
                    generatedImage: generatedImage,
                    origin: false,
                    decorative: false,
                }));
            }
            setModalState('none');
        } catch (error) {
            console.error(error);
            setModalState('error');
        }
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            navigate('/');
        }, INACTIVITY_TIMEOUT * 1000);
    };

    useEffect(() => {
        window.addEventListener('click', resetTimer);
        resetTimer();

        if (modalState === 'loading') {
            window.removeEventListener('click', resetTimer);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }

        return () => {
            window.removeEventListener('click', resetTimer);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [modalState]);

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
                            <Switch isOn={photo.decorative} onClick={handleToggleFrame} label={'Рамка'} />
                            <Switch
                                isOn={!photo.origin}
                                onClick={handleToggleGenerate}
                                label={'Обработка нейросетью'}
                            />
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
                        <img src={`${API_URL}/${photo.currentImage}?${Date.now()}`} alt='photo' />
                        <Button className={styles.button} onClick={() => navigate('/')}>
                            Попробовать снова
                        </Button>
                    </div>
                </div>
            </div>
            <Loader isLoading={modalState === 'loading'} subtitle={'Пожалуйста,подождите...'} variant={'lg'} />
            <AlertModal
                isOpen={modalState === 'error'}
                isError
                title={'Произошла ошибка'}
                subtitle={
                    'К сожалению, сейчас программа не может обработать ваш снимок, вернитесь назад и попробуйте другую опцию'
                }
                actions={
                    <Button theme={'accent'} onClick={() => setModalState('none')}>
                        Назад
                    </Button>
                }
            />
            <PrintModal
                isOpen={modalState === 'print'}
                onClose={() => setModalState('none')}
                onEmail={() => setModalState('email')}
                currentImage={photo.currentImage}
            />
            <SendEmailModal
                isOpen={modalState === 'email'}
                onClose={() => setModalState('none')}
                onPrint={() => setModalState('print')}
                origin={photo.origin}
                decorative={photo.decorative}
            />
        </>
    );
};
