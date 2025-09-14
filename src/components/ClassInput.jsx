import React, { useState } from 'react';

function ClassInput({ onNext }) {
  const [classes, setClasses] = useState([
    { id: 1, className: 'A', subjects: [{ name: 'ML', lecturesPerWeek: 3 }, { name: 'PP', lecturesPerWeek: 4 }, { name: 'CN', lecturesPerWeek: 2 }] },
    { id: 2, className: 'B', subjects: [{ name: 'PP', lecturesPerWeek: 4 }, { name: 'CD', lecturesPerWeek: 3 }] },
    { id: 3, className: 'C', subjects: [{ name: 'CD', lecturesPerWeek: 3 }, { name: 'MWC', lecturesPerWeek: 4 }, { name: 'CN', lecturesPerWeek: 2 }] },
  ]);

  const handleClassChange = (index, event) => {
    const { name, value } = event.target;
    const newClasses = [...classes];
    newClasses[index][name] = value;
    setClasses(newClasses);
  };
  
  const handleSubjectChange = (classIndex, subjectIndex, event) => {
    const { name, value } = event.target;
    const newClasses = [...classes];
    newClasses[classIndex].subjects[subjectIndex][name] = value;
    setClasses(newClasses);
  };

  const handleAddClass = () => {
    setClasses([...classes, { id: Date.now(), className: '', subjects: [{ name: '', lecturesPerWeek: 0 }] }]);
  };

  const handleRemoveClass = (index) => {
    const newClasses = [...classes];
    newClasses.splice(index, 1);
    setClasses(newClasses);
  };

  const handleAddSubject = (index) => {
    const newClasses = [...classes];
    newClasses[index].subjects.push({ name: '', lecturesPerWeek: 0 });
    setClasses(newClasses);
  };

  const handleRemoveSubject = (classIndex, subjectIndex) => {
    const newClasses = [...classes];
    newClasses[classIndex].subjects.splice(subjectIndex, 1);
    setClasses(newClasses);
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    marginRight: '10px',
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: '#fff',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  };

  const headingStyle = {
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={headingStyle}>Input Class Data with Subjects</h2>
      {classes.map((classItem, classIndex) => (
        <div key={classItem.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, color: '#555' }}>Class {classItem.className}</h3>
            <button
              onClick={() => handleRemoveClass(classIndex)}
              style={dangerButtonStyle}
            >
              Remove Class
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Class Name</label>
            <input
              type="text"
              name="className"
              placeholder="Class Name"
              value={classItem.className}
              onChange={(e) => handleClassChange(classIndex, e)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Subjects & Lectures per Week</label>
            {classItem.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(classIndex, subjectIndex, e)}
                  style={{ ...inputStyle, marginBottom: 0, flex: 2 }}
                />
                <input
                  type="number"
                  name="lecturesPerWeek"
                  placeholder="Lectures"
                  value={subject.lecturesPerWeek}
                  onChange={(e) => handleSubjectChange(classIndex, subjectIndex, e)}
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                />
                <button
                  onClick={() => handleRemoveSubject(classIndex, subjectIndex)}
                  style={{ ...dangerButtonStyle, marginLeft: '5px', padding: '8px 12px' }}
                >
                  -
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddSubject(classIndex)}
              style={{ ...secondaryButtonStyle, marginTop: '5px' }}
            >
              Add Subject
            </button>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleAddClass} style={primaryButtonStyle}>
          Add Class
        </button>
        <button onClick={() => onNext(classes)} style={primaryButtonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ClassInput;