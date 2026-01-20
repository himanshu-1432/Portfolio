import { type FC } from "react";
import { motion } from "framer-motion";
import { useScrollDetection } from "../hooks/useScroll";
import { NAV_SECTIONS, ASSET_PATHS, ANIMATION_DURATIONS } from "../constants";

interface HeroProps {
  /** Callback when avatar scroll state changes */
  readonly onAvatarScrolled?: (scrolled: boolean) => void;
  /** Avatar image source path */
  readonly avatarSrc?: string;
}

/**
 * Hero/Landing section component
 * Displays main introduction with avatar and call-to-action
 */
const Hero: FC<HeroProps> = ({
  onAvatarScrolled,
  avatarSrc = ASSET_PATHS.AVATAR,
}) => {
  const isScrolled = useScrollDetection(NAV_SECTIONS.HOME);

  // Notify parent when scroll state changes
  if (onAvatarScrolled && typeof onAvatarScrolled === "function") {
    // Using a ref-like pattern to call callback without adding to dependency
    Promise.resolve().then(() => onAvatarScrolled(isScrolled));
  }

  return (
    <section
      id={NAV_SECTIONS.HOME}
      className="w-full flex flex-col items-center justify-center text-center mt-24 px-6 sm:px-12 lg:px-20"
    >
      {/* Avatar Image */}
      <motion.img
        src={avatarSrc}
        alt="Himanshu Arya - Avatar"
        className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-purple-500 shadow-lg object-cover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATIONS.SLOW }}
      />

      {/* Main Heading */}
      <h1 className="text-6xl sm:text-7xl font-bold mt-6">
        Hi, I'm <span className="text-purple-400">Himanshu</span>
      </h1>

      {/* Tagline */}
      <p className="text-gray-400 mt-3 text-xl sm:text-2xl max-w-xl font-light">
        A full-stack developer crafting scalable web applications across
        frontend, backend, and cloud using modern JavaScript, React, Node.js and AWS.
      </p>
    </section>
  );
};

export default Hero;
