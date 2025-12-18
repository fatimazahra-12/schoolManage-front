export type NotificationUserType =
	| 'etudiant'
	| 'parent'
	| 'enseignant'
	| 'adminsysteme'
	| 'adminpedagogique'
	| 'admincontenue'

interface JwtPayload {
	role?: string
	roles?: string[]
	exp?: number
	iat?: number
}

// Validate token format
const isValidTokenFormat = (token: string): boolean => {
	const parts = token.split('.')
	return parts.length === 3 && parts.every((part) => part.length > 0)
}

// Check if token is expired
const isTokenExpired = (payload: JwtPayload): boolean => {
	if (!payload.exp) return false
	const now = Math.floor(Date.now() / 1000)
	return payload.exp < now
}

// Decode JWT payload safely; returns null on failure.
const decodeJwtPayload = (token: string): JwtPayload | null => {
	if (!token || typeof token !== 'string') return null
	if (!isValidTokenFormat(token)) return null

	try {
		const parts = token.split('.')
		const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		)
		const payload: JwtPayload = JSON.parse(jsonPayload)
		
		// Check if token is expired
		if (isTokenExpired(payload)) {
			localStorage.removeItem('token')
			return null
		}
		
		return payload
	} catch (e) {
		// Don't log sensitive error details in production
		if (import.meta.env.DEV) {
			console.error('Failed to decode JWT payload', e)
		}
		return null
	}
}

// Sanitize role string to prevent injection
const sanitizeRole = (role: string): string => {
	return role.toLowerCase().trim().replace(/[^a-z]/g, '')
}

// Get the current user role from the JWT stored in localStorage under 'token'.
export const getUserRoleFromToken = (): string | null => {
	if (typeof window === 'undefined') return null
	
	try {
		const token = localStorage.getItem('token')
		if (!token) return null
		
		const payload = decodeJwtPayload(token)
		if (!payload) return null
		
		if (payload.role && typeof payload.role === 'string') {
			return sanitizeRole(payload.role)
		}
		
		if (Array.isArray(payload.roles) && payload.roles.length > 0) {
			const firstRole = payload.roles[0]
			if (typeof firstRole === 'string') {
				return sanitizeRole(firstRole)
			}
		}
		
		return null
	} catch (e) {
		if (import.meta.env.DEV) {
			console.error('Error getting user role', e)
		}
		return null
	}
}

// Map backend role strings to NotificationList userType union.
export const mapRoleToUserType = (role: string | null): NotificationUserType => {
	switch (role) {
		case 'etudiant':
		case 'parent':
		case 'enseignant':
		case 'adminsysteme':
		case 'adminpedagogique':
		case 'admincontenue':
			return role
		default:
			return 'etudiant'
	}
}
