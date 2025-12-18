export interface Notification {
	id: number
	user_id: number
	titre: string
	message: string
	type: 'grade' | 'exam' | 'absence' | 'general' | 'homework' | 'event'
	channels: ('in_app' | 'email' | 'sms')[]
	is_read: boolean
	read_at?: string
	metadata?: any
	created_at: string
	updated_at: string
}
