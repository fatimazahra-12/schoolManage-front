import React from 'react';

// Card Component Props
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  hover?: boolean;
}

const paddingClasses = {
  none: '',
  sm: 'p-micro-2',
  md: 'p-micro-4',
  lg: 'p-macro-1',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  hover = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg
        ${paddingClasses[padding]}
        ${shadow ? 'shadow-md' : ''}
        ${hover ? 'transition-shadow duration-200 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Card Header Component
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`border-b-2 border-sage pb-micro-2 mb-micro-3 ${className}`}>
      {children}
    </div>
  );
};

// Card Title Component
export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <h3 className={`font-heading text-xl font-bold text-teal-deep ${className}`}>
      {children}
    </h3>
  );
};

// Card Body Component
export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

// Card Footer Component
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`border-t-2 border-sage pt-micro-2 mt-micro-3 flex items-center justify-end gap-micro-2 ${className}`}>
      {children}
    </div>
  );
};
