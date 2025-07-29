import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils';
import { colors, zIndex, borderRadius, shadows } from '../../theme/tokens';
import type { ModalProps } from '../../types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'medium',
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-2xl',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center p-4 modal-overlay',
      )}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: zIndex.modal,
        animation: 'fade-in 0.2s ease-out',
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(
          'w-full transform transition-all duration-200 modal-content',
          sizeClasses[size]
        )}
        style={{
          backgroundColor: colors.white,
          borderRadius: borderRadius.lg,
          boxShadow: shadows.xl,
          animation: 'scale-in 0.2s ease-out',
        }}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: colors.gray[200] }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: colors.gray[900] }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className={cn(
                'p-1 rounded-md transition-colors',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              style={{
                color: colors.gray[400],
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className={cn(title ? 'p-6' : 'p-6')}>
          {children}
        </div>
      </div>

      {/* Add CSS animations via style tag in head */}
      {typeof document !== 'undefined' && !document.getElementById('modal-animations') && (() => {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .modal-overlay {
            animation: fade-in 0.2s ease-out;
          }
          .modal-content {
            animation: scale-in 0.2s ease-out;
          }
        `;
        document.head.appendChild(style);
        return null;
      })()}
    </div>
  );
};