import { useState, useEffect } from 'react';

import styles from './Message.module.css';

function Message({ type, msg }) {

    // Altera a visibilidade da mensagem
    const [visible, setVisible] = useState(false)

    // ser condicionado a mensagem
    useEffect(() => {

        // condicional para a mensagem
        if(!msg) {
            setVisible(false)
            return
        }
    
        setVisible(true)

        // time - elimina a mensagem após uns segundo
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        // Encerrando a sessão
        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                // componente de mensagem do sistema - type defini como a mensagem vai ser impressa
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message;