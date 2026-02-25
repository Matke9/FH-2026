-- Dodaj UPDATE i DELETE policies za sve tabele

CREATE POLICY "Enable update for all users" ON clanovi FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON clanovi FOR DELETE USING (true);

CREATE POLICY "Enable update for all users" ON timovi FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON timovi FOR DELETE USING (true);

CREATE POLICY "Enable update for all users" ON tim_clanovi FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON tim_clanovi FOR DELETE USING (true);
