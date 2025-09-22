import { ITEMS } from '@/data/items';
import { useEffect, useState } from 'react';

async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(hashBuffer));
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function IntegrityPage() {
  const [rows, setRows] = useState<{ id: string; title: string; cat: string; hash: string; size: number; verifiedAt: string; dl: string }[]>([]);

  useEffect(() => {
    (async () => {
      const out: typeof rows = [];
      for (const it of ITEMS) {
        try {
          const res = await fetch(it.public_copy_url, { cache: 'no-cache' });
          const txt = await res.text();
          const hash = await computeSha256(txt);
          const size = new TextEncoder().encode(txt).length;
          out.push({ id: it.id, title: it.title, cat: it.canonical_category, hash, size, verifiedAt: new Date().toISOString(), dl: it.original_url });
        } catch {
          out.push({ id: it.id, title: it.title, cat: it.canonical_category, hash: 'ERROR', size: 0, verifiedAt: new Date().toISOString(), dl: it.original_url });
        }
      }
      setRows(out);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Integrity — integralność i proweniencja</h1>
        <p className="text-muted-foreground">Lista pozycji z hashami SHA-256, rozmiarem i czasem weryfikacji. Oryginały dostępne do pobrania.</p>
      </header>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">Tytuł</th>
              <th className="text-left p-2">Kategoria</th>
              <th className="text-left p-2">SHA-256</th>
              <th className="text-left p-2">Rozmiar (B)</th>
              <th className="text-left p-2">Zweryfikowano</th>
              <th className="text-left p-2">Pobierz</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.title}</td>
                <td className="p-2">{r.cat}</td>
                <td className="p-2 font-mono break-all">{r.hash}</td>
                <td className="p-2">{r.size}</td>
                <td className="p-2">{new Date(r.verifiedAt).toLocaleString()}</td>
                <td className="p-2"><a className="underline" href={r.dl} download>Pobierz</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}