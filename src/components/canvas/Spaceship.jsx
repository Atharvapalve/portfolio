import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, Stars, Environment, Trail, CameraShake, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function Spaceship() {
  const { scene } = useGLTF('/models/ship.glb')
  const group = useRef()
  const lastScroll = useRef(0)
  const [boost, setBoost] = useState(0)

  useFrame((state, delta) => {
    // 1. SAFETY CHECK
    const scroll = useStore.getState().scrollProgress || 0
    const scrollDelta = scroll - lastScroll.current
    lastScroll.current = scroll

    // 2. DEFINE TARGETS
    const targetPos = new THREE.Vector3(3, -1, 0)
    const targetRot = new THREE.Euler(0, 0, 0)

    if (scroll < 0.1) {
      // HERO: Right Side Patrol
      targetPos.set(3, -1.5, 0)
      targetRot.set(0.1, Math.PI - 0.3, 0)
    } 
    else if (scroll >= 0.1 && scroll < 0.35) {
      // ABOUT: Inspection (Center)
      targetPos.set(0, -1, 3) 
      targetRot.set(0.3, Math.PI, 0.2)
    } 
    else if (scroll >= 0.35 && scroll < 0.65) {
      // GRID: The Climb (Y=6)
      targetPos.set(0, 6, -5)
      targetRot.set(-1, Math.PI, 0)
    } 
    else if (scroll >= 0.65 && scroll < 0.85) {
      // EXPERIENCE: Cruising Left
      targetPos.set(-4, -1, 0)
      targetRot.set(0, Math.PI + 0.3, 0)
    } 
    else if (scroll >= 0.85) {
      // END: THE SLOW CINEMATIC EXIT
      // 1. Position: Fly Right (X=9) and Zoom In (Z=2)
      // We reduced X slightly so it doesn't disappear too fast
      targetPos.set(5, 1, 6) 
      
      // 2. Rotation: REVERSED & ROTATED
      // Y = Math.PI / 2 + 0.5 (Anticlockwise rotation while turning right)
      // Z = 0.8 (Positive Bank = Tilts top/belly towards camera depending on model axis)
      // X = 0 (Level horizon)
      targetRot.set(0, Math.PI / 2 + 2, 1.7) 
    }

    // 3. PHYSICS (Slower = More Majestic)
    // Changed from 2 to 1 for a very heavy, cinematic glide.
    const smooth = 1 * delta 

    // Position
    group.current.position.lerp(targetPos, smooth)

    // Rotation (Banking)
    const bank = scrollDelta * 10
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRot.x, smooth)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRot.y, smooth)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRot.z + bank, smooth)

    // Boost
    const newBoost = THREE.MathUtils.lerp(boost, Math.abs(scrollDelta) * 50, 0.2)
    setBoost(newBoost)
  })

  const boostIntensity = THREE.MathUtils.clamp(boost, 0, 2)

  return (
    <group>
      <Environment preset="city" intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={3} color="#00f0ff" />

      <CameraShake
        intensity={boostIntensity}
        maxYaw={0.1} maxPitch={0.1} maxRoll={0.1}
      />

      <group ref={group}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Trail width={1.5} length={5} color="#00f0ff" attenuation={(t) => t * t}>
             <Center top>
                <primitive object={scene} scale={2} rotation={[0, Math.PI, 0]} />
             </Center>
          </Trail>
        </Float>
      </group>

      <Stars radius={80} count={6000} factor={4} fade speed={2} />
    </group>
  )
}