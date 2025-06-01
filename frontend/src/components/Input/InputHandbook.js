import React, { useEffect, useState, useRef } from 'react'

import { fetchDataLogin } from '@tools/api'

import { useUser } from '@context/UserContext'

import styles from './input.module.scss'

function InputHandbook({
	IdInput,
	LabelText,
	dataListValue,
	setDataListValue,
	name,
	setName,
	description,
	setDescription,
	error,
}) {
	const { user } = useUser()
	const [handbooks, setHandbooks] = useState([])
	const [locked, setLocked] = useState(true)

	const prevValue = useRef(dataListValue)

	useEffect(() => {
		async function load() {
			setHandbooks(
				await fetchDataLogin(
					`http://127.0.0.1:8000/api/handbook/?type=${IdInput}`,
					user.access
				)
			)
		}
		load()
	}, [IdInput, user])

	useEffect(() => {
		const found = handbooks.find(
			item => String(item.id) === String(dataListValue)
		)

		if (found) {
			setLocked(true)
			setName(found.name)
			setDescription(found.description)
		} else if (dataListValue === 'Новый') {
			if (prevValue.current !== 'Новый') {
				setName('')
				setDescription('')
			}
			setLocked(false)
		} else {
			setLocked(true)
			setName('')
			setDescription('')
		}

		prevValue.current = dataListValue
	}, [dataListValue, handbooks])

	return (
		<>
			<label htmlFor={IdInput}>{LabelText} (id Объекта)</label>
			<input
				id={IdInput}
				list={`${IdInput}_datalist`}
				value={dataListValue || ''}
				onChange={e => setDataListValue(e.target.value)}
			/>
			<datalist id={`${IdInput}_datalist`}>
				<option value='Новый'>— Создать новый —</option>
				{handbooks.map(h => (
					<option key={h.id} value={h.id}>
						{h.name}
					</option>
				))}
			</datalist>
			{error && <div className={styles.error}>{error}</div>}

			<label htmlFor={`${IdInput}_Name`}>{LabelText}: Название</label>
			<input
				id={`${IdInput}_Name`}
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				disabled={locked}
			/>

			<label htmlFor={`${IdInput}_description`}>{LabelText}: Описание</label>
			<input
				id={`${IdInput}_description`}
				type='text'
				value={description}
				onChange={e => setDescription(e.target.value)}
				disabled={locked}
			/>
		</>
	)
}

export default InputHandbook
