const DOCK_ITEMS = [
  { label: 'Home', target: '#hero' },
  { label: 'Work', target: '#featured' },
  { label: 'Grid', target: '#all-projects' },
  { label: 'Exp', target: '#experience' },
  { label: 'About', target: '#about' },
  { label: 'Contact', target: '#contact' },
];

function scrollToTarget(target) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function NavigationDock() {
  return (
    <div className="pointer-events-auto fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.22em] text-gray-100 backdrop-blur-md shadow-lg shadow-black/40">
        {DOCK_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => scrollToTarget(item.target)}
            className="rounded-full px-3 py-1 text-[0.65rem] font-medium text-gray-100 transition hover:bg-white/20"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}



