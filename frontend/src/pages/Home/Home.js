import React from 'react'
import { Link } from 'react-router-dom'

import Lookup from './components/lookup/Lookup'

import { useUser } from '@context/UserContext'

import MainPanel from './components/mainPanel/MainPanel'

import styles from './Home.module.scss'

const Home = () => {
	const { user } = useUser()

	return (
		<>
			{user && user.role == 'manager' && (
				<nav className={styles.nav}>
					<Link to='/user/new'>Создать пользователя</Link>
					<Link to='/machine/new'>Создать машину</Link>
				</nav>
			)}

			<main className={styles.home}>{user ? <MainPanel /> : <Lookup />}</main>
		</>
	)
}

export default Home
