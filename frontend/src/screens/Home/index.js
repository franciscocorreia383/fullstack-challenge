import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import NewTask from '../../components/NewTask';
import Task from '../../components/Task';
import TaskFinished from '../../components/TaskFinished';
import styles from './styles.scss'
import api from '../../environment/api'
import { FaRocket } from 'react-icons/fa';
import { logout } from '../../services/auth'
import { useHistory } from "react-router-dom";


function Home() {
    const history = useHistory();

    const [username, setUsername] = useState();
    const [tasks, setTasks] = useState([]);
    const [userAdmin, setUserAdmin] = useState(false);

    handleGetUser()
    async function handleGetUser() {
        const user = await api.get('/users')
        setUsername(user.data.username)
        setUserAdmin(user.data.isAdmin)
    }

    function handleLogout() {
        logout()

    }

    function handleAdmin() {
        history.push('/admin')
    }

    function getDate(dateProps) {
        var data = new Date(dateProps);
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        const date = ano + '-' + mes + '-' + dia;

        return date;
    }

    useEffect(() => {
        async function loadRepository() {
            try {
                const response = await api.get('tasks')
                const repository = await response.data
                setTasks(repository)
                console.log(repository);
            } catch (error) {
                alert('Ocorreu um erro ao carregar as tarefas!')
            }
        }
        loadRepository()
    }, [])


    return (
        <div id="page-home">
            <header>
                <div className="container">
                    <p>ToDo Taks</p>
                    <p>Bem Vindo(a) {username}!</p>
                    {userAdmin ?
                        <form onSubmit={handleAdmin}>
                            <Button
                                isOutlined={true}
                            >Administrativo</Button>
                        </form>
                        :
                        null}
                    <form onSubmit={handleLogout}>
                        <Button
                            isOutlined={true}
                        >Logout</Button>
                    </form>
                </div>

            </header>
            <main>
                <NewTask />
                <hr />
                <strong id="current-task">Tarefas Ativas</strong>
                <div>
                    {
                        tasks.map(task => {
                            if (task.finished_at === null) {
                                return (
                                    <Task
                                        id={task.id}
                                        task={task.description}
                                        createdAt={task.created_at}
                                        deadline={task.finish_in}
                                        isCurrent={task.finish_in < Date.now()}
                                    />
                                )
                            }
                        }
                        )
                    }
                </div>

                <strong id="finished-task">Tarefas Finalizadas</strong>
                <div>
                    {
                        tasks.map(task => {
                            const deadline = getDate(task.finish_in)
                            const finished_at = getDate(task.finished_at)
                            if (task.finished_at !== null) {
                                return (
                                    <TaskFinished
                                        task={task.description}
                                        createdAt={task.created_at}
                                        deadline={deadline}
                                        finishedAt={finished_at}
                                        isCurrent={task.finish_in < Date.now()}
                                    />
                                )
                            }
                        }
                        )
                    }
                </div>
                <hr />

            </main>

        </div>
    )
}



export default Home;