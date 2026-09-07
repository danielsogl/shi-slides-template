---
# ─── Deck-Konfiguration ───────────────────────────────────────────────
# Anpassen: title, seoMeta, themeConfig. Alles andere kann so bleiben.
# Alle Layouts und Komponenten in Aktion: `npm run demo` (demo.md).
theme: default
title: Titel des Vortrags
titleTemplate: '%s · SHI GmbH'
author: SHI GmbH
favicon: /favicon.png
lang: de # sonst steht <html lang="en"> im Deck und im PDF

# CI-Schriften (wie shi-gmbh.com: Open Sans 400/600/700).
# provider: none – die Fonts liegen als Paket im Repo und werden in
# styles/index.ts geladen. Nichts wird zur Laufzeit von Google geholt.
fonts:
  sans: Open Sans
  serif: Open Sans
  mono: JetBrains Mono
  provider: none

# 'auto' = umschaltbar (Taste "d" bzw. Button in der Navigationsleiste), Start
# nach Systemeinstellung. 'light' oder 'dark' nageln das Deck fest – nur dann
# ist der Umschalter bewusst deaktiviert.
colorSchema: auto
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: false
transition: slide-left
drawings:
  persist: false
# download: true würde bei JEDEM `slidev build` einen PDF-Export mit Chromium
# anstoßen – auch im Deploy, wo kein Browser installiert ist. Wer den
# Download-Button will: PDF per `npm run export` bauen, nach public/ legen und
# hier `download: /shi-slides.pdf` eintragen.
download: false
exportFilename: shi-slides
comark: true # erlaubt `[Text]{style="color:red"}` und `![](/x.png){width=500px}`

# Vorschaubild/Beschreibung beim Teilen des gehosteten Decks.
# Ohne ogImage bleibt die Vorschau eine reine Textkarte. Bild nach public/ legen
# und beide Zeilen mit der echten Deploy-URL einkommentieren.
# (`ogImage: auto` gäbe es auch, würde aber beim Build wieder Chromium starten.)
seoMeta:
  ogTitle: Titel des Vortrags
  ogDescription: Kurzbeschreibung für die Link-Vorschau
  twitterCard: summary_large_image
  # ogUrl: https://deck.example.com/
  # ogImage: https://deck.example.com/og.png

# Fußzeile auf allen Inhaltsfolien (slide-bottom.vue)
themeConfig:
  footer: Titel des Vortrags
  event: Event · 2026
  # confidential: Intern – vertraulich   # nur für interne Decks setzen

info: |
  ## Titel des Vortrags
  Kurzbeschreibung.

layout: cover
subtitle: Untertitel des Vortrags
speaker: Vorname Nachname
role: Rolle · SHI GmbH
event: Event
date: 2026
---

# Titel des Vortrags

<!--
Presenter-Notes stehen in HTML-Kommentaren, sichtbar nur im Presenter-Modus (Taste "P").
-->

---
layout: agenda
items:
  - Erstes Kapitel
  - Zweites Kapitel
  - Drittes Kapitel
current: 1
---

---
layout: section
number: 1
---

# Erstes Kapitel

---

# Erste Inhaltsfolie

Fließtext, Listen, Bilder – alles ganz normales Markdown.

<CardGrid :cols="2" class="mt-8">
  <Card title="Baustein" icon="i-carbon-idea" variant="accent">
    Zwölf Komponenten und sieben Layouts liegen bereit.
  </Card>
  <Card title="Referenz" icon="i-carbon-play">
    <code>npm run demo</code> zeigt alle in Aktion.
  </Card>
</CardGrid>

---
layout: outro
speaker: Vorname Nachname
role: Rolle · SHI GmbH
mail: vorname.nachname@shi-gmbh.com
linkedin: profil-slug
---

# Vielen Dank!

Fragen? Immer her damit.
