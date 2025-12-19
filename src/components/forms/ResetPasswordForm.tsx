/**
 * ResetPasswordForm Component
 * Confirms password reset with new password
 */

import { useState } from 'react';
import { FormInput } from '../../common/FormInput';
import { useResetPassword } from '../../hooks/useResetPassword';

interface ResetPasswordFormProps {
  oobCode: string;
}

export const ResetPasswordForm = ({ oobCode }: ResetPasswordFormProps) => {
  const { isLoading, error, successMessage, resetPassword } = useResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Les mots de passe ne correspondent pas');
      return;
    }

    await resetPassword(oobCode, password);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {(error || localError) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs animate-fade-in" role="alert">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{localError || error}</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-xs animate-fade-in" role="status">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <FormInput
          id="newPassword"
        label="Nouveau mot de passe"
        type="password"
        value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        state="default"
        disabled={isLoading}
        enablePasswordToggle
      />

      <FormInput
          id="confirmPassword"
        label="Confirmez le mot de passe"
        type="password"
        value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        state="default"
        disabled={isLoading}
        enablePasswordToggle
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-6 py-3 rounded-md text-sm font-semibold transition-all ${
          isLoading
            ? 'bg-[#F38C79]/50 text-white cursor-not-allowed'
            : 'bg-[#F38C79] text-white hover:bg-[#E07A66] hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isLoading ? 'Réinitialisation...' : 'Mettre à jour le mot de passe'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
