import styles from './Container.module.css'

function Container(props) {
    // container que pode alterar classes vão fazer que vão fazer disposição dos itens dentro do container
    // container flex
    return(
        <div className={`${styles.container} ${styles[props.customClass]}` }>
            {props.children}
        </div>
    )
}

export default Container;