function Loader({ onDone }) {
  const [pct, setPct] = React.useState(0);
  const [line, setLine] = React.useState(0);
  const lines = [
    "[ booting kernel /kamrul.os ]",
    "[ mounting flutter.runtime  ✓ ]",
    "[ syncing firebase.cluster   ✓ ]",
    "[ loading neural pathways    ✓ ]",
    "[ calibrating cinematic camera ]",
    "[ ready — entering scene 01 ]",
  ];
  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += 2 + Math.random() * 6;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(onDone, 450); }
      setPct(p);
      setLine(Math.min(lines.length - 1, Math.floor((p/100) * lines.length)));
    }, 70);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-0)] text-white flex flex-col">
      <div className="absolute inset-0 bg-grid opacity-40"></div>
      <div className="absolute inset-0 sun-glow opacity-30"></div>
      <div className="relative flex-1 flex flex-col justify-end p-8 md:p-14">
        <div className="font-mono text-[10px] tracking-[0.35em] text-white/40 mb-4">SYSTEM · BOOT 04 · {new Date().getFullYear()}</div>
        <div className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
          <span className="text-grad">Initializing</span><br/>
          <span className="font-serif-display text-cyan-grad">a quiet machine.</span>
        </div>
        <div className="mt-10 max-w-xl">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-white/60">
            <span>{lines[line]}</span>
            <span>{Math.floor(pct).toString().padStart(3,'0')}%</span>
          </div>
          <div className="mt-3 h-px w-full bg-white/10 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400" style={{ width: pct + '%', boxShadow: '0 0 20px rgba(110,231,255,0.6)' }}></div>
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1">
            {Array.from({length:12}).map((_,i)=>(
              <div key={i} className={`h-1 ${i < (pct/100)*12 ? 'bg-cyan-300/80' : 'bg-white/8'}`}></div>
            ))}
          </div>
        </div>
        <div className="absolute right-8 top-8 font-mono text-[10px] text-white/40 tracking-[0.25em]">
          <div>NODE · DHK-01</div>
          <div className="mt-1">VESSEL · KAMRUL.OS v2.6</div>
        </div>
      </div>
    </div>
  );
}
window.Loader = Loader;
