// 📸 PhotoSlider.jsx — Photo carousel with prev/next + dot indicators
import { PHOTO_CAPTIONS } from "../utils/constants";

export default function PhotoSlider({
  photos,
  slide,
  slideAnim,
  onPrev,
  onNext,
  onDot,
}) {
  const current = PHOTO_CAPTIONS[slide];

  return (
    <div style={{ position: "relative", zIndex: 10, marginBottom: "0.5rem" }}>
      {/* Rainbow glow border */}
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: "28px",
          background:
            "linear-gradient(135deg,#FF006E,#FFBE0B,#3A86FF,#06D6A0,#FF006E)",
          backgroundSize: "300% 300%",
          animation: "shimmer 3s linear infinite",
          filter: "blur(4px)",
          zIndex: -1,
        }}
      />

      {/* Photo */}
      <div
        style={{
          animation:
            slideAnim === "in"
              ? "slideIn 0.4s ease both"
              : "slideOut 0.4s ease both",
        }}
      >
        {/* <img
          src={`data:image/png;base64,${photos[slide]}`}
          alt={`Ujala ${slide + 1}`}
          style={{
            width: "clamp(220px, 45vw, 380px)",
            height: "clamp(260px, 54vw, 450px)",
            objectFit: "cover",
            borderRadius: "24px",
            display: "block",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        /> */}
        <img
          src={photos[slide]}
          alt={`Ujala ${slide + 1}`}
          style={{
            width: "clamp(220px, 45vw, 380px)",
            height: "clamp(260px, 54vw, 450px)",
            objectFit: "cover",
            borderRadius: "24px",
            display: "block",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        />

        {/* Caption overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            borderRadius: "0 0 24px 24px",
            padding: "2rem 1.2rem 1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              fontWeight: "bold",
              background: "linear-gradient(90deg,#FFBE0B,#FF006E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.3rem",
            }}
          >
            {current.caption}
          </div>
          <div
            style={{
              fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
              color: "#ffffffcc",
              fontStyle: "italic",
            }}
          >
            {current.sub}
          </div>
        </div>
      </div>

      {/* Navigation row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "0.8rem",
          animation: "fadeUp 0.8s ease 0.5s both",
          opacity: 0,
        }}
      >
        {/* Prev */}
        <button
          onClick={onPrev}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          ‹
        </button>

        {/* Dots */}
        {photos.map((_, i) => (
          <div
            key={i}
            onClick={() => onDot(i)}
            style={{
              width: i === slide ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === slide ? "#FF006E" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}

        {/* Next */}
        <button
          onClick={onNext}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
