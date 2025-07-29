import React from 'react';
import { useTheme } from '../../theme';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: (item: NavigationItem) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  isOpen = true,
  onClose,
  onNavigate,
}) => {
  const theme = useTheme();

  const navStyles: React.CSSProperties = {
    width: '16rem',
    height: '100vh',
    backgroundColor: theme.colors.background.primary,
    borderRight: `1px solid ${theme.colors.border.light}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: isOpen ? 0 : '-16rem',
    top: 0,
    zIndex: theme.zIndex.fixed,
    transition: 'left 0.3s ease',
    overflowY: 'auto',
  };

  const navContentStyles: React.CSSProperties = {
    padding: `${theme.spacing[6]} 0`,
    paddingTop: '5rem', // Account for header height
  };

  const navItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    transition: 'all 0.2s ease',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const activeNavItemStyles: React.CSSProperties = {
    ...navItemStyles,
    color: theme.colors.primary[600],
    backgroundColor: theme.colors.primary[50],
    borderRight: `3px solid ${theme.colors.primary[600]}`,
  };

  const navItemIconStyles: React.CSSProperties = {
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: 0,
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: theme.zIndex.fixed - 1,
    display: isOpen ? 'block' : 'none',
  };

  const mobileStyles = `
    @media (min-width: 768px) {
      .nav-overlay {
        display: none !important;
      }
      .navigation {
        position: relative !important;
        left: 0 !important;
        height: calc(100vh - 4rem) !important;
      }
    }
  `;

  const handleItemClick = (item: NavigationItem) => {
    if (onNavigate) {
      onNavigate(item);
    }
    
    // Close mobile menu after navigation
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      <style>{mobileStyles}</style>
      
      {/* Mobile overlay */}
      <div
        className="nav-overlay"
        style={overlayStyles}
        onClick={onClose}
      />

      <nav className="navigation" style={navStyles}>
        <div style={navContentStyles}>
          {items.map((item) => (
            <button
              key={item.id}
              style={item.active ? activeNavItemStyles : navItemStyles}
              onClick={() => handleItemClick(item)}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  e.currentTarget.style.color = theme.colors.text.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }
              }}
            >
              <div style={navItemIconStyles}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

// Navigation icons
export const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

export const TransactionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM7 10V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM7 16v-2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM19 4V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM19 10V8a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM19 16v-2a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"/>
  </svg>
);

export const CategoriesIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const ReportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm16 10l-3.5-4.5-2.5 3L9 10l-4 5h14z"/>
  </svg>
);

export const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);