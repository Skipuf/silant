import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useUser } from '@context/UserContext'

import { fetchDataLogin } from '@tools/api'

import FullTable from '@components/Table/FullTable'

import styles from './Maintenance.module.scss'

const Maintenance = () => {
	const [maintenance, setMaintenance] = useState(null)

	const { user } = useUser()

	const { id } = useParams()

	useEffect(() => {
		async function load() {
			setMaintenance(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/maintenance/${id}/`,
					user.access
				)
			)
		}
		load()
	}, [user, id])

	return (
		<main className={styles.maintenance}>
			<h2>Общая информация</h2>

			{user && user.role == 'manager' && (
				<Link to={`/maintenance/${id}/edit`}>изменить</Link>
			)}

			{maintenance && <FullTable data={maintenance} />}
		</main>
	)
}

export default Maintenance
