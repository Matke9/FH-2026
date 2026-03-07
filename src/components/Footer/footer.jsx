import {
  FiMapPin,
  FiGlobe,
  FiInstagram,
  FiMail,
} from "react-icons/fi";
import { FaLinkedinIn, FaTiktok } from "react-icons/fa";
import logo from "../../assets/Footer/fonis-logo.svg"
/*stavio sam da sve otvara u novom tabu */
export default function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="mx-auto max-w-6xl px-4">
        {/* gornja linija */}
        <div className="pt-6">
          <div className="h-px w-full bg-white/80" />
        </div>

        <div className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between">
          {/* LEVO: lokacija  i social */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-white">
              <div className="mt-1 text-white/90">
                <FiMapPin size={22} />
              </div>
              <div className="text-sm font-semibold leading-snug text-white/90">
                <div>Fakultet organizacionih nauka</div>
                <div className="text-white/80">Jove Ilića 154, Beograd</div>
              </div>
            </div>

            <div className="flex items-center gap-3 ">
              <a
                href="https://www.linkedin.com/company/fonis"
                target="_blank"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#002440] text-black transition hover:scale-105"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://www.instagram.com/fonis_fon/?hl=en"
                target="_blank"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#002440] text-black transition hover:scale-105"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@fonis_fon"
                target="_blank"
                aria-label="TikTok"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#002440] text-black transition hover:scale-105"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=hakaton@fonis.rs"
                target="_blank"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-md bg-[#002440] text-black transition hover:scale-105"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* SREDINA: logo */}
          <div className="flex justify-center">
          <img
            src={logo}
            alt="FONIS logo"
            className="
              h-16
              md:h-20
              w-auto
              object-contain
              select-none
            "
          />
        </div>

          {/* DESNO: linkovi */}
          <div className="flex flex-col gap-3 text-white">
            <a
              href="https://www.fonis.rs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              <FiGlobe size={18} className="text-white"/>
              <span>www.fonis.rs</span>
            </a>
            <a
              href="https://www.elab.fon.bg.ac.rs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              <FiGlobe size={18} className="text-white"/>
              <span>www.elab.fon.bg.ac.rs</span>
            </a>
            <a
              href="https://bc.elab.fon.bg.ac.rs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              <FiGlobe size={18} className="text-white"/>
              <span>bc.elab.fon.bg.ac.rs</span>
            </a>
          </div>
        </div>

        {/* mali donji razmak da ima mesta */}
        <div className="pb-6" />
      </div>
    </footer>
  );
}