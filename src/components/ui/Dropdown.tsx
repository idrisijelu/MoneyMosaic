import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { colors, borderRadius, shadows, zIndex } from '../../theme/tokens';
import type { DropdownOption } from '../../types';

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchable = false,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group options by group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, DropdownOption[]>);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get selected option for display
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && searchable) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const renderOption = (option: DropdownOption) => (
    <div
      key={option.value}
      className={cn(
        'flex items-center px-3 py-2 cursor-pointer transition-colors',
        option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
        value === option.value && 'bg-blue-50'
      )}
      style={{
        color: option.disabled ? colors.gray[400] : colors.gray[700],
        backgroundColor: value === option.value ? colors.primary[50] : undefined,
      }}
      onClick={() => !option.disabled && handleOptionSelect(option.value)}
    >
      {option.icon && (
        <span className="mr-2 text-gray-400">{option.icon}</span>
      )}
      <span>{option.label}</span>
    </div>
  );

  const renderGroupedOptions = () => {
    if (searchable && searchTerm) {
      return filteredOptions.map(renderOption);
    }

    return Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
      <div key={groupName}>
        {groupName !== 'default' && (
          <div
            className="px-3 py-2 text-xs font-medium uppercase tracking-wide"
            style={{ color: colors.gray[500], backgroundColor: colors.gray[50] }}
          >
            {groupName}
          </div>
        )}
        {groupOptions.map(renderOption)}
      </div>
    ));
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2 border cursor-pointer transition-colors',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          isOpen ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'
        )}
        style={{
          backgroundColor: disabled ? colors.gray[50] : colors.white,
          borderColor: isOpen ? colors.primary[500] : colors.gray[300],
          borderRadius: borderRadius.md,
        }}
        onClick={handleToggle}
      >
        <div className="flex items-center flex-1">
          {selectedOption?.icon && (
            <span className="mr-2 text-gray-400">{selectedOption.icon}</span>
          )}
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={cn(
                selectedOption ? 'text-gray-900' : 'text-gray-500'
              )}
            >
              {selectedOption?.label || placeholder}
            </span>
          )}
        </div>
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen ? 'rotate-180' : ''
          )}
          style={{ color: colors.gray[400] }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute w-full mt-1 border max-h-60 overflow-auto"
          style={{
            backgroundColor: colors.white,
            borderColor: colors.gray[200],
            borderRadius: borderRadius.md,
            boxShadow: shadows.lg,
            zIndex: zIndex.dropdown,
          }}
        >
          {filteredOptions.length === 0 ? (
            <div
              className="px-3 py-2 text-center"
              style={{ color: colors.gray[500] }}
            >
              No options found
            </div>
          ) : (
            renderGroupedOptions()
          )}
        </div>
      )}
    </div>
  );
};