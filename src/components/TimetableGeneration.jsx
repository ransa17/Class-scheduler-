import React, { useState, useEffect } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS_PER_DAY = 4;

function TimetableGeneration({ classData, teacherData, onNext }) {
  const [classSchedules, setClassSchedules] = useState({});
  const [unassignedSubjects, setUnassignedSubjects] = useState([]);

  useEffect(() => {
    if (!classData || classData.length === 0 || !teacherData || teacherData.length === 0) {
      setClassSchedules({});
      setUnassignedSubjects([]);
      return;
    }

    const newClassSchedules = {};
    const teacherAvailability = {};
    
    DAYS.forEach(day => {
      teacherAvailability[day] = Array(PERIODS_PER_DAY).fill(null).map(() => new Set());
    });

    const classKeys = classData.map(cls => cls.className);
    classKeys.forEach(cls => {
      newClassSchedules[cls] = {};
      DAYS.forEach(day => {
        newClassSchedules[cls][day] = Array(PERIODS_PER_DAY).fill(null);
      });
    });

    const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

    // --- More Robust Timetable Generation Algorithm ---
    const allSubjectsToSchedule = [];
    classData.forEach(cls => {
      cls.subjects.forEach(subject => {
        for (let i = 0; i < subject.lecturesPerWeek; i++) {
          allSubjectsToSchedule.push({
            className: cls.className,
            subjectName: subject.name,
          });
        }
      });
    });
    
    // Sort subjects by number of lectures to prioritize
    allSubjectsToSchedule.sort((a, b) => {
      const aLectures = classData.find(c => c.className === a.className)?.subjects.find(s => s.name === a.subjectName)?.lecturesPerWeek || 0;
      const bLectures = classData.find(c => c.className === b.className)?.subjects.find(s => s.name === b.subjectName)?.lecturesPerWeek || 0;
      return bLectures - aLectures;
    });

    const unscheduled = [];
    shuffle(allSubjectsToSchedule).forEach(item => {
      const { className, subjectName } = item;
      let slotFound = false;
      const shuffledDays = shuffle([...DAYS]);
      
      for (const day of shuffledDays) {
        const shuffledPeriods = shuffle([...Array(PERIODS_PER_DAY).keys()]);
        for (const period of shuffledPeriods) {
          // Find the teacher once and store it
          const teacherObj = teacherData.find(t => t.subjects.includes(subjectName));
          const isTeacherAvailable = teacherObj && !teacherAvailability[day][period].has(teacherObj.name);
          const isSlotFree = !newClassSchedules[className][day][period];
          
          if (isTeacherAvailable && isSlotFree) {
            newClassSchedules[className][day][period] = { subject: subjectName, teacher: teacherObj.name };
            teacherAvailability[day][period].add(teacherObj.name);
            slotFound = true;
            break;
          }
        }
        if (slotFound) break;
      }
      if (!slotFound) {
        unscheduled.push(item);
      }
    });

    // Fill any remaining empty slots with 'Free' periods
    classKeys.forEach(cls => {
      DAYS.forEach(day => {
        newClassSchedules[cls][day] = newClassSchedules[cls][day].map(entry => 
          entry === null ? { subject: 'Free', teacher: '' } : entry
        );
      });
    });
    
    setClassSchedules(newClassSchedules);
    setUnassignedSubjects(unscheduled);
  }, [classData, teacherData]);

  const handleNext = () => {
    const formatted = {};
    const classKeys = Object.keys(classSchedules);
    classKeys.forEach(cls => {
      formatted[cls] = {};
      DAYS.forEach(day => {
        formatted[cls][day] = classSchedules[cls][day].map(
          ({ subject, teacher }) =>
            subject === 'Free' ? 'Free' : `${subject} by ${teacher}`
        );
      });
    });

    onNext(formatted);
  };
  
  const tableContainerStyle = {
    marginBottom: '3rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '12px 15px',
    border: '1px solid #ddd',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    whiteSpace: 'nowrap',
  };

  const headerStyle = {
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px',
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

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  };
  
  const classKeys = Object.keys(classSchedules);

  if (classKeys.length === 0) {
    return (
      <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", textAlign: 'center', padding: '50px' }}>
        <h2>Timetable Generation</h2>
        <p>Please go back and input class and teacher data to generate the timetable.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", maxWidth: '100%', margin: 'auto', padding: '20px' }}>
      <h2 style={headerStyle}>Optimized Weekly Timetable</h2>
      {unassignedSubjects.length > 0 && (
        <div style={{ ...cardStyle, backgroundColor: '#fff3cd', border: '1px solid #ffeeba', color: '#856404' }}>
          <h4 style={{ margin: 0 }}>⚠️ {unassignedSubjects.length} subjects could not be scheduled.</h4>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>You may need to adjust your class/teacher data to fit all lectures.</p>
        </div>
      )}
      {classKeys.map(cls => (
        <div key={cls} style={tableContainerStyle}>
          <h3 style={{ padding: '15px', backgroundColor: '#f0f0f0', margin: 0, borderBottom: '1px solid #ddd', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
            Class {cls}
          </h3>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ ...thStyle, borderTopLeftRadius: '8px', backgroundColor: '#e9ecef', color: '#333' }}>Day / Period</th>
                {[...Array(PERIODS_PER_DAY)].map((_, idx) => (
                  <th key={idx} style={thStyle}>Period {idx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, dayIndex) => (
                <tr key={day} style={{ backgroundColor: dayIndex % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                  <td style={{ ...tdStyle, fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>{day}</td>
                  {classSchedules[cls][day].map((entry, idx) => (
                    <td key={idx} style={tdStyle}>
                      {entry.subject === 'Free'
                        ? 'Free'
                        : <><span style={{ fontWeight: 'bold' }}>{entry.subject}</span><br/><span style={{ fontSize: '0.9em', color: '#6c757d' }}>{entry.teacher}</span></>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={handleNext} style={buttonStyle}>
          Finalize Timetable
        </button>
      </div>
    </div>
  );
}

export default TimetableGeneration;