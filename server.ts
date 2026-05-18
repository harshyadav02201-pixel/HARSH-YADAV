import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Blog Generation (Optional feature)
  app.post('/api/generate-blog', async (req, res) => {
    try {
      const { topic } = req.body;
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY || '',
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' }
        }
      });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `Write a professional insurance blog post about: ${topic}. 
      Return the response in the following format:
      Title: [Clear Title]
      Excerpt: [Brief 2-sentence summary]
      Content: [Full markdown content]
      
      As an insurance advisor (Harsh Yadav), focus on ICICI Prudential products where relevant but keep it informative for a general audience in Uttar Pradesh, India.` }] }]
      });
      
      const text = response.text || '';
      
      res.json({ content: text });
    } catch (error) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'Failed to generate blog content' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
