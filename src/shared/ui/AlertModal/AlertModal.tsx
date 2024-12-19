import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import ErrorIcon from '@/shared/assets/icons/error.svg?react';
import SuccessIcon from '@/shared/assets/icons/success.svg?react';
import { Modal } from '@/shared/ui';

import styles from './AlertModal.module.scss';

interface IAlertModalProps {
    isOpen: boolean;
    onClose?: () => void;
    title: string;
    subtitle: string;
    isError?: boolean;
    actions: ReactNode;
}

export const AlertModal: FC<IAlertModalProps> = ({ isOpen, onClose, title, subtitle, isError, actions }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalBody}>
                {isError ? <ErrorIcon /> : <SuccessIcon />}
                <h3 className={styles.title}>{title}</h3>
                <p className={clsx(styles.text, 'text')}>{subtitle}</p>
                <div className={styles.buttons}>{actions}</div>
            </div>
        </Modal>
    );
};
