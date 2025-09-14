import React, { useState } from 'react';
import ClassInput from './ClassInput';
import TeacherInput from './TeacherInput';
import TimetableGeneration from './TimetableGeneration';
import ReviewApproval from './ReviewApproval';

const steps = [
  'Class Input',
  'Teacher Input',
  'Timetable Generation',
  'Review & Approval',
];

function WorkflowStepper() {
  const [step, setStep] = useState(0);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [generated, setGenerated] = useState({});
  const [reviewed, setReviewed] = useState(null);

  const nextStep = () => setStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 0));

  const stepperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    position: 'relative',
  };

  const lineStyle = {
    position: 'absolute',
    height: '2px',
    backgroundColor: '#e0e0e0',
    width: `calc(100% - ${(100 / steps.length)}%)`,
    top: '15px',
    left: `calc(${(100 / (steps.length * 2))}%)`,
    zIndex: -1,
  };

  const stepItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: `${100 / steps.length}%`,
  };

  const stepNumberStyle = {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: '8px',
    transition: 'background-color 0.3s ease',
  };
  
  const stepActiveStyle = {
    backgroundColor: '#007bff',
  };

  const stepCompletedStyle = {
    backgroundColor: '#28a745',
  };

  const navButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#6c757d',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
      
     
      <div style={stepperStyle}>
        <div style={lineStyle}></div>
        {steps.map((s, index) => (
          <div key={index} style={stepItemStyle}>
            <div
              style={{
                ...stepNumberStyle,
                ...(index === step ? stepActiveStyle : {}),
                ...(index < step ? stepCompletedStyle : {})
              }}
            >
              {index < step ? '✓' : index + 1}
            </div>
            <span style={{ color: index <= step ? '#333' : '#999', fontSize: '0.9em' }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ minHeight: '500px' }}>
        {step === 0 && <ClassInput onNext={data => { setClassData(data); nextStep(); }} />}
        {step === 1 && <TeacherInput onNext={data => { setTeacherData(data); nextStep(); }} />}
        {step === 2 && (
          <TimetableGeneration
            classData={classData}
            teacherData={teacherData}
            onNext={data => { setGenerated(data); nextStep(); }}
          />
        )}
        {step === 3 && (
          <ReviewApproval
            generated={generated}
            onApprove={() => setReviewed('Approved')}
            onSuggest={() => setReviewed('Suggested Rearrangement')}
          />
        )}
        {reviewed && (
          <div style={{...navButtonStyle, backgroundColor: '#28a745', cursor: 'default', color: '#fff', textAlign: 'center'}}>
            <h2>Finalize and Publish Timetable</h2>
            <p>Status: <b>{reviewed}</b></p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {step > 0 && <button onClick={prevStep} style={navButtonStyle}>Previous</button>}
      </div>
    </div>
  );
}

export default WorkflowStepper;