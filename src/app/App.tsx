import './styles/index.css';

import { useEffect } from 'react';

import { Router } from './router/Router.tsx';

export const App = () => {
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => console.log(devices));
    }, []);

    return <Router />;
};
