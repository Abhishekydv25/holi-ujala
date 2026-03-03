// 🎵 MusicPlayer.jsx — Hidden auto-play audio via YouTube iframe + animated indicator
import { useRef, useEffect } from "react";
import { SONG_ID } from "../utils/constants";

export default function MusicPlayer() {
  const iframeRef = useRef(null);

  // Slight delay to allow autoplay after user gesture
  useEffect(() => {
    const t = setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Hidden iframe — audio only */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${SONG_ID}?autoplay=1&mute=0&controls=0&loop=1&playlist=${SONG_ID}&rel=0&showinfo=0&modestbranding=1`}
        allow="autoplay; encrypted-media"
        frameBorder="0"
        title="bg-audio"
        style={{
          position:      "absolute",
          width:         1,
          height:        1,
          opacity:       0,
          pointerEvents: "none",
          top:           0,
          left:          0,
        }}
      />

      {/* Music indicator badge */}
      <div
        style={{
          position:       "fixed",
          bottom:         "5rem",
          right:          "1rem",
          display:        "flex",
          alignItems:     "center",
          gap:            "0.5rem",
          background:     "rgba(255,0,110,0.15)",
          border:         "1px solid rgba(255,0,110,0.4)",
          backdropFilter: "blur(10px)",
          borderRadius:   "50px",
          padding:        "0.4rem 1rem",
          zIndex:         30,
          animation:      "fadeUp 0.8s ease 1.5s both",
          opacity:        0,
        }}
      >
        {/* Animated bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
          {[6, 10, 14, 8, 12].map((h, i) => (
            <div
              key={i}
              style={{
                width:        3,
                height:       h,
                background:   "#FF006E",
                borderRadius: 2,
                animation:    `musicBar ${0.6 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: "0.75rem", color: "#FF006E", letterSpacing: "0.1em" }}>
          🎵 Holi Song
        </span>
      </div>
    </>
  );
}
