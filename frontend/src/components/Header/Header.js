import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useUser } from '../../context/UserContext'

import styles from './Header.module.scss'

import logo from './img/logo.webp'

function Header() {
	const { user, setUser } = useUser()

	const navigate = useNavigate()

	const logOut = () => {
		localStorage.removeItem('user')
		setUser(null)
		navigate('/')
	}

	return (
		<header className={styles.header}>
			<Link to='/'>
				<img className={styles.header_logo} src={logo} alt='logo'></img>
			</Link>

			<h2>
				Электронная сервисная книжка "Мой Силант" <br />
				<span>tg: +7(835)-220-12-09</span>
			</h2>
			{user ? (
				<div className={styles.user}>
					<h2>{user.username}</h2>
					<button onClick={logOut}>выйти из аккаунта</button>
				</div>
			) : (
				<Link to='/login' className={styles.login}>
					войти
				</Link>
			)}
		</header>
	)
}

export default Header
