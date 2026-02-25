-- Ispravi PL/pgSQL sintaksu za COUNT
CREATE OR REPLACE FUNCTION check_team_size()
RETURNS TRIGGER AS $$
DECLARE
  clan_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO clan_count FROM clanovi WHERE tim_id = NEW.tim_id;
  IF clan_count >= 4 THEN
    RAISE EXCEPTION 'Tim može imati najviše 4 člana';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS team_size_limit ON clanovi;
CREATE TRIGGER team_size_limit
BEFORE INSERT ON clanovi
FOR EACH ROW EXECUTE FUNCTION check_team_size();

-- Minimalni broj članova validirati u backendu
