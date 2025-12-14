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
import { TextInput, PasswordInput } from '../../common/Inputs';

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
        // Success callback
        const message = response.message || 'Signup successful!';
        onSignupSuccess?.(message);
        setVerificationSent(true);

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

        // Do not redirect aggressively; show confirmation UI
      } else {
        // Error from Firebase
        const errorMessage = response.error || 'Signup failed. Please try again.';
        setApiError(errorMessage);
        onSignupError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setApiError(errorMessage);
      onSignupError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    verificationSent ? (
      <div className="w-full bg-[#E5EEE5] border border-white/30 rounded-xl p-6 text-center animate-fade-in">
        <div className="flex justify-center mb-3">
          <svg className="w-10 h-10 text-[#034C53]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-merriweather text-[#034C53] mb-2">Vérification requise</h2>
        <p className="text-sm text-gray-700 font-inter">
          Un email de vérification a été envoyé à <span className="font-semibold">{signedUpEmail || formData.email || 'votre adresse'}</span>. Veuillez vérifier votre boîte mail avant de vous connecter.
        </p>
        <p className="text-xs text-gray-500 mt-2">Si vous ne voyez pas l'email, vérifiez le dossier spam.</p>
        {resendMessage && (
          <p className="text-xs mt-2 text-[#005F63]">{resendMessage}</p>
        )}
        <div className="mt-4 flex items-center justify-center gap-3">
          <a href="/login" className="inline-block px-4 py-2.5 rounded-md bg-[#F38C79] text-white text-sm font-semibold hover:bg-[#E07A66]">Aller à la connexion</a>
          <button
            type="button"
            onClick={async () => {
              setResendLoading(true);
              setResendMessage('');
              const ok = await sendVerificationEmailTo();
              setResendLoading(false);
              setResendMessage(ok ? 'Email de vérification renvoyé avec succès.' : 'Échec de renvoi de l\'email. Assurez-vous d\'être connecté, puis réessayez.');
            }}
            className={`inline-block px-4 py-2.5 rounded-md border text-sm font-semibold transition-colors ${resendLoading ? 'border-[#007074]/40 text-[#007074]/40 cursor-not-allowed' : 'border-[#007074] text-[#007074] hover:bg-[#007074] hover:text-white'}`}
            disabled={resendLoading}
            aria-busy={resendLoading}
          >
            {resendLoading ? 'Renvoi…' : 'Renvoyer l\'email'}
          </button>
        </div>
      </div>
    ) : (
    <form onSubmit={handleSubmit} className="space-y-3.5 w-full">
      {/* API Error Alert */}
      {apiError && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs animate-fade-in"
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
      <TextInput
        id="nom"
        name="nom"
        type="text"
        label="Full Name"
        placeholder="John Doe"
        value={formData.nom}
        onChange={handleInputChange}
        error={errors.nom}
        required
        disabled={isLoading}
        autoComplete="name"
      />

      {/* Email Field */}
      <TextInput
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        disabled={isLoading}
        autoComplete="email"
      />

      {/* Password Field */}
      <PasswordInput
        id="motDePasse"
        name="motDePasse"
        label="Password"
        placeholder="Enter a strong password"
        value={formData.motDePasse}
        onChange={handleInputChange}
        error={errors.motDePasse}
        required
        disabled={isLoading}
        autoComplete="new-password"
        helperText="At least 8 characters, with uppercase, lowercase, and number"
      />

      {/* Password Confirmation Field */}
      <PasswordInput
        id="confirmationMotDePasse"
        name="confirmationMotDePasse"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmationMotDePasse}
        onChange={handleInputChange}
        error={errors.confirmationMotDePasse}
        required
        disabled={isLoading}
        autoComplete="new-password"
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
      <p className="text-center text-xs text-gray-600 font-inter">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-[#034C53] font-semibold hover:text-[#005F63] transition-colors"
        >
          Log in
        </a>
      </p>
    </form>
    )
  );
};
