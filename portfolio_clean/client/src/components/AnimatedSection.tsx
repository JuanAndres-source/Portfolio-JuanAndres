import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInViewAnimation({
    threshold: 0.1,
    margin: '0px 0px -50px 0px',
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView && !prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : isInView
            ? { opacity: 1 }
            : { opacity: 0, y: 20 }
      }
      transition={{
        duration: 0.6,
        delay: isInView ? delay : 0,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
