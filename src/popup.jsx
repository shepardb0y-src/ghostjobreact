import React from "react";
import {render} from "react-dom";
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { output } from "../webpack.config";




const ai = new GoogleGenAI({ apiKey: "addapikeyhere" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "what is a ghost job",
  });
  const output = (response.text)
  console.log(output);
}

await main();

console.log("Service worker started");



function Popup(){
   return( <div id="react_target">
        <h1>{output}</h1>
        <p>Hello World!</p>
        <input type="text" />
    </div>)
}


const root = createRoot(document.getElementById('root'));
root.render(<Popup/>);


