import { motion } from "framer-motion";
import { useState } from "react";
import CLI from "./cli";

export default function FloatingButton() {
  const [showCLI, setShowCLI] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle open / close with delay for transition
  const handleToggleCLI = () => {
    if (showCLI) {
      // Trigger closing animation
      setIsClosing(true);
      setTimeout(() => {
        setShowCLI(false);
        setIsClosing(false);
      }, 800); // must match motion.duration
    } else {
      // Open immediately
      setShowCLI(true);
    }
  };

  return (
    <>
      {/* ===== BACKGROUND BLUR LAYER ===== */}
    {(showCLI || isClosing) && (
  <motion.div
    initial={{ opacity: 0, backdropFilter: "blur(0px) brightness(1)" }}
    animate={{ opacity: 1, backdropFilter: "blur(5px) brightness(0.8)" }}
    exit={{ opacity: 0, backdropFilter: "blur(0px) brightness(1)" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="absolute inset-0 pointer-events-none z-30 bg-transparent"
  ></motion.div>
)}


      {/* ===== Floating Siri Orb (AI Terminal with Stars) ===== */}
      {!showCLI && (
        <motion.div
          onClick={handleToggleCLI}
          initial={{ y: 0, scale: 1 }}
          animate={{ y: [0, -8, 0] }}
          whileHover={{
            scale: 1.2,
            boxShadow: "0 0 60px rgba(168,85,247,0.8)",
          }}
          whileTap={{ scale: 0.9, opacity: 0.8 }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.15, ease: "easeOut" },
          }}
          className="
            fixed bottom-16 left-1/2 -translate-x-1/2
            w-16 h-16
            rounded-full
            cursor-pointer
            flex items-center justify-center
            overflow-hidden
            shadow-[0_0_35px_rgba(168,85,247,0.5)]
            transition-all duration-300
            z-50
          "
        >
          {/* swirling gradient glow */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
                "radial-gradient(circle at 70% 70%, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                "radial-gradient(circle at 50% 50%, #EC4899 0%, #8B5CF6 50%, #3B82F6 100%)",
              ],
              rotate: [0, 360],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full blur-md opacity-80"
          ></motion.div>

          {/* Core bright glow */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_transparent_70%)]"
          ></motion.div>

          {/* Fine white edge */}
          <div className="absolute inset-0 rounded-full border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>

          {/* Animated stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [
                  Math.cos((i * 60 * Math.PI) / 180) * 12,
                  Math.cos(((i * 60 + 180) * Math.PI) / 180) * 12,
                  Math.cos((i * 60 * Math.PI) / 180) * 12,
                ],
                y: [
                  Math.sin((i * 60 * Math.PI) / 180) * 12,
                  Math.sin(((i * 60 + 180) * Math.PI) / 180) * 12,
                  Math.sin((i * 60 * Math.PI) / 180) * 12,
                ],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          ))}

          {/* AI Text */}
          <span className="text-white/40 text-lg font-semibold tracking-wider relative z-10 select-none drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]">
            AI
          </span>
        </motion.div>
      )}

      {/* ===== CLI Projection ===== */}
      {(showCLI || isClosing) && (
        <motion.div
          key="cli"
          initial={{ opacity: 0, scale: 0.3, y: 150 }}
          animate={
            isClosing
              ? { opacity: 0, scale: 0.3, y: 150 } // closing
              : { opacity: 1, scale: 1, y: 0 } // opening
          }
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          className="fixed inset-0 flex items-center justify-center z-40"
        >
          <CLI onClose={handleToggleCLI} />
        </motion.div>
      )}
    </>
  );
}
