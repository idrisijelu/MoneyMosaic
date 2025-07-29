import React, { useState, useMemo } from 'react';
import { cn, formatCurrency, formatDate, debounce } from '../../utils';
import { colors } from '../../theme/tokens';
import { Card, Badge, Modal, Dropdown, DatePicker } from '../ui';
import type { Transaction, FilterOptions, SortOptions } from '../../types';
import { sampleTransactions, sampleCategories } from '../../data/sampleData';

const ITEMS_PER_PAGE = 10;

export const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'date',
    direction: 'desc',
  });
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    search: '',
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((search: string) => {
      setFilters(prev => ({ ...prev, search }));
      setCurrentPage(1);
    }, 300),
    []
  );

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply filters
    if (filters.type && filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category) {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.dateRange) {
      result = result.filter(t =>
        t.date >= filters.dateRange!.start && t.date <= filters.dateRange!.end
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number | Date = a[sortOptions.field];
      let bValue: string | number | Date = b[sortOptions.field];

      if (sortOptions.field === 'date') {
        const aDate = aValue as Date;
        const bDate = bValue as Date;
        aValue = new Date(aDate).getTime();
        bValue = new Date(bDate).getTime();
      } else if (sortOptions.field === 'amount') {
        aValue = Math.abs(aValue as number);
        bValue = Math.abs(bValue as number);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (sortOptions.direction === 'asc') {
        return (aValue as number) > (bValue as number) ? 1 : -1;
      } else {
        return (aValue as number) < (bValue as number) ? 1 : -1;
      }
    });

    return result;
  }, [transactions, filters, sortOptions]);

  // Paginate transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedTransactions, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);

  // Handle sort
  const handleSort = (field: SortOptions['field']) => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Prepare dropdown options
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...sampleCategories.map(cat => ({
      value: cat.name,
      label: cat.name,
      icon: cat.icon,
    })),
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  const getSortIcon = (field: SortOptions['field']) => {
    if (sortOptions.field !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortOptions.direction === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const getTransactionIcon = (transaction: Transaction) => {
    const category = sampleCategories.find(cat => cat.name === transaction.category);
    return category?.icon || (transaction.type === 'income' ? '💰' : '💸');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: colors.gray[900] }}>
          Transaction History
        </h1>
        <p className="text-sm mt-1" style={{ color: colors.gray[600] }}>
          View and manage your financial transactions
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                borderColor: colors.gray[300],
                backgroundColor: colors.white,
              }}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
              Type
            </label>
            <Dropdown
              options={typeOptions}
              value={filters.type || 'all'}
              onChange={(value) => setFilters(prev => ({ ...prev, type: value as FilterOptions['type'] }))}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
              Category
            </label>
            <Dropdown
              options={categoryOptions}
              value={filters.category || ''}
              onChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}
              searchable
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
              Date Range
            </label>
            <div className="flex space-x-2">
              <DatePicker
                value={filters.dateRange?.start || null}
                onChange={(date) =>
                  setFilters(prev => ({
                    ...prev,
                    dateRange: date
                      ? { start: date, end: prev.dateRange?.end || date }
                      : undefined,
                  }))
                }
                placeholder="Start date"
              />
              <DatePicker
                value={filters.dateRange?.end || null}
                onChange={(date) =>
                  setFilters(prev => ({
                    ...prev,
                    dateRange: prev.dateRange?.start && date
                      ? { start: prev.dateRange.start, end: date }
                      : undefined,
                  }))
                }
                placeholder="End date"
                minDate={filters.dateRange?.start}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.search || filters.type !== 'all' || filters.category || filters.dateRange) && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.gray[200] }}>
            <button
              onClick={() => {
                setFilters({ type: 'all', search: '' });
                setCurrentPage(1);
              }}
              className="text-sm px-3 py-1 rounded-md transition-colors"
              style={{
                color: colors.primary[600],
                backgroundColor: colors.primary[50],
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Card>

      {/* Transaction Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: colors.gray[50] }}>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 font-medium text-sm"
                    style={{ color: colors.gray[700] }}
                  >
                    <span>Date</span>
                    {getSortIcon('date')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="font-medium text-sm" style={{ color: colors.gray[700] }}>
                    Description
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center space-x-1 font-medium text-sm"
                    style={{ color: colors.gray[700] }}
                  >
                    <span>Category</span>
                    {getSortIcon('category')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center justify-end space-x-1 font-medium text-sm w-full"
                    style={{ color: colors.gray[700] }}
                  >
                    <span>Amount</span>
                    {getSortIcon('amount')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className="font-medium text-sm" style={{ color: colors.gray[700] }}>
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.gray[200] }}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm" style={{ color: colors.gray[900] }}>
                      {formatDate(transaction.date)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTransactionIcon(transaction)}</span>
                      <span className="text-sm font-medium" style={{ color: colors.gray[900] }}>
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" size="sm">
                      {transaction.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      )}
                      style={{
                        color: transaction.type === 'income' ? colors.success[600] : colors.danger[600],
                      }}
                    >
                      {transaction.type === 'income' ? '+' : ''}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="text-sm px-3 py-1 rounded-md transition-colors"
                      style={{
                        color: colors.primary[600],
                        backgroundColor: colors.primary[50],
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-medium mb-2" style={{ color: colors.gray[900] }}>
              No transactions found
            </h3>
            <p className="text-sm" style={{ color: colors.gray[600] }}>
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: colors.gray[200] }}>
            <div className="text-sm" style={{ color: colors.gray[600] }}>
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTransactions.length)} of{' '}
              {filteredAndSortedTransactions.length} transactions
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-md border transition-colors disabled:opacity-50"
                style={{
                  borderColor: colors.gray[300],
                  backgroundColor: colors.white,
                  color: colors.gray[700],
                }}
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm" style={{ color: colors.gray[600] }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-md border transition-colors disabled:opacity-50"
                style={{
                  borderColor: colors.gray[300],
                  backgroundColor: colors.white,
                  color: colors.gray[700],
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Transaction Detail Modal */}
      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
        size="medium"
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{getTransactionIcon(selectedTransaction)}</span>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: colors.gray[900] }}>
                  {selectedTransaction.description}
                </h3>
                <p className="text-sm" style={{ color: colors.gray[600] }}>
                  {formatDate(selectedTransaction.date)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>
                  Amount
                </label>
                <span
                  className={cn(
                    'text-lg font-semibold',
                    selectedTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  )}
                  style={{
                    color: selectedTransaction.type === 'income' ? colors.success[600] : colors.danger[600],
                  }}
                >
                  {selectedTransaction.type === 'income' ? '+' : ''}
                  {formatCurrency(Math.abs(selectedTransaction.amount))}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>
                  Type
                </label>
                <Badge
                  variant={selectedTransaction.type === 'income' ? 'success' : 'danger'}
                  size="sm"
                >
                  {selectedTransaction.type === 'income' ? 'Income' : 'Expense'}
                </Badge>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>
                  Category
                </label>
                <Badge variant="secondary" size="sm">
                  {selectedTransaction.category}
                </Badge>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>
                  Account
                </label>
                <span className="text-sm" style={{ color: colors.gray[900] }}>
                  {selectedTransaction.account}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};