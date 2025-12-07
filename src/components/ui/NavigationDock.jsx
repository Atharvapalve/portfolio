import { useState, useEffect } from 'react';

const MENU_ITEMS = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Work', target: '#featured' },
  { label: 'Exp', target: '#experience' },
  { label: 'Contact', target: '#contact' },
];

export default function NavigationDock() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('Home'); // For Desktop Rail
  const [isOpen, setIsOpen] = useState(false); // For Mobile Menu

  // 1. DETECT SCREEN SIZE
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Run once on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. SCROLL SPY (Highlight active section on scroll)
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      MENU_ITEMS.forEach((item) => {
        const element = document.querySelector(item.target);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.label);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu if open
    }
  };

  // --- RENDER: MOBILE VIEW (< 768px) ---
  // Uses the "Corner Index" style to keep the small screen clean
  if (isMobile) {
    return (
      <>
        {/* BOTTOM LEFT: INDEX MENU */}
        <div className="fixed bottom-8 left-8 z-50 pointer-events-auto font-tech">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
          >
            <span className={`block h-2 w-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-neon-white shadow-[0_0_8px_white]' : 'bg-gray-600'}`} />
            {isOpen ? 'CLOSE' : 'INDEX'}
          </button>

          {/* Vertical List Pop-up */}
          <div className={`absolute bottom-12 left-0 flex flex-col gap-2 transition-all duration-300 origin-bottom-left ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.target)}
                className="text-left px-4 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-300 bg-black/90 backdrop-blur-md border-l-2 border-transparent hover:border-neon-white hover:text-white hover:pl-6 transition-all w-32"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM RIGHT: SIMPLE CONTACT CTA */}
        <div className="fixed bottom-8 right-8 z-50 pointer-events-auto font-tech">
          <button onClick={() => handleScroll('#contact')} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
            Contact ↗
          </button>
        </div>
      </>
    );
  }

  // --- RENDER: DESKTOP VIEW (> 768px) ---
  // Uses the "Vertical Rail" style for that Sci-Fi HUD look
  return (
    <div className="fixed right-8 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end gap-6 pointer-events-auto mix-blend-difference">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => handleScroll(item.target)}
          className="group flex items-center gap-4 outline-none"
        >
          {/* Label (Slide in on hover or active) */}
          <span 
            className={`
              text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all duration-300
              ${activeSection === item.label ? 'opacity-100 translate-x-0 text-white' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400'}
            `}
          >
            {item.label}
          </span>

          {/* The Rail Line */}
          <div 
            className={`
              h-[1px] transition-all duration-300 bg-white
              ${activeSection === item.label ? 'w-8 bg-neon-white shadow-[0_0_8px_#00f0ff]' : 'w-4 group-hover:w-6 opacity-50'}
            `}
          />
        </button>
      ))}
    </div>
  );
}