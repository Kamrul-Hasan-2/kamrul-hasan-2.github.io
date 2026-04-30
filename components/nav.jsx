function SideRail({ scenes, activeIdx, onJump }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col gap-5">
        {scenes.map((s, i) => {
          const active = i === activeIdx;
          return (
            <button key={s.id} onClick={() => onJump(i)} className="group flex items-center gap-3 cursor-pointer">
              <span className={`font-mono text-[10px] tracking-widest ${active ? 'text-cyan-300' : 'text-white/30 group-hover:text-white/70'}`}>
                {String(i).padStart(2,'0')}
              </span>
              <span className={`relative block h-px transition-all duration-500 ${active ? 'w-12 bg-cyan-300' : 'w-6 bg-white/20 group-hover:w-10 group-hover:bg-white/50'}`}>
                {active && <span className="absolute inset-0 blur-[3px] bg-cyan-300/80"></span>}
              </span>
              <span className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-all ${active ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference">
      <div className="flex items-center gap-3">
        <div className="relative h-7 w-7">
          <div className="absolute inset-0 rounded-sm border border-white/40"></div>
          <div className="absolute inset-1 rounded-[2px] bg-white/90"></div>
          <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-cyan-300 ring-glow"></div>
        </div>
        <div className="leading-none">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/70">MD KAMRUL HASAN</div>
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mt-1">FLUTTER · AI · INDEX 2026</div>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-[0.22em] uppercase text-white/70">
        <a className="hover:text-white" href="#work">Work</a>
        <a className="hover:text-white" href="#stack">Stack</a>
        <a className="hover:text-white" href="#timeline">Timeline</a>
        <a className="hover:text-white" href="#contact">Transmit</a>
      </nav>
      <div className="font-mono text-[10px] tracking-[0.25em] text-white/60">
        <span className="hidden sm:inline">DHK · 23.81° N</span>
        <span className="ml-3 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          AVAILABLE Q2 '26
        </span>
      </div>
    </header>
  );
}

window.SideRail = SideRail;
window.TopBar = TopBar;
