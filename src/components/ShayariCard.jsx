// 📜 ShayariCard.jsx — Beautiful shayari/message card

export default function ShayariCard() {
  return (
    <div
      style={{
        background:     "rgba(255,255,255,0.05)",
        border:         "1px solid rgba(255,0,110,0.3)",
        backdropFilter: "blur(14px)",
        borderRadius:   "20px",
        padding:        "1rem 1.8rem",
        maxWidth:       "min(90vw, 480px)",
        width:          "100%",
        textAlign:      "center",
        zIndex:         20,
        animation:      "fadeUp 0.8s ease 0.7s both",
        opacity:        0,
        boxShadow:      "0 0 40px rgba(255,0,110,0.1)",
      }}
    >
      <div
        style={{
          fontSize:   "clamp(0.85rem, 2vw, 1.05rem)",
          color:      "#FFBE0B",
          fontStyle:  "italic",
          lineHeight: 1.9,
        }}
      >
        "होली के इन रंगों की तरह
        <br />
        <span style={{ color: "#FF4D6D" }}>आप भी हमेशा खिलती रहें,</span>
        <br />
        हर दिन नई खुशियाँ मिलें आपको,
        <br />
        <span style={{ color: "#06D6A0" }}>हर पल आपकी मुस्कान बनी रहे।"</span>
      </div>
    </div>
  );
}
