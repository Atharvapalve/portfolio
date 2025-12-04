// src/data/projects.js

const projects = [
  {
    title: 'Multi-Agent Encryption',
    category: 'ML Research',
    year: '2025',
    description: 'Hybrid encryption model for secure AI agent communication. Ongoing collaboration with IIT Dharwad.',
    tech: ['Python', 'Cryptography', 'Simulation'],
    size: 'wide',
    color: '#3366ff',
    link: null // No link yet (Research)
  },
  {
    title: 'WaveHabitat',
    category: 'IoT & Embedded ML',
    year: '2024',
    description: 'Real-time aquatic telemetry system with custom PCB and edge-ML predictions.',
    tech: ['ESP32', 'IoT', 'Machine Learning'],
    size: 'tall',
    color: '#00ff88',
    link: 'https://github.com/Atharvapalve/Wave-habitat.git'
  },
  {
    title: 'Cafe Management System',
    category: 'Full Stack',
    year: '2023',
    description: 'Scalable MERN stack app processing orders with inventory & wallet logic.',
    tech: ['React', 'MongoDB', 'Express', 'Node.js'],
    size: 'wide',
    color: '#00ffff',
    link: 'https://github.com/Atharvapalve/cafe-management-sys.git'
  },
  {
    title: 'Sentient Portfolio',
    category: 'Web Engineering',
    year: '2025',
    description: 'This website. A study in React Three Fiber, Shaders, and UI performance.',
    tech: ['R3F', 'WebGL', 'Tailwind'],
    size: 'square',
    color: '#ffffff',
    link: 'https://github.com/Atharvapalve' // Points to your profile
  },
];

export default projects;
export const featuredProjects = projects.slice(0, 3);
export const archiveProjects = projects;