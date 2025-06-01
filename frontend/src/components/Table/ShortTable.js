import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const translate = {
	serial_number_machine: '№ машины',
	supply_contract: 'Договор поставки',
	shipment_date_factory: 'Дата отгрузки с завода',
	consignee: 'Грузополучатель',
	delivery_address: 'Адрес поставки',
	order_number: '№ заказ-наряда',
	order_date: 'Дата заказ-наряда',
	maintenance_date: 'Дата проведения ТО',
	maintenance_type: 'Вид ТО',
	operating_time: 'Наработка, м/час',
	service_company: 'Сервисная компания',
	failure_date: 'Дата отказа',
	failure_node: 'Узел отказа',
	failure_description: 'Описание отказа',
	recovery_method: 'Способ восстановления',
	spare_parts_used: 'Используемые запасные части',
	recovery_date: 'Дата восстановления',
	downtime: 'Время простоя техники',
}

const ShortTable = ({ data, type, filter = ['machine', 'id'] }) => {
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

	const sortedData = useMemo(() => {
		if (!sortConfig.key) {
			return data
		}

		const sortableItems = [...data]

		sortableItems.sort((a, b) => {
			const aVal = a[sortConfig.key]
			const bVal = b[sortConfig.key]
			let comparison = 0

			const dateA = new Date(aVal)
			const dateB = new Date(bVal)
			const isValidDateA = dateA.toString() !== 'Invalid Date'
			const isValidDateB = dateB.toString() !== 'Invalid Date'

			if (isValidDateA && isValidDateB) {
				comparison = dateA.getTime() - dateB.getTime()
			} else {
				const numA = Number(aVal)
				const numB = Number(bVal)
				if (!isNaN(numA) && !isNaN(numB)) {
					comparison = numA - numB
				} else if (typeof aVal === 'string' && typeof bVal === 'string') {
					comparison = aVal.localeCompare(bVal, undefined, {
						sensitivity: 'base',
					})
				} else {
					comparison = String(aVal).localeCompare(String(bVal), undefined, {
						sensitivity: 'base',
					})
				}
			}

			return sortConfig.direction === 'asc' ? comparison : -comparison
		})

		return sortableItems
	}, [data, sortConfig])

	const handleSort = key => {
		if (sortConfig.key === key) {
			setSortConfig({
				key,
				direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
			})
		} else {
			setSortConfig({ key, direction: 'asc' })
		}
	}

	const visibleKeys = Object.keys(data[0] || {}).filter(
		key => !filter.includes(key)
	)

	return (
		<table>
			<thead>
				<tr>
					{visibleKeys.map(key => {
						const isActive = sortConfig.key === key
						const arrow = isActive
							? sortConfig.direction === 'asc'
								? '↑'
								: '↓'
							: ''

						return (
							<th
								key={key}
								style={{ cursor: 'pointer', userSelect: 'none' }}
								onClick={() => handleSort(key)}
							>
								{translate[key] || key} {arrow}
							</th>
						)
					})}
					<th></th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(obj => (
					<tr key={`${type}_${obj.id}`}>
						{visibleKeys.map(key => (
							<td key={key}>
								{key === 'client' || key === 'service_company'
									? obj[key]?.username ?? obj[key]
									: obj[key]?.name ?? obj[key]}
							</td>
						))}
						<td>
							<Link to={`/${type}/${obj.id}`}>подробнее</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default ShortTable
