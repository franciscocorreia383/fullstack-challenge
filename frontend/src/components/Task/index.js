import React, { useState } from 'react';
import './styles.scss'
import EditTask from '../../modals/EditTask'
import api from '../../environment/api'

function Task({ isCurrent, ...props }) {

    const [edit, setEdit] = useState(false)

    function getDate(dateProps) {
        var data = new Date(dateProps);
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        const date = ano + '-' + mes + '-' + dia;

        return date;
    }

    const dataAtual = getDate(Date.now())
    const deadline = getDate(props.deadline)

    async function handleFinishTask(event) {
        // event.preventDefault()

        try {
            const body = {
                id: props.id,
                description: props.task,
                finish_in: props.deadline,
                finished_at: dataAtual
            }

            await api.put(`/tasks/${props.id}`, body)

        } catch (error) {
            alert("Não foi possivel finalizar a tarefa")
        }
    }

    async function handleEditTask(event) {
        event.preventDefault()
        if (edit === true) {
            setEdit(false)
        } else {
            setEdit(true)
        }

    }

    async function handleDeleteTask() {

        try {
            const resp = window.confirm("Are you sure you want to delete")
            if (resp === true) {

                const body = {
                    id: props.id,
                    description: props.task,
                    finish_in: props.deadline,
                    finished_at: dataAtual
                }

                await api.delete(`tasks/${props.id}`, body)
            }
        } catch (error) {
            console.log("Ocorreu um erro ao apagar a task");
        }
    }


    return (
        <div>
            <div id="container">
                <div id="task-descripton">
                    <p>Descrição</p>
                    <p id="description">{props.task}</p>
                </div>
                <div id="task-date-create">
                    <p>Criado Em:</p>
                    <p id="created">{props.createdAt}</p>
                </div>
                <div id="task-date-desdline">
                    <p>Prazo</p>
                    <p id="deadline">{deadline}</p>
                </div>
                <div id="task-status">
                    <p>Status</p>
                    <form onSubmit={handleFinishTask}>
                        <button
                            className={`button-e ${deadline <= dataAtual ? 'outlined' : ''}`}
                        >Finalizar</button>

                    </form>
                    <form onSubmit={handleEditTask}>
                        <button
                            className={`button-e ${deadline <= dataAtual ? 'outlined' : ''}`}
                        >Editar</button>
                    </form>
                    <form onSubmit={handleDeleteTask}>
                        <button
                            className={`button-e ${deadline <= dataAtual ? 'outlined' : ''}`}
                        >Deletar</button>
                    </form>
                </div>
            </div>
            {edit ? <EditTask
                id={props.id}
                description={props.task}
                deadline={deadline}
            /> : null}
        </div>
    )
}

export default Task