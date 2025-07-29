import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { Layout } from './layouts/Layout';
import { Dashboard } from './screens/Dashboard';
import { AddTransactionModal } from './components/AddTransactionModal';
import type { TransactionFormData } from './components/AddTransactionModal';
import { Button } from './components/common';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const handleAddTransaction = (transaction: TransactionFormData) => {
    console.log('New transaction:', transaction);
    // In a real app, this would save to an API or state management
  };

  // Placeholder components for other routes
  const TransactionsPage = () => (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Transactions</h1>
      <p>Transactions page coming soon...</p>
    </div>
  );

  const CategoriesPage = () => (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Categories</h1>
      <p>Categories page coming soon...</p>
    </div>
  );

  const BudgetPage = () => (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Budget</h1>
      <p>Budget page coming soon...</p>
    </div>
  );

  const ReportsPage = () => (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reports</h1>
      <p>Reports page coming soon...</p>
    </div>
  );

  const SettingsPage = () => (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Settings</h1>
      <p>Settings page coming soon...</p>
    </div>
  );

  return (
    <Layout currentPath={location.pathname}>
      {/* Floating Add Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsAddTransactionOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          borderRadius: '50%',
          width: '3.5rem',
          height: '3.5rem',
          padding: 0,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        }}
        leftIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <AddTransactionModal
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onSave={handleAddTransaction}
      />
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
