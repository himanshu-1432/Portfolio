import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col items-center text-center mt-24">
      <motion.img
        src="/avatar.png"
        alt="avatar"
        className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-5xl font-bold mt-6">
        Hi, I’m <span className="text-purple-400">Himanshu</span>
      </h1>
      <p className="text-gray-400 mt-3 text-lg max-w-xl">
        A passionate Software Engineer crafting interactive web experiences with
        React, AWS, and modern frontend technologies.
      </p>
    </section>
  );
}
