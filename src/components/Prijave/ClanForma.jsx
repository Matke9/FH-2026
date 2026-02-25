import React, { useState, useEffect, useRef } from 'react';
import { checkEmailOrPhoneExists } from '../../lib/database';

const ClanForma = ({ clanNumber = 1, onBack, initialData, onDataChange, allClanovi = {} }) => {
  const containerRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(initialData?.selectedStatus || '');
  const [formData, setFormData] = useState(initialData?.formData || {
    imePrezime: '',
    email: '',
    telefon: '',
    fakultetSkola: '',
    godinaStudija: '',
    cvLink: '',
    githubLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Resetuj poruku kada se komponenta mount-uje
  useEffect(() => {
    setMessage({ type: '', text: '' });
  }, []);

  // Čuvaj promene u parent komponenti
  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        selectedStatus,
        formData,
        message: { type: '', text: '' } // Ne čuvaj poruku u parent state-u
      });
    }
  }, [selectedStatus, formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validacija
    if (!selectedStatus) {
      setMessage({ type: 'error', text: 'Molimo izaberite status!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    if (!formData.imePrezime || !formData.email || !formData.telefon || !formData.cvLink) {
      setMessage({ type: 'error', text: 'Molimo popunite sva obavezna polja!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Validacija email formata
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Molimo unesite validan email!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Validacija Google Drive linka
    const isGoogleDriveLink = formData.cvLink.includes('drive.google.com') || formData.cvLink.includes('docs.google.com');
    if (!isGoogleDriveLink) {
      setMessage({ type: 'error', text: 'CV link mora biti Google Drive link!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Phone must be digits only and reasonable length
    const phoneDigits = /^\d+$/;
    const phoneTrimmed = (formData.telefon || '').replace(/\s+/g, '');
    if (!phoneDigits.test(phoneTrimmed)) {
      setMessage({ type: 'error', text: 'Broj telefona mora sadržati samo cifre!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }
    if (phoneTrimmed.length < 6 || phoneTrimmed.length > 15) {
      setMessage({ type: 'error', text: 'Broj telefona mora imati između 6 i 15 cifara!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Year of study must be numeric and in a reasonable range (1-10)
    const yearDigits = /^\d+$/;
    const yearTrimmed = (formData.godinaStudija || '').trim();
    if (!yearDigits.test(yearTrimmed)) {
      setMessage({ type: 'error', text: 'Godina studija mora biti broj!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }
    const yearNum = parseInt(yearTrimmed, 10);
    if (yearNum < 1 || yearNum > 10) {
      setMessage({ type: 'error', text: 'Godina studija mora biti između 1 i 10!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Local duplicate check
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const otherClanovi = Object.values(allClanovi).filter((_, idx) => idx + 1 !== clanNumber);
    const emailLower = formData.email ? formData.email.toLowerCase() : '';
    const emailExistsLocal = otherClanovi.some(c => c.formData && c.formData.email && c.formData.email.toLowerCase() === emailLower);
    const phoneExistsLocal = otherClanovi.some(c => c.formData && c.formData.telefon && c.formData.telefon === formData.telefon);

    if (emailExistsLocal) {
      setMessage({ type: 'error', text: 'Ovaj email je već unet u timu!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      setIsSubmitting(false);
      return;
    }

    if (phoneExistsLocal) {
      setMessage({ type: 'error', text: 'Ovaj broj telefona je već unet u timu!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      setIsSubmitting(false);
      return;
    }

    // Check against DB (without inserting) to ensure member not already registered
    try {
      const { emailExists, phoneExists } = await checkEmailOrPhoneExists(formData.email, formData.telefon);
      if (emailExists) {
        setMessage({ type: 'error', text: 'Ovaj email već postoji u bazi. Nemoguće dodati.' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        setIsSubmitting(false);
        return;
      }
      if (phoneExists) {
        setMessage({ type: 'error', text: 'Ovaj broj telefona već postoji u bazi. Nemoguće dodati.' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error('Greška pri proveri u bazi:', err);
      setMessage({ type: 'error', text: 'Greška pri proveri u bazi. Pokušajte ponovo.' });
      setIsSubmitting(false);
      return;
    }

    // Save to parent via onDataChange (effect already syncs on change) and show success
    setMessage({ type: 'success', text: 'Član uspešno dodat!' });
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setTimeout(() => {
      if (onBack) onBack();
    }, 1500);
    setIsSubmitting(false);
  };

  return (
        <div 
          ref={containerRef}
          className="max-w-2xl bg-black/40 border-2 border-white rounded-2xl p-8 max-h-[580px] overflow-y-auto" 
         style={{ 
           fontFamily: 'Montserrat, sans-serif'
         }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Poruke */}
        {message.text && (
          <div className="p-4 rounded-2xl border-2 text-center font-normal border-white text-white">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{message.type === 'success' ? '✓' : '✕'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Član sekcija */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            {/* Dugme za povratak */}
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
            
            <h2 className="text-white text-2xl text-center font-normal flex-1">
              Član {clanNumber}
            </h2>
            
            {/* Prazan prostor za balans */}
            <div className="w-20"></div>
          </div>

          {/* Ime i prezime */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Ime i prezime
            </label>
            <input
              type="text"
              name="imePrezime"
              value={formData.imePrezime}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white"
              placeholder=""
            />
          </div>

          {/* Mejl */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Mejl
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white"
              placeholder=""
            />
          </div>

          {/* Broj telefona */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Broj telefona
            </label>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white"
              placeholder=""
            />
          </div>

          {/* Status buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setSelectedStatus('srednjoskolac')}
              className={`px-6 py-2 rounded-full font-normal text-sm transition-colors
                         ${selectedStatus === 'srednjoskolac' 
                           ? 'bg-white text-gray-700' 
                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-gray-700'}`}
            >
              Srednjoškolac
            </button>
            <button
              onClick={() => setSelectedStatus('student')}
              className={`px-6 py-2 rounded-full font-normal text-sm transition-colors
                         ${selectedStatus === 'student' 
                           ? 'bg-white text-gray-700' 
                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-gray-700'}`}
            >
              Student
            </button>
            <button
              onClick={() => setSelectedStatus('zaposlen')}
              className={`px-6 py-2 rounded-full font-normal text-sm transition-colors
                         ${selectedStatus === 'zaposlen' 
                           ? 'bg-white text-gray-700' 
                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-gray-700'}`}
            >
              Zaposlen
            </button>
          </div>

          {/* Naziv fakulteta/srednje škole */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Naziv fakulteta/srednje škole
            </label>
            <input
              type="text"
              name="fakultetSkola"
              value={formData.fakultetSkola}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                         placeholder-gray-300 focus:outline-none focus:border-white"
              placeholder=""
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Godina studija/školovanja sekcija */}
        <div className="space-y-2">
          <h2 className="text-white text-base text-center font-normal">
            Godina studija/školovanja
          </h2>
          <input
            type="text"
            name="godinaStudija"
            value={formData.godinaStudija}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white"
            placeholder=""
          />
        </div>

        {/* Link ka CV-u sekcija */}
        <div className="space-y-2">
          <div className="space-y-1">
            <h2 className="text-white text-base text-center font-normal">
              Link ka CV-u
            </h2>
            <p className="text-white text-xs text-center font-light px-4">
              napomena: neophodno je postaviti CV na Google Drive i omogućiti da bude javno dostupan
            </p>
          </div>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white"
            placeholder=""
          />
        </div>

        {/* Link ka GitHub-u sekcija */}
        <div className="space-y-2">
          <div className="space-y-1">
            <h2 className="text-white text-base text-center font-normal">
              Link ka nalogu na GitHub-u (opcionalno)
            </h2>
            <p className="text-white text-xs text-center font-light px-4">
              napomena: neophodno je da repozitorijumi budu javno dostupni kako bismo mogli da vidimo projekte na nalogu
            </p>
          </div>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                       placeholder-gray-300 focus:outline-none focus:border-white"
            placeholder=""
          />
        </div>

        {/* Dodaj dugme */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-transparent border-2 border-white text-white px-12 py-2.5 rounded-full 
                       font-normal text-base hover:bg-white hover:text-gray-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Čuvanje...' : 'Dodaj'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClanForma;
