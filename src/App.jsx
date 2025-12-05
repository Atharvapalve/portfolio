import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import { useProgress } from '@react-three/drei'
import { useStore } from './store/useStore'
import Spaceship from './components/canvas/Spaceship'
import Overlay from './components/ui/Overlay'

// --- 1. THE COMPULSORY LOADER (Now Pure White) ---
function CustomLoader({ onStarted }) {
  const { progress } = useProgress()
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    // FORCE ANIMATION: Count up slowly to 100 even if assets load instantly
    if (percentage < 100) {
      const t = setTimeout(() => {
        setPercentage(prev => prev + 1) 
      }, 30)
      return () => clearTimeout(t)
    }

    // Wait a moment at 100% before finishing
    if (percentage === 100) {
      const t = setTimeout(() => onStarted(true), 500)
      return () => clearTimeout(t)
    }
  }, [percentage, onStarted])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
      {/* WHITE TEXT */}
      <h2 className="mb-4 font-mono text-xl sm:text-2xl tracking-[0.3em] animate-pulse text-white text-center px-4">
        SYSTEM INITIALIZING
      </h2>
      
      {/* WHITE BAR */}
      <div className="h-1 w-64 sm:w-96 overflow-hidden rounded-full bg-gray-900">
        <div 
          className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* PERCENT NUMBER */}
      <div className="mt-2 font-mono text-xs text-gray-500 flex justify-between w-64 sm:w-96">
        <span>LOADING ASSETS</span>
        <span>{percentage}%</span>
      </div>
    </div>
  )
}

// --- 2. MAIN APP COMPONENT ---
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
      
      {/* LOADER */}
      {!ready && <CustomLoader onStarted={setReady} />}

      {/* 3D BACKGROUND */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          touchAction: 'pan-y', 
          pointerEvents: 'auto' 
        }} 
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