-- Migration: add `discipline` column to timovi
-- Safe sequence: add column, populate defaults, enforce NOT NULL and check constraint

ALTER TABLE timovi ADD COLUMN IF NOT EXISTS discipline TEXT;

-- Populate existing rows with a sensible default
UPDATE timovi SET discipline = 'fon-hackathon' WHERE discipline IS NULL;

-- Add check constraint to restrict values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'timovi_discipline_check'
  ) THEN
    ALTER TABLE timovi ADD CONSTRAINT timovi_discipline_check CHECK (discipline IN ('fon-hackathon', 'gamejam', 'blockchain'));
  END IF;
END$$;

-- Make column NOT NULL and set default
ALTER TABLE timovi ALTER COLUMN discipline SET DEFAULT 'fon-hackathon';
ALTER TABLE timovi ALTER COLUMN discipline SET NOT NULL;

-- NOTE: After running this migration, update any client code to set `discipline` when creating teams.
