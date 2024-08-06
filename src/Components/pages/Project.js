import styles from './Project.module.css';

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectFform from './../Project/ProjectForm';

function Project() {

    const { id } = useParams()
    
    const [project, setProject] = useState([])
    // mostra / não mostra projeto
    const [showProjectForm, setShowProjectForm] = useState(false)
    // mensagem
    const [message, setMessage] = useState()
    // tipo da mensagem
    const [type, setType] = useState()

    // Pegando dados do banco
    useEffect(() => {
        setTimeout(() => {
            // dados que vem do projeto
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

    // Edição de posts do projeto
    function editPost(project) {
        // budget validation
        if(project.budget < project.cost) {
            // mensagem
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        // edição dos projetos queestão no banco 
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            // mensagem
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    // condição ternária - fazendo edições dos projetos
    return <>
            {project.name ? ( 
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
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
                                    <ProjectFform 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição" 
                                        projectData={project} 
                                    />
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