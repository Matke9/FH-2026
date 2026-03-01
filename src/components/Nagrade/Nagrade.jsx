import zvezde from "../../assets/zvezde.svg";
import pustinja from "../../assets/pustinja.png";

function PrizeGlowText({ children, size = "text-[64px]" }) {
  return (
    <span
      className={`relative inline-block text-white font-['DuneRise'] ${size}`}
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
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Zvezde */}
      <img
        src={zvezde}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 bg-[#0B1C2D]"
      />

      {/* Naslov */}
      <div className="relative w-full h-screen pt-[10vh] z-10">
        <h2 className="
              text-center mt-[33vh] w-full font-['DuneRise'] text-[clamp(20px,8vw,120px)] text-white
              md: mt-[20vh]"
        >
          nagrade
        </h2>
      </div>

      {/* Pustinja i nagrade */}
      <div
        className="
          absolute bottom-0 w-full z-20
          md:relative 
          md:bottom-auto
        "
      >
        {/* Pustinja */}
        <img src={pustinja} alt="" className="w-full h-auto block" />

        {/* Nagrade */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* 700€ */}
          <div className="absolute left-[24%] -translate-x-1/2 bottom-[80%]">
            <PrizeGlowText size="text-[clamp(12px,5vw,110px)]">
              700e
            </PrizeGlowText>
          </div>

          {/* 1000€ */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[100%]">
            <PrizeGlowText size="text-[clamp(15px,8vw,130px)]">
              1000e
            </PrizeGlowText>
          </div>

          {/* 500€ */}
          <div className="absolute left-[75%] -translate-x-1/2 bottom-[70%]">
            <PrizeGlowText size="text-[clamp(10px,6vw,70px)]">
              500e
            </PrizeGlowText>
          </div>

        </div>
      </div>
    </section>
  );
}