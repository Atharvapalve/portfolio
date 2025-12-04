import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export default function HeroBlob() {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse, clock }) => {
    if (!meshRef.current) return;

    // Gentle rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.15;

    // Subtle parallax based on mouse
    const targetX = mouse.x * 0.6;
    const targetY = mouse.y * 0.4;
    meshRef.current.position.x += (targetX * viewport.width * 0.1 - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (targetY * viewport.height * 0.08 - meshRef.current.position.y) * 0.08;
  });

  return (
    <group>
      {/* Main liquid form */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 128, 128]} />
        <MeshDistortMaterial
          color="#101010"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.45}
          speed={1.2}
        />
      </mesh>
    </group>
  );
}



