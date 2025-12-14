import React from 'react';

// Badge Component Props
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'teal' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantClasses = {
  default: 'bg-sage text-teal-deep',
  success: 'bg-teal-medium text-white',
  warning: 'bg-peach text-teal-deep',
  danger: 'bg-coral-hover text-white',
  info: 'bg-teal-medium/20 text-teal-deep border border-teal-medium',
  teal: 'bg-teal-medium text-white',
  coral: 'bg-coral text-white',
};

const sizeClasses = {
  sm: 'px-micro-1 py-0.5 text-xs',
  md: 'px-micro-2 py-micro-1 text-sm',
  lg: 'px-micro-3 py-micro-2 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span
      className={`
        inline-flex items-center
        font-body font-bold
        rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// Status Badge Component (for specific statuses from backend)
export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const statusMap: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    // Candidature statuses
    'EN_ATTENTE': { variant: 'warning', label: 'En attente' },
    'ACCEPTEE': { variant: 'success', label: 'Acceptée' },
    'REFUSEE': { variant: 'danger', label: 'Refusée' },
    // User statuses
    'active': { variant: 'success', label: 'Actif' },
    'inactive': { variant: 'danger', label: 'Inactif' },
    'is_active': { variant: 'success', label: 'Actif' },
    'is_verified': { variant: 'success', label: 'Vérifié' },
    // Notification statuses
    'non_lu': { variant: 'info', label: 'Non lu' },
    'lu': { variant: 'default', label: 'Lu' },
    // Absence statuses
    'justifiee': { variant: 'success', label: 'Justifiée' },
    'non_justifiee': { variant: 'warning', label: 'Non justifiée' },
  };

  const statusConfig = statusMap[status.toUpperCase()] || { variant: 'default' as const, label: status };

  return (
    <Badge variant={statusConfig.variant} className={className}>
      {statusConfig.label}
    </Badge>
  );
};
