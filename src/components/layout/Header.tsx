import React, { useState } from 'react';
import { useTheme } from '../../theme';
import { Avatar, Button } from '../common';

export interface HeaderProps {
  onMenuToggle?: () => void;
  userName?: string;
  userAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  userName = 'John Doe',
  userAvatar 
}) => {
  const theme = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
    backgroundColor: theme.colors.background.primary,
    borderBottom: `1px solid ${theme.colors.border.light}`,
    boxShadow: theme.shadows.sm,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.sticky,
  };

  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[4],
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    textDecoration: 'none',
    color: theme.colors.text.primary,
  };

  const logoIconStyles: React.CSSProperties = {
    width: '2rem',
    height: '2rem',
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  };

  const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const userMenuStyles: React.CSSProperties = {
    position: 'relative',
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: theme.spacing[2],
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.lg,
    minWidth: '12rem',
    zIndex: theme.zIndex.dropdown,
  };

  const dropdownItemStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.sm,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const menuButtonStyles: React.CSSProperties = {
    display: 'none',
  };

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const mobileStyles = `
    @media (max-width: 767px) {
      .mobile-menu-button {
        display: flex !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <header style={headerStyles}>
        <div style={leftSectionStyles}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          style={menuButtonStyles}
          className="mobile-menu-button"
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </Button>
        
        <a href="/" style={logoStyles}>
          <div style={logoIconStyles}>
            MM
          </div>
          <span style={logoTextStyles}>MoneyMosaic</span>
        </a>
      </div>

      <div style={rightSectionStyles}>
        <Button variant="ghost" size="sm" aria-label="Notifications">
          <NotificationIcon />
        </Button>

        <div style={userMenuStyles}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ padding: theme.spacing[1], borderRadius: theme.borderRadius.full }}
          >
            <Avatar 
              name={userName}
              src={userAvatar}
              size="sm"
            />
          </Button>

          {showUserMenu && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: theme.zIndex.dropdown - 1,
                }}
                onClick={() => setShowUserMenu(false)}
              />
              <div style={dropdownStyles}>
                <button
                  style={dropdownItemStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Profile
                </button>
                <button
                  style={dropdownItemStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Settings
                </button>
                <hr style={{ 
                  margin: `${theme.spacing[1]} 0`, 
                  border: 'none', 
                  borderTop: `1px solid ${theme.colors.border.light}` 
                }} />
                <button
                  style={dropdownItemStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
};