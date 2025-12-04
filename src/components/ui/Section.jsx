import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function Section({ id, children, className = '', sectionKey }) {
  const ref = useRef(null);
  const setSection = useStore((s) => s.setSection);
  const inView = useInView(ref, { amount: 0.35, once: false });

  useEffect(() => {
    if (sectionKey && inView) {
      setSection(sectionKey);
    }
  }, [inView, sectionKey, setSection]);

  return (
    <section
      ref={ref}
      id={id}
      className={`pointer-events-auto relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28 lg:px-12 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
