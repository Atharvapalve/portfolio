import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const NODE_COUNT = 500;

export default function NeuralSwarm() {
  const pointsRef = useRef();
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * viewport.width * 2.2;
      arr[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2.2;
      arr[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [viewport.width, viewport.height]);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    const p = pointsRef.current;
    if (!p) return;

    const positions = p.geometry.attributes.position.array;
    const cursorX = mouse.x * viewport.width;
    const cursorY = mouse.y * viewport.height;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Subtle sine-based drift (neural noise field)
      positions[i3] = x + Math.sin(t * 0.3 + z * 0.7) * 0.003;
      positions[i3 + 1] = y + Math.cos(t * 0.35 + x * 0.6) * 0.003;

      // Mouse repulsion in 2D plane
      const dx = positions[i3] - cursorX * 0.4;
      const dy = positions[i3 + 1] - cursorY * 0.4;
      const distSq = dx * dx + dy * dy;
      if (distSq < 1.5) {
        const force = (1.5 - distSq) * 0.04;
        positions[i3] += (dx / Math.sqrt(distSq + 0.0001)) * force;
        positions[i3 + 1] += (dy / Math.sqrt(distSq + 0.0001)) * force;
      }
    }

    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={NODE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        opacity={0.8}
        transparent
        depthWrite={false}
      />
    </points>
  );
}



