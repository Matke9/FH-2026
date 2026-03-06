import React, { useState, useEffect } from 'react';
import ClanForma from './ClanForma';
import TimForma from './TimForma';
import { createPrijavaSaTimovimaIClanovima, getAllClanovi, getTimByName } from '../../lib/database';
import Popup from './Popups/Popup';

const StartMenu = ({ discipline = 'fon-hackathon' }) => {
  const [selectedClan, setSelectedClan] = useState(null);
  const [showTimForma, setShowTimForma] = useState(false);
  const [createdTim, setCreatedTim] = useState(null);
  const [popup, setPopup] = useState({ visible: false, type: 'success', text: '' });

  // Do not show popup on team creation; popups are shown only on final submit

  // Reset forms on page load (refresh)
  useEffect(() => {
    sessionStorage.removeItem('clanoviData');
    sessionStorage.removeItem('timFormaData');
  }, []);

  // Also clear any created team and local member data on mount
  useEffect(() => {
    setCreatedTim(null);
    resetAllData();
  }, []);

  // Čuvamo podatke za sve 4 člana
  const [clanoviData, setClanoviData] = useState({
    1: { 
      selectedStatus: [], 
      formData: { 
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
        cvLink: '', 
        githubLink: '' 
      }, 
      message: { type: '', text: '' } 
    },
    2: { 
      selectedStatus: [], 
      formData: { 
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
        cvLink: '', 
        githubLink: '' 
      }, 
      message: { type: '', text: '' } 
    },
    3: { 
      selectedStatus: [], 
      formData: { 
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
        cvLink: '', 
        githubLink: '' 
      }, 
      message: { type: '', text: '' } 
    },
    4: { 
      selectedStatus: [], 
      formData: { 
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
        cvLink: '', 
        githubLink: '' 
      }, 
      message: { type: '', text: '' } 
    }
  });

  const updateClanData = (clanNumber, data) => {
    setClanoviData(prev => ({
      ...prev,
      [clanNumber]: data
    }));
  };

  const resetAllData = () => {
    setClanoviData({
      1: { 
        selectedStatus: [], 
        formData: { 
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
          cvLink: '', 
          githubLink: '' 
        }, 
        message: { type: '', text: '' } 
      },
      2: { 
        selectedStatus: [], 
        formData: { 
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
          cvLink: '', 
          githubLink: '' 
        }, 
        message: { type: '', text: '' } 
      },
      3: { 
        selectedStatus: [], 
        formData: { 
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
          cvLink: '', 
          githubLink: '' 
        }, 
        message: { type: '', text: '' } 
      },
      4: { 
        selectedStatus: [], 
        formData: { 
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
          cvLink: '', 
          githubLink: '' 
        }, 
        message: { type: '', text: '' } 
      }
    });
  };

  // Handler za prijavu tima i članova
  const handlePrijava = async () => {
    // count filled members (by name)
    const members = Object.values(clanoviData).filter(c => c.formData && c.formData.imePrezime && c.formData.imePrezime.trim() !== '');
    if (members.length < 3) {
      setPopup({ visible: true, type: 'error', text: 'Ne možete poslati prijavu: tim mora imati najmanje 3 člana.' });
      return;
    }

    // Validacija kapitena
    const kapiteni = members.filter(m => m.formData && m.formData.kapiten === true);
    if (kapiteni.length === 0) {
      setPopup({ visible: true, type: 'error', text: 'Tim mora imati kapitena! Izaberite jednog člana kao kapitena.' });
      return;
    }
    if (kapiteni.length > 1) {
      setPopup({ visible: true, type: 'error', text: 'Tim može imati samo jednog kapitena!' });
      return;
    }

    // We will perform an atomic create: team + members
    if (!createdTim) {
      setPopup({ visible: true, type: 'error', text: 'Morate prvo uneti podatke o timu pre slanja prijave.' });
      return;
    }

    try {
      // fetch existing members from DB once
      const existing = await getAllClanovi();

      const localMembersRaw = Object.values(clanoviData).filter(c => c.formData && c.formData.imePrezime && c.formData.imePrezime.trim() !== '');

      // validate team name uniqueness
      const existingTeam = await getTimByName(createdTim.ime_tima).catch(() => null);
      if (existingTeam) {
        setPopup({ visible: true, type: 'error', text: 'Tim sa istim imenom već postoji u bazi.' });
        return;
      }

      // validate against DB: emails and phones must not already exist
      const conflicts = [];
      for (const lm of localMembersRaw) {
        const email = lm.formData.email ? lm.formData.email.toLowerCase() : '';
        const phone = lm.formData.telefon ? lm.formData.telefon : '';
        if (email && existing.some(e => e.email && e.email.toLowerCase() === email)) {
          conflicts.push(`Email ${lm.formData.email} već postoji u bazi.`);
        }
        if (phone && existing.some(e => e.telefon && e.telefon === phone)) {
          conflicts.push(`Telefon ${lm.formData.telefon} već postoji u bazi.`);
        }
      }

      if (conflicts.length > 0) {
        setPopup({ visible: true, type: 'error', text: conflicts[0] });
        return;
      }

      const localMembers = localMembersRaw.map((c) => ({
        ime_prezime: c.formData.imePrezime,
        email: c.formData.email,
        telefon: c.formData.telefon,
        kapiten: c.formData.kapiten || false,
        godine: c.formData.godine || 18,
        grad: c.formData.grad || '',
        status: Array.isArray(c.selectedStatus) ? c.selectedStatus : (c.selectedStatus ? [c.selectedStatus] : []),
        srednja_skola: c.formData.srednjaSkola || null,
        godina_skolovanja: c.formData.godinaSkolovanja || null,
        fakultet_skola: c.formData.fakultetSkola || null,
        godina_studija: c.formData.godinaStudija || null,
        cv_link: c.formData.cvLink,
        github_link: c.formData.githubLink || null
      }));

      // createPrijavaSaTimovimaIClanovima will create the team and the members atomically
      await createPrijavaSaTimovimaIClanovima(
        {
          ime_tima: createdTim.ime_tima,
          discipline: createdTim.discipline || discipline,
          kako_ste_culi: createdTim.kako_ste_culi || [],
          motivacija: createdTim.motivacija,
          prethodna_iskustva: createdTim.prethodna_iskustva,
          konflikt_resenje: createdTim.konflikt_resenje,
          prioriteti_vreme: createdTim.prioriteti_vreme || null,
          iskustvo_video_igre: createdTim.iskustvo_video_igre || null
        },
        localMembers
      );

      setPopup({ visible: true, type: 'success', text: 'Prijava uspešno poslata!' });
      resetAllData();
      setCreatedTim(null);
    } catch (err) {
      console.error(err);
      setPopup({ visible: true, type: 'error', text: 'Greška pri slanju prijave. Pokušajte ponovo.' });
    }
  };

  // Ako je izabran član, prikaži ClanForma
  if (selectedClan) {
    return (
      <ClanForma 
        clanNumber={selectedClan} 
        onBack={() => setSelectedClan(null)}
        initialData={clanoviData[selectedClan]}
        onDataChange={(data) => updateClanData(selectedClan, data)}
        allClanovi={clanoviData}
      />
    );
  }

  // Ako je izabran Tim, prikaži TimForma
  if (showTimForma) {
    return (
      <TimForma
        onBack={() => setShowTimForma(false)}
        onTimSubmitted={(tim) => { setCreatedTim(tim); setShowTimForma(false); }}
        localClanovi={Object.values(clanoviData).filter(c => c.formData && c.formData.imePrezime && c.formData.imePrezime.trim() !== '').map(c => c.formData)}
        discipline={discipline}
      />
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto bg-transparent rounded-2xl p-4 md:p-8" 
         style={{ 
           fontFamily: 'Montserrat, sans-serif'
         }}>
      {popup.visible && <Popup type={popup.type} text={popup.text} onClose={() => setPopup({ visible: false, type: 'success', text: '' })} />}
      <div className="space-y-3 md:space-y-4">
        {/* Član 1 dugme */}
        <button 
          onClick={() => setSelectedClan(1)}
          className="w-full bg-transparent text-white rounded-xl px-6 md:px-8 py-3 md:py-4 border-2 border-white
                     font-normal text-base md:text-lg hover:bg-white hover:text-gray-700 transition-colors">
          Član 1
        </button>

        {/* Član 2 dugme */}
        <button 
          onClick={() => setSelectedClan(2)}
          className="w-full bg-transparent text-white rounded-xl px-6 md:px-8 py-3 md:py-4 border-2 border-white
                     font-normal text-base md:text-lg hover:bg-white hover:text-gray-700 transition-colors">
          Član 2
        </button>

        {/* Član 3 dugme */}
        <button 
          onClick={() => setSelectedClan(3)}
          className="w-full bg-transparent text-white rounded-xl px-6 md:px-8 py-3 md:py-4 border-2 border-white
                     font-normal text-base md:text-lg hover:bg-white hover:text-gray-700 transition-colors">
          Član 3
        </button>

        {/* Član 4 dugme */}
        <button 
          onClick={() => setSelectedClan(4)}
          className="w-full bg-transparent text-white rounded-xl px-6 md:px-8 py-3 md:py-4 border-2 border-white
                     font-normal text-base md:text-lg hover:bg-white hover:text-gray-700 transition-colors">
          Član 4
        </button>

        {/* Više razmaka pre Tim dugmeta */}
        <div className="pt-2 md:pt-4">
          <button 
            onClick={() => setShowTimForma(true)}
            className="w-full bg-transparent text-white rounded-xl px-6 md:px-8 py-3 md:py-4 border-2 border-white
                           font-normal text-base md:text-lg hover:bg-white hover:text-gray-700 transition-colors">
            Tim
          </button>
        </div>

        {/* Više razmaka pre Prijavi se dugmeta */}
        <div className="pt-2 md:pt-4">
          <button
            className="w-full bg-transparent border-2 border-white text-white rounded-full px-6 py-2.5 md:py-3 
              font-normal text-sm md:text-base hover:bg-white hover:text-gray-700 transition-colors"
            onClick={handlePrijava}
          >
            Prijavi se
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
