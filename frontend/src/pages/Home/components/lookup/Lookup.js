import React, { useState } from 'react'

import { fetchDataNotLogin } from '../../../../tools/api'

import styles from './Lookup.module.scss'

import FullTable from './../../../../components/Table/FullTable'

const Lookup = () => {
	const [numberMachine, setNumberMachine] = useState('')
	const [resultSearch, setResultSearch] = useState(null)
	const [error, setError] = useState('')

	const getMachine = async () => {
		if (!numberMachine.trim()) {
			setError('Ошибка: введите номер машины!')
			return
		}

		setResultSearch(null)
		setError('')

		const data = await fetchDataNotLogin(
			`http://127.0.0.1:8000/api/machines/lookup/?serial=${numberMachine}`
		)

		setResultSearch(data)

		if (!data) setError('Ошибка: не найдено!')
	}

	return (
		<>
			<h2>
				Проверьте комплектацию и технические характеристики техники Силант
			</h2>
			<div className={styles.search}>
				<input
					type='text'
					placeholder='Номер машины'
					value={numberMachine}
					onChange={e => setNumberMachine(e.target.value)}
				></input>
				<button onClick={getMachine}>поиск</button>
			</div>
			{error && <p className={styles.error}>{error}</p>}
			{resultSearch && (
				<div className={styles.result}>
					<h3>
						Информация о комплектации и технических характеристиках вашей
						техники
					</h3>
					<FullTable data={resultSearch} />
				</div>
			)}
		</>
	)
}

export default Lookup
