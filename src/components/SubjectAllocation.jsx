import React from 'react';

function SubjectAllocation({ classData, teacherData, matrix, onNext }) {
  // Assign the first available teacher for each subject
  let allocation = {};
  Object.entries(classData).forEach(([cls, subjects]) => {
    allocation[cls] = {};
    subjects.forEach(sub => {
      // Find the first teacher who teaches this subject
      let teacherEntry = Object.entries(teacherData).find(
        ([, val]) => val.subjects.includes(sub)
      );
      allocation[cls][sub] = teacherEntry ? teacherEntry[0] : 'Unassigned'; // Save teacher code
    });
  });

  return (
    <div className="step-card">
      <h2>Subject Allocation</h2>
      <pre>{JSON.stringify(allocation, null, 2)}</pre>
      <button onClick={() => onNext(allocation)}>Next</button>
    </div>
  );
}

export default SubjectAllocation;
