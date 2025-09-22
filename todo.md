MVP Portal Śledczy — plan i pliki (maks. 8 plików)

Cel
- Profesjonalny portal tematyczny z 5 kategoriami, breadcrumb, wyszukiwarką, widokami kategorii i artykułów (9 plików .txt) wyświetlanych verbatim (niezmienność), modułem audio i stroną Integrity (hashy).

Pliki do utworzenia/zmiany
1) src/data/items.ts
   - Schemat Item + kontrolowane słowniki (document_type, tags)
   - Rejestr 9 artykułów: metadane, kategoria, ścieżki: original (uploads), publicCopy (public/content/*.txt), audio (opcjonalnie), transcript (opcjonalnie)
   - Pomocnicze: kategorie, mapy, funkcje getItemsByCategory, searchItems

2) src/components/Layout.tsx
   - Header: 5 kategorii, PL/EN toggle (localStorage), stała wyszukiwarka
   - Skip-links, landmaraki, Breadcrumb (Home › Kategoria › Artykuł)
   - Footer (linki: Integrity, Privacy, Corrections, Editorial, Methodology)
   - Outlet

3) src/pages/Index.tsx (REWRITE)
   - Grid 5 kategorii (ikona + tytuł + opis)
   - Featured (1–2) + Latest (reszta)
   - Wyszukiwanie po ?q= (filtruje listy)

4) src/pages/Category.tsx
   - Lista kart artykułów (12–24)
   - Filtry: document_type, tagi (multi), zakres dat (od/do)
   - Batch-apply (mobile): przycisk Zastosuj

5) src/pages/Article.tsx
   - Viewer verbatim (fetch publicCopy), Download original (uploads link)
   - Panel metadanych: title, date, document_type, tags, provenance_note, hash_sha256 (obliczany w przeglądarce), size, last_verified (czas obliczenia)
   - „▶ Posłuchaj analizy” (Player HTML5, bez autoplay, regulacja prędkości)
   - Transcript toggle (jeśli istnieje)
   - Powiązane
   - TOC „On This Page” (sekcje: Metadata, Audio, Content)

6) src/pages/Integrity.tsx
   - Tabela wszystkich pozycji: tytuł, kategoria, hash, rozmiar, czas weryfikacji, link do pobrania
   - Hash+size liczone klientem (SubtleCrypto, TextEncoder)

ZMIANY istniejących:
7) src/App.tsx
   - Trasy: / (Index), /category/:slug (Category), /article/:id (Article), /integrity (Integrity)
   - Małe komponenty statycznych stron (Privacy, Corrections, Editorial, Methodology) inline

8) public/content/*.txt
   - Kopie (NIE modyfikują oryginałów). Viewer korzysta z kopii, Download wskazuje oryginalny /workspace/uploads/... 

Uwagi
- Audio: moduł obsłuży /public/audio (jeśli pliki będą dodane), mapowanie po nazwie. Bez plików pokaże informację.
- Wyszukiwanie: proste pełnotekstowe w pamięci (tytuł + treść txt + tagi), facety w widokach kategorii.
- WCAG 2.2 AA: focus, aria, kontrast, brak zbędnej animacji; ostrzeżenia dla treści wrażliwych (flaga sensitivity_flags).