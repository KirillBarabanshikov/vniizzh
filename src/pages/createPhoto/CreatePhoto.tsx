import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPhotoHandler, fetchPhoto } from '@/shared/api';
import buttonImage from '@/shared/assets/images/button.png';
import { INACTIVITY_TIMEOUT, TIMER } from '@/shared/consts';
import { AlertModal, Button, CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const [showTimer, setShowTimer] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleTimerEnd = async () => {
        try {
            videoRef.current?.pause();
            const photoName = await createPhotoHandler();
            const { originalImage } = await fetchPhoto(photoName || '');
            navigate('/ready-photo', { state: originalImage });
        } catch (error) {
            console.error(error);
            setShowAlert(true);
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

        return () => {
            window.removeEventListener('click', resetTimer);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.createPhoto}>
            <div className={styles.timerWrap}>
                {showTimer ? (
                    <Timer time={TIMER} onEnd={handleTimerEnd} />
                ) : (
                    <img src={buttonImage} alt={'image'} onClick={() => setShowTimer(true)} />
                )}
            </div>
            <CameraFeed videoRef={videoRef} />
            <AlertModal
                isOpen={showAlert}
                isError
                title={'Произошла ошибка'}
                subtitle={'Что-то пошло не так'}
                actions={
                    <Button theme={'accent'} onClick={() => navigate('/')}>
                        На главную
                    </Button>
                }
            />
        </div>
    );
};
