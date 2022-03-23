import React, { useState } from 'react';
import './styles.scss'
import api from '../../environment/api'

import { Button } from '../../components/Button'

const EditTask = (props) => {

    const [description, setDescription] = useState()
    const [finish_in, setfinish_in] = useState()

    async function handleUpdateTask(event) {

        try {

            if (description === undefined && finish_in === undefined) {
                alert('Altere a descição ou a data limite!')
            }

            if (description !== undefined && finish_in !== undefined) {
                const body = {
                    id: props.id,
                    description: description,
                    finish_in: finish_in,
                }


                api.put(`/tasks/${props.id}`, body)
            }

            if (description !== undefined && finish_in === undefined) {
                const body = {
                    id: props.id,
                    description: description,
                    finish_in: props.deadline,
                }



                api.put(`/tasks/${props.id}`, body)
            }

            if (description === undefined && finish_in !== undefined) {
                const body = {
                    id: props.id,
                    description: props.task,
                    finish_in: finish_in,
                }



                api.put(`/tasks/${props.id}`, body)
            }

        } catch (error) {
            console.log('Não foi possivel atualizar a task');
        }

    }

    async function close() {

    }

    return (
        <div className="modal-edit">
            <div className="container-edit">
                <div>
                    <form onSubmit={handleUpdateTask}>
                        <strong>Editar descrição:</strong>
                        <p>Atual: {props.description}</p>
                        <textarea
                            onChange={event => setDescription(event.target.value)}
                            value={description}
                        />
                        <strong>Editar Prazo</strong>
                        <p>Atual: {props.deadline}</p>
                        <input
                            type='date'
                            onChange={event => setfinish_in(event.target.value)}
                            value={finish_in}
                        />

                        <Button>Salvar</Button>

                    </form>
                    <form onSubmit={close}>
                        <Button>Cancelar</Button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditTask