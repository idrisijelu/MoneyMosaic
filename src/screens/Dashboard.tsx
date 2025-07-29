import React from 'react';
import { useTheme } from '../theme';
import { Card, Button, Badge } from '../components/common';

export const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Sample data - in a real app this would come from an API
  const balance = {
    total: 12450.75,
    income: 8500.00,
    expenses: 3950.25,
    savings: 4500.50,
  };

  const recentTransactions = [
    {
      id: '1',
      description: 'Grocery Store',
      amount: -85.50,
      category: 'Food',
      date: '2024-01-15',
      type: 'expense' as const,
    },
    {
      id: '2',
      description: 'Salary Deposit',
      amount: 3500.00,
      category: 'Income',
      date: '2024-01-15',
      type: 'income' as const,
    },
    {
      id: '3',
      description: 'Electric Bill',
      amount: -125.75,
      category: 'Utilities',
      date: '2024-01-14',
      type: 'expense' as const,
    },
    {
      id: '4',
      description: 'Coffee Shop',
      amount: -12.50,
      category: 'Food',
      date: '2024-01-14',
      type: 'expense' as const,
    },
    {
      id: '5',
      description: 'Freelance Project',
      amount: 750.00,
      category: 'Income',
      date: '2024-01-13',
      type: 'income' as const,
    },
  ];

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: theme.spacing[6],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const recentTransactionsStyles: React.CSSProperties = {
    marginTop: theme.spacing[8],
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  };

  const transactionListStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  };

  const transactionItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing[4],
  };

  const transactionLeftStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const transactionDetailsStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
  };

  const transactionDescriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  };

  const transactionMetaStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  const transactionAmountStyles = (amount: number): React.CSSProperties => ({
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: amount > 0 ? theme.colors.success : theme.colors.text.primary,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning'> = {
      'Food': 'warning',
      'Utilities': 'secondary',
      'Income': 'success',
      'Transport': 'primary',
    };
    return colorMap[category] || 'primary';
  };

  const getTransactionIcon = (type: 'income' | 'expense') => {
    if (type === 'income') {
      return (
        <div style={{
          width: '2rem',
          height: '2rem',
          borderRadius: theme.borderRadius.full,
          backgroundColor: '#dcfce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colors.success,
        }}>
          ↑
        </div>
      );
    }
    return (
      <div style={{
        width: '2rem',
        height: '2rem',
        borderRadius: theme.borderRadius.full,
        backgroundColor: '#fee2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.error,
      }}>
        ↓
      </div>
    );
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Dashboard</h1>
        <p style={subtitleStyles}>Welcome back! Here's your financial overview.</p>
      </div>

      {/* Balance Overview Cards */}
      <div style={gridStyles}>
        <Card variant="elevated">
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[2],
            }}>
              Total Balance
            </h3>
            <p style={{ 
              fontSize: theme.typography.fontSize['3xl'], 
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}>
              {formatCurrency(balance.total)}
            </p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[2],
            }}>
              Monthly Income
            </h3>
            <p style={{ 
              fontSize: theme.typography.fontSize['2xl'], 
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.success,
            }}>
              {formatCurrency(balance.income)}
            </p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[2],
            }}>
              Monthly Expenses
            </h3>
            <p style={{ 
              fontSize: theme.typography.fontSize['2xl'], 
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.error,
            }}>
              {formatCurrency(balance.expenses)}
            </p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[2],
            }}>
              Savings
            </h3>
            <p style={{ 
              fontSize: theme.typography.fontSize['2xl'], 
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.primary[600],
            }}>
              {formatCurrency(balance.savings)}
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div style={recentTransactionsStyles}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: theme.spacing[4],
        }}>
          <h2 style={sectionTitleStyles}>Recent Transactions</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <Card padding="none">
          <div style={transactionListStyles}>
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div style={transactionItemStyles}>
                  <div style={transactionLeftStyles}>
                    {getTransactionIcon(transaction.type)}
                    <div style={transactionDetailsStyles}>
                      <div style={transactionDescriptionStyles}>
                        {transaction.description}
                      </div>
                      <div style={transactionMetaStyles}>
                        {formatDate(transaction.date)} • 
                        <Badge 
                          variant={getCategoryColor(transaction.category)}
                          size="sm"
                          style={{ marginLeft: theme.spacing[2] }}
                        >
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div style={transactionAmountStyles(transaction.amount)}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
                {index < recentTransactions.length - 1 && (
                  <hr style={{ 
                    margin: 0, 
                    border: 'none', 
                    borderTop: `1px solid ${theme.colors.border.light}` 
                  }} />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};