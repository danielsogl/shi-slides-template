# SHI GmbH

Das Unternehmen an Ihrer Seite – seit 1994.

<!--
Wiederverwendbarer Firmen-Block. In jedem Deck einbinden mit einer Folie, die nur
`src: ./pages/shi-company.md` im Frontmatter hat.

Wichtig: diese Datei startet bewusst OHNE Frontmatter – ein führender
`---`-Block würde beim Import als Headmatter gelesen und landete als Text auf
der Folie. Layouts deshalb erst ab der zweiten Folie setzen.

Zahlen: shi-gmbh.com/unternehmen (Stand 08/2026) – vor externen Talks prüfen.
-->

<div class="grid grid-cols-2 gap-10 mt-6">

<div>

Wir bauen **Such-, Retrieval- und Analytics-Lösungen** – von der Datenstrecke
bis zum fertigen Fachportal.

- Semantische Suche & Retrieval
- Data Processing & Advanced Analytics
- KI-Assistenten und RAG-Systeme
- Individuelle Web-Anwendungen

</div>

<div>

**Standorte** Augsburg (HQ) · München

**Produkt** InfoPilot – intelligente Fachportale

<div class="mt-5 flex flex-wrap gap-2">
  <Tag>Apache Solr</Tag>
  <Tag>Elasticsearch</Tag>
  <Tag>OpenSearch</Tag>
  <Tag color="teal">Apache NiFi</Tag>
  <Tag color="teal">Cloudera</Tag>
  <Tag color="teal">Cribl</Tag>
</div>

</div>

</div>

---

# Zahlen & Fakten

<div class="grid grid-cols-4 gap-6 mt-10">
  <Stat value="30+" label="Jahre" hint="am Markt seit 1994" />
  <Stat value="400+" label="Personenjahre" hint="Portal-, Such- & Analytics-Erfahrung" />
  <Stat value="200+" label="Kunden" hint="branchenübergreifend" />
  <Stat value="25+" label="Fachverlage" hint="500+ Werke, 1.000+ Aktualisierungen/Jahr" />
</div>

<!--
Quelle: shi-gmbh.com/unternehmen. Vor Konferenzvorträgen kurz gegenprüfen.
-->

---

# Wie wir arbeiten

<Steps
  class="mt-10"
  direction="row"
  :items="[
    { title: 'Verstehen', body: 'Daten, Nutzerfragen und Zielbild statt Feature-Liste.' },
    { title: 'Prototyp', body: 'Früh messbare Trefferqualität an echten Daten.' },
    { title: 'Bauen', body: 'Suchstrecke, Index und Portal produktionsreif.' },
    { title: 'Betreiben', body: 'Monitoring, Relevanz-Tuning, Weiterentwicklung.' },
  ]"
/>
