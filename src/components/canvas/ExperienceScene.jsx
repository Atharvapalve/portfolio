import { Environment } from '@react-three/drei';
import Hypercube from './Hypercube';

export default function ExperienceScene() {
  return (
    <>
      {/* Environment for high-quality reflections */}
      <Environment preset="warehouse" />

      {/* Subtle ambient */}
      <ambientLight intensity={0.15} />

      {/* Rim / key lights */}
      <rectAreaLight intensity={18} width={7} height={7} color="#ffffff" position={[0, 0, -4]} />
      <rectAreaLight intensity={6} width={4} height={6} color="#4b5563" position={[4, 3, 3]} />
      <rectAreaLight intensity={4} width={4} height={6} color="#020617" position={[-4, -2, 3]} />

      {/* Neon Hypercube background */}
      <Hypercube />
    </>
  );
}


