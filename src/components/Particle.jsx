// 💥 Particle.jsx — Single color burst particle

export default function Particle({ x, y, color, size, life, maxLife }) {
  const opacity = life / maxLife;
  const scale   = 0.3 + (life / maxLife) * 0.7;
  const blur    = (1 - life / maxLife) * 2;

  return (
    <div
      style={{
        position:      "absolute",
        left:          x,
        top:           y,
        width:         size,
        height:        size,
        borderRadius:  "50%",
        background:    color,
        opacity,
        transform:     `scale(${scale})`,
        filter:        `blur(${blur}px)`,
        boxShadow:     `0 0 ${size * 2}px ${color}`,
        pointerEvents: "none",
      }}
    />
  );
}
