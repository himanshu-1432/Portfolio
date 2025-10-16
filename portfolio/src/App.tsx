import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FloatingButton from "./components/floating-button";

export default function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060015] via-[#100030] to-[#190040] text-white font-[Poppins] relative overflow-hidden">
      <Navbar />
      <Hero />
   <FloatingButton />
  
    </div>
  );
}
