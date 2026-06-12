"use client";

import { motion } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: any;
  href?: string;
}

export default function MagneticButton({ children, className = "", onClick, as: Component = "button", href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle movement (divide by 8)
    setPosition({ x: middleX / 8, y: middleY / 8 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block touch-none ${className}`}
    >
      {children}
    </motion.div>
  );

  if (Component === "button") {
    return (
      <button onClick={onClick} className="p-0 bg-transparent border-none outline-none cursor-pointer">
        {content}
      </button>
    );
  }

  // Support for Next.js Link or a tags
  return (
    <Component href={href} onClick={onClick} className="inline-block">
      {content}
    </Component>
  );
}
