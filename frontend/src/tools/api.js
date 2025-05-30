import axios from 'axios'

export async function fetchDataLogin(address, access) {
	try {
		const data = await axios.get(address, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		})
		if (data.data.length == 0) {
			return null
		}
		return data.data
	} catch (err) {
		console.error(err)
		return null
	}
}

export async function fetchDataNotLogin(address) {
	try {
		const data = await axios.get(address)
		if (data.data.length == 0) {
			return null
		}
		return data.data
	} catch (err) {
		console.error(err)
		return null
	}
}

export default { fetchDataLogin, fetchDataNotLogin }
