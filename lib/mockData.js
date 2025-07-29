// CommonJS version of mock data for testing

const mockTransactions = [
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
  }
];

const mockBudgets = [
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
  }
];

const mockFinancialProfile = {
  totalBalance: 2500.00,
  monthlyIncome: 3200.00,
  monthlyExpenses: 1106.48,
  savingsGoal: 10000.00,
  currentSavings: 2500.00,
  transactions: mockTransactions,
  budgets: mockBudgets
};

const getFinancialInsights = (profile) => {
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
  
  return insights;
};

module.exports = {
  mockFinancialProfile,
  getFinancialInsights
};