import React, { useState } from 'react';
import { Button } from '../Button';

import './styles.scss'

import api from '../../environment/api'
import getToken from '../../services/auth'

function NewTask() {

    const [newTask, setNewTask] = useState("");
    const [newDeadline, setNewDeadline] = useState();

   async function handleCreateTask(){

    const body = {
            description: newTask,
            finish_in: newDeadline
        }

        try {
            const response = await api.post('tasks', body)
            alert("task criada com sucesso!")
        } catch (error) {
            alert("Não foi possivel inserir uma nova task")
        }
    }

    return (
        <div id="content">
            <form onSubmit={handleCreateTask}>
                <div id="div-container">
                    <div id="description-form">
                        <strong>Insira uma nova task ToDo</strong>
                        <hr/>
                        <textarea
                            id="input-description"
                            type="text"
                            placeholder="Insira a descrição da task"
                            required="required"
                            onChange={event => setNewTask(event.target.value)}
                            value={newTask}
                        />
                    </div>
                    <div div id="data-picker">
                        <strong>Vencimento</strong>
                        <hr/>
                        <input
                            id="input-date"
                            type="date"
                            required="required"
                            onChange={event => setNewDeadline(event.target.value)}
                            value={newDeadline}
                        />
                        <Button>
                            Criar Task
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewTask