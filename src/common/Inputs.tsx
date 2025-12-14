/**
 * Reusable Input Components
 * Provides consistent, accessible input fields for forms
 * Styled with Tailwind CSS following the design system
 */

import type { InputHTMLAttributes, ReactNode } from 'react';
import * as React from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  required?: boolean;
}

/**
 * TextInput Component
 * Reusable text input with label, error display, and optional icon
 */
export const TextInput = ({
  label,
  error,
  helperText,
  icon,
  required = false,
  className = '',
  disabled = false,
  ...props
}: TextInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-xs font-semibold text-[#034C53] mb-1.5"
        >
          {label}
          {required && <span className="text-[#F38C79] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#007074] text-sm">
            {icon}
          </div>
        )}

        <input
          {...props}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-md border-2 transition-all
            font-inter text-sm text-gray-900
            ${icon ? 'pl-9' : ''}
            ${
              error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-[#034C53] focus:ring-2 focus:ring-[#007074]/20'
            }
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
            placeholder:text-gray-400
            ${className}
          `}
        />
      </div>

      {error && <p className="mt-0.5 text-xs font-medium text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-0.5 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

interface PasswordInputProps extends Omit<TextInputProps, 'type'> {
  showPasswordToggle?: boolean;
}

/**
 * PasswordInput Component
 * Specialized input for passwords with optional show/hide toggle
 */
export const PasswordInput = ({
  showPasswordToggle = true,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="w-full">
      {props.label && (
        <label
          htmlFor={props.id}
          className="block text-xs font-semibold text-[#034C53] mb-1.5"
        >
          {props.label}
          {props.required && <span className="text-[#F38C79] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          disabled={props.disabled}
          className={`
            w-full px-3 py-2 pr-9 rounded-md border-2 transition-all
            font-inter text-sm text-gray-900
            ${
              props.error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-[#034C53] focus:ring-2 focus:ring-[#007074]/20'
            }
            ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
            placeholder:text-gray-400
            ${props.className}
          `}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#007074] hover:text-[#034C53] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {props.error && <p className="mt-1 text-sm font-medium text-red-600">{props.error}</p>}
      {props.helperText && !props.error && (
        <p className="mt-1 text-xs text-gray-600">{props.helperText}</p>
      )}
    </div>
  );
};
