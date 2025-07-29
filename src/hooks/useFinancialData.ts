import { useState, useEffect } from 'react';
import { Transaction, Budget, PeriodSelector, FinancialInsight } from '../types';
import { 
  mockTransactions, 
  filterTransactionsByDateRange, 
  getDateRange, 
  generateFinancialInsights,
  calculateCategorySummary,
  calculateMonthlyData 
} from '../utils';

export const useFinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodSelector>({
    type: 'month',
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTransactions(mockTransactions);
        setBudgets([
          { id: '1', category: 'Housing', budgetAmount: 1500, spentAmount: 1200, period: 'monthly' },
          { id: '2', category: 'Groceries', budgetAmount: 400, spentAmount: 500, period: 'monthly' },
          { id: '3', category: 'Transportation', budgetAmount: 200, spentAmount: 210, period: 'monthly' },
          { id: '4', category: 'Entertainment', budgetAmount: 200, spentAmount: 200, period: 'monthly' },
          { id: '5', category: 'Utilities', budgetAmount: 300, spentAmount: 250, period: 'monthly' },
        ]);
        setError(null);
      } catch (err) {
        setError('Failed to load financial data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getFilteredTransactions = () => {
    const { start, end } = getDateRange(selectedPeriod);
    return filterTransactionsByDateRange(transactions, start, end);
  };

  const getPreviousPeriodTransactions = () => {
    const { start, end } = getDateRange(selectedPeriod);
    const periodLength = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - periodLength);
    const prevEnd = new Date(end.getTime() - periodLength);
    return filterTransactionsByDateRange(transactions, prevStart, prevEnd);
  };

  const getSummaryData = () => {
    const filtered = getFilteredTransactions();
    const income = filtered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filtered
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate previous period for comparison
    const prevFiltered = getPreviousPeriodTransactions();
    const prevIncome = prevFiltered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const prevExpenses = prevFiltered
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeChange = prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 0;
    const expenseChange = prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 0;
    const balanceChange = ((income - expenses) - (prevIncome - prevExpenses));

    return {
      income,
      expenses,
      balance: income - expenses,
      incomeChange,
      expenseChange,
      balanceChange,
    };
  };

  const getCategoryData = () => {
    return calculateCategorySummary(getFilteredTransactions());
  };

  const getMonthlyData = () => {
    return calculateMonthlyData(transactions);
  };

  const getInsights = (): FinancialInsight[] => {
    return generateFinancialInsights(
      getFilteredTransactions(),
      getPreviousPeriodTransactions()
    );
  };

  const getBudgetData = () => {
    return budgets.map(budget => {
      const categoryTransactions = getFilteredTransactions().filter(
        t => t.category === budget.category && t.type === 'expense'
      );
      const actualSpent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      const status: 'good' | 'warning' | 'over' = 
        actualSpent > budget.budgetAmount ? 'over' : 
        actualSpent > budget.budgetAmount * 0.8 ? 'warning' : 'good';
      
      return {
        ...budget,
        spentAmount: actualSpent,
        remaining: budget.budgetAmount - actualSpent,
        percentage: (actualSpent / budget.budgetAmount) * 100,
        status
      };
    });
  };

  return {
    transactions,
    budgets,
    loading,
    error,
    selectedPeriod,
    setSelectedPeriod,
    getFilteredTransactions,
    getSummaryData,
    getCategoryData,
    getMonthlyData,
    getInsights,
    getBudgetData,
  };
};