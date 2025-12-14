import React from 'react';

// Alert Component Props
export interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  onClose?: () => void;
  className?: string;
}

const variantClasses = {
  success: 'bg-teal-medium/10 border-teal-medium text-teal-deep',
  error: 'bg-coral/10 border-coral text-coral-hover',
  warning: 'bg-peach/30 border-peach text-teal-deep',
  info: 'bg-teal-medium/10 border-teal-medium text-teal-deep',
};

const iconMap = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onClose,
  className = '',
}) => {
  return (
    <div
      className={`
        border-2 rounded-lg p-micro-3
        ${variantClasses[variant]}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-micro-2">
        <span className="text-xl flex-shrink-0">{iconMap[variant]}</span>
        <div className="flex-1">
          {title && (
            <h4 className="font-body font-bold mb-micro-1">{title}</h4>
          )}
          <div className="font-body text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 text-current hover:opacity-70 transition-opacity"
            aria-label="Fermer"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// Toast/Notification Alert (for temporary messages)
export interface ToastProps {
  message: string;
  variant?: AlertProps['variant'];
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="fixed top-micro-4 right-micro-4 z-50 animate-slide-in">
      <Alert variant={variant} onClose={onClose}>
        {message}
      </Alert>
    </div>
  );
};
