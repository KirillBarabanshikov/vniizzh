import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

import LoaderIcon from '@/shared/assets/icons/loader.svg?react';
import { Modal } from '@/shared/ui';

import styles from './Loader.module.scss';

interface ILoaderProps {
    isLoading: boolean;
    title?: string;
    subtitle?: string;
}

export const Loader: FC<ILoaderProps> = ({ isLoading, title, subtitle }) => {
    return (
        <Modal isOpen={isLoading}>
            <div className={styles.body}>
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                        duration: 1.5,
                    }}
                >
                    <LoaderIcon className={styles.loader} />
                </motion.div>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <div className={clsx(styles.text, 'text')}>{subtitle}</div>}
            </div>
        </Modal>
    );
};
