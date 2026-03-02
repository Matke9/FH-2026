import { useState } from "react";
import logo from "../../assets/NavBar/logo1.svg";

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
    <header className="fixed left-0 top-0 z-50 w-full">
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
              className="
                md:hidden
                flex flex-col
                justify-center
                items-center
                gap-1.5
                p-2
                bg-transparent
              "
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <span className="h-[2px] w-7 bg-white" />
              <span className="h-[2px] w-7 bg-white" />
              <span className="h-[2px] w-7 bg-white" />
            </button>
      </div>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* klik van menija zatvara */}
          <button
            className="absolute inset-0 w-full h-full"
            onClick={closeMenu}
            aria-label="Close menu overlay"
          />

          {/* Panel */}
          <div className="relative ml-auto h-full w-[78%] max-w-xs bg-[#071B3A] px-6 pt-6 pb-10">
            {/* X dugme */}
            <button
              type="button"
              className="absolute right-4 top-4 text-white text-3xl leading-none"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>

            <div className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-white font-noto uppercase tracking-wider"
                >
                  <span className="h-2.5 w-2.5 bg-pink-500" />
                  {item.label}
                </a>
              ))}

              <a
                href="#prijava"
                onClick={closeMenu}
                className="mt-6 inline-flex w-fit px-6 py-3 rounded-full bg-pink-600 text-white font-bold uppercase tracking-wider"
              >
                PRIJAVI SE!
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}