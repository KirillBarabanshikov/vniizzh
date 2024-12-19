import './styles/index.css';

import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.tsx';

export const App = () => {
    return <RouterProvider router={router} />;
};
