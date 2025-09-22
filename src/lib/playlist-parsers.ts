export type Track = { id?: string; title?: string; path: string };

export function isRecord(o: unknown): o is Record<string, unknown> {
  return typeof o === 'object' && o !== null;
}
export function isTrackCandidate(o: unknown): o is { path: unknown; title?: unknown; id?: unknown } {
  return isRecord(o) && 'path' in o;
}
export function toTrack(o: unknown): Track | null {
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

export async function loadPlaylist(): Promise<Track[]> {
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
