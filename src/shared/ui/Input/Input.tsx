import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return <input className={clsx(styles.input, className)} ref={ref} {...props} />;
    },
);

Input.displayName = 'Input';
