import 'styled-components';
import { Theme } from './tokens';

// Augment the styled-components theme type with our theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}