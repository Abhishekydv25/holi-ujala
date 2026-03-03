// 🌸 Petal.jsx — Single falling flower petal

export default function Petal({ x, y, color, rot, size }) {
  return (
    <div
      style={{
        position:      "absolute",
        left:          x,
        top:           y,
        width:         size,
        height:        size * 1.5,
        borderRadius:  "50% 50% 50% 50% / 60% 60% 40% 40%",
        background:    color,
        opacity:       0.82,
        transform:     `rotate(${rot}deg)`,
        boxShadow:     `0 0 10px ${color}88`,
        pointerEvents: "none",
      }}
    />
  );
}
