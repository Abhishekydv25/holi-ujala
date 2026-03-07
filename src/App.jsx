import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Dancing+Script:wght@600;700&family=Lato:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #1a0a2e;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .scene {
    width: 100vw;
    min-height: 100vh;
    background: radial-gradient(ellipse at 30% 20%, #3d1155 0%, #1a0a2e 40%, #0d0520 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* ── Floating orbs ── */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.18;
    animation: orbFloat 8s ease-in-out infinite;
  }
  .orb-1 { width:350px;height:350px;background:#e91e8c;top:-80px;left:-80px;animation-delay:0s; }
  .orb-2 { width:250px;height:250px;background:#ff6b9d;bottom:-60px;right:-60px;animation-delay:-3s; }
  .orb-3 { width:180px;height:180px;background:#c2185b;top:40%;left:70%;animation-delay:-5s; }

  @keyframes orbFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.08); }
  }

  /* ── Petals ── */
  .petal {
    position: fixed;
    width: 12px;
    height: 16px;
    border-radius: 50% 0 50% 0;
    opacity: 0;
    pointer-events: none;
    z-index: 100;
    animation: petalFall linear infinite;
  }

  @keyframes petalFall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.9; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  /* ── Envelope ── */
  .envelope-wrap {
    position: relative;
    cursor: pointer;
    z-index: 10;
  }

  .envelope {
    width: 320px;
    height: 220px;
    position: relative;
    filter: drop-shadow(0 20px 60px rgba(233,30,140,0.4));
    transition: transform 0.3s ease;
  }
  .envelope:hover { transform: scale(1.03); }

  .env-body {
    width: 320px;
    height: 220px;
    background: linear-gradient(145deg, #fce4ec, #f8bbd0);
    border-radius: 4px 4px 12px 12px;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(233,30,140,0.3), inset 0 1px 0 rgba(255,255,255,0.6);
  }

  .env-body::before {
    content:'';
    position:absolute;
    bottom:0;left:0;right:0;
    height:110px;
    background: linear-gradient(135deg, #f48fb1 0%, #fce4ec 50%, #f48fb1 100%);
    clip-path: polygon(0 100%, 50% 0, 100% 100%);
  }

  .env-body::after {
    content:'';
    position:absolute;
    top:0;left:0;
    width:50%;height:100%;
    background: linear-gradient(135deg, transparent, rgba(255,255,255,0.15));
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }

  .env-left-flap {
    position:absolute;
    bottom:0;left:0;
    width:0;height:0;
    border-style:solid;
    border-width: 0 0 220px 160px;
    border-color: transparent transparent #f06292 transparent;
    filter: brightness(0.9);
  }
  .env-right-flap {
    position:absolute;
    bottom:0;right:0;
    width:0;height:0;
    border-style:solid;
    border-width: 220px 0 0 160px;
    border-color: transparent transparent transparent #ec407a;
    filter: brightness(0.85);
  }

  /* Top flap */
  .env-top {
    position: absolute;
    top: 0; left: 0;
    width: 320px;
    height: 0;
    border-style: solid;
    border-width: 130px 160px 0 160px;
    border-color: #e91e8c transparent transparent transparent;
    transform-origin: top center;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 5;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  }

  .env-top.open {
    transform: rotateX(180deg);
  }

  /* Seal */
  .seal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #c2185b, #e91e8c);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 2px 12px rgba(233,30,140,0.5);
    z-index: 6;
    transition: opacity 0.3s ease;
    border: 2px solid rgba(255,255,255,0.4);
  }
  .seal.hidden { opacity: 0; pointer-events: none; }

  .click-hint {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.5);
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    letter-spacing: 0.1em;
    white-space: nowrap;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:0.4;} 50%{opacity:0.9;} }

  /* ── Card ── */
  .card-outer {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    width: 290px;
    transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 3;
    opacity: 0;
    pointer-events: none;
  }
  .card-outer.risen {
    transform: translateX(-50%) translateY(-340px);
    opacity: 1;
    pointer-events: all;
  }

  .card {
    background: linear-gradient(145deg, #fff0f6, #ffe4f0, #fff8fb);
    border-radius: 18px;
    padding: 32px 28px 28px;
    box-shadow:
      0 30px 80px rgba(233,30,140,0.35),
      0 2px 0 rgba(255,255,255,0.8) inset,
      0 -2px 0 rgba(233,30,140,0.1) inset;
    border: 1px solid rgba(233,30,140,0.15);
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .card::before {
    content:'';
    position:absolute;
    top:-40px;right:-40px;
    width:120px;height:120px;
    background: radial-gradient(circle, rgba(233,30,140,0.12), transparent 70%);
    border-radius:50%;
  }

  .card-date {
    font-family: 'Lato', sans-serif;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #e91e8c;
    margin-bottom: 14px;
    opacity: 0.8;
  }

  .card-rose { font-size: 36px; display: block; margin-bottom: 8px; animation: roseWiggle 2s ease-in-out infinite; }
  @keyframes roseWiggle { 0%,100%{transform:rotate(-5deg);}50%{transform:rotate(5deg);} }

  .card-for {
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: #ad1457;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .card-name {
    font-family: 'Dancing Script', cursive;
    font-size: 44px;
    font-weight: 700;
    background: linear-gradient(135deg, #c2185b, #e91e8c, #f06292);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    margin-bottom: 18px;
  }

  .card-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e91e8c, transparent);
    margin: 0 auto 18px;
    border-radius: 2px;
  }

  .card-msg {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 14px;
    line-height: 1.8;
    color: #5d2040;
    margin-bottom: 20px;
  }

  .card-footer {
    font-family: 'Dancing Script', cursive;
    font-size: 18px;
    color: #e91e8c;
    opacity: 0.7;
  }

  .card-sparkles {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
  }

  .spark {
    position: absolute;
    font-size: 10px;
    animation: sparkle 3s ease-in-out infinite;
  }
  @keyframes sparkle {
    0%,100%{opacity:0;transform:scale(0.5);}
    50%{opacity:1;transform:scale(1.2);}
  }

  /* Audio button */
  .audio-btn {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c2185b, #e91e8c);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 6px 24px rgba(233,30,140,0.5);
    z-index: 999;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: audioPulse 2s ease-in-out infinite;
  }
  .audio-btn:hover { transform: scale(1.1); box-shadow: 0 10px 32px rgba(233,30,140,0.7); }
  @keyframes audioPulse {
    0%,100%{box-shadow: 0 6px 24px rgba(233,30,140,0.5);}
    50%{box-shadow: 0 6px 40px rgba(233,30,140,0.9), 0 0 0 8px rgba(233,30,140,0.1);}
  }

  /* Stars bg */
  .star {
    position: fixed;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    animation: twinkle ease-in-out infinite;
  }
  @keyframes twinkle {
    0%,100%{opacity:0;} 50%{opacity:0.8;}
  }
`;

const PETAL_COLORS = [
  "#ff80ab",
  "#f48fb1",
  "#fce4ec",
  "#e91e8c",
  "#ff4081",
  "#ff79a8",
  "#ffd6e7",
];

function createPetals() {
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`,
    size: `${10 + Math.random() * 10}px`,
  }));
}

function createStars() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 5}s`,
  }));
}

export default function WomensDay() {
  const [opened, setOpened] = useState(false);
  const [petals] = useState(createPetals);
  const [stars] = useState(createStars);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const YT_PLAY =
    "https://www.youtube.com/embed/8rs_UeJ-PN8?autoplay=1&loop=1&playlist=8rs_UeJ-PN8";

  const handleOpen = () => {
    if (!opened) {
      setOpened(true);
      if (audioRef.current) {
        audioRef.current.src = YT_PLAY;
        setPlaying(true);
      }
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.src = "";
      setPlaying(false);
    } else {
      audioRef.current.src = YT_PLAY;
      setPlaying(true);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <iframe
        ref={audioRef}
        src=""
        style={{ display: "none" }}
        allow="autoplay"
        title="song"
      />

      <div className="scene">
        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Falling petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              background: p.color,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Envelope */}
        <div className="envelope-wrap" onClick={handleOpen}>
          {/* Card rises from inside */}
          <div className={`card-outer ${opened ? "risen" : ""}`}>
            <div className="card">
              <div className="card-sparkles">
                {["✨", "🌸", "💖", "⭐", "🌹"].map((s, i) => (
                  <span
                    key={i}
                    className="spark"
                    style={{
                      top: `${10 + i * 18}%`,
                      left: i % 2 === 0 ? "5%" : "88%",
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="card-date">8 March 2025 · Women's Day</div>
              <span className="card-rose">🌹</span>
              <div className="card-for">For the wonderful</div>
              <div className="card-name">Aashi</div>
              <div className="card-divider" />
              <div className="card-msg">
                आप ज़िंदगी में वो रोशनी हो
                <br />
                जो बिन माँगे मिल जाती है।
                <br />
                <br />
                <strong
                  style={{
                    color: "#c2185b",
                    fontStyle: "normal",
                    fontSize: "16px",
                  }}
                >
                  Happy Women's Day Aashi 🌸
                </strong>
              </div>
              <div className="card-footer">दिल से ❤️</div>
            </div>
          </div>

          {/* Envelope body */}
          <div className="envelope">
            <div className="env-body" />
            <div className="env-left-flap" />
            <div className="env-right-flap" />
            <div className={`env-top ${opened ? "open" : ""}`} />
            <div className={`seal ${opened ? "hidden" : ""}`}>💌</div>
          </div>

          {!opened && <div className="click-hint">✦ tap to open ✦</div>}
        </div>

        {/* Audio control */}
        <button
          className="audio-btn"
          onClick={toggleAudio}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? "🔇" : "🎵"}
        </button>
      </div>
    </>
  );
}
