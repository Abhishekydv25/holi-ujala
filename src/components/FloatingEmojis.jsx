// 🎊 FloatingEmojis.jsx — Bottom row of animated floating emojis
import { FLOAT_EMOJIS } from "../utils/constants";

export default function FloatingEmojis() {
  return (
    <div
      style={{
        position:       "fixed",
        bottom:         "0.8rem",
        left:           0,
        right:          0,
        display:        "flex",
        justifyContent: "center",
        gap:            "1.2rem",
        fontSize:       "1.4rem",
        zIndex:         15,
        animation:      "fadeUp 0.8s ease 1.1s both",
        opacity:        0,
      }}
    >
      {FLOAT_EMOJIS.map((emoji, i) => (
        <span
          key={i}
          style={{
            display:   "inline-block",
            animation: `float ${1.5 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
