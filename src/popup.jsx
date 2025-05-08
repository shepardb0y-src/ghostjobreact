// import React, { useState, useEffect } from "react";
// import { createRoot } from 'react-dom/client';
// import { GoogleGenAI } from "@google/genai";
// import './styles.css'; // Relative path to the CSS file
// const ai = new GoogleGenAI({ apiKey: "AIzaSyAuzivdEoa9TWnrpdY-xlHFWb0vR2MuJYU" }); // Replace with your actual API key


// function MyPopup() {
//   const [aiResponse, setAiResponse] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     async function fetchAIResponse() {
//       try {
//         const response = await ai.models.generateContent({
//           model: "gemini-2.0-flash",
//           contents: "what  is the average saalry of a Ai engineer in boston MA",
//         });
//         setAiResponse(response);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || "Failed to fetch AI response");
//         setLoading(false);
//       }
//     }


//     fetchAIResponse();
//     console.log(fetchAIResponse)
//   }, []);


//   if (loading) {
//     return <div>Loading AI response...</div>;
//   }


//   if (error) {
//     return <div>Error: {error}</div>;
//   }
 
//   return (
//     <div>
//       <div class="container">
//       {console.log(fetchAIResponse)}
//         <h1>Ghost Job Hunter</h1>
//         <p>Detect potentially fake job postings</p>
//       <div>
       
//         {/* <p>{JSON.stringify(aiResponse)}</p> */}
//       </div>
       
//         <div class="form-group">
//             <label for="jobTitle">Job Title*</label>
//             <input type="text" id="jobTitle" placeholder="e.g., Software/ Engineer" required/>
//         </div>
       
//         <div class="form-group">
//             <label for="location">Location*</label>
//             <input type="text" id="location" placeholder="e.g., San Fran/cisco, CA" required/>
//         </div>
       
//         <div class="form-group">
//             <label for="salary">Posted Salary (optional)</label>
//             <input type="text" id="salary" placeholder="e.g., $120,000"/>
//         </div>
       
//         <div class="form-group">
//             <label for="postingDate">Posting Date (optional)</label>
//             <input type="date" id="postingDate"/>
//         </div>
//         /
//         <div class="form-group">
//             <label for="applicants">Number of Applicants (optional)</label>
//             <input type="number" id="applicants" placeholder="e.g., 250"/>
//         </div>
       
//         <button id="checkButton">Analyze Job Posting</button>
       
//         <div id="result"></div>
//     </div>
   
//     </div>
//   );
// }


// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = createRoot(rootElement);
//   root.render(<MyPopup />);
// }
// console.log("Popup script started");
import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import './styles.css'; // Relative path to the CSS file
const ai = new GoogleGenAI({ apiKey: "AIzaSyAuzivdEoa9TWnrpdY-xlHFWb0vR2MuJYU" }); // Replace with your actual API key
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


  // Initialize Gemini API (move to env variable in production)
  const API_KEY = 'AIzaSyAuzivdEoa9TWnrpdY-xlHFWb0vR2MuJYU';
  // const genAI = new GoogleGenerAI(API_KEY);
  const genAI = new GoogleGenAI({ apiKey: "AIzaSyAuzivdEoa9TWnrpdY-xlHFWb0vR2MuJYU" }); // Replace with your actual API key
  // const model = genAI.models({ model: 'gemini-2.0-flash' });
 

  // const response = await ai.models.generateContent({
  //   //           model: "gemini-2.0-flash",
  //   //           contents: "what  is the average saalry of a Ai engineer in boston MA",
  //   //         });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({ ...prev, [name]: value }));
  };


  // const getAverageSalary = async (jobTitle, location) => {
  //   try {
  //     // const contents = `What is the average salary for a ${jobTitle} in ${location}? Provide only the numeric value. Do not include any symbols, or words.`;
  //     // const result = await model.generateContent(prompt);
  //     const result = await ai.models.generateContent({
  //             model: "gemini-2.0-flash",
  //             contents: `What is the average salary for a ${jobTitle} in ${location}? Provide only the numeric value. Do not include any symbols, or words.`,
  //           });
  //     const response = result;
  //     // return parseFloat(response.text());
  //     return console.log(response,jobTitle,location)
  //   } catch (error) {
  //     console.error('Gemini API error:', error);

  //     throw new Error("Failed to retrieve salary information.");
  //   }
  // };
  // const getAverageSalary = async (jobTitle, location) => {
  //   try {
  //     const result = await ai.models.generateContent({
  //       model: "gemini-2.0-flash",
  //       contents: `What is the average salary for a ${jobTitle} in ${location}? Provide only the numeric value. Do not include any symbols, or words.`,
  //     });
  //     console.log("Gemini API Result:", result); // For debugging
  
  //     if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
  //       const text = result.candidates[0].content.parts[0].text.trim(); // Trim any extra whitespace
  //       return parseFloat(text);
  //     } else {
  //       console.warn("Unexpected API response structure:", result);
  //       throw new Error("Failed to parse salary information from the response.");
  //     }
  //   } catch (error) {
  //     console.error('Gemini API error:', error);
  //     throw new Error("Failed to retrieve salary information.");
  //   }
  // };
  const getAverageSalary = async (jobTitle, location) => {
    try {
      const promptContent = `What is the average salary for a ${jobTitle} in ${location}? Provide only the numeric value. Do not include any symbols, or words.`;
      console.log("Sending Prompt:", promptContent); // Log the prompt
  
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: promptContent,
      });
      console.log("Gemini API Result:", result); // For debugging
  
      if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text.trim();
        return parseFloat(text);
      } else {
        console.warn("Unexpected API response structure:", result);
        throw new Error("Failed to parse salary information from the response.");
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error("Failed to retrieve salary information.");
    }
  };
  
  // // Example usage for a cook in Boston:
  // getAverageSalary("cook", "Boston, Massachusetts")
  //   .then(salary => console.log("Average Salary for a cook in Boston:", salary))
  //   .catch(error => console.error(error));
  // // Example usage:
  // getAverageSalary("Software Engineer", "Randolph, Massachusetts")
  //   .then(salary => console.log("Average Salary:", salary))
  //   .catch(error => console.error(error));

  const calculateRisk = (salary, averageSalary, applicants, postingDate) => {
    let risk = 'low';
    let reasons = [];
   
    const parsedSalary = typeof salary === 'string' ? parseFloat(salary) : salary;
    const parsedApplicants = typeof applicants === 'string' ? parseInt(applicants) : applicants;


    if (averageSalary !== null && !isNaN(parsedSalary)) {
      const salaryDifference = (averageSalary - parsedSalary) / averageSalary;
      if (salaryDifference > 0.3) {
        risk = 'high';
        reasons.push(`Salary is more than 30% lower than the average (${(salaryDifference * 100).toFixed(2)}%)`);
      }
    }


    if (!isNaN(parsedApplicants)) {
      if (parsedApplicants > 250) {
        risk = 'high';
        reasons.push('More than 250 applicants');
      }
    }


    if (postingDate) {
      const postDate = new Date(postingDate);
      const today = new Date();
      const diffInDays = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
      if (diffInDays > 30) {
        risk = 'high';
        reasons.push('Job posting is over 30 days old');
      }
    }


    if (risk === 'low' && reasons.length > 0) {
      risk = 'medium';
    }


    return { risk, reasons };
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
        resultText += "No significant risks detected.";
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