## Introduction and Objectives

Mission and scope
This project will design and deliver a professional, modern investigative portal that organizes and presents nine Polish source files, preserving every file and its full content without removal or alteration while adding metadata, navigation, and contextual layers that improve comprehension and ethical communication. The site will present clear categories, predictable navigation, accessible audio for each article, and strong provenance to earn reader trust on sensitive topics of manipulation, toxicity, and institutional dynamics [1](https://www.nngroup.com/articles/homepage-design-principles/). The homepage and category structure will foreground purpose and priority user actions with visible, high-contrast navigation to minimize interaction costs and maintain credibility for investigative reading [2](https://www.nngroup.com/articles/menu-design/).

Taxonomy and thematic categories
To strengthen information scent and support readers’ mental models, we will organize the corpus using a controlled taxonomy and allow polyhierarchy (a document can appear in multiple thematic contexts while maintaining one canonical path). This ensures consistent retrieval and narrative coherence across the portal [3](https://www.nngroup.com/topic/information-architecture/). The five categories are:
- Manipulacje i Toksyczność: psychology of manipulation, toxic relationships, narcissism; this lens surfaces patterns of coercion and harm in an analytical, trauma-informed tone [1](https://www.nngroup.com/articles/homepage-design-principles/).
- Instrumentalne wykorzystanie instytucji: materials showing how institutions supported or amplified manipulation; this category contextualizes systemic dynamics alongside individual actors [3](https://www.nngroup.com/topic/information-architecture/).
- Dokumenty i Fakty: key facts, official documents, evidence appraisals, and factual briefs; this category anchors claims in verifiable artifacts and normalized metadata [3](https://www.nngroup.com/topic/information-architecture/).
- Raporty i Analizy: media-facing reports and critical analyses; this category consolidates interpretive work and cross-links to primary evidence [3](https://www.nngroup.com/topic/information-architecture/).
- Symbolika i Narracja: “Klątwa,” chronicles, and context-building materials that articulate the broader psychological and cultural framing [3](https://www.nngroup.com/topic/information-architecture/).

This taxonomy clarifies scope and provenance while avoiding sensationalism, which is essential for reader trust and ethical investigative communication [4](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).

Corpus to be integrated (verbatim file list and category positioning)
All nine files will be preserved in full and incorporated into the portal. Each item will have a primary placement for its canonical breadcrumb path and curated cross-links into related categories for lateral exploration, sustaining narrative coherence without duplicating content [5](https://www.nngroup.com/articles/breadcrumbs/).

| Title (verbatim file name) | Primary category | Related-category links | Document type (normalized) |
| --- | --- | --- | --- |
| raport dla mediów Klątwa.txt | Raporty i Analizy | Symbolika i Narracja; Manipulacje i Toksyczność | media report |
| kronika ósmego kręgu.txt | Symbolika i Narracja | Raporty i Analizy; Manipulacje i Toksyczność | chronicle/longform |
| kluczowe fakty.txt | Dokumenty i Fakty | Raporty i Analizy; Instrumentalne wykorzystanie instytucji | fact brief |
| jak instytucje wspierały manipulację.txt | Instrumentalne wykorzystanie instytucji | Manipulacje i Toksyczność; Raporty i Analizy | institutional analysis |
| 5 faktow.txt | Dokumenty i Fakty | Raporty i Analizy | fact brief |
| krytyczna analiza materiału dowodowego.txt | Dokumenty i Fakty | Raporty i Analizy | evidence analysis |
| sluzebnosc a dozywocie.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy | legal analysis |
| Raport dla mediów.txt | Raporty i Analizy | Dokumenty i Fakty; Instrumentalne wykorzystanie instytucji | media report |
| akt darowizny.txt | Dokumenty i Fakty | Instrumentalne wykorzystanie instytucji; Raporty i Analizy | official document |

Principles for cross-linking and provenance
- Each item will display standardized metadata (category, document type, summary, source/author, publication date, tags, provenance notes, related items) to improve scannability, filtering, and trust [3](https://www.nngroup.com/topic/information-architecture/).
- Polyhierarchy will allow documents to appear in multiple thematic groupings, while a single canonical breadcrumb prevents confusion and preserves a coherent sense of place [3](https://www.nngroup.com/topic/information-architecture/).
- Provenance notes and transparent sourcing reinforce trust, given audiences’ reliance on structured, credible brands to assess information quality [4](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).

Nonfunctional requirements
Accessibility
- The portal will conform to WCAG 2.2 Level AA across navigation, content, and media, including perceivability, operability (keyboard), understandability, robust semantics, adequate contrast, and target sizes [6](https://accessibility.psu.edu/guidelines/wcaglist/).
- An in-article table of contents (nonsticky by default) will improve scannability and direct access to sections for long-form pieces [7](https://www.nngroup.com/articles/table-of-contents/).
- Accordions, where used, will have button semantics, aria-expanded states, clear expand/collapse signifiers, and multiple-open capability [8](https://www.nngroup.com/articles/accordions-on-desktop/).

Audio module
- Each article will feature a “▶ Posłuchaj analizy” button that plays a corresponding analysis from /audio/ with accessible controls (play/pause, seek, volume, mute, rate) and keyboard operation, without autoplay [9](https://dequeuniversity.com/checklists/web/audio-video).
- Prerecorded audio-only content will include downloadable transcripts to ensure equivalent access and to support search and SEO [10](https://www.w3.org/TR/WCAG22/).

Privacy and legal compliance (EU/Poland)
- We will document and apply a legitimate interests assessment (LIA), meeting the three cumulative conditions of lawful interest, necessity, and balancing, and inform data subjects of the legitimate interests relied upon [11](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf).
- Under Polish law, we will implement Press Law safeguards: avoid publishing personal data and images of persons in proceedings without consent or authority permission; avoid pre-judgment opinions; publish corrections (sprostowanie) per statutory format and deadlines [12](https://sciendo.com/pdf/10.1515/lape-2017-0002).
- Governance measures will include Polish-language notices, DPO appointment/notification (if applicable), DPIA where required, breach readiness, cookies consent for non-essential storage, and careful evaluation of cross-border transfers and vendors [13](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).
- We will respect data-subject rights and explain exceptions applicable to certain public tasks, including complaint routes to UODO [14](https://uodo.gov.pl/en/694).
- Editorial risk controls will address defamation and permissible criticism, with documentation of verification steps and public-interest rationale [15](https://www.dudkowiak.com/criminal-law-in-poland/defamation-in-poland).

Evidence integrity and provenance
- The portal will store canonical originals and surface structured provenance metadata; future work will detail evidence-integrity measures (e.g., hashing, timestamping) not covered in the current source materials [13](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).

Performance and security
- The portal will prioritize predictable layouts, efficient rendering, and secure handling of documents and audio, favoring EU-based infrastructure and least-privilege access to reduce risk; non-essential analytics will be opt-in and documented in the cookies/privacy policies [13](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024).

Information architecture and UX patterns (preview)
- Global navigation: visible top-level categories in the header on desktop for immediate orientation; avoid hiding them behind a hamburger on large screens [2](https://www.nngroup.com/articles/menu-design/).
- Mega menu or routing pages: for rich category overviews, provide a click-activated mega menu with an accessible landing-page fallback to ensure full keyboard and screen-reader access [16](https://www.nngroup.com/articles/mega-menus-work-well/).
- Breadcrumbs: canonical, hierarchical trails beginning with Home; the current page appears as non-link and trails are shortened appropriately on mobile [5](https://www.nngroup.com/articles/breadcrumbs/).
- Category landing pages: descriptive summaries, subcategory links where relevant, and structured lists/cards with consistent metadata (title, date, type, tags) [3](https://www.nngroup.com/topic/information-architecture/).
- Lists/cards: front-loaded titles and concise summaries to optimize scannability, supplemented by tags and related links [3](https://www.nngroup.com/topic/information-architecture/).
- Expand/collapse: accordions used selectively with descriptive headings, caret/plus icons, and accessible behavior for content-heavy pages [8](https://www.nngroup.com/articles/accordions-on-desktop/).
- Search and filtering: a persistent search box; faceted filtering to refine results and prevent overload; facets ordered by relevance and utility [17](https://www.coveo.com/blog/faceted-search/). Mobile facets will support interdependent options and batch apply to limit reloads [18](https://www.fact-finder.com/blog/faceted-search/). Users will have “clear all” and within-facet “see more” patterns for long lists [19](https://www.algolia.com/blog/ux/faceted-search-an-overview).
- Table of contents: nonsticky “On This Page” modules within long articles, plus back-to-top links, to improve discoverability of lower-page content [7](https://www.nngroup.com/articles/table-of-contents/).
- Iconography and tone: supportive icons paired with clear text labels; conventional caret/plus indicators for collapsible elements; minimal motion to reduce cognitive load on sensitive investigative content [2](https://www.nngroup.com/articles/menu-design/).
- Bilingual accessibility: the interface will identify language and any changes via proper semantics and provide a clear language toggle to support assistive technologies and indexing [6](https://accessibility.psu.edu/guidelines/wcaglist/).

Trauma-informed editorial stance
The portal will maintain a serious, analytical voice, minimize motion and surprise interactions, and use clear contextual warnings where necessary, helping readers engage with sensitive material without undue distress [1](https://www.nngroup.com/articles/homepage-design-principles/). Press Law-aligned presentation and correction workflows, alongside structured provenance and transparent sourcing, further reduce harm and promote accountability [12](https://sciendo.com/pdf/10.1515/lape-2017-0002).

Objectives and intended outcomes
- Deliver a cohesive knowledge system that preserves and elevates all nine documents through clear taxonomy, polyhierarchical cross-linking, and canonical breadcrumbs [3](https://www.nngroup.com/topic/information-architecture/).
- Provide accessible reading and listening experiences, including per-article “▶ Posłuchaj analizy,” transcripts, and WCAG 2.2-aligned interactions [10](https://www.w3.org/TR/WCAG22/).
- Embed privacy and legal compliance into the editorial and technical workflows, including LIA documentation, Press Law safeguards, Polish-language notices, cookies consent, and rights management [11](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202401_legitimateinterest_en.pdf).
- Strengthen trust via provenance metadata, consistent IA patterns, and visible, well-structured navigation that supports discovery and orientation [4](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf).
- Prepare the foundation for subsequent sections that will specify detailed IA, design system, component behaviors, compliance artifacts, and implementation plans, including audio delivery and operational governance [1](https://www.nngroup.com/articles/homepage-design-principles/).

This introduction establishes the mission, constraints, and standards for the investigative portal so that the subsequent design, compliance, and implementation sections can proceed with shared goals, traceable rationale, and measurable outcomes grounded in recognized IA/UX, accessibility, and legal frameworks [1](https://www.nngroup.com/articles/homepage-design-principles/).