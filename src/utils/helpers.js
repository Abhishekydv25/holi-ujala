// 🎲 Random number between a and b
export function rnd(a, b) {
  return a + Math.random() * (b - a);
}

// 💥 Generate burst particles
export function generateBurst(cx, cy, count = 70, colors, idRef) {
  return Array.from({ length: count }, () => {
    const angle = rnd(0, Math.PI * 2);
    const speed = rnd(3, 14);
    const life = Math.floor(rnd(35, 90));
    return {
      id: idRef.current++,
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rnd(2, 7),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: rnd(8, 22),
      life,
      maxLife: life,
    };
  });
}

// 🌸 Generate a single petal
export function generatePetal(id, colors) {
  return {
    id,
    x: rnd(0, window.innerWidth),
    y: -30,
    vx: rnd(-0.8, 0.8),
    vy: rnd(1.2, 2.5),
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: rnd(0, 360),
    rotV: rnd(-2, 2),
    size: rnd(8, 18),
  };
}
