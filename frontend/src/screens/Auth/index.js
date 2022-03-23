import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';

import { Link, withRouter, useHistory } from "react-router-dom";
import api from '../../environment/api';
import { login } from "../../services/auth"

import './styles.scss'

function Auth() {
    const history = useHistory();

    const [createUserName, setCreateUserName] = useState();
    const [createEmail, setCreateEmail] = useState();
    const [createPassword, setCreatePassword] = useState();
    const [createConfirmPassword, setCreateConfirmPassword] = useState();

    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();


    async function handleCreateUser(event) {

        event.preventDefault();

        if (createPassword !== createConfirmPassword) {
            throw new Error('As senhas não conferem!')
        }

        const body = {
            username: createUserName,
            email: createEmail,
            password: createPassword
        }

        try {
            const response = await api.post('users', body)
            alert('Conta criada com sucesso! realize login para prosseguir!')
            setCreateUserName("")
            setCreateEmail("")
            setCreatePassword("")
            setCreateConfirmPassword("")
        } catch (err) {
            console.log(err);
            alert("Ocorreu um erro ao registrar sua conta.");
        }

    }


    async function handleSubmitUser(event) {

        event.preventDefault();

        const body = {
            email: loginEmail,
            password: loginPassword
        }

        try {
            const response = await api.post("/sessions", body)
            login(response.data.token)

            console.log(response);
            history.push('/')

        } catch (error) {
            alert("Ocorreu um erro ao realizar login na sua conta.")
        }
    }

    return (
        <div id="home-auth">
            <aside>
                <strong>Criar sua conta</strong>
                <form onSubmit={handleCreateUser}>
                    <div className="form">
                        <input
                            type="text"
                            placeholder="Insira seu nome"
                            required="required"
                            onChange={event => setCreateUserName(event.target.value)}
                            value={createUserName}
                        />
                        <input
                            type="email"
                            placeholder="Insira seu email"
                            required="required"
                            onChange={event => setCreateEmail(event.target.value)}
                            value={createEmail}
                        />
                        <input
                            type="password"
                            placeholder="Insira sua senha"
                            required="required"
                            onChange={event => setCreatePassword(event.target.value)}
                            value={createPassword}
                        />
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            required="required"
                            onChange={event => setCreateConfirmPassword(event.target.value)}
                            value={createConfirmPassword}
                        />
                        <Button
                            type="submit"
                            isOutlined="true"
                        >Criar Conta</Button>
                    </div>
                </form>
            </aside>

            <main>
                <div className="main-content">
                    <strong>Entrar na sua conta</strong>
                    <form onSubmit={handleSubmitUser}>
                        <div className="form">
                            <input
                                type="email"
                                placeholder="Insira seu email"
                                required="required"
                                onChange={event => setLoginEmail(event.target.value)}
                                value={loginEmail}
                            />
                            <input
                                type="password"
                                placeholder="Insira sua senha"
                                required="required"
                                onChange={event => setLoginPassword(event.target.value)}
                                value={loginPassword}
                            />
                            <Button
                                type="submit"
                            >Entrar</Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Auth;