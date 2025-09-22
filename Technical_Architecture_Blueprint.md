## Technical Architecture, Security, Performance, and Implementation Blueprint

1) Architecture recommendation (trade-offs and final choice)
- WordPress newsroom stack (pros/cons): WordPress offers familiar editorial workflows, rich plugin ecosystems for media, and quick setup; however, it introduces performance variability, plugin security risks, and limited guarantees for immutable verbatim rendering of sensitive .txt evidence without custom development and strict governance. Discoverability can be well supported via established navigation patterns, but ensuring privacy-first operation (no third-party trackers, EU-only hosting/CDNs, strict CSP) is harder in a plugin-heavy stack.
- Pure static generator (e.g., Hugo/Jekyll): Delivers excellent performance and simplicity; however, editorial workflows are developer-centric, versioning and provenance require bespoke tooling, and multilingual navigation with faceted search and accessible audio often demands significant custom code and maintenance.
- Jamstack + headless CMS (recommended): Pair a headless CMS (e.g., Strapi or Sanity) with a static or hybrid framework (e.g., Next.js with static export/incremental static regeneration). This approach provides:
  - Immutable, verbatim rendering of .txt evidence with canonical downloads and provenance panels.
  - Predictable, visible category navigation, canonical breadcrumbs, and routing pages, aligning with investigative portal UX and trust-building needs. Visible global navigation on desktop and clear category labels preserve reader orientation and reduce interaction costs [1](https://www.nngroup.com/articles/menu-design/). Breadcrumbs should follow a canonical hierarchical path with the current page as non-link and start with Home [2](https://www.nngroup.com/articles/breadcrumbs/). Mega menus can reveal options at a glance and should be click-activated with routing-page fallback for accessibility [3](https://www.nngroup.com/articles/mega-menus-work-well/).
  - Privacy-first delivery with EU-based hosting/CDN, strict CSP, and self-hosted analytics, supporting GDPR and Polish-law constraints [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
  - Strong provenance features (hashes, timestamps, version history) and bilingual PL-first UI with optional EN, presented in a serious, analytical design with minimal motion [5](https://www.nngroup.com/articles/homepage-design-principles/).
  - Faceted search and in-page table of contents patterns to support discovery and scannability at scale [6](https://www.coveo.com/blog/faceted-search/).
Final choice: Jamstack + headless CMS with static export for category and item pages, serverless functions where needed (search indexing, audit), and EU-based hosting/CDN. This architecture balances performance, control, evidence integrity, and accessibility while meeting legal/privacy constraints and trust requirements for investigative publishing [8](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).

2) Core content model and categories
- Categories (Polish labels):
  - Manipulacje i Toksyczność
  - Instrumentalne wykorzystanie instytucji
  - Dokumenty i Fakty
  - Raporty i Analizy
  - Symbolika i Narracja
- Item schema fields (polyhierarchy via related_categories; canonical breadcrumb path via canonical_category). Use controlled vocabularies and taxonomy rules to ensure consistent retrieval and strong information scent [9](https://www.nngroup.com/topic/information-architecture/). Breadcrumbs show a single canonical path per item [2](https://www.nngroup.com/articles/breadcrumbs/).

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | yes | Display title; front-load key terms; use the verbatim filename for clarity. |
| canonical_category | enum | yes | One of the five categories for breadcrumb path and canonical placement. |
| related_categories | array | no | Additional categories to support polyhierarchy and cross-linking [9](https://www.nngroup.com/topic/information-architecture/). |
| document_type | enum | yes | Normalized types (report, analysis, official document, media statement) to power facets [9](https://www.nngroup.com/topic/information-architecture/). |
| author/source | string | no | Author or source organization for transparency. |
| date | ISO 8601 | yes | Publication date for sorting and schema.org metadata [9](https://www.nngroup.com/topic/information-architecture/). |
| summary | string | yes | Concise abstract to feed list/cards and TOC anchors [9](https://www.nngroup.com/topic/information-architecture/). |
| tags | array | yes | Controlled vocabulary (topics, institutions, actors, locations) [9](https://www.nngroup.com/topic/information-architecture/). |
| provenance_note | string | yes | Brief origin/sourcing/verification notes to reinforce trust [9](https://www.nngroup.com/topic/information-architecture/). |
| hash_sha256 | string | yes | Hash of original .txt for evidence integrity. |
| original_filename | string | yes | Original filename displayed and preserved. |
| canonical_url | URL | yes | Stable item URL; included in schema.org and sitemaps. |
| audio_asset | path | no | /audio/ mapping to the item’s track (if available). |
| transcript_url | URL | no | Downloadable transcript of the audio (if audio-only). |
| sensitivity_flags | array | no | Flags for content warnings, privacy/redaction notes (if needed). |

3) Document rendering and preservation
- Immutable .txt viewer: Render the .txt payload verbatim, preserving whitespace and line breaks, with no editorial changes. Provide a prominent “Download original” link to the canonical file to guarantee unaltered access.
- Provenance panel: Display SHA-256 hash, file size, last-modified timestamp, and version history (diff summaries with timestamps). Any lawful redactions (if required by Press Law) appear as transparent editorial notes; originals remain preserved and downloadable, avoiding substitution [10](https://sciendo.com/pdf/10.1515/lape-2017-0002).
- Category mapping and publication of all nine files (canonical category, with cross-links):
  
| Filename | Canonical Category | Cross-links |
| --- | --- | --- |
| raport dla mediów Klątwa.txt | Raporty i Analizy | Symbolika i Narracja; Manipulacje i Toksyczność |
| kronika ósmego kręgu.txt | Symbolika i Narracja | Raporty i Analizy; Manipulacje i Toksyczność |
| kluczowe fakty.txt | Dokumenty i Fakty | Raporty i Analizy; Instrumentalne wykorzystanie instytucji |
| jak instytucje wspierały manipulację.txt | Instrumentalne wykorzystanie instytucji | Manipulacje i Toksyczność; Raporty i Analizy |
| 5 faktow.txt | Dokumenty i Fakty | Raporty i Analizy |
| krytyczna analiza materiału dowodowego.txt | Dokumenty i Fakty | Raporty i Analizy |
| sluzebnosc a dozywocie.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy |
| Raport dla mediów.txt | Raporty i Analizy | Dokumenty i Fakty; Instrumentalne wykorzystanie instytucji |
| akt darowizny.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy |

4) Audio module: per-article “▶ Posłuchaj analizy”
- Player: Integrate a self-hosted, accessible HTML5 player (e.g., Plyr or MediaElement.js) with play/pause, seek, volume/mute, playback rate, and time display; ensure keyboard operability, visible focus, proper ARIA names/roles, and no autoplay to comply with WCAG 2.2 Level AA requirements for media [11](https://www.w3.org/TR/WCAG22/). The player must be usable via keyboard and screen readers, support transcripts, and maintain non-text contrast for controls [12](https://dequeuniversity.com/checklists/web/audio-video). Target sizes of controls should be ≥24×24 CSS pixels, and status messages should be announced to assistive tech [13](https://www.digitala11y.com/wcag-checklist/).
- UI placement: A “▶ Posłuchaj analizy” button appears above the text viewer on each item page. Clicking reveals the player and transcript toggle. Transcripts are downloadable and indexable in search to support perceivable access and discovery [11](https://www.w3.org/TR/WCAG22/).
- Playlist and mapping: Auto-generate a playlist from /audio/ by filename or item ID mapping; display per-item play controls (no global autoplay).
- Privacy: No third-party trackers; audio functions without analytics consent. If cookies store player preferences, they are non-essential and gated behind opt-in consent in line with Polish Telecommunication Law/ECA cookie requirements [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).

5) Search and discovery
- Full-text search: Build a compile-time client-side index (e.g., Lunr or FlexSearch) over .txt content, transcripts, and normalized metadata (title, tags, category, document_type). For larger scale, provide a server-side index behind rate limits.
- Facets: Category, document_type, tags, and date facets; values normalized via controlled vocabularies; batch apply on mobile, “Clear all,” and accessible labels/status messages. Design facets by popularity, coverage, and utility, and show only available values [6](https://www.coveo.com/blog/faceted-search/). Use interdependent facets to show context-relevant options and standardize metadata to avoid duplicates; batch apply on mobile to reduce reloads [14](https://www.fact-finder.com/blog/faceted-search/). Provide breadcrumb-like reset and truncation with “See more” or search-within-facet for long lists [15](https://www.algolia.com/blog/ux/faceted-search-an-overview).
- Polish-language search: Normalize diacritics, apply stemming where feasible, and index transcripts to improve retrieval. Keep the search box visible in the header to reduce interaction cost and improve consistency [1](https://www.nngroup.com/articles/menu-design/).
- In-page TOC: For long articles and reports, include a nonsticky “On This Page” table of contents to enhance scannability and direct access to sections [7](https://www.nngroup.com/articles/table-of-contents/).

6) Schema.org and SEO
- Per-item structured data: Use schema.org CreativeWork or NewsArticle with headline (title), datePublished (date), author (author/source), about (summary), keywords (tags), inLanguage (pl or en), and url (canonical_url).
- BreadcrumbList: Emit structured breadcrumbs for the canonical trail (Home › Category › Item) [2](https://www.nngroup.com/articles/breadcrumbs/).
- Sitemaps: Generate localized sitemaps for PL and EN routes. Use canonical URLs and robots directives to avoid indexing sensitive endpoints (e.g., back office, manifests).

7) Performance and Core Web Vitals
- LCP: Server-render pages (static export/ISR), inline critical CSS, and avoid heavy hero imagery; use EU-based CDN with HTTP/2 or HTTP/3, long cache lifetimes, and immutable asset hashing (cache-busting via file fingerprints) [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- CLS: Reserve fixed space for the player and accordions; load fonts with stable metrics; avoid late-inserting UI. Use predictable, supportive iconography with text labels to preserve clarity in investigative contexts [5](https://www.nngroup.com/articles/homepage-design-principles/).
- INP: Limit blocking JS, defer non-critical scripts, and lazy load related lists and transcript panels until user intent is expressed.
- Build pipeline: Use incremental static regeneration for timely updates; prefetch related content on hover/focus where appropriate; compress assets (Gzip/Brotli) and serve modern image formats for any illustrative iconography. Keep motion minimal and provide pause/stop for any moving content to reduce cognitive load on sensitive pages [5](https://www.nngroup.com/articles/homepage-design-principles/).

8) Security and hardening (OWASP-aligned)
- HTTP security headers:
  - Content-Security-Policy (CSP): Restrict scripts and media sources; disallow unsafe-inline; explicitly allow self-hosted audio paths.
  - Strict-Transport-Security (HSTS): Enforce HTTPS.
  - X-Content-Type-Options: nosniff.
  - X-Frame-Options/Frame-Ancestors: deny or restrict embedding.
  - Referrer-Policy: strict-origin-when-cross-origin.
  - Permissions-Policy: limit sensors, autoplay, and camera/microphone as appropriate.
- Input handling and abuse prevention: Sanitize queries; implement rate limiting on search endpoints; robust error handling and logs without PII leakage. Prefer native HTML semantics and use ARIA only when necessary, avoiding roles that hide descendant semantics [16](https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/).
- Editorial back office: Enforce MFA, least-privilege roles, and audit trails; logically separate the CMS from the public delivery layer. Appoint and publish DPO contact, maintain records of processing, and conduct DPIA where required under Polish law [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Media/document handling: Validate uploads, verify MIME types, store originals in write-once, versioned storage, and run periodic integrity checks. Breach readiness includes defining “awareness” triggers and preliminary notifications where investigations exceed 72 hours [17](https://gdpr.pl/personal-data-breaches-and-notification-viewpoints-of-data-protecting-authorities).

Example CSP (adjust sources to deployment):

Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self'; frame-ancestors 'none';


9) Evidence integrity and provenance (technical features)
- Hashes and manifests: Compute SHA-256 per original .txt and store a signed manifest per release; display hash and last-verified date on item pages to reinforce transparency and reader trust [8](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).
- Trusted timestamps: Apply TSA-backed timestamps at publication; maintain version history with diff summaries and clear editorial notes for contextualization.
- Public integrity page: Publish a consolidated list of all files with hashes, timestamps, and verification cadence for independent checking.

10) Multilingual and accessibility implementation
- Language toggle: PL as primary with optional EN; preserves route structure; set lang attribute at document root and mark inline language changes to support assistive technologies [18](https://accessibility.psu.edu/guidelines/wcaglist/).
- Navigation and components: Visible global navigation on desktop with click-activated mega menu or routing pages; avoid multilevel cascading menus; provide local navigation and breadcrumbs to orient users who often arrive on internal pages [1](https://www.nngroup.com/articles/menu-design/).
- Accordions and TOC: Use button semantics for accordion headers, proper aria-expanded state, caret/plus icons, expand/collapse all controls, and programmatic hiding of collapsed content; maintain consistent styling across pages [19](https://www.nngroup.com/articles/accordions-on-desktop/).
- Player and controls: Keyboard-operable media player with visible focus, target sizes ≥24×24 CSS pixels, and status announcements; provide transcripts/captions and avoid autoplay beyond three seconds without immediate controls [11](https://www.w3.org/TR/WCAG22/).
- Skip links and landmarks: Provide skip-to-content, header/main/nav/footer landmarks, and maintain high contrast and predictable behavior for sensitive content [18](https://accessibility.psu.edu/guidelines/wcaglist/).
- Hamburger icon on mobile: Standard three-line icon labeled “Menu,” adequate contrast/size/padding, and redundant navigation paths to accommodate diverse users [20](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/).

11) Analytics and consent (privacy-respecting)
- Analytics: Prefer self-hosted Matomo in cookieless mode by default; offer explicit opt-in for cookies and enhanced analytics in a minimal, accessible CMP. Provide prior clear information and purpose-specific controls for non-essential analytics in alignment with Polish Telecommunication Law/ECA cookie requirements; avoid relying solely on browser defaults [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Vendor/transfer controls: Prefer EU hosting/CDNs; if non-EU vendors are used, conduct TIAs and implement SCCs; update privacy and cookies pages with transfer disclosures and safeguards [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Audio independence: Audio playback works without analytics consent; only player preferences (if stored) are gated behind opt-in consent and clearly documented.

12) Implementation roadmap (phased)
- Phase 1 (Foundation)
  - Set up repo, headless CMS, and EU-hosted Jamstack deployment.
  - Implement data model and controlled vocabularies for categories, document types, and tags.
  - Build category landing pages, item templates with immutable .txt viewer, canonical “Download original,” breadcrumbs, and metadata.
  - Publish all nine files with canonical mapping and cross-links.
- Phase 2 (Media and Search)
  - Integrate accessible audio player and per-item “▶ Posłuchaj analizy” button.
  - Implement transcripts (toggleable and downloadable).
  - Build full-text search with facets, mobile batch apply, “Clear all,” and status messages.
  - Add related-content modules powered by tags and category proximity.
- Phase 3 (Trust and Compliance)
  - Add provenance panel (SHA-256 hashes, timestamps, version history); publish integrity page.
  - Implement Privacy/Cookies, Corrections/Right of Reply, and Editorial Standards pages aligned with Polish Press Law workflows [10](https://sciendo.com/pdf/10.1515/lape-2017-0002).
  - Emit schema.org metadata and breadcrumb structured data [2](https://www.nngroup.com/articles/breadcrumbs/).
- Phase 4 (Performance and Security)
  - Configure EU CDN, caching, immutable asset hashing, HTTP/2/3; optimize for LCP/CLS/INP.
  - Apply security headers, CSP, input sanitization, search rate limiting, audit logging; finalize DPIA/LIA documentation and DPO publication [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Phase 5 (Polish/English UX)
  - Implement language toggle; localize UI; verify diacritics-aware search and indexing.
  - Conduct WCAG 2.2 AA accessibility QA; remediate focus, labels, ARIA, and contrast issues [18](https://accessibility.psu.edu/guidelines/wcaglist/).

13) Acceptance criteria
- All nine .txt files are published verbatim with canonical downloads and provenance panels (hash, size, timestamp, version history).
- Five category landing pages present structured lists/cards with strong labels, accessible expanders, and consistent metadata; visible global navigation with canonical breadcrumbs.
- Item pages include a “▶ Posłuchaj analizy” button, accessible audio player, and transcript toggle; audio functions without analytics consent.
- Persistent header search delivers diacritics-aware Polish matching; results offer facets with batch apply on mobile and “Clear all.”
- WCAG 2.2 AA conformance for navigation, accordions, player, focus visibility, target sizes, and color contrast; language identification and skip links implemented [18](https://accessibility.psu.edu/guidelines/wcaglist/).
- Security headers and CSP implemented; search rate-limited; audit logging without PII leakage; EU-based hosting/CDN and documented transfer safeguards [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Schema.org metadata (CreativeWork/NewsArticle and BreadcrumbList) present; canonical URLs and localized sitemaps; robots directives exclude sensitive endpoints [2](https://www.nngroup.com/articles/breadcrumbs/).
- Privacy/Cookies and Corrections/Right of Reply pages are available in Polish with compliant workflows and timelines [10](https://sciendo.com/pdf/10.1515/lape-2017-0002).

Navigation and design system notes
- Use a serious, analytical tone with predictable layouts, high-contrast link text, and minimal motion to build credibility and reduce distraction; pair supportive icons with clear text labels across categories [5](https://www.nngroup.com/articles/homepage-design-principles/). Mega menu entries should be clickable with routing pages to ensure accessibility and avoid hover-only behavior [3](https://www.nngroup.com/articles/mega-menus-work-well/). Accordions must use button semantics, proper ARIA states, and clear expand/collapse signifiers [19](https://www.nngroup.com/articles/accordions-on-desktop/). Breadcrumbs reflect the canonical hierarchy and include the current page as non-link [2](https://www.nngroup.com/articles/breadcrumbs/).

Security/compliance and governance alignment
- GDPR lawful basis and governance: Document Legitimate Interests Assessments (LIA) with necessity and balancing tests; provide Polish-language privacy notices; maintain records of processing; appoint and publish DPO contact; and implement breach readiness aligned to 72-hour notification guidance [21](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf). Respect Polish Press Law constraints on publication of personal data/images and correction workflows [10](https://sciendo.com/pdf/10.1515/lape-2017-0002). Prefer EU hosting/CDNs and assess transfers with TIAs/SCCs as needed [4](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).

Transition to SW6
The final section (SW6) will consolidate evidence-integrity communication, analytics/consent disclosures, and operational governance into a concluding implementation and governance plan, preparing the article for assembly and launch [8](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).