import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const data = JSON.parse(fs.readFileSync("src/data/knowledge.json", "utf-8"));

(async () => {
  const vectors = [];
  for (const item of data) {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: item.content,
    });
    vectors.push({
      title: item.title,
      content: item.content,
      embedding: res.data[0].embedding,
    });
  }

  fs.writeFileSync("src/data/embeddings.json", JSON.stringify(vectors, null, 2));
  console.log("✅ Embeddings saved to src/data/embeddings.json");
})();
