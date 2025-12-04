import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { useExplode } from '../../hooks/useExplode';

function ExplodingCubes({ count = 20, color = '#39ff14' }) {
  const groupRef = useRef();
  const { explodeFactor, getExplodedPosition } = useExplode(5, 3);
  
  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      basePosition: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ],
    }));
  }, [count]);
  
  useFrame((state) => {
    if (groupRef.current) {
      cubes.forEach((cube, i) => {
        const child = groupRef.current.children[i];
        if (child) {
          const [x, y, z] = getExplodedPosition(i, count, 3);
          child.position.set(
            cube.basePosition[0] + x * explodeFactor,
            cube.basePosition[1] + y * explodeFactor,
            cube.basePosition[2] + z * explodeFactor
          );
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={cube.id} position={cube.basePosition}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function ProjectModel({ project }) {
  // Different visualizations for different projects
  if (project.id === 'wavehabitat') {
    return <ExplodingCubes count={30} color="#39ff14" />;
  } else if (project.id === 'encryption') {
    // Encryption visualization - geometric patterns
    return (
      <group>
        {Array.from({ length: 15 }, (_, i) => (
          <mesh key={i} position={[Math.sin(i) * 2, Math.cos(i) * 2, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 100]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>
    );
  } else {
    // Cafe management - grid layout
    return (
      <group>
        {Array.from({ length: 25 }, (_, i) => {
          const x = (i % 5) - 2;
          const z = Math.floor(i / 5) - 2;
          return (
            <mesh key={i} position={[x * 0.5, 0, z * 0.5]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={0.4}
              />
            </mesh>
          );
        })}
      </group>
    );
  }
}

export default function ProjectShowcase({ project, position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* 3D Model on the left */}
      <group position={[-3, 0, 0]}>
        <ProjectModel project={project} />
      </group>
      
      {/* HTML Content on the right */}
      <Html
        position={[3.2, 0.2, 0]}
        transform
        occlude
        style={{
          width: '360px',
          pointerEvents: 'auto',
        }}
      >
        <div className="text-neon-green font-mono bg-cyber-dark/80 border border-neon-green/40 px-4 py-3 rounded-md shadow-lg shadow-neon-green/20">
          <h2 className="text-2xl mb-2 font-semibold tracking-wide" style={{ color: project.color }}>
            {project.title}
          </h2>
          <p className="text-cyan-400 text-sm mb-2">{project.category}</p>
          <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs border border-neon-green text-neon-green"
                style={{
                  borderColor: project.color,
                  color: project.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Html>
      
      {/* Title in 3D space */}
      <Text
        position={[0, 2, -2]}
        fontSize={0.8}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {project.title}
      </Text>
    </group>
  );
}

