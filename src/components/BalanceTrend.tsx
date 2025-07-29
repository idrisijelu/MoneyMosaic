import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '../types';
import { formatCurrency } from '../utils';

interface BalanceTrendProps {
  data: MonthlyData[];
}

const BalanceTrend: React.FC<BalanceTrendProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="card" style={{ minWidth: '200px' }}>
          <p className="font-semibold">{label}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            Balance: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Balance Trend</h3>
        <div className="empty-state">
          <p>No balance data available.</p>
        </div>
      </div>
    );
  }

  // Calculate cumulative balance
  let cumulativeBalance = 0;
  const balanceData = data.map(item => {
    cumulativeBalance += item.balance;
    return {
      ...item,
      cumulativeBalance,
    };
  });

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Balance Trend</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <LineChart data={balanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="cumulativeBalance" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrend;