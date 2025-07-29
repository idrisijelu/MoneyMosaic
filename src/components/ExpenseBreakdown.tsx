import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategorySummary } from '../types';
import { formatCurrency } from '../utils';

interface ExpenseBreakdownProps {
  data: CategorySummary[];
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="card" style={{ minWidth: '200px' }}>
          <p className="font-semibold">{data.category}</p>
          <p className="text-sm text-gray-600">
            Amount: {formatCurrency(data.totalAmount)}
          </p>
          <p className="text-sm text-gray-600">
            Percentage: {data.percentage.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">
            Transactions: {data.transactionCount}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
        <div className="empty-state">
          <p>No expense data available for the selected period.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="totalAmount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>
                  {entry.payload?.category || value} ({formatCurrency(entry.payload?.totalAmount || 0)})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;