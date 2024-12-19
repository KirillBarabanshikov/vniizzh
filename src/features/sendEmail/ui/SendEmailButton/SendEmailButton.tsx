import { FC, useState } from 'react';
import { Button } from '@/shared/ui';
import { SendEmailModal } from '../SendEmailModal';

export const SendEmailButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button theme={'accent'} size={'lg'} onClick={() => setIsOpen(!isOpen)}>
                Отправить на почту
            </Button>
            <SendEmailModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};
