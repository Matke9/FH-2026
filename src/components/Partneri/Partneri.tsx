import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../styles/tailwind.css';

// Importi slika
// @ts-ignore
import erste from "../../assets/Partneri/erste 1.png";
// @ts-ignore
import godisnji from "../../assets/Partneri/godisnji.png";
// @ts-ignore
import medijski from "../../assets/Partneri/medijski.png";
// @ts-ignore
import robni from "../../assets/Partneri/robni.png";
// @ts-ignore
import samsung from "../../assets/Partneri/samsung 4.png";
// @ts-ignore
import pesak from "../../assets/Partneri/pesakveliki.svg";
// @ts-ignore
import strelica from "../../assets/Partneri/strelica.svg";

//GODISNJI

// @ts-ignore
import wargaming from "../../assets/Partneri/godisnji/wargaming.png"
// @ts-ignore
import knjaz from "../../assets/Partneri/godisnji/knjaz.png"
// @ts-ignore
import fon from "../../assets/Partneri/godisnji/fon.png"

//ROBNI I NAT

// @ts-ignore
import aleva from "../../assets/Partneri/naturalni-robni/aleva.png"
// @ts-ignore
import bedz from "../../assets/Partneri/naturalni-robni/bedz.png"
// @ts-ignore
import castellana from "../../assets/Partneri/naturalni-robni/Castellana.PNG"
// @ts-ignore
import gadget from "../../assets/Partneri/naturalni-robni/gadget.png"




/* =========================
   PARTNER ELEMENT (new model)
   svaki partner ima:
     - cactus: slika kaktusa (glavni vizuelni element)
     - sponsor: logo iznad (npr. samsung)
   ========================= */
const PartnerElement = ({
  cactus,
  sponsors,
}: {
  cactus: string;
  sponsors: string[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sponsors.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sponsors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  const kaktusClass = "w-[90%] sm:w-full h-auto object-contain";

  return (
    <div className="relative flex flex-col items-center justify-end w-full transition-transform duration-700 origin-bottom">
      {/* Sponsor logo u belom krugu — fiksna velicina */}
      <div className="relative z-10 mt-8 sm:mt-0 mb-3 sm:mb-4 md:mb-5 lg:mb-6 w-24 h-24 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ boxShadow: '0 0 20px 8px rgba(255, 255, 255, 0.5), 0 0 40px 16px rgba(255, 255, 255, 0.25)' }}>
        {sponsors.map((src, i) => (
          <img
            key={i}
            src={src}
            className="absolute w-[74%] h-[74%] object-contain transition-opacity duration-500"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
            alt="Sponsor logo"
          />
        ))}
      </div>

      {/* Kaktus */}
      <div className="relative w-full flex justify-center items-end">
        <img src={cactus} className={kaktusClass} alt="Kaktus" />
      </div>
    </div>
  );
};

const Partneri: React.FC = () => {
  // Svaka kategorija ima svoj pool sponsor logo-ova koji se rotiraju
  // Dodaj vise slika u nizove i menjace se svake 2 sekunde
  const partners = [
    { id: 1, cactus: robni, sponsors: [aleva, castellana, gadget, bedz] },
    { id: 2, cactus: godisnji, sponsors: [wargaming, knjaz, fon] },
    { id: 3, cactus: medijski, sponsors: [] },
  ];

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // robustni click handleri koji koriste slideToLoop
  const handlePrev = () => {
    if (!swiperInstance) return;
    const n = partners.length;
    const prevIndex = (swiperInstance.realIndex - 1 + n) % n;
    swiperInstance.slideToLoop(prevIndex);
  };

  const handleNext = () => {
    if (!swiperInstance) return;
    const n = partners.length;
    const nextIndex = (swiperInstance.realIndex + 1) % n;
    swiperInstance.slideToLoop(nextIndex);
  };

  useEffect(() => {
    // navigation not bound via Swiper params here —
    // buttons call handlePrev / handleNext which use slideToLoop directly
    // keep effect so swiperInstance can be observed if needed
    // (no-op)
  }, [swiperInstance]);

  return (
    <section
      className="
        relative
        w-screen
        left-1/2
        -translate-x-1/2
        flex
        flex-col
        items-center
        overflow-hidden
        h-[700px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[850px] 2xl:h-[1000px]
      "
      style={{
        background:
          "#002440",
      }}
    >
      {/* Pesak */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none flex justify-center">
        <img
          src={pesak}
          className="w-full max-w-[2400px] h-auto object-cover object-top"
          alt="Pesak"
        />
      </div>

      {/* Naslov */}
      <h2 className="text-white text-4xl md:text-5xl font-dune pt-16 z-10 text-center uppercase absolute top-[-5%]">
        PARTNERI
      </h2>

      {/* Glavni kontejner */}
      <div className="relative z-10 w-full flex-grow flex items-end pb-[12vh]">
        {/* DESKTOP / TABLET (>= md) — 3 kaktusa */}
        <div className="hidden sm:flex justify-between items-end mx-auto px-6 lg:px-16 xl:px-24
        sm:w-[630px]
        md:w-[740px]
        lg:w-[970px]
        xl:w-[1200px]
        2xl:w-[1400px]
        sm:mb-[1%]
        md:mb-[2.5%]
        lg:mb-[2%]
        xl:mb-[4%]
        2xl:mb-[2%]
        ">
          <div className="w-40/100 flex justify-center items-end">
            <PartnerElement cactus={partners[0].cactus} sponsors={partners[0].sponsors} />
          </div>

          <div className="w-55/100 flex justify-center items-end">
            <PartnerElement cactus={partners[1].cactus} sponsors={partners[1].sponsors} />
          </div>

          <div className="w-40/100 flex justify-center items-end">
            <PartnerElement cactus={partners[2].cactus} sponsors={partners[2].sponsors} />
          </div>
        </div>

        {/* MOBILNI SLIDER (< md) */}
        <div className="w-full sm:hidden h-full flex items-end relative px-4 bottom-[-8%]">
          {/* fixed-width mobile slider wrapper (350px) */}
          <div className="w-[350px] mx-auto relative">
            <Swiper
              modules={[Navigation]}
              onSwiper={(s) => setSwiperInstance(s)}
              centeredSlides
              slidesPerView={1.0}
              loop
              className="w-full"
            >
              {partners.map((p) => (
                <SwiperSlide key={p.id} className="flex justify-center items-end pb-10">
                  <div className="w-full">
                    <PartnerElement cactus={p.cactus} sponsors={p.sponsors} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              ref={prevRef}
              type="button"
              onClick={handlePrev}
              className="prev-p absolute left-2 top-[70%] -translate-y-1/2 z-50 rotate-180 transition-opacity pointer-events-auto
              bg-transparent border-0 outline-none focus:outline-none active:outline-none active:ring-0"
              aria-label="Previous"
            >
              <img src={strelica} alt={"<"} className="w-10" />
            </button>

            <button
              ref={nextRef}
              type="button"
              onClick={handleNext}
              className="next-p absolute right-2 top-[70%] -translate-y-1/2 z-50 transition-opacity pointer-events-auto
              bg-transparent border-0 outline-none focus:outline-none active:outline-none active:ring-0"
              aria-label="Next"
            >
              <img src={strelica} alt={">"} className="w-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Pokrovitelj footer */}
      <div className="absolute bottom-[0%] left-0 w-full z-30 flex flex-col items-center px-4">
        {/* TODO: Zameni placeholder div sa logom pokrovitelja */}
        <div className="w-[220px] md:w-64 xl:w-[350px] h-[80px] md:h-[90px] xl:h-[120px] mb-[2%] bg-white rounded-lg" />
        <p className="text-white text-[14px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-dune mt-[-1%] md:mt-[0%]">
          POKROVITELJ TAKMICENJA
        </p>
      </div>
    </section>
  );
};

export default Partneri;