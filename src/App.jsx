// 🎨 App.jsx — Master controller: manages phase, particles, petals & layout
import { useState, useEffect, useRef } from "react";
import "./index.css";

import ParticleCanvas from "./components/ParticleCanvas";
import IntroScreen from "./components/IntroScreen";
import BloomTransition from "./components/BloomTransition";
import GalleryScreen from "./components/GalleryScreen";

import { HOLI_COLORS } from "./utils/constants";
import { rnd, generateBurst, generatePetal } from "./utils/helpers";

import photo1 from "./assets/6138638495677877660_121.jpg"; // actual filename likhein
import photo2 from "./assets/6138638495677877661_121.jpg";
import photo3 from "./assets/6138638495677877662_121.jpg";
import photo4 from "./assets/image.png";

// ──────────────────────────────────────
// 📸 Base64 photos (imported inline)
// ──────────────────────────────────────
const PHOTOS = [photo1, photo2, photo3, photo4];

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [particles, setParticles] = useState([]);
  const [petals, setPetals] = useState([]);

  const idRef = useRef(0);
  const stateRef = useRef({ particles: [], petals: [] });
  const containerRef = useRef(null);

  // ── Particle physics loop ─────────────────────────────
  useEffect(() => {
    const loop = setInterval(() => {
      stateRef.current.particles = stateRef.current.particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1,
          life: p.life - 1,
        }))
        .filter((p) => p.life > 0);
      setParticles([...stateRef.current.particles]);
    }, 16);
    return () => clearInterval(loop);
  }, []);

  // ── Petal spawn ───────────────────────────────────────
  useEffect(() => {
    if (phase !== "gallery") return;
    const sp = setInterval(() => {
      const petal = generatePetal(idRef.current++, HOLI_COLORS);
      stateRef.current.petals = [...stateRef.current.petals.slice(-35), petal];
      setPetals([...stateRef.current.petals]);
    }, 120);
    return () => clearInterval(sp);
  }, [phase]);

  // ── Petal physics loop ────────────────────────────────
  useEffect(() => {
    if (phase !== "gallery") return;
    const loop = setInterval(() => {
      stateRef.current.petals = stateRef.current.petals
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          rot: p.rot + p.rotV,
        }))
        .filter((p) => p.y < window.innerHeight + 50);
      setPetals([...stateRef.current.petals]);
    }, 16);
    return () => clearInterval(loop);
  }, [phase]);

  // ── Burst helper ──────────────────────────────────────
  function burst(cx, cy, count = 70) {
    const newPs = generateBurst(cx, cy, count, HOLI_COLORS, idRef);
    stateRef.current.particles = [...stateRef.current.particles, ...newPs];
    setParticles([...stateRef.current.particles]);
  }

  // ── Start sequence ────────────────────────────────────
  function handleStart() {
    setPhase("bloom");
    burst(window.innerWidth / 2, window.innerHeight / 2, 130);
    setTimeout(() => {
      burst(window.innerWidth / 3, window.innerHeight / 3, 80);
      burst((window.innerWidth * 2) / 3, window.innerHeight / 3, 80);
    }, 300);
    setTimeout(() => setPhase("gallery"), 1400);
  }

  // ── Background click → burst ──────────────────────────
  function handleBgClick(e) {
    const rect = containerRef.current.getBoundingClientRect();
    burst(e.clientX - rect.left, e.clientY - rect.top, 60);
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          phase === "intro"
            ? "linear-gradient(135deg,#0a0a1a,#1a0533,#0d1a2e)"
            : "linear-gradient(135deg,#0d0015 0%,#1a0500 40%,#001510 80%,#00091a 100%)",
        transition: "background 1.5s ease",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* 🎆 Particles + Petals layer */}
      <ParticleCanvas particles={particles} petals={petals} />

      {/* ── Phases ── */}
      {phase === "intro" && <IntroScreen onStart={handleStart} />}
      {phase === "bloom" && <BloomTransition />}
      {phase === "gallery" && (
        <GalleryScreen photos={PHOTOS} onBgClick={handleBgClick} />
      )}
    </div>
  );
}
