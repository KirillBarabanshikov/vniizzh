import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline';
    theme?: 'white' | 'accent';
    size?: 'sm' | 'lg';
    fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({
    variant = 'solid',
    theme = 'white',
    size = 'sm',
    fullWidth,
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[theme],
                styles[size],
                fullWidth && styles.fullWidth,
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};
