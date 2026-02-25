-- Tabela za timove (MORA PRVO!)
CREATE TABLE timovi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ime_tima TEXT NOT NULL,
  discipline TEXT NOT NULL DEFAULT 'fon-hackathon' CHECK (discipline IN ('fon-hackathon', 'gamejam', 'blockchain')),
  prethodna_iskustva TEXT NOT NULL,
  motivacija TEXT NOT NULL,
  vestine_mane TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela za članove tima
CREATE TABLE clanovi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  broj_clana INTEGER NOT NULL CHECK (broj_clana BETWEEN 1 AND 4),
  ime_prezime TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('srednjoskolac', 'student', 'zaposlen')),
  fakultet_skola TEXT NOT NULL,
  godina_studija TEXT NOT NULL,
  cv_link TEXT NOT NULL,
  github_link TEXT, -- Opcionalno polje
  tim_id UUID REFERENCES timovi(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela za povezivanje članova sa timom (alternativa)
CREATE TABLE tim_clanovi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tim_id UUID REFERENCES timovi(id) ON DELETE CASCADE NOT NULL,
  clan_id UUID REFERENCES clanovi(id) ON DELETE CASCADE NOT NULL,
  pozicija INTEGER CHECK (pozicija BETWEEN 1 AND 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(tim_id, clan_id)
);

-- Indexi za brže pretraživanje
CREATE INDEX idx_clanovi_tim_id ON clanovi(tim_id);
CREATE INDEX idx_clanovi_email ON clanovi(email);
CREATE INDEX idx_timovi_created_at ON timovi(created_at);
CREATE INDEX idx_tim_clanovi_tim_id ON tim_clanovi(tim_id);
CREATE INDEX idx_tim_clanovi_clan_id ON tim_clanovi(clan_id);

-- Row Level Security (RLS) policies
ALTER TABLE clanovi ENABLE ROW LEVEL SECURITY;
ALTER TABLE timovi ENABLE ROW LEVEL SECURITY;
ALTER TABLE tim_clanovi ENABLE ROW LEVEL SECURITY;

-- Dozvoli svima da čitaju i upisuju (možeš kasnije ograničiti)
CREATE POLICY "Enable insert for all users" ON clanovi FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON clanovi FOR SELECT USING (true);
CREATE POLICY "Enable update for all users" ON clanovi FOR UPDATE USING (true);

CREATE POLICY "Enable insert for all users" ON timovi FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON timovi FOR SELECT USING (true);
CREATE POLICY "Enable update for all users" ON timovi FOR UPDATE USING (true);

CREATE POLICY "Enable insert for all users" ON tim_clanovi FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON tim_clanovi FOR SELECT USING (true);
CREATE POLICY "Enable update for all users" ON tim_clanovi FOR UPDATE USING (true);
