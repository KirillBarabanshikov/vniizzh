import { createBrowserRouter } from 'react-router-dom';

import { InactivityProvider } from '@/app/providers';
import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { INACTIVITY_TIMEOUT } from '@/shared/consts';

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
        element: (
            <InactivityProvider timeout={INACTIVITY_TIMEOUT}>
                <ReadyPhoto />
            </InactivityProvider>
        ),
    },
]);
