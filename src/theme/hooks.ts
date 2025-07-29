import { useContext } from 'react';
import { ThemeContext } from './context';
import type { Theme } from './theme';

// Custom hook to use theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};