'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function WarpTransition({
  trigger,
  onComplete,
}: {
  trigger: boolean;
  onComplete: () => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      console.log("🔥 WarpTransition triggered");
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = '';
        onComplete();
      }, 2000);
    }
  }, [trigger]);

  // Ensure portal renders only after the overlay-root is present
  if (typeof window === 'undefined' || !document.getElementById('overlay-root')) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-[999999] pointer-events-none" // Ensures it renders above everything
          initial={{ scale: 0.1, opacity: 0.2 }}
          animate={{ scale: 3, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {/* A solid background (black) with a radial effect */}
          <div className="w-full h-full bg-black radial-mask" />
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('overlay-root') as HTMLElement
  );
}
