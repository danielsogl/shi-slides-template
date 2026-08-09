# SHI Slides Template

Slidev-Template im Corporate Design der SHI GmbH – für Konferenzvorträge,
Kundenpräsentationen und interne Talks.

```bash
npm install
npm run dev          # http://localhost:3030
npm run build        # statische SPA nach dist/
npm run export       # PDF  (--dark für den Dark Mode)
npm run export:pptx  # PowerPoint
```

## Neues Deck bauen

1. Repo als Vorlage kopieren, `npm install`.
2. Headmatter in `slides.md` anpassen: `title`, `themeConfig`, und auf der
   Cover-Folie `subtitle`, `speaker`, `role`, `event`, `date`.
3. Beispielfolien ersetzen. Firmenblock bei Bedarf via `src: ./pages/shi-company.md`
   einbinden.
4. Bilder nach `public/`, absolut referenzieren (`/architektur.png`).

Interne Decks bekommen `themeConfig.confidential: Intern – vertraulich` – das
blendet ein Badge in die Fußzeile. **Vor externen Talks entfernen.**

## Corporate Design

Ein öffentliches Brand-Manual der SHI GmbH existiert nicht. Die Werte in
`styles/_tokens.css` sind aus dem Live-Auftritt (shi-gmbh.com, Stand 08/2026)
extrahiert. Farben stehen nur dort – nirgends sonst im Repo.

| Token                | Wert      | Verwendung                                     |
| -------------------- | --------- | ---------------------------------------------- |
| `--shi-blue`         | `#0d81c4` | Primärfarbe (Web-Blau; Logo-Blau `#0d82c5`)    |
| `--shi-brand-text`   | `#075aae` | kleine Schrift & Links auf Weiß (6.8:1)        |
| `--shi-blue-surface` | `#0a6ba0` | helles Ende des Flächenverlaufs                |
| `--shi-navy`         | `#003c5f` | dunkles Ende, Cover-/Kapitel-Verlauf           |
| `--shi-on-brand`     | `#ffffff` | Text auf gefüllten Markenflächen (Chips, Tags) |
| `--shi-ink`          | `#3a3a3a` | Fließtext                                      |
| `--shi-ink-muted`    | `#4b4f58` | Sekundärtext                                   |
| `--shi-ink-dim`      | `#6b7280` | zurückgenommener Text (4.8:1)                  |
| Schrift              | Open Sans | wie shi-gmbh.com: 400 Text, 700 H1, 600 H2–H4  |

Das SHI-Blau erreicht auf Weiß nur 4.24:1 und Weiß auf ihm ebenfalls. Es ist
deshalb großer Schrift (ab 24px, oder 18.66px fett), Linien und Flächen
vorbehalten; alles Kleinere nutzt `--shi-brand-text`, Blauflächen enden bei
`--shi-blue-surface`. Die Akzentfarben (`--shi-accent-*`) sind **keine offizielle
CI**, sondern eine kontrastgeprüfte Erweiterung für Diagramme und Callouts.

Alle 39 Folien sind in Light und Dark per Playwright gegen WCAG AA geprüft:
0 Overflows, 0 Kontrastverstöße. Wenn du eigene Farben setzt, prüfe nach.

Schrift: `@fontsource/open-sans` liegt als Paket im Repo, geladen in
`styles/index.ts`, `provider: none` im Headmatter schaltet Slidevs
Google-Fonts-Import ab – so wie shi-gmbh.com die Dateien auch selbst ausliefert.
Ohne das fiele ein Vortrag ohne Netz auf die Systemschrift zurück, und ein
gehostetes Deck würde die IP jedes Betrachters an Google übertragen.

Logos in `public/`: `shi-logo.png` (farbig, helle Flächen), `shi-logo-white.png`
(weiß ausgespart, dunkle Flächen).

## Layouts

| Layout      | Frontmatter                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| `cover`     | `subtitle`, `speaker`, `role`, `event`, `date`, `image`                                     |
| `agenda`    | `items` (Strings oder `{label, hint}`), `current`, `title`, `note`                          |
| `section`   | `number`, `subtitle`                                                                        |
| `speaker`   | `name`, `role`, `image`, `mail`, `linkedin`, `github`, `bluesky`, `mastodon`, `web`, `dark` |
| `statement` | `source`                                                                                    |
| `quote`     | `author`, `position`, `logo`                                                                |
| `outro`     | `speaker`, `role`, `mail`, `phone`, `linkedin`, `web`, `qr`, `qrLabel`, `hideCompany`       |

`agenda` vor jedem Kapitel mit `current: n` wiederholen – erledigte Punkte
werden durchgestrichen, der aktuelle hervorgehoben. Alle Slidev-Built-ins
(`default`, `two-cols`, `two-cols-header`, `image-left`, `image-right`,
`iframe-right`, `center`, `full`, `fact`) sind mitgestylt.

## Komponenten

| Komponente      | Zweck                                                          |
| --------------- | -------------------------------------------------------------- |
| `<CardGrid>`    | Raster für Karten, `cols`, `gap`                               |
| `<Card>`        | Kachel mit `title`, `icon`, `variant`                          |
| `<Stat>`        | Kennzahl mit `value`, `label`, `hint`                          |
| `<Callout>`     | Hinweis, `type` = `info` / `tip` / `warn` / `danger`           |
| `<Steps>`       | Nummerierter Ablauf, `items`, `direction`, `start`, `clicks`   |
| `<Flow>`        | Ablaufkette, `items`, `direction`, `loop`, `clicks`            |
| `<Layers>`      | Architektur in Schichten, `items`, `clicks`                    |
| `<Timeline>`    | Zeitstrahl, `items` mit `when`/`title`/`body`/`tone`, `clicks` |
| `<Tag>`         | Label, `color`, `solid`, `icon`                                |
| `<LogoWall>`    | Kunden-/Tech-Logos, `logos`, `height`, `original`              |
| `<SpeakerCard>` | Personenblock, auch für Team-Folien                            |
| `<ShiLogo>`     | Logo, `variant` = `color` / `white`                            |

Konventionen: die Sammlung heißt überall `items`, ein zurückgenommener Eintrag
`tone: 'muted'`, `clicks` blendet Einträge nacheinander ein. Dazu drei
Hilfsklassen für Folien: `.shi-muted`, `.shi-overline`, `.shi-tilt`.

## Diagramme

| Fall                           | Werkzeug                 | Lizenz        |
| ------------------------------ | ------------------------ | ------------- |
| Ablauf, Pipeline, Schleife     | `<Flow>`                 | im Template   |
| Architektur, Stack             | `<Layers>`               | im Template   |
| Vergleich, Bausteine           | `<CardGrid>` / `<Steps>` | im Template   |
| Sequenz, Klassen, Zustand, ER  | Mermaid (eingebaut)      | MIT           |
| Freie Skizze, Whiteboard-Optik | Excalidraw → SVG         | MIT           |
| Screenshot, Fremdgrafik        | Bild in `public/`        | Rechte prüfen |

`<Flow>` und `<Layers>` sind der Normalfall – CI-Farben, skalieren mit der Folie,
per `clicks` schrittweise aufbaubar. Mermaid übernimmt, was von Hand albern wäre;
`setup/mermaid-renderer.ts` setzt dafür `look: 'neo'` und die SHI-Palette, in
Light und Dark. Bei Klassendiagrammen `direction LR` nutzen, sonst laufen sie
nach unten aus der Folie.

**PlantUML nicht benutzen.** Slidev kennt ```plantuml, kodiert den Diagrammtext
aber in eine Bild-URL von `plantuml.com` – geladen bei jedem Rendern und bei
jedem Betrachter des gehosteten Decks. UML geht in Mermaid (`classDiagram`,
`stateDiagram-v2`, `erDiagram`). Ebenfalls bewusst draußen: ELK-Layout (zieht
`elkjs` unter EPL/GPL nach) und Vue Flow / D3 (Overhead für Vorträge).

Für freie Skizzen: in [Excalidraw](https://excalidraw.com) zeichnen, als SVG nach
`public/`. Bei vertraulichen Inhalten die VS-Code-Erweiterung statt der
Web-Version – beides MIT.

## Icons

Icons sind CSS-Klassen, keine Dateien: `<div class="i-carbon-ai" />` oder
`icon="i-carbon-search"` an `<Card>`, `<Flow>`, `<Layers>`, `<Tag>`.

| Sammlung                                                      | Präfix            | Wofür                      | Lizenz     |
| ------------------------------------------------------------- | ----------------- | -------------------------- | ---------- |
| [Carbon](https://icones.js.org/collection/carbon)             | `i-carbon-`       | Sachicons, inkl. KI-Motive | Apache-2.0 |
| [Logos](https://icones.js.org/collection/logos)               | `i-logos-`        | Anbieterlogos, farbig      | CC0-1.0    |
| [Simple Icons](https://icones.js.org/collection/simple-icons) | `i-simple-icons-` | Anbieterlogos, einfarbig   | CC0-1.0    |

Für KI-Themen liefert Carbon u. a. `ai`, `ai-launch`, `ai-governance-lifecycle`,
`machine-learning-model`, `model-alt`, `prompt-template`, `chat-bot`,
`decision-tree`, `text-mining`; die Folie „Icons" im Deck zeigt eine Auswahl.

**Marken:** Die Sammlungen stehen unter CC0, die Logos bleiben Marken ihrer
Inhaber – nur für tatsächlich eingesetzte Produkte, unverändert, ohne den
Eindruck einer Partnerschaft. Kundenlogos nur mit schriftlicher Freigabe. Bei
`i-logos-` gibt es meist eine `-icon`-Variante (nur Bildmarke); die ergibt die
ruhigere Wand als gemischte Wortmarken.

## Dark Mode

`colorSchema: auto` – Start nach Systemeinstellung, umschaltbar mit **`d`** oder
über die Navigationsleiste, die Wahl liegt im `localStorage`. `light` oder `dark`
nageln ein Deck fest und deaktivieren dabei den Umschalter.

Beide Modi hängen an denselben Tokens; unter `html.dark` werden die Rollen
umgehängt. Drei Stellen brauchen mehr: Code (`setup/shiki.ts`, zwei Themes),
Mermaid (`setup/mermaid-renderer.ts`, Palette pro Rendern – die Begründung steht
dort im Kopf der Datei) und `<LogoWall original>`, das auf Dunkel ein helles Band
bekommt, weil schwarze Wortmarken sonst verschwinden.

Vollflächige Folien (`cover`, `section`, `statement`, `outro`) behalten in beiden
Modi den Markenverlauf – die Cover-Optik soll nicht vom Systemzustand des
Vortragenden abhängen.

## Deployen

`npm run build` legt die SPA nach `dist/`. `netlify.toml` und `vercel.json` rufen
genau dieses Kommando. Unter einem Unterpfad: `npm run build -- --base /deck/`.

Der Build erzeugt bewusst **kein** PDF – `download: true` würde bei jedem Build
einen Chromium-Export anstoßen, und auf den Deploy-Runnern ist kein Browser
installiert. Wer den Download-Button will: PDF per `npm run export` bauen, nach
`public/` legen, `download: /shi-slides.pdf` eintragen.

## CI & Updates

`.github/workflows/ci.yml` baut das Deck bei Push und PR und exportiert PDF und
PPTX – genau die Pfade, die Slidev- oder Playwright-Updates brechen. Die Dateien
werden verworfen; der `upload-artifact`-Block ist auskommentiert und lässt sich
bei Bedarf einkommentieren.

`.github/dependabot.yml` prüft montags npm und GitHub Actions. Minor und Patch
kommen gesammelt, Majors einzeln – ein Slidev-Major kann Layouts, Shiki-Themes
oder den Export verändern.

## Struktur

```
slides.md              Deck – gleichzeitig Referenz aller Layouts
pages/shi-company.md   wiederverwendbarer Firmenblock (via src: einbinden)
layouts/               eigene SHI-Layouts
components/            wiederverwendbare Bausteine
styles/index.ts        Einstiegspunkt: Schriften + CSS-Importe
styles/_tokens.css     CI-Farben und Maße – der einzige Ort für Farbänderungen
styles/_base.css       Typografie, Tabellen, Code, Links
styles/_layouts.css    Layout-Styles
styles/_components.css Komponenten-Styles
setup/mermaid-renderer.ts  Mermaid im SHI-Design (Light & Dark)
setup/shiki.ts         Code-Theme (github-*-high-contrast, AA-tauglich)
snippets/external.ts   Beispiel für `<<< @/snippets/…` (Code aus Datei)
slide-bottom.vue       Fußzeile (Logo, Titel, Event, Seitenzahl, Badge)
public/                Logos, Favicon, Platzhalterbilder, eigene Bilder
.github/               CI-Workflow und Dependabot
netlify.toml           Deploy-Konfiguration Netlify
vercel.json            Deploy-Konfiguration Vercel
```

`layouts/`, `components/` und `styles/` haben bereits die Struktur eines
Slidev-Themes – eine spätere Paketierung als `slidev-theme-shi` wäre ein
Verschiebe-Job, kein Rewrite.

## Hinweise

- Zahlen im Firmenblock stammen von shi-gmbh.com/unternehmen (Stand 08/2026) –
  vor externen Talks gegenprüfen.
- Fremdlogos in `<LogoWall>` nur mit Freigabe zeigen.
- Fußzeile pro Folie mit `footer: false` abschalten; ohne `themeConfig.footer`
  steht dort der Deck-Titel. Auf vollflächigen Layouts und auf `layout: speaker`
  mit `dark: true` blendet sie sich selbst aus.
- `public/speaker-placeholder.svg` steht auf der Speaker-Folie, bis ein echtes
  Porträt da ist – quadratisch zuschneiden, das Layout beschneidet auf 1:1.
- Importierte Dateien (`src:`) dürfen **nicht** mit einem `---`-Block beginnen –
  der landet sonst als Text auf der Folie.
- Code mit Zeilen-Hervorhebung (`{3-6|8-10}`) für PDFs mit allen Schritten:
  `npm run export -- --with-clicks`.
- `npm run export` braucht `playwright-chromium`. npm 11 blockt dessen
  Postinstall; der `allowScripts`-Eintrag in `package.json` gibt ihn frei –
  bewusst ohne Versions-Pin, sonst blockt jedes Dependabot-Update erneut.
- `comark: true` erlaubt `[Text]{style="color:red"}` und
  `![](/bild.png){width=500px}` direkt im Markdown.
- Redezeit im Presenter-Modus: `duration: 30min` ins Headmatter.
