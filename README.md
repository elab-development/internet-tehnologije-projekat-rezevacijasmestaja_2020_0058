# SuiteEscape - Aplikacija za rezervaciju smeštaja

**SuiteEscape** je veb-aplikacija za rezervaciju različitih vrsta smeštaja, kao što su apartmani, kuće i stanovi. Aplikacija omogućava korisnicima da pretražuju, pregledaju, dodaju sopstveni smeštaj i rezervišu smeštaj na osnovu njihovih potreba i preferencija. Aplikacija ima tri moguće korisničke uloge: administratora, regularnog korisnika i neulogovanog korisnika.

## Korišćene tehnologije:

- **Backend:** Laravel
- **Frontend:** React
- **Baza podataka:** MySQL

## Pokretanje aplikacije

Najpre je potrebno pokrenuti Apache i MySQL u okviru XAMPP-a. Zatim je potrebno pokrenuti redom sledeće komande:

# Kloniranje

    `git clone https://github.com/elab-development/internet-tehnologije-projekat-rezevacijasmestaja_2020_0058/`
    `cd internet-tehnologije-projekat-rezevacijasmestaja_2020_0058`

# Backend

Uneti redom komande:

- `cd rezervacija-smestaja`
- `composer install`
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan serve`

# Frontend

Uneti redom komande:

- `cd frontend\front`
- `npm install`
- `npm start`

# Funkcionalnosti za neulogovanog korisnika:

- Prijava (Login)
- Registracija (Register)
- Pretraga smeštaja
- Pregled detalja smeštaja
- Pregled preporučenih smeštaja
- Pregled smeštaja po lokaciji

# Funkcionalnosti za regularnog korisnika:

- Prijava (Login)
- Pretraga smeštaja
- Pregled detalja smeštaja
- Pregled preporučenih smeštaja
- Pregled smeštaja po lokaciji
- Rezervacija smeštaja
- Pregled svih korisnikovih rezervacija
- Pregled detalja rezervacije
- Otkazivanje rezervacije
- Dodavanje sopstvenog smeštaja
- Pregled detalja sopstvenog smeštaja
- Izmena sopstvenog smeštaja
- Brisanje sopstvenog smeštaja
- Odjava (Logout)

# Funkcionalnosti za administratora:

- Prijava (Login)
- Pretraga smeštaja
- Pregled detalja smeštaja
- Brisanje smeštaja
- Pregled preporučenih smeštaja
- Pregled smeštaja po lokaciji
- Rezervacija smeštaja
- Pregled svih korisnikovih rezervacija
- Pregled detalja rezervacije
- Otkazivanje rezervacije
- Dodavanje sopstvenog smeštaja
- Pregled detalja sopstvenog smeštaja
- Izmena sopstvenog smeštaja
- Brisanje sopstvenog smeštaja
- Odjava (Logout)
