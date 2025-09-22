import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CATEGORIES, DOC_TYPES, getCategory, getItemsByCategory } from '@/data/items';
import type { CategorySlug } from '@/data/items';
import { useMemo, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slugParam = params.slug || '';
  const catSlug = (CATEGORIES.find((c) => c.slug === slugParam)?.slug ?? CATEGORIES[0].slug) as CategorySlug;
  const category = getCategory(catSlug);

  const [sp, setSp] = useSearchParams();

  const [docType, setDocType] = useState<string>(sp.get('type') || '');
  const [tag, setTag] = useState<string>(sp.get('tag') || '');
  const [from, setFrom] = useState<string>(sp.get('from') || '');
  const [to, setTo] = useState<string>(sp.get('to') || '');

  const items = useMemo(() => {
    let list = getItemsByCategory(category.slug);
    if (docType) list = list.filter((i) => i.document_type === docType);
    if (tag) list = list.filter((i) => i.tags.includes(tag));
    if (from) list = list.filter((i) => !i.date || i.date >= from);
    if (to) list = list.filter((i) => !i.date || i.date <= to);
    return list;
  }, [category.slug, docType, tag, from, to]);

  function applyFilters() {
    const next = new URLSearchParams();
    if (docType) next.set('type', docType);
    if (tag) next.set('tag', tag);
    if (from) next.set('from', from);
    if (to) next.set('to', to);
    setSp(next, { replace: true });
  }

  const allTags = Array.from(new Set(getItemsByCategory(category.slug).flatMap((i) => i.tags)));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{category.name}</h1>
        <p className="text-muted-foreground">{category.desc}</p>
      </header>

      <aside aria-label="Filtry" className="rounded border p-4 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm">Typ dokumentu</label>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className="mt-1 border rounded px-2 py-1 w-full">
              <option value="">Wszystkie</option>
              {DOC_TYPES.map((dt) => <option key={dt} value={dt}>{dt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm">Tag</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="mt-1 border rounded px-2 py-1 w-full">
              <option value="">Wszystkie</option>
              {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm">Od</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-sm">Do</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 border rounded px-2 py-1 w-full" />
          </div>
        </div>
        <div className="mt-3">
          <button onClick={applyFilters} className="px-3 py-1 rounded bg-amber-500 text-black hover:bg-amber-400">Zastosuj</button>
          <button onClick={() => { setDocType(''); setTag(''); setFrom(''); setTo(''); setSp(new URLSearchParams(), { replace: true }); }} className="ml-2 px-3 py-1 rounded border">
            Wyczyść
          </button>
        </div>
      </aside>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((i) => (
          <article key={i.id} className="rounded border p-4 bg-card">
            <h3 className="font-semibold text-lg"><Link to={i.canonical_url}>{i.title}</Link></h3>
            <p className="text-sm text-muted-foreground mt-1">{i.summary}</p>
            <p className="text-xs text-muted-foreground mt-2">{i.document_type}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
              {i.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded bg-muted">{t}</span>)}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}