# Highperformer Beratungsgesellschaft mbH – Website

> **Hinweis:** Diese Website ist fiktiv und wurde im Rahmen des Universitätsprojekts „Systemanalyse & Systemverbesserung" (6. Semester) erstellt.

## Projektübersicht

Statische Website für die fiktive Beratungsgesellschaft **Highperformer Beratungsgesellschaft mbH** mit Sitz in Berlin. Die Website präsentiert das Unternehmen, seine Leistungen und das Team.

## Ordnerstruktur

```
├── index.html              # Hauptseite (SPA – alle Unterseiten integriert)
├── css/
│   └── style.css           # Gesamtes Styling (Custom Properties, responsive)
├── js/
│   └── script.js           # Navigation, Sidebar, Animationen
├── assets/
│   ├── images/             # Bilder & Fotos
│   ├── icons/              # Icons & Favicons
│   └── fonts/              # Lokale Schriftarten (falls benötigt)
├── docs/                   # Projektdokumentation, PowerPoint etc.
└── README.md               # Diese Datei
```

## Technologien

- **HTML5** – Semantisches Markup
- **CSS3** – Custom Properties, Flexbox, Grid, Animationen
- **JavaScript (Vanilla)** – SPA-Navigation, IntersectionObserver, Counter-Animationen
- **Google Fonts** – Inter (300–800)

## Seiten

| Seite                | Beschreibung                              |
|----------------------|-------------------------------------------|
| Startseite           | Hero, Statistiken, Leistungsübersicht     |
| Über uns             | Mission, Werte, Führungsteam              |
| History              | Timeline der Unternehmensgeschichte       |
| Unternehmensberatung | Beratungsfelder & Ansatz                  |
| Wirtschaftsprüfung   | Prüfungsleistungen & Qualifikationen      |
| Financial Advisory   | M&A, Finanzierung, Restrukturierung       |
| Steuerberatung       | Steuerliche Leistungen & Branchen         |
| Kontakt              | Standort & Kontaktformular                |
| Impressum            | Rechtliche Angaben                        |
| AGB                  | Allgemeine Geschäftsbedingungen           |
| Datenschutz          | Datenschutzerklärung                      |

## Lokale Entwicklung

Einfach `index.html` im Browser öffnen oder einen lokalen Server starten:

```bash
# Mit Python
python3 -m http.server 8080

# Mit Node.js (npx)
npx serve .
```

## Autoren

Erstellt im Rahmen des Universitätsprojekts – 6. Semester, 2025/2026.
