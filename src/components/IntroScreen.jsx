import StarField from "./StarField";
import Lottie from "lottie-react";
import holiAnim from "../assets/Happy Holi 2021.json";
import holiAnim1 from "../assets/happy Holi 2023.json";

export default function IntroScreen({ onStart }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        overflow: "hidden",

        // 🌌 Dark Holi Sky Background
        background:
          "linear-gradient(135deg, #ff006e 0%, #d0006f 40%, #8338ec 70%, #3a0ca3 100%)",
      }}
    >
      <Lottie
        animationData={holiAnim1}
        loop
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "clamp(160px, 18vw, 280px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* 🎨 Right Side Animation */}
      <Lottie
        animationData={holiAnim1}
        loop
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "clamp(160px, 18vw, 280px)",

          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* 🌈 Gulal Blobs */}
      <div className="gulal g1"></div>
      <div className="gulal g2"></div>
      <div className="gulal g3"></div>
      <div className="gulal g4"></div>
      <div className="gulal g5"></div>

      {/* ✨ Stars */}
      <StarField count={90} />

      {/* Text Content */}
      <div style={{ zIndex: 2 }}>
        <div
          style={{
            fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)",
            letterSpacing: "0.6em",
            color: "#ffd6ff",
            marginBottom: "1rem",
          }}
        >
          ✨ A Special Holi Surprise For ✨
        </div>

        <div
          style={{
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: "1rem",
            textShadow: "0 0 30px rgba(255,255,255,0.4)",
          }}
        >
          Ujala
        </div>

        <div
          style={{
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
            color: "#fff",
            marginBottom: "2.5rem",
          }}
        >
          🎊 Happy Holi 🎊
        </div>

        <button
          onClick={onStart}
          style={{
            padding: "1.1rem 3.8rem",
            fontSize: "1.1rem",
            fontFamily: "inherit",
            background: "linear-gradient(135deg,#FF006E,#8338EC,#3A86FF)",
            backgroundSize: "200% 200%",
            border: "none",
            color: "white",
            borderRadius: "60px",
            cursor: "pointer",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            animation: "fadeUp 1s ease 0.8s both, shimmer 6s linear infinite",
            boxShadow:
              "0 0 30px rgba(255,0,110,0.6), 0 0 60px rgba(131,56,236,0.4)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          🎨 Open Your Surprise 🎨
        </button>
      </div>

      {/* 🎬 Bottom Cartoon Animation */}
      <Lottie
        animationData={holiAnim}
        loop={true}
        style={{
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
