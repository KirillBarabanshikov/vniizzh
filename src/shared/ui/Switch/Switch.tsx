import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './Switch.module.scss';

interface ISwitchProps {
    isOn: boolean;
    onClick: () => void;
    label: string;
}

export const Switch: FC<ISwitchProps> = ({ isOn, onClick, label }) => {
    return (
        <div onClick={onClick} className={styles.switchWrap}>
            <motion.div className={clsx(styles.switch, isOn && styles.isOn)} layout layoutRoot>
                <motion.div className={styles.handle} layout transition={{ type: 'easeOut', duration: 0.15 }} />
            </motion.div>
            <div className={styles.label}>{label}</div>
        </div>
    );
};
