function PrizeGlowText({ children, className = "", style = {} }) {
  const baseStyle = {
    fontFamily: "Dune Rise",
    fontSize: "96px",
    ...style,
  };

  return (
    <span className={`relative inline-block ${className}`} style={baseStyle}>
      {/* Glow layer */}
      <span
        className="absolute inset-0 text-white"
        style={{
          ...baseStyle,
          filter: "blur(35px)",
        }}
      >
        {children}
      </span>

      {/* Main text */}
      <span
        className="relative text-white"
        style={{
          ...baseStyle,
          WebkitTextStroke: "1px rgba(255,255,255,0.5)",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Nagrade() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <section className="relative h-full w-full">
        {/* Stars */}
        <img
          src="/assets/zvezde.svg"
          alt=""
          className="absolute inset-0 w-100 h-100 object-cover"
        />

        {/* Desert */}
        <img
          src="/assets/pustinja.png"
          alt=""
          className="absolute inset-0 w-100 h-100 object-cover"
        />

        {/* Title - NO glow */}
        <div
          className="absolute top-[7%] left-1/2 -translate-x-1/2 text-white tracking-[0.35em]"
          style={{
            fontFamily: "Dune Rise",
            fontSize: "64px",
          }}
        >
          NAGRADE
        </div>

        {/* 1st Prize */}
        <div className="absolute top-[24%] left-1/2 -translate-x-1/2">
          <PrizeGlowText>1000€</PrizeGlowText>
        </div>

        {/* 2nd Prize */}
        <div className="absolute top-[40%] left-[20%]">
          <PrizeGlowText>700€</PrizeGlowText>
        </div>

        {/* 3rd Prize */}
        <div className="absolute top-[44%] right-[20%]">
          <PrizeGlowText>500€</PrizeGlowText>
        </div>
      </section>
    </main>
  );
}
