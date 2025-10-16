import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const src = path.resolve('server/data/knowledge.json');
const out = path.resolve('server/data/embeddings.json');

const data = JSON.parse(fs.readFileSync(src, 'utf-8'));

(async () => {
  const outArr = [];
  for (const item of data) {
    const emb = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: item.content
    });
    outArr.push({
      title: item.title,
      content: item.content,
      embedding: emb.data[0].embedding
    });
  }
  fs.writeFileSync(out, JSON.stringify(outArr, null, 2));
  console.log('✅ embeddings saved to server/data/embeddings.json');
})();
