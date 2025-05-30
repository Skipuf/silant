import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { UserProvider } from './context/UserContext'
import Router from './router'

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Header />
				<div className='content'>
					<Router />
				</div>
				<Footer />
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
