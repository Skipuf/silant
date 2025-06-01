import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@context/UserContext'
import styles from './EditClaim.module.scss'

import { fetchDataLogin } from '@tools/api'
import { handleChange } from '@tools/state'

import InputText from '@components/Input/InputText'
import InputDate from '@components/Input/InputDate'
import InputNumber from '@components/Input/InputNumber'
import InputHandbook from '@components/Input/InputHandbook'

const EditClaim = () => {
	const [machine, setMachine] = useState(null)

	const [claim, setClaim] = useState({})

	const [errors, setErrors] = useState({})

	const navigate = useNavigate()

	const { user } = useUser()
	const { id } = useParams()

	useEffect(() => {
		async function load() {
			let response = await fetchDataLogin(
				`http://127.0.0.1:8000/api/claim/${id}/`,
				user.access
			)
			setMachine(response.machine)
			response.failure_node = response.failure_node.id
			response.recovery_method = response.recovery_method.id
			response.service_company = response.service_company.id
			response.machine = response.machine.id
			setClaim(response)
		}
		load()
	}, [id, user])

	const validate = () => {
		const newErrors = {}

		Object.entries(claim).forEach(([key, value]) => {
			if (value === null || value === '' || value === 0) {
				newErrors[key] = 'Это поле обязательно'
			}
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!machine) return
		if (!validate()) return

		try {
			await axios.put(`http://127.0.0.1:8000/api/claim/${id}/`, claim, {
				headers: {
					Authorization: `Bearer ${user.access}`,
					'Content-Type': 'application/json',
				},
			})
			navigate(`/claim/${id}/`)
		} catch (error) {
			console.error('Error creating claim:', error)
		}
	}

	return (
		<main className={styles.editClaim}>
			{machine && claim && (
				<form onSubmit={handleSubmit} noValidate>
					<h2>Создание новой рекламации</h2>

					<label htmlFor='machine'>№ машины</label>
					<input
						type='text'
						id='machine'
						value={machine.serial_number_machine}
						disabled
					/>

					<InputHandbook
						IdInput='FailureNode'
						LabelText='Узел отказа'
						dataListValue={claim.failure_node}
						setDataListValue={v => handleChange('failure_node', v, setClaim)}
						name={claim.failure_node_name}
						setName={v => handleChange('failure_node_name', v, setClaim)}
						description={claim.failure_node_description}
						setDescription={v =>
							handleChange('failure_node_description', v, setClaim)
						}
						error={errors.failure_node}
					/>

					<InputText
						IdInput='failure_description'
						LabelText='Описание отказа'
						value={claim.failure_description}
						setValue={v => handleChange('failure_description', v, setClaim)}
						error={errors.failure_description}
					/>

					<InputHandbook
						IdInput='RecoveryMethod'
						LabelText='Способ восстановления'
						dataListValue={claim.recovery_method}
						setDataListValue={v => handleChange('recovery_method', v, setClaim)}
						name={claim.recovery_method_name}
						setName={v => handleChange('recovery_method_name', v, setClaim)}
						description={claim.recovery_method_description}
						setDescription={v =>
							handleChange('recovery_method_description', v, setClaim)
						}
						error={errors.recovery_method}
					/>

					<InputText
						IdInput='spare_parts_used'
						LabelText='Используемые запасные части'
						value={claim.spare_parts_used}
						setValue={v => handleChange('spare_parts_used', v, setClaim)}
						error={errors.spare_parts_used}
					/>

					<InputNumber
						IdInput='operating_time'
						LabelText='Наработка, м/час'
						value={claim.operating_time}
						minValue={null}
						setValue={v => handleChange('operating_time', v, setClaim)}
						error={errors.operating_time}
					/>

					<InputDate
						IdInput='failure_date'
						LabelText='Дата отказа'
						value={claim.failure_date}
						minValue={null}
						setValue={v => handleChange('failure_date', v, setClaim)}
						error={errors.failure_date}
					/>

					<InputDate
						IdInput='recovery_date'
						LabelText='Дата восстановления'
						value={claim.recovery_date}
						minValue={claim.failure_date}
						setValue={v => handleChange('recovery_date', v, setClaim)}
						error={errors.recovery_date}
					/>

					<InputText
						IdInput='downtime'
						LabelText='Время простоя техники'
						value={claim.downtime}
						setValue={v => handleChange('downtime', v, setClaim)}
						error={errors.downtime}
					/>

					<button type='submit'>изменить</button>
				</form>
			)}
		</main>
	)
}

export default EditClaim
