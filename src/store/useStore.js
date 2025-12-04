import { create } from 'zustand';

export const useStore = create((set) => ({
  // Scroll / section state
  scrollY: 0,
  scrollProgress: 0,
  currentSection: 'hero',
  setScrollState: ({ scrollY = 0, scrollProgress = 0, currentSection = 'hero' }) =>
    set({ scrollY, scrollProgress, currentSection }),
  setScrollProgress: (scrollProgress = 0) => set({ scrollProgress }),
  setSection: (currentSection) => set({ currentSection }),

  // Visual accent state (e.g., for Liquid Grid hovers)
  activeProjectColor: '#0ea5e9',
  setActiveProjectColor: (color) => set({ activeProjectColor: color }),
  
  // Hover state
  hoveredObject: null,
  setHoveredObject: (object) => set({ hoveredObject: object }),
  
  // System status
  systemStatus: 'ONLINE',
  latency: 12,
  setSystemStatus: (status) => set({ systemStatus: status }),
  setLatency: (latency) => set({ latency }),
  
  // Current project
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),
}));

