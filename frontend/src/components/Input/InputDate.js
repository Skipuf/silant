import React from 'react'

import styles from './input.module.scss'

function InputDate({ IdInput, LabelText, value, minValue, setValue, error }) {
	return (
		<>
			<label htmlFor={IdInput}>{LabelText}</label>
			<input
				type='Date'
				id={IdInput}
				value={value}
				min={minValue}
				onChange={e => setValue(e.target.value)}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</>
	)
}

export default InputDate
