import { useState } from "react";
import NagradeContent from "./NagradeContent";

export default function NagradeMain() {
  const [activeType, setActiveType] = useState(null);

  if (!activeType) {
    return <NagradeSelector onSelect={setActiveType} />;
  }

  return (
    <NagradeContent
      type={activeType}
      onBack={() => setActiveType(null)}
    />
  );
}

/* ============================= */
/* ========= SELECTOR ========== */
/* ============================= */

function NagradeSelector({ onSelect }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0B1C2D]">
      <div className="flex gap-10 flex-col md:flex-row">
        <button
          onClick={() => onSelect("Hackathon")}
          className="w-64 h-40 rounded-3xl bg-purple-700 text-white text-xl hover:scale-105 transition"
        >
          Hackathon
        </button>

        <button
          onClick={() => onSelect("Blockchain")}
          className="w-64 h-40 rounded-3xl bg-pink-700 text-white text-xl hover:scale-105 transition"
        >
          Blockchain
        </button>

        <button
          onClick={() => onSelect("Gamejam")}
          className="w-64 h-40 rounded-3xl bg-red-700 text-white text-xl hover:scale-105 transition"
        >
          Game Jam
        </button>
      </div>
    </section>
  );
}