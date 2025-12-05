import { useEffect, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis' // Check if you use 'lenis' or '@studio-freight/react-lenis'
import { useProgress } from '@react-three/drei'
import { useStore } from './store/useStore'
import Spaceship from './components/canvas/Spaceship'
import Overlay from './components/ui/Overlay'

function CustomLoader({ onStarted }) {
  const { progress } = useProgress()
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (percentage < progress) {
      const t = setTimeout(() => setPercentage(prev => Math.min(prev + 5, progress)), 20)
      return () => clearTimeout(t)
    }
    if (percentage === 100) {
      const t = setTimeout(() => onStarted(true), 500)
      return () => clearTimeout(t)
    }
  }, [progress, percentage, onStarted])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
      <h2 className="mb-4 font-mono text-xl tracking-[0.3em] animate-pulse text-neon-white">
        SYSTEM INITIALIZING
      </h2>
      <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-800">
        <div 
          className="h-full bg-neon-white transition-all duration-75 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const setScrollProgress = useStore((state) => state.setScrollProgress)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', (e) => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? e.scroll / total : 0
      setScrollProgress(progress)
    })

    return () => {
      lenis.destroy()
    }
  }, [setScrollProgress])

  return (
    <div className="relative w-full min-h-screen bg-[#050505]">
      
      {!ready && <CustomLoader onStarted={setReady} />}

      {/* 3D BACKGROUND */}
      {/* touchAction: 'pan-y' allows vertical scroll on mobile while keeping horizontal touch for steering */}
      <div 
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ touchAction: 'pan-y' }} 
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
             <Spaceship />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML CONTENT */}
      <div 
        className={`relative z-10 pointer-events-none transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Overlay />
      </div>

    </div>
  )
}
