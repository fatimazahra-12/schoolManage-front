import React from 'react';

// Base Button Props Interface
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

// Button Size Classes
const sizeClasses = {
  sm: 'px-micro-3 py-micro-1 text-sm',
  md: 'px-micro-4 py-micro-2 text-base',
  lg: 'px-macro-1 py-micro-3 text-lg',
};

// Primary Button Component
export interface PrimaryButtonProps extends BaseButtonProps {
  variant?: 'primary';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-body font-bold
        rounded-lg
        bg-coral text-white
        hover:bg-coral-hover
        active:bg-coral-hover
        disabled:bg-sage disabled:text-teal-medium disabled:cursor-not-allowed
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-coral/30
        flex items-center justify-center gap-micro-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Secondary Button Component
export interface SecondaryButtonProps extends BaseButtonProps {
  variant?: 'secondary';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-body font-bold
        rounded-lg
        bg-white text-teal-deep
        border-2 border-teal-medium
        hover:bg-sage hover:border-teal-deep
        active:bg-sage
        disabled:bg-sage disabled:text-teal-medium disabled:border-sage disabled:cursor-not-allowed
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-deep/20
        flex items-center justify-center gap-micro-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Danger Button Component (for Delete actions)
export interface DangerButtonProps extends BaseButtonProps {
  variant?: 'danger';
}

export const DangerButton: React.FC<DangerButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-body font-bold
        rounded-lg
        bg-coral-hover text-white
        hover:bg-coral
        active:bg-coral-hover
        disabled:bg-sage disabled:text-teal-medium disabled:cursor-not-allowed
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-coral-hover/30
        flex items-center justify-center gap-micro-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span>Suppression...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Success Button Component (for Accept/Validate actions)
export interface SuccessButtonProps extends BaseButtonProps {
  variant?: 'success';
}

export const SuccessButton: React.FC<SuccessButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-body font-bold
        rounded-lg
        bg-teal-deep text-white
        hover:bg-teal-hover
        active:bg-teal-deep
        disabled:bg-sage disabled:text-teal-medium disabled:cursor-not-allowed
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-deep/30
        flex items-center justify-center gap-micro-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Warning Button Component (for Refuse/Reject actions)
export interface WarningButtonProps extends BaseButtonProps {
  variant?: 'warning';
}

export const WarningButton: React.FC<WarningButtonProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        font-body font-bold
        rounded-lg
        bg-peach text-teal-deep
        hover:bg-coral hover:text-white
        active:bg-coral-hover active:text-white
        disabled:bg-sage disabled:text-teal-medium disabled:cursor-not-allowed
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-peach/30
        flex items-center justify-center gap-micro-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Icon Button Component
export interface IconButtonProps extends Omit<BaseButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  loading = false,
  disabled,
  className = '',
  size = 'md',
  variant = 'ghost',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-coral text-white hover:bg-coral-hover',
    secondary: 'bg-white text-teal-deep border-2 border-teal-medium hover:bg-sage',
    danger: 'bg-coral-hover text-white hover:bg-coral',
    success: 'bg-teal-deep text-white hover:bg-teal-hover',
    warning: 'bg-peach text-teal-deep hover:bg-coral hover:text-white',
    ghost: 'bg-transparent text-teal-deep hover:bg-sage',
  };

  const sizeIconClasses = {
    sm: 'p-micro-1',
    md: 'p-micro-2',
    lg: 'p-micro-3',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeIconClasses[size]}
        ${variantClasses[variant]}
        rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-teal-deep/20
        flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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
      ) : (
        icon
      )}
    </button>
  );
};

// Link Button Component (for navigation)
export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'text',
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'text-coral hover:text-coral-hover font-bold',
    secondary: 'text-teal-deep hover:text-teal-medium font-bold',
    text: 'text-teal-deep hover:text-teal-medium underline',
  };

  return (
    <a
      className={`
        font-body
        transition-colors duration-200
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};

// Export all button components
export type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | DangerButtonProps | SuccessButtonProps | WarningButtonProps;
