import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../context/UserContext'

import styles from './Login.module.scss'

const Login = () => {
	const [login, setLogin] = useState('')
	const [loginError, setLoginError] = useState('')
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const { setUser } = useUser()

	const navigate = useNavigate()

	const getLoginUser = async () => {
		setLoginError('')
		setPasswordError('')

		if (!login.trim()) {
			setLoginError('Ошибка: введите логин!')
			return
		}
		if (!password.trim()) {
			setPasswordError('Ошибка: введите пароль!')
			return
		}

		try {
			let JWT = await axios.post(`http://127.0.0.1:8000/api/token/`, {
				username: login,
				password: password,
			})
			let userData = await axios.get('http://127.0.0.1:8000/api/users/me/', {
				headers: {
					Authorization: `Bearer ${JWT.data.access}`,
				},
			})
			const data = {
				...JWT.data,
				...userData.data,
			}
			localStorage.setItem('user', JSON.stringify(data))
			setUser(data)
			navigate('/')
		} catch (err) {
			console.error(err)
			setPasswordError('Ошибка: не верный логин или пароль!')
		}
	}

	const isFormValid = login.trim() !== '' && password.trim() !== ''

	return (
		<main className={styles.login}>
			<h2>Авторизация</h2>
			<section className={styles.form}>
				<input
					type='text'
					placeholder='Логин'
					value={login}
					onChange={e => setLogin(e.target.value)}
				></input>
				{loginError && <p className={styles.error}>{loginError}</p>}
				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
				></input>
				{passwordError && <p className={styles.error}>{passwordError}</p>}
				<button onClick={getLoginUser} disabled={!isFormValid}>
					войти
				</button>
			</section>
		</main>
	)
}

export default Login
