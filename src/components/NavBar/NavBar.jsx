import { useState } from "react";
import logo from "../../assets/NavBar/logo1.svg";
import pozadina from "../../assets/NavBar/Group.svg"

const navItems = [
  { label: "O TAKMIČANJU", href: "#o-takmicenju" },
  { label: "AGENDA", href: "#agenda" },
  { label: "NAGRADE", href: "#nagrade" },
  { label: "ISKUSTVA", href: "#iskustva" },
  { label: "FAQ", href: "#faq" },
  { label: "ORGANIZACIONI TIM", href: "#tim" },
  { label: "PARTNERI", href: "#partneri" },
  { label: "PRAVILNIK", href: "#pravilnik" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
    <header className="fixed left-0 top-0 z-[70] w-full">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4">
        {/* slika*/}
        <a href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={logo} alt="FON hakaton" className="max-h-16 w-auto" />
        </a>

        {/* Desktop*/}
        <nav className="hidden md:flex items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-noto uppercase tracking-wider text-white hover:text-pink-400 transition duration-300"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#prijava"
            className="ml-4 px-6 py-2.5 rounded-full bg-[#002440] text-white text-sm font-bold uppercase tracking-wider hover:opacity-90 transition duration-300"
          >
            PRIJAVI SE!
          </a>
        </nav>

        {/* hamburger meni*/}
              <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 bg-transparent"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                // X ikonica
                <span className="text-white text-3xl leading-none select-none z-[70]">×</span>
              ) : (
                // hamburger
                <>
                  <span className="h-[2px] w-7 bg-white" />
                  <span className="h-[2px] w-7 bg-white" />
                  <span className="h-[2px] w-7 bg-white" />
                </>
              )}
            </button>
      </div>
    </header>

    {/*meni za telefon*/}
            {isOpen && (
          <div
            className="
              fixed inset-0 z-[60]
              bg-black/60 backdrop-opacity-sm
              flex items-center
              justify-center
              px-4
            "
          >
            {/* Panel */}
            <div
              className="
                  w-full
                  max-w-sm
                  max-h-[85vh]
                  overflow-y-auto
                  rounded-2xl
                  shadow-2xl
                
              "
            >
              <div
                 className="relative p-8 text-white bg-[#002440] overflow-hidden"
              >
                  <img
                    src={pozadina}
                    alt=""
                    className="pointer-events-none absolute left-0 top-0 z-0"
                  />
                 <nav className="flex flex-col gap-6 font-noto tracking-wide items-end  text-right">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-white flex items-center gap-3 hover:text-pink-400 transition"
                      onClick={() => setIsOpen(false)} // zatvaranje kad se stisne link
                    >
                      <span className="h-2 w-2 bg-pink-500" />
                      {item.label}
                    </a>
                  ))}

                  <a
                    href="#prijava"
                    className="
                      text-white
                      mt-6 self-center
                      rounded-full
                      bg-pink-500 px-8 py-3
                      font-bold
                      hover:bg-pink-400 transition
                    "
                    onClick={() => setIsOpen(false)}
                  >
                    PRIJAVI SE!
                  </a>
                </nav>
               
              </div>
            </div>
          </div>
        )}
    </>
  );
}