import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendEmail } from '@/shared/api';
import { AlertModal, Button, Input, Modal } from '@/shared/ui';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Keyboard } from '@/shared/ui/Keyboard';

import styles from './SendEmailModal.module.scss';

interface ISendEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPrint: () => void;
    origin: boolean;
    decorative: boolean;
}

export const SendEmailModal: FC<ISendEmailModalProps> = ({ isOpen, onClose, onPrint, origin, decorative }) => {
    const [alertState, setAlertState] = useState<'none' | 'success' | 'error'>('none');
    const [checked, setChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSubmit = async () => {
        const value = inputRef.current?.value.trim();
        if (!checked || !value) return;

        try {
            setIsLoading(true);
            await sendEmail({ address: value, origin, decorative });
            setAlertState('success');
        } catch (error) {
            console.error(error);
            setAlertState('error');
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    if (isLoading) return;
                    onClose();
                }}
            >
                <div className={styles.modalBody}>
                    <h3>введите ваш e-mail</h3>
                    <Input placeholder={'Email'} ref={inputRef} autoFocus />
                    <Keyboard inputRef={inputRef} onEnter={() => {}} className={styles.keyboard} />
                    <Checkbox
                        label={
                            <>
                                Я согласен на <span>обработку персональных данных</span>
                            </>
                        }
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <div className={styles.buttons}>
                        <Button variant={'outline'} onClick={onClose} disabled={isLoading}>
                            Назад
                        </Button>
                        <Button theme={'accent'} onClick={onSubmit} disabled={isLoading}>
                            Отправить
                        </Button>
                    </div>
                </div>
            </Modal>
            <AlertModal
                isOpen={alertState != 'none'}
                isError={alertState === 'error'}
                title={alertState === 'error' ? 'не удалось отправить\nснимок' : 'фото успешно отправлено'}
                subtitle={
                    alertState === 'error'
                        ? 'Проверьте введенный адрес электронной почты и\nпопробуйте еще раз'
                        : 'Спасибо, что воспользовались нашим терминалом. Вы также можете\nраспечатать фотографию на память'
                }
                actions={
                    alertState === 'error' ? (
                        <>
                            <Button theme={'accent'} onClick={() => setAlertState('none')}>
                                Назад
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                theme={'accent'}
                                fullWidth
                                onClick={() => {
                                    setAlertState('none');
                                    onPrint();
                                }}
                            >
                                Напечатать фото
                            </Button>
                            <Button variant={'outline'} onClick={() => setAlertState('none')}>
                                Назад
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={() => {
                                    setAlertState('none');
                                    navigate('/');
                                }}
                            >
                                На главную
                            </Button>
                        </>
                    )
                }
            />
        </>
    );
};
