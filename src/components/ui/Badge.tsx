import React from 'react';
import { cn } from '../../utils';
import { colors } from '../../theme/tokens';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const variantStyles = {
    default: {
      backgroundColor: colors.gray[100],
      color: colors.gray[800],
    },
    success: {
      backgroundColor: colors.success[100],
      color: colors.success[800],
    },
    danger: {
      backgroundColor: colors.danger[100],
      color: colors.danger[800],
    },
    warning: {
      backgroundColor: colors.warning[100],
      color: colors.warning[800],
    },
    secondary: {
      backgroundColor: colors.primary[100],
      color: colors.primary[800],
    },
  };

  return (
    <span
      className={cn(
        baseClasses,
        sizeClasses[size],
        className
      )}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
};