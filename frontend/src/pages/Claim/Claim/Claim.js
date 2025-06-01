import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useUser } from '@context/UserContext'

import { fetchDataLogin } from '@tools/api'

import FullTable from '@components/Table/FullTable'

import styles from './Claim.module.scss'

const Claim = () => {
	const [claim, setClaim] = useState(null)

	const { user } = useUser()

	const { id } = useParams()

	useEffect(() => {
		async function load() {
			setClaim(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/claim/${id}/`,
					user.access
				)
			)
		}
		load()
	}, [user, id])

	return (
		<main className={styles.claim}>
			<h2>Общая информация</h2>
			{user && user.role == 'manager' && (
				<Link to={`/claim/${id}/edit`}>изменить</Link>
			)}
			{claim && <FullTable data={claim} />}
		</main>
	)
}

export default Claim
