
import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';

import './styles.css'; // Relative path to the CSS file

// import './JobAnalysis.css'; // For styling

const JobAnalysis = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    location: '',
    salary: '',
    postingDate: '',
    applicants: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const getAverageSalary = async (jobTitle, location) => {
  try {
    const promptContent = `What is the average salary for a ${jobTitle} in ${location}? Provide only the numeric value. Do not include any symbols, or words.`;

    console.log("Sending Prompt to Proxy:", promptContent);

    const response = await fetch(
      "https://us-central1-ghost-job-proxy-f33da.cloudfunctions.net/geminiProxy",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptContent }),
      }
    );

    const data = await response.json();
    console.log("Proxy API Result:", data);

    const salaryString = data?.text?.trim() ?? "";
    const averageSalary = parseFloat(salaryString);

    if (isNaN(averageSalary)) {
      throw new Error("Could not parse a numeric salary from Gemini response.");
    }

    return averageSalary;
  } catch (error) {
    console.error("Proxy API error:", error);
    throw new Error("Failed to retrieve salary information.");
  }
};



  const calculateRisk = (salary, averageSalary, applicants, postingDate) => {
    let risk = 'low';
    let reasons = [];
   
    const parsedSalary = typeof salary === 'string' ? parseFloat(salary) : salary;
    const parsedApplicants = typeof applicants === 'string' ? parseInt(applicants) : applicants;


    if (averageSalary !== null && !isNaN(parsedSalary)) {
      const salaryDifference = (averageSalary - parsedSalary) / averageSalary;
      if (salaryDifference > 0.3 || parsedSalary === 0) {
        risk = 'high';
        reasons.push(`Salary is more than 30% lower than the average, this is a red flag 🚩(${(salaryDifference * 100).toFixed(2)}%)`);
      }
    }

      if ( parsedSalary === 0) {
        risk = 'high';
        reasons.push(`Salary was not listed, this is a red flag 🚩`);
      }
    


    if (!isNaN(parsedApplicants)) {
      if (parsedApplicants > 250) {
        risk = 'high';
        reasons.push('More than 250 applicants, this is a red flag 🚩');
      }
    }


    if (postingDate) {
      const postDate = new Date(postingDate);
      const today = new Date();
      const diffInDays = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
      if (diffInDays > 30) {
        risk = 'high';
        reasons.push('Job posting is over 30 days old, this is a red flag 🚩');
      }
    }


    if (risk === 'low' && reasons.length > 0) {
      risk = 'medium';
    }


    return { risk, reasons };
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setJobDetails(prev => ({
    ...prev,
    [name]: value
  }));
};
  const analyzeJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
   
    try {
      const { jobTitle, location, salary, postingDate, applicants } = jobDetails;
      const averageSalary = await getAverageSalary(jobTitle, location);
      const { risk, reasons } = calculateRisk(salary, averageSalary, applicants, postingDate);
     
      let resultText = `Risk: ${risk}. `;
      if (reasons.length > 0) {
        resultText += `Reasons: ${reasons.join(', ')}`;
      } else {
        resultText += "No significant risks detected. 🟢";
      }
     
      setAnalysisResult({
        text: resultText,
        riskLevel: risk
      });
    } catch (err) {
      setError(err.message);
      setAnalysisResult({
        text: `Error: ${err.message}`,
        riskLevel: 'error'
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="job-analysis-container">
      <h2>Job Posting Risk Analyzer</h2>
      <form onSubmit={analyzeJob}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={jobDetails.salary}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <div className="form-group">
          <label>Posting Date:</label>
          <input
            type="date"
            name="postingDate"
            value={jobDetails.postingDate}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <div className="form-group">
          <label>Number of Applicants:</label>
          <input
            type="number"
            name="applicants"
            value={jobDetails.applicants}
            onChange={handleInputChange}
            required
          />
        </div>
       
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Job'}
        </button>
      </form>
     
      {analysisResult && (
        <div className={`result-box risk-${analysisResult.riskLevel}`}>
          <h3>Analysis Result:</h3>
          <p>{analysisResult.text}</p>
        </div>
      )}
     
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};


export default JobAnalysis;











const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<JobAnalysis />);
}

console.log("Popup script started");