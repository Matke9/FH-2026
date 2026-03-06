import { useState } from 'react'
import './OrganizacioniTim.css'
import krunicaPozadina from '../../assets/OrganizacioniTim/krunica-pozadina.svg'
import krunicaSimbol from '../../assets/OrganizacioniTim/krunica-simbol.png'
import hakatonLogo from '../../assets/OrganizacioniTim/hakaton logo.svg'
import planine from '../../assets/OrganizacioniTim/planine.svg'

// Podaci o clanovima organizacionog tima
const teamMembers = [
  {
    name: 'Anastasija Vojinović',
    role: 'Koordinator takmičenja',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim koordinatora',
  },
  {
    name: 'Sava Stević',
    role: 'Koordinator tima za dizajn',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za dizajn',
  },
  {
    name: 'Mihailo Matović',
    role: 'Koordinator tima za informacione tehnologije',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za informacione tehnologije',
  },
  {
    name: 'Anastasija Rus',
    role: 'Koordinator tima za logistiku',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za logistiku',
  },
  {
    name: 'Željana Košanin',
    role: 'Koordinator tima za korporativne komunikacije',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za korporativne komunikacije',
  },
  {
    name: 'Đorđe Grubić',
    role: 'Koordinator tima za odnose sa javnošću',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za odnose sa javnošću',
  },
  {
    name: 'Anja Krstić',
    role: 'Koordinator tima za ljudske resurse',
    photo: null,
    teamImage: null,
    teamLabel: 'Tim za ljudske resurse',
  },
]

// Generisanje zvezdica za pozadinu
const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
}))

export default function OrganizacioniTim() {
  // Trenutni indeks clana u carousel-u
  const [currentIndex, setCurrentIndex] = useState(0)
  // Stanje za fade animaciju
  const [fade, setFade] = useState('member-fade-active')

  const currentMember = teamMembers[currentIndex]

  // Pomocna funkcija - menja clana sa fade efektom
  const changeIndex = (newIndex) => {
    setFade('member-fade-exit')
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setFade('member-fade-enter')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFade('member-fade-active')
        })
      })
    }, 300)
  }

  // Prelazak na prethodnog clana (wrap-around)
  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1
    changeIndex(newIndex)
  }

  // Prelazak na sledeceg clana (wrap-around)
  const handleNext = () => {
    const newIndex = currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1
    changeIndex(newIndex)
  }

  return (
    <section className="org-tim-section relative w-full py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Zvezdice u pozadini */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Naslov sekcije */}
      <h2 className="font-dune relative z-10 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-[0.3em] mb-10 sm:mb-12 md:mb-14">
        ORGANIZACIONI TIM
      </h2>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-20 max-w-6xl mx-auto px-4">
        {/* Veca slika tima (leva strana) - horizontalna, zaobljena gore */}
        <div className={`flex flex-col items-center ${fade}`}>
          <div className="relative">
            {/* Ikonica krunice pozicionirana na vrhu slike tima */}
            <div className="absolute -top-5 sm:-top-6 md:-top-7 lg:-top-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative w-16 h-11 sm:w-18 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
                <img
                  src={krunicaPozadina}
                  alt="Crown background"
                  className="absolute inset-0 w-full h-full"
                />
                <img
                  src={krunicaSimbol}
                  alt="Crown symbol"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                />
              </div>
            </div>

            <div className="team-image-wrapper">
              <div className="team-image-container">
                {currentMember.teamImage ? (
                  <img
                    src={currentMember.teamImage}
                    alt={currentMember.teamLabel}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Placeholder kada nema slike
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                    <span className="text-4xl">👥</span>
                  </div>
                )}
              </div>
            </div>

            {/* Planine ispod slike tima */}
            <img
              src={planine}
              alt="Mountains decoration"
              className="absolute -bottom-2 left-0 w-full"
            />
          </div>

          <p className="text-white/80 text-xs sm:text-sm md:text-base tracking-wide mt-3 sm:mt-4">
            {currentMember.teamLabel}
          </p>
        </div>

        {/* Desna strana - strelice oko kruzne slike clana */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Strelica levo */}
          <button
            onClick={handlePrev}
            className="nav-arrow"
            aria-label="Prethodni član"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Kruzna slika i info o clanu */}
          <div className={`flex flex-col items-center ${fade}`}>
            <div className="relative">
              {/* Hakaton logo badge pozicioniran na vrhu kruzne slike */}
              <div className="absolute -top-5 sm:-top-6 md:-top-7 lg:-top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="relative w-16 h-11 sm:w-18 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
                  <img
                    src={krunicaPozadina}
                    alt="Badge background"
                    className="absolute inset-0 w-full h-full"
                  />
                  <img
                    src={hakatonLogo}
                    alt="Hakaton logo"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                  />
                </div>
              </div>

              <div className="member-circle">
                {currentMember.photo ? (
                  <img
                    src={currentMember.photo}
                    alt={currentMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Placeholder kada nema slike
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-white text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4 text-center">
              {currentMember.name}
            </p>
            <p className="text-white/60 text-xs sm:text-sm md:text-base text-center">
              {currentMember.role}
            </p>
          </div>

          {/* Strelica desno */}
          <button
            onClick={handleNext}
            className="nav-arrow"
            aria-label="Sledeći član"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
