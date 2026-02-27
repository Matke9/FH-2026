import zvezde from "../../assets/zvezde.svg";
import pustinja from "../../assets/pustinja.png";

function PrizeGlowText({ children, size = "text-[64px]" }) {
  return (
    <span
      className={`relative inline-block text-white font-['Dune_Rise'] ${size}`}
    >
      {/* Glow */}
      <span
        className="absolute inset-0 blur-[30px] opacity-80 select-none"
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Glavni tekst */}
      <span className="relative [webkit-text-stroke:1px_rgba(255,255,255,0.6)]">
        {children}
      </span>
    </span>
  );
}

export default function Nagrade() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0B1C2D]">
      {/* Zvezde*/}
      <img
        src={zvezde}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Sadrzaj */}
      <div className="relative z-10 flex flex-col items-center pt-[8vh] flex-grow w-full">
        <h2 className="font-['Dune_Rise'] text-[7vw] md:text-[6vw] tracking-[0.35em] text-white mb-[5vh] text-center px-4">
          NAGRADE
        </h2>

        {/* Kontejner za nagrade */}
        <div className="relative w-full h-[300px]">
          {/* 700€ */}
          <div className="absolute left-[15%] bottom-[20px]">
            <PrizeGlowText size="text-[5vw]">700€</PrizeGlowText>
          </div>

          {/* 1000€ */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[80px]">
            <PrizeGlowText size="text-[8vw]">1000€</PrizeGlowText>
          </div>

          {/* 500€ */}
          <div className="absolute right-[15%] bottom-[10px]">
            <PrizeGlowText size="text-[7vw]">500€</PrizeGlowText>
          </div>
        </div>
      </div>

      {/* Pustinja */}
      <div className="relative z-20 w-full mt-auto leading-[0]">
        <img src={pustinja} alt="" className="w-full h-auto block" />
      </div>
    </section>
  );
}
