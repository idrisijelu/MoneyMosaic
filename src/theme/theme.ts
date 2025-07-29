import { colors, typography, spacing, borderRadius, shadows, breakpoints, zIndex } from './tokens';

// Theme interface
export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  breakpoints: typeof breakpoints;
  zIndex: typeof zIndex;
}

// Create the theme object
export const theme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
};