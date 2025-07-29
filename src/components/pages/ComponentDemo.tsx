import React, { useState } from 'react';
import { Card, Badge, Modal, Dropdown, DatePicker } from '../ui';
import { colors } from '../../theme/tokens';
import { TransactionHistory } from './TransactionHistory';

export const ComponentDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<'demo' | 'transactions'>('demo');

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1', icon: '🎯' },
    { value: 'option2', label: 'Option 2', icon: '⭐' },
    { value: 'option3', label: 'Option 3', icon: '🚀', group: 'Group A' },
    { value: 'option4', label: 'Option 4', icon: '💎', group: 'Group A' },
    { value: 'option5', label: 'Option 5', icon: '🔥', group: 'Group B' },
    { value: 'option6', label: 'Disabled Option', disabled: true },
  ];

  if (currentView === 'transactions') {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: colors.gray[50] }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('demo')}
              className="px-4 py-2 text-sm rounded-md transition-colors"
              style={{
                backgroundColor: colors.primary[100],
                color: colors.primary[700],
              }}
            >
              ← Back to Component Demo
            </button>
          </div>
          <TransactionHistory />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.gray[50] }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <Card>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.gray[900] }}>
              Money Mosaic Components
            </h1>
            <p className="text-lg" style={{ color: colors.gray[600] }}>
              A showcase of the core UI components and Transaction History screen
            </p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => setCurrentView('transactions')}
                className="px-6 py-2 rounded-md font-medium transition-colors"
                style={{
                  backgroundColor: colors.primary[600],
                  color: colors.white,
                }}
              >
                View Transaction History
              </button>
            </div>
          </div>
        </Card>

        {/* Badge Components */}
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray[900] }}>
            Badge Component
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Variants
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Modal Component */}
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray[900] }}>
            Modal Component
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Modal Sizes
              </h3>
              <div className="flex space-x-2">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setModalSize(size as any);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 text-sm rounded-md border transition-colors"
                    style={{
                      borderColor: colors.gray[300],
                      backgroundColor: colors.white,
                      color: colors.gray[700],
                    }}
                  >
                    Open {size} modal
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Dropdown Component */}
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray[900] }}>
            Dropdown Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Basic Dropdown
              </h3>
              <Dropdown
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Select an option..."
              />
              {dropdownValue && (
                <p className="mt-2 text-sm" style={{ color: colors.gray[600] }}>
                  Selected: {dropdownOptions.find(opt => opt.value === dropdownValue)?.label}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Searchable Dropdown
              </h3>
              <Dropdown
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Search options..."
                searchable
              />
            </div>
          </div>
        </Card>

        {/* DatePicker Component */}
        <Card>
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray[900] }}>
            DatePicker Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                Basic DatePicker
              </h3>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Select a date..."
              />
              {selectedDate && (
                <p className="mt-2 text-sm" style={{ color: colors.gray[600] }}>
                  Selected: {selectedDate.toLocaleDateString()}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: colors.gray[700] }}>
                DatePicker with Constraints
              </h3>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="Future dates only..."
                minDate={new Date()}
              />
            </div>
          </div>
        </Card>

        {/* Card Component Variations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card shadow="sm" padding="sm">
            <h3 className="font-medium mb-2" style={{ color: colors.gray[900] }}>Small Card</h3>
            <p className="text-sm" style={{ color: colors.gray[600] }}>
              Small padding, small shadow
            </p>
          </Card>
          <Card shadow="md" padding="md">
            <h3 className="font-medium mb-2" style={{ color: colors.gray[900] }}>Medium Card</h3>
            <p className="text-sm" style={{ color: colors.gray[600] }}>
              Medium padding, medium shadow
            </p>
          </Card>
          <Card shadow="lg" padding="lg">
            <h3 className="font-medium mb-2" style={{ color: colors.gray[900] }}>Large Card</h3>
            <p className="text-sm" style={{ color: colors.gray[600] }}>
              Large padding, large shadow
            </p>
          </Card>
        </div>
      </div>

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${modalSize} Modal Example`}
        size={modalSize}
      >
        <div className="space-y-4">
          <p style={{ color: colors.gray[700] }}>
            This is a {modalSize} modal demonstrating the modal component functionality.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: colors.gray[900] }}>Features:</p>
            <ul className="text-sm space-y-1" style={{ color: colors.gray[600] }}>
              <li>• Click outside to close</li>
              <li>• Press ESC to close</li>
              <li>• Click X button to close</li>
              <li>• Smooth animations</li>
              <li>• Proper focus management</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm rounded-md border transition-colors"
              style={{
                borderColor: colors.gray[300],
                backgroundColor: colors.white,
                color: colors.gray[700],
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm rounded-md transition-colors"
              style={{
                backgroundColor: colors.primary[600],
                color: colors.white,
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};