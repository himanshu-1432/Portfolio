// export async function askOpenAI(message: string) {
//   const res = await fetch("http://localhost:5000/query", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({q:message}),
//   });
//   const data = await res.json();
//   return data.answer as string;
// }


export async function askOpenAI(
  query: string,
  onToken: (chunk: string) => void
) {
  const res = await fetch("http://localhost:5000/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: query })
  });

  if (!res.body) {
    throw new Error("No response body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    onToken(chunk); // token-by-token
  }
}
