import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function Hypercube() {
  const group = useRef()
  const outer = useRef()
  const inner = useRef()

  useFrame((state, delta) => {
    const scroll = useStore.getState().scrollProgress
    // 1. ROTATION (Continuous & Smooth)
    outer.current.rotation.x += delta * 0.2
    outer.current.rotation.y += delta * 0.1
    inner.current.rotation.x -= delta * 0.1
    inner.current.rotation.z += delta * 0.2
    // 2. CHOREOGRAPHY (The "Polite Companion" Logic)
    let targetPos = [0, 0, 0]
    let targetScale = 1
    if (scroll < 0.1) {
       // HERO: Center Stage, Normal Size
       targetPos = [0, 0, 0]
       targetScale = 1.2
    } else if (scroll >= 0.1 && scroll < 0.35) {
       // ABOUT: Move Right (Let text breathe)
       targetPos = [3.5, 0, 0]
       targetScale = 1
    } else if (scroll >= 0.35 && scroll < 0.65) {
       // GRID: RETREAT (Do not block view!)
       // Move it behind the grid and make it smaller/subtle
       targetPos = [0, 0, -3] 
       targetScale = 2.5 // Large enough to cover BG, but far back
    } else if (scroll >= 0.65) {
       // EXPERIENCE: Move Left
       targetPos = [-4, 0, -1]
       targetScale = 0.8
    }
    // Smooth Movement (Damping)
    const smooth = 0.1
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetPos[0], smooth)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetPos[1], smooth)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetPos[2], smooth)
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, smooth))
  })

  // HEAVY GLASS SETTINGS (The "Jewel" Look)
  const glassConfig = {
    thickness: 1.2,       // Refracts light like a lens
    roughness: 0,         // Crystal clear
    transmission: 1,      // 100% See-through
    ior: 1.5,             // Index of Refraction (Glass)
    chromaticAberration: 0.15, // Premium "Rainbow" edges
    backside: true,
  }

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* OUTER SHELL */}
        <RoundedBox ref={outer} args={[2, 2, 2]} radius={0.15}>
           <MeshTransmissionMaterial {...glassConfig} color="#cceeff" />
        </RoundedBox>
        {/* INNER CORE (Glowing AI Brain) */}
        <RoundedBox ref={inner} args={[0.8, 0.8, 0.8]} radius={0.05}>
           <meshStandardMaterial 
             color="#2f7af5" 
             emissive="#0a44ff"
             emissiveIntensity={3}
             toneMapped={false}
           />
        </RoundedBox>
      </Float>
      {/* REFLECTIONS (Crucial for Glass) */}
      <Environment preset="warehouse" /> 
    </group>
  )
}
