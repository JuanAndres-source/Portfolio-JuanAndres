import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const { ref, isInView } = useInViewAnimation({
    threshold: 0.5,
  });

  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(to);
      return;
    }

    let start = from;
    const increment = (to - from) / (duration * 60); // 60fps
    let animationFrameId: number;

    const animate = () => {
      start += increment;
      if (start < to) {
        setCount(Math.floor(start));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  return (
    <motion.div ref={ref} className={className}>
      {Math.floor(count)}
      {suffix}
    </motion.div>
  );
}
