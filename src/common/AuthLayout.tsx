import React, { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4 py-8 transition-colors duration-300">
      <div className="w-full max-w-[700px] bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl p-8 md:p-10 transition-all duration-300">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg">{subtitle}</p>
            )}
          </div>
        )}

        {/* Form Content */}
        {children}
      </div>
    </div>
  )
}
