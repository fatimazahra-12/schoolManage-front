/**
 * useSignup Hook
 * Custom hook for managing signup state and logic
 * Can be used for advanced signup scenarios (multi-step, etc.)
 */

import { useState, useCallback } from 'react';
import type { SignupFormData, User, FormErrors } from '../types/auth';
import { signupUser } from '../services/authservice';

export interface UseSignupReturn {
  formData: SignupFormData;
  errors: FormErrors;
  isLoading: boolean;
  error: string;
  user: User | null;
  isVerificationSent: boolean;
  updateFormData: (data: Partial<SignupFormData>) => void;
  setErrors: (errors: FormErrors) => void;
  handleSignup: () => Promise<void>;
  resetForm: () => void;
}

const initialFormData: SignupFormData = {
  nom: '',
  email: '',
  motDePasse: '',
  confirmationMotDePasse: '',
};

/**
 * Hook for managing signup form state
 */
export const useSignup = (): UseSignupReturn => {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const updateFormData = useCallback((data: Partial<SignupFormData>) => {
    setFormData((prev: SignupFormData) => ({
      ...prev,
      ...data,
    }));
  }, []);

  const handleSignup = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await signupUser(formData);

      if (response.success && response.user) {
        setUser(response.user);
        // If signup succeeded, mark verification as sent. The service attempts sending and may include a message.
        setIsVerificationSent(true);
        resetForm();
      } else {
        setError(response.error || 'Signup failed');
        setIsVerificationSent(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsVerificationSent(false);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

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
    isVerificationSent,
    updateFormData,
    setErrors,
    handleSignup,
    resetForm,
  };
};
