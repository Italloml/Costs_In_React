// componente que vai ser utilizado em várias páginas - Componente dinâmico

import { Link } from 'react-router-dom';
import styles from './LinkBotton.module.css'

function LinkBotton({ to, text }) {
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default LinkBotton;