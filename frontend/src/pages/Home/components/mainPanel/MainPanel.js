import React, { useEffect, useState } from 'react'

import { useUser } from '@context/UserContext'

import { handleChange } from '@tools/state'
import { fetchDataLogin } from '@tools/api'

import ShortTable from '@components/Table/ShortTable'
import Filters from '@components/Filters/Filters'

const MainPanel = () => {
	const { user } = useUser()

	const [machines, setMachines] = useState(null)

	const [filters, setFilters] = useState({})
	const [filtersKey, setFiltersKey] = useState('')
	const [filtersValue, setFiltersValue] = useState('')

	useEffect(() => {
		async function load() {
			setMachines(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/machines/?${filtersKey}=${filtersValue}`,
					user.access
				)
			)
		}
		load()
	}, [user, filtersKey, filtersValue])

	useEffect(() => {
		async function load() {
			handleChange(
				'machine_model',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=MachineModel`,
					user.access
				),
				setFilters
			)

			handleChange(
				'engine_model',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=EngineModel`,
					user.access
				),
				setFilters
			)

			handleChange(
				'transmission_model',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=TransmissionModel`,
					user.access
				),
				setFilters
			)

			handleChange(
				'driving_axle_model',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=DrivingAxleModel`,
					user.access
				),
				setFilters
			)

			handleChange(
				'steering_axle_model',
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=SteeringAxleModel`,
					user.access
				),
				setFilters
			)
		}
		load()
	}, [user])

	return (
		<>
			<h2>
				Информация о комплектации и технических характеристиках вашей техники
			</h2>
			<Filters
				filters={filters}
				filtersKey={filtersKey}
				setFiltersKey={setFiltersKey}
				setFiltersValue={setFiltersValue}
			/>
			{machines && (
				<ShortTable
					data={machines}
					type='machine'
					filter={[
						'id',
						'machine_model',
						'engine_model',
						'serial_number_engine',
						'transmission_model',
						'serial_number_transmission',
						'driving_axle_model',
						'serial_number_driving_axle',
						'steering_axle_model',
						'serial_number_steering_axle',
						'equipment_options',
						'client',
						'service_company',
					]}
				/>
			)}
		</>
	)
}

export default MainPanel
