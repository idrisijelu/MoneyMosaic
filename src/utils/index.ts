import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear, subMonths, addMonths } from 'date-fns';
import { Transaction, CategorySummary, MonthlyData, PeriodSelector, FinancialInsight } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

export const getDateRange = (period: PeriodSelector) => {
  const now = new Date();
  
  switch (period.type) {
    case 'week':
      return {
        start: startOfWeek(now),
        end: endOfWeek(now),
      };
    case 'month':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      };
    case 'year':
      return {
        start: startOfYear(now),
        end: endOfYear(now),
      };
    case 'custom':
      return {
        start: period.startDate,
        end: period.endDate,
      };
    default:
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      };
  }
};

export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter(
    (transaction) =>
      transaction.date >= startDate && transaction.date <= endDate
  );
};

export const calculateCategorySummary = (
  transactions: Transaction[]
): CategorySummary[] => {
  const categoryMap = new Map<string, { amount: number; count: number }>();
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  expenseTransactions.forEach((transaction) => {
    const existing = categoryMap.get(transaction.category) || { amount: 0, count: 0 };
    categoryMap.set(transaction.category, {
      amount: existing.amount + transaction.amount,
      count: existing.count + 1,
    });
  });

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  return Array.from(categoryMap.entries()).map(([category, data], index) => ({
    category,
    totalAmount: data.amount,
    transactionCount: data.count,
    percentage: totalExpenses > 0 ? (data.amount / totalExpenses) * 100 : 0,
    color: colors[index % colors.length],
  })).sort((a, b) => b.totalAmount - a.totalAmount);
};

export const calculateMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap = new Map<string, { income: number; expenses: number }>();
  
  transactions.forEach((transaction) => {
    const monthKey = format(transaction.date, 'MMM yyyy');
    const existing = monthlyMap.get(monthKey) || { income: 0, expenses: 0 };
    
    if (transaction.type === 'income') {
      existing.income += transaction.amount;
    } else {
      existing.expenses += transaction.amount;
    }
    
    monthlyMap.set(monthKey, existing);
  });

  return Array.from(monthlyMap.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

export const generateFinancialInsights = (
  transactions: Transaction[],
  previousPeriodTransactions: Transaction[]
): FinancialInsight[] => {
  const insights: FinancialInsight[] = [];
  
  // Calculate current period expenses by category
  const currentExpenses = calculateCategorySummary(transactions.filter(t => t.type === 'expense'));
  const previousExpenses = calculateCategorySummary(previousPeriodTransactions.filter(t => t.type === 'expense'));
  
  // Find spending increases
  currentExpenses.forEach((current) => {
    const previous = previousExpenses.find(p => p.category === current.category);
    if (previous && current.totalAmount > previous.totalAmount * 1.2) {
      const increase = ((current.totalAmount - previous.totalAmount) / previous.totalAmount) * 100;
      insights.push({
        id: `increase-${current.category}`,
        type: 'warning',
        title: `Increased spending in ${current.category}`,
        description: `Your ${current.category} spending increased by ${increase.toFixed(1)}% compared to last period.`,
        category: current.category,
        impact: current.totalAmount - previous.totalAmount,
      });
    }
  });
  
  // Identify recurring expenses
  const recurringCategories = currentExpenses.filter(c => c.transactionCount >= 3);
  recurringCategories.forEach((category) => {
    insights.push({
      id: `recurring-${category.category}`,
      type: 'info',
      title: `Regular ${category.category} expenses`,
      description: `You have ${category.transactionCount} transactions in ${category.category} totaling ${formatCurrency(category.totalAmount)}.`,
      category: category.category,
    });
  });
  
  // Savings opportunities
  const highSpendingCategories = currentExpenses.filter(c => c.percentage > 15);
  highSpendingCategories.forEach((category) => {
    insights.push({
      id: `savings-${category.category}`,
      type: 'suggestion',
      title: `Consider budgeting for ${category.category}`,
      description: `${category.category} represents ${category.percentage.toFixed(1)}% of your expenses. Setting a budget could help optimize spending.`,
      category: category.category,
    });
  });
  
  return insights.slice(0, 5); // Limit to top 5 insights
};

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const mockTransactions: Transaction[] = [
  // Current month transactions
  { id: '1', amount: 5000, category: 'Salary', description: 'Monthly salary', date: new Date(), type: 'income' },
  { id: '2', amount: 1200, category: 'Housing', description: 'Rent payment', date: new Date(), type: 'expense' },
  { id: '3', amount: 300, category: 'Groceries', description: 'Weekly groceries', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '4', amount: 150, category: 'Transportation', description: 'Gas and parking', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '5', amount: 80, category: 'Entertainment', description: 'Movie tickets', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '6', amount: 250, category: 'Utilities', description: 'Electric and water', date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '7', amount: 200, category: 'Groceries', description: 'Weekly groceries', date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '8', amount: 500, category: 'Freelance', description: 'Side project payment', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), type: 'income' },
  { id: '9', amount: 120, category: 'Entertainment', description: 'Dinner out', date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '10', amount: 60, category: 'Transportation', description: 'Public transport', date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), type: 'expense' },
  
  // Previous month transactions for comparison
  { id: '11', amount: 5000, category: 'Salary', description: 'Monthly salary', date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000), type: 'income' },
  { id: '12', amount: 1200, category: 'Housing', description: 'Rent payment', date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '13', amount: 280, category: 'Groceries', description: 'Weekly groceries', date: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '14', amount: 100, category: 'Transportation', description: 'Gas', date: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000), type: 'expense' },
  { id: '15', amount: 200, category: 'Utilities', description: 'Electric and water', date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), type: 'expense' },
];