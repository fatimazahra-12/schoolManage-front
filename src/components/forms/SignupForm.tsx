/**
 * SignupForm Component
 * Reusable signup form with validation and error handling
 * Used on the Signup page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { SignupFormData, FormErrors } from '../../types/auth';
import { validateSignupForm, hasFormErrors } from '../../utils/validator';
import { signupUser, sendVerificationEmailTo } from '../../services/authservice';
import { FormInput } from '../../common/FormInput';

export interface SignupFormProps {
  onSignupSuccess?: (message: string) => void;
  onSignupError?: (error: string) => void;
}

export const SignupForm = ({ onSignupSuccess, onSignupError }: SignupFormProps) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<SignupFormData>({
    nom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: '',
  });

  // Errors state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string>('');
  const [signedUpEmail, setSignedUpEmail] = useState<string>('');

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear API error when user continues editing
    if (apiError) {
      setApiError('');
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');
    setIsLoading(true);

    // Validate form
    const validationErrors = validateSignupForm(formData);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Call signup service
      const response = await signupUser(formData);

      if (response.success) {
        // Success - verification email was sent
        const message = response.message || 'Signup successful!';
        onSignupSuccess?.(message);
        
        // Preserve email shown in success message before clearing form
        setSignedUpEmail(formData.email);

        // Reset form
        setFormData({
          nom: '',
          email: '',
          motDePasse: '',
          confirmationMotDePasse: '',
        });
        setErrors({});
        
        // Only set verification sent AFTER successful response
        setVerificationSent(true);
      } else {
        // Error from Firebase - email verification failed or signup failed
        const errorMessage = response.error || 'Échec de l\'inscription. Veuillez réessayer.';
        setApiError(errorMessage);
        onSignupError?.(errorMessage);
        setVerificationSent(false);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite';
      setApiError(errorMessage);
      onSignupError?.(errorMessage);
      setVerificationSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    verificationSent ? (
      <div className="w-full bg-[#E5EEE5] border border-[#034C53]/20 rounded-xl p-6 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <svg className="w-12 h-12 text-[#034C53]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold font-merriweather text-[#034C53] mb-3">Email de vérification envoyé !</h2>
        <p className="text-sm text-[#034C53] dark:text-white font-inter mb-2">
          Un email de vérification a été envoyé à <span className="font-semibold text-[#034C53] dark:text-white">{signedUpEmail}</span>.
        </p>
        <p className="text-xs text-[#034C53] dark:text-white font-inter">
          Veuillez vérifier votre boîte mail et cliquer sur le lien de vérification.
        </p>
        <p className="text-xs text-[#034C53]/70 dark:text-white/70 mt-2 italic">Si vous ne voyez pas l'email, vérifiez le dossier spam ou courrier indésirable.</p>
        
        {resendMessage && (
          <div className={`mt-3 p-2 rounded-md text-xs font-medium ${
            resendMessage.includes('succès') ? 'bg-[#E5EEE5] text-[#034C53]' : 'bg-[#FFC1B4]/30 text-[#F38C79]'
          }`}>
            {resendMessage}
          </div>
        )}
        
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2.5 rounded-md bg-[#F38C79] text-white text-sm font-semibold transition-all hover:bg-[#E07A66]"
          >
            Aller à la page Login
          </button>
          <button
            type="button"
            onClick={async () => {
              setResendLoading(true);
              setResendMessage('');
              const ok = await sendVerificationEmailTo();
              setResendLoading(false);
              setResendMessage(ok ? 'Email de vérification renvoyé avec succès.' : 'Échec de renvoi de l\'email. Assurez-vous d\'être connecté, puis réessayez.');
            }}
            disabled={resendLoading}
            className={`w-full px-4 py-2.5 rounded-md border-2 text-sm font-semibold transition-all ${
              resendLoading 
                ? 'border-[#007074]/40 text-[#007074]/40 cursor-not-allowed' 
                : 'border-[#007074] text-[#007074] hover:bg-[#007074] hover:text-white'
            }`}
            aria-busy={resendLoading}
          >
            {resendLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Renvoi en cours...
              </span>
            ) : (
              'Renvoyer l\'email de vérification'
            )}
          </button>
        </div>
      </div>
    ) : (
    <form onSubmit={handleSubmit} className="space-y-3.5 w-full">
      {/* API Error Alert */}
      {apiError && (
        <div
          className="p-3 bg-[#FFC1B4]/30 dark:bg-[#FFC1B4]/20 border border-[#F38C79] rounded-md text-[#F38C79] dark:text-[#E07A66] text-xs animate-fade-in"
          role="alert"
        >
          <div className="flex items-start">
            <svg
              className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{apiError}</span>
          </div>
        </div>
      )}

      {/* Nom Field */}
      <FormInput
        id="nom"
        label="Nom Complet"
        type="text"
        placeholder="Jean Dupont"
        value={formData.nom}
        onChange={(e) => handleInputChange({ target: { name: 'nom', value: e.target.value } } as any)}
        state={errors.nom ? 'error' : 'default'}
        message={errors.nom}
        disabled={isLoading}
      />

      {/* Email Field */}
      <FormInput
        id="email"
        label="Adresse Email"
        type="email"
        placeholder="votre.email@example.com"
        value={formData.email}
        onChange={(e) => handleInputChange({ target: { name: 'email', value: e.target.value } } as any)}
        state={errors.email ? 'error' : 'default'}
        message={errors.email}
        disabled={isLoading}
      />

      {/* Password Field */}
      <FormInput
        id="motDePasse"
        label="Mot de passe"
        type="password"
        placeholder="Entrez un mot de passe sécurisé"
        value={formData.motDePasse}
        onChange={(e) => handleInputChange({ target: { name: 'motDePasse', value: e.target.value } } as any)}
        state={errors.motDePasse ? 'error' : 'default'}
        message={errors.motDePasse}
        disabled={isLoading}
        enablePasswordToggle
      />

      {/* Password Confirmation Field */}
      <FormInput
        id="confirmationMotDePasse"
        label="Confirmer le mot de passe"
        type="password"
        placeholder="Confirmez votre mot de passe"
        value={formData.confirmationMotDePasse}
        onChange={(e) => handleInputChange({ target: { name: 'confirmationMotDePasse', value: e.target.value } } as any)}
        state={errors.confirmationMotDePasse ? 'error' : 'default'}
        message={errors.confirmationMotDePasse}
        disabled={isLoading}
        enablePasswordToggle
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-2.5 px-4 rounded-md font-inter font-semibold text-sm text-white
          transition-all duration-300 flex items-center justify-center gap-2
          ${
            isLoading
              ? 'bg-[#F38C79]/50 cursor-not-allowed'
              : 'bg-[#F38C79] hover:bg-[#E07A66] active:scale-95'
          }
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Creating account...</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-xs text-[#034C53] dark:text-white font-inter">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-[#007074] font-semibold hover:text-[#005F63] transition-colors"
        >
          Log in
        </a>
      </p>
    </form>
    )
  );
};
