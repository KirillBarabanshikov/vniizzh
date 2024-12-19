import { useRef } from 'react';

import { CameraFeed, Timer } from '@/shared/ui';

import styles from './CreatePhoto.module.scss';

export const CreatePhoto = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleTimerEnd = async () => {};

    return (
        <div className={styles.createPhoto}>
            <Timer time={5} onEnd={handleTimerEnd} />
            <CameraFeed videoRef={videoRef} />
        </div>
    );
};
