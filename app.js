/**
 * Radio Adamowo - unified app.js (non-module), v7
 * - Ensures Tailwind utility classes render (CDN in head)
 * - Removes autoplay gating and relies on user-initiated play
 * - Comments MVP (localStorage) with validation and anti-spam
 * - Language switcher (PL/EN/NL) preference persisted
 * - Content loader: fetches text files from public/content and renders approachable sections
 * - SW caching: temporarily unregister existing SW to avoid stale cache causing "black/white" view
 */

(function() {
  const byId = (id) => document.getElementById(id);
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Unregister any existing service workers to prevent stale cached assets
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => regs.forEach(reg => reg.unregister()))
      .catch(() => {});
  }

  // Footer year
  const yearEl = byId('current-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  const menuBtn = byId('menu-toggle');
  const mobileMenu = byId('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Audio player controls (no autoplay)
  const audio = byId('radio-player');
  const playBtn = byId('radio-play-pause-btn');
  const iconPlay = byId('radio-play-icon');
  const iconPause = byId('radio-pause-icon');
  function setPlayingUI(playing) {
    if (iconPlay) iconPlay.classList.toggle('hidden', playing);
    if (iconPause) iconPause.classList.toggle('hidden', !playing);
  }
  if (playBtn && audio) {
    playBtn.removeAttribute('disabled');
    setPlayingUI(false);
    playBtn.addEventListener('click', async () => {
      try {
        if (audio.paused) {
          await audio.play();
          setPlayingUI(true);
        } else {
          audio.pause();
          setPlayingUI(false);
        }
      } catch (err) {
        console.warn('Playback blocked until user interacts:', err);
      }
    });
  }

  // Back to top button
  const toTop = byId('to-top-button');
  if (toTop) {
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 240;
      toTop.classList.toggle('hidden', !show);
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Language switcher
  const LANG_KEY = 'ra_lang';
  const langButtons = qsa('#lang-switcher [data-lang]');
  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    langButtons.forEach(btn => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('text-gray-200', active);
      btn.classList.toggle('text-gray-400', !active);
    });
    const dict = {
      pl: {
        comments_title: 'Komentarze',
        comments_hint: 'Komentarze w tej wersji są zapisywane tylko w Twojej przeglądarce (localStorage). Współdzielony czat uruchomimy po podłączeniu backendu.',
        play_hint: 'Wybierz styl i naciśnij play...'
      },
      en: {
        comments_title: 'Comments',
        comments_hint: 'In this version, comments are stored only in your browser (localStorage). Shared chat will be enabled after backend connection.',
        play_hint: 'Choose a style and press play...'
      },
      nl: {
        comments_title: 'Reacties',
        comments_hint: 'In deze versie worden reacties alleen in je browser opgeslagen (localStorage). Gedeelde chat wordt ingeschakeld na backend-koppeling.',
        play_hint: 'Kies een stijl en druk op afspelen...'
      }
    };
    const t = dict[lang] || dict.pl;
    const cTitle = qs('#comments h2');
    const cHint = qs('#comments p.text-sm');
    const radioHint = byId('radio-current-song');
    if (cTitle) cTitle.textContent = t.comments_title;
    if (cHint) cHint.textContent = t.comments_hint;
    if (radioHint) radioHint.textContent = t.play_hint;
  }
  if (langButtons.length) {
    const initLang = localStorage.getItem(LANG_KEY) || 'pl';
    setLang(initLang);
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });
  }

  // Comments MVP
  const STORAGE_KEY = 'ra_comments';
  const LAST_SUBMIT_KEY = 'ra_comments_last_submit';
  const RATE_LIMIT_SECONDS = 60;
  const DUP_WINDOW_MINUTES = 15;
  const MAX_COMMENTS = 200;
  function escapeHTML(str) {
    return String(str).replace(/[&<>"'`]/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;'
    }[s]));
  }
  function nowMs() { return Date.now(); }
  function loadComments() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
  function saveComments(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_COMMENTS)));
    } catch (e) { console.warn('Failed to save comments:', e); }
  }
  function renderComments() {
    const ul = byId('comments-list');
    if (!ul) return;
    ul.innerHTML = '';
    const list = loadComments().sort((a, b) => b.createdAt - a.createdAt);
    list.forEach(item => {
      const li = document.createElement('li');
      li.className = 'bg-gray-800 p-4 rounded-lg';
      const date = new Date(item.createdAt);
      li.innerHTML = `
        <div class="flex items-center justify-between">
          <strong class="text-amber-500">${escapeHTML(item.author)}</strong>
          <span class="text-xs text-gray-400">${date.toLocaleString()}</span>
        </div>
        <p class="mt-2 text-gray-200">${escapeHTML(item.message)}</p>
      `;
      ul.appendChild(li);
    });
  }
  function showError(msg) {
    const el = byId('comment-error');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
  }
  const form = byId('comment-form');
  if (form) {
    renderComments();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = (byId('comment-author')?.value || '').trim();
      const message = (byId('comment-message')?.value || '').trim();
      if (author.length < 2 || author.length > 32) { showError('Nick: 2–32 znaków.'); return; }
      if (message.length < 5 || message.length > 200) { showError('Treść: 5–200 znaków.'); return; }
      const last = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
      if (nowMs() - last < RATE_LIMIT_SECONDS * 1000) {
        const left = Math.ceil((RATE_LIMIT_SECONDS * 1000 - (nowMs() - last)) / 1000);
        showError(`Odczekaj ${left}s przed kolejnym wpisem.`);
        return;
      }
      const list = loadComments();
      const dupSince = nowMs() - DUP_WINDOW_MINUTES * 60 * 1000;
      const isDup = list.some(it =>
        it.author === author && it.message === message && it.createdAt >= dupSince
      );
      if (isDup) { showError('Duplikat tego samego komentarza w krótkim czasie.'); return; }
      const entry = { author, message, createdAt: nowMs() };
      list.push(entry);
      saveComments(list);
      localStorage.setItem(LAST_SUBMIT_KEY, String(nowMs()));
      byId('comment-author').value = '';
      byId('comment-message').value = '';
      renderComments();
    });
  }

  // Content loader helpers
  function fetchText(url) {
    return fetch(url, { cache: 'no-cache' }).then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    });
  }
  function toParagraphs(text) {
    const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
    const frag = document.createDocumentFragment();
    blocks.forEach(p => {
      const el = document.createElement('p');
      el.className = 'content-p';
      el.textContent = p;
      frag.appendChild(el);
    });
    return frag;
  }
  function toFacts(text) {
    const raw = text.replace(/\r\n/g, '\n').split(/\n{2,}|\n/).map(s => s.trim()).filter(Boolean);
    const frag = document.createDocumentFragment();
    raw.slice(0, 12).forEach((fact, idx) => {
      const div = document.createElement('div');
      div.className = 'fact-card';
      div.innerHTML = `<span class="fact-index">${idx + 1}</span><p class="fact-text"></p>`;
      div.querySelector('.fact-text').textContent = fact;
      frag.appendChild(div);
    });
    return frag;
  }
  function toSnippets(text) {
    const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
    const frag = document.createDocumentFragment();
    blocks.forEach((snippet) => {
      const card = document.createElement('div');
      card.className = 'snippet-card';
      const p = document.createElement('p');
      p.textContent = snippet;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'Kopiuj';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(snippet);
          btn.textContent = 'Skopiowano!';
          setTimeout(() => (btn.textContent = 'Kopiuj'), 1200);
        } catch {
          btn.textContent = 'Błąd';
          setTimeout(() => (btn.textContent = 'Kopiuj'), 1200);
        }
      });
      card.appendChild(p);
      card.appendChild(btn);
      frag.appendChild(card);
    });
    return frag;
  }
  function renderInto(containerId, fragment) {
    const el = byId(containerId);
    if (!el) return;
    el.innerHTML = '';
    el.appendChild(fragment);
  }
  function loadAndRender(url, containerId, mode) {
    fetchText(url)
      .then(txt => {
        let frag;
        switch (mode) {
          case 'paragraphs': {
            const blocks = txt.replace(/\r\n/g, '\n').split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
            const fragment = document.createDocumentFragment();
            blocks.forEach(b => {
              const p = document.createElement('p');
              p.className = 'content-p';
              p.textContent = b;
              fragment.appendChild(p);
            });
            frag = fragment;
            break;
          }
          case 'facts': frag = toFacts(txt); break;
          case 'snippets': frag = toSnippets(txt); break;
          default: frag = toParagraphs(txt);
        }
        renderInto(containerId, frag);
      })
      .catch(err => {
        console.warn('Load content failed:', url, err);
        const el = byId(containerId);
        if (el) el.innerHTML = '<p class="content-p">Nie udało się załadować treści.</p>';
      });
  }

  // Kick off content loads (files copied into ./public/content/)
  loadAndRender('./public/content/wstep.txt', 'intro-wstep-body', 'paragraphs');
  loadAndRender('./public/content/5-faktow.txt', 'five-facts-list', 'facts');
  loadAndRender('./public/content/sluzebnosc-a-dozywocie.txt', 'legal-explain-body', 'paragraphs');
  loadAndRender('./public/content/raport-dla-mediow.txt', 'press-report-body', 'paragraphs');
  loadAndRender('./public/content/social-media.txt', 'social-media-list', 'snippets');
  loadAndRender('./public/content/rozliczenie-finansowe.txt', 'finance-body', 'paragraphs');
})();