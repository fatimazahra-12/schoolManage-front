/**
 * Form validation utilities
 * Provides reusable validation functions for signup and other forms
 */

import type { SignupFormData, FormErrors } from '../types/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NOM_LENGTH = 2;

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Error message or empty string if valid
 */
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

/**
 * Validate nom (name) field
 * @param nom - Name to validate
 * @returns Error message or empty string if valid
 */
export const validateNom = (nom: string): string => {
  if (!nom.trim()) {
    return 'Full name is required';
  }
  if (nom.trim().length < MIN_NOM_LENGTH) {
    return `Name must be at least ${MIN_NOM_LENGTH} characters`;
  }
  if (nom.length > 100) {
    return 'Name must not exceed 100 characters';
  }
  return '';
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Error message or empty string if valid
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (password.length > 128) {
    return 'Password must not exceed 128 characters';
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  return '';
};

/**
 * Validate password confirmation
 * @param password - Password
 * @param confirmationPassword - Password confirmation
 * @returns Error message or empty string if valid
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmationPassword: string
): string => {
  if (!confirmationPassword) {
    return 'Password confirmation is required';
  }
  if (password !== confirmationPassword) {
    return 'Passwords do not match';
  }
  return '';
};

/**
 * Validate entire signup form
 * @param formData - Form data to validate
 * @returns FormErrors object with field errors
 */
export const validateSignupForm = (formData: SignupFormData): FormErrors => {
  const errors: FormErrors = {};

  const nomError = validateNom(formData.nom);
  if (nomError) errors.nom = nomError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.motDePasse);
  if (passwordError) errors.motDePasse = passwordError;

  const confirmationError = validatePasswordConfirmation(
    formData.motDePasse,
    formData.confirmationMotDePasse
  );
  if (confirmationError) errors.confirmationMotDePasse = confirmationError;

  return errors;
};

/**
 * Check if form has errors
 * @param errors - FormErrors object
 * @returns True if there are any errors
 */
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined && error !== '');
};
