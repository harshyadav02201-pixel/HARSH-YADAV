import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { topic } = body;

    if (!topic) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Topic is required" }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GEMINI_API_KEY is not configured on Netlify" }),
      };
    }

    const ai = new GoogleGenAI({ 
      apiKey: apiKey,
    });
    
    const prompt = `Write a professional insurance blog post about: ${topic}. 
    Return the response in the following format:
    Title: [Clear Title]
    Excerpt: [Brief 2-sentence summary]
    Content: [Full markdown content]
    
    As an insurance advisor (Harsh Yadav), focus on ICICI Prudential products where relevant but keep it informative for a general audience in Uttar Pradesh, India.`;

    // Use the same model and prompt as in server.ts
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash', 
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    const text = result.text || '';

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate blog content", details: error.message }),
    };
  }
};
