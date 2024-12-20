import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPhotoHandler, fetchPhoto } from '@/shared/api';
import { TIMER } from '@/shared/consts';
import { CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
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
        }
    };

    return (
        <div className={styles.createPhoto}>
            <Timer time={TIMER} onEnd={handleTimerEnd} />
            <CameraFeed videoRef={videoRef} />
        </div>
    );
};
