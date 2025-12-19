/**
 * LoginForm Component
 * UI for login with email verification handling
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormInput } from '../../common/FormInput';
import { useLogin } from '../../hooks/useLogin';

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    isLoading,
    error,
    isEmailVerified,
    updateFormData,
    setErrors,
    handleLogin,
    resendVerification,
  } = useLogin(navigate);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setResendMessage('');
    await handleLogin();
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    const ok = await resendVerification();
    setResendLoading(false);
    setResendMessage(
      ok
        ? 'Email de vérification renvoyé. Vérifiez vos spams.'
        : 'Échec de renvoi. Réessayez plus tard.'
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-[#FFC1B4]/30 dark:bg-[#FFC1B4]/20 border border-[#F38C79] rounded-md text-[#F38C79] dark:text-[#E07A66] text-xs" role="alert">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!isEmailVerified && (
        <div className="p-4 bg-[#FFC1B4]/20 dark:bg-[#FFC1B4]/10 border border-[#F38C79] rounded-md">
          <h3 className="text-sm font-semibold text-[#F38C79] dark:text-[#E07A66] mb-1">Email non vérifié</h3>
          <p className="text-xs text-[#034C53] dark:text-white">
            Vérifiez votre boîte mail pour le lien de vérification. Vous pouvez également renvoyer le lien ci-dessous.
          </p>
          {resendMessage && (
            <p className={`mt-2 text-xs font-medium ${resendMessage.includes('Échec') ? 'text-[#F38C79] dark:text-[#E07A66]' : 'text-[#034C53] dark:text-white'}`}>
              {resendMessage}
            </p>
          )}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className={`mt-3 w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
              resendLoading
                ? 'bg-[#F38C79]/60 text-white cursor-not-allowed'
                : 'bg-[#F38C79] text-white hover:bg-[#E07A66]'
            }`}
          >
            {resendLoading ? 'Renvoi en cours...' : 'Renvoyer l\'email de vérification'}
          </button>
        </div>
      )}

      <FormInput
        id="email"
        label="Adresse email"
        type="email"
        placeholder="votre.email@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        state={errors.email ? 'error' : 'default'}
        message={errors.email}
        disabled={isLoading}
      />

      <FormInput
        id="motDePasse"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        value={formData.motDePasse}
        onChange={(e) => updateFormData({ motDePasse: e.target.value })}
        state={errors.motDePasse ? 'error' : 'default'}
        message={errors.motDePasse}
        disabled={isLoading}
        enablePasswordToggle
      />

      <div className="flex justify-between items-center text-xs font-medium">
        <a href="/forgot-password" className="text-[#007074] dark:text-[#007074] hover:underline">Mot de passe oublié ?</a>
        <a href="/signup" className="text-[#007074] dark:text-[#007074] hover:underline">Créer un compte</a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-6 py-3 rounded-md text-sm font-semibold transition-all ${
          isLoading
            ? 'bg-[#F38C79]/60 text-white cursor-not-allowed'
            : 'bg-[#F38C79] text-white hover:bg-[#E07A66]'
        }`}
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </button>
    </form>
  );
};

export default LoginForm;
