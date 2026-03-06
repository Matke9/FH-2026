import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/NavBar/logo1.svg";
import pozadina from "../../assets/NavBar/Group.svg"

const navItems = [
  { label: "O TAKMICENJU", sectionId: "o-takmicenju", isAnchor: true },
  { label: "AGENDA", sectionId: "agenda", isAnchor: true },
  { label: "NAGRADE", sectionId: "nagrade", isAnchor: true },
  { label: "ISKUSTVA", sectionId: "iskustva", isAnchor: true },
  { label: "FAQ", sectionId: "faq", isAnchor: true },
  { label: "ORGANIZACIONI TIM", sectionId: "tim", isAnchor: true },
  { label: "PARTNERI", sectionId: "partneri", isAnchor: true },

  // zasebna stranica:
  { label: "PRAVILNIK", href: "/pravilnik", isAnchor: false },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const handleSectionClick = (sectionId) => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <header className="fixed left-0 top-0 z-[70] w-full">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4">
        {/* slika*/}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={logo} alt="FON hakaton" className="max-h-16 w-auto" />
        </Link>

        {/* Desktop*/}
        <nav className="hidden md:flex items-center">
          {navItems.map((item) => 
            item.isAnchor ? (
              <button
                key={item.label}
                onClick={() => handleSectionClick(item.sectionId)}
                className="px-4 py-2 text-sm font-noto uppercase tracking-wider text-white hover:text-pink-400 transition duration-300 bg-transparent border-0 cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-sm font-noto uppercase tracking-wider text-white hover:text-pink-400 transition duration-300"
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            to="/prijava"
            className="ml-4 px-6 py-2.5 rounded-full bg-[#002440] text-white text-sm font-bold uppercase tracking-wider hover:opacity-90 transition duration-300"
          >
            PRIJAVI SE!
          </Link>
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
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-top"
                  />
                 <nav className="relative z-10 flex flex-col gap-5 font-noto tracking-wide items-end  text-right">
                  {navItems.map((item) => 
                    item.isAnchor ? (
                      <button
                        key={item.label}
                        onClick={() => handleSectionClick(item.sectionId)}
                        className="text-white flex items-center gap-3 hover:text-pink-400 transition bg-transparent border-0 cursor-pointer w-full justify-end"
                      >
                        <span className="h-2 w-2 bg-pink-500" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="text-white flex items-center gap-3 hover:text-pink-400 transition"
                        onClick={() => setIsOpen(false)} // zatvaranje kad se stisne link
                      >
                        <span className="h-2 w-2 bg-pink-500" />
                        {item.label}
                      </Link>
                    )
                  )}

                  <Link
                    to="/prijava"
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
                  </Link>
                </nav>
               
              </div>
            </div>
          </div>
        )}
    </>
  );
}