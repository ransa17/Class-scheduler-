import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ReviewApproval({ generated, onApprove, onSuggest }) {
  // Helper to format timetable data for the PDF table
  const getTableData = () => {
    const table = [];
    Object.entries(generated).forEach(([className, periods]) => {
      periods.forEach((period, idx) => {
        table.push([className, `<strong>Period ${idx + 1}</strong>`, period]);
      });
    });
    return table;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Class Timetables', 14, 16);

    doc.autoTable({
      startY: 24,
      head: [['Class', 'Period', 'Details']],
      body: getTableData(),
      theme: 'striped',
      styles: { fontSize: 12 },
      headStyles: { fillColor: [26, 35, 126] }, 
    });

    doc.save('class-timetables.pdf');
  };

  return (
    <div className="step-card">
      <h2>Review & Approval</h2>
      <pre>{JSON.stringify(generated, null, 2)}</pre>
      <button onClick={onApprove}>Approve</button>
      <button onClick={onSuggest}>Suggest Rearrangement</button>
      <button onClick={handleDownloadPDF} style={{marginLeft: '1rem', background: '#2e7d32', color: '#fff'}}>Download PDF</button>
    </div>
  );
}

export default ReviewApproval;
