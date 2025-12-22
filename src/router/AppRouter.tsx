import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import SallePage from '../pages/salle'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <div className="rounded-xl bg-white p-8 text-teal-deep shadow">Dashboard en cours de construction</div>,
			},
			{
				path: 'salles',
				element: <SallePage />,
			},
			{
				path: '*',
				element: <div className="rounded-xl bg-white p-8 text-teal-deep shadow">Page non trouvée</div>,
			},
		],
	},
])

const AppRouter = () => {
	return <RouterProvider router={router} />
}

export default AppRouter
