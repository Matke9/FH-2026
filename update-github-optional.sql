-- Učini GitHub link opcionalan (dozvoli NULL vrednosti)

ALTER TABLE clanovi ALTER COLUMN github_link DROP NOT NULL;
