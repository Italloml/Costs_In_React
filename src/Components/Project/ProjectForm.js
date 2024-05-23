import { useEffect, useState } from 'react';

import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    // Se vem do formulário de edição, preenche o state projectData


    // Hook - useEffect
    useEffect(() => {
        // fecth - para pega as categorias do DB
            fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    // metódo de submit
    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        // handleSubmit(project)
    }

    function handleChange(e) {
        // com o setProject, ele que vai alterar o nome do projeto
        // metódo dinâmico
        setProject({...project, [e.target.name]: e.target.value })
    }

    // metódo categoria - o que vai ser enviado para o project
    function handleCategory(e){
            setProject({ ...project, category: {
                id: e.target.value, 
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }
        
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento do projeto"
                handleOnChange={handleChange}
            />
            <Select 
            // esse select é para que consiga renderiza na pág criar projeto como opções de categorias
                name="category_id" 
                text="Selecione a categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.categories ? project.categories.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;

// projeto com bug, ele não ta selecionando as categorias. aula 24 - 14:20