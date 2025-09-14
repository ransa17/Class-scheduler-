import React, { useState } from 'react';

function ClassInput({ onNext }) {
  // default classes/subjects 
  const [classes, setClasses] = useState({
    A: ['ML', 'PP', 'CN','PP', 'CD', 'MWC'],
    B: ['PP', 'CD', 'MWC'],
    C: ['CD', 'MWC', 'CN'],
  });

  return (
    <div className="step-card">
      <h2>Input class data (A, B, C) with subjects</h2>
      <pre>{JSON.stringify(classes, null, 2)}</pre>
      <button onClick={() => onNext(classes)}>Next</button>
    </div>
  );
}

export default ClassInput;
