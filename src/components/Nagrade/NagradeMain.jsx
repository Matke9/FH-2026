import { useState } from "react";
import NagradeContent from "./NagradeContent";
import "./NagradeBackground.css";


import HT_bg_land from "../../assets/Nagrade/main/landscape/HT_bg.svg";
import BC_bg_land from "../../assets/Nagrade/main/landscape/BC_bg.svg";
import GJ_bg_land from "../../assets/Nagrade/main/landscape/GJ_bg.svg";

import HT_bg_port from "../../assets/Nagrade/main/portrait/HT_bg.svg";
import BC_bg_port from "../../assets/Nagrade/main/portrait/BC_bg.svg";
import GJ_bg_port from "../../assets/Nagrade/main/portrait/GJ_bg.svg";

import HT_logo from "../../assets/Nagrade/main/HT_Logo.svg";
import BC_logo from "../../assets/Nagrade/main/BC_Logo.svg";
import GJ_logo from "../../assets/Nagrade/main/GJ_Logo.svg";

export default function NagradeMain() {
  const [activeType, setActiveType] = useState(null);

  return (
    <section className="nagrade-background flex flex-col justify-between relative w-full min-h-screen">
      {/* Fixed title that stays the same */}
      <div className="relative z-30 pt-[8vh] md:pt-[10vh]">
        <h2 className="font-dune text-white text-center text-[clamp(1.25rem,8vw,4.5rem)] mb-2 md:mb-12">
          NAGRADE
        </h2>
      </div>

      {/* Content that changes */}
      {!activeType ? (
        <NagradeSelector onSelect={setActiveType} />
      ) : (
        <NagradeContent type={activeType} onBack={() => setActiveType(null)} />
      )}
    </section>
  );
}

function NagradeSelector({ onSelect }) {
  const baseButtonClass = `
    relative
    w-[clamp(280px,85vw,600px)]
    aspect-[3/1]
    md:w-[clamp(280px,26vw,420px)]
    md:aspect-[5/8]
    rounded-[1.5rem]
    overflow-hidden
    border-[1px] border-[#000000]
    hover:scale-105
    transition
    hover:shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.2)]
  `;

  const buttons = [
    {
      type: "Hackathon",
      bgLand: HT_bg_land,
      bgPort: HT_bg_port,
      logo: HT_logo,
      bg: "#23056D",
    },
    {
      type: "Blockchain",
      bgLand: BC_bg_land,
      bgPort: BC_bg_port,
      logo: BC_logo,
      bg: "#39054D",
    },
    {
      type: "Gamejam",
      bgLand: GJ_bg_land,
      bgPort: GJ_bg_port,
      logo: GJ_logo,
      bg: "#5D0000",
    },
  ];

  return (
    <div className="relative w-full px-6 md:pt-[4vh]">
      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* DUGMIĆI */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw] w-full pb-[15vh] z-20">
          {buttons.map((btn) => (
            <button
              key={btn.type}
              onClick={() => onSelect(btn.type)}
              className={baseButtonClass}
              style={{ backgroundColor: btn.bg }}
            >
              <div className="absolute inset-0">
                {/* MOBILE → landscape */}
                <img
                  src={btn.bgLand}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover md:hidden"
                />

                {/* MD+ → portrait */}
                <img
                  src={btn.bgPort}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover hidden md:block"
                />

                {/* LOGO */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={btn.logo}
                    alt={btn.type}
                    className="max-w-[70%] max-h-[60%] md:max-w-[75%] md:max-h-[35%] object-contain"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
