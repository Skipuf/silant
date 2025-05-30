export const handleChange = (name, value, set) => {
	set(prev => ({ ...prev, [name]: value }))
}

export default { handleChange }
