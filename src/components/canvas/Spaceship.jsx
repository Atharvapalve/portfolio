import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, Stars, Environment, Trail, CameraShake, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function Spaceship() {
  const { scene } = useGLTF('/models/ship.glb')
  const group = useRef()
  const lastScroll = useRef(0)
  const [boost, setBoost] = useState(0)
  
  // Responsive State
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame((state, delta) => {
    const scroll = useStore.getState().scrollProgress || 0
    const scrollDelta = scroll - lastScroll.current
    lastScroll.current = scroll

    // --- RESPONSIVE FLIGHT PATH ---
    const targetPos = new THREE.Vector3(0, 0, 0)
    const targetRot = new THREE.Euler(0, 0, 0)

    if (scroll < 0.1) {
      // HERO
      // Desktop: Right side | Mobile: Center, slightly lower
      targetPos.set(isMobile ? 0 : 3, isMobile ? -1 : -1.5, 0)
      targetRot.set(0.1, Math.PI - 0.3, 0)
    } 
    else if (scroll >= 0.1 && scroll < 0.35) {
      // ABOUT
      // Desktop: Center Close | Mobile: Center Close (Higher up)
      targetPos.set(0, isMobile ? 1 : -1, 3) 
      targetRot.set(0.3, Math.PI, 0.2)
    } 
    else if (scroll >= 0.35 && scroll < 0.65) {
      // GRID
      // Fly Up (Reduced height for mobile so it doesn't vanish too fast)
      targetPos.set(0, isMobile ? 5 : 6, -5)
      targetRot.set(-1, Math.PI, 0)
    } 
    else if (scroll >= 0.65 && scroll < 0.85) {
      // EXPERIENCE
      // Desktop: Left Side | Mobile: Center Bottom (Background)
      targetPos.set(isMobile ? 0 : -4, -1, 0)
      targetRot.set(0, Math.PI + 0.3, 0)
    } 
    else if (scroll >= 0.85) {
      targetPos.set(5, 1, 6) 
      
      // 2. Rotation: REVERSED & ROTATED
      // Y = Math.PI / 2 + 0.5 (Anticlockwise rotation while turning right)
      // Z = 0.8 (Positive Bank = Tilts top/belly towards camera depending on model axis)
      // X = 0 (Level horizon)
      targetRot.set(0, Math.PI / 2 + 2, 1.7)
    }

    // --- PHYSICS ---
    const smooth = 1 * delta 
    const mouseX = isMobile ? 0 : (state.pointer.x * 0.5)
    const mouseY = isMobile ? 0 : (state.pointer.y * 0.5)

    // 2. Apply Position with Mouse Influence
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetPos.x + mouseX, smooth)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetPos.y + mouseY, smooth)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetPos.z, smooth)

    // Banking
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

      <CameraShake intensity={boostIntensity} maxYaw={0.1} maxPitch={0.1} maxRoll={0.1} />

      <group ref={group}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Trail width={isMobile ? 1 : 1.5} length={5} color="#00f0ff" attenuation={(t) => t * t}>
             <Center top>
                {/* Responsive Scale: Smaller on Mobile */}
                <primitive object={scene} scale={isMobile ? 1.4 : 2} rotation={[0, Math.PI, 0]} />
             </Center>
          </Trail>
        </Float>
      </group>

      <Stars radius={80} count={isMobile ? 2000 : 6000} factor={4} fade speed={2} />
    </group>
  )
}