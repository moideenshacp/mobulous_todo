import { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    disabled, 
    isLoading,
    ...props 
  }, ref) => {
    const buttonClasses = classNames(
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm': variant === 'primary',
          'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm': variant === 'danger', // <== updated here
          'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm': variant === 'success',
      
          'px-2.5 py-1.5 text-xs rounded': size === 'sm',
          'px-4 py-2 text-sm rounded-md': size === 'md',
          'px-6 py-3 text-base rounded-lg': size === 'lg',
        },
        className
      );
      
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';