## Information Architecture, Taxonomy, and Content Inventory Mapping

1) Purpose and principles
- IA goal: The portal must preserve every file intact while enabling comprehension, discovery, and trust through clear navigation, strong information scent, and transparent provenance across all pages. [1](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)
- Polyhierarchy with a single canonical breadcrumb path: Each item has one canonical category for breadcrumbs to avoid confusion, while editorially curated cross-links place it in multiple thematic contexts to support lateral exploration and narrative coherence. This approach aligns with user-centered taxonomy design, card sorting/tree testing, and predictable labeling. [2](https://www.nngroup.com/topic/information-architecture/)
- Wayfinding predictability: Visible global navigation, clear labels, and canonical breadcrumbs orient users who often arrive via deep links, reducing pogo-sticking and supporting trust. [3](https://www.nngroup.com/articles/menu-design/)
- Provenance clarity: For investigative content, normalized metadata and per-item provenance notes improve credibility and retrieval, sustaining reader trust in sensitive domains. [1](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)

2) Taxonomy and category definitions (operationalized)
- Manipulacje i Toksyczność
  - Scope: Psychology of manipulation, toxic relationships, narcissism, and patterns of coercion/harm; analysis-focused and trauma-informed.
  - Editorial note: Use non-stigmatizing labels and maintain analytical tone.
- Instrumentalne wykorzystanie instytucji
  - Scope: Materials evidencing how institutional processes or actors support or amplify manipulation; systemic dynamics and accountability.
  - Editorial note: Highlight procedural mechanisms and institutional behaviors.
- Dokumenty i Fakty
  - Scope: Verifiable artifacts and factual summaries (official documents, evidence analysis, fact briefs); emphasis on source integrity.
  - Editorial note: Normalize document types and sourcing details for consistent retrieval.
- Raporty i Analizy
  - Scope: Interpretive outputs aimed at public/press (media reports, critical analyses, and chronicles when serving analytical functions).
  - Editorial note: Provide concise abstracts and links to underlying evidence.
- Symbolika i Narracja
  - Scope: Framing constructs and narratives that contextualize experiences (e.g., “Klątwa”), including chronicles as narrative scaffolding.
  - Editorial note: Pair narrative framing with analytical cross-links to evidence.
- Polyhierarchy policy: An item can appear in multiple thematic contexts via related links, but retains one canonical category for breadcrumbs to preserve orientation and avoid label drift. [2](https://www.nngroup.com/topic/information-architecture/)

3) Page types and templates
- Homepage
  - Elements: Mission statement; five-category grid with supportive icons and clear labels; featured items; persistent search box; latest additions; editorial note on provenance and verification practices. [4](https://www.nngroup.com/articles/homepage-design-principles/)
  - Behavior: Visible global navigation on desktop; language toggle; serious, analytical tone with minimal motion; high-contrast links. [3](https://www.nngroup.com/articles/menu-design/)
- Category landing pages (five)
  - Elements: Category description; list of items rendered as cards with title, date (if available), document type, concise summary, tags; facet filters (category, document_type, tags, date); “View All” and pagination; cross-links to related categories. [2](https://www.nngroup.com/topic/information-architecture/)
  - Expand/collapse pattern: Card summaries use accessible accordions for “Read more”; headings are buttons with aria-expanded state, caret icons, multiple panels can be open, and collapsed content is programmatically hidden. [5](https://www.nngroup.com/articles/accordions-on-desktop/)
- Item (document) pages (nine items)
  - Elements: Immutable, verbatim .txt viewer; metadata panel; “▶ Posłuchaj analizy” per-article audio control wired to an accessible player (play/pause, seek, volume, mute, playback rate, keyboard operability); transcript toggle; provenance note; canonical download link to the original .txt; related items; breadcrumb trail. [6](https://www.w3.org/TR/WCAG22/)
  - Accessibility: Player supports keyboard and screen reader users; provide transcript for audio-only and captions for synchronized media when applicable; disable autoplay or provide immediate pause/stop/volume controls. [7](https://dequeuniversity.com/checklists/web/audio-video)
  - Long documents: Provide a nonsticky in-article table of contents labeled “On This Page,” plus a back-to-top link for scannability. [8](https://www.nngroup.com/articles/table-of-contents/)
- Utility pages
  - About/Editorial Standards: Mission, methodology, sourcing, and verification; transparency commitments.
  - Corrections/Right of Reply: Workflow and timelines aligned with Polish Press Law (sprostowanie), non-alteration rules, and publication placement. [9](https://sciendo.com/pdf/10.1515/lape-2017-0002)
  - Privacy and Cookies: GDPR-compliant notice in Polish, cookie/analytics consent, DPO contact, rights, transfers, and safeguards. [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024)
  - Methodology and Provenance: Hashing, timestamps, version history; redaction policy when legally necessary, documented without replacing canonical originals. [9](https://sciendo.com/pdf/10.1515/lape-2017-0002)
  - Audio and Accessibility: WCAG 2.2 commitments, transcripts/captions, keyboard access, focus visibility, target size, non-text contrast, and motion control. [6](https://www.w3.org/TR/WCAG22/)
  - Contact: Secure intake for queries and right-of-reply submissions.

4) Complete inventory mapping of the nine files (canonical placement, related-category links, normalized document type)
- All items are displayed in full, unaltered text and provide an original-file download link on their item pages.

| Filename | Canonical category | Related-category links | Document type | Verbatim_display_and_download |
| --- | --- | --- | --- | --- |
| raport dla mediów Klątwa.txt | Raporty i Analizy | Symbolika i Narracja; Manipulacje i Toksyczność | media report | Yes |
| kronika ósmego kręgu.txt | Symbolika i Narracja | Raporty i Analizy; Manipulacje i Toksyczność | chronicle/longform narrative | Yes |
| kluczowe fakty.txt | Dokumenty i Fakty | Raporty i Analizy; Instrumentalne wykorzystanie instytucji | fact brief | Yes |
| jak instytucje wspierały manipulację.txt | Instrumentalne wykorzystanie instytucji | Manipulacje i Toksyczność; Raporty i Analizy | institutional analysis | Yes |
| 5 faktow.txt | Dokumenty i Fakty | Raporty i Analizy | fact brief | Yes |
| krytyczna analiza materiału dowodowego.txt | Dokumenty i Fakty | Raporty i Analizy | evidence analysis | Yes |
| sluzebnosc a dozywocie.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy | legal analysis | Yes |
| Raport dla mediów.txt | Raporty i Analizy | Dokumenty i Fakty; Instrumentalne wykorzystanie instytucji | media report | Yes |
| akt darowizny.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy | official document | Yes |

5) Metadata schema for items and lists (to support search, filtering, and provenance)
- Item-level schema (controlled vocabularies and normalized fields)
  - title: Verbatim filename used as display title; optional display title alias.
  - canonical_category: Single category for breadcrumb path.
  - related_categories: Array of additional thematic contexts.
  - document_type: Controlled vocabulary (e.g., media report, fact brief, evidence analysis, legal analysis, official document, chronicle).
  - author/source: If known; else “unknown/unspecified.”
  - date: ISO 8601 if available; else “undated.”
  - summary: Editorial abstract (50–120 words), analytical and non-judgmental.
  - tags: Controlled and free-form, Polish terms (e.g., “manipulacja”, “narcyzm”, “instytucje”, “dowody”, “raport”).
  - provenance_note: How obtained; authenticity caveats; editorial handling.
  - hash_sha256: Computed on original file for integrity verification.
  - original_filename and canonical_url: For retrieval and citation.
  - audio_asset: Path to /audio/ if available; transcript_url for downloadable transcript.
  - rights and sensitivity_flags: Content warnings (e.g., distressing material).
  - Rationale: Normalized metadata and controlled vocabularies improve information scent and consistent retrieval in lists, search, and facets. [2](https://www.nngroup.com/topic/information-architecture/)
- List-level schema for category pages and search results
  - Facets: category; document_type; tags; date (ISO); popularity/coverage ordering and availability filters; interdependent facets shown contextually post-selection; batch apply on mobile. [11](https://www.coveo.com/blog/faceted-search/)
  - Sort options: newest first; A–Z by title; (optional) type priority.
  - Pagination: 12–24 items per page with “View All” link; persistent search box outside mega menus. [12](https://www.nngroup.com/articles/mega-menus-work-well/)

6) Navigation model and wayfinding aids
- Global header
  - Visible top-level categories on desktop; utility links (About, Corrections, Privacy); language toggle (PL/EN); search box always visible. [3](https://www.nngroup.com/articles/menu-design/)
  - Mobile: Hamburger labeled “Menu” opens a drawer with the same categories and utility links; maintain adequate contrast, size, and redundant navigation paths. [13](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/)
- Breadcrumbs
  - Structure: Home › Category › Item; current page not a link; canonical hierarchical path; truncate to avoid wrapping on mobile. [14](https://www.nngroup.com/articles/breadcrumbs/)
- Related content
  - Hybrid approach: Algorithmic similarity (shared tags/metadata) plus editorial curation to sustain narrative coherence and lateral exploration within categories. [3](https://www.nngroup.com/articles/menu-design/)
- Search
  - Persistent input; results page with facets, clear-all control, and accessible labels; keyboard navigation and status messages; avoid hiding search inside menus. [12](https://www.nngroup.com/articles/mega-menus-work-well/)

7) Preservation and integrity commitments (“no deletion” requirement)
- Source preservation
  - No removal or alteration of any original file; all nine .txt files are preserved verbatim and remain downloadable as canonical sources to sustain trust. [1](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)
- Reader-facing provenance module
  - Display SHA-256 hash, file size, last-modified timestamp, and version history; any legally necessary redactions are documented with clear editorial notes and do not replace the canonical original, consistent with Polish Press Law constraints. [9](https://sciendo.com/pdf/10.1515/lape-2017-0002)
- Archive and backup strategy
  - Versioned storage with periodic integrity checks (hash revalidation), redundant backups, and disaster recovery procedures; public-note updates for any format migrations to maintain transparency. [1](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)

8) Accessibility and multilingual hooks (IA-level)
- Language metadata
  - Assign lang attributes sitewide; detect per-item language and tag for search; provide a clear PL/EN toggle with consistent layout and readable typography for both languages. [15](https://accessibility.psu.edu/guidelines/wcaglist/)
- Accessible expand/collapse and focus order
  - Accordions implemented as buttons with aria-expanded; multiple open panels allowed; programmatically hide collapsed content; keyboard support (Enter/Space, arrow keys, Home/End). [5](https://www.nngroup.com/articles/accordions-on-desktop/)
- Keyboard operability and targets
  - All interactive controls are keyboard operable; focus visible; touch targets ≥24×24 CSS pixels; high-contrast category icons with text labels. [15](https://accessibility.psu.edu/guidelines/wcaglist/)
- Content warnings
  - Provide a togglable content-warning pattern with respectful language for distressing material; minimal motion; pause/stop controls for any media exceeding five seconds. [4](https://www.nngroup.com/articles/homepage-design-principles/)

9) Cross-references and transition
- IA enables UX and visual components: The defined categories, canonical breadcrumbs, metadata schema, faceted lists, accessible accordions, and audio hooks provide the structural backbone for menus, cards, icons, and expanders in the next section. [3](https://www.nngroup.com/articles/menu-design/)
- Forward pointer: The upcoming UX, Navigation, and Visual Design System blueprint will detail layouts, grid systems, iconography, typography, and the accessible audio player implementation consistent with these IA and taxonomy rules. [4](https://www.nngroup.com/articles/homepage-design-principles/)