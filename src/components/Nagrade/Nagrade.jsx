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
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0B1C2D]">
      {/* Zvezde*/}
      <img
        src={zvezde}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative w-full min-h-screen pt-[10vh] z-10">
        {/* Naslov */}
        <h2 className="text-center mt-[10%] w-full font-['Dune_Rise'] text-[8vw] text-white">
          nagrade
        </h2>

        {/* 700€ */}
        <div className="absolute left-[23%] -translate-x-1/2 top-[115%] -translate-y-[100%]">
          <PrizeGlowText size="text-[clamp(20px,5vw,80px)]">700e</PrizeGlowText>
        </div>

        {/* 1000€ */}
        <div className="absolute left-[50%] -translate-x-1/2 top-[100%] -translate-y-[100%]">
          <PrizeGlowText size="text-[clamp(28px,8vw,130px)]">1000e</PrizeGlowText>
        </div>

        {/* 500€ */}
        <div className="absolute left-[77%] -translate-x-1/2 top-[125%] -translate-y-[100%]">
          <PrizeGlowText size="text-[clamp(18px,6vw,70px)]">500e</PrizeGlowText>
        </div>
      </div>

      {/* Pustinja */}
      <div className="relative z-5 w-full mt-auto leading-[0]">
        <img src={pustinja} alt="" className="w-full h-auto block" />
      </div>
    </section>
  );
}
