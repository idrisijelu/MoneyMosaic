import React from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import SummaryCards from '../components/SummaryCards';
import PeriodSelector from '../components/PeriodSelector';
import ExpenseBreakdown from '../components/ExpenseBreakdown';
import IncomeVsExpenses from '../components/IncomeVsExpenses';
import BalanceTrend from '../components/BalanceTrend';
import BudgetTracking from '../components/BudgetTracking';
import FinancialInsights from '../components/FinancialInsights';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const {
    loading,
    error,
    selectedPeriod,
    setSelectedPeriod,
    getSummaryData,
    getCategoryData,
    getMonthlyData,
    getInsights,
    getBudgetData,
  } = useFinancialData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading dashboard data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const summaryData = getSummaryData();
  const categoryData = getCategoryData();
  const monthlyData = getMonthlyData();
  const insights = getInsights();
  const budgetData = getBudgetData();

  return (
    <div className="dashboard">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
        <p className="text-gray-600">
          Get insights into your financial health and spending patterns
        </p>
      </div>

      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <SummaryCards data={summaryData} />

      <div className="grid grid-2 mb-6">
        <ExpenseBreakdown data={categoryData} />
        <BalanceTrend data={monthlyData} />
      </div>

      <div className="grid grid-2 mb-6">
        <IncomeVsExpenses data={monthlyData} />
        <BudgetTracking budgets={budgetData} />
      </div>

      <FinancialInsights insights={insights} />
    </div>
  );
};

export default Dashboard;