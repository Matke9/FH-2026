import React, { useState, useEffect, useRef } from 'react';

const TimForma = ({ onBack, onTimSubmitted, localClanovi = [], discipline = 'fon-hackathon' }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleKakoSteСuliToggle = (option) => {
    setKakoSteCuli(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const containerRef = useRef(null);
  const [clanovi, setClanovi] = useState([]);
  const [isLoadingClanovi, setIsLoadingClanovi] = useState(true);
  const [kakoSteCuli, setKakoSteCuli] = useState([]);
  const [formData, setFormData] = useState({
    imeTima: '',
    motivacija: '',
    prethodnaIskustva: '',
    konfliktResenje: '',
    prioritetiVreme: '', // FON Hakaton specifično
    iskustvoVideoIgre: '' // GameJam specifično
  });

  // Učitaj lokalne članove kada se prop promeni
  useEffect(() => {
    setClanovi(Array.isArray(localClanovi) ? localClanovi : []);
    setIsLoadingClanovi(false);
  }, [localClanovi]);

  // Dinamički naslov događaja
  const eventName = discipline === 'fon-hackathon' ? 'FON Hakaton' : discipline === 'gamejam' ? 'Game Jam' : 'Blockchain Challenge';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validacija osnovnih polja
    if (!formData.imeTima || !formData.motivacija || !formData.prethodnaIskustva || !formData.konfliktResenje) {
      setMessage({ type: 'error', text: 'Molimo popunite sva obavezna polja!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Validacija discipline-specific polja
    if (discipline === 'fon-hackathon' && !formData.prioritetiVreme) {
      setMessage({ type: 'error', text: 'Molimo popunite polje o prioritetima i vremenu!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    if (discipline === 'gamejam' && !formData.iskustvoVideoIgre) {
      setMessage({ type: 'error', text: 'Molimo popunite polje o iskustvu u pravljenju video igara!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Validate member count: min 3, max 4
    const memberCount = Array.isArray(localClanovi) ? localClanovi.length : (clanovi.length || 0);
    if (memberCount < 3) {
      setMessage({ type: 'error', text: 'Tim mora imati najmanje 3 člana pre nego što ga dodate.' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }
    if (memberCount > 4) {
      setMessage({ type: 'error', text: 'Tim ne može imati više od 4 člana.' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const timDataLocal = {
        ime_tima: formData.imeTima,
        discipline: discipline,
        kako_ste_culi: kakoSteCuli,
        motivacija: formData.motivacija,
        prethodna_iskustva: formData.prethodnaIskustva,
        konflikt_resenje: formData.konfliktResenje,
        prioriteti_vreme: discipline === 'fon-hackathon' ? formData.prioritetiVreme : null,
        iskustvo_video_igre: discipline === 'gamejam' ? formData.iskustvoVideoIgre : null
      };
      
      setMessage({ type: 'success', text: 'Tim uspešno dodat!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;

      setTimeout(() => {
        if (onTimSubmitted) onTimSubmitted(timDataLocal);
        setFormData({
          imeTima: '',
          motivacija: '',
          prethodnaIskustva: '',
          konfliktResenje: '',
          prioritetiVreme: '',
          iskustvoVideoIgre: ''
        });
        setKakoSteCuli([]);
        setMessage({ type: '', text: '' });
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="max-w-2xl bg-black/40 border-2 border-white rounded-2xl p-8 max-h-[580px] overflow-y-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {message.text && (
          <div className="p-4 rounded-2xl border-2 text-center font-normal border-white text-white">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{message.type === 'success' ? '✓' : '✕'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Tim sekcija */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="bg-transparent border border-white text-white px-4 py-1.5 rounded-full 
                           font-normal text-sm hover:bg-white hover:text-gray-700 transition-colors"
              >
                ← Nazad
              </button>
            )}
            <h2 className="text-white text-2xl text-center font-normal flex-1">TIM</h2>
            <div className="w-20"></div>
          </div>

          {/* Prikaz članova */}
          <div className="border-2 border-white rounded-3xl p-6">
            {isLoadingClanovi ? (
              <div className="text-white text-center">Učitavanje članova...</div>
            ) : clanovi.length === 0 ? (
              <div className="text-white text-center text-sm">
                Nema unetih članova. Prvo dodajte članove pre prijave tima.
              </div>
            ) : (
              <div className="flex justify-center items-center gap-8">
                {clanovi.map((clan, index) => {
                  const fullName = clan && (clan.ime_prezime || clan.imePrezime || '');
                  const firstName = fullName ? String(fullName).split(' ')[0] : '';
                  return (
                    <div key={(clan && clan.id) || index} className="flex flex-col items-center">
                      <div className="text-5xl mb-2">🌵</div>
                      <p className="text-white text-sm font-normal text-center">{firstName}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ime tima */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Naziv tima
            </label>
            <input
              type="text"
              name="imeTima"
              value={formData.imeTima}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white"
              placeholder=""
            />
          </div>

          {/* Kako ste čuli */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Kako ste čuli za {eventName}?
            </label>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                'Preko društvenih mreža',
                'Televizijska ili radio gostovanja',
                'Forumi',
                'Fizička promocija',
                'Od prijatelja',
                'Preporuka profesora',
                'Ranije ste učestvovali na sličnim događajima'
              ].map(option => (
                <label key={option} className="flex items-center gap-2 cursor-pointer text-white text-sm">
                  <input
                    type="checkbox"
                    checked={kakoSteCuli.includes(option)}
                    onChange={() => handleKakoSteСuliToggle(option)}
                    className="w-4 h-4 rounded border-2 border-white bg-transparent checked:bg-white"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Motivacija */}
        <div className="space-y-2">
          <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
            Šta vas je motivisalo da se prijavite za {eventName}? Kakva su vaša očekivanja od samog takmičenja?
          </label>
          <textarea
            name="motivacija"
            value={formData.motivacija}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white resize-none"
            placeholder=""
          />
        </div>

        {/* Prethodna iskustva */}
        <div className="space-y-2">
          <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
            Da li imate prethodna iskustva kao tim? Ako da, navedite koja. Ako ne, kako biste podelili uloge u timu?
          </label>
          <textarea
            name="prethodnaIskustva"
            value={formData.prethodnaIskustva}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white resize-none"
            placeholder=""
          />
        </div>

        {/* GameJam specifično pitanje */}
        {discipline === 'gamejam' && (
          <div className="space-y-2">
            <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
              Koje je vaše dosadašnje iskustvo u pravljenju video igara? Da li ste učestvovali na sličnom takmičenju? Koje biste tehnologije koristili?
            </label>
            <textarea
              name="iskustvoVideoIgre"
              value={formData.iskustvoVideoIgre}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white resize-none"
              placeholder=""
            />
          </div>
        )}

        {/* Konflikt u timu */}
        <div className="space-y-2">
          <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
            Šta biste radili ukoliko dođe do konflikta u timu?
          </label>
          <textarea
            name="konfliktResenje"
            value={formData.konfliktResenje}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white resize-none"
            placeholder=""
          />
        </div>

        {/* FON Hakaton specifično pitanje */}
        {discipline === 'fon-hackathon' && (
          <div className="space-y-2">
            <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
              Kako biste se snašli u situaciji gde vam je preostalo malo vremena, a puno posla? Kako određujete prioritete?
            </label>
            <textarea
              name="prioritetiVreme"
              value={formData.prioritetiVreme}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white resize-none"
              placeholder=""
            />
          </div>
        )}

        {/* Prijavi se dugme */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-transparent border-2 border-white text-white px-12 py-2.5 rounded-full 
                       font-normal text-base hover:bg-white hover:text-gray-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Čuvanje...' : 'Dodaj tim'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimForma;
