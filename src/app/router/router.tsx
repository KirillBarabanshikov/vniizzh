import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/create-photo',
        element: <CreatePhoto />,
    },
    {
        path: '/ready-photo',
        element: <ReadyPhoto />,
    },
]);
