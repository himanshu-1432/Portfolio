/**
 * Application-wide constants for portfolio
 */

// Navigation sections
export const NAV_SECTIONS = {
  HOME: "home",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  PROJECTS: "projects",
  CONTACT: "contact",
} as const;

// Navigation items configuration
export const NAV_ITEMS = [
  { label: "Home", id: NAV_SECTIONS.HOME },
  { label: "Experience", id: NAV_SECTIONS.EXPERIENCE },
  { label: "Skills", id: NAV_SECTIONS.SKILLS },
  { label: "Projects", id: NAV_SECTIONS.PROJECTS },
  { label: "Contact", id: NAV_SECTIONS.CONTACT },
] as const;

// Asset paths
export const ASSET_PATHS = {
  AVATAR: "/Himanshu-profile-2.png",
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 1,
} as const;

// Scroll detection threshold (viewport ratio)
export const SCROLL_THRESHOLD = 0.5; // 50% of viewport
