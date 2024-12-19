import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface IInactivityProviderProps extends PropsWithChildren {
    timeout: number;
}

export const InactivityProvider: FC<IInactivityProviderProps> = ({ timeout, children }) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            navigate('/');
        }, timeout * 1000);
    };

    useEffect(() => {
        window.addEventListener('click', resetTimer);

        resetTimer();

        return () => {
            window.removeEventListener('click', resetTimer);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [navigate, timeout]);

    return <>{children}</>;
};
