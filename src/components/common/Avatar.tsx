import React from 'react';
import { useTheme } from '../../theme';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circular' | 'rounded' | 'square';
  fallbackColor?: 'primary' | 'secondary' | 'neutral';
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circular',
  fallbackColor = 'neutral',
  className = '',
  onClick,
}) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return {
          width: '1.5rem',
          height: '1.5rem',
          fontSize: theme.typography.fontSize.xs,
        };
      case 'sm':
        return {
          width: '2rem',
          height: '2rem',
          fontSize: theme.typography.fontSize.sm,
        };
      case 'lg':
        return {
          width: '3rem',
          height: '3rem',
          fontSize: theme.typography.fontSize.lg,
        };
      case 'xl':
        return {
          width: '4rem',
          height: '4rem',
          fontSize: theme.typography.fontSize.xl,
        };
      default:
        return {
          width: '2.5rem',
          height: '2.5rem',
          fontSize: theme.typography.fontSize.base,
        };
    }
  };

  const getBorderRadius = () => {
    switch (variant) {
      case 'square':
        return theme.borderRadius.none;
      case 'rounded':
        return theme.borderRadius.md;
      default:
        return theme.borderRadius.full;
    }
  };

  const getFallbackColors = () => {
    switch (fallbackColor) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary[100],
          color: theme.colors.primary[700],
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary[100],
          color: theme.colors.secondary[700],
        };
      default:
        return {
          backgroundColor: theme.colors.gray[200],
          color: theme.colors.gray[600],
        };
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    fontWeight: theme.typography.fontWeight.medium,
    userSelect: 'none',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    borderRadius: getBorderRadius(),
    border: `2px solid ${theme.colors.background.primary}`,
    ...getSizeStyles(),
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const fallbackStyles: React.CSSProperties = {
    ...baseStyles,
    ...getFallbackColors(),
  };

  // Generate a consistent background color based on name
  const getNameBasedColor = (name: string) => {
    const colors = [
      { bg: theme.colors.primary[100], text: theme.colors.primary[700] },
      { bg: theme.colors.secondary[100], text: theme.colors.secondary[700] },
      { bg: '#fef3c7', text: '#92400e' }, // warning colors
      { bg: '#dcfce7', text: '#166534' }, // success colors
      { bg: '#dbeafe', text: '#1e40af' }, // info colors
      { bg: theme.colors.gray[200], text: theme.colors.gray[600] },
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={imageStyles}
          onError={(e) => {
            // Hide image on error and show fallback
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    if (name) {
      const nameColor = getNameBasedColor(name);
      return (
        <div
          style={{
            ...fallbackStyles,
            backgroundColor: nameColor.bg,
            color: nameColor.text,
          }}
        >
          {getInitials(name)}
        </div>
      );
    }

    // Default fallback icon
    return (
      <div style={fallbackStyles}>
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`avatar ${className}`}
      style={src ? baseStyles : {}}
      onClick={onClick}
    >
      {renderContent()}
    </div>
  );
};