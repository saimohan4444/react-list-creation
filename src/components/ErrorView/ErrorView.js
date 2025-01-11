import React from 'react';
import './ErrorView.css';

const ErrorView = ({ onRetry }) => (
  <div className="error-view-container">
    <p>Something went wrong. Please try again.</p>
    <button className="retry-button" onClick={onRetry}>Try Again</button>
  </div>
);

export default ErrorView;
