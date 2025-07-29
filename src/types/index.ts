export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: 'monthly' | 'yearly';
}

export interface CategorySummary {
  category: string;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface FinancialInsight {
  id: string;
  type: 'warning' | 'suggestion' | 'info';
  title: string;
  description: string;
  category?: string;
  impact?: number;
}

export interface ReportFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  categories: string[];
  transactionTypes: ('income' | 'expense')[];
  minAmount?: number;
  maxAmount?: number;
}

export interface PeriodSelector {
  type: 'week' | 'month' | 'year' | 'custom';
  startDate: Date;
  endDate: Date;
}