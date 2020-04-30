import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
//import { FiLogIn } from 'react-icons/fi';
//import './styles.css';
import logoImg from '../assets/logo.svg';

import api from '../services/api';

export default function Logon() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();
		try {
            const response = await api.get('login', {auth: {username, password}});
            console.log(response.data.token)
			localStorage.setItem('usertoken', response.data.token);
			localStorage.setItem('userId', response.data.user.idusuarios);
			//history.push('/profile');
		} catch (err) {
			alert(err + 'Falha no login, tente novamente.');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Be the Hero" />
				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>
					<input
						placeholder="Sua ID"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
                    <input
						placeholder="Sua senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="button" type="submit">
						Entrar
					</button>
				</form>
			</section>
		</div>
	);
}