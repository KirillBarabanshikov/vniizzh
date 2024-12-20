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
    variant?: 'sm' | 'lg';
}

export const Loader: FC<ILoaderProps> = ({ isLoading, title, subtitle, variant = 'sm' }) => {
    return (
        <Modal isOpen={isLoading} style={{ padding: variant === 'sm' ? '80px' : '35px' }}>
            <div className={clsx(styles.body, styles[variant])}>
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
