import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils';

interface SummaryCardsProps {
  data: {
    income: number;
    expenses: number;
    balance: number;
    incomeChange: number;
    expenseChange: number;
    balanceChange: number;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      title: 'Total Income',
      value: data.income,
      change: data.incomeChange,
      icon: DollarSign,
      className: 'income',
    },
    {
      title: 'Total Expenses',
      value: data.expenses,
      change: data.expenseChange,
      icon: CreditCard,
      className: 'expense',
    },
    {
      title: 'Current Balance',
      value: data.balance,
      change: data.balanceChange,
      icon: PiggyBank,
      className: 'balance',
    },
  ];

  return (
    <div className="grid grid-3 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        
        return (
          <div key={card.title} className={`summary-card ${card.className}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm opacity-90">{card.title}</p>
                <h3 className="text-2xl font-bold">{formatCurrency(card.value)}</h3>
              </div>
              <Icon size={24} className="opacity-80" />
            </div>
            
            <div className="flex items-center">
              <TrendIcon size={16} className="mr-1" />
              <span className="text-sm">
                {card.title === 'Current Balance' 
                  ? formatCurrency(Math.abs(card.change))
                  : formatPercentage(card.change)
                } vs last period
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;