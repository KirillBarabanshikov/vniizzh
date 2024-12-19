import { createBrowserRouter } from 'react-router-dom';

import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { InactivityProvider } from '@/app/providers';
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
