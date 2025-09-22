# Research Framework

- Content audit and taxonomy mapping
  - What to acquire: A complete inventory of all provided files, mapping each to the five site categories (Manipulations and Toxicity; Instrumental Use of Institutions; Documents and Facts; Reports and Analyses; Symbolism and Narrative) with clear metadata (title, summary, date, author, tags).
  - Source-based topics: Information architecture best practices for investigative/content portals (taxonomy design, card sorting, faceted navigation).

- Editorial standards and ethical safeguards
  - What to acquire: Guidelines for trauma-informed reporting, non-stigmatizing language around manipulation, toxic relationships, and narcissism; appropriate content warnings and disclosures.
  - Source-based topics: Journalism ethics frameworks (SPJ Code of Ethics, Dart Center for Journalism & Trauma), newsroom style guides for sensitive topics.

- Legal and privacy compliance (EU/Poland context)
  - What to acquire: Rules on publishing sensitive documents, defamation/libel considerations, GDPR obligations (lawful basis, redaction, data minimization, subject rights), right of reply, and consent for audio content.
  - Source-based topics: EDPB guidance, Polish data protection authority (UODO) resources, Polish Press Law, case law on online publication of evidence.

- UX and navigation patterns for investigative portals
  - What to acquire: Proven layouts for category landing pages, article lists with expand/collapse, sticky/mega menus, in-article navigation, search and filtering, and cross-linking between related items.
  - Source-based topics: Nielsen Norman Group research, Reuters Institute case studies, ICIJ design patterns for document-heavy stories.

- Visual design, iconography, and narrative signaling
  - What to acquire: Icon sets and visual systems that convey themes (manipulation, institutions, evidence, reports, symbolism) without sensationalism; color/typography choices that support a serious, analytical tone.
  - Source-based topics: Accessible design guidelines for icon semantics, visual hierarchy for news portals, content warning best practices.

- Audio module implementation and accessibility
  - What to acquire: Player features (playlist from /audio/, per-article “▶ Listen” controls), transcript generation and display, streaming formats (HLS/DASH), privacy considerations, and performance.
  - Source-based topics: WCAG 2.2 audio/video requirements, open-source players (Plyr, MediaElement.js), transcript tooling, best practices for media delivery.

- Technical architecture, security, and performance
  - What to acquire: Evaluation of CMS vs Jamstack/static site with headless CMS; document rendering for .txt files; sitewide search; schema.org markup; Core Web Vitals optimization; CDN strategy; secure hosting and hardening.
  - Source-based topics: Headless CMS comparisons, OWASP guidance for content sites, SEO for news/knowledge portals, schema.org NewsArticle/CreativeWork usage.

- Evidence integrity and provenance
  - What to acquire: Methods for preserving and demonstrating document authenticity (hashes, timestamps, versioning), citation standards, and transparent editorial notes to avoid altering or removing content.
  - Source-based topics: NIST digital evidence handling guidelines, newsroom toolkits for source verification, provenance and chain-of-custody practices.

- Multilingual and localization considerations
  - What to acquire: Strategy for content in Polish with potentially English UI or bilingual toggles; date/number formatting; search behavior across languages.
  - Source-based topics: Web i18n best practices (CLDR), bilingual site navigation patterns, accessibility implications of multilingual content.

- Analytics, consent, and privacy-respecting measurement
  - What to acquire: Privacy-friendly analytics setup, cookie consent management for media playback, opt-in data collection aligned with GDPR.
  - Source-based topics: Comparisons of Matomo vs GA4 with EU compliance, CMP frameworks, EDPB guidance on consent and telemetry.


# Search Plan

1. Investigate UX and information architecture best practices for investigative journalism portals and document-heavy sites (NN/g research, Reuters Institute reports, ICIJ case studies).

2. Research EU and Polish legal frameworks for publishing sensitive documents and analyses online, including GDPR obligations, defamation risks, Polish Press Law, and right-of-reply guidance (EDPB, UODO, official legal sources).

3. Examine WCAG 2.2 accessibility requirements for audio content and practical implementation using open-source players (Plyr/MediaElement.js), transcripts, captions, and streaming formats (HLS/DASH).

4. Compare technical architectures (WordPress/Headless CMS vs Jamstack/static) for secure, performant portals with full-text search, schema.org markup, document rendering, and audio integration; include OWASP and Core Web Vitals guidance.

5. Identify authoritative practices for evidence integrity online: hashing and provenance, timestamping/versioning, chain-of-custody documentation, and citation standards (NIST publications, investigative newsroom toolkits).

6. Source ethical and psychological guidance on presenting manipulation, toxic relationships, and narcissism responsibly, including trauma-informed reporting approaches (APA, WHO, Dart Center, reputable clinical references).