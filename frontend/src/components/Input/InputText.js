import React from 'react'

import styles from './input.module.scss'

function InputText({ IdInput, LabelText, value, setValue, error }) {
	return (
		<>
			<label htmlFor={IdInput}>{LabelText}</label>
			<input
				type='text'
				id={IdInput}
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</>
	)
}

export default InputText
