import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './theme';
import { ExampleCard } from './components/ExampleCard';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[8]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const App: React.FC = () => {
  const handlePrimaryAction = () => {
    alert('Primary action clicked!');
  };

  const handleSecondaryAction = () => {
    alert('Secondary action clicked!');
  };

  return (
    <ThemeProvider>
      <AppContainer>
        <Header>
          <Title>Money Mosaic</Title>
          <Subtitle>Theme System Demonstration</Subtitle>
        </Header>

        <CardGrid>
          <ExampleCard
            title="Success Card"
            content="This card demonstrates the successful state styling using our design tokens. Notice the green status badge and themed colors."
            status="success"
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
          />
          
          <ExampleCard
            title="Warning Card"
            content="This card shows warning state styling with amber colors from our theme. The spacing, typography, and colors all come from our design tokens."
            status="warning"
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
          />
          
          <ExampleCard
            title="Error Card"
            content="This demonstrates error state styling with red colors. All components use consistent spacing, typography, and interaction patterns."
            status="error"
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
          />
          
          <ExampleCard
            title="Default Card"
            content="This is a default card without a status badge. It showcases the base styling including shadows, border radius, and hover effects."
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
          />
        </CardGrid>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;