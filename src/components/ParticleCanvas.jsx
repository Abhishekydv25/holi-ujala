// 🎆 ParticleCanvas.jsx — Renders all particles and petals on screen
import Particle from "./Particle";
import Petal    from "./Petal";

export default function ParticleCanvas({ particles, petals }) {
  return (
    <>
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </>
  );
}
