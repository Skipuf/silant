import React from 'react'

import styles from './Accordion.module.scss'

function Accordion({ IdInput, LabelText, Content }) {
	return (
		<div className={styles.accordion}>
			<label className={styles.accordionLabel} htmlFor={IdInput}>
				{LabelText}
			</label>
			<input type='checkbox' id={IdInput}></input>

			<div className={styles.accordionContent}>
				<Content />
			</div>
		</div>
	)
}

export default Accordion
