import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 hover:-translate-y-0.5';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 focus:ring-primary',
        secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-lg shadow-secondary/30 focus:ring-secondary',
        outline: 'border-2 border-primary text-primary hover:bg-primary-light/10 focus:ring-primary',
        ghost: 'text-gray-600 hover:text-primary hover:bg-gray-100 focus:ring-gray-200',
        white: 'bg-white text-primary hover:bg-gray-50 shadow-md focus:ring-white'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-bold',
    };

    return (
        <button
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
