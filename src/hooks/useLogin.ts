/**
 * useLogin Hook
 * Custom hook for managing login state and logic
 */

import { useState, useCallback } from 'react';
import type { NavigateFunction } from 'react-router';
import type { LoginFormData, User, FormErrors } from '../types/auth';
import { loginUser, sendVerificationEmailTo } from '../services/authservice';
import { validateEmail } from '../utils/validator';

export interface UseLoginReturn {
  formData: LoginFormData;
  errors: FormErrors;
  isLoading: boolean;
  error: string;
  user: User | null;
  isEmailVerified: boolean;
  updateFormData: (data: Partial<LoginFormData>) => void;
  setErrors: (errors: FormErrors) => void;
  handleLogin: () => Promise<void>;
  resendVerification: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: LoginFormData = {
  email: '',
  motDePasse: '',
};

/**
 * Hook for managing login form state
 */
export const useLogin = (navigate?: NavigateFunction): UseLoginReturn => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const updateFormData = useCallback((data: Partial<LoginFormData>) => {
    setFormData((prev: LoginFormData) => ({
      ...prev,
      ...data,
    }));
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setIsEmailVerified(true);

    const nextErrors: FormErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) nextErrors.email = emailError;
    if (!formData.motDePasse) nextErrors.motDePasse = 'Le mot de passe est requis';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData.email, formData.motDePasse);

      if (response.success && response.user) {
        if (!response.user.isVerified) {
          setUser(response.user);
          setIsEmailVerified(false);
          setError('Votre email n\'est pas vérifié. Vérifiez votre boîte mail ou renvoyez le lien.');
          setIsLoading(false);
          return;
        }

        setUser(response.user);
        resetForm();
        
        if (navigate) {
          navigate('/dashboard');
        }
      } else {
        setError(response.error || 'Connexion impossible');
        if (response.user && !response.user.isVerified) {
          setIsEmailVerified(false);
          setUser(response.user);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      console.error(' [Login] Exception:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  const resendVerification = useCallback(async (): Promise<boolean> => {
    try {
      const success = await sendVerificationEmailTo();
      return success;
    } catch (err) {
      console.error('Resend verification error:', err);
      return false;
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setError('');
  }, []);

  return {
    formData,
    errors,
    isLoading,
    error,
    user,
    isEmailVerified,
    updateFormData,
    setErrors,
    handleLogin,
    resendVerification,
    resetForm,
  };
};
