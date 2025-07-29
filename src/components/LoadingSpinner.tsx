import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span>Loading financial data...</span>
    </div>
  );
};

export default LoadingSpinner;