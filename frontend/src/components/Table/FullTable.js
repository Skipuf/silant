import React from 'react'

const translate = {
	serial_number_machine: 'Серийный № машины',
	machine_model: 'Модель машины',
	serial_number_engine: 'Серийный № двигателя',
	engine_model: 'Модель двигателя',
	serial_number_transmission: 'Серийный № трансмиссии',
	transmission_model: 'Модель трансмиссии',
	serial_number_driving_axle: 'Серийный № ведущего моста',
	driving_axle_model: 'Модель ведущего моста',
	serial_number_steering_axle: 'Серийный № управляемого моста',
	steering_axle_model: 'Модель управляемого моста',
	supply_contract: 'Договор поставки №, дата',
	shipment_date_factory: 'Дата отгрузки с завода',
	consignee: 'Грузополучатель',
	delivery_address: 'Адрес поставки',
	equipment_options: 'Комплектация',
	client: 'Клиент',
	service_company: 'Сервисная компания',
	machine: '№ машины',

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

const FullTable = ({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Название</th>
					<th>Описание</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(data)
					.filter(([key]) => key !== 'id')
					.map(([key, value]) => {
						if (key === 'client' || key === 'service_company') {
							return (
								<tr key={key}>
									<th>{translate[key] || key}</th>
									<td>{value?.username ?? value}</td>
									<td></td>
								</tr>
							)
						}
						if (key === 'machine') {
							return (
								<tr key={key}>
									<th>{translate[key] || key}</th>
									<td>{value?.serial_number_machine ?? value}</td>
									<td></td>
								</tr>
							)
						}
						return (
							<tr key={key}>
								<th>{translate[key] || key}</th>
								<td>{value?.name ?? value}</td>
								<td>{value?.description ?? ''}</td>
							</tr>
						)
					})}
			</tbody>
		</table>
	)
}

export default FullTable
