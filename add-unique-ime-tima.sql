-- Dodaj UNIQUE constraint na ime_tima u tabeli timovi
ALTER TABLE timovi ADD CONSTRAINT unique_ime_tima UNIQUE (ime_tima);d