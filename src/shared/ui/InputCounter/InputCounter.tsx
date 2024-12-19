'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';

import styles from './InputCounter.module.scss';

interface IInputCounterProps {
    defaultCount: number;
    min: number;
    max: number;
    onChange: (count: number) => void;
    className?: string;
}

export const InputCounter: FC<IInputCounterProps> = ({ defaultCount, min, max, onChange, className }) => {
    const [count, setCount] = useState(defaultCount);

    const increment = () => {
        let newCount = count + 1;
        if (newCount >= max) newCount = max;
        setCount(newCount);
        onChange(newCount);
    };

    const decrement = () => {
        let newCount = count - 1;
        if (newCount <= min) newCount = min;
        setCount(newCount);
        onChange(newCount);
    };

    return (
        <div className={clsx(styles.inputCounter, className)}>
            <button onClick={decrement} className={clsx(count <= min && styles.disabled)}>
                <MinusIcon />
            </button>
            <input type={'text'} readOnly value={`${count}`} />
            <button onClick={increment} className={clsx(max && count >= max && styles.disabled)}>
                <PlusIcon />
            </button>
        </div>
    );
};
