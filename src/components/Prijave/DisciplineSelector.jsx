export default function DisciplineSelector({ activeDiscipline, onDisciplineChange, onBlockchainClick }) {
  return (
    <div className="w-full bg-transparent py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Naslov */}
        <div className="text-center mb-6 md:mb-8">
          <h1 
            className="text-white text-xl md:text-2xl lg:text-4xl tracking-[0.2em] font-dune"
          >
            FORMA ZA PRIJAVU
          </h1>
        </div>
        
        {/* Toggle dugmići za discipline */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          <button
            onClick={() => onDisciplineChange('fon-hackathon')}
            className={`rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 transition-all text-sm md:text-base font-medium ${
              activeDiscipline === 'fon-hackathon'
                ? 'border-white bg-white text-black shadow-lg'
                : 'border-white bg-transparent text-white hover:bg-white/10'
            }`}
          >
            FON HAKATON
          </button>
          
          <button
            onClick={() => onDisciplineChange('gamejam')}
            className={`rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 transition-all text-sm md:text-base font-medium ${
              activeDiscipline === 'gamejam'
                ? 'border-white bg-white text-black shadow-lg'
                : 'border-white bg-transparent text-white hover:bg-white/10'
            }`}
          >
            GAME JAM
          </button>
          
          <button
            onClick={onBlockchainClick}
            className="rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 border-white bg-transparent text-white transition-all hover:bg-white/10 text-sm md:text-base font-medium"
          >
            WEB4 CHALLENGE
          </button>
        </div>
      </div>
    </div>
  );
}
