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
    return 'L\'adresse email est requise';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Veuillez entrer une adresse email valide';
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
    return 'Le nom complet est requis';
  }
  if (nom.trim().length < MIN_NOM_LENGTH) {
    return `Le nom doit contenir au moins ${MIN_NOM_LENGTH} caractères`;
  }
  if (nom.length > 100) {
    return 'Le nom ne doit pas dépasser 100 caractères';
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
    return 'Le mot de passe est requis';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`;
  }
  if (password.length > 128) {
    return 'Le mot de passe ne doit pas dépasser 128 caractères';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une lettre majuscule';
  }

  if (!/[a-z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une lettre minuscule';
  }

  if (!/\d/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre';
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
    return 'La confirmation du mot de passe est requise';
  }
  if (password !== confirmationPassword) {
    return 'Les mots de passe ne correspondent pas';
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
