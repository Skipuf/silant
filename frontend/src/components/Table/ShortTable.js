import React from 'react'
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
	return (
		<table>
			<thead>
				<tr>
					{Object.keys(data[0])
						.filter(key => !filter.includes(key))
						.map(key => (
							<th>{translate[key]}</th>
						))}
					<td></td>
				</tr>
			</thead>
			<tbody>
				{data.map(obj => (
					<tr key={`${type}_${obj.id}`}>
						{Object.entries(obj)
							.filter(([key]) => !filter.includes(key))
							.map(([key, value]) => (
								<td>
									{key === 'client' || key === 'service_company'
										? value?.username ?? value
										: value?.name ?? value}
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
