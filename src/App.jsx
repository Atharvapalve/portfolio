import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import Lenis from 'lenis'
import { useStore } from './store/useStore'
import Spaceship from './components/canvas/Spaceship'
import Overlay from './components/ui/Overlay'

function CustomLoader({ onStarted }) {
  const { progress } = useProgress()
  const [percentage, setPercentage] = useState(0)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Enforce minimum 2.5 second wait
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 1. Smoothly animate the percentage up to the real progress
    if (percentage < progress) {
      const t = setTimeout(() => setPercentage(prev => Math.min(prev + 5, progress)), 20)
      return () => clearTimeout(t)
    }
    
    // 2. If fully loaded (100%) AND minimum time has elapsed, trigger finish
    if (percentage === 100 && minTimeElapsed) {
      const t = setTimeout(() => onStarted(true), 500) // Small fade delay
      return () => clearTimeout(t)
    }
  }, [progress, percentage, minTimeElapsed, onStarted])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
      {/* GLITCH TEXT EFFECT */}
      <h2 className="mb-4 font-mono text-xl tracking-[0.3em] animate-pulse text-white">
        SYSTEM INITIALIZING
      </h2>
      
      {/* BAR */}
      <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-800">
        <div 
          className="h-full bg-white transition-all duration-75 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* PERCENTAGE */}
      <p className="mt-2 font-mono text-xs text-gray-500">
        LOADING ASSETS... {percentage.toFixed(0)}%
      </p>
    </div>
  )
}

export default function App() {
  const setScrollProgress = useStore((state) => state.setScrollProgress)
  const [ready, setReady] = useState(false)

  // Smooth scrolling with Lenis, feeding scrollProgress into the store
  useEffect(() => {
    if (!ready) return // Don't initialize Lenis until ready

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
  }, [ready, setScrollProgress])

  return (
    <div className="relative w-full min-h-screen bg-[#050505]">
      {/* 1. COMPULSORY LOADER */}
      {/* Only unmount this when 'ready' is true */}
      {!ready && <CustomLoader onStarted={setReady} />}

      {/* 2. 3D BACKGROUND (Loads immediately behind the black screen) */}
      <div className="fixed inset-0 z-0 pointer-events-auto" style={{ touchAction: 'pan-y' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Spaceship />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. HTML CONTENT (Fades in when ready) */}
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
