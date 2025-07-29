import React from 'react';
import { useTheme } from '../../theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.gray[100],
          color: theme.colors.gray[700],
          border: `1px solid ${theme.colors.gray[200]}`,
          hoverBg: theme.colors.gray[200],
          hoverColor: theme.colors.gray[800],
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary[600],
          border: `1px solid ${theme.colors.primary[600]}`,
          hoverBg: theme.colors.primary[50],
          hoverColor: theme.colors.primary[700],
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary[600],
          border: '1px solid transparent',
          hoverBg: theme.colors.primary[50],
          hoverColor: theme.colors.primary[700],
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.error,
          color: theme.colors.text.inverse,
          border: `1px solid ${theme.colors.error}`,
          hoverBg: '#dc2626',
          hoverColor: theme.colors.text.inverse,
        };
      default:
        return {
          backgroundColor: theme.colors.primary[600],
          color: theme.colors.text.inverse,
          border: `1px solid ${theme.colors.primary[600]}`,
          hoverBg: theme.colors.primary[700],
          hoverColor: theme.colors.text.inverse,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: theme.typography.fontSize.sm,
          padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
          height: '2rem',
        };
      case 'lg':
        return {
          fontSize: theme.typography.fontSize.lg,
          padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
          height: '3rem',
        };
      default:
        return {
          fontSize: theme.typography.fontSize.base,
          padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
          height: '2.5rem',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.2s ease',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: variantStyles.backgroundColor,
    color: variantStyles.color,
    border: variantStyles.border,
    ...sizeStyles,
  };

  const hoverStyles = {
    backgroundColor: variantStyles.hoverBg,
    color: variantStyles.hoverColor,
  };

  const LoadingSpinner = () => (
    <div
      style={{
        width: '1rem',
        height: '1rem',
        border: '2px solid transparent',
        borderTop: '2px solid currentColor',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <button
        className={`button ${className}`}
        style={baseStyles}
        disabled={disabled || loading}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, {
              backgroundColor: variantStyles.backgroundColor,
              color: variantStyles.color,
            });
          }
        }}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
          </>
        )}
      </button>
    </>
  );
};