import React from 'react';

// Loading Spinner Component
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'teal' | 'coral' | 'white';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const colorClasses = {
  teal: 'text-teal-deep',
  coral: 'text-coral',
  white: 'text-white',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  color = 'teal',
}) => {
  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
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
  );
};

// Loading Overlay Component
export interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Chargement...',
  className = '',
}) => {
  return (
    <div
      className={`
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
        ${className}
      `}
    >
      <div className="bg-white rounded-lg p-macro-1 flex flex-col items-center gap-micro-3">
        <LoadingSpinner size="lg" color="teal" />
        {message && (
          <p className="font-body text-teal-deep font-bold">{message}</p>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader Component (for content placeholders)
export interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  rounded = true,
}) => {
  return (
    <div
      className={`
        bg-sage animate-pulse
        ${rounded ? 'rounded' : ''}
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

// Skeleton Card Component
export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-micro-4 shadow-md">
      <Skeleton width="60%" height="1.5rem" className="mb-micro-2" />
      <Skeleton width="100%" height="1rem" className="mb-micro-1" />
      <Skeleton width="80%" height="1rem" />
    </div>
  );
};
