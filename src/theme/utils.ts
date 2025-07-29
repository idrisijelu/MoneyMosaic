import type { Theme } from './theme';

// Helper function to create CSS variables from theme tokens
export const createCSSVariables = (theme: Theme): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  // Add color variables
  Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      cssVars[`--color-${colorName}`] = colorValue;
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        cssVars[`--color-${colorName}-${shade}`] = value;
      });
    }
  });
  
  // Add spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Add typography variables
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  // Add border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars[`--border-radius-${key}`] = value;
  });
  
  // Add shadow variables
  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
};