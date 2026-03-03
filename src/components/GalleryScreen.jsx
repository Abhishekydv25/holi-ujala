// 🖼️ GalleryScreen.jsx — Main gallery with slideshow, shayari, music & emojis
import { useState, useEffect, useRef } from "react";
import PhotoSlider from "./PhotoSlider";
import ShayariCard from "./ShayariCard";
import MusicPlayer from "./MusicPlayer";
import FloatingEmojis from "./FloatingEmojis";

import Lottie from "lottie-react";
import holiAnim from "../assets/happy Holi 2023.json";

export default function GalleryScreen({ photos, onBgClick }) {
  const [slide, setSlide] = useState(0);
  const [slideAnim, setSlideAnim] = useState("in");
  const timerRef = useRef(null);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goNext(), 4000);
    return () => clearInterval(timerRef.current);
  }, [slide]);

  function goNext() {
    setSlideAnim("out");
    setTimeout(() => {
      setSlide((s) => (s + 1) % photos.length);
      setSlideAnim("in");
    }, 400);
  }

  function goPrev() {
    setSlideAnim("out");
    setTimeout(() => {
      setSlide((s) => (s - 1 + photos.length) % photos.length);
      setSlideAnim("in");
    }, 400);
  }

  function goDot(i) {
    setSlideAnim("out");
    setTimeout(() => {
      setSlide(i);
      setSlideAnim("in");
    }, 400);
  }

  return (
    <div
      onClick={onBgClick}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50px", // 👈 add this
      }}
    >
      {/* 🎨 Left Side Animation */}
      <Lottie
        animationData={holiAnim}
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
        animationData={holiAnim}
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

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 20,
          animation: "fadeUp 0.8s ease 0.2s both",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
            letterSpacing: "0.4em",
            color: "#FFBE0B",
            textTransform: "uppercase",
          }}
        >
          🌸 Ujala — होली की शुभकामनाएँ 🌸
        </span>
      </div>

      {/* Photo slider */}
      <PhotoSlider
        photos={photos}
        slide={slide}
        slideAnim={slideAnim}
        onNext={(e) => {
          e.stopPropagation();
          goNext();
        }}
        onPrev={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        onDot={(i) => goDot(i)}
      />

      {/* Shayari card */}
      <ShayariCard />

      {/* Tap hint */}
      <div
        style={{
          position: "fixed",
          top: "3.5rem",
          right: "1rem",
          fontSize: "0.7rem",
          color: "#ffffff33",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          animation: "blink 2s ease-in-out infinite",
        }}
      >
        Tap to burst 💥
      </div>

      {/* Auto-play music */}
      <MusicPlayer />

      {/* Floating emojis row */}
      <FloatingEmojis />
    </div>
  );
}
