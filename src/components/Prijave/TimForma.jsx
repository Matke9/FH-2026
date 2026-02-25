import React, { useState, useEffect, useRef } from 'react';

const TimForma = ({ onBack, onTimSubmitted, localClanovi = [] }) => {
  // initialize clanovi from localClanovi passed by StartMenu
    // Dodaj handler za promenu inputa
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const containerRef = useRef(null);
  const [clanovi, setClanovi] = useState([]);
  const [isLoadingClanovi, setIsLoadingClanovi] = useState(true);
  const [formData, setFormData] = useState({
    imeTima: '',
    iskustva: '',
    motivacija: '',
    vestineMane: ''
  });

  // Učitaj lokalne članove kada se prop promeni
  // We no longer fetch members from the server here; StartMenu passes local members as prop
  useEffect(() => {
    setClanovi(Array.isArray(localClanovi) ? localClanovi : []);
    setIsLoadingClanovi(false);
  }, [localClanovi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imeTima || !formData.iskustva || !formData.motivacija || !formData.vestineMane) {
      setMessage({ type: 'error', text: 'Molimo popunite sva polja!' });
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
      // Only perform local validation here. Server-side uniqueness is enforced on final submit.
      const timDataLocal = {
        ime_tima: formData.imeTima,
        prethodna_iskustva: formData.iskustva,
        motivacija: formData.motivacija,
        vestine_mane: formData.vestineMane
      };
      setMessage({ type: 'success', text: 'Tim uspešno dodat!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;

      // Show success message inside the form, then notify parent to hide form
      setTimeout(() => {
        if (onTimSubmitted) onTimSubmitted(timDataLocal);
        setFormData({
          imeTima: '',
          iskustva: '',
          motivacija: '',
          vestineMane: ''
        });
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
      style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
                    className="bg-transparent border border-white text-white px-4 py-1.5 rounded-full font-normal text-sm hover:bg-white hover:text-gray-700 transition-colors">
                    ← Nazad
                </button>
                )}
                <h2 className="text-white text-2xl text-center font-normal flex-1">TIM</h2>
                <div className="w-20"></div>
            </div>
            <div className="border-2 border-white rounded-3xl p-6">
              {isLoadingClanovi ? (
              <div className="text-white text-center">Učitavanje članova...</div>
              ) : clanovi.length === 0 ? (
              <div className="text-white text-center text-sm">Nema unetih članova. Prvo dodajte članove pre prijave tima.</div>
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
                <label className="text-white text-base text-center block font-normal">Ime tima</label>
                <input
                type="text"
                name="imeTima"
                value={formData.imeTima}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                placeholder=""
                />
            </div>
            
            {/* Prethodna iskustva */}
            <div className="space-y-2">
                <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
                Navedite i opišite prethodna iskustva u grupnom radu, a ako do sada niste radili zajedno opišite pojedinačna iskustva
            </label>
            <textarea
                name="iskustva"
                value={formData.iskustva}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                        placeholder-gray-300 focus:outline-none focus:border-white resize-none"
                placeholder=""
            />
            </div>
        </div>

        {/* Motivacija */}
        <div className="space-y-2">
          <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
            Šta vas je navelo da se prijavite za hakaton i šta želite da postignete i naučite učestvovanjem na ovom takmičenju?
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


        {/* Veštine i mane */}
        <div className="space-y-2">
          <label className="text-white text-sm text-center block font-normal leading-relaxed px-4">
            Šta biste istakli kao svoje veštine i mane koje bi uticale na uspeh celog tima na takmičenju?
          </label>
          <textarea
            name="vestineMane"
            value={formData.vestineMane}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-transparent border-2 border-white rounded-3xl px-6 py-4 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white resize-none"
            placeholder=""
          />
        </div>

        {/* Prijavi se dugme */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-transparent border-2 border-white text-white px-12 py-2.5 rounded-full 
                       font-normal text-base hover:bg-white hover:text-gray-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Čuvanje...' : 'Dodaj tim'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default TimForma;
