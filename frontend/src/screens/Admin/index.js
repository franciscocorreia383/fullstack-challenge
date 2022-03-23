import React, { useState, useEffect } from 'react';
import { logout } from '../../services/auth'
import api from '../../environment/api'
import { Button } from '../../components/Button';
import './styles.scss'
import TasksAdmin from '../../components/TasksAdmin';
import { useHistory } from "react-router-dom";


function Admin() {
    const history = useHistory();

    const [username, setUsername] = useState();
    const [tasks, setTasks] = useState([]);
    const [userAdmin, setUserAdmin] = useState(false);
    const [current, setCurrent] = useState(true);
    const [finished, setFinished] = useState(false);
    const [lazy, setLazy] = useState(false);

    handleGetUser()
    async function handleGetUser() {
        const user = await api.get('/users')
        setUsername(user.data.username)
        setUserAdmin(user.data.isAdmin)
    }

    function handleLogout() {
        logout()

    }

    useEffect(() => {
        async function loadRepository() {
            try {
                const response = await api.get('tasksadmin')
                const repository = await response.data
                setTasks(repository)
                console.log(repository);
            } catch (error) {
                alert('Ocorreu um erro ao carregar as tarefas!')
            }
        }
        loadRepository()
    }, [])

    function handleLoadCurrent(event) {
        event.preventDefault()
        setCurrent(true)
        setFinished(false)
        setLazy(false)
    }
    function handleLoadFinished(event) {
        event.preventDefault()
        setCurrent(false)
        setFinished(true)
        setLazy(false)
    }
    function handleLoadLazy(event) {
        event.preventDefault()
        setCurrent(false)
        setFinished(false)
        setLazy(true)
    }

    function handleHome(){
        history.push('/')
    }

    function getDate(dateProps) {
        var data = new Date(dateProps);
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        const date = ano + '-' + mes + '-' + dia;

        return date;
    }


    return (
        <div>
            {userAdmin ?
                <div>
                    <header>
                        <div className="container-admin">
                            <form onSubmit={handleHome}>
                            <Button>Inicio</Button>
                            </form>
                            <strong>TODO Admin</strong>
                            
                            <div className="menu-container">
                                <form onSubmit={handleLoadCurrent}>
                                    <Button isOutlined={true}>Tarefas Virgentes</Button>
                                </form>
                                <form onSubmit={handleLoadFinished}>
                                    <Button isOutlined={true}>Tarefas Finalizadas</Button>
                                </form>
                                <form onSubmit={handleLoadLazy}>
                                    <Button isOutlined={true}>Tarefas Atrasadas</Button>
                                </form>
                            </div>
                            <form onSubmit={handleLogout}>
                                <Button isOutlined={true}>Logout</Button>
                            </form>
                        </div>

                    </header>
                    <main>
                        {current ?
                            <div>
                                <strong>Tarefas Ativas</strong>
                                {
                                    tasks.map(task => {
                                        const deadline = getDate(task.finish_in)
                                        if (task.finished_at === null) {
                                            return (
                                               <TasksAdmin
                                                user={task.user}
                                                description={task.description}
                                                finish_in={deadline}
                                               />
                                            )
                                        }
                                    }
                                    )
                                }
                            </div>
                            : null}
                        {finished ?
                            <div>
                            <strong>Tarefas Finalizadas</strong>
                            {
                                tasks.map(task => {
                                    const deadline = getDate(task.finish_in)
                                    const finished_at = getDate(task.finished_at)
                                    if (task.finished_at !== null) {
                                        return (
                                           <TasksAdmin
                                            user={task.user}
                                            description={task.description}
                                            finish_in={deadline}
                                            finished_at={finished_at}
                                            finished={true}
                                           />
                                        )
                                    }
                                }
                                )
                            }
                        </div>
                            : null}
                        {lazy ?
                             <div>
                             <strong>Tarefas Atrasadas</strong>
                             {
                                 tasks.map(task => {
                                    const dataAtual = getDate(Date.now())
                                    const deadline = getDate(task.finish_in)
                                     if (deadline < dataAtual) {
                                         return (
                                            <TasksAdmin
                                             user={task.user}
                                             description={task.description}
                                             finish_in={deadline}
                                            />
                                         )
                                     }
                                 }
                                 )
                             }
                         </div>
                            : null}
                    </main>
                </div>
                :
                <div>
                    <h1>Você precisa de acesso administrativo para realizar essa ação!</h1>
                </div>}
        </div>
    )
}

export default Admin