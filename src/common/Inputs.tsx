import React from 'react';

// Base Input Props Interface
export interface BaseInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

// Text Input Component
export interface TextInputProps extends BaseInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Email Input Component
export interface EmailInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  placeholder = 'exemple@email.com',
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <input
        type="email"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Password Input Component
export interface PasswordInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  placeholder = '••••••••',
  value,
  onChange,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full px-micro-3 py-micro-2 pr-10
            border-2 rounded-lg
            font-body text-base
            transition-all duration-200
            ${error 
              ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
              : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
            }
            ${disabled 
              ? 'bg-sage text-teal-medium cursor-not-allowed' 
              : 'bg-white text-teal-deep'
            }
            focus:outline-none
          `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-micro-2 top-1/2 -translate-y-1/2 text-teal-medium hover:text-teal-deep transition-colors"
            disabled={disabled}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Number Input Component
export interface NumberInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  placeholder,
  value,
  onChange,
  min,
  max,
  step,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <input
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Date Input Component
export interface DateInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// DateTime Input Component
export interface DateTimeInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <input
        type="datetime-local"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Select/Dropdown Component
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps extends BaseInputProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  value,
  onChange,
  options,
  placeholder,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
          appearance-none
          bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23034C53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E')] 
          bg-no-repeat bg-right-micro-2 bg-[length:20px]
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Textarea Component
export interface TextareaInputProps extends BaseInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  placeholder,
  value,
  onChange,
  rows = 4,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      {label && (
        <label className="text-sm font-body font-bold text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={`
          px-micro-3 py-micro-2 
          border-2 rounded-lg
          font-body text-base
          transition-all duration-200
          resize-y
          ${error 
            ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
            : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
          }
          ${disabled 
            ? 'bg-sage text-teal-medium cursor-not-allowed' 
            : 'bg-white text-teal-deep'
          }
          focus:outline-none
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};

// Checkbox Component
export interface CheckboxInputProps extends Omit<BaseInputProps, 'placeholder'>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  error,
  required,
  disabled,
  className = '',
  checked,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      <label className="flex items-center gap-micro-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-5 h-5
            rounded
            border-2
            transition-all duration-200
            ${error 
              ? 'border-coral checked:bg-coral checked:border-coral' 
              : 'border-teal-medium checked:bg-teal-deep checked:border-teal-deep'
            }
            ${disabled 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer'
            }
            focus:outline-none focus:ring-2 focus:ring-teal-deep/20
          `}
          {...props}
        />
        <span className="text-sm font-body text-teal-deep">
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </span>
      </label>
      {error && (
        <span className="text-sm text-coral font-body ml-7">{error}</span>
      )}
    </div>
  );
};

// Search Input Component
export interface SearchInputProps extends Omit<BaseInputProps, 'label'>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  error,
  disabled,
  className = '',
  placeholder = 'Rechercher...',
  value,
  onChange,
  onSearch,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-micro-1 ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearch) {
              onSearch();
            }
          }}
          className={`
            w-full px-micro-3 py-micro-2 pr-10
            border-2 rounded-lg
            font-body text-base
            transition-all duration-200
            ${error 
              ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/20' 
              : 'border-teal-medium focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20'
            }
            ${disabled 
              ? 'bg-sage text-teal-medium cursor-not-allowed' 
              : 'bg-white text-teal-deep'
            }
            focus:outline-none
          `}
          {...props}
        />
        <button
          type="button"
          onClick={onSearch}
          disabled={disabled}
          className="absolute right-micro-2 top-1/2 -translate-y-1/2 text-teal-medium hover:text-teal-deep transition-colors disabled:opacity-50"
        >
          🔍
        </button>
      </div>
      {error && (
        <span className="text-sm text-coral font-body">{error}</span>
      )}
    </div>
  );
};
