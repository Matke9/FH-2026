export default function DisciplineSelector({ activeDiscipline, onDisciplineChange, onBlockchainClick }) {
  return (
    <div className="w-full bg-transparent py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Naslov */}
        <div className="text-center mb-6 md:mb-8">
          <h1 
            className="text-white text-xl md:text-2xl lg:text-4xl tracking-[0.2em]" 
            style={{ fontFamily: 'Dune Rise, Montserrat, sans-serif' }}
          >
            FORMA ZA PRIJAVU
          </h1>
        </div>
        
        {/* Toggle dugmići za discipline */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          <button
            onClick={() => onDisciplineChange('fon-hackathon')}
            className={`bg-transparent text-white rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 transition-all text-sm md:text-base ${
              activeDiscipline === 'fon-hackathon'
                ? 'border-white bg-white text-gray-800 font-semibold'
                : 'border-white/70 hover:bg-white hover:text-gray-800'
            }`}
          >
            FON HAKATON
          </button>
          
          <button
            onClick={() => onDisciplineChange('gamejam')}
            className={`bg-transparent text-white rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 transition-all text-sm md:text-base ${
              activeDiscipline === 'gamejam'
                ? 'border-white bg-white text-gray-800 font-semibold'
                : 'border-white/70 hover:bg-white hover:text-gray-800'
            }`}
          >
            GAME JAM
          </button>
          
          <button
            onClick={onBlockchainClick}
            className="bg-transparent text-white rounded-xl px-4 md:px-6 py-2 md:py-2.5 border-2 border-white/70 transition-all hover:bg-white hover:text-gray-800 text-sm md:text-base"
          >
            BLOCKCHAIN
          </button>
        </div>
      </div>
    </div>
  );
}
