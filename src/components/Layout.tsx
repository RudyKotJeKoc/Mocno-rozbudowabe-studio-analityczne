import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES } from '@/data/items';

function classNames(...s: (string | false | undefined)[]) {
  return s.filter(Boolean).join(' ');
}

const LANG_KEY = 'portal_lang';

export function Layout() {
  const nav = useNavigate();
  const loc = useLocation();
  const [q, setQ] = useState<string>('');
  const [lang, setLang] = useState<string>(() => localStorage.getItem(LANG_KEY) || 'pl');

  useEffect(() => {
    const usp = new URLSearchParams(loc.search);
    setQ(usp.get('q') || '');
  }, [loc.search]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const usp = new URLSearchParams();
    if (q) usp.set('q', q);
    nav({ pathname: '/', search: usp.toString() });
  }

  function toggleLang() {
    const next = lang === 'pl' ? 'en' : 'pl';
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  }

  // Breadcrumb: Home › Category › Article
  const breadcrumb = useMemo(() => {
    const parts: { label: string; to?: string }[] = [{ label: 'Home', to: '/' }];
    const segs = loc.pathname.split('/').filter(Boolean);
    if (segs[0] === 'category' && segs[1]) {
      const cat = CATEGORIES.find((c) => c.slug === segs[1]);
      parts.push({ label: cat ? cat.name : 'Kategoria' });
    } else if (segs[0] === 'article' && segs[1]) {
      // Find category via location state? For MVP keep generic
      parts.push({ label: 'Artykuł' });
    } else if (segs[0] === 'integrity') {
      parts.push({ label: 'Integrity' });
    }
    return parts;
  }, [loc.pathname]);

  const skipRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        ref={skipRef}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-amber-400 text-black px-3 py-2 rounded"
      >
        Skip to content
      </a>

      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-bold text-lg text-amber-600">
            Portal Śledczy
          </Link>

          <nav className="hidden md:flex items-center gap-3" aria-label="Kategorie">
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.slug}
                to={`/category/${c.slug}`}
                className={({ isActive }) =>
                  classNames(
                    'px-2 py-1 rounded hover:bg-amber-50',
                    isActive && 'bg-amber-100 text-amber-900',
                  )
                }
              >
                <span aria-hidden>{c.icon}</span> <span className="ml-1">{c.name}</span>
              </NavLink>
            ))}
          </nav>

          <form onSubmit={onSubmit} className="ml-auto flex items-center gap-2" role="search" aria-label="Wyszukiwarka">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder={lang === 'pl' ? 'Szukaj...' : 'Search...'}
              className="border rounded px-3 py-1 min-w-[200px]"
              aria-label={lang === 'pl' ? 'Szukaj w serwisie' : 'Search site'}
            />
            <button type="submit" className="px-3 py-1 rounded bg-amber-500 text-black hover:bg-amber-400">
              {lang === 'pl' ? 'Szukaj' : 'Search'}
            </button>
            <button
              type="button"
              onClick={toggleLang}
              className="px-2 py-1 rounded border"
              aria-pressed={lang === 'en'}
              aria-label="Toggle language"
              title="PL/EN"
            >
              {lang === 'pl' ? 'PL' : 'EN'}
            </button>
          </form>
        </div>
        <div className="container mx-auto px-4 pb-3">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {i > 0 && ' › '}
                {b.to ? <Link to={b.to} className="underline">{b.label}</Link> : <span aria-current="page">{b.label}</span>}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-wrap gap-4 items-center">
          <Link to="/integrity" className="underline">Integrity</Link>
          <span>·</span>
          <Link to="/privacy" className="underline">Prywatność i cookies</Link>
          <span>·</span>
          <Link to="/corrections" className="underline">Sprostowania</Link>
          <span>·</span>
          <Link to="/editorial" className="underline">Standardy redakcyjne</Link>
          <span>·</span>
          <Link to="/methodology" className="underline">Metodologia i Pochodzenie</Link>
          <span className="ml-auto">&copy; {new Date().getFullYear()} Portal Śledczy</span>
        </div>
      </footer>
    </div>
  );
}