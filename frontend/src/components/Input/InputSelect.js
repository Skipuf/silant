import React from 'react'

import styles from './input.module.scss'

function InputSelect({ IdInput, LabelText, value, values, setValue, error }) {
	return (
		<>
			<label htmlFor={IdInput}>{LabelText}</label>
			<select
				id={IdInput}
				value={value}
				onChange={e => setValue(e.target.value)}
			>
				<option value=''>выбор</option>
				{values.map(v => (
					<option key={v.id} value={v.id}>
						{v.username}
					</option>
				))}
			</select>
			{error && <div className={styles.error}>{error}</div>}
		</>
	)
}

export default InputSelect
