import React from 'react';

const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Spinner;