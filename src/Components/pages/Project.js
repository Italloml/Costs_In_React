import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css';

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectFform from './../Project/ProjectForm';
import ServiceForm from '../Service/ServiceFrom';

function Project() {

    const { id } = useParams()
    
    const [project, setProject] = useState([])
    // mostra / não mostra projeto
    const [showProjectForm, setShowProjectForm] = useState(false)
    // serviço
    const [showServiceForm, setShowServiceForm] = useState(false)
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
        setMessage("")
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

    // criação de serviços
    function createService(project) {
        setMessage("")

        // serviço mais recente
        const lastService = project.services[project.services.length - 1]
        
        lastService.id = uuidv4()
        // ultimo serviço
        const lastServiceCost = lastService.cost
        // custo total
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        // passou do valor
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // adicione o custo do serviço ao custo total do projeto
        project.cost = newCost

        //atualiza projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            // exibir os serviços
            console.log(data)
        })
        .catch((err => console.log(err)))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
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
                        {/* área de Serviço */}
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço': 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                      handleSubmit={createService}
                                      textBtn="Adicionar Serviço"
                                      projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serivos</h2>
                        <Container customClass='start'>
                            <p>Item de Serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}</>
}

export default Project;