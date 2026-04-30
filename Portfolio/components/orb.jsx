// Glowing orb avatar — the protagonist. Uses radial gradients + pulsing rings.
const { useEffect, useRef, useState } = React;

function Orb({ size = 200, intent = 'idle', color = '110,231,255', accent = '167,139,250' }) {
  const ref = useRef(null);
  // gentle parallax tilt with mouse
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setTilt({ x: (e.clientX - cx) / cx * 6, y: (e.clientY - cy) / cy * 6 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative pointer-events-none select-none"
      style={{ width: size, height: size, transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`, transition: 'transform .6s ease-out' }}
    >
      {/* outer halo */}
      <div className="absolute inset-[-30%] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${color},0.18), rgba(${accent},0.08) 35%, transparent 65%)`, filter: 'blur(12px)' }} />
      {/* slow rotating ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0" style={{ animation: 'spinR 22s linear infinite' }}>
        <defs>
          <linearGradient id="orbR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`rgba(${color},0.9)`} />
            <stop offset="50%" stopColor={`rgba(${accent},0.3)`} />
            <stop offset="100%" stopColor={`rgba(${color},0.0)`} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="url(#orbR)" strokeWidth="0.6" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="78" fill="none" stroke={`rgba(${color},0.18)`} strokeWidth="0.4" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0" style={{ animation: 'spinL 30s linear infinite' }}>
        <circle cx="100" cy="100" r="64" fill="none" stroke={`rgba(${accent},0.5)`} strokeWidth="0.5" strokeDasharray="1 3" />
      </svg>
      {/* core */}
      <div className="absolute inset-[18%] rounded-full"
        style={{
          background: `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.95), rgba(${color},0.85) 22%, rgba(${accent},0.55) 55%, rgba(0,0,0,0.85) 100%)`,
          boxShadow: `0 0 60px rgba(${color},0.45), inset 0 0 40px rgba(${accent},0.4), inset 8px -8px 30px rgba(0,0,0,0.6)`,
        }} />
      {/* highlight crescent */}
      <div className="absolute inset-[20%] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle at 32% 24%, rgba(255,255,255,0.7), transparent 24%)`, mixBlendMode: 'screen' }} />
      {/* pulsing core dot */}
      <div className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: size * 0.06, height: size * 0.06,
          marginLeft: -size * 0.03, marginTop: -size * 0.03,
          background: 'white',
          boxShadow: `0 0 20px rgba(${color},1), 0 0 40px rgba(${accent},0.8)`,
          animation: 'orbPulse 2.4s ease-in-out infinite',
        }} />
      <style>{`
        @keyframes spinR { to { transform: rotate(360deg); } }
        @keyframes spinL { to { transform: rotate(-360deg); } }
        @keyframes orbPulse { 0%,100% { opacity: .6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
      `}</style>
    </div>
  );
}

window.Orb = Orb;
