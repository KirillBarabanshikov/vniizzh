import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline';
    theme?: 'white' | 'accent';
    size?: 'sm' | 'lg';
}

export const Button: FC<IButtonProps> = ({
    variant = 'solid',
    theme = 'white',
    size = 'sm',
    className,
    children,
    ...props
}) => {
    return (
        <button className={clsx(styles.button, styles[variant], styles[theme], styles[size], className)} {...props}>
            {children}
        </button>
    );
};
