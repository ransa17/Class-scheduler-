import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS_PER_DAY = 4;
const MAX_DAYS_PER_SUBJECT = 4;

function TimetableGeneration({ optimized, onNext }) {
  const classKeys = Object.keys(optimized); // ['A', 'B', 'C']
  const classSchedules = {};

  //  teacher availability tracker: day -> period -> set of assigned teachers
  const teacherAvailability = {};
  DAYS.forEach(day => {
    teacherAvailability[day] = Array(PERIODS_PER_DAY).fill(null).map(() => new Set());
  });

  // Subject usage tracker: class -> subject -> days used
  const subjectUsage = {};
  classKeys.forEach(cls => {
    subjectUsage[cls] = {};
    Object.keys(optimized[cls]).forEach(subject => {
      subjectUsage[cls][subject] = 0;
    });
  });

  classKeys.forEach(cls => {
    classSchedules[cls] = {};
    DAYS.forEach(day => {
      classSchedules[cls][day] = Array(PERIODS_PER_DAY).fill(null);
    });
  });

  const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

  // Build schedule
  DAYS.forEach(day => {
    for (let period = 0; period < PERIODS_PER_DAY; period++) {
      classKeys.forEach(cls => {
        const subjects = Object.keys(optimized[cls]);
        const usedSubjectsToday = new Set(classSchedules[cls][day].map(p => p?.subject));
        const availableSubjects = shuffle(subjects).filter(subject => {
          const teacher = optimized[cls][subject];
          return (
            !usedSubjectsToday.has(subject) &&
            subjectUsage[cls][subject] < MAX_DAYS_PER_SUBJECT &&
            !teacherAvailability[day][period].has(teacher)
          );
        });

        let chosen = null;

        for (let subject of availableSubjects) {
          const teacher = optimized[cls][subject];

          // Check if this subject already used today for the class
          if (usedSubjectsToday.has(subject)) continue;

          // Assign
          chosen = { subject, teacher };
          classSchedules[cls][day][period] = chosen;
          subjectUsage[cls][subject] += 1;
          teacherAvailability[day][period].add(teacher);
          break;
        }

        
        if (!chosen) {
          classSchedules[cls][day][period] = { subject: 'Free', teacher: '' };
        }
      });
    }
  });

  const handleNext = () => {
    // Format final timetable
    const formatted = {};
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

  return (
    <div className="step-card">
      <h2>Optimized Weekly Timetable (Subject Diversity + Usage Limits)</h2>
      {classKeys.map(cls => (
        <div key={cls} style={{ marginBottom: '3rem' }}>
          <h3>Class {cls}</h3>
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Day</th>
                {[...Array(PERIODS_PER_DAY)].map((_, idx) => (
                  <th key={idx}>Period {idx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map(day => (
                <tr key={day}>
                  <td><b>{day}</b></td>
                  {classSchedules[cls][day].map((entry, idx) => (
                    <td key={idx}>
                      {entry.subject === 'Free'
                        ? 'Free'
                        : `${entry.subject} by ${entry.teacher}`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default TimetableGeneration;
