import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (allow your Vite dev origin)
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '2mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// --- (Optional) RAG helpers
const cosine = (a, b) => {
  const dot = a.reduce((s, ai, i) => s + ai * b[i], 0);
  const na = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const nb = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return dot / (na * nb);
};

const loadEmbeddings = () => {
  const file = path.resolve('server/data/embeddings.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

async function retrieveContext(query, topK = 2) {
  const kb = loadEmbeddings();
  if (!kb.length) return '';
  const e = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query
  });
  const q = e.data[0].embedding;
  const top = kb
    .map(item => ({ ...item, score: cosine(item.embedding, q) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return top.map(t => t.content).join('\n\n');
}

// --- Chat endpoint (with optional RAG)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Always retrieve context
    const context = await retrieveContext(message);

    const systemPrompt = `
You are an AI assistant built into Himanshu Arya's portfolio.
Answer ONLY using the CONTEXT below. 
If the answer isn't in the context, say: 
"I'm not sure, that information isn't in my portfolio knowledge base."

CONTEXT:
${context}
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.6,
    });

    const reply = completion.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    res.status(500).json({ error: "AI error" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
});
