import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '../types';
import { formatCurrency } from '../utils';

interface IncomeVsExpensesProps {
  data: MonthlyData[];
}

const IncomeVsExpenses: React.FC<IncomeVsExpensesProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="card" style={{ minWidth: '200px' }}>
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'income' ? 'Income' : 'Expenses'}: {formatCurrency(entry.value)}
            </p>
          ))}
          <p className="text-sm text-gray-600">
            Net: {formatCurrency(payload[0].payload.balance)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <div className="empty-state">
          <p>No data available for comparison.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeVsExpenses;