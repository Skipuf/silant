import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchDataLogin } from '@tools/api'
import { handleChange } from '@tools/state'

import ShortTable from '@components/Table/ShortTable'
import Filters from '@components/Filters/Filters'

import { useUser } from '@context/UserContext'

const TableClaims = () => {
	const [claims, setClaims] = useState(null)

	const [filters, setFilters] = useState({})
	const [filtersKey, setFiltersKey] = useState('')
	const [filtersValue, setFiltersValue] = useState('')

	const { user } = useUser()

	const { id } = useParams()

	const navigate = useNavigate()

	function goToNewClaim() {
		navigate(`/machine/${id}/newclaim`)
	}

	useEffect(() => {
		async function load() {
			setClaims(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/claim/?machine=${id}&${filtersKey}=${filtersValue}`,
					user.access
				)
			)
		}
		load()
	}, [user, filtersKey, filtersValue])

	useEffect(() => {
		async function load() {
			handleChange(
				'failure_node',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=FailureNode`,
					user.access
				),
				setFilters
			)
			handleChange(
				'recovery_method',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=RecoveryMethod`,
					user.access
				),
				setFilters
			)
		}
		load()
	}, [user])

	return (
		<>
			{(user.role == 'service' || user.role == 'manager') && (
				<button onClick={goToNewClaim}>Создать рекламацию</button>
			)}

			<Filters
				filters={filters}
				filtersKey={filtersKey}
				setFiltersKey={setFiltersKey}
				setFiltersValue={setFiltersValue}
			/>

			{claims ? (
				<ShortTable data={claims} type='claim' />
			) : (
				<h1>ничего не найдено :(</h1>
			)}
		</>
	)
}

export default TableClaims
