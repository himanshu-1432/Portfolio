import { type FC, useMemo } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useScroll";
import { NAV_ITEMS, ANIMATION_DURATIONS } from "../constants";

interface NavbarProps {
  /** Avatar image source path */
  readonly avatarSrc?: string;
  /** Whether page has been scrolled */
  readonly scrolled?: boolean;
}

/** Navbar component with navigation tabs and animated underline */
const Navbar: FC<NavbarProps> = ({ avatarSrc, scrolled = false }) => {
  // Extract section IDs from nav items for scroll detection
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  // Get currently active section
  const activeSection = useActiveSection(sectionIds);

  /**
   * Handle navigation link clicks
   * Smooth scrolls to target section
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ): void => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-6 sm:px-12 lg:px-20 py-6 text-lg font-medium text-gray-300 bg-black/30 backdrop-blur-md border-b border-white/10 w-full">
      {/* Logo / Avatar Toggle */}
      <LogoSection avatarSrc={avatarSrc} scrolled={scrolled} />

      {/* Navigation Items */}
      <div className="flex gap-8 items-center">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={handleNavClick}
          />
        ))}
      </div>
    </nav>
  );
};

/**
 * Logo section that transitions between initial logo and avatar on scroll
 */
interface LogoSectionProps {
  readonly avatarSrc?: string;
  readonly scrolled: boolean;
}

const LogoSection: FC<LogoSectionProps> = ({ avatarSrc, scrolled }) => {
  return (
    <>
      {/* Initial Logo */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-20 font-semibold text-lg tracking-wide text-purple-400"
        animate={{
          opacity: scrolled ? 0 : 1,
          scale: scrolled ? 0.5 : 1,
        }}
        transition={{ duration: ANIMATION_DURATIONS.FAST }}
        aria-label="Logo"
      >
        Himanshu Arya
      </motion.div>

      {/* Avatar on Scroll */}
      {avatarSrc  && (
        <motion.img
          initial={false}
          src={avatarSrc}
          alt="Profile Avatar"
          className="absolute left-6 sm:left-12 lg:left-20 w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
          animate={{
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0.5,
          }}
          transition={{ duration: ANIMATION_DURATIONS.FAST }}
        />
      )}
    </>
  );
};

/**
 * Individual navigation link with active state indicator
 */
interface NavLinkProps {
  readonly item: (typeof NAV_ITEMS)[number];
  readonly isActive: boolean;
  readonly onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const NavLink: FC<NavLinkProps> = ({ item, isActive, onClick }) => {
  return (
    <motion.div key={item.id} className="relative group">
      <a
        href={`#${item.id}`}
        onClick={(e) => onClick(e, item.id)}
        className={`transition-colors duration-300 ${
          isActive
            ? "text-purple-400"
            : "text-gray-300 hover:text-purple-400"
        }`}
      >
        {item.label}
      </a>

      {/* Animated Underline */}
      {isActive && (
        <motion.div
          layoutId="navbar-underline"
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover Underline */}
      <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
    </motion.div>
  );
};

export default Navbar;
