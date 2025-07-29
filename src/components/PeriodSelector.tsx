import React from 'react';
import { Calendar } from 'lucide-react';
import { PeriodSelector as PeriodSelectorType } from '../types';

interface PeriodSelectorProps {
  selectedPeriod: PeriodSelectorType;
  onPeriodChange: (period: PeriodSelectorType) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { type: 'week' as const, label: 'This Week' },
    { type: 'month' as const, label: 'This Month' },
    { type: 'year' as const, label: 'This Year' },
  ];

  const handlePeriodChange = (type: 'week' | 'month' | 'year') => {
    onPeriodChange({
      type,
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar size={20} className="mr-2 text-gray-500" />
          <span className="font-semibold">Time Period</span>
        </div>
        
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.type}
              onClick={() => handlePeriodChange(period.type)}
              className={`btn ${
                selectedPeriod.type === period.type
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodSelector;