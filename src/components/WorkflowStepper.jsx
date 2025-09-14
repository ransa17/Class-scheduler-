import React, { useState } from 'react';
import ClassInput from './ClassInput';
import TeacherInput from './TeacherInput';
import TimetableMatrix from './TimetableMatrix';
import SubjectAllocation from './SubjectAllocation';
import ConflictOptimization from './ConflictOptimization';
import TimetableGeneration from './TimetableGeneration';
import ReviewApproval from './ReviewApproval';

const steps = [
  'Class Input',
  'Teacher Input',
  'Initialize Timetable Matrix',
  'Subject Allocation',
  'Conflict & Optimization',
  'Timetable Generation',
  'Review & Approval',
];

function WorkflowStepper() {
  const [step, setStep] = useState(0);
  const [classData, setClassData] = useState({});
  const [teacherData, setTeacherData] = useState({});
  const [matrix, setMatrix] = useState({});
  const [allocation, setAllocation] = useState({});
  const [optimized, setOptimized] = useState({});
  const [generated, setGenerated] = useState({});
  const [reviewed, setReviewed] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>
      <div className="workflow-divider" />
      {step === 0 && (
        <ClassInput onNext={data => { setClassData(data); nextStep(); }} />
      )}
      {step === 1 && (
        <TeacherInput onNext={data => { setTeacherData(data); nextStep(); }} />
      )}
      {step === 2 && (
        <TimetableMatrix
          classData={classData}
          teacherData={teacherData}
          onNext={data => { setMatrix(data); nextStep(); }}
        />
      )}
      {step === 3 && (
        <SubjectAllocation
          classData={classData}
          teacherData={teacherData}
          matrix={matrix}
          onNext={data => { setAllocation(data); nextStep(); }}
        />
      )}
      {step === 4 && (
        <ConflictOptimization
          allocation={allocation}
          onNext={data => { setOptimized(data); nextStep(); }}
        />
      )}
      {step === 5 && (
        <TimetableGeneration
          optimized={optimized}
          onNext={data => { setGenerated(data); nextStep(); }}
        />
      )}
      {step === 6 && (
        <ReviewApproval
          generated={generated}
          onApprove={() => setReviewed('Approved')}
          onSuggest={() => setReviewed('Suggested Rearrangement')}
        />
      )}
      {reviewed && (
        <div className="step-card">
          <h2>Finalize and Publish Timetable</h2>
          <p>Status: <b>{reviewed}</b></p>
        </div>
      )}
    </div>
  );
}

export default WorkflowStepper;
