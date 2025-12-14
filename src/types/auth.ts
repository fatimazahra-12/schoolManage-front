/**
 * Authentication types for the School Management System
 * Defines user data structures and Firebase-related types
 */

export interface SignupFormData {
  nom: string;
  email: string;
  motDePasse: string;
  confirmationMotDePasse: string;
}

export interface User {
  uid: string;
  nom: string;
  email: string;
  roleId?: string; // default: 'student'
  isVerified: boolean;
  isActive: boolean;
  createdAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

export interface ValidationError {
  field: keyof SignupFormData;
  message: string;
}

export interface FormErrors {
  nom?: string;
  email?: string;
  motDePasse?: string;
  confirmationMotDePasse?: string;
}

// Backend payload (for future API integration)
export interface UserCreatePayload {
  nom: string;
  email: string;
  // Password hash is handled by Firebase on the frontend
  roleId: string; // default: 'student' (use constants)
  isVerified: boolean;
  isActive: boolean;
  firebaseUid: string; // Link Firebase UID to backend user
}
