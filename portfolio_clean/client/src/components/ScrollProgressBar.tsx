import { motion } from 'framer-motion';
import { useScrollEffect } from '@/hooks/useScrollEffect';

export function ScrollProgressBar() {
  const { scrollProgress } = useScrollEffect();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-blue-600 origin-left z-50"
      style={{
        scaleX: scrollProgress,
      }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    />
  );
}
