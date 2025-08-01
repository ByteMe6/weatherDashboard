import { useEffect, useState } from "react";

import style from './ModalMessage.module.scss'

export const ModalMessage = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
<div className={`${style.modal} ${visible ? style.show : ''}`}>
      {message}
    </div>
    );
};
