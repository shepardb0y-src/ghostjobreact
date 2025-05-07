import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" }); // Replace with your actual API key

function MyPopup() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAIResponse() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "what is a ghost job",
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
    <div>
      <h1>AI Response:</h1>
      <p>{JSON.stringify(aiResponse)}</p>
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