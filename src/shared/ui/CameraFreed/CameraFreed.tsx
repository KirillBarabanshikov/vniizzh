import clsx from 'clsx';
import { FC, MutableRefObject, useEffect } from 'react';

import { DEVICE_ID } from '@/shared/consts';

import styles from './CameraFreed.module.scss';

interface ICameraFreedProps {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    className?: string;
}

export const CameraFeed: FC<ICameraFreedProps> = ({ videoRef, className }) => {
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: DEVICE_ID,
                    },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Ошибка доступа к камере:', error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className={clsx(styles.cameraFreed, className)}>
            <video ref={videoRef} autoPlay playsInline muted />
        </div>
    );
};
