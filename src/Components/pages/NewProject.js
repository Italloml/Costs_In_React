import { useHistory } from 'react-router-dom';
import ProjectForm from '../Project/ProjectForm';

import styles from'./NewProject.module.css';

function NewProject() {

    // esse Hook permite fazer redirect no sistema
    const history = useHistory()

    function createPost(project) {
        // inicialize costs e serviços
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            // redirect
            history.push('/projects', { message: 'Projeto criado com sucesso!' }) //  flash message
          })
          .catch((err) => console.log(err))

    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject;