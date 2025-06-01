import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useUser } from '@context/UserContext'

import { fetchDataLogin } from '@tools/api'

import FullTable from '@components/Table/FullTable'
import Accordion from '@components/Accordion/Accordion'

import TableMaintenances from './TableMaintenances'
import TableClaims from './TableClaims'

import styles from './Machine.module.scss'

const Machine = () => {
	const [machine, setMachine] = useState(null)

	const { user } = useUser()

	const { id } = useParams()

	useEffect(() => {
		async function load() {
			setMachine(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/machines/${id}/`,
					user.access
				)
			)
		}
		load()
	}, [user, id])

	return (
		<main className={styles.machine}>
			<h2>Общая информация</h2>

			{user && user.role == 'manager' && (
				<Link to={`/machine/${id}/edit`}>изменить</Link>
			)}

			{machine && <FullTable data={machine} />}

			<Accordion
				IdInput='TableMaintenances'
				LabelText='ТО'
				Content={TableMaintenances}
			/>

			<Accordion
				IdInput='TableClaims'
				LabelText='Рекламации'
				Content={TableClaims}
			/>
		</main>
	)
}

export default Machine
