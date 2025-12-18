import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import NotificationList from '../components/notifications/NotificationList'
import EtudiantNotifications from '../pages/etudiant/notifications'
import ParentNotifications from '../pages/parent/notifications'
import EnseignantNotifications from '../pages/enseignant/notifications'
import AdminSystemeNotifications from '../pages/adminsysteme/notifications'
import AdminPedagogiqueNotifications from '../pages/adminpedagogique/notifications'
import AdminContenueNotifications from '../pages/admincontenue/notifications'
import { getUserRoleFromToken, mapRoleToUserType } from '../utils/auth'

const currentUserRole = getUserRoleFromToken()
const currentUserType = mapRoleToUserType(currentUserRole)

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route
				index
				element={<div className="rounded-xl bg-white p-8 text-teal-deep shadow">Dashboard en cours de construction</div>}
			/>
			<Route path="notifications" element={<NotificationList userType={currentUserType} />} />
			<Route path="etudiant/notifications" element={<EtudiantNotifications />} />
			<Route path="parent/notifications" element={<ParentNotifications />} />
			<Route path="enseignant/notifications" element={<EnseignantNotifications />} />
			<Route path="adminsysteme/notifications" element={<AdminSystemeNotifications />} />
			<Route path="adminpedagogique/notifications" element={<AdminPedagogiqueNotifications />} />
			<Route path="admincontenue/notifications" element={<AdminContenueNotifications />} />
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
