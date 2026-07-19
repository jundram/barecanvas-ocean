"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.38, delay, ease: [0.25, 1, 0.4, 1] }}
    >
      {children}
    </motion.div>
  );
}
