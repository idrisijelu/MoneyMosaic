import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing[6]};
  margin: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const CardContent = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
`;

// Ensure the button does not accidentally submit forms by default
const PrimaryButton = styled.button.attrs({ type: 'button' })`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[200]};
  }
`;

// Ensure the button does not accidentally submit forms by default
const SecondaryButton = styled.button.attrs({ type: 'button' })`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary[700]};
  border: 1px solid ${({ theme }) => theme.colors.secondary[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing[3]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary[50]};
    border-color: ${({ theme }) => theme.colors.secondary[400]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary[200]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return `
          background-color: ${theme.colors.success[100]};
          color: ${theme.colors.success[800]};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning[100]};
          color: ${theme.colors.warning[800]};
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error[100]};
          color: ${theme.colors.error[800]};
        `;
      default:
        return `
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[800]};
        `;
    }
  }}
`;

interface ExampleCardProps {
  title: string;
  content: string;
  status?: 'success' | 'warning' | 'error';
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  content,
  status,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <CardContainer>
      {status && <StatusBadge variant={status}>{status.toUpperCase()}</StatusBadge>}
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      <ButtonGroup>
        <PrimaryButton onClick={onPrimaryAction}>
          Primary Action
        </PrimaryButton>
        <SecondaryButton onClick={onSecondaryAction}>
          Secondary Action
        </SecondaryButton>
      </ButtonGroup>
    </CardContainer>
  );
};

export default ExampleCard;