import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { userTerminalLogic } from "../hooks/userTerminalLogic";

interface CLIProps {
  onClose: () => void;
}

export default function CLI({ onClose }: CLIProps) {
  const { history, input, setInput, handleCommand } = userTerminalLogic();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Close CLI when "exit" event is dispatched
  useEffect(() => {
    const handleCloseCLI = () => onClose();
    window.addEventListener("closeCLI", handleCloseCLI);
    return () => window.removeEventListener("closeCLI", handleCloseCLI);
  }, [onClose]);

 return (
  <div className="relative flex flex-col items-center justify-center">
    {/* --- Glowing circular projector --- */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 0.7, 0.5],
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="
        absolute bottom-[-240px]
        w-[500px] h-[500px]
        bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.5)_0%,_rgba(0,0,0,0)_70%)]
        blur-[120px]
        rounded-full
        pointer-events-none
      "
    />

    {/* --- Floating CLI panel --- */}
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 150 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.8, y: 150 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      className="
        relative
        w-[750px] h-[480px]
        bg-[rgba(255,255,255,0.08)]
        border border-[rgba(255,255,255,0.2)]
        rounded-3xl
        backdrop-blur-2xl
        shadow-[0_8px_40px_rgba(255,255,255,0.15)]
        font-mono text-sm text-white
        overflow-hidden flex flex-col
        transform-gpu perspective-[1200px]
        hover:scale-[1.02]
      "
    >
      {/* Reflection overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none rounded-3xl mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>

     {/* Header */}
<div className="h-10 flex items-center justify-between px-4 border-b border-white/20 bg-white/5">
  <div className="flex items-center">
    <div className="w-3 h-3 bg-red-400/80 rounded-full mr-2"></div>
    <div className="w-3 h-3 bg-yellow-400/80 rounded-full mr-2"></div>
    <div className="w-3 h-3 bg-green-400/80 rounded-full mr-4"></div>
    <span className="text-gray-200/80 text-xs tracking-wider">AI@himanshu:~$</span>
  </div>

  {/* Close button */}
  <button
    onClick={onClose}
    className="text-gray-300 hover:text-white text-xl font-light transition-transform hover:scale-125"
    aria-label="Close CLI"
  >
    ✕
  </button>
</div>


      {/* Terminal body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 relative z-10">
        {history.map((h, i) => (
          <div key={i}>
            <div className="text-purple-200 drop-shadow-[0_0_6px_rgba(200,200,255,0.6)]">
              $ {h.command}
            </div>
            <pre className="whitespace-pre-wrap text-gray-100/80 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
              {h.output}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-white/20 px-6 py-3 bg-white/5 backdrop-blur-md">
        <span className="text-purple-300 pr-2">$</span>
        <input
          type="text"
          className="flex-1 bg-transparent text-white/90 outline-none placeholder-gray-400/70 tracking-wide"
          placeholder="type a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(input);
          }}
          autoFocus
        />
      </div>
    </motion.div>
  </div>
);

}
