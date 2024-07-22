// import styles from './Project.module.css'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Project() {

    const { id } = useParams()
    
    const [project, setProject] = useState([])

    // Pegando dados do banco
    useEffect(() => {
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
    // monitorando o id do projeto
    }, [id])

    return (
        <p>{project.name}</p>
    )
}

export default Project;