/**
 * Signup Page
 * Main signup page component for the School Management System
 * Displays signup form in a modern, elegant card layout
 */

import { useState } from 'react';
import { SignupForm } from '../../components/forms/SignupForm';

export const Signup = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#E5EEE5] via-white to-[#E5E0D0] pt-20">
      {/* Decorative elements - Left only */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#034C53] rounded-full opacity-5 -ml-32 -mb-32"></div>

      {/* Main container - Perfectly Centered */}
      <div className="relative z-10 w-full px-4" style={{ maxWidth: '700px' }}>
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#034C53] mb-2 font-merriweather">
            Welcome
          </h1>
          <p className="text-gray-600 font-inter text-sm">
            Join our school management platform
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20">
          {/* Success Message */}
          {successMessage && (
            <div
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-xs animate-fade-in"
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
                <div>
                  <p className="font-semibold mb-1">Success!</p>
                  <p>{successMessage}</p>
                </div>
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
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-500 mt-6 font-inter">
          By signing up, you agree to our{' '}
          <a href="#" className="text-[#034C53] hover:text-[#005F63] font-semibold">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#034C53] hover:text-[#005F63] font-semibold">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
