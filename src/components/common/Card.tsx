import React from 'react';
import { useTheme } from '../../theme';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  style = {},
  variant = 'default',
  padding = 'md',
  onClick,
  hoverable = false,
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.colors.background.primary,
          border: `1px solid ${theme.colors.border.light}`,
          boxShadow: 'none',
        };
      case 'elevated':
        return {
          backgroundColor: theme.colors.background.primary,
          border: 'none',
          boxShadow: theme.shadows.lg,
        };
      default:
        return {
          backgroundColor: theme.colors.background.primary,
          border: `1px solid ${theme.colors.border.light}`,
          boxShadow: theme.shadows.sm,
        };
    }
  };

  const getPaddingValue = () => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return theme.spacing[3];
      case 'lg':
        return theme.spacing[8];
      default:
        return theme.spacing[6];
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: theme.borderRadius.lg,
    padding: getPaddingValue(),
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...getVariantStyles(),
    ...style,
  };

  const hoverStyles: React.CSSProperties = (hoverable || onClick) ? {
    transform: 'translateY(-1px)',
    boxShadow: variant === 'elevated' ? theme.shadows.xl : theme.shadows.md,
  } : {};

  return (
    <div
      className={`card ${className}`}
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, baseStyles);
        }
      }}
    >
      {children}
    </div>
  );
};