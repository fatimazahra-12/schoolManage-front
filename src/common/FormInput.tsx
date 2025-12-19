import React, { type ChangeEvent, useState } from 'react'

interface FormInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  state?: 'default' | 'success' | 'error'
  message?: string
  disabled?: boolean
  autoComplete?: string
  enablePasswordToggle?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  state = 'default',
  message,
  disabled = false,
  autoComplete,
  enablePasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const resolvedType = enablePasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type
  // Classes dynamiques selon l'état
  const getInputClasses = (): string => {
    const baseClasses =
      'block w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 transition-all duration-200'

    const stateClasses = {
      default:
        'bg-white dark:bg-[#1b3f45] border border-[#007074] text-[#034C53] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#007074] focus:border-[#007074]',
      success:
        'bg-white dark:bg-[#1b3f45] border border-[#007074] text-[#034C53] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#007074] focus:border-[#007074]',
      error:
        'bg-white dark:bg-[#1b3f45] border border-[#F38C79] text-[#034C53] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-[#F38C79] focus:border-[#F38C79]',
    }

    return `${baseClasses} ${stateClasses[state]}`
  }

  const getMessageClasses = (): string => {
    const baseClasses = 'mt-2 text-sm font-medium text-left'

    const stateClasses = {
      success: 'text-[#034C53] dark:text-white',
      error: 'text-[#F38C79] dark:text-[#E07A66]',
      default: 'text-[#034C53] dark:text-white',
    }

    return `${baseClasses} ${stateClasses[state]}`
  }

  const getLabelClasses = (): string => {
    const baseClasses = 'block text-left mb-2 text-sm font-medium'
    const stateClasses = {
      success: 'text-[#034C53] dark:text-white',
      error: 'text-[#F38C79] dark:text-[#E07A66]',
      default: 'text-[#034C53] dark:text-white',
    }

    return `${baseClasses} ${stateClasses[state]}`
  }

  return (
    <div className="mb-6">
      <label htmlFor={id} className={getLabelClasses()}>
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${getInputClasses()} ${enablePasswordToggle ? 'pr-12' : ''}`}
        />

        {enablePasswordToggle && type === 'password' && (
          <button
            type="button"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-[#007074] hover:text-[#005F63] dark:text-white"
            tabIndex={0}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.244 18 12 18c1.76 0 3.318-.3 4.67-.82M9.88 9.88a3 3 0 104.243 4.243" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.228 6.228l11.544 11.544" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.683.07.207.07.431 0 .639C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {message && <p className={getMessageClasses()}>{message}</p>}
    </div>
  )
}
