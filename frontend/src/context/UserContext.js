import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const raw = localStorage.getItem('user')
		return raw ? JSON.parse(raw) : null
	})

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)
