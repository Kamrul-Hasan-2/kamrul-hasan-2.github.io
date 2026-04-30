// Canvas particle field — drifting "AI motes" with parallax + connecting lines.
function ParticleField({ density = 80, speed = 1, hue = 195 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, w, h, dpr;
    let mouse = { x: -9999, y: -9999 };
    const N = Math.round(density);
    const ps = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006 - 0.0002,
      r: 0.4 + Math.random() * 1.6,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // soft vignette glow
      const g = ctx.createRadialGradient(w/2, h*0.55, 0, w/2, h*0.55, Math.max(w,h)*0.6);
      g.addColorStop(0, `hsla(${hue}, 90%, 60%, 0.05)`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx * speed; p.y += p.vy * speed;
        if (p.x < -0.05) p.x = 1.05; if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05; if (p.y > 1.05) p.y = -0.05;
        const X = p.x * w, Y = p.y * h;
        // mouse repel
        const dx = X - mouse.x, dy = Y - mouse.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 14000) {
          const f = (1 - d2/14000) * 0.6;
          p.vx += (dx / Math.sqrt(d2+0.01)) * 0.00008 * f;
          p.vy += (dy / Math.sqrt(d2+0.01)) * 0.00008 * f;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue + p.z*30 - 15}, 90%, ${60 + p.z*15}%, ${0.35 + p.z*0.5})`;
        ctx.arc(X, Y, p.r * p.z * 1.2, 0, Math.PI*2);
        ctx.fill();
      }
      // connecting lines (sparse)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i+1; j < ps.length; j++) {
          const a = ps[i], b = ps[j];
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
          const d2 = dx*dx + dy*dy;
          if (d2 < 9000) {
            const al = (1 - d2/9000) * 0.18;
            ctx.strokeStyle = `hsla(${hue}, 90%, 70%, ${al})`;
            ctx.beginPath();
            ctx.moveTo(a.x*w, a.y*h);
            ctx.lineTo(b.x*w, b.y*h);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [density, speed, hue]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />;
}

window.ParticleField = ParticleField;
