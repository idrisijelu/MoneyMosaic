import React from 'react';
import { AlertTriangle, Lightbulb, Info, TrendingUp } from 'lucide-react';
import { FinancialInsight } from '../types';
import { formatCurrency } from '../utils';

interface FinancialInsightsProps {
  insights: FinancialInsight[];
}

const FinancialInsights: React.FC<FinancialInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-600" />;
      case 'suggestion':
        return <Lightbulb size={20} className="text-blue-600" />;
      case 'info':
        return <Info size={20} className="text-gray-600" />;
      default:
        return <TrendingUp size={20} className="text-green-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'suggestion':
        return 'border-blue-200 bg-blue-50';
      case 'info':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-green-200 bg-green-50';
    }
  };

  if (insights.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
        <div className="empty-state">
          <TrendingUp size={48} className="text-gray-400 mb-4 mx-auto" />
          <p>No insights available.</p>
          <p className="text-sm text-gray-500">
            Add more transactions to get personalized financial insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  {insight.description}
                </p>
                {insight.impact && (
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="font-medium">
                      Impact: {formatCurrency(insight.impact)}
                    </span>
                    {insight.category && (
                      <span className="ml-2 px-2 py-1 bg-gray-200 rounded">
                        {insight.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-blue-800">
          Review your insights regularly to identify spending patterns and optimize your budget. 
          Consider setting up automatic savings transfers for categories where you're under budget.
        </p>
      </div>
    </div>
  );
};

export default FinancialInsights;