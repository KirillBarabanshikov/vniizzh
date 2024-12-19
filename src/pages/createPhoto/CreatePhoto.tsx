import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();

    const handleTimerEnd = async () => {
        navigate('/ready-photo');
    };

    return (
        <div className={styles.createPhoto}>
            <Timer time={5} onEnd={handleTimerEnd} />
            <CameraFeed videoRef={videoRef} />
        </div>
    );
};
