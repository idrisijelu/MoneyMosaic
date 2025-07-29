import { createContext } from 'react';
import type { Theme } from './theme';

// Create theme context
export const ThemeContext = createContext<Theme | undefined>(undefined);