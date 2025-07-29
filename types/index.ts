export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
}

export interface FinancialProfile {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoal: number;
  currentSavings: number;
  transactions: Transaction[];
  budgets: Budget[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'alert' | 'celebration' | 'tip';
}

export interface AIResponse {
  content: string;
  type: 'text' | 'alert' | 'celebration' | 'tip';
  suggestions?: string[];
}