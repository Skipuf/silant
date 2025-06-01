import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@context/UserContext'
import styles from './NewUser.module.scss'

import { handleChange } from '@tools/state'

import InputText from '@components/Input/InputText'
import InputSelect from '@components/Input/InputSelect'

const NewUser = () => {
	const navigate = useNavigate()

	const { user } = useUser()

	const [newUser, setNewUser] = useState({
		username: '',
		email: '',
		role: null,
	})

	const [errors, setErrors] = useState({})

	const validate = () => {
		const newErrors = {}

		Object.entries(newUser).forEach(([key, value]) => {
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

		try {
			await axios.post('http://127.0.0.1:8000/api/users/', newUser, {
				headers: {
					Authorization: `Bearer ${user.access}`,
					'Content-Type': 'application/json',
				},
			})
			navigate(`/`)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main className={styles.newUser}>
			<form onSubmit={handleSubmit} noValidate>
				<h2>Создание нового пользователя</h2>

				<InputText
					IdInput='username'
					LabelText='Имя пользователя (название компании)'
					value={newUser.username}
					setValue={v => handleChange('username', v, setNewUser)}
					error={errors.username}
				/>

				<InputText
					IdInput='email'
					LabelText='Электронная почта'
					value={newUser.email}
					setValue={v => handleChange('email', v, setNewUser)}
					error={errors.email}
				/>

				<InputSelect
					IdInput='role'
					LabelText='Роль пользователя'
					values={[
						{ id: 'client', username: 'Клиент' },
						{ id: 'service', username: 'Сервисная компания' },
					]}
					setValue={v => handleChange('role', v, setNewUser)}
					error={errors.role}
				/>

				<button type='submit'>Создать</button>
			</form>
		</main>
	)
}

export default NewUser
