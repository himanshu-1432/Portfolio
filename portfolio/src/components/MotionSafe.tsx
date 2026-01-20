import { type FC } from "react";
import { motion, type MotionProps } from "framer-motion";
import { useFontsReady } from "../context/FontsReadyProvider";

interface MotionSafeProps extends MotionProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

/**
 * Safe Motion wrapper component that only animates after fonts are ready
 * Prevents layout shift caused by font loading
 * 
 * @example
 * ```tsx
 * <MotionSafe
 *   initial={{ opacity: 0, y: 20 }}
 *   animate={{ opacity: 1, y: 0 }}
 *   transition={{ duration: 0.5 }}
 * >
 *   Content here
 * </MotionSafe>
 * ```
 */
export const MotionSafe: FC<MotionSafeProps> = ({
  animate,
  initial = false,
  children,
  className,
  ...props
}: MotionSafeProps) => {
  const fontsReady = useFontsReady();

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={fontsReady ? animate : false}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Safe Motion wrapper for motion.img elements
 */
export const MotionSafeImg: FC<MotionProps & { readonly src: string; readonly alt: string; readonly className?: string }> = ({
  animate,
  initial = false,
  src,
  alt,
  className,
  ...props
}: MotionProps & { readonly src: string; readonly alt: string; readonly className?: string }) => {
  const fontsReady = useFontsReady();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={initial}
      animate={fontsReady ? animate : false}
      {...props}
    />
  );
};
