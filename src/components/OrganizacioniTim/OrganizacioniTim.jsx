import { useState } from 'react'
import './OrganizacioniTim.css'

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
    <section className="org-tim-section relative w-full py-16 px-4 overflow-hidden">
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
      <h2 className="org-tim-naslov relative z-10 text-center text-3xl md:text-5xl text-white tracking-[0.3em] mb-14">
        ORGANIZACIONI TIM
      </h2>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-5xl mx-auto">
        {/* Veca slika tima (leva strana) - horizontalna, zaobljena gore */}
        <div className={`flex flex-col items-center gap-4 ${fade}`}>
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
          <p className="text-white/80 text-sm md:text-base tracking-wide">
            {currentMember.teamLabel}
          </p>
        </div>

        {/* Desna strana - strelice oko kruzne slike clana */}
        <div className="flex items-center gap-5 md:gap-8">
          {/* Strelica levo */}
          <button
            onClick={handlePrev}
            className="nav-arrow"
            aria-label="Prethodni član"
          >
            &lt;
          </button>

          {/* Kruzna slika i info o clanu */}
          <div className={`flex flex-col items-center gap-3 ${fade}`}>
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
            <p className="text-white text-lg md:text-xl font-semibold mt-2">
              {currentMember.name}
            </p>
            <p className="text-white/60 text-sm md:text-base">
              {currentMember.role}
            </p>
          </div>

          {/* Strelica desno */}
          <button
            onClick={handleNext}
            className="nav-arrow"
            aria-label="Sledeći član"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}
