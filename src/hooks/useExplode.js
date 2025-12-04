import { useMemo } from 'react';
import { useScroll } from '@react-three/drei';

export function useExplode(scrollMultiplier = 5, baseDistance = 2) {
  const scroll = useScroll();
  
  const explodeFactor = useMemo(() => {
    // Use scroll.offset to get the current scroll position within the scroll context
    // This will be 0 at the start and increase as you scroll
    return scroll.offset * scrollMultiplier;
  }, [scroll.offset, scrollMultiplier]);
  
  const getExplodedPosition = (index, total, radius = baseDistance) => {
    const angle = (index / total) * Math.PI * 2;
    const distance = radius * (1 + explodeFactor);
    return [
      Math.cos(angle) * distance,
      Math.sin(angle) * distance,
      Math.sin(angle * 2) * distance * 0.5,
    ];
  };
  
  return { explodeFactor, getExplodedPosition };
}

