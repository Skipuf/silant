import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../context/UserContext'
import styles from './NewMaintenance.module.scss'

import { fetchDataLogin } from '../../../tools/api'
import { handleChange } from '../../../tools/state'

import InputText from '../../../components/Input/InputText'
import InputDate from '../../../components/Input/InputDate'
import InputNumber from '../../../components/Input/InputNumber'
import InputSelect from '../../../components/Input/InputSelect'
import InputHandbook from '../../../components/Input/InputHandbook'

const NewMaintenance = () => {
	const [machine, setMachine] = useState(null)

	const navigate = useNavigate()

	const { user } = useUser()
	const { id } = useParams()

	const today = new Date().toISOString().split('T')[0]

	const [maintenance, setMaintenance] = useState({
		machine: null,
		order_number: '',
		maintenance_type: null,
		maintenance_type_name: '',
		maintenance_type_description: '',
		order_date: today,
		maintenance_date: today,
		operating_time: 0,
		service_company: null,
	})

	const [errors, setErrors] = useState({})

	useEffect(() => {
		async function load() {
			try {
				const response = await fetchDataLogin(
					`http://127.0.0.1:8000/api/machines/${id}/`,
					user.access
				)
				setMachine(response)

				handleChange('machine', response.id, setMaintenance)
				handleChange('service_company', user.id, setMaintenance)
			} catch (err) {
				console.error(err)
			}
		}
		load()
	}, [id, user])

	const validate = () => {
		const newErrors = {}

		Object.entries(maintenance).forEach(([key, value]) => {
			if (value === null || value === '' || value === 0) {
				newErrors[key] = 'Это поле обязательно'
			}
		})

		if (
			maintenance.order_date &&
			maintenance.maintenance_date &&
			maintenance.maintenance_date < maintenance.order_date
		) {
			newErrors.maintenance_date =
				'Дата проведения не может быть раньше даты заказа'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!machine) return
		if (!validate()) return

		try {
			await axios.post('http://127.0.0.1:8000/api/maintenance/', maintenance, {
				headers: {
					Authorization: `Bearer ${user.access}`,
					'Content-Type': 'application/json',
				},
			})
			navigate(`/machine/${id}/`)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main className={styles.newMaintenance}>
			{machine ? (
				<form onSubmit={handleSubmit} noValidate>
					<h2>Создание нового ТО</h2>

					<label htmlFor='machine'>№ машины</label>
					<input
						type='text'
						id='machine'
						value={machine.serial_number_machine}
						disabled
					/>

					<InputText
						IdInput='order_number'
						LabelText='№ заказ-наряда'
						value={maintenance.order_number}
						setValue={v => handleChange('order_number', v, setMaintenance)}
						error={errors.order_number}
					/>

					<InputHandbook
						IdInput='MaintenanceType'
						LabelText='Вид ТО'
						dataListValue={maintenance.maintenance_type}
						setDataListValue={v =>
							handleChange('maintenance_type', v, setMaintenance)
						}
						name={maintenance.maintenance_type_name}
						setName={v =>
							handleChange('maintenance_type_name', v, setMaintenance)
						}
						description={maintenance.maintenance_type_description}
						setDescription={v =>
							handleChange('maintenance_type_description', v, setMaintenance)
						}
						error={errors.maintenance_type}
					/>

					<InputDate
						IdInput='order_date'
						LabelText='Дата заказ-наряда'
						value={maintenance.order_date}
						minValue={null}
						setValue={v => handleChange('order_date', v, setMaintenance)}
						error={errors.order_date}
					/>

					<InputDate
						IdInput='maintenance_date'
						LabelText='Дата проведения ТО'
						value={maintenance.maintenance_date}
						minValue={maintenance.order_date}
						setValue={v => handleChange('maintenance_date', v, setMaintenance)}
						error={errors.maintenance_date}
					/>

					<InputNumber
						IdInput='operating_time'
						LabelText='Наработка, м/час'
						value={maintenance.operating_time}
						minValue={null}
						setValue={v => handleChange('operating_time', v, setMaintenance)}
						error={errors.operating_time}
					/>

					<InputSelect
						IdInput='service_company'
						LabelText='Кто провел ТО?'
						value={machine.service_company}
						values={[
							{ id: machine.client ?? null, username: 'Самостоятельно' },
							{
								id: machine.service_company?.id,
								username: machine.service_company?.username,
							},
						]}
						setValue={v => handleChange('service_company', v, setMaintenance)}
						error={errors.service_company}
					/>

					<button type='submit'>Создать</button>
				</form>
			) : (
				<p>Загрузка...</p>
			)}
		</main>
	)
}

export default NewMaintenance
