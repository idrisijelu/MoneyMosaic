import React, { forwardRef } from 'react';
import { useTheme } from '../../theme';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'outlined',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: theme.typography.fontSize.sm,
          padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
          height: '2.25rem',
        };
      case 'lg':
        return {
          fontSize: theme.typography.fontSize.lg,
          padding: `${theme.spacing[4]} ${theme.spacing[4]}`,
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

  const getVariantStyles = () => {
    if (variant === 'filled') {
      return {
        backgroundColor: theme.colors.background.secondary,
        border: `1px solid transparent`,
        borderBottomColor: error ? theme.colors.error : theme.colors.border.medium,
        borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
      };
    }
    
    return {
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${error ? theme.colors.error : theme.colors.border.light}`,
      borderRadius: theme.borderRadius.md,
    };
  };

  const inputStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    color: theme.colors.text.primary,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const focusStyles: React.CSSProperties = {
    borderColor: error ? theme.colors.error : theme.colors.primary[500],
    boxShadow: `0 0 0 3px ${error ? theme.colors.error : theme.colors.primary[500]}20`,
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-block',
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xs,
    color: error ? theme.colors.error : theme.colors.text.secondary,
    marginTop: theme.spacing[1],
    minHeight: '1rem',
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: theme.colors.text.tertiary,
  };

  const leftIconStyles: React.CSSProperties = {
    ...iconStyles,
    left: theme.spacing[3],
  };

  const rightIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: theme.spacing[3],
  };

  const inputWithIconsStyles = {
    ...inputStyles,
    paddingLeft: leftIcon ? theme.spacing[10] : inputStyles.padding?.toString().split(' ')[1] || theme.spacing[4],
    paddingRight: rightIcon ? theme.spacing[10] : inputStyles.padding?.toString().split(' ')[1] || theme.spacing[4],
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <div style={leftIconStyles}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          style={inputWithIconsStyles}
          className={`input ${className}`}
          disabled={disabled}
          onFocus={(e) => {
            Object.assign(e.target.style, focusStyles);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            Object.assign(e.target.style, getVariantStyles());
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && (
          <div style={rightIconStyles}>
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <div style={helperTextStyles}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});