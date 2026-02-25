# Supabase Integracija - Setup Guide

## Koraci za podešavanje:

### 1. Kreiranje Supabase projekta
1. Idi na [supabase.com](https://supabase.com)
2. Kreiraj nalog ili se uloguj
3. Kreiraj novi projekat
4. Sačekaj da se projekat inicijalizuje (1-2 minuta)

### 2. Dobijanje API kredencijala
1. U Supabase dashboard-u, idi na **Project Settings** (ikona zupčanika)
2. Klikni na **API** u levi meni
3. Kopiraj:
   - **Project URL** (npr: `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (dugačak string)

### 3. Konfiguracija projekta
1. Otvori fajl `.env.local` u root projekta
2. Zameni placeholdere sa svojim credentials:
   ```
   VITE_SUPABASE_URL=https://tvoj-projekt-url.supabase.co
   VITE_SUPABASE_ANON_KEY=tvoj-anon-key-ovde
   ```
3. **VAŽNO**: Restartuj development server nakon izmene .env fajla

### 4. Kreiranje tabela u bazi
1. U Supabase dashboard-u, idi na **SQL Editor**
2. Klikni **New Query**
3. Kopiraj kompletan sadržaj iz fajla `supabase-schema.sql`
4. Paste-uj u SQL editor
5. Klikni **Run** ili pritisni `Ctrl+Enter`
6. Ako je sve ok, videćeš poruku "Success. No rows returned"

### 5. Provera tabela
1. Idi na **Table Editor** u Supabase dashboard-u
2. Trebaš videti 3 nove tabele:
   - `clanovi`
   - `timovi`
   - `tim_clanovi`

## Kako koristiti u komponentama

### Primer za ClanForma komponentu:
```javascript
import { createClan } from '../lib';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const clanData = {
      broj_clana: clanNumber,
      ime_prezime: formData.imePrezime,
      email: formData.email,
      telefon: formData.telefon,
      status: formData.status,
      fakultet_skola: formData.fakultetSkola,
      godina_studija: formData.godinaStudija,
      cv_link: formData.cvLink,
      github_link: formData.githubLink
    };
    
    const result = await createClan(clanData);
    console.log('Član uspešno kreiran:', result);
    // Prikaži success poruku ili redirect
  } catch (error) {
    console.error('Greška pri kreiranju člana:', error);
    // Prikaži error poruku
  }
};
```

### Primer za TimForma komponentu:
```javascript
import { createPrijavaSaTimovimaIClanovima } from '../lib';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const timData = {
      ime_tima: formData.imeTima,
      prethodna_iskustva: formData.iskustva,
      motivacija: formData.motivacija,
      vestine_mane: formData.vestineMane
    };
    
    const clanoviData = [
      // Podaci za svakog člana
      { 
        broj_clana: 1,
        ime_prezime: clan1Data.ime,
        // ... ostali podaci
      },
      // ... ostali članovi
    ];
    
    const result = await createPrijavaSaTimovimaIClanovima(timData, clanoviData);
    console.log('Prijava uspešno kreirana:', result);
  } catch (error) {
    console.error('Greška:', error);
  }
};
```

## Dostupne funkcije

Sve funkcije su dostupne iz `src/lib/database.js`:

- `createClan(clanData)` - Kreira novog člana
- `getClanById(id)` - Dobija člana po ID-u
- `updateClan(id, updates)` - Ažurira člana
- `createTim(timData)` - Kreira nov tim
- `getTimById(id)` - Dobija tim po ID-u
- `getTimSaClanovima(timId)` - Dobija tim sa svim članovima
- `createPrijavaSaTimovimaIClanovima(timData, clanoviData)` - Kreira kompletnu prijavu
- `getAllPrijave()` - Dobija sve prijave sa članovima

## Troubleshooting

**Problem: "Invalid API key"**
- Proveri da li si dobro kopirao anon key iz Supabase
- Proveri da li imaš pravilno konfigurisane environment variables u `.env.local`
- Restartuj dev server

**Problem: "Cannot insert row"**
- Proveri da li si pokrenuo SQL skriptu za kreiranje tabela
- Proveri Row Level Security (RLS) policies u Supabase

**Problem: Environment variables ne rade**
- U Vite projektu, sve env variables MORAJU početi sa `VITE_`
- Restartuj development server nakon izmene `.env.local` fajla

## Bezbednost

- `.env.local` fajl je već dodat u `.gitignore` i neće biti commitovan
- `anon key` je bezbedno da bude na frontend-u
- Za produkciju, konfiguriši RLS policies da ograniče pristup podacima
