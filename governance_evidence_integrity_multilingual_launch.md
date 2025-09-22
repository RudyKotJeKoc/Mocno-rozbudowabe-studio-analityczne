## Governance, Evidence Integrity, Multilingual Strategy, and Launch Roadmap

1) Binding constraints and alignment
- Non-removal and immutability: All nine .txt source files are published in full, verbatim, with canonical download links on their item pages; originals are immutable and stored in read-only archival storage. If strictly necessary for lawful compliance, public views may include minimal, clearly annotated redactions while preserving access to the unchanged canonical download and documenting rationale in provenance notes.
- Category organization and polyhierarchy: The five categories are the primary navigation and discovery lenses—Manipulacje i Toksyczność; Instrumentalne wykorzystanie instytucji; Dokumenty i Fakty; Raporty i Analizy; Symbolika i Narracja. Each item receives a single canonical breadcrumb path, with curated cross-links to related categories to support polyhierarchical discovery without duplicating content [1](https://www.nngroup.com/topic/information-architecture/).
- Navigation and orientation: Primary categories are visible on desktop in the header, with either a click-activated mega menu or routing pages and canonical breadcrumbs to orient users who often arrive deep-linked from external sources [2](https://www.nngroup.com/articles/menu-design/). Breadcrumbs reflect a single hierarchical path and end with a non-linked current page [3](https://www.nngroup.com/articles/breadcrumbs/).
- Audio module: Every item page provides a “▶ Posłuchaj analizy” button that launches an accessible, self-hosted player. Keyboard operability, visible focus, and predictable controls comply with WCAG 2.2 AA [4](https://www.w3.org/TR/WCAG22/). The player is fully usable for keyboard and screen-reader users [5](https://dequeuniversity.com/checklists/web/audio-video). Transcripts are available via a toggle and as downloadable text.
- Tone and safety: The site uses a serious, analytical voice, minimal motion, high-contrast text, and predictable layouts to build credibility for sensitive topics [6](https://www.nngroup.com/articles/homepage-design-principles/). Icons are supportive but always paired with clear text labels to preserve accessibility and information scent [2](https://www.nngroup.com/articles/menu-design/).

Nine-file preservation and canonical categorization
- All files remain intact, presented in an immutable viewer with canonical downloads and hashes. Cross-links allow lateral exploration without duplication.

| File | Canonical Category | Cross-links |
| --- | --- | --- |
| raport dla mediów Klątwa.txt | Symbolika i Narracja | Raporty i Analizy; Manipulacje i Toksyczność |
| kronika ósmego kręgu.txt | Symbolika i Narracja | Raporty i Analizy |
| kluczowe fakty.txt | Dokumenty i Fakty | Raporty i Analizy |
| jak instytucje wspierały manipulację.txt | Instrumentalne wykorzystanie instytucji | Raporty i Analizy; Manipulacje i Toksyczność |
| 5 faktow.txt | Dokumenty i Fakty | Raporty i Analizy |
| krytyczna analiza materiału dowodowego.txt | Raporty i Analizy | Dokumenty i Fakty |
| sluzebnosc a dozywocie.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji |
| Raport dla mediów.txt | Raporty i Analizy | Dokumenty i Fakty |
| akt darowizny.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji |

2) Evidence integrity and provenance (reader trust and transparency)
- Hashes and manifests
  - Compute and display a SHA-256 hash, file size, and last-verified timestamp on every item page. Publish a signed Integrity page listing all items, canonical URLs, hashes, and timestamps per release.
- Versioning and chain of custody
  - Maintain a time-stamped version history for contextual updates without replacing originals. Each item includes a provenance note describing source, validation steps, and known limitations to support informed interpretation and trust [7](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).
- Redaction policy
  - If compelled by law or ethics, apply minimal, context-preserving redactions only to public views; annotate clearly in-page and never substitute the canonical original download. Retain originals in secure archival storage with least-privilege access controls.
- Citation and verification
  - Provide a standardized citation block and a “Verify using SHA-256” prompt with instructions. Encourage independent verification by re-computing hashes and checking timestamps.

3) Multilingual and localization plan (Polish primary, optional English)
- Language identification and semantics
  - The site defaults to lang="pl"; English routes use lang="en"; inline language changes are marked semantically to assist screen readers and indexing [8](https://accessibility.psu.edu/guidelines/wcaglist/).
- UI and navigation
  - A persistent PL/EN toggle in the header preserves context and deep links. All labels, category descriptions, system messages, and error states are localized, with identical layout and predictable behavior across languages for scannability [6](https://www.nngroup.com/articles/homepage-design-principles/).
- Search behavior and indexing
  - Implement diacritics-aware matching for Polish queries. Index titles, verbatim .txt content, abstracts, tags, and transcripts. Provide relevant, well-ordered facets with batch-apply on mobile to reduce overload [9](https://www.coveo.com/blog/faceted-search/).
- Locale formats and metadata
  - Localize dates and numbers per user language. Emit schema.org metadata with itemLanguage and inLanguage fields and declare page language via HTML attributes for accessibility and SEO [8](https://accessibility.psu.edu/guidelines/wcaglist/).

4) Analytics, consent, and privacy-respecting measurement
- Minimal, cookieless analytics
  - Use an EU-hosted, self-managed, cookieless analytics baseline (e.g., Matomo) for aggregated traffic insights. Offer opt-in cookies for enhanced metrics via a clear, accessible consent banner with purpose-specific controls [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Consent and audio
  - Core reading and the audio player work without analytics consent. If storing player preferences (e.g., playback speed), treat them as non-essential and gate them behind opt-in cookie consent per Polish e-privacy rules [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Privacy policy and rights
  - Publish a Polish-language privacy and cookies notice detailing lawful bases (including legitimate interests with necessity and balancing), minimization, retention, recipients, transfers, and data-subject rights, plus DPO contact and the UODO complaint route [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024). Where relying on legitimate interests, document the LIA before processing and inform data subjects of the interests relied upon [11](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf).
- Breach readiness
  - Define “awareness” triggers, notify the supervisory authority within 72 hours if required, and issue preliminary notifications when investigation exceeds that window, with withdrawal if not notifiable [12](https://gdpr.pl/personal-data-breaches-and-notification-viewpoints-of-data-protecting-authorities).

5) Operational governance and right-of-reply workflow
- Roles and responsibilities
  - Editor-in-Chief: final editorial decisions, ethical guardrails, Press Law alignment, approval of sensitive disclosures.
  - Data Protection Lead (DPO): LIA/DPIA stewardship, GDPR record-keeping, breach response, supervisory liaison, privacy notices.
  - Legal Review: pre-publication sign-off on high-risk items, defamation risk assessment, and necessity/proportionality of any redactions.
- Right-of-reply (sprostowanie) and corrections
  - Intake requests within statutory timelines, verify identity and concise formatting, and publish promptly with required placement and labeling (“Sprostowanie”), without alteration or same-day commentary in electronic form [13](https://sciendo.com/pdf/10.1515/lape-2017-0002).
- Press Law safeguards
  - Do not publish personal data or images of suspects, witnesses, or victims without consent or authority permission; avoid pre-judgment opinions; obtain consent for publication of private-life or audio/visual content unless it directly relates to public activity [13](https://sciendo.com/pdf/10.1515/lape-2017-0002).
- Defamation due diligence
  - Apply truthfulness checks, contextualization, and public-interest framing using non-stigmatizing language; prepare remedies and documentation to mitigate civil/criminal risk under Polish law [14](https://www.dudkowiak.com/criminal-law-in-poland/defamation-in-poland).
- Audit and logging
  - Maintain tamper-evident logs of provenance decisions, corrections, LIA/DPIA outcomes, access controls, and security events, without logging unnecessary personal data.

6) Category subpages and narrative signaling (practical setup)
- Manipulacje i Toksyczność
  - Focus: manipulation psychology, toxic relationships, narcissism; use neutral, precise terms; include content warnings for distressing material. Pair supportive icons with explicit text labels for clarity [2](https://www.nngroup.com/articles/menu-design/).
- Instrumentalne wykorzystanie instytucji
  - Focus: ways institutions supported or amplified manipulation; show clear procedural context and cross-link to evidence and reports.
- Dokumenty i Fakty
  - Focus: key facts, official documents, evidence appraisal, “5 faktów”; provide immutable viewers, hashes, and canonical downloads.
- Raporty i Analizy
  - Focus: media-facing reports and critical analyses (including “kronika” when synthetic), with abstracts and links back to underlying evidence.
- Symbolika i Narracja
  - Focus: “Klątwa,” chronicles, and broader psychological framing; avoid sensationalism, add content warnings, and link to primary documents for grounding. Maintain minimal motion and predictable layouts for sensitive content [6](https://www.nngroup.com/articles/homepage-design-principles/).

7) Audio module consolidation (per-article playback and playlist)
- Per-item player
  - Place “▶ Posłuchaj analizy” above the body. Provide play/pause, seek, volume/mute, playback rate, and time display; no autoplay. Ensure keyboard operability and visible focus, and meet non-text contrast requirements [4](https://www.w3.org/TR/WCAG22/).
- Transcripts
  - Provide a toggleable, on-page transcript and a downloadable text file. Label if auto-generated and note human review status. Make transcripts searchable to aid discovery and accessibility [4](https://www.w3.org/TR/WCAG22/).
- Playlist
  - Auto-scan /audio/ to map tracks by filename or item ID and expose a tracker-free playlist view. The playlist uses the same accessible player and does not set third-party cookies [5](https://dequeuniversity.com/checklists/web/audio-video).

8) Pre-launch QA and go-live checklist
- Accessibility (WCAG 2.2 AA)
  - All controls keyboard-operable; skip links and landmarks present; visible focus; target sizes ≥24×24 CSS px; non-text contrast compliant; accordions use button semantics with aria-expanded; language attributes set correctly [8](https://accessibility.psu.edu/guidelines/wcaglist/). If accordions are used, ensure descriptive headings, multiple-open capability, and accessible state change announcements [15](https://www.nngroup.com/articles/accordions-on-desktop/).
- Navigation and orientation
  - Visible primary navigation on desktop, no hover-only menus, click-activated submenus or routing pages, canonical breadcrumbs starting with Home and ending with current page as non-link [2](https://www.nngroup.com/articles/menu-design/). Breadcrumbs reflect hierarchy, not history [3](https://www.nngroup.com/articles/breadcrumbs/).
- Search and filtering
  - Persistent search box; relevant facets with batch apply on mobile; clear undo/reset; show only available facet values; diacritics-aware indexing [9](https://www.coveo.com/blog/faceted-search/).
- Performance and stability
  - Server-rendered pages with critical CSS; EU CDN; Brotli/Gzip; cache and preconnect; reserve layout space; defer non-critical scripts; lazy load transcripts and related modules.
- Security hardening
  - HTTPS with HSTS; strong CSP limiting scripts and media to self-hosted origins; X-Content-Type-Options, Referrer-Policy, frame-ancestors; sanitize inputs; rate-limit search; enforce MFA and least-privilege roles in CMS.
- Evidence integrity
  - Compute and publish SHA-256 for all nine .txt files; show last-verified timestamps; release a signed Integrity manifest.
- Legal and ethics
  - Publish Polish-language Privacy/Cookies, Corrections/Right-of-Reply, Editorial Standards, and Methodology/Provenance pages; complete LIA and any DPIA; validate consent requirements for any private-life data or audio [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Schema.org and SEO
  - Emit CreativeWork/NewsArticle per item, BreadcrumbList for canonical trails, localized sitemaps; robots excludes sensitive endpoints.
- Multilingual
  - Verify PL/EN toggle preserves current context; check localized dates/numbers; confirm language attributes and screen reader announcements; test search with and without diacritics [8](https://accessibility.psu.edu/guidelines/wcaglist/).

9) Launch roadmap (phased execution)
- Phase A: Content ingestion and integrity
  - Import all nine files; assign canonical categories and breadcrumbs; compute hashes; draft provenance notes; configure related links.
- Phase B: UX and audio integration
  - Build category landing pages and item views with immutable viewers; add “▶ Posłuchaj analizy” and transcripts; configure /audio/ playlist mapping.
- Phase C: Compliance and trust scaffolding
  - Publish Privacy, Cookies, Editorial Standards, Corrections, and Methodology/Provenance pages; complete LIA/DPIA; appoint and disclose DPO contact [10](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- Phase D: Performance, security, and analytics
  - Apply security headers and CSP; configure EU CDN; deploy cookieless analytics; implement consent banner for optional cookies; run WCAG/performance audits [8](https://accessibility.psu.edu/guidelines/wcaglist/).
- Phase E: Multilingual and final QA
  - Implement PL/EN localization; validate search and facets; finish schema.org; conduct user testing with Polish-speaking audiences; remediate and sign off.

10) Acceptance criteria (go/no-go)
- Preservation: All nine .txt files are published verbatim with canonical downloads, visible SHA-256 hashes, and last-verified timestamps on item pages and the Integrity page.
- Navigation: Visible desktop categories; accessible mobile drawer; canonical breadcrumbs; persistent header search; relevant facets with clear reset.
- Audio: “▶ Posłuchaj analizy” on every item; accessible player; transcript toggle and download; /audio/ playlist without third-party trackers [5](https://dequeuniversity.com/checklists/web/audio-video).
- Accessibility and ethics: WCAG 2.2 AA conformance verified; content warnings present; serious, analytical tone; icons always paired with text labels [6](https://www.nngroup.com/articles/homepage-design-principles/).
- Legal/privacy: Polish-language governance pages live; right-of-reply workflow operational per Press Law; LIA/DPIA documented; minimal, opt-in analytics and cookie consent in place [13](https://sciendo.com/pdf/10.1515/lape-2017-0002).
- Performance/security: Core Web Vitals within targets; CSP and security headers active; rate-limited search; EU hosting/CDN; audit logs enabled without unnecessary PII.
- Multilingual: Polish primary with optional English; language semantics correct; diacritics-aware search; localized formats and schema.

Outcome
This blueprint operationalizes governance, evidence integrity, multilingual UX, and EU/Polish compliance while honoring the no-deletion constraint. It organizes the nine source files across five categories with canonical breadcrumbs and curated cross-links, delivers accessible per-article audio with transcripts, and specifies trust, consent, and security practices for a responsible public launch of a modern investigative portal [2](https://www.nngroup.com/articles/menu-design/).