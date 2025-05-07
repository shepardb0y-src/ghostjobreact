import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import './styles.css'; // Relative path to the CSS file
const ai = new GoogleGenAI({ apiKey: "AIzaSyAuzivdEoa9TWnrpdY-xlHFWb0vR2MuJYU" }); // Replace with your actual API key

function MyPopup() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAIResponse() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "what  is the average saalry of a Ai engineer in boston MA",
        });
        setAiResponse(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch AI response");
        setLoading(false);
      }
    }

    fetchAIResponse();
  }, []);

  if (loading) {
    return <div>Loading AI response...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <div class="container">
        <h1>Ghost Job Hunter</h1>
        <p>Detect potentially fake job postings</p>
      <div>
        
        {/* <p>{JSON.stringify(aiResponse)}</p> */}
      </div>
        
        <div class="form-group">
            <label for="jobTitle">Job Title*</label>
            <input type="text" id="jobTitle" placeholder="e.g., Software/ Engineer" required/>
        </div>
        
        <div class="form-group">
            <label for="location">Location*</label>
            <input type="text" id="location" placeholder="e.g., San Fran/cisco, CA" required/>
        </div>
        
        <div class="form-group">
            <label for="salary">Posted Salary (optional)</label>
            <input type="text" id="salary" placeholder="e.g., $120,000"/>
        </div>
        
        <div class="form-group">
            <label for="postingDate">Posting Date (optional)</label>
            <input type="date" id="postingDate"/>
        </div>
        /
        <div class="form-group">
            <label for="applicants">Number of Applicants (optional)</label>
            <input type="number" id="applicants" placeholder="e.g., 250"/>
        </div>
        
        <button id="checkButton">Analyze Job Posting</button>
        
        <div id="result"></div>
    </div>
    
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<MyPopup />);
}

console.log("Popup script started");