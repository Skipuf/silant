import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RequireRole } from './components/RequireRole'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

import NewUser from './pages/User/NewUser/NewUser'

import Machine from './pages/Machine/Machine/Machine'
import EditMachine from './pages/Machine/EditMachine/EditMachine'
import NewMachine from './pages/Machine/NewMachine/NewMachine'

import Maintenance from './pages/Maintenance/Maintenance/Maintenance'
import NewMaintenance from './pages/Maintenance/NewMaintenance/NewMaintenance'
import EditMaintenance from './pages/Maintenance/EditMaintenance/EditMaintenance'

import Claim from './pages/Claim/Claim/Claim'
import NewClaim from './pages/Claim/NewClaim/NewClaim'
import EditClaim from './pages/Claim/EditClaim/EditClaim'

import NotFound from './pages/NotFound/NotFound'

function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />

			<Route
				path='/user/new'
				element={
					<RequireRole allowedRoles={['manager']}>
						<NewUser />
					</RequireRole>
				}
			/>

			<Route
				path='/machine/:id'
				element={
					<RequireRole allowedRoles={['client', 'service', 'manager']}>
						<Machine />
					</RequireRole>
				}
			/>
			<Route
				path='/machine/:id/edit'
				element={
					<RequireRole allowedRoles={['manager']}>
						<EditMachine />
					</RequireRole>
				}
			/>
			<Route
				path='/machine/new'
				element={
					<RequireRole allowedRoles={['manager']}>
						<NewMachine />
					</RequireRole>
				}
			/>

			<Route
				path='/maintenance/:id'
				element={
					<RequireRole allowedRoles={['client', 'service', 'manager']}>
						<Maintenance />
					</RequireRole>
				}
			/>
			<Route
				path='/maintenance/:id/edit'
				element={
					<RequireRole allowedRoles={['manager']}>
						<EditMaintenance />
					</RequireRole>
				}
			/>
			<Route
				path='/machine/:id/newmaintenance'
				element={
					<RequireRole allowedRoles={['client', 'service', 'manager']}>
						<NewMaintenance />
					</RequireRole>
				}
			/>

			<Route
				path='/claim/:id'
				element={
					<RequireRole allowedRoles={['client', 'service', 'manager']}>
						<Claim />
					</RequireRole>
				}
			/>
			<Route
				path='/claim/:id/edit'
				element={
					<RequireRole allowedRoles={['manager']}>
						<EditClaim />
					</RequireRole>
				}
			/>
			<Route
				path='/machine/:id/newclaim'
				element={
					<RequireRole allowedRoles={['service', 'manager']}>
						<NewClaim />
					</RequireRole>
				}
			/>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default Router
