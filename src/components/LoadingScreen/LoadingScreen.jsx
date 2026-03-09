import loadingDesktop from '../../assets/Loading/Loading - Stefan.svg'
import loadingMobile from '../../assets/Loading/Loading - telefon - Stefan.svg'

export default function LoadingScreen({ progress, fadeOut }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#002440] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Desktop SVG – prikazuje se od md pa na gore */}
      <img
        src={loadingDesktop}
        alt="Loading"
        className="hidden md:block w-full h-full object-contain select-none"
        draggable={false}
      />

      {/* Mobile SVG – prikazuje se ispod md */}
      <img
        src={loadingMobile}
        alt="Loading"
        className="block md:hidden w-full h-full object-contain select-none"
        draggable={false}
      />

      {/* Progress bar – uvek prikacan na dno, vidljiv na svim dimenzijama */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2">
        <div className="w-[60vw] max-w-sm h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/40 text-xs tracking-[0.3em] font-mono">
          {progress}%
        </p>
      </div>
    </div>
  )
}

