import React from 'react'

import styles from './input.module.scss'

function InputNumber({ IdInput, LabelText, value, setValue, error }) {
	return (
		<>
			<label htmlFor={IdInput}>{LabelText}</label>
			<input
				type='number'
				id={IdInput}
				value={value}
				min={0}
				max={100000}
				onChange={e => setValue(e.target.value)}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</>
	)
}

export default InputNumber
