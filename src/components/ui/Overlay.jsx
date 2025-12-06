import { motion } from 'framer-motion';
import Section from './Section';
import Controls from './Controls';
import { featuredProjects, archiveProjects } from '../../data/projects';
import { Timeline } from './Timeline';
import { useStore } from '../../store/useStore';


const skills = ['Python', 'PyTorch', 'TensorFlow', 'MERN Stack', 'FastAPI', 'Redis', 'WebGL', 'Docker'];

const workExperience = [
  {
    title: 'IoT & ML Intern · ArmsRobotics',
    meta: '2025 · Remote',
    body: 'Engineered embedded ML prototypes for Reliance Refineries & Vantara. Achieved 90%+ classification accuracy on edge devices while keeping real-time telemetry latency under 300ms.',  },
  {
    title: 'Full Stack Intern · Vanillakart',
    meta: '2024 · Remote',
    body: 'Architected wallet and inventory modules for a custom MERN commerce stack. Automated CI/CD workflows using Git, improving deployment pipeline efficiency by 25%.',  },
];

const education = [
  {
    title: 'B.E. Information Technology',
    subtitle: 'Fr. C. Rodrigues Institute of Technology',
    meta: '2024 – 2027',
    body: 'Focus: Data Structures, Algorithms, and Distributed Systems.',
  },
  {
    title: 'Higher Secondary (HSC)',
    subtitle: 'DAV Public School, Nerul',
    meta: '2011 – 2023',
    body: 'Strong foundation in Mathematics and Computer Science.',
  },
];

// CORRECTED CERTIFICATES
const achievements = [
  {
    title: 'Investor Certification Examination',
    subtitle: 'SEBI & NISM · 2024',
    link: 'https://www.linkedin.com/posts/atharva-palve_finance-sebi-nism-share-7235913939820163072-Ncji?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE04ud4B18BZVd8TaTuYcYiPywvawZ5X6ts'
  },
  {
    title: 'What Is Generative AI?',
    subtitle: 'LinkedIn Learning · 2025',
    // The Direct Certificate Link you provided
    link: 'https://www.linkedin.com/learning/certificates/45a796cf8f4b3f6fa8b6970337c30bf5cbec298a2f8e42629447e747b6e3d642?trk=share_certificate'
  },
  {
    title: 'Applied AI & Generative AI',
    subtitle: 'LinkedIn Learning · 2025',
    // The Post Link regarding Applied AI
    link: 'https://www.linkedin.com/posts/atharva-palve_ai-generativeai-artificialintelligence-share-7311007575557242880-7KrT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE04ud4B18BZVd8TaTuYcYiPywvawZ5X6ts'
  },
];

export default function Overlay() {
  const setActiveProjectColor = useStore((s) => s.setActiveProjectColor);
  const resetAccent = () => setActiveProjectColor('#38bdf8');

  return (
    <main className="relative z-10 min-h-screen bg-transparent text-gray-200 pointer-events-none">
      {/* RENDER CONTROLS HERE (Top Right) */}
      <Controls />
      {/* 1. HERO (UPDATED - ELEGANT VERSION) */}
      <Section id="hero" className="pt-24" sectionKey="hero">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 relative z-20">
            <header className="text-xs tracking-[0.35em] uppercase text-gray-500 font-bold font-tech">
              PORTFOLIO 2025
            </header>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* NAME: Elegant, Thin, Italic Mix */}
              <h1 className="leading-none text-white">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-tech font-light tracking-wider opacity-90">
                  Atharva
                </span>
                <span className="block text-7xl sm:text-8xl lg:text-9xl font-elegant italic font-normal mt-2 tracking-tight">
                  Palve
                </span>
              </h1>

              {/* STUDENT STATUS - Clean & Professional */}
              <div className="pt-6 pl-1 border-l border-white/20">
                <p className="text-lg sm:text-xl text-white font-tech font-medium tracking-wide">
                  IT Engineering Student
                </p>
                <p className="text-sm sm:text-base text-gray-400 mt-2 font-tech max-w-md leading-relaxed">
                  Specializing in <span className="text-white">Applied Machine Learning</span> & Scalable Web Systems.
                </p>
              </div>
            </motion.div>

            <div className="pt-8 pointer-events-auto">
                <a href="#featured" className="group flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors font-tech uppercase tracking-[0.2em]">
                    <span className="border-b border-gray-600 group-hover:border-white pb-0.5">View Projects</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>
          </div>
          <div className="h-[55vh] sm:h-[60vh] lg:h-[80vh]" />
        </div>
      </Section>

      {/* 2. ABOUT */}
      <Section id='about' sectionKey='about'>
        <div className='space-y-6'>
          <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>About Me</p>
          <p className='text-lg leading-relaxed text-gray-300'>
            I engineer systems where <span className="text-white">Machine Learning</span> meets robust architecture. 
            Leveraging my background in Full Stack and IoT, I build end-to-end predictive applications 
            that solve complex real-world problems. My focus is on deploying intelligent models 
            that are scalable, efficient, and impactful.
          </p>
        </div>
      </Section>

      {/* 3. SKILLS */}
      <Section id='skills'>
        <div className='space-y-6'>
          <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Tech Stack</p>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pointer-events-auto'>
            {skills.map((skill) => (
              <div key={skill} className='rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-gray-100 backdrop-blur-sm hover:bg-white/10 transition-colors'>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. FEATURED PROJECTS */}
      <Section id='featured' sectionKey='featured'>
        <div className='space-y-6'>
          <div>
            <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Featured Projects</p>
            <h2 className='text-2xl sm:text-3xl font-light text-gray-100'>Engineering Intelligence.</h2>
          </div>
          <div className='grid gap-6 md:grid-cols-3 pointer-events-auto'>
            {featuredProjects.map((project) => (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                key={project.title}
                className='block space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10'
              >
                <p className='text-[0.7rem] tracking-[0.22em] uppercase text-gray-500'>
                  {project.category}
                </p>
                <h3 className='text-base font-medium text-gray-100'>{project.title} ↗</h3>
                <p className='text-xs text-gray-400 leading-relaxed'>{project.description}</p>
                <div className='flex flex-wrap gap-2 pt-2 text-[0.65rem] text-gray-400'>
                  {(project.tech || []).map((tag) => (
                    <span key={tag} className='rounded-full border border-white/20 px-3 py-1'>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. ARCHIVE GRID */}
      <Section id='all-projects' sectionKey='grid'>
        <div className='space-y-6'>
          <div>
            <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Full Archive</p>
            <h2 className='text-2xl sm:text-3xl font-light text-gray-100'>All builds & experiments.</h2>
          </div>
          <div className='grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] pointer-events-auto'>
            {archiveProjects.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
                className='group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 backdrop-blur-sm hover:-translate-y-1 hover:border-white/30 hover:bg-white/10'
                onMouseEnter={() => setActiveProjectColor(project.color)}
                onMouseLeave={resetAccent}
              >
                <div className='space-y-2'>
                  <p className='text-xs uppercase tracking-[0.25em] text-gray-500'>{project.year}</p>
                  <h3 className='text-lg font-medium text-gray-100'>{project.title} ↗</h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div className='mt-4 flex flex-wrap gap-2 text-[0.65rem] text-gray-300'>
                  {(project.tech || []).map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border border-white/15 px-3 py-1 text-gray-200 transition group-hover:border-white/40'>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. EXPERIENCE */}
      <Timeline
        id='experience'
        sectionKey='experience'
        eyebrow='Professional History'
        title='Experience.'
        items={workExperience}
      />

      {/* 7. EDUCATION */}
      <Timeline
        id='education'
        sectionKey='education'
        eyebrow='Academic Foundation'
        title='Education.'
        items={education}
      />

      {/* 8. ACHIEVEMENTS */}
      <Section id='achievements'>
        <div className='space-y-6'>
          <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Certifications</p>
          <div className='grid gap-4 sm:grid-cols-2 pointer-events-auto'>
            {achievements.map((item) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={item.title}
                className='block rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-gray-100 backdrop-blur-sm hover:bg-white/10 transition-colors'
              >
                <h3 className='font-medium'>{item.title} ↗</h3>
                <p className='text-xs text-gray-400 mt-1'>{item.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. RESUME */}
      <Section id='resume'>
        <div className='rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-10 text-center text-gray-100 backdrop-blur-sm'>
          <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Resume</p>
          <h2 className='mt-3 text-3xl font-light'>Hiring?</h2>
          <p className='mt-2 text-gray-300'>Download my detailed resume to see the full technical breakdown.</p>
          
          {/* DOWNLOAD BUTTON - Points to /resume.pdf in public folder */}
          <a 
            href="/resume.pdf" 
            download="Atharva_Palve_Resume.pdf"
            className='mt-6 inline-block rounded-full bg-gray-100 px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-900 hover:bg-white transition-colors pointer-events-auto'
          >
            Download Resume
          </a>
        </div>
      </Section>

      {/* 10. CONTACT */}
      <Section id='contact'>
        <div className='space-y-4'>
          <p className='text-xs tracking-[0.35em] uppercase text-gray-500'>Contact</p>
          <h2 className='text-3xl font-light text-gray-100'>Let&apos;s build something intelligent.</h2>
          <p className='max-w-md text-sm text-gray-400'>
            Open to ML Engineering roles and Full Stack collaborations.
          </p>
          <a
            href='mailto:atharva.palve10@gmail.com'
            className='inline-block rounded-full border border-white/15 px-6 py-2 text-xs uppercase tracking-[0.22em] text-gray-200 hover:bg-white/10 transition pointer-events-auto'
          >
            atharva.palve10@gmail.com
          </a>
        </div>
      </Section>

      {/* 11. FOOTER */}
      <Section id='social' className='pb-40 pt-10'>
        <footer className='pointer-events-auto flex flex-col gap-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-8'>
          
          <span className="text-center sm:text-left">
            © {new Date().getFullYear()} Atharva Palve
          </span>

          {/* Social Links - Centered on Mobile, Row on Desktop */}
          <div className='flex justify-center gap-8 text-xs uppercase tracking-[0.2em] font-medium'>
            <a 
              href='https://github.com/Atharvapalve' 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:text-white transition-colors p-2' // Added padding for easier tapping
            >
              GitHub
            </a>
            <a 
              href='https://linkedin.com/in/atharva-palve' 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:text-white transition-colors p-2'
            >
              LinkedIn
            </a>
          </div>

        </footer>
      </Section>
    </main>
  );
}