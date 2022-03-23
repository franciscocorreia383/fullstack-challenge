import React from 'react';
import './styles.scss'


function TaskFinished({...props }) {

    return (
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
                <p id="deadline">{props.deadline}</p>
            </div>
            <div id="task-status">
                <p>Finalizado Em</p>
                <p id="finished-date">{props.finishedAt}</p>
            </div>

        </div>
    )
}

export default TaskFinished