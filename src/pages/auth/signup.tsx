/**
 * Signup Page
 * Main signup page component for the School Management System
 */

import { useState } from 'react';
import { SignupForm } from '../../components/forms/SignupForm';
import { AuthLayoutFull } from '../../common/AuthLayoutFull';

export const Signup = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  return (
    <AuthLayoutFull title="Inscription" subtitle="Rejoignez notre plateforme de gestion scolaire">
      {/* Success Message */}
      {successMessage && (
        <div
          className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md text-green-700 dark:text-green-400 text-xs"
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>{successMessage}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <SignupForm
        onSignupSuccess={(message) => {
          setSuccessMessage(message);
        }}
        onSignupError={() => {
          setSuccessMessage('');
        }}
      />

      {/* Footer Text */}
      <p className="text-center text-xs text-gray-600 dark:text-slate-400 mt-6">
        En vous inscrivant, vous acceptez nos{' '}
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          Conditions d'utilisation
        </a>{' '}
        et notre{' '}
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          Politique de confidentialité
        </a>
      </p>
    </AuthLayoutFull>
  );
};

export default Signup;
