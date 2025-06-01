import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchDataLogin } from '@tools/api'
import { handleChange } from '@tools/state'

import ShortTable from '@components/Table/ShortTable'
import Filters from '@components/Filters/Filters'

import { useUser } from '@context/UserContext'

const TableMaintenances = () => {
	const [maintenances, setMaintenances] = useState(null)

	const [filters, setFilters] = useState({
		maintenance_type: [],
		service_company: [],
	})
	const [filtersKey, setFiltersKey] = useState('')
	const [filtersValue, setFiltersValue] = useState('')

	const { user } = useUser()

	const { id } = useParams()

	const navigate = useNavigate()

	function goToNewMaintenances() {
		navigate(`/machine/${id}/newmaintenance`)
	}

	useEffect(() => {
		async function load() {
			setMaintenances(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/maintenance/?machine=${id}&${filtersKey}=${filtersValue}`,
					user.access
				)
			)
		}
		load()
	}, [user, filtersKey, filtersValue])

	useEffect(() => {
		async function load() {
			let response = await fetchDataLogin(
				`http://127.0.0.1:8000/api/machines/${id}/`,
				user.access
			)
			handleChange(
				'service_company',
				[
					{
						id: response.service_company?.id,
						name: response.service_company?.username,
					},
					{
						id: response.client?.id,
						name: response.client?.username,
					},
				],
				setFilters
			)
			handleChange(
				'maintenance_type',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=MaintenanceType`,
					user.access
				),
				setFilters
			)
		}
		load()
	}, [id, user])

	return (
		<>
			<button onClick={goToNewMaintenances}>Создать ТО</button>

			<Filters
				filters={filters}
				filtersKey={filtersKey}
				setFiltersKey={setFiltersKey}
				setFiltersValue={setFiltersValue}
			/>

			{maintenances ? (
				<ShortTable data={maintenances} type='maintenance' />
			) : (
				<h1>ничего не найдено :(</h1>
			)}
		</>
	)
}

export default TableMaintenances
