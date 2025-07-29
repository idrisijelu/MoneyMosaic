'use client';

import React from 'react';
import { FinancialProfile, Budget } from '@/types';

interface DashboardProps {
  financialProfile: FinancialProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ financialProfile }) => {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsGoal,
    currentSavings,
    budgets,
    transactions
  } = financialProfile;

  const monthlySurplus = monthlyIncome - monthlyExpenses;
  const savingsProgress = (currentSavings / savingsGoal) * 100;
  const recentTransactions = transactions.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.budgeted) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getBudgetColor = (status: string) => {
    switch (status) {
      case 'over':
        return 'bg-danger-500';
      case 'warning':
        return 'bg-warning-500';
      default:
        return 'bg-success-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MoneyMosaic Dashboard</h1>
        <p className="text-gray-600">Your financial overview at a glance</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyIncome)}</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-warning-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyExpenses)}</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>

        <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${monthlySurplus > 0 ? 'border-success-500' : 'border-danger-500'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Surplus</p>
              <p className={`text-2xl font-bold ${monthlySurplus > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {formatCurrency(monthlySurplus)}
              </p>
            </div>
            <div className="text-3xl">{monthlySurplus > 0 ? '✅' : '⚠️'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Savings Goal Progress
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Savings</span>
              <span className="font-semibold">{formatCurrency(currentSavings)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Goal</span>
              <span className="font-semibold">{formatCurrency(savingsGoal)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-success-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(savingsProgress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{savingsProgress.toFixed(1)}% Complete</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(savingsGoal - currentSavings)} to go
              </span>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Budget Overview
          </h2>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const status = getBudgetStatus(budget);
              const percentage = (budget.spent / budget.budgeted) * 100;
              
              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{budget.category}</span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.budgeted)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getBudgetColor(status)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{percentage.toFixed(1)}% used</span>
                    <span className={`font-medium ${
                      status === 'over' ? 'text-danger-600' : 
                      status === 'warning' ? 'text-warning-600' : 
                      'text-success-600'
                    }`}>
                      {formatCurrency(budget.remaining)} remaining
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📝</span>
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-sm text-right font-medium ${
                    transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Assistant Placeholder */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-900 flex items-center">
              <span className="mr-2">🤖</span>
              Genius AI Assistant
            </h3>
            <p className="text-primary-700 mt-1">
              Your AI financial advisor is ready to help! Click the chat button to get personalized guidance.
            </p>
          </div>
          <div className="text-4xl">💬</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;