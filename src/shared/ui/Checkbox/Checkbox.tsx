import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import CheckboxIcon from '@/shared/assets/icons/check.svg?react';

import styles from './Checkbox.module.scss';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
    error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(({ label, className, error, ...props }, ref) => {
    return (
        <label className={clsx(styles.wrap, error && styles.error, className)}>
            <input type='checkbox' ref={ref} {...props} />
            <span className={styles.checkbox}>
                <CheckboxIcon />
            </span>
            <span className={styles.label}>{label}</span>
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
