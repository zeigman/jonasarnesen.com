# Jonas Arnesen - Personlig nettside

En minimalistisk personlig nettside inspirert av kevinroose.com.

## Funksjoner

- Ren, minimalistisk design med vertikal scroll-layout
- Lys/mørk modus med toggle-knapp
- Fullt responsiv (fungerer på alle skjermstørrelser)
- Ingen eksterne avhengigheter - kun ren HTML, CSS og JavaScript
- Rask lasting og god ytelse

## Filstruktur

```
jonasarnesen.com/
├── index.html      # Hovedfilen med all innhold
├── styles.css      # All styling og theme-variabler
├── script.js       # Dark mode toggle-funksjonalitet
└── README.md       # Denne filen
```

## Slik åpner du nettsiden

### Lokalt (på din maskin)

1. Åpne Finder og naviger til `/Users/jonas/projects/jonasarnesen.com/`
2. Dobbeltklikk på `index.html` for å åpne den i nettleseren

### Alternativt - med lokal server

```bash
cd /Users/jonas/projects/jonasarnesen.com
python3 -m http.server 8000
```

Gå deretter til `http://localhost:8000` i nettleseren.

## Slik publiserer du nettsiden

### GitHub Pages (gratis)

1. Opprett et GitHub-repositorium
2. Push filene til GitHub
3. Gå til Settings → Pages
4. Velg main branch som kilde
5. Nettsiden vil være tilgjengelig på `https://[ditt-brukernavn].github.io/[repo-navn]`

### Netlify (gratis)

1. Dra og slipp hele mappen på [netlify.com/drop](https://app.netlify.com/drop)
2. Nettsiden publiseres umiddelbart med en tilfeldig URL
3. Du kan senere koble til eget domenenavn

### Vercel (gratis)

1. Installer Vercel CLI: `npm i -g vercel`
2. Kjør `vercel` i prosjektmappen
3. Følg instruksjonene

## Tilpasning

### Endre innhold

Rediger `index.html` for å oppdatere:
- Navn og tittel
- Introduksjonstekst
- Prosjekter og seksjoner
- Kontaktinformasjon

### Endre farger

Rediger CSS-variablene i `styles.css` (øverst i filen):

```css
:root {
    --accent-color: #0066cc;  /* Hovedfarge for lenker */
    --text-color: #1a1a1a;    /* Tekstfarge */
    /* osv. */
}
```

### Legge til nye seksjoner

Kopier en eksisterende `<section class="section">` i `index.html` og tilpass innholdet.

## Browser-støtte

Nettsiden fungerer i alle moderne nettlesere:
- Chrome/Edge (siste 2 versjoner)
- Firefox (siste 2 versjoner)
- Safari (siste 2 versjoner)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Kontakt

Jonas Arnesen - jonasgarnesen@gmail.com
