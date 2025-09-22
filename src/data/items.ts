/* Data model and registry for investigative portal */
export type DocType =
  | 'report'
  | 'analysis'
  | 'legal'
  | 'chronicle'
  | 'facts'
  | 'evidence';

export type CategorySlug =
  | 'manipulacje-i-toksycznosc'
  | 'instrumentalne-wykorzystanie-instytucji'
  | 'dokumenty-i-fakty'
  | 'raporty-i-analizy'
  | 'symbolika-i-narracja';

export interface Item {
  id: string;
  title: string;
  canonical_category: CategorySlug;
  related_categories: CategorySlug[];
  document_type: DocType;
  author_source?: string;
  date?: string; // ISO yyyy-mm-dd
  summary: string; // 50–120 words recommended
  tags: string[];
  provenance_note?: string;
  hash_sha256?: string;
  original_filename: string;
  original_url: string; // link to uploads (immutable)
  public_copy_url: string; // /content/*.txt (served by app)
  canonical_url: string; // /article/:id
  audio_asset?: string | null; // /audio/...
  transcript_url?: string | null; // /content/*.txt or null
  sensitivity_flags?: string[];
}

/* Controlled vocabularies (kept small for MVP) */
export const DOC_TYPES: DocType[] = [
  'report',
  'analysis',
  'legal',
  'chronicle',
  'facts',
  'evidence',
];

export const CATEGORIES: { slug: CategorySlug; name: string; icon: string; desc: string }[] = [
  {
    slug: 'manipulacje-i-toksycznosc',
    name: 'Manipulacje i Toksyczność',
    icon: '🧠',
    desc: 'Psychologia manipulacji, toksyczne relacje, narcyzm.',
  },
  {
    slug: 'instrumentalne-wykorzystanie-instytucji',
    name: 'Instrumentalne wykorzystanie instytucji',
    icon: '🏛️',
    desc: 'Jak instytucje wspierały lub wzmacniały manipulację.',
  },
  {
    slug: 'dokumenty-i-fakty',
    name: 'Dokumenty i Fakty',
    icon: '📄',
    desc: 'Kluczowe fakty, akt darowizny, analiza materiału, 5 faktów.',
  },
  {
    slug: 'raporty-i-analizy',
    name: 'Raporty i Analizy',
    icon: '📊',
    desc: 'Raporty dla mediów, krytyczne analizy, kroniki.',
  },
  {
    slug: 'symbolika-i-narracja',
    name: 'Symbolika i Narracja',
    icon: '🕯️',
    desc: '„Klątwa”, kroniki i kontekst psychologiczny.',
  },
];

/* Registry of 9 items (immutable originals under /workspace/uploads/...) */
export const ITEMS: Item[] = [
  {
    id: 'raport-dla-mediow-klatwa',
    title: 'Raport dla mediów: „Klątwa”',
    canonical_category: 'symbolika-i-narracja',
    related_categories: ['raporty-i-analizy'],
    document_type: 'report',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Raport o motywie „Klątwy” jako ramie narracyjnej i społeczno-psychologicznym tle zdarzeń. Materiał odczytywany wprost z dostarczonego pliku.',
    tags: ['klatwa', 'raport', 'narracja'],
    provenance_note: 'Wyświetlany verbatim z oryginału, bez modyfikacji.',
    original_filename: 'raport dla mediów Klątwa.txt',
    original_url:
      '/workspace/uploads/048050c1/raport dla mediów Klątwa.txt',
    public_copy_url: '/content/raport-dla-mediow-klatwa.txt',
    canonical_url: '/article/raport-dla-mediow-klatwa',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'kronika-osmego-kregu',
    title: 'Kronika Ósmego Kręgu',
    canonical_category: 'raporty-i-analizy',
    related_categories: ['symbolika-i-narracja'],
    document_type: 'chronicle',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Kronika wydarzeń jako zapis progressivej eskalacji. Odczyt wprost z pliku, bez edycji.',
    tags: ['kronika', 'eskalacja'],
    provenance_note: 'Oryginał nienaruszony, dostępny do pobrania.',
    original_filename: 'kronika ósmego kręgu.txt',
    original_url:
      '/workspace/uploads/4f27d5b8/kronika ósmego kręgu.txt',
    public_copy_url: '/content/kronika-osmego-kregu.txt',
    canonical_url: '/article/kronika-osmego-kregu',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'kluczowe-fakty',
    title: 'Kluczowe fakty',
    canonical_category: 'dokumenty-i-fakty',
    related_categories: ['raporty-i-analizy'],
    document_type: 'facts',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Syntetyczna lista faktów, które porządkują kontekst i kierunki dalszej analizy.',
    tags: ['fakty', 'podsumowanie'],
    provenance_note: 'Bez zmian względem oryginału.',
    original_filename: 'kluczowe fakty.txt',
    original_url:
      '/workspace/uploads/474c1809/kluczowe fakty.txt',
    public_copy_url: '/content/kluczowe-fakty.txt',
    canonical_url: '/article/kluczowe-fakty',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'jak-instytucje-wspieraly-manipulacje',
    title: 'Jak instytucje wspierały manipulację',
    canonical_category: 'instrumentalne-wykorzystanie-instytucji',
    related_categories: ['manipulacje-i-toksycznosc'],
    document_type: 'analysis',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Analiza roli instytucji oraz mechanizmów, które pośrednio mogły wzmacniać przemoc i manipulację.',
    tags: ['instytucje', 'analiza'],
    provenance_note: 'Treść bez zmian, wprost z pliku.',
    original_filename: 'jak instytucje wspierały manipulację.txt',
    original_url:
      '/workspace/uploads/11925496/jak instytucje wspierały manipulację.txt',
    public_copy_url: '/content/jak-instytucje-wspieraly-manipulacje.txt',
    canonical_url: '/article/jak-instytucje-wspieraly-manipulacje',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: '5-faktow',
    title: '5 faktów',
    canonical_category: 'dokumenty-i-fakty',
    related_categories: ['manipulacje-i-toksycznosc'],
    document_type: 'facts',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Pięć najważniejszych punktów do zapamiętania — syntetyczny przewodnik po sprawie.',
    tags: ['fakty', '5'],
    provenance_note: 'Wyświetlanie 1:1 treści z pliku.',
    original_filename: '5 faktow.txt',
    original_url:
      '/workspace/uploads/672522ff/5 faktow.txt',
    public_copy_url: '/content/5-faktow.txt',
    canonical_url: '/article/5-faktow',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'krytyczna-analiza-materialu-dowodowego',
    title: 'Krytyczna analiza materiału dowodowego',
    canonical_category: 'dokumenty-i-fakty',
    related_categories: ['raporty-i-analizy'],
    document_type: 'analysis',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Weryfikacja materiałów dowodowych, ich pochodzenia i znaczenia w sprawie.',
    tags: ['dowody', 'analiza', 'proweniencja'],
    provenance_note: 'Oryginał dostępny do pobrania bez modyfikacji.',
    original_filename: 'krytyczna analiza materiału dowodowego.txt',
    original_url:
      '/workspace/uploads/f15c71af/krytyczna analiza materiału dowodowego.txt',
    public_copy_url: '/content/krytyczna-analiza-materialu-dowodowego.txt',
    canonical_url: '/article/krytyczna-analiza-materialu-dowodowego',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'sluzebnosc-a-dozywocie',
    title: 'Służebność a dożywocie',
    canonical_category: 'dokumenty-i-fakty',
    related_categories: ['raporty-i-analizy'],
    document_type: 'legal',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Wyjaśnienie różnic między służebnością a dożywociem w prostych słowach.',
    tags: ['prawo', 'sluzebnosc', 'dozywocie'],
    provenance_note: 'Treść 1:1 z dostarczonego pliku.',
    original_filename: 'sluzebnosc a dozywocie.txt',
    original_url:
      '/workspace/uploads/c32b108c/sluzebnosc a dozywocie.txt',
    public_copy_url: '/content/sluzebnosc-a-dozywocie.txt',
    canonical_url: '/article/sluzebnosc-a-dozywocie',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'raport-dla-mediow',
    title: 'Raport dla mediów',
    canonical_category: 'raporty-i-analizy',
    related_categories: ['dokumenty-i-fakty'],
    document_type: 'report',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Raport dla mediów: streszczenie kluczowych wątków i wniosków analitycznych.',
    tags: ['raport', 'media'],
    provenance_note: 'Zachowano niezmienność oryginału.',
    original_filename: 'Raport dla mediów.txt',
    original_url:
      '/workspace/uploads/27107325/Raport dla mediów.txt',
    public_copy_url: '/content/raport-dla-mediow.txt',
    canonical_url: '/article/raport-dla-mediow',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
  {
    id: 'akt-darowizny',
    title: 'Akt darowizny',
    canonical_category: 'dokumenty-i-fakty',
    related_categories: ['manipulacje-i-toksycznosc'],
    document_type: 'evidence',
    author_source: 'Nieznany',
    date: undefined,
    summary:
      'Dokument wskazywany w dyskusji — analizowany w kontekście proweniencji i skutków.',
    tags: ['darowizna', 'dowod'],
    provenance_note: 'Oryginał do pobrania, viewer pokazuje kopię 1:1.',
    original_filename: 'akt darowizny.txt',
    original_url:
      '/workspace/uploads/508d4dc9/akt darowizny.txt',
    public_copy_url: '/content/akt-darowizny.txt',
    canonical_url: '/article/akt-darowizny',
    audio_asset: null,
    transcript_url: null,
    sensitivity_flags: [],
  },
];

/* Helpers */
export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export function getItemById(id: string) {
  return ITEMS.find((i) => i.id === id);
}

export function getItemsByCategory(slug: CategorySlug) {
  return ITEMS.filter((i) => i.canonical_category === slug);
}

/* very simple search across title, summary, tags and file content (loaded elsewhere) */
export function basicMatch(hay: string, needle: string) {
  return hay.toLocaleLowerCase().normalize('NFKD').includes(
    needle.toLocaleLowerCase().normalize('NFKD'),
  );
}