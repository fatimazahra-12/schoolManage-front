import axios, { AxiosError } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081'
const NOTIFICATIONS_ENDPOINT = `${API_URL}/api/notifications`

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: NOTIFICATIONS_ENDPOINT,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add request interceptor to attach auth token
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

export interface Notification {
	id: number
	user_id: number
	titre: string
	message: string
	type: 'grade' | 'exam' | 'absence' | 'general' | 'homework' | 'event'
	channels: ('in_app' | 'email' | 'sms')[]
	is_read: boolean
	read_at?: string
	metadata?: Record<string, unknown>
	created_at: string
	updated_at: string
}

export interface CreateNotificationDto {
	user_id: number
	titre: string
	message: string
	type: string
	channels: string[]
	metadata?: Record<string, unknown>
}

class NotificationService {
	private handleError(error: unknown): never {
		if (error instanceof AxiosError) {
			const message = error.response?.data?.message || error.message
			throw new Error(message)
		}
		throw error instanceof Error ? error : new Error('Une erreur est survenue')
	}

	// Create notification (admin only)
	async createNotification(data: CreateNotificationDto): Promise<Notification> {
		try {
			const response = await apiClient.post('', data)
			return response.data
		} catch (error) {
			this.handleError(error)
		}
	}

	// List all notifications (admin only)
	async getAllNotifications(): Promise<Notification[]> {
		try {
			const response = await apiClient.get('/all')
			return response.data
		} catch (error) {
			this.handleError(error)
		}
	}

	// List my notifications
	async getMyNotifications(): Promise<Notification[]> {
		try {
			const response = await apiClient.get('/me')
			return response.data
		} catch (error) {
			this.handleError(error)
		}
	}

	// List my unread notifications
	async getMyUnreadNotifications(): Promise<Notification[]> {
		try {
			const response = await apiClient.get('/me/unread')
			return response.data
		} catch (error) {
			this.handleError(error)
		}
	}

	// Mark one notification as read
	async markAsRead(recipientId: number): Promise<void> {
		if (!recipientId || recipientId <= 0) {
			throw new Error('ID de notification invalide')
		}
		try {
			await apiClient.patch(`/${recipientId}/read`)
		} catch (error) {
			this.handleError(error)
		}
	}

	// Mark all my notifications as read
	async markAllAsRead(): Promise<void> {
		try {
			await apiClient.patch('/me/read-all')
		} catch (error) {
			this.handleError(error)
		}
	}

	// Delete one notification
	async deleteNotification(recipientId: number): Promise<void> {
		if (!recipientId || recipientId <= 0) {
			throw new Error('ID de notification invalide')
		}
		try {
			await apiClient.delete(`/${recipientId}`)
		} catch (error) {
			this.handleError(error)
		}
	}

	// Get unread count
	async getUnreadCount(): Promise<number> {
		try {
			const unread = await this.getMyUnreadNotifications()
			return unread.length
		} catch {
			return 0
		}
	}
}

export default new NotificationService()
