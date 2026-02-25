# Validacije i Ažuriranja Forma

## Promene

### 1. Email i Telefon Validacija
- Implementirana provera da li email ili broj telefona već postoje u bazi
- Novi korisnik ne može da se prijavi sa istim email-om ili brojem telefona
- Poruke greške se prikazuju na vrhu forme

### 2. GitHub Polje - Sada Opcionalno
- GitHub link više nije obavezan
- Naslov promenjen u "Link ka nalogu na GitHub-u (opcionalno)"
- Može da se ostavi prazno pri prijavi

### 3. CV Link - Google Drive Validacija
- CV link je i dalje obavezan
- **MORA** biti Google Drive link (drive.google.com ili docs.google.com)
- Poruka greške: "CV link mora biti Google Drive link!"
- Napomena u formi ažurirana: "neophodno je postaviti CV na Google Drive i omogućiti da bude javno dostupan"

### 4. Email Format Validacija
- Proverava se validnost email formata pre slanja
- Poruka greške: "Molimo unesite validan email!"

### 5. Automatsko Skrolovanje na Vrh
- Svi error popup-i automatski skroluju formu na vrh da korisnik vidi poruku

## SQL Ažuriranja

### VAŽNO: Izvršiti SQL komandu u Supabase

Otvori Supabase SQL Editor i izvrši sledeću komandu:

```sql
ALTER TABLE clanovi ALTER COLUMN github_link DROP NOT NULL;
```

Ili izvršiti sve komande iz fajla `update-github-optional.sql`.

Ova komanda omogućava da github_link može biti NULL vrednost.

## Nova Funkcija u database.js

Dodata funkcija `checkEmailOrPhoneExists(email, telefon, excludeId)` koja:
- Proverava da li email već postoji u bazi
- Proverava da li telefon već postoji u bazi
- Vraća `{ emailExists: boolean, phoneExists: boolean }`
- Case-insensitive provera za email

## Kako Testirati

1. Izvršiti SQL komandu iznad u Supabase
2. Pokušaj da prijaviš člana sa validnim podacima - trebalo bi da radi
3. Pokušaj da prijaviš još jednog člana sa istim email-om - trebalo bi da prikaže grešku
4. Pokušaj da prijaviš još jednog člana sa istim telefonom - trebalo bi da prikaže grešku
5. Ostavi GitHub polje prazno - trebalo bi da radi
6. Unesi CV link koji nije Google Drive - trebalo bi da prikaže grešku
7. Unesi validan Google Drive link - trebalo bi da radi

## Primer Validnih Google Drive Linkova

- https://drive.google.com/file/d/xxx/view
- https://docs.google.com/document/d/xxx/edit
- Bilo koji link koji sadrži "drive.google.com" ili "docs.google.com"
