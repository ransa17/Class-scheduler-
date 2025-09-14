import React, { useState } from 'react';

function TeacherInput({ onNext }) {
  // default teacher assignment 
  const [teachers, setTeachers] = useState({
    T1: { name: 'Alice', subjects: ['ML','MWC'] },
    T2: { name: 'Bob', subjects: ['CN'] },
    T3: { name: 'Charlie', subjects: ['CD'] },
    T4: { name: 'Diana', subjects: ['ML', 'SC', 'MWC'] },
    // multi-subject teacher
  });
  
  return (
    <div className="step-card">
      <h2>Input teacher data with subject expertise</h2>
      <pre>{JSON.stringify(teachers, null, 2)}</pre>
      <button onClick={() => onNext(teachers)}>Next</button>
      
    </div>
  );
}

export default TeacherInput;
