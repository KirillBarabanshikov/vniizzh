import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface IModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose?: () => void;
    style?: CSSProperties;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose, children, style }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.overlay}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modalWrap}
                    >
                        <div className={clsx(styles.modalBody)} style={style}>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.getElementById('portal') as HTMLDivElement,
    );
};
