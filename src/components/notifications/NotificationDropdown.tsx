import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import notificationService, { type Notification } from '../../services/notificationservice'

interface NotificationDropdownProps {
	onNotificationClick?: (notification: Notification) => void
}

const NotificationDropdown = ({ onNotificationClick }: NotificationDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [unreadCount, setUnreadCount] = useState(0)
	const [loading, setLoading] = useState(false)

	const loadNotifications = async () => {
		try {
			setLoading(true)
			const data = await notificationService.getMyUnreadNotifications()
			setNotifications(data.slice(0, 5)) // Show only 5 most recent
			setUnreadCount(data.length)
		} catch (err) {
			console.error('Failed to load notifications:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadNotifications()
		// Poll for new notifications every 30 seconds
		const interval = setInterval(loadNotifications, 30000)
		return () => clearInterval(interval)
	}, [])

	const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
		e.stopPropagation()
		try {
			await notificationService.markAsRead(id)
			loadNotifications()
		} catch (err) {
			console.error('Failed to mark as read:', err)
		}
	}

	const handleMarkAllAsRead = async () => {
		try {
			await notificationService.markAllAsRead()
			loadNotifications()
		} catch (err) {
			console.error('Failed to mark all as read:', err)
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const now = new Date()
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

		if (diffInSeconds < 60) return 'Just now'
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
		
		return date.toLocaleDateString()
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="relative h-10 w-10 items-center justify-center rounded-full border border-neutral-ivory text-teal-medium transition hover:border-coral hover:text-coral inline-flex"
				aria-label="Notifications"
			>
				{unreadCount > 0 && (
					<span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
						{unreadCount > 9 ? '9+' : unreadCount}
					</span>
				)}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.5">
					<path d="M12 4a4 4 0 0 0-4 4c0 4-1 5-2 6h12c-1-1-2-2-2-6a4 4 0 0 0-4-4z" />
					<path d="M10 19a2 2 0 0 0 4 0" />
				</svg>
			</button>

			{isOpen && (
				<>
					<div 
						className="fixed inset-0 z-40" 
						onClick={() => setIsOpen(false)}
					/>
					<div className="fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 mt-0 w-auto sm:w-96 max-w-none sm:max-w-96 rounded-xl border border-neutral-ivory bg-white shadow-xl z-50">
						<div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-neutral-ivory">
							<h3 className="text-sm font-semibold text-teal-deep">Notifications</h3>
							{unreadCount > 0 && (
								<button
									onClick={handleMarkAllAsRead}
									className="text-[10px] sm:text-xs font-semibold text-coral hover:text-coral-dark transition whitespace-nowrap"
								>
									Marquer tout comme lu
								</button>
							)}
						</div>

						<div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
							{loading ? (
								<div className="flex justify-center items-center py-8">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-medium"></div>
								</div>
							) : notifications.length === 0 ? (
								<div className="text-center py-8">
									<div className="text-3xl sm:text-4xl mb-2">🔔</div>
									<p className="text-xs sm:text-sm text-teal-medium">Aucune nouvelle notification</p>
								</div>
							) : (
								<div className="divide-y divide-neutral-ivory">
									{notifications.map((notification) => (
										<div
											key={notification.id}
											className="px-3 sm:px-4 py-3 hover:bg-neutral-sage cursor-pointer transition"
											onClick={() => {
												onNotificationClick?.(notification)
												setIsOpen(false)
											}}
										>
											<div className="flex items-start gap-2 sm:gap-3">
												<div className="mt-1 h-2 w-2 rounded-full bg-coral flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<p className="text-xs sm:text-sm font-semibold text-teal-deep truncate">
														{notification.titre}
													</p>
													<p className="text-[11px] sm:text-xs text-teal-medium line-clamp-2 mt-1">
														{notification.message}
													</p>
													<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mt-2">
														<span className="text-[10px] font-semibold text-teal-medium">
															{formatDate(notification.created_at)}
														</span>
														<button
															onClick={(e) => handleMarkAsRead(notification.id, e)}
															className="text-[10px] font-semibold text-coral hover:text-coral-dark text-left sm:text-right"
														>
															Marquer comme lu
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						<Link
							to="/notifications"
							className="block w-full rounded-b-xl px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold text-coral hover:bg-neutral-sage transition border-t border-neutral-ivory"
							onClick={() => setIsOpen(false)}
						>
							Voir toutes les notifications
						</Link>
					</div>
				</>
			)}
		</div>
	)
}

export default NotificationDropdown
