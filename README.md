# Money Mosaic

A React application demonstrating a comprehensive theme/styling system built with styled-components and TypeScript.

## Theme System Features

This project showcases a complete design system implementation including:

- **Design Tokens**: Comprehensive color palettes, typography scales, spacing system, and more
- **Theme Provider**: Centralized theme management using styled-components ThemeProvider
- **Type Safety**: Full TypeScript support with theme type definitions
- **Example Components**: Demonstrative components showing theme usage patterns

## Design Tokens

The theme system includes the following design tokens:

### Colors
- **Primary**: Blue palette for main actions and branding
- **Secondary**: Gray palette for secondary elements
- **Success**: Green palette for positive states
- **Warning**: Amber palette for cautionary states
- **Error**: Red palette for error states
- **Gray**: Neutral palette for text and backgrounds

### Typography
- **Font Families**: Inter (sans-serif) and JetBrains Mono (monospace)
- **Font Sizes**: Comprehensive scale from xs (12px) to 6xl (60px)
- **Font Weights**: From thin (100) to black (900)
- **Line Heights**: From tight (1.25) to loose (2.0)
- **Letter Spacing**: From tighter (-0.05em) to widest (0.1em)

### Spacing
- **Consistent Scale**: Based on 0.25rem (4px) units
- **Range**: From 0px to 24rem (384px)
- **Responsive**: Works well across different screen sizes

### Other Tokens
- **Border Radius**: From none to full (9999px)
- **Shadows**: From subtle to dramatic elevation effects
- **Breakpoints**: Mobile-first responsive breakpoints
- **Z-Index**: Consistent layering system

## Project Structure

```
src/
├── theme/
│   ├── tokens.ts           # Design tokens and theme object
│   ├── ThemeProvider.tsx   # Theme provider component
│   ├── styled.d.ts         # TypeScript theme augmentation
│   └── index.ts           # Theme exports
├── components/
│   └── ExampleCard.tsx    # Example component using theme
├── App.tsx                # Main application component
└── index.tsx             # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (16+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the theme system demonstration.

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Usage Examples

### Using the Theme Provider

```tsx
import React from 'react';
import { ThemeProvider } from './theme';
import YourComponent from './YourComponent';

function App() {
  return (
    <ThemeProvider>
      <YourComponent />
    </ThemeProvider>
  );
}
```

### Creating Themed Components

```tsx
import styled from 'styled-components';

const ThemedButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;
```

### Accessing Theme in Components

```tsx
import { useTheme } from 'styled-components';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.gray[800] }}>
      Themed content
    </div>
  );
}
```

## TypeScript Support

The theme system includes full TypeScript support:

- Theme tokens are strictly typed
- Styled components have access to theme types through module augmentation
- Compile-time checking ensures correct theme property usage

## Demo Features

The demonstration includes:

1. **Cards with Different States**: Success, warning, error, and default states
2. **Interactive Elements**: Buttons with hover and focus states
3. **Responsive Design**: Grid layout that adapts to screen size
4. **Typography Showcase**: Different font sizes, weights, and colors
5. **Color System**: Full palette usage across components
6. **Spacing System**: Consistent margins, padding, and gaps

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Styled Components**: CSS-in-JS with theme support
- **Vite**: Fast build tool and dev server
- **CSS Grid**: Modern layout system

## Contributing

When extending the theme system:

1. Add new tokens to `src/theme/tokens.ts`
2. Update TypeScript types if needed
3. Test theme changes across all components
4. Maintain consistency with existing design patterns

## Browser Support

This project supports all modern browsers that support ES2020 and CSS Grid.