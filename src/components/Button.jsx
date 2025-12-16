import React from 'react';

// simple button
const Button = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
