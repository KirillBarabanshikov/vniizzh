import { AlertModal, Button, Input, Modal } from '@/shared/ui';
import { FC, useRef, useState } from 'react';
import { Keyboard } from '@/shared/ui/Keyboard';
import styles from './SendEmailModal.module.scss';
import { Checkbox } from '@/shared/ui/Checkbox';
import { useNavigate } from 'react-router-dom';

interface ISendEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SendEmailModal: FC<ISendEmailModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [alertState, setAlertState] = useState<'none' | 'success' | 'error'>('none');
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        onClose();
        setAlertState('success');
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
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
                        defaultChecked
                        className={styles.checkbox}
                    />
                    <div className={styles.buttons}>
                        <Button variant={'outline'} onClick={onClose}>
                            Назад
                        </Button>
                        <Button theme={'accent'} onClick={onSubmit}>
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
                            <Button theme={'accent'} fullWidth>
                                Напечатать фото
                            </Button>
                            <Button variant={'outline'} onClick={() => setAlertState('none')}>
                                Назад
                            </Button>
                            <Button variant={'outline'} onClick={() => navigate('/')}>
                                На главную
                            </Button>
                        </>
                    )
                }
            />
        </>
    );
};
