
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 text-sm text-gray-300">
      <div className="font-semibold text-lg tracking-wide text-purple-400">H</div>

      <div className="flex gap-8">
        <a href="#home" className="hover:text-purple-400 transition">Home</a>
        <a href="#about" className="hover:text-purple-400 transition">About</a>
        <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
        <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
      </div>
    </nav>
  );
}
