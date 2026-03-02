import wave from "../../assets/Footer/wave.svg";
import fonisLogo from "../../assets/Footer/fonis-logo.svg";

import pin from "../../assets/Footer/pin.svg";
import globe from "../../assets/Footer/globe.svg";



export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white">
      {/* wave */}
      <img
        src={wave}
        alt=""
        className="pointer-events-none absolute left-0 top-0 w-full"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-3">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <img src={pin} alt="" className="h-6 w-6 mt-1" />
            <div className="text-sm font-semibold leading-snug">
              Fakultet organizacionih nauka
              <br />
              Jove Ilića 154, Beograd
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="opacity-90 hover:opacity-100 transition">
              <img src={li} alt="" className="h-7 w-7" />
            </a>
            <a href="#" aria-label="Instagram" className="opacity-90 hover:opacity-100 transition">
              <img src={ig} alt="" className="h-7 w-7" />
            </a>
            <a href="#" aria-label="TikTok" className="opacity-90 hover:opacity-100 transition">
              <img src={tt} alt="" className="h-7 w-7" />
            </a>
            <a href="mailto:info@fonis.rs" aria-label="Email" className="opacity-90 hover:opacity-100 transition">
              <img src={mail} alt="" className="h-7 w-7" />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex justify-center">
          <img src={fonisLogo} alt="FONIS" className="h-16 md:h-20 w-auto" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          {[
            { label: "www.fonis.rs", href: "https://www.fonis.rs" },
            { label: "www.elab.fon.bg.ac.rs", href: "https://elab.fon.bg.ac.rs" },
            { label: "bc.elab.fon.bg.ac.rs", href: "https://bc.elab.fon.bg.ac.rs" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm font-semibold opacity-90 hover:opacity-100 transition"
            >
              <span>{link.label}</span>
              <img src={globe} alt="" className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}