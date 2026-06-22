"use client";

import { motion } from "motion/react";

/**
 * Gentle cross-route fade. Opacity-only on purpose — a transform here would
 * create a containing block and break GSAP ScrollTrigger pinning.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
