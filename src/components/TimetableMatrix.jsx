import React from 'react';

function TimetableMatrix({ classData, teacherData, onNext }) {
  
  const classes = classData.map(c => c.className);
  const teachers = teacherData.map(t => t.name);
  const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']; 

  const matrix = {
    classes,
    teachers,
    periods,
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px',
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '12px 15px',
    border: '1px solid #ddd',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", maxWidth: '90%', margin: 'auto', padding: '20px' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
        Initialize Timetable Matrix
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, borderTopLeftRadius: '8px' }}>Period</th>
            {classes.map((cls, index) => (
              <th key={index} style={thStyle}>{cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period, periodIndex) => (
            <tr key={periodIndex} style={periodIndex % 2 === 0 ? evenRowStyle : null}>
              <td style={tdStyle}>{period}</td>
              {classes.map((cls, classIndex) => (
                <td key={classIndex} style={tdStyle}>
                 
                  -
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Matrix Summary</h3>
        <pre style={{ margin: 0 }}>
          <p><strong>Classes:</strong> {matrix.classes.join(', ')}</p>
          <p><strong>Teachers:</strong> {matrix.teachers.join(', ')}</p>
          <p><strong>Periods:</strong> {matrix.periods.join(', ')}</p>
        </pre>
      </div>
      <button onClick={() => onNext(matrix)} style={buttonStyle}>
        Next
      </button>
    </div>
  );
}

export default TimetableMatrix;