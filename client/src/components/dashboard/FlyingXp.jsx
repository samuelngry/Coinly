// components/FlyingXp.js
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const FlyingXp = ({ from, to, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onComplete(); // clean up in Dashboard
    }, 1000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return createPortal(
    <motion.div
      className="fixed z-50 text-orange-500 text-sm font-bold"
      initial={{
        top: from.top,
        left: from.left,
        opacity: 1,
        scale: 1,
      }}
      animate={{
        top: to.top,
        left: to.left,
        opacity: 0,
        scale: 0.5,
      }}
      transition={{
        duration: 0.9,
        ease: "easeInOut",
      }}
    >
      +XP 🧡
    </motion.div>,
    document.body
  );
};

export default FlyingXp;
