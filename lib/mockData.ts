import { FinancialProfile, Transaction, Budget } from '@/types';

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: -120.50,
    description: 'Grocery Store',
    category: 'Food',
    date: '2024-01-15',
    type: 'expense'
  },
  {
    id: '2',
    amount: -850.00,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-01',
    type: 'expense'
  },
  {
    id: '3',
    amount: 3200.00,
    description: 'Salary',
    category: 'Income',
    date: '2024-01-01',
    type: 'income'
  },
  {
    id: '4',
    amount: -45.99,
    description: 'Coffee Shop',
    category: 'Food',
    date: '2024-01-14',
    type: 'expense'
  },
  {
    id: '5',
    amount: -89.99,
    description: 'Gym Membership',
    category: 'Health',
    date: '2024-01-10',
    type: 'expense'
  }
];

// Mock budget data
const mockBudgets: Budget[] = [
  {
    category: 'Food',
    budgeted: 500,
    spent: 166.49,
    remaining: 333.51
  },
  {
    category: 'Housing',
    budgeted: 1000,
    spent: 850,
    remaining: 150
  },
  {
    category: 'Transportation',
    budgeted: 200,
    spent: 0,
    remaining: 200
  },
  {
    category: 'Health',
    budgeted: 150,
    spent: 89.99,
    remaining: 60.01
  },
  {
    category: 'Entertainment',
    budgeted: 100,
    spent: 0,
    remaining: 100
  }
];

export const mockFinancialProfile: FinancialProfile = {
  totalBalance: 2500.00,
  monthlyIncome: 3200.00,
  monthlyExpenses: 1106.48,
  savingsGoal: 10000.00,
  currentSavings: 2500.00,
  transactions: mockTransactions,
  budgets: mockBudgets
};

export const getFinancialInsights = (profile: FinancialProfile) => {
  const insights = [];
  
  // Check for overspending in categories
  profile.budgets.forEach(budget => {
    const spentPercentage = (budget.spent / budget.budgeted) * 100;
    if (spentPercentage > 80) {
      insights.push({
        type: 'warning',
        category: budget.category,
        message: `You've spent ${spentPercentage.toFixed(1)}% of your ${budget.category} budget this month.`
      });
    }
  });
  
  // Check savings progress
  const savingsPercentage = (profile.currentSavings / profile.savingsGoal) * 100;
  if (savingsPercentage >= 25) {
    insights.push({
      type: 'celebration',
      message: `Great job! You've saved ${savingsPercentage.toFixed(1)}% towards your savings goal!`
    });
  }
  
  // Check monthly surplus
  const monthlySurplus = profile.monthlyIncome - profile.monthlyExpenses;
  if (monthlySurplus > 500) {
    insights.push({
      type: 'tip',
      message: `You have a healthy monthly surplus of $${monthlySurplus.toFixed(2)}. Consider increasing your savings rate!`
    });
  }
  
  return insights;
};