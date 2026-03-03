// 🌸 BloomTransition.jsx — Full-screen bloom animation between intro and gallery

export default function BloomTransition() {
  return (
    <div
      style={{
        position:       "absolute",
        inset:          0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: "10rem", animation: "bloompop 0.6s ease both" }}>
        🌸
      </div>
    </div>
  );
}
