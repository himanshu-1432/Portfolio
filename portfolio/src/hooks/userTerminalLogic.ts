import { useState } from "react";
import { askOpenAI } from "../api/openai";

interface HistoryItem {
  command: string;
  output: string;
}

export function userTerminalLogic() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();

    // --- Local commands ---
    if (["help", "clear", "exit"].includes(lower)) {
      switch (lower) {
        case "help":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output:
                "Available commands:\nhelp\nclear\nexit\n\nYou can also ask about Himanshu’s projects or experience.",
            },
          ]);
          break;
        case "clear":
          setHistory([]);
          break;
        case "exit":
          // dispatch event to close CLI
          window.dispatchEvent(new Event("closeCLI"));
          break;
      }
      setInput("");
      return;
    }

    // --- AI Mode (backend call) ---
    setHistory((prev) => [...prev, { command: cmd, output: "🤖 Thinking..." }]);
    setInput("");

    try {
      const aiResponse = await askOpenAI(trimmed);

      setHistory((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1
            ? { ...item, output: aiResponse }
            : item
        )
      );
    } catch (error) {
      console.error("AI error:", error);
      setHistory((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1
            ? { ...item, output: "❌ Failed to connect to AI server." }
            : item
        )
      );
    }
  };

  return { input, setInput, history, handleCommand };
}
