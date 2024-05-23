import { useEffect, useState } from 'react';

import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {
    const [categories, setCategories] = useState([])

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
        
    return (
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento do projeto"
            />
            <Select 
            // esse select é para que consiga renderiza na pág criar projeto como opções de categorias
                name="category_id" 
                text="Selecione a categoria" 
                options={categories}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;