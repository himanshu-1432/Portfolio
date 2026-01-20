import { useEffect, useState, useCallback } from "react";
import { SCROLL_THRESHOLD } from "../constants";

/**
 * Custom hook to detect if a section has scrolled past the top
 * @param sectionId - The ID of the section to monitor
 * @returns boolean indicating if section is scrolled past top
 */
export const useScrollDetection = (sectionId: string): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const { top } = section.getBoundingClientRect();
    setIsScrolled(top < 0);
  }, [sectionId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isScrolled;
};

/**
 * Custom hook to detect active section based on scroll position
 * @param sectionIds - Array of section IDs to monitor
 * @returns The ID of the currently active section
 */
export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  const handleScroll = useCallback(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let current = sectionIds[0] || "";
    for (const section of sections) {
      const { top } = section.getBoundingClientRect();
      if (top <= window.innerHeight * SCROLL_THRESHOLD) {
        current = section.id;
      }
    }
    setActiveSection(current);
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
};
