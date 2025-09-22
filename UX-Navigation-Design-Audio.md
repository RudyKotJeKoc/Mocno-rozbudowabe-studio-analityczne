## UX, Navigation, Visual Design System, and Audio Accessibility

### 1) Orientation and flow (transition from IA to UX)
Section SW2 established five top-level categories, canonical breadcrumb paths, polyhierarchical placement rules, and an inventory of nine verbatim .txt documents that must be preserved and displayed without edits. [1](https://www.nngroup.com/topic/information-architecture/)  
This section operationalizes that information architecture into concrete screens, interactions, and design system elements that improve readability, trust, and discoverability across the portal. [2](https://www.nngroup.com/articles/menu-design/)  
Because audiences increasingly rely on clear structuring and transparent provenance to evaluate information, the UX prioritizes visible navigation, predictable layouts, and scannable metadata. [3](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)

The five categories defined in SW2 (Polish labels used sitewide):
- Manipulacje i Toksyczność
- Instrumentalne wykorzystanie instytucji
- Dokumenty i Fakty
- Raporty i Analizy
- Symbolika i Narracja

Canonical breadcrumbs will use a single authoritative path for each item, while polyhierarchy enables the same document to appear in multiple relevant categories via cross-links and curated related content. [4](https://www.nngroup.com/articles/breadcrumbs/)

Transition principle: IA decisions become screen-level models—home, category, item, search/results—backed by global navigation, local navigation, and on-page TOCs to orient direct-entry visitors. [2](https://www.nngroup.com/articles/menu-design/)


### 2) Page layouts and navigation patterns
#### Homepage
- Mission header with concise tagline and portal purpose; place logo top-left and minimize motion to avoid distraction on sensitive topics. [6](https://www.nngroup.com/articles/homepage-design-principles/)  
- Five-category grid with supportive icons and one-sentence descriptions to expose breadth at a glance and strengthen information scent. [2](https://www.nngroup.com/articles/menu-design/)  
- Featured items strip (editorially curated) followed by a Latest section with timestamped cards using consistent metadata (title, date, document type, tags). [1](https://www.nngroup.com/topic/information-architecture/)  
- Persistent search box in the header; do not hide search inside a menu. [7](https://www.nngroup.com/articles/mega-menus-work-well/)  
- Visible global navigation on desktop with the five categories; avoid hiding them behind a hamburger to preserve context. [2](https://www.nngroup.com/articles/menu-design/)  
- Language toggle (PL/EN) in the header, retaining user context when switching. [8](https://accessibility.psu.edu/guidelines/wcaglist/)

Rationale: Making primary options visible on desktops reduces interaction costs and improves orientation, particularly for users arriving mid-site. [2](https://www.nngroup.com/articles/menu-design/)

#### Category landing pages
- Layout: Card-based lists (12–24 items per page) with consistent metadata: title (front-loaded keywords), publication date, normalized document type, concise summary, and controlled tags. [1](https://www.nngroup.com/topic/information-architecture/)  
- Breadcrumb trail “Home › Category” plus a brief category explainer to set expectations. [4](https://www.nngroup.com/articles/breadcrumbs/)  
- Faceted filtering on the left (desktop) and a top “Filters” drawer (mobile) with batch-apply: document_type, tags, and date range. [9](https://www.coveo.com/blog/faceted-search/)  
- On mobile, apply selected facets in a batch to reduce reloads and friction. [10](https://www.fact-finder.com/blog/faceted-search/)  
- Each card offers an accessible “Read more” expander to preview a few paragraphs without losing page context; implement expanders with proper button semantics. [11](https://www.nngroup.com/articles/accordions-on-desktop/)

#### Item pages (nine verbatim documents)
- Immutable text viewer presenting the original .txt content verbatim, plus a canonical download link to the source file and a provenance note. [1](https://www.nngroup.com/topic/information-architecture/)  
- Metadata panel showing document type, date, author/source (if known), category placement, and normalized tags for reliable retrieval. [1](https://www.nngroup.com/topic/information-architecture/)  
- “▶ Posłuchaj analizy” button above the article body launches or focuses an accessible audio player; no autoplay. [12](https://www.w3.org/TR/WCAG22/)  
- Transcript toggle reveals a searchable, downloadable transcript below the player for all prerecorded audio-only analyses. [12](https://www.w3.org/TR/WCAG22/)  
- Related items: algorithmic by shared tags plus editorial curation to sustain narrative coherence and surface polyhierarchical relationships. [1](https://www.nngroup.com/topic/information-architecture/)  
- Canonical breadcrumb: “Home › Category › Item” with the current page as non-link. [4](https://www.nngroup.com/articles/breadcrumbs/)  
- For long texts, provide an “On This Page” table of contents and back-to-top links for fast intra-page navigation. [5](https://www.nngroup.com/articles/table-of-contents/)

#### Global navigation
- Header: category links (visible on desktop), utility links (About/Editorial, Corrections/Right of Reply, Methodology/Provenance, Privacy/Cookies, Contact), and a persistent search field. [2](https://www.nngroup.com/articles/menu-design/)  
- Mega menu (optional on desktop): click-activated groups with supportive labels and short descriptions; provide a simple fallback by routing to landing pages to maximize accessibility. [7](https://www.nngroup.com/articles/mega-menus-work-well/)  
- Mobile: a labeled drawer (“Menu”) containing all primary and utility links; use a standard hamburger icon labeled “Menu” for clarity and redundant access paths. [13](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/)  
- Current location states are reflected in the global nav and breadcrumbs to orient direct-entry visitors. [2](https://www.nngroup.com/articles/menu-design/)


### 3) Interaction details and accessibility (WCAG 2.2 AA)
#### Accordions/expanders
- Use native button elements for headers; apply aria-expanded and aria-controls; hide collapsed content programmatically. [11](https://www.nngroup.com/articles/accordions-on-desktop/)  
- Allow multiple panels open; provide clear caret/plus icons reflecting state; support Enter/Space keys and optional Arrow navigation. [11](https://www.nngroup.com/articles/accordions-on-desktop/)  
- Avoid hiding essential content; ensure print styles expand accordions for offline review. [11](https://www.nngroup.com/articles/accordions-on-desktop/)

#### Keyboard and focus
- Ensure every function is operable via keyboard with a logical focus order and visible focus indicators meeting non-text contrast. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Touch targets are at least 24×24 CSS pixels to support motor accessibility. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Provide skip-to-content and landmark navigation (header, main, nav, footer). [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Prefer native HTML semantics and only add ARIA when needed to convey name/role/value. [14](https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/)

#### Breadcrumbs
- Implement canonical breadcrumb trails with the current page rendered as plain text and no link. [4](https://www.nngroup.com/articles/breadcrumbs/)  
- On mobile, truncate intermediate levels to avoid wrapping, while preserving the parent context. [4](https://www.nngroup.com/articles/breadcrumbs/)  
- Announce breadcrumbs as a navigation landmark for assistive technologies. [4](https://www.nngroup.com/articles/breadcrumbs/)

#### Content warnings
- For potentially distressing material, display an optional, respectful disclosure with a clear “Reveal content” control and predictable, non-sensational behavior with minimal motion. [6](https://www.nngroup.com/articles/homepage-design-principles/)


### 4) Visual design system (serious, analytical tone)
#### Color system
- Base: neutral grays for backgrounds and containers, reserving color for emphasis and category cues; ensure text contrast ≥4.5:1 for normal text and ≥3:1 for large text. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Accent palette by category (used for labels, icons, and small highlights—not large surfaces):
  - Manipulacje i Toksyczność: deep aubergine (measured, non-alarming)
  - Instrumentalne wykorzystanie instytucji: steel blue
  - Dokumenty i Fakty: graphite
  - Raporty i Analizy: teal
  - Symbolika i Narracja: muted amber
- Use red exclusively for error and destructive actions to avoid sensational signaling. [6](https://www.nngroup.com/articles/homepage-design-principles/)

#### Typography
- UI: system sans-serif stack for clarity in navigation and labels; Body: a highly legible serif or humanist sans for long-form reading with a consistent type scale. [6](https://www.nngroup.com/articles/homepage-design-principles/)  
- Target line length of 60–80 characters and generous line-height to reduce cognitive load on long investigative texts. [6](https://www.nngroup.com/articles/homepage-design-principles/)

#### Grid and spacing
- 12-column responsive grid with consistent spacing increments (4/8 px scale) to maintain predictable card layouts that support quick scanning. [1](https://www.nngroup.com/topic/information-architecture/)

#### Iconography and narrative signaling
- Pair category icons with explicit text labels; keep icons conventional and supportive, not primary carriers of meaning. [2](https://www.nngroup.com/articles/menu-design/)  
- Accordions use caret/plus icons with clear state changes and enlarged click targets including the heading text. [11](https://www.nngroup.com/articles/accordions-on-desktop/)  
- Provide alt text for icons indicating category function rather than decorative semantics. [2](https://www.nngroup.com/articles/menu-design/)

Category-to-icon and color mapping:
| Category (PL) | Icon cue | Accent color |
| --- | --- | --- |
| Manipulacje i Toksyczność | Interlocking hands/threads | Deep aubergine |
| Instrumentalne wykorzystanie instytucji | Civic building/scales | Steel blue |
| Dokumenty i Fakty | Document/checkmark | Graphite |
| Raporty i Analizy | Report/chart | Teal |
| Symbolika i Narracja | Spiral/mask | Muted amber |

#### Imagery
- Prefer abstract/editorial illustrations; avoid literal depictions of identifiable individuals; minimize or avoid motion and never autoplay animations. [6](https://www.nngroup.com/articles/homepage-design-principles/)


### 5) Search, filtering, and cross-linking
- Persistent, labeled search input in the header; do not bury search within menus. [7](https://www.nngroup.com/articles/mega-menus-work-well/)  
- Results page: facets for category, document_type, tags, and date; provide a prominent “Clear all” and keyboard-accessible, high-contrast controls. [15](https://www.algolia.com/blog/ux/faceted-search-an-overview)  
- Standardize taxonomy values to avoid duplicates and strengthen retrieval across facets. [10](https://www.fact-finder.com/blog/faceted-search/)  
- Combine tag-based similarity with editorially curated “Related” lists to sustain narrative coherence and expose polyhierarchical relationships without content duplication. [1](https://www.nngroup.com/topic/information-architecture/)


### 6) Audio module: player, playlist, and transcripts
#### Per-article controls
- Each item page includes “▶ Posłuchaj analizy” that opens/focuses an accessible player with play/pause, seek, volume, mute, playback rate, and time elapsed/remaining; do not autoplay audio. [12](https://www.w3.org/TR/WCAG22/)  
- All controls are keyboard operable with visible focus and clear labels/ARIA for screen readers. [16](https://dequeuniversity.com/checklists/web/audio-video)

#### Player technology
- Use a privacy-respecting, accessible open-source player (e.g., Plyr or MediaElement.js) self-hosted with local assets; configure accurate roles/names/values and avoid third-party trackers or cookies by default. [17](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024)  
- Provide strong non-text contrast for controls and ensure robust behavior across assistive technologies. [8](https://accessibility.psu.edu/guidelines/wcaglist/)

#### Playlist from /audio/
- Auto-generate a playlist view by scanning /audio/ and mapping tracks to their corresponding item pages; allow “play next,” queueing, and per-track metadata display. [16](https://dequeuniversity.com/checklists/web/audio-video)

#### Transcripts
- Provide on-page toggleable transcripts and downloadable text for all prerecorded audio-only analyses, and clearly label when a transcript is auto-generated and edited for accuracy. [12](https://www.w3.org/TR/WCAG22/)

#### Formats and delivery
- Offer modern and fallback formats (e.g., AAC/MP4 or HLS plus MP3/OGG), support byte-range requests and progressive loading, and expose an explicit “Download” option when appropriate. [16](https://dequeuniversity.com/checklists/web/audio-video)  
- Do not embed third-party analytics in the player; if optional analytics exist elsewhere, gate them behind consent and keep audio functional without it. [17](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024)

#### Accessibility specifics
- Keyboard shortcuts (e.g., Space/Enter for play/pause, Arrow for seek), status message announcements for state changes, and WCAG-conformant contrast for icons and text. [16](https://dequeuniversity.com/checklists/web/audio-video)  
- Provide user media preferences (e.g., reduced motion toggles) and never autoplay previews. [6](https://www.nngroup.com/articles/homepage-design-principles/)


### 7) Multilingual UX (Polish primary, optional English)
- Provide a clear PL/EN toggle in the header that preserves the user’s current context and sets lang attributes at the document root and at inline language switches. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Localize UI labels and date/number formats per locale, and ensure search accommodates Polish diacritics with tolerant matching. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Avoid mixing languages within a single UI element to maintain clarity for assistive technologies. [8](https://accessibility.psu.edu/guidelines/wcaglist/)


### 8) Performance and stability notes relevant to UX
- Favor predictable, low-motion layouts for sensitive content, and keep the homepage free from auto-advancing carousels to reduce cognitive load. [6](https://www.nngroup.com/articles/homepage-design-principles/)  
- Use robust, validated semantic markup and expose accessible names/roles/values to ensure compatibility with assistive technologies. [8](https://accessibility.psu.edu/guidelines/wcaglist/)  
- Keep primary navigation and search server-rendered for speed and reliability in text-heavy views. [2](https://www.nngroup.com/articles/menu-design/)


### 9) Compliance and ethical guardrails embedded in UX
- Prominent, scannable pages linked from header/footer: Editorial Standards, Methodology/Provenance, Corrections/Right of Reply, and Privacy/Cookies, all available in Polish and describing user rights and complaint routes. [17](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024)  
- Implement a Corrections/Right of Reply (“Sprostowanie”) workflow with intake, deadlines, and placement rules compliant with Polish Press Law, and present links prominently on all pages. [18](https://sciendo.com/pdf/10.1515/lape-2017-0002)  
- Present a non-blocking, accessible cookie banner for non-essential analytics with clear opt-in choices; audio playback and core content should function without analytics consent. [17](https://ceelegalmatters.com/data-protection-2024/poland-data-protection-2024)


### 10) Acceptance criteria checklist
- Visible top navigation with five categories on desktop; accessible mobile drawer labeled “Menu.” [2](https://www.nngroup.com/articles/menu-design/)
- Category pages: card lists with consistent metadata, accessible expanders, and facets (document_type, tags, date) with batch apply on mobile. [1](https://www.nngroup.com/topic/information-architecture/)
- Item pages: verbatim text viewer, canonical download link, provenance notes, related items, and canonical breadcrumbs. [4](https://www.nngroup.com/articles/breadcrumbs/)
- Audio on every item: “▶ Posłuchaj analizy,” accessible player (no autoplay), and transcript toggle with downloadable text. [12](https://www.w3.org/TR/WCAG22/)
- WCAG 2.2 AA: keyboard operability, visible focus, target sizes ≥24×24, adequate contrast, and accessible expand/collapse behaviors. [8](https://accessibility.psu.edu/guidelines/wcaglist/)
- Visual system: consistent icon set paired with text, category accent colors with WCAG-compliant contrast, and no sensational imagery or motion. [2](https://www.nngroup.com/articles/menu-design/)
- Search: persistent header search; results with facets, a “Clear all,” and robust empty states. [7](https://www.nngroup.com/articles/mega-menus-work-well/)
- Multilingual: PL/EN toggle preserves context and sets appropriate lang semantics; localized formats for dates and numbers. [8](https://accessibility.psu.edu/guidelines/wcaglist/)


### Implementation notes tied to the nine .txt documents
- All nine source files are preserved verbatim on their item pages with immutable displays and canonical downloads; polyhierarchy is achieved through cross-links and curated “Related” lists while preserving a single canonical breadcrumb path per item. [1](https://www.nngroup.com/topic/information-architecture/)  
- Where an item reasonably belongs to multiple categories (e.g., a report relevant to both “Raporty i Analizy” and “Symbolika i Narracja”), use editorial curation and tags to surface lateral links without duplicating the content. [1](https://www.nngroup.com/topic/information-architecture/)