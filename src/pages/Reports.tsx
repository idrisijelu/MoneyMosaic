import React, { useState, useMemo } from 'react';
import { Download, Filter, FileText, Calendar } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';
import { Transaction } from '../types';
import { formatCurrency, exportToCSV } from '../utils';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import LoadingSpinner from '../components/LoadingSpinner';

const Reports: React.FC = () => {
  const { loading, error, getFilteredTransactions, getSummaryData } = useFinancialData();
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const transactions = getFilteredTransactions();
  const summaryData = getSummaryData();

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortField === 'date') {
        const comparison = new Date(aVal as Date).getTime() - new Date(bVal as Date).getTime();
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, sortField, sortDirection, filterCategory, filterType]);

  const categories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredTransactions.map(t => ({
      date: format(t.date, 'yyyy-MM-dd'),
      description: t.description,
      category: t.category,
      type: t.type,
      amount: t.amount,
    }));
    
    exportToCSV(exportData, `financial-report-${format(new Date(), 'yyyy-MM-dd')}`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Financial Report', 20, 20);
    
    // Summary
    doc.setFontSize(12);
    doc.text(`Generated on: ${format(new Date(), 'MMMM dd, yyyy')}`, 20, 35);
    doc.text(`Total Income: ${formatCurrency(summaryData.income)}`, 20, 45);
    doc.text(`Total Expenses: ${formatCurrency(summaryData.expenses)}`, 20, 55);
    doc.text(`Net Balance: ${formatCurrency(summaryData.balance)}`, 20, 65);
    
    // Transaction table header
    let yPos = 85;
    doc.text('Transactions:', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.text('Date', 20, yPos);
    doc.text('Description', 50, yPos);
    doc.text('Category', 120, yPos);
    doc.text('Type', 160, yPos);
    doc.text('Amount', 180, yPos);
    yPos += 5;
    
    // Draw line
    doc.line(20, yPos, 200, yPos);
    yPos += 5;
    
    // Transaction data
    filteredTransactions.slice(0, 30).forEach(transaction => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(format(transaction.date, 'MM/dd/yyyy'), 20, yPos);
      doc.text(transaction.description.substring(0, 25), 50, yPos);
      doc.text(transaction.category, 120, yPos);
      doc.text(transaction.type, 160, yPos);
      doc.text(formatCurrency(transaction.amount), 180, yPos);
      yPos += 8;
    });
    
    doc.save(`financial-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading reports data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
        <p className="text-gray-600">
          Analyze your financial data with detailed reports and export options
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-3 mb-6">
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
          <p className="text-3xl font-bold text-blue-600">{filteredTransactions.length}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(summaryData.income)}</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(summaryData.expenses)}</p>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-500" />
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleExportCSV}
              className="btn btn-secondary flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="btn btn-primary flex items-center"
            >
              <FileText size={16} className="mr-2" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
        
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} className="text-gray-400 mb-4 mx-auto" />
            <p>No transactions found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th 
                    className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('date')}
                  >
                    Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('description')}
                  >
                    Description {sortField === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('category')}
                  >
                    Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('type')}
                  >
                    Type {sortField === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{format(transaction.date, 'MMM dd, yyyy')}</td>
                    <td className="py-3 px-4">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`py-3 px-4 font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;