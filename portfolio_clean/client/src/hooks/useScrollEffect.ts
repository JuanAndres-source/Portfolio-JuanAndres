import { useEffect, useState } from 'react';

export function useScrollEffect() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // Calculate scroll progress (0 to 1)
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = currentScroll / docHeight;
      setScrollProgress(Math.min(scrolled, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}
