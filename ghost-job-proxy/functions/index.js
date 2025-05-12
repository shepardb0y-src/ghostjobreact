
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });

exports.geminiProxy = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;


    if (!apiKey) {
      console.error("Gemini API key is not set in config");
      return res.status(500).send("Gemini API key missing");
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      // Log raw response body for debugging
      const textResponse = await response.text();
      console.log("Raw response from Gemini API:", textResponse);

      let result;
      try {
        // Try to parse the response as JSON
        result = JSON.parse(textResponse);
      } catch (jsonError) {
        console.error("Error parsing JSON from Gemini API:", jsonError);
        return res.status(500).send(`Error parsing JSON: ${jsonError.message}`);
      }

      if (!response.ok) {
        console.error("Gemini API error:", result);
        return res.status(response.status).json(result);
      }

      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        console.error("No text found in Gemini response:", result);
        return res.status(500).send("No text returned from Gemini API");
      }

      console.log("Gemini API success:", generatedText);
      res.json({ text: generatedText });
    } catch (error) {
      console.error("Function error:", error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
});
