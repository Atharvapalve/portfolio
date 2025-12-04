import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useStore } from '../../store/useStore';

function Workstation() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { setHoveredObject } = useStore();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredObject('workstation');
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredObject(null);
        }}
        scale={hovered ? 1.2 : 1}
      >
        {/* Main Workstation Box */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.5, 1]} />
          <meshStandardMaterial
            color="#1a1f2e"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? '#39ff14' : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
        
        {/* Glowing edges */}
        <mesh position={[0, 0, 0.51]}>
          <boxGeometry args={[2.1, 1.6, 0.02]} />
          <meshStandardMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={hovered ? 1 : 0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Small details - PCB-like components */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.3, 0.51]}>
            <boxGeometry args={[0.2, 0.2, 0.01]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FloatingParticles() {
  const particles = useRef();
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#39ff14" transparent opacity={0.6} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <group position={[0, 0, 0]}>
      {/* Background Text */}
      <Text
        position={[0, 1.2, -3]}
        fontSize={1}
        color="#39ff14"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#00ffff"
      >
        ATHARVA PALVE
      </Text>

      {/* Tagline */}
      <Text
        position={[0, 0.1, -3]}
        fontSize={0.28}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        Bridging the gap between embedded hardware and intelligent algorithms.
      </Text>

      {/* Central Workstation */}
      <group scale={[0.9, 0.9, 0.9]}>
        <Workstation />
      </group>
      
      {/* Floating Particles */}
      <FloatingParticles />
    </group>
  );
}

