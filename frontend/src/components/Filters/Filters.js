import React from 'react'

import styles from './Filters.module.scss'

const nameFilters = {
	failure_node: 'Узел отказа',
	recovery_method: 'Способ восстановления',
	maintenance_type: 'Вид ТО',
	service_company: 'Сервисная компания',
	machine_model: 'Модель техники',
	engine_model: 'Модель двигателя',
	transmission_model: 'Модель трансмиссии',
	driving_axle_model: 'Модель ведущего моста',
	steering_axle_model: 'Модель управляемого моста',
}

function InputDate({ filters, filtersKey, setFiltersKey, setFiltersValue }) {
	const handleKeyChange = e => {
		const key = e.target.value
		setFiltersKey(key)

		if (key && filters[key]?.length > 0) {
			setFiltersValue(filters[key][0].id)
		} else {
			setFiltersValue('')
		}
	}

	return (
		<div className={styles.filter}>
			<h3>Фильтрация:</h3>
			<select onChange={handleKeyChange}>
				<option value=''>Выбрать тип фильтрации</option>
				{Object.keys(filters).map((filter, idx) => (
					<option key={`${filter}_${idx}`} value={filter}>
						{nameFilters[filter]}
					</option>
				))}
			</select>
			{filtersKey && (
				<select onChange={e => setFiltersValue(e.target.value)}>
					{filters[filtersKey].map((filter, idx) => (
						<option key={`${filter}_${idx}`} value={filter.id}>
							{filter.name}
						</option>
					))}
				</select>
			)}
		</div>
	)
}

export default InputDate
