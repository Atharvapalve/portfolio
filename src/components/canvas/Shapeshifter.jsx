import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function Shapeshifter() {
  const shell = useRef()
  const cage = useRef()
  const core = useRef()
  const particles = useRef()

  useFrame((state, delta) => {
    const scroll = useStore.getState().scrollProgress

    // 1. IDLE ANIMATIONS (Complex & Organic)
    shell.current.rotation.y += delta * 0.1
    cage.current.rotation.x -= delta * 0.2
    cage.current.rotation.y -= delta * 0.1
    core.current.rotation.z += delta * 0.5
    core.current.rotation.y += delta * 0.5
    particles.current.rotation.y += delta * 0.05

    // 2. CHOREOGRAPHY (The Explosion)
    let shellPos = [0, 0, 0]
    let cagePos = [0, 0, 0]
    let coreScale = 1
    let particleScale = 1.5

    if (scroll < 0.1) {
       // HERO: Assembled Engine (Right Side)
       shellPos = [3.5, 0, 0]
       cagePos = [3.5, 0, 0]
       coreScale = 1
    } else if (scroll >= 0.1 && scroll < 0.65) {
       // GRID: EXPLODE TO CORNERS (Clear the view!)
       shellPos = [-6, 3, -2] // Fly Top-Left
       cagePos = [6, -3, -2]  // Fly Bottom-Right
       coreScale = 0          // Vanish the core
       particleScale = 6      // Dust fills the room
    } else if (scroll >= 0.65) {
       // EXPERIENCE: Reassemble on Left
       shellPos = [-3.5, 0, 0]
       cagePos = [-3.5, 0, 0]
       coreScale = 1
    }

    // Smooth Interpolation
    const damp = 0.08
    shell.current.position.x = THREE.MathUtils.lerp(shell.current.position.x, shellPos[0], damp)
    shell.current.position.y = THREE.MathUtils.lerp(shell.current.position.y, shellPos[1], damp)

    cage.current.position.x = THREE.MathUtils.lerp(cage.current.position.x, cagePos[0], damp)
    cage.current.position.y = THREE.MathUtils.lerp(cage.current.position.y, cagePos[1], damp)

    // Core vanishes smoothly
    core.current.scale.setScalar(THREE.MathUtils.lerp(core.current.scale.x, coreScale, damp))
    particles.current.scale.setScalar(THREE.MathUtils.lerp(particles.current.scale.x, particleScale, damp))
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* 1. THE SHELL (Glass) */}
        <mesh ref={shell}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <MeshTransmissionMaterial
            thickness={1.5}
            chromaticAberration={0.1}
            roughness={0}
            transmission={1}
            color="#c9e9ff"
          />
        </mesh>

        {/* 2. THE CAGE (Wireframe Metal) */}
        <mesh ref={cage}>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
        </mesh>

        {/* 3. THE CORE (Glowing Energy) */}
        <mesh ref={core}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#2f7af5"
            emissive="#0044ff"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </Float>

      {/* 4. THE PARTICLES (Atmosphere) */}
      <group ref={particles}>
        <Stars radius={1.5} depth={0} count={1000} factor={3} saturation={0} fade speed={1} />
      </group>
    </group>
  )
}
