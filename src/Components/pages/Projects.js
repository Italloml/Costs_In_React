import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Message from "../layout/Message";
import Container from '../layout/Container';
import Loading from "../layout/Loading";
import LinkBotton from "../layout/LinkBotton";
import ProjectCard from "../Project/ProjectCard";

import styles from './Projects.module.css';

function Projects() {
    const [project, setProject] = useState([])
    // loading
    const [removeLoading, setRemoveLoading] = useState(false)

    // Resgatando a mensagem por meio do hook
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    // usando para o request
    useEffect(() => {
        // para mostrar do componente loading
            setTimeout(() => {
                fetch('http://localhost:5000/projects', {
                method: 'GET', 
                headers: {
                    'Content-type': 'application/json',
                },
            }).then((resp) => resp.json())
            .then((data) => {
                // setar projetos por meio da API
                setProject(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 300)
    }, [])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkBotton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message}/>}
            <Container customClass="start">
                {project.length > 0 && 
                    project.map((projects) => 
                        <ProjectCard
                            id={projects.id}
                            name={projects.name}
                            budget={projects.budget}
                            key={projects.id}
                            category={projects.category.name}
                        />)
                }
                {!removeLoading && <Loading />}
                {/* quando não houver projetos */}
                {removeLoading && project.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projects;