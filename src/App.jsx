import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import { useStore } from './store/useStore'
import Spaceship from './components/canvas/Spaceship'
import Overlay from './components/ui/Overlay'

export default function App() {
  const setScrollProgress = useStore((state) => state.setScrollProgress)

  // Smooth scrolling with Lenis, feeding scrollProgress into the store
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
      {/* 3D BACKGROUND (Fixed & Interactive) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        {/* pointer-events-auto is needed for the ship to detect mouse clicks! */}
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <Spaceship />
        </Canvas>
      </div>

      {/* HTML CONTENT (Scrollable) */}
      <div className="relative z-10 pointer-events-none">
        <Overlay />
      </div>
    </div>
  )
}


