/**
 * useResetPassword Hook
 * Manages forgot-password (send email) and reset-password (confirm code) flows
 */

import { useCallback, useState } from 'react';
import { sendPasswordResetTo, verifyResetCode, confirmResetPassword } from '../services/authservice';
import { validateEmail, validatePassword } from '../utils/validator';

export interface UseResetPasswordReturn {
  isLoading: boolean;
  error: string;
  successMessage: string;
  emailForReset: string;
  sendEmail: (email: string) => Promise<void>;
  verifyCode: (oobCode: string) => Promise<string | null>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
}

export const useResetPassword = (): UseResetPasswordReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailForReset, setEmailForReset] = useState('');

  const sendEmail = useCallback(async (email: string) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setIsLoading(false);
      return;
    }

    const response = await sendPasswordResetTo(email);
    if (response.success) {
      setSuccessMessage(response.message || 'Un email de réinitialisation a été envoyé.');
      setEmailForReset(email);
    } else {
      setError(response.error || 'Impossible d\'envoyer l\'email.');
    }

    setIsLoading(false);
  }, []);

  const verifyCode = useCallback(async (oobCode: string): Promise<string | null> => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const response = await verifyResetCode(oobCode);
    setIsLoading(false);

    if (response.success && response.message) {
      setEmailForReset(response.message);
      return response.message;
    }

    setError(response.error || 'Lien invalide ou expiré');
    return null;
  }, []);

  const resetPassword = useCallback(async (oobCode: string, newPassword: string) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    const response = await confirmResetPassword(oobCode, newPassword);
    setIsLoading(false);

    if (response.success) {
      setSuccessMessage(response.message || 'Mot de passe réinitialisé avec succès.');
    } else {
      setError(response.error || 'Échec de la réinitialisation.');
    }
  }, []);

  return {
    isLoading,
    error,
    successMessage,
    emailForReset,
    sendEmail,
    verifyCode,
    resetPassword,
  };
};
