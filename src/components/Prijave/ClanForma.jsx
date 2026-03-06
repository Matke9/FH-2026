import React, { useState, useEffect, useRef } from 'react';
import { checkEmailOrPhoneExists } from '../../lib/database';

const ClanForma = ({ clanNumber = 1, onBack, initialData, onDataChange, allClanovi = {} }) => {
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(initialData?.selectedStatus || []);
  const [formData, setFormData] = useState(initialData?.formData || {
    imePrezime: '',
    email: '',
    telefon: '',
    kapiten: false,
    godine: 18,
    grad: '',
    srednjaSkola: '',
    godinaSkolovanja: '',
    fakultetSkola: '',
    godinaStudija: '',
    firma: '',
    cvLink: '',
    githubLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Resetuj poruku kada se komponenta mount-uje
  useEffect(() => {
    setMessage({ type: '', text: '' });
  }, []);

  // Očisti timeout kada se komponenta unmount-uje
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleStatusToggle = (status) => {
    setSelectedStatus(prev => {
      if (prev.includes(status)) {
        // Deselektuj status
        return prev.filter(s => s !== status);
      } else {
        // Ako bira student, ukloni srednjoškolac
        if (status === 'student') {
          return [...prev.filter(s => s !== 'srednjoskolac'), status];
        }
        // Ako bira srednjoškolac, ukloni student
        if (status === 'srednjoskolac') {
          return [...prev.filter(s => s !== 'student'), status];
        }
        // Zaposleni može biti sa bilo kojim
        return [...prev, status];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validacija
    if (selectedStatus.length === 0) {
      setMessage({ type: 'error', text: 'Molimo izaberite bar jedan status!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    if (!formData.imePrezime || !formData.email || !formData.telefon || !formData.grad || !formData.cvLink) {
      setMessage({ type: 'error', text: 'Molimo popunite sva obavezna polja!' });
      if (containerRef.current) containerRef.current.scrollTop = 0;
      return;
    }

    // Validacija specifična za status
    const isStudent = selectedStatus.includes('student');
    const isSrednjoskolac = selectedStatus.includes('srednjoskolac');
    const isZaposlen = selectedStatus.includes('zaposlen');
    
    if (isSrednjoskolac) {
      if (!formData.srednjaSkola || !formData.godinaSkolovanja) {
        setMessage({ type: 'error', text: 'Molimo popunite polja za srednjoškolce!' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        return;
      }
    }

    if (isStudent) {
      if (!formData.fakultetSkola || !formData.godinaStudija) {
        setMessage({ type: 'error', text: 'Molimo popunite polja za studente!' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        return;
      }
    }
    
    // Ako je samo zaposleni (bez studenta/srednjoškolca), mora uneti fakultet i firmu
    if (isZaposlen && !isStudent && !isSrednjoskolac) {
      if (!formData.fakultetSkola || !formData.firma) {
        setMessage({ type: 'error', text: 'Molimo popunite polja za fakultet i firmu!' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        return;
      }
    }
    
    // Ako je zaposleni (bilo koja kombinacija), mora uneti firmu
    if (isZaposlen) {
      if (!formData.firma) {
        setMessage({ type: 'error', text: 'Molimo popunite polje za firmu!' });
        if (containerRef.current) containerRef.current.scrollTop = 0;
        return;
      }
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
    
    // Automatski vrati nazad posle 1.5s
    timeoutRef.current = setTimeout(() => {
      if (onBack) onBack();
    }, 1500);
    
    setIsSubmitting(false);
  };

  return (
    <div 
      ref={containerRef}
      className="max-w-2xl mx-auto bg-black/40 border-2 border-white rounded-2xl p-8 max-h-[580px] overflow-y-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
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
                onClick={() => {
                  // Očisti timeout ako korisnik ručno klikne nazad
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  onBack();
                }}
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

          {/* Kapiten tima checkbox */}
          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              id="kapiten"
              name="kapiten"
              checked={formData.kapiten}
              onChange={handleChange}
              className="w-5 h-5 rounded border-2 border-white bg-transparent checked:bg-white"
            />
            <label htmlFor="kapiten" className="text-white text-base font-normal cursor-pointer">
              Kapiten tima
            </label>
          </div>

          {/* Godine - Slider */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Koliko imate godina? <span className="font-semibold">{formData.godine}</span>
            </label>
            <input
              type="range"
              name="godine"
              min="16"
              max="26"
              value={formData.godine}
              onChange={handleChange}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 
                         [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                         [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full 
                         [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-white text-sm px-1">
              <span>16</span>
              <span>26</span>
            </div>
          </div>

          {/* Grad */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Grad
            </label>
            <input
              type="text"
              name="grad"
              value={formData.grad}
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

          {/* Status checkboxes */}
          <div className="space-y-2">
            <label className="text-white text-base text-center block font-normal">
              Status
            </label>
            <p className="text-white text-xs text-center font-light px-4">
              Izaberite srednjoškolac ILI student. Zaposleni se može kombinovati.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes('srednjoskolac')}
                  onChange={() => handleStatusToggle('srednjoskolac')}
                  className="w-5 h-5 rounded border-2 border-white bg-transparent checked:bg-white"
                />
                <span className="text-white font-normal text-sm">Srednjoškolac</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes('student')}
                  onChange={() => handleStatusToggle('student')}
                  className="w-5 h-5 rounded border-2 border-white bg-transparent checked:bg-white"
                />
                <span className="text-white font-normal text-sm">Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes('zaposlen')}
                  onChange={() => handleStatusToggle('zaposlen')}
                  className="w-5 h-5 rounded border-2 border-white bg-transparent checked:bg-white"
                />
                <span className="text-white font-normal text-sm">Zaposlen</span>
              </label>
            </div>
          </div>

          {/* Polja za srednjoškolce */}
          {selectedStatus.includes('srednjoskolac') && (
            <>
              <div className="space-y-2">
                <label className="text-white text-base text-center block font-normal">
                  Naziv srednje škole
                </label>
                <input
                  type="text"
                  name="srednjaSkola"
                  value={formData.srednjaSkola}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                             placeholder-gray-300 focus:outline-none focus:border-white"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-white text-base text-center block font-normal">
                  Godina školovanja
                </label>
                <input
                  type="text"
                  name="godinaSkolovanja"
                  value={formData.godinaSkolovanja}
                  onChange={handleChange}
                  required
                  placeholder="Npr. 1, 2, 3, 4"
                  className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                             placeholder-gray-300 focus:outline-none focus:border-white"
                />
              </div>
            </>
          )}

          {/* Polja za studente */}
          {selectedStatus.includes('student') && (
            <>
              <div className="space-y-2">
                <label className="text-white text-base text-center block font-normal">
                  Naziv fakulteta
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
              <div className="space-y-2">
                <label className="text-white text-base text-center block font-normal">
                  Godina studija
                </label>
                <input
                  type="text"
                  name="godinaStudija"
                  value={formData.godinaStudija}
                  onChange={handleChange}
                  required
                  placeholder="Npr. 1, 2, 3, 4, master, doktorske"
                  className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                             placeholder-gray-300 focus:outline-none focus:border-white"
                />
              </div>
            </>
          )}

          {/* Polja za zaposlene - fakultet samo ako nije student/srednjoškolac */}
          {selectedStatus.includes('zaposlen') && !selectedStatus.includes('student') && !selectedStatus.includes('srednjoskolac') && (
            <>
              <div className="space-y-2">
                <label className="text-white text-base text-center block font-normal">
                  Naziv fakulteta
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
            </>
          )}

          {/* Firma - za sve zaposlene */}
          {selectedStatus.includes('zaposlen') && (
            <div className="space-y-2">
              <label className="text-white text-base text-center block font-normal">
                Firma
              </label>
              <input
                type="text"
                name="firma"
                value={formData.firma}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-2 border-white rounded-full px-6 py-3 text-white 
                           placeholder-gray-300 focus:outline-none focus:border-white"
                placeholder=""
              />
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-400 my-6"></div>

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
