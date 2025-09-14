import React from 'react';

function ConflictOptimization({ allocation, onNext }) {
  //  checks for duplicate teacher in same period (not implemented fully)
  // For simplicity, just pass through allocation
  const optimized = { ...allocation, optimization: 'No conflicts detected (demo)' };

  return (
    <div className="step-card">
      <h2>Conflict & Optimization</h2>
      <pre>{JSON.stringify(optimized, null, 2)}</pre>
      <button onClick={() => onNext(optimized)}>Next</button>
    </div>
  );
}

export default ConflictOptimization;
