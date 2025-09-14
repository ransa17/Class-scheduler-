import React from 'react';

function TimetableMatrix({ classData, teacherData, onNext }) {
  //  matrix is just a placeholder
  const matrix = {
    classes: Object.keys(classData),
    teachers: Object.keys(teacherData),
    periods: ['P1', 'P2', 'P3', 'P4', 'P5'],
  };

  return (
    <div className="step-card">
      <h2>Initialize timetable matrix</h2>
      <pre>{JSON.stringify(matrix, null, 2)}</pre>
      <button onClick={() => onNext(matrix)}>Next</button>
    </div>
  );
}

export default TimetableMatrix;
