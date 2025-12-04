import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export default function HeroBlob() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state, delta) => {
    const { scrollProgress, activeProjectColor } = useStore.getState();
    if (!meshRef.current || !materialRef.current) return;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1;

    if (scrollProgress < 0.1) {
      targetX = 0;
      targetY = 0;
      targetZ = 0;
      targetScale = 1;
    } else if (scrollProgress >= 0.1 && scrollProgress < 0.35) {
      targetX = 3.5;
      targetY = 0;
      targetZ = 0;
      targetScale = 0.8;
    } else if (scrollProgress >= 0.35 && scrollProgress < 0.65) {
      targetX = 0;
      targetY = 0;
      targetZ = -4;
      targetScale = 0.9;
    } else if (scrollProgress >= 0.65 && scrollProgress < 0.85) {
      targetX = -3.5;
      targetY = 0;
      targetZ = -2;
      targetScale = 0.8;
    } else if (scrollProgress >= 0.85) {
      targetX = 0;
      targetY = 0;
      targetZ = 1;
      targetScale = 1.2;
    }

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);

    const newScale = THREE.MathUtils.lerp(meshRef.current.scale.x || 1, targetScale, 0.1);
    meshRef.current.scale.setScalar(newScale);

    meshRef.current.rotation.y += 0.006;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.22;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;

    const targetColor = new THREE.Color(activeProjectColor || '#0ea5e9');
    materialRef.current.color.lerp(targetColor, 0.05);
    materialRef.current.attenuationColor.lerp(targetColor, 0.05);
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 160, 160]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          resolution={1024}
          distortion={0.5}
          color="#000000"
          thickness={2.5}
          roughness={0.05}
          chromaticAberration={0.05}
          anisotropy={20}
          ior={1.2}
          attenuationColor="#020617"
          attenuationDistance={0.4}
          temporalDistortion={0.25}
        />
      </mesh>
    </group>
  );
}

