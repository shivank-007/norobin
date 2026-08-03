export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "var(--primary)",
          color: "#000",
          display: "grid",
          placeItems: "center",
          fontWeight: 700,
        }}
      >
        N
      </div>

      <span
        style={{
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.5px",
        }}
      >
        NOROBIN
      </span>
    </div>
  );
}