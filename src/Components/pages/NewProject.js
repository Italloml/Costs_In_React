import ProjectForm from '../Project/ProjectForm';

import styles from'./NewProject.module.css';

function NewProject() {
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectForm btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject;