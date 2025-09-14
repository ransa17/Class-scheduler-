import React, { useState } from 'react';
import './App.css';
import WorkflowStepper from './components/WorkflowStepper';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Timetable Management Workflow</h1>
      </header>
      <WorkflowStepper />
    </div>
  );
}

export default App;
