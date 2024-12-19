import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

import styles from './Timer.module.scss';

interface ITimerProps {
    time: number;
    onEnd: () => Promise<void>;
    className?: string;
}

export const Timer: FC<ITimerProps> = ({ time, onEnd, className }) => {
    const [currentTime, setCurrentTime] = useState(time);
    const [nextTime, setNextTime] = useState(time - 1);

    useEffect(() => {
        const handleEnd = async () => {
            await onEnd();
        };

        if (currentTime <= 0) {
            handleEnd();
            return;
        }

        const timerId = setInterval(() => {
            setNextTime((prevTime) => prevTime - 1);

            setTimeout(() => {
                setCurrentTime((prevTime) => prevTime - 1);
            }, 300);
        }, 1000);

        return () => clearInterval(timerId);
    }, [currentTime]);

    return (
        <div className={className}>
            <div className={styles.timerWrapper}>
                <AnimatePresence>
                    <motion.div
                        key={currentTime}
                        className={clsx(styles.number)}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        {currentTime <= 0 ? 1 : currentTime}
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                    {nextTime > 0 && (
                        <motion.div
                            key={nextTime}
                            className={clsx(styles.number)}
                            initial={{ opacity: 0.4, y: 180, scale: 0.6 }}
                            exit={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {nextTime}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
