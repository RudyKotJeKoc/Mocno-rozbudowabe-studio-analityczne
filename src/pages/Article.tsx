import { Link, useParams } from 'react-router-dom';
import { getItemById, ITEMS } from '@/data/items';
import { useEffect, useMemo, useState } from 'react';

async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(hashBuffer));
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

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
      // proceed to next URL
    }
  }
  return [];
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '');
}

function fileBase(name: string) {
  const base = name.split('/').pop() || name;
  return base.replace(/\.[^.]+$/, '');
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const item = id ? getItemById(id) : undefined;
  const [content, setContent] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const [size, setSize] = useState<number>(0);
  const [verifiedAt, setVerifiedAt] = useState<string>('');
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!item) return;
    (async () => {
      const res = await fetch(item.public_copy_url, { cache: 'no-cache' });
      const txt = await res.text();
      setContent(txt);
      const h = await computeSha256(txt);
      setHash(h);
      const bytes = new TextEncoder().encode(txt).length;
      setSize(bytes);
      setVerifiedAt(new Date().toISOString());
    })();
  }, [item?.public_copy_url]);

  useEffect(() => {
    if (!item) return;
    (async () => {
      const tracks = await loadPlaylist();
      if (!tracks.length) {
        setAudioSrc(item.audio_asset || null);
        return;
      }
      const nid = normalize(item.id);
      const nfile = normalize(fileBase(item.original_filename || ''));
      let best: Track | undefined;
      for (const t of tracks) {
        const fname = fileBase(t.path);
        const npath = normalize(t.path);
        const nfname = normalize(fname);
        if (
          nfname.includes(nid) ||
          npath.includes(nid) ||
          (nfile && (nfname.includes(nfile) || npath.includes(nfile)))
        ) {
          best = t;
          break;
        }
      }
      setAudioSrc(best?.path || item.audio_asset || null);
    })();
  }, [item?.id, item?.original_filename, item?.audio_asset]);

  const related = useMemo(() => {
    if (!item) return [];
    return ITEMS.filter(
      (i) => i.id !== item.id && (i.canonical_category === item.canonical_category || i.tags.some((t) => item.tags.includes(t))),
    ).slice(0, 4);
  }, [item]);

  if (!item) {
    return <p>Nie znaleziono artykułu.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <article className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <p className="text-sm text-muted-foreground">
            {item.document_type} · {item.canonical_category}
          </p>
        </header>

        <section aria-labelledby="metadata" className="rounded border p-4 bg-card">
          <h2 id="metadata" className="font-semibold mb-2">
            Metadane i integralność
          </h2>
          <dl className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <dt className="font-medium">Oryginał</dt>
              <dd>
                <a className="underline" href={item.original_url} download>
                  Pobierz oryginał ({item.original_filename})
                </a>
              </dd>
            </div>
            {item.date && (
              <div>
                <dt className="font-medium">Data</dt>
                <dd>{item.date}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium">Typ</dt>
              <dd>{item.document_type}</dd>
            </div>
            <div>
              <dt className="font-medium">Tagi</dt>
              <dd>{item.tags.join(', ') || '—'}</dd>
            </div>
            <div>
              <dt className="font-medium">SHA-256</dt>
              <dd className="font-mono break-all">{hash || '...'}</dd>
            </div>
            <div>
              <dt className="font-medium">Rozmiar</dt>
              <dd>{size} B</dd>
            </div>
            <div>
              <dt className="font-medium">Ostatnio zweryfikowano</dt>
              <dd>{verifiedAt ? new Date(verifiedAt).toLocaleString() : '...'}</dd>
            </div>
            {item.provenance_note && (
              <div className="md:col-span-2">
                <dt className="font-medium">Proweniencja</dt>
                <dd>{item.provenance_note}</dd>
              </div>
            )}
          </dl>
        </section>

        <section aria-labelledby="audio" className="rounded border p-4 bg-card">
          <div className="flex items-center justify-between">
            <h2 id="audio" className="font-semibold">▶ Posłuchaj analizy</h2>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="rate">Prędkość</label>
              <select id="rate" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border rounded px-2 py-1">
                {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
                  <option key={r} value={r}>
                    {r}×
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 px-3 py-1 rounded bg-amber-500 text-black hover:bg-amber-400"
            onClick={() => setShowPlayer((s) => !s)}
            aria-expanded={showPlayer}
          >
            {showPlayer ? 'Ukryj player' : 'Pokaż player'}
          </button>
          {showPlayer && (
            audioSrc ? (
              <audio
                className="mt-3 w-full"
                controls
                onPlay={(e) => {
                  (e.currentTarget as HTMLAudioElement).playbackRate = speed;
                }}
                onRateChange={(e) => setSpeed((e.currentTarget as HTMLAudioElement).playbackRate)}
              >
                <source src={audioSrc} />
                Twoja przeglądarka nie obsługuje elementu audio.
              </audio>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Brak przypiętego pliku audio. Dodaj do /public/audio lub uzupełnij playlistę, aby uaktywnić player.
              </p>
            )
          )}
          {item.transcript_url && (
            <details className="mt-3">
              <summary className="cursor-pointer">Pokaż transkrypt</summary>
              <iframe title="transcript" src={item.transcript_url} className="w-full h-64 border rounded mt-2" />
            </details>
          )}
          <div className="mt-3">
            <a className="underline" href={item.original_url} download>
              Pobierz oryginał
            </a>
          </div>
        </section>

        <nav aria-label="On This Page" className="rounded border p-3 bg-card">
          <strong>On This Page:</strong>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>
              <a href="#metadata" className="underline">
                Metadane i integralność
              </a>
            </li>
            <li>
              <a href="#audio" className="underline">
                Audio
              </a>
            </li>
            <li>
              <a href="#content" className="underline">
                Treść
              </a>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="content" className="rounded border p-4 bg-card">
          <h2 id="content" className="font-semibold mb-2">
            Treść (verbatim)
          </h2>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed p-3 bg-muted rounded border">
{content || 'Wczytywanie...'}
          </pre>
        </section>
      </article>

      <aside className="space-y-4">
        <section className="rounded border p-4 bg-card">
          <h2 className="font-semibold mb-2">Powiązane</h2>
          <ul className="list-disc list-inside text-sm">
            {related.map((r) => (
              <li key={r.id}>
                <Link className="underline" to={r.canonical_url}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}