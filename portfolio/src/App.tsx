import { type FC, useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FloatingButton from "./components/floating-button";
import Experience from "./components/experience";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import { ASSET_PATHS } from "./constants";

/**
 * Main App component
 * Serves as the root component for the portfolio application
 */
const App: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060015] via-[#100030] to-[#190040] text-white font-[Poppins] relative overflow-hidden">
      <Navbar avatarSrc={ASSET_PATHS.AVATAR} scrolled={isScrolled} />

      {/* Main Content with fixed navbar padding */}
      <div className="pt-24">
        <Hero onAvatarScrolled={setIsScrolled} avatarSrc={ASSET_PATHS.AVATAR} />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* Floating AI Assistant */}
      <FloatingButton />
    </div>
  );
};

export default App;
