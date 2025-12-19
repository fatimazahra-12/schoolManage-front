import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route
				index
				element={<div className="rounded-xl bg-white p-8 text-teal-deep shadow">Dashboard en cours de construction</div>}
			/>
			<Route
				path="*"
				element={<div className="rounded-xl bg-white p-8 text-teal-deep shadow">Page non trouvée</div>}
			/>
		</Route>
	)
)

const AppRouter = () => {
	return <RouterProvider router={router} />
}

export default AppRouter
