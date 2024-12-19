import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { InactivityProvider } from '@/app/providers';
import { CreatePhoto, Home, ReadyPhoto } from '@/pages';
import { INACTIVITY_TIMEOUT } from '@/shared/consts';

export const Router = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={location.pathname}>
                <Route element={<AnimationLayout />}>
                    <Route index element={<Home />} />
                    <Route path={'/create-photo'} element={<CreatePhoto />} />
                    <Route
                        path={'/ready-photo'}
                        element={
                            <InactivityProvider timeout={INACTIVITY_TIMEOUT}>
                                <ReadyPhoto />
                            </InactivityProvider>
                        }
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

const AnimationLayout = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Outlet />
        </motion.div>
    );
};
