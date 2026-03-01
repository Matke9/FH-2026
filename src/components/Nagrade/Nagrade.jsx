import zvezde from "../../assets/Nagrade/zvezde.svg";

import HT_pustinja from "../../assets/Nagrade/HT_pustinja.svg";
import BC_pustinja from "../../assets/Nagrade/BC_pustinja.svg";
import GJ_pustinja from "../../assets/Nagrade/GJ_pustinja.svg";

import GJ_pomracenje from "../../assets/Nagrade/GJ_pomracenje.svg";
import GJ_planina from "../../assets/Nagrade/GJ_planina.svg";


function PrizeGlowText({ children, size = "text-[64px]", glow = true }) {
  return (
    <span className={`relative inline-block text-white font-['DuneRise'] ${size}`}>
      
      {glow && (
        <span
          className="absolute inset-0 blur-[30px] opacity-80 select-none"
          aria-hidden="true"
        >
          {children}
        </span>
      )}

      <span className="relative [webkit-text-stroke:1px_rgba(255,255,255,0.6)]">
        {children}
      </span>
    </span>
  );
}


const variants = {
  Hackathon: {
    pustinja: HT_pustinja,
    bg: "bg-[#0B1C2D]",
    extraLayers: null,
  },

  Blockchain: {
    pustinja: BC_pustinja,
    bg: "bg-gradient-to-b from-[#002440] to-[#832091]",
    extraLayers: null,
  },

  Gamejam: {
    pustinja: GJ_pustinja,
    bg: "bg-gradient-to-b from-[#002440] to-[#07021A]",
    extraLayers: (
      <div className="absolute inset-0 pointer-events-none z-10">
        <img
          src={GJ_pomracenje}
          alt=""
          className="absolute left-1/2 -translate-x-[52%] top-[-104%] w-full h-auto"
        />
        <img
          src={GJ_planina}
          alt=""
          className="absolute left-1/2 -translate-x-1/2 w-full h-auto"
        />
      </div>
    ),
  },
};


export default function Nagrade({ type = "Hackathon" }) {
  const config = variants[type];

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Zvezde */}
      <img
        src={zvezde}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover z-0 ${config.bg}`}
      />

      {/* Naslov */}
      <div className="relative w-full h-screen pt-[10vh] z-30">
        <h2 className="text-center mt-[25vh] w-full font-['DuneRise'] text-[clamp(20px,8vw,120px)] text-white md:mt-[10vh]">
          nagrade
        </h2>
      </div>

      {/* Donji deo */}
      <div className="absolute bottom-0 w-full z-20 md:relative md:bottom-auto">

        {/* Pustinja */}
        <img
          src={config.pustinja}
          alt=""
          className="relative w-full h-auto block z-20"
        />

        {/* Gamejam dodatni layeri */}
        {config.extraLayers}

        {/* Nagrade */}
        <div className="absolute inset-0 pointer-events-none z-30">

          {/* 700e */}
          <div className="absolute left-[24%] -translate-x-1/2 bottom-[80%]">
            <PrizeGlowText size="text-[clamp(12px,5vw,110px)]">
              700e
            </PrizeGlowText>
          </div>

          {/* 1000e glow je isključen samo za Gamejam */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[100%]">
            <PrizeGlowText
              size="text-[clamp(15px,8vw,130px)]"
              glow={type !== "Gamejam"}
            >
              1000e
            </PrizeGlowText>
          </div>

          {/* 500e */}
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