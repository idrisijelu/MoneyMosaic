import React, { useState, useRef, useEffect } from 'react';
import { cn, formatDate } from '../../utils';
import { colors, borderRadius, shadows, zIndex } from '../../theme/tokens';
import type { DatePickerProps } from '../../types';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date...',
  disabled = false,
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setFullYear(newMonth.getFullYear() - 1);
    } else {
      newMonth.setFullYear(newMonth.getFullYear() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!value) return false;
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div ref={pickerRef} className="relative">
      {/* Input */}
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
        <span
          className={cn(
            value ? 'text-gray-900' : 'text-gray-500'
          )}
        >
          {value ? formatDate(value) : placeholder}
        </span>
        <svg
          className="w-4 h-4"
          style={{ color: colors.gray[400] }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Calendar */}
      {isOpen && (
        <div
          className="absolute mt-1 p-4 border"
          style={{
            backgroundColor: colors.white,
            borderColor: colors.gray[200],
            borderRadius: borderRadius.md,
            boxShadow: shadows.lg,
            zIndex: zIndex.dropdown,
            width: '280px',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateYear('prev')}
                className="p-1 hover:bg-gray-100 rounded"
                style={{ color: colors.gray[600] }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-100 rounded"
                style={{ color: colors.gray[600] }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="font-medium" style={{ color: colors.gray[900] }}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-100 rounded"
                style={{ color: colors.gray[600] }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigateYear('next')}
                className="p-1 hover:bg-gray-100 rounded"
                style={{ color: colors.gray[600] }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div
                key={day}
                className="text-center text-xs font-medium py-2"
                style={{ color: colors.gray[500] }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div key={index} className="text-center">
                {date ? (
                  <button
                    onClick={() => handleDateSelect(date)}
                    disabled={isDateDisabled(date)}
                    className={cn(
                      'w-8 h-8 text-sm rounded transition-colors',
                      isDateSelected(date)
                        ? 'bg-blue-500 text-white'
                        : isDateDisabled(date)
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-gray-100 text-gray-700'
                    )}
                    style={{
                      backgroundColor: isDateSelected(date) ? colors.primary[500] : undefined,
                      color: isDateSelected(date) 
                        ? colors.white 
                        : isDateDisabled(date) 
                        ? colors.gray[300] 
                        : colors.gray[700]
                    }}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};