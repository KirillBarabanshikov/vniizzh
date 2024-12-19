import './styles/index.css';

import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.tsx';

export const App = () => {
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => console.log(devices));
    }, []);

    return <RouterProvider router={router} />;
};
