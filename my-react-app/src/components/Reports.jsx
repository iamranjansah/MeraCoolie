// src/components/Reports.jsx
import React from "react";

const Reports = () => {
  const generateReport = () => {
    alert("Generating report...");
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Generate Reports</h3>
      <button
        onClick={generateReport}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Generate Revenue Report
      </button>
    </div>
  );
};

export default Reports;
