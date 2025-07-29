import React from 'react';
import { useTheme } from '../../theme';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  outlined?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  outlined = false,
  removable = false,
  onRemove,
  className = '',
  style = {},
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    const colors = {
      primary: {
        bg: theme.colors.primary[100],
        text: theme.colors.primary[800],
        border: theme.colors.primary[200],
        bgSolid: theme.colors.primary[500],
      },
      secondary: {
        bg: theme.colors.secondary[100],
        text: theme.colors.secondary[800],
        border: theme.colors.secondary[200],
        bgSolid: theme.colors.secondary[500],
      },
      success: {
        bg: '#dcfce7',
        text: '#166534',
        border: '#bbf7d0',
        bgSolid: theme.colors.success,
      },
      warning: {
        bg: '#fef3c7',
        text: '#92400e',
        border: '#fde68a',
        bgSolid: theme.colors.warning,
      },
      error: {
        bg: '#fee2e2',
        text: '#991b1b',
        border: '#fecaca',
        bgSolid: theme.colors.error,
      },
      info: {
        bg: '#dbeafe',
        text: '#1e40af',
        border: '#bfdbfe',
        bgSolid: theme.colors.info,
      },
      neutral: {
        bg: theme.colors.gray[100],
        text: theme.colors.gray[700],
        border: theme.colors.gray[200],
        bgSolid: theme.colors.gray[500],
      },
    };

    const colorSet = colors[variant];

    if (outlined) {
      return {
        backgroundColor: 'transparent',
        color: colorSet.text,
        border: `1px solid ${colorSet.border}`,
      };
    }

    return {
      backgroundColor: colorSet.bg,
      color: colorSet.text,
      border: '1px solid transparent',
    };
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: theme.typography.fontSize.xs,
          padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
          height: '1.25rem',
          minWidth: '1.25rem',
        };
      case 'lg':
        return {
          fontSize: theme.typography.fontSize.base,
          padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
          height: '2rem',
          minWidth: '2rem',
        };
      default:
        return {
          fontSize: theme.typography.fontSize.sm,
          padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
          height: '1.5rem',
          minWidth: '1.5rem',
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[1],
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.full,
    whiteSpace: 'nowrap',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style,
  };

  const removeButtonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'currentColor',
    border: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.xs,
    transition: 'background-color 0.2s ease',
    marginLeft: theme.spacing[1],
    marginRight: `-${theme.spacing[1]}`,
  };

  return (
    <span className={`badge ${className}`} style={baseStyles}>
      {children}
      {removable && (
        <button
          style={removeButtonStyles}
          onClick={onRemove}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};