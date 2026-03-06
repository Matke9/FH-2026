// import zvezde from "../../assets/Nagrade/zvezde.svg";
import fade from "../../assets/Nagrade/fade.svg";
import strelica from "../../assets/Nagrade/strelica.svg";
import "./NagradeBackground.css";

import HT_pustinja from "../../assets/Nagrade/content/HT_pustinja.svg";
import BC_pustinja from "../../assets/Nagrade/content/BC_pustinja.svg";

import GJ_pustinja from "../../assets/Nagrade/content/GJ_pustinja.svg";
import GJ_pomracenje from "../../assets/Nagrade/content/GJ_pomracenje.svg";
import GJ_planina from "../../assets/Nagrade/content/GJ_planina.svg";

function PrizeGlowText({ children, size = "text-[4rem]", glow = true }) {
  return (
    <span
      className={`relative inline-block text-white font-['DuneRise'] ${size}`}
    >
      {glow && (
        <span
          className="absolute inset-0 blur-[2rem] opacity-80 select-none"
          aria-hidden="true"
        >
          {children}
        </span>
      )}

      <span className="relative [webkit-text-stroke:0.0625rem_rgba(255,255,255,0.6)]">
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

export default function NagradeContent({ type, onBack }) {
  const config = variants[type];

  return (
    <section className="nagrade-background relative w-full min-h-screen overflow-hidden">
      {/* Back dugme */}
      <button
        onClick={onBack}
        className="
    absolute top-[3vw] left-[3vw] z-50
    flex items-center justify-center
    w-[clamp(40px,6vw,60px)]
    h-[clamp(40px,6vw,60px)]
    backdrop-blur-md
    rounded-[clamp(8px,1.2vw,16px)]
    transition-all duration-300 ease-out
    hover:scale-105
    hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_50px_rgba(255,255,255,0.3)]
  "
      >
        <img
          src={strelica}
          alt="Back"
          className="w-full h-full object-fit pointer-events-none translate-y-[2%]"
        />
      </button>

      {/* Zvezde */}
      {/*<img*/}
      {/*  src={zvezde}*/}
      {/*  alt=""*/}
      {/*  className={`absolute inset-0 w-full h-full object-cover z-0 ${config.bg}`}*/}
      {/*/>*/}

      {/* Naslov */}
      <div className="relative w-full h-screen pt-[10vh] z-30">
        <h2 className="text-center mt-[clamp[50px,25vh,80px]] w-full font-['DuneRise'] text-[4em] text-white md:mt-[10vh]">
          nagrade
        </h2>
      </div>

      {/* Donji deo */}
      <div className="absolute bottom-0 w-full max-w-[1600px] left-1/2 -translate-x-1/2 z-20 md:relative md:bottom-auto">
        <img
          src={config.pustinja}
          alt=""
          className="relative w-full h-auto block z-20"
        />

        {config.extraLayers}

        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute left-[24%] -translate-x-1/2 bottom-[80%]">
            <PrizeGlowText size="text-[clamp(0.75rem,5vw,7rem)]">
              700e
            </PrizeGlowText>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[100%]">
            <PrizeGlowText
              size="text-[clamp(1rem,8vw,8rem)]"
              glow={type !== "Gamejam"}
            >
              1000e
            </PrizeGlowText>
          </div>

          <div className="absolute left-[75%] -translate-x-1/2 bottom-[70%]">
            <PrizeGlowText size="text-[clamp(0.75rem,6vw,4.5rem)]">
              500e
            </PrizeGlowText>
          </div>
        </div>
      </div>

      <img
        src={fade}
        alt=""
        className="absolute w-full h-auto block z-40 bottom-0 translate-y-[30%]"
      />
    </section>
  );
}
