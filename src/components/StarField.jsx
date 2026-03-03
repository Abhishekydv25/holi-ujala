// ⭐ StarField.jsx — Twinkling stars background for intro screen
import { useMemo } from "react";
import { rnd } from "../utils/helpers";

export default function StarField({ count = 70 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left:  `${Math.random() * 100}%`,
        top:   `${Math.random() * 100}%`,
        size:  Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        duration: rnd(1.5, 3.5).toFixed(2),
        delay:    (Math.random() * 3).toFixed(2),
      })),
    [count]
  );

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position:     "absolute",
            left:         s.left,
            top:          s.top,
            width:        s.size,
            height:       s.size,
            borderRadius: "50%",
            background:   "white",
            opacity:      s.opacity,
            animation:    `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}
