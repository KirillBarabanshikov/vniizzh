import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPhotoHandler, fetchPhoto } from '@/shared/api';
import { TIMER } from '@/shared/consts';
import { AlertModal, Button, CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const [showAlert, setShowAlert] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();

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

    return (
        <div className={styles.createPhoto}>
            <Timer time={TIMER} onEnd={handleTimerEnd} />
            <CameraFeed videoRef={videoRef} />
            <AlertModal
                isOpen={showAlert}
                isError
                title={'Произошла ошибка'}
                subtitle={'Произошла ошибка'}
                actions={
                    <Button theme={'accent'} onClick={() => navigate('/')}>
                        На главную
                    </Button>
                }
            />
        </div>
    );
};
