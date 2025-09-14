import React, { useState } from 'react';

function TeacherInput({ onNext }) {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Alice', subjects: ['ML', 'MWC'] },
    { id: 2, name: 'Bob', subjects: ['CN'] },
    { id: 3, name: 'Charlie', subjects: ['CD'] },
    { id: 4, name: 'Diana', subjects: ['ML', 'SC', 'MWC'] },
  ]);

  const handleTeacherChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...teachers];
    list[index][name] = value;
    setTeachers(list);
  };
  
  const handleSubjectChange = (teacherIndex, subjectIndex, event) => {
    const { value } = event.target;
    const list = [...teachers];
    list[teacherIndex].subjects[subjectIndex] = value;
    setTeachers(list);
  };

  const handleAddTeacher = () => {
    setTeachers([...teachers, { id: Date.now(), name: '', subjects: [''] }]);
  };

  const handleRemoveTeacher = (index) => {
    const list = [...teachers];
    list.splice(index, 1);
    setTeachers(list);
  };

  const handleAddSubject = (index) => {
    const list = [...teachers];
    list[index].subjects = [...list[index].subjects, ''];
    setTeachers(list);
  };

  const handleRemoveSubject = (teacherIndex, subjectIndex) => {
    const list = [...teachers];
    list[teacherIndex].subjects.splice(subjectIndex, 1);
    setTeachers(list);
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
      <h2 style={headingStyle}>Input Teacher Data with Subject Expertise</h2>
      {teachers.map((teacher, teacherIndex) => (
        <div key={teacher.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, color: '#555' }}>Teacher {teacherIndex + 1}</h3>
            <button
              onClick={() => handleRemoveTeacher(teacherIndex)}
              style={dangerButtonStyle}
            >
              Remove Teacher
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Teacher Name</label>
            <input
              name="name"
              placeholder="Teacher Name"
              value={teacher.name}
              onChange={(e) => handleTeacherChange(teacherIndex, e)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Subjects</label>
            {teacher.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => handleSubjectChange(teacherIndex, subjectIndex, e)}
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button
                  onClick={() => handleRemoveSubject(teacherIndex, subjectIndex)}
                  style={{ ...dangerButtonStyle, marginLeft: '10px', padding: '8px 12px' }}
                >
                  -
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddSubject(teacherIndex)}
              style={{ ...secondaryButtonStyle, marginTop: '5px' }}
            >
              Add Subject
            </button>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleAddTeacher} style={primaryButtonStyle}>
          Add Teacher
        </button>
        <button onClick={() => onNext(teachers)}>Next</button>
      </div>
    </div>
  );
}

export default TeacherInput;