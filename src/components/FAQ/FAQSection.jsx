import FAQCard from "./FAQCard";
import "./FAQSection.css";
import { useRef, useState, useEffect } from "react";

import bg from "../../assets/FAQ/FAQPozadina.svg";
import postolje from "../../assets/FAQ/FAQPostolje.svg";
import glow from "../../assets/FAQ/FAQSvetloPostolje.svg";
import light from "../../assets/FAQ/FAQSvetlo.svg";

export default function FAQSection() {
  const cards = [
    { question: "Pitanje 1", answer: "Odgovor 1" },
    { question: "Pitanje 2", answer: "Odgovor 2" },
    { question: "Pitanje 3", answer: "Odgovor 3" },
    { question: "Pitanje 4", answer: "Odgovor 4" },
    { question: "Pitanje 5", answer: "Odgovor 5" },
  ];

  const extendedCards = [...cards, ...cards, ...cards];

  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const lightRef = useRef(null);
  const sliderRef = useRef(null);
  const singleSetWidth = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [sliderTop, setSliderTop] = useState(0);

  // Inicijalno pozicioniranje track-a
  useEffect(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth / 3;
    singleSetWidth.current = totalWidth;
    setCurrentTranslate(-totalWidth);
  }, []);

  // Izračunavanje pozicije slidera (uvijek 50px iznad svjetla)
  useEffect(() => {
    const updatePosition = () => {
      if (sectionRef.current && lightRef.current && sliderRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const lightRect = lightRef.current.getBoundingClientRect();
        const sliderHeight = sliderRef.current.offsetHeight;

        const lightTopRelative = lightRect.top - sectionRect.top;
        const top = lightTopRelative - 50 - sliderHeight;

        setSliderTop(top);
      }
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);

    const observer = new ResizeObserver(updatePosition);
    if (lightRef.current) observer.observe(lightRef.current);
    if (sliderRef.current) observer.observe(sliderRef.current);

    const mediaQueries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      window.matchMedia('(min-width: 1024px)')
    ];

    const handleMediaChange = () => {
      setTimeout(updatePosition, 50);
    };

    mediaQueries.forEach(mq => mq.addEventListener('change', handleMediaChange));

    return () => {
      window.removeEventListener('resize', updatePosition);
      observer.disconnect();
      mediaQueries.forEach(mq => mq.removeEventListener('change', handleMediaChange));
    };
  }, []);

  // Automatsko skrolovanje
  useEffect(() => {
    let animationFrame;

    const autoScroll = () => {
      if (!isDragging) {
        setCurrentTranslate(prev => {
          let next = prev - 0.25;
          if (next <= -2 * singleSetWidth.current) {
            next += singleSetWidth.current;
          }
          return next;
        });
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  // Primjena transformacije na track
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTranslate}px)`;
    }
  }, [currentTranslate]);

  // Inercija nakon prevlačenja
  useEffect(() => {
    if (Math.abs(velocity) < 0.1) return;

    let animationFrame;

    const momentum = () => {
      setCurrentTranslate(prev => {
        let next = prev + velocity;
        if (next >= 0) next -= singleSetWidth.current;
        if (next <= -2 * singleSetWidth.current) next += singleSetWidth.current;
        return next;
      });
      setVelocity(v => v * 0.95);
      animationFrame = requestAnimationFrame(momentum);
    };

    animationFrame = requestAnimationFrame(momentum);
    return () => cancelAnimationFrame(animationFrame);
  }, [velocity]);

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setVelocity(diff * 0.08);
    setCurrentTranslate(prev => prev + diff * 0.6);
    setStartX(clientX);
  };

  const handleEnd = () => setIsDragging(false);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="bg-main">
        <img src={bg} alt="" />
      </div>

      <div className="lamp">
        <div className="lamp-light" ref={lightRef}>
          <img src={light} alt="" />
        </div>
        <div className="lamp-base">
          <img src={postolje} alt="" />
          <div className="lamp-glow">
            <img src={glow} alt="" />
          </div>
        </div>
      </div>

      <h2 className="faq-title">FAQ</h2>

      <div
        className="slider-wrapper"
        ref={sliderRef}
        style={{ top: sliderTop }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div className="slider-track" ref={trackRef}>
          {extendedCards.map((card, index) => {
            const logicalIndex = index % cards.length;
            return (
              <FAQCard
                key={index}
                question={card.question}
                answer={card.answer}
                isFlipped={flippedIndex === logicalIndex}
                onFlip={() =>
                  setFlippedIndex(flippedIndex === logicalIndex ? null : logicalIndex)
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}