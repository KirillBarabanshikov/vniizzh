import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto,Home } from '@/pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/create-photo',
        element: <CreatePhoto />,
    },
]);
