import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils';

interface BudgetItem {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  remaining: number;
  percentage: number;
  status: 'good' | 'warning' | 'over';
}

interface BudgetTrackingProps {
  budgets: BudgetItem[];
}

const BudgetTracking: React.FC<BudgetTrackingProps> = ({ budgets }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      case 'over':
        return <AlertTriangle size={20} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'success';
      case 'warning':
        return 'warning';
      case 'over':
        return 'danger';
      default:
        return 'success';
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;

  if (budgets.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Budget Tracking</h3>
        <div className="empty-state">
          <p>No budgets configured.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold">Budget Tracking</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Budget: {formatCurrency(totalBudget)}</span>
          <span>Total Spent: {formatCurrency(totalSpent)}</span>
          <span className={totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}>
            Remaining: {formatCurrency(totalRemaining)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {getStatusIcon(budget.status)}
                <span className="font-semibold ml-2">{budget.category}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {formatCurrency(budget.spentAmount)} / {formatCurrency(budget.budgetAmount)}
                </div>
                <div className={`text-sm ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {budget.remaining >= 0 ? 'Under' : 'Over'} by {formatCurrency(Math.abs(budget.remaining))}
                </div>
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getProgressColor(budget.status)}`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{budget.percentage.toFixed(1)}%</span>
              <span>100%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTracking;