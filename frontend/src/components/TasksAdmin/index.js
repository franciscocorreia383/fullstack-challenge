import React, { useState } from 'react'
import './styles.scss'


function TasksAdmin(props) {

    return (
        <div className="container-current">
            <div id="email-current">
                <p>Email</p>
                <p >{props.user.email}</p>
            </div>
            <div id="description-current">
                <p>Descrição</p>
                <p >{props.description}</p>
            </div>
            <div id="deadline-current">
                <p>Prazo</p>
                <p>{props.finish_in}</p>
            </div>
            {props.finished ?
                <div id="deadline-current">
                    <p>Finalizado Em</p>
                    <p>{props.finished_at}</p>
                </div>
                : null}
        </div>
    )
}

export default TasksAdmin