import React, { type ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

interface AuthLayoutFullProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export const AuthLayoutFull: React.FC<AuthLayoutFullProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-white dark:bg-[#0f2f33]">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content - Centered Card */}
      <div className="w-full max-w-[720px] px-4 sm:px-8 py-10 relative z-10">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h1 className="text-4xl font-bold text-[#034C53] dark:text-white mb-2 font-merriweather">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-[#034C53] dark:text-white text-base font-inter">{subtitle}</p>
            )}
          </div>
        )}

        {/* Card Container */}
        <div className="bg-[#E5EEE5] dark:bg-[#1b3f45] rounded-lg p-8">
          {children}
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-[#034C53] dark:text-white mt-6">
          © 2025 SmartCampus. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
