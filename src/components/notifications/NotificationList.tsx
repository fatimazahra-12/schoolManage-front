import { useState, useEffect, useCallback } from 'react'
import notificationService, { type Notification } from '../../services/notificationservice'

interface NotificationListProps {
	userType: 'etudiant' | 'parent' | 'enseignant' | 'adminsysteme' | 'adminpedagogique' | 'admincontenue'
}

const NotificationList = ({ userType }: NotificationListProps) => {
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [unreadOnly, setUnreadOnly] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadNotifications = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			const data = unreadOnly 
				? await notificationService.getMyUnreadNotifications()
				: await notificationService.getMyNotifications()
			setNotifications(data)
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Failed to load notifications'
			setError(message)
		} finally {
			setLoading(false)
		}
	}, [unreadOnly])

	useEffect(() => {
		loadNotifications()
	}, [loadNotifications])

	const handleMarkAsRead = async (id: number) => {
		try {
			await notificationService.markAsRead(id)
			loadNotifications()
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Failed to mark as read'
			setError(message)
		}
	}

	const handleMarkAllAsRead = async () => {
		try {
			await notificationService.markAllAsRead()
			loadNotifications()
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Failed to mark all as read'
			setError(message)
		}
	}

	const handleDelete = async (id: number) => {
		try {
			await notificationService.deleteNotification(id)
			loadNotifications()
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Failed to delete notification'
			setError(message)
		}
	}

	const getNotificationIcon = (type: string) => {
		switch (type) {
			case 'grade':
				return '📊'
			case 'exam':
				return '📝'
			case 'absence':
				return '⚠️'
			case 'homework':
				return '📚'
			case 'event':
				return '📅'
			default:
				return '📢'
		}
	}

	const getNotificationColor = (type: string) => {
		switch (type) {
			case 'grade':
				return 'bg-blue-100 text-blue-800'
			case 'exam':
				return 'bg-purple-100 text-purple-800'
			case 'absence':
				return 'bg-red-100 text-red-800'
			case 'homework':
				return 'bg-green-100 text-green-800'
			case 'event':
				return 'bg-yellow-100 text-yellow-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const now = new Date()
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

		if (diffInSeconds < 60) return 'Just now'
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
		if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
		
		return date.toLocaleDateString()
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-medium"></div>
			</div>
		)
	}

	return (
		<div className="bg-white rounded-xl shadow-sm border border-neutral-ivory p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<div className="flex-1">
					<h2 className="text-xl sm:text-2xl font-bold text-teal-deep">
						{userType === 'etudiant' ? 'Mes Notifications' : 
						 userType === 'parent' ? 'Notifications Parents' :
						 userType === 'enseignant' ? 'Notifications Enseignant' :
						 userType === 'adminsysteme' ? 'Notifications Admin Système' :
						 userType === 'adminpedagogique' ? 'Notifications Admin Pédagogique' :
						 'Notifications Admin Contenue'}
					</h2>
					<p className="text-xs sm:text-sm text-teal-medium mt-1">
						{notifications.length} notification{notifications.length !== 1 ? 's' : ''}
					</p>
				</div>
				<div className="flex flex-wrap gap-2 w-full sm:w-auto">
					<button
						onClick={() => setUnreadOnly(!unreadOnly)}
						className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
							unreadOnly
								? 'bg-coral text-white'
								: 'bg-neutral-sage text-teal-medium hover:bg-neutral-ivory'
						}`}
					>
						{unreadOnly ? 'Toutes' : 'Non lues'}
					</button>
					<button
						onClick={handleMarkAllAsRead}
						className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-teal-medium text-white hover:bg-teal-deep transition whitespace-nowrap"
					>
						Marquer tout comme lu
					</button>
				</div>
			</div>

			{error && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					{error}
				</div>
			)}

			{notifications.length === 0 ? (
				<div className="text-center py-10 sm:py-12">
					<div className="text-4xl sm:text-6xl mb-3">🔔</div>
					<p className="text-sm sm:text-base text-teal-medium">Aucune notification</p>
				</div>
			) : (
				<div className="space-y-3">
					{notifications.map((notification) => (
						<div
							key={notification.id}
							className={`p-3 sm:p-4 rounded-lg border transition hover:shadow-md ${
								notification.is_read
									? 'bg-white border-neutral-ivory'
									: 'bg-coral-light/20 border-coral'
							}`}
						>
							<div className="flex items-start gap-2 sm:gap-4">
								<div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl ${getNotificationColor(notification.type)}`}>
									{getNotificationIcon(notification.type)}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
										<div className="flex-1 min-w-0">
											<h3 className="text-sm sm:text-base font-semibold text-teal-deep break-words">
												{notification.titre}
											</h3>
											<p className="text-xs sm:text-sm text-teal-medium mt-1 break-words">
												{notification.message}
											</p>
											{notification.metadata && (
												<div className="mt-2 text-[10px] sm:text-xs text-teal-medium bg-neutral-sage p-2 rounded break-words">
													{Object.entries(notification.metadata).map(([key, value]) => (
														<div key={key} className="break-words">
															<span className="font-semibold">{key}:</span> {String(value)}
														</div>
													))}
												</div>
											)}
										</div>
										<span className={`px-2 py-1 rounded text-[10px] sm:text-xs font-semibold whitespace-nowrap self-start ${getNotificationColor(notification.type)}`}>
											{notification.type}
										</span>
									</div>
									<div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
										<span className="text-[10px] sm:text-xs text-teal-medium">
											{formatDate(notification.created_at)}
										</span>
										{!notification.is_read && (
											<button
												onClick={() => handleMarkAsRead(notification.id)}
												className="text-[10px] sm:text-xs font-semibold text-teal-medium hover:text-coral transition"
											>
												Marquer comme lu
											</button>
										)}
										<button
											onClick={() => handleDelete(notification.id)}
											className="text-[10px] sm:text-xs font-semibold text-red-500 hover:text-red-700 transition"
										>
											Supprimer
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default NotificationList
