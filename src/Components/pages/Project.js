import styles from './Project.module.css'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {

    const { id } = useParams()
    
    const [project, setProject] = useState([])
    // mostra / não mostra projeto
    const [showProjectForm, setShowProjectForm] = useState(false)

    // Pegando dados do banco
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
              .then((resp) => resp.json())
              .then((data) => {
                setProject(data)
              })
              .catch((err) => console.log)
        }, 3000)
    // monitorando o id do projeto
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    // condição ternária - fazendo edições dos projetos
    return <>
            {project.name ? ( 
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto': 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                            <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ): (
                                <div className={styles.project_info}>
                                    <p>form</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}</>
}

export default Project;