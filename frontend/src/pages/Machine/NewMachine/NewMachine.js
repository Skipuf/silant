import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../context/UserContext'
import styles from './NewMachine.module.scss'

import { fetchDataLogin } from '../../../tools/api'
import { handleChange } from '../../../tools/state'

import InputText from '../../../components/Input/InputText'
import InputDate from '../../../components/Input/InputDate'
import InputSelect from '../../../components/Input/InputSelect'
import InputHandbook from '../../../components/Input/InputHandbook'

const NewMachine = () => {
	const [clients, setClients] = useState(null)
	const [serviceCompany, setServiceCompany] = useState(null)

	const navigate = useNavigate()

	const { user } = useUser()

	const today = new Date().toISOString().split('T')[0]

	const [machine, setMachine] = useState({
		serial_number_machine: '',
		machine_model: null,
		engine_model: null,
		serial_number_engine: '',
		transmission_model: null,
		serial_number_transmission: '',
		driving_axle_model: null,
		serial_number_driving_axle: '',
		steering_axle_model: null,
		serial_number_steering_axle: '',
		supply_contract: '',
		shipment_date_factory: today,
		consignee: '',
		delivery_address: '',
		equipment_options: '',
		client: null,
		service_company: null,
	})

	const [errors, setErrors] = useState({})

	useEffect(() => {
		async function load() {
			setClients(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/users/?role=client`,
					user.access
				)
			)
			setServiceCompany(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/users/?role=service`,
					user.access
				)
			)
		}
		load()
	}, [user])

	const validate = () => {
		const newErrors = {}

		Object.entries(machine).forEach(([key, value]) => {
			if (
				key === 'client' ||
				key === 'service_company' ||
				key === 'supply_contract' ||
				key === 'consignee' ||
				key === 'delivery_address' ||
				key === 'shipment_date_factory' ||
				key === 'equipment_options'
			) {
				return
			}
			if (value === null || value === '' || value === 0) {
				newErrors[key] = 'Это поле обязательно'
			}
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!validate()) return

		Object.entries(machine).forEach(([key, value]) => {
			if (value === null || value === '' || value === 0) {
				delete machine[key]
			}
		})

		console.log(machine)

		try {
			const response = await axios.post(
				'http://127.0.0.1:8000/api/machines/',
				machine,
				{
					headers: {
						Authorization: `Bearer ${user.access}`,
						'Content-Type': 'application/json',
					},
				}
			)
			navigate(`/machine/${response.data.id}/`)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main className={styles.newMachine}>
			{clients && serviceCompany && (
				<form onSubmit={handleSubmit} noValidate>
					<h2>Создание новой машины</h2>

					<InputText
						IdInput='serial_number_machine'
						LabelText='Зав. № машины'
						value={machine.serial_number_machine}
						setValue={v => handleChange('serial_number_machine', v, setMachine)}
						error={errors.serial_number_machine}
					/>

					<InputHandbook
						IdInput='MachineModel'
						LabelText='Модель техники'
						dataListValue={machine.machine_model}
						setDataListValue={v => handleChange('machine_model', v, setMachine)}
						name={machine.machine_model_name}
						setName={v => handleChange('machine_model_name', v, setMachine)}
						description={machine.machine_model_description}
						setDescription={v =>
							handleChange('machine_model_description', v, setMachine)
						}
						error={errors.machine_model}
					/>

					<InputText
						IdInput='serial_number_engine'
						LabelText='Зав. № двигателя'
						value={machine.serial_number_engine}
						setValue={v => handleChange('serial_number_engine', v, setMachine)}
						error={errors.serial_number_engine}
					/>

					<InputHandbook
						IdInput='EngineModel'
						LabelText='Модель двигателя'
						dataListValue={machine.engine_model}
						setDataListValue={v => handleChange('engine_model', v, setMachine)}
						name={machine.engine_model_name}
						setName={v => handleChange('engine_model_name', v, setMachine)}
						description={machine.engine_model_description}
						setDescription={v =>
							handleChange('engine_model_description', v, setMachine)
						}
						error={errors.engine_model}
					/>

					<InputText
						IdInput='serial_number_transmission'
						LabelText='Зав. № трансмиссии'
						value={machine.serial_number_transmission}
						setValue={v =>
							handleChange('serial_number_transmission', v, setMachine)
						}
						error={errors.serial_number_transmission}
					/>

					<InputHandbook
						IdInput='TransmissionModel'
						LabelText='Модель трансмиссии'
						dataListValue={machine.transmission_model}
						setDataListValue={v =>
							handleChange('transmission_model', v, setMachine)
						}
						name={machine.transmission_model_name}
						setName={v =>
							handleChange('transmission_model_name', v, setMachine)
						}
						description={machine.transmission_model_description}
						setDescription={v =>
							handleChange('transmission_model_description', v, setMachine)
						}
						error={errors.transmission_model}
					/>

					<InputText
						IdInput='serial_number_driving_axle'
						LabelText='Зав. № ведущего моста'
						value={machine.serial_number_driving_axle}
						setValue={v =>
							handleChange('serial_number_driving_axle', v, setMachine)
						}
						error={errors.serial_number_driving_axle}
					/>

					<InputHandbook
						IdInput='DrivingAxleModel'
						LabelText='Модель ведущего моста'
						dataListValue={machine.driving_axle_model}
						setDataListValue={v =>
							handleChange('driving_axle_model', v, setMachine)
						}
						name={machine.driving_axle_model_name}
						setName={v =>
							handleChange('driving_axle_model_name', v, setMachine)
						}
						description={machine.driving_axle_model_description}
						setDescription={v =>
							handleChange('driving_axle_model_description', v, setMachine)
						}
						error={errors.driving_axle_model}
					/>

					<InputText
						IdInput='serial_number_steering_axle'
						LabelText='Зав. № управляемого моста'
						value={machine.serial_number_steering_axle}
						setValue={v =>
							handleChange('serial_number_steering_axle', v, setMachine)
						}
						error={errors.serial_number_steering_axle}
					/>

					<InputHandbook
						IdInput='SteeringAxleModel'
						LabelText='Модель управляемого моста'
						dataListValue={machine.steering_axle_model}
						setDataListValue={v =>
							handleChange('steering_axle_model', v, setMachine)
						}
						name={machine.steering_axle_model_name}
						setName={v =>
							handleChange('steering_axle_model_name', v, setMachine)
						}
						description={machine.steering_axle_model_description}
						setDescription={v =>
							handleChange('steering_axle_model_description', v, setMachine)
						}
						error={errors.steering_axle_model}
					/>

					<InputText
						IdInput='supply_contract'
						LabelText='Договор поставки №, дата'
						value={machine.supply_contract}
						setValue={v => handleChange('supply_contract', v, setMachine)}
						error={errors.supply_contract}
					/>

					<InputDate
						IdInput='shipment_date_factory'
						LabelText='Дата отгрузки с завода'
						value={machine.shipment_date_factory}
						minValue={null}
						setValue={v => handleChange('shipment_date_factory', v, setMachine)}
						error={errors.shipment_date_factory}
					/>

					<InputText
						IdInput='consignee'
						LabelText='Грузополучатель'
						value={machine.consignee}
						setValue={v => handleChange('consignee', v, setMachine)}
						error={errors.consignee}
					/>

					<InputText
						IdInput='delivery_address'
						LabelText='Адрес поставки'
						value={machine.delivery_address}
						setValue={v => handleChange('delivery_address', v, setMachine)}
						error={errors.delivery_address}
					/>

					<InputText
						IdInput='equipment_options'
						LabelText='Комплектация (доп. опции)'
						value={machine.equipment_options}
						setValue={v => handleChange('equipment_options', v, setMachine)}
						error={errors.equipment_options}
					/>

					<InputSelect
						IdInput='client'
						LabelText='Клиент'
						value={machine.client}
						values={clients}
						setValue={v => handleChange('client', v, setMachine)}
						error={errors.client}
					/>

					<InputSelect
						IdInput='service_company'
						LabelText='Сервисная компания'
						value={machine.service_company}
						values={serviceCompany}
						setValue={v => handleChange('service_company', v, setMachine)}
						error={errors.service_company}
					/>

					<button type='submit'>Создать</button>
				</form>
			)}
		</main>
	)
}

export default NewMachine
