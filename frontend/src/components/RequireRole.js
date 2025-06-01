import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@context/UserContext'

export function RequireRole({ allowedRoles, children }) {
	const { user } = useUser()

	if (!user || !allowedRoles.includes(user.role)) {
		return <Navigate to='/404' replace />
	}

	return <>{children}</>
}
