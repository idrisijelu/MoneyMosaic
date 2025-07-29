import React, { useState } from 'react';
import { useTheme } from '../theme';
import { Header } from '../components/layout/Header';
import { Navigation, DashboardIcon, TransactionsIcon, CategoriesIcon, BudgetIcon, ReportsIcon, SettingsIcon } from '../components/layout/Navigation';
import type { NavigationItem } from '../components/layout/Navigation';

export interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPath = '/' }) => {
  const theme = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/',
      icon: <DashboardIcon />,
      active: currentPath === '/',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      href: '/transactions',
      icon: <TransactionsIcon />,
      active: currentPath === '/transactions',
    },
    {
      id: 'categories',
      label: 'Categories',
      href: '/categories',
      icon: <CategoriesIcon />,
      active: currentPath === '/categories',
    },
    {
      id: 'budget',
      label: 'Budget',
      href: '/budget',
      icon: <BudgetIcon />,
      active: currentPath === '/budget',
    },
    {
      id: 'reports',
      label: 'Reports',
      href: '/reports',
      icon: <ReportsIcon />,
      active: currentPath === '/reports',
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
      active: currentPath === '/settings',
    },
  ];

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.colors.background.secondary,
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: window.innerWidth >= 768 ? '16rem' : '0',
    transition: 'margin-left 0.3s ease',
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    padding: theme.spacing[6],
    paddingTop: theme.spacing[6],
    overflowY: 'auto',
  };

  const handleNavigation = (item: NavigationItem) => {
    // In a real app, this would handle routing
    console.log('Navigate to:', item.href);
    // For now, we'll just simulate navigation by updating the URL
    window.history.pushState({}, '', item.href);
  };

  // Responsive styles
  const responsiveStyles = `
    @media (max-width: 767px) {
      .layout-content {
        margin-left: 0 !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={containerStyles}>
        <Navigation
          items={navigationItems}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onNavigate={handleNavigation}
        />
        
        <div className="layout-content" style={contentStyles}>
          <Header
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            userName="John Doe"
          />
          
          <main style={mainStyles}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};