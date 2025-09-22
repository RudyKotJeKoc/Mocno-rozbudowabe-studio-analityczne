import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, ITEMS, basicMatch } from '@/data/items';
import { useEffect, useState } from 'react';

type Track = { id?: string; title?: string; path: string };

function isRecord(o: unknown): o is Record<string, unknown> {
  return typeof o === 'object' && o !== null;
}
function isTrackCandidate(o: unknown): o is { path: unknown; title?: unknown; id?: unknown } {
  return isRecord(o) && 'path' in o;
}
function toTrack(o: unknown): Track | null {
  if (typeof o === 'string') return { path: o };
  if (isTrackCandidate(o)) {
    const rec = o as Record<string, unknown>;
    const path = rec.path;
    if (typeof path === 'string') {
      const title = typeof rec.title === 'string' ? (rec.title as string) : undefined;
      const id = typeof rec.id === 'string' ? (rec.id as string) : undefined;
      return { path, title, id };
    }
  }
  return null;
}
async function loadPlaylist(): Promise<Track[]> {
  const tryUrls = ['/audio/playlist.json', '/workspace/uploads/playlist.json'];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const tracks = data.map((d) => toTrack(d)).filter(Boolean) as Track[];
        if (tracks.length) return tracks;
      }
      if (isRecord(data) && Array.isArray((data as Record<string, unknown>).tracks)) {
        const raw = (data as Record<string, unknown>).tracks as unknown[];
        const tracks = raw.map((d) => toTrack(d)).filter(Boolean) as Track[];
        if (tracks.length) return tracks;
      }
    } catch {
      // next URL
    }
  }
  return [];
}

export default function Home() {
  const loc = useLocation();
  const q = new URLSearchParams(loc.search).get('q') || '';

  const latest = ITEMS.slice().reverse().filter((i) => {
    if (!q) return true;
    return basicMatch(`${i.title} ${i.summary} ${i.tags.join(' ')}`, q);
  });

  const featured = latest.slice(0, 2);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const pl = await loadPlaylist();
      setTracks(pl);
      setCurrent(0);
    })();
  }, []);

  return (
    <div className="space-y-8">
      <section aria-labelledby="search-summary">
        {q ? (
          <p id="search-summary" className="text-sm text-muted-foreground">
            Wyniki dla „{q}”: {latest.length}
          </p>
        ) : (
          <p id="search-summary" className="text-sm text-muted-foreground">
            Wybierz kategorię lub przeglądaj „Featured” i „Najnowsze”.
          </p>
        )}
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="text-xl font-semibold mb-3">Kategorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="rounded border p-4 hover:shadow-sm bg-card"
              aria-label={`Kategoria ${c.name}`}
            >
              <div className="text-3xl" aria-hidden>{c.icon}</div>
              <div className="font-medium mt-1">{c.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="featured">
        <h2 id="featured" className="text-xl font-semibold mb-3">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featured.map((i) => (
            <article key={i.id} className="rounded border p-4 bg-card">
              <h3 className="font-semibold text-lg"><Link to={i.canonical_url}>{i.title}</Link></h3>
              <p className="text-sm text-muted-foreground mt-1">{i.summary}</p>
              <p className="text-xs text-muted-foreground mt-2">{i.document_type} · {i.canonical_category}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="latest">
        <h2 id="latest" className="text-xl font-semibold mb-3">Najnowsze</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {latest.map((i) => (
            <article key={i.id} className="rounded border p-4 bg-card">
              <h3 className="font-semibold text-lg"><Link to={i.canonical_url}>{i.title}</Link></h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{i.summary}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                {i.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded bg-muted">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="audio-pl" className="rounded border p-4 bg-card">
        <h2 id="audio-pl" className="text-xl font-semibold mb-3">Playlist audio</h2>
        {tracks.length ? (
          <>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)}
                aria-label="Poprzedni utwór"
              >
                ⏮
              </button>
              <div className="flex-1">
                <div className="font-medium">{tracks[current].title || tracks[current].path.split('/').pop()}</div>
                <audio key={tracks[current].path} className="mt-2 w-full" controls>
                  <source src={tracks[current].path} />
                  Twoja przeglądarka nie obsługuje elementu audio.
                </audio>
              </div>
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setCurrent((c) => (c + 1) % tracks.length)}
                aria-label="Następny utwór"
              >
                ⏭
              </button>
            </div>
            <ul className="mt-3 text-sm max-h-64 overflow-auto">
              {tracks.map((t, idx) => (
                <li key={t.path} className="py-1">
                  <button
                    className="underline"
                    onClick={() => setCurrent(idx)}
                    aria-current={current === idx ? 'true' : 'false'}
                  >
                    {t.title || t.path.split('/').pop()}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Brak playlisty lub nie udało się jej załadować.</p>
        )}
      </section>
    </div>
  );
}