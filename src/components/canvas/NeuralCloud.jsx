import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export default function NeuralCloud() {
  const points = useRef();

  // 1. GENERATE PARTICLES (The Spherical Math)
  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  // 2. ANIMATION LOOP
  useFrame((state, delta) => {
    if (!points.current) return;

    const scroll = useStore.getState().scrollProgress;
    const time = state.clock.getElapsedTime();

    // 1. ORGANIC ROTATION (The "Swirl")
    const rotationSpeed = scroll > 0.35 ? 0.02 : 0.05;
    points.current.rotation.y += delta * rotationSpeed;
    points.current.rotation.z = Math.sin(time * 0.2) * 0.1;

    // 2. BREATHING PULSE (The "Life")
    const pulse = Math.sin(time * 1.5) * 0.05 + 1; // 0.95–1.05

    // 3. SCROLL CHOREOGRAPHY (Keep the Explosion!)
    let targetScale = 1;
    let targetPos = [0, 0, 0];

    if (scroll < 0.1) {
      // HERO: Pulse & Center
      targetScale = 1 * pulse;
      targetPos = [0, 0, 0];
    } else if (scroll >= 0.1 && scroll < 0.35) {
      // ABOUT: Move Right & Pulse
      targetScale = 0.8 * pulse;
      targetPos = [3, 0, 0];
    } else if (scroll >= 0.35 && scroll < 0.65) {
      // GRID: EXPLODE (Starfield) - big but stable
      targetScale = 5.5;
      targetPos = [0, 0, 0];
    } else if (scroll >= 0.65) {
      // EXPERIENCE / CONTACT: Move Left & Pulse
      targetScale = 0.6 * pulse;
      targetPos = [-3, 0, 0];
    }

    // Smooth Interpolation
    points.current.position.x = THREE.MathUtils.lerp(
      points.current.position.x,
      targetPos[0],
      0.1,
    );
    points.current.scale.setScalar(
      THREE.MathUtils.lerp(points.current.scale.x || 1, targetScale, 0.1),
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      {/* GLOWING MATERIAL */}
      <pointsMaterial
        size={0.015}
        color="#00f0ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}



