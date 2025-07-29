import React, { useState } from 'react';
import { useTheme } from '../theme';
import { Card, Input, Button } from './common';

export interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: TransactionFormData) => void;
}

export interface TransactionFormData {
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: 0,
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = {
    expense: ['Food', 'Transport', 'Utilities', 'Shopping', 'Healthcare', 'Entertainment', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
    padding: theme.spacing[4],
  };

  const modalStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    padding: theme.spacing[1],
    lineHeight: 1,
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
  };

  const fieldGroupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
  };

  const typeToggleStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[2],
  };

  const categoryGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: theme.spacing[2],
  };

  const categoryButtonStyles = (isSelected: boolean): React.CSSProperties => ({
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    border: `1px solid ${isSelected ? theme.colors.primary[600] : theme.colors.border.light}`,
    backgroundColor: isSelected ? theme.colors.primary[50] : theme.colors.background.primary,
    color: isSelected ? theme.colors.primary[700] : theme.colors.text.secondary,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    transition: 'all 0.2s ease',
  });

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[3],
    justifyContent: 'flex-end',
    marginTop: theme.spacing[6],
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      description: '',
      amount: 0,
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
    setErrors({});
    onClose();
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '', // Reset category when type changes
    }));
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyles} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <Card style={modalStyles} padding="lg">
        <div style={headerStyles}>
          <h2 style={titleStyles}>Add Transaction</h2>
          <button style={closeButtonStyles} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formStyles}>
          {/* Transaction Type */}
          <div style={fieldGroupStyles}>
            <label style={{ 
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.primary,
            }}>
              Type
            </label>
            <div style={typeToggleStyles}>
              <Button
                type="button"
                variant={formData.type === 'expense' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleTypeChange('expense')}
              >
                Expense
              </Button>
              <Button
                type="button"
                variant={formData.type === 'income' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleTypeChange('income')}
              >
                Income
              </Button>
            </div>
          </div>

          {/* Description */}
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            error={errors.description}
            placeholder="Enter transaction description"
            fullWidth
          />

          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            error={errors.amount}
            placeholder="0.00"
            fullWidth
          />

          {/* Category */}
          <div style={fieldGroupStyles}>
            <label style={{ 
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.primary,
            }}>
              Category
            </label>
            <div style={categoryGridStyles}>
              {categories[formData.type].map((category) => (
                <button
                  key={category}
                  type="button"
                  style={categoryButtonStyles(formData.category === category)}
                  onClick={() => setFormData(prev => ({ ...prev, category }))}
                  onMouseEnter={(e) => {
                    if (formData.category !== category) {
                      e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.category !== category) {
                      e.currentTarget.style.backgroundColor = theme.colors.background.primary;
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            {errors.category && (
              <span style={{ 
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.error,
              }}>
                {errors.category}
              </span>
            )}
          </div>

          {/* Date */}
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            error={errors.date}
            fullWidth
          />

          {/* Actions */}
          <div style={actionsStyles}>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Transaction
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};