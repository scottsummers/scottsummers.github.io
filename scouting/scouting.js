/* Scouting resources: renders cards from resources.json. See HOW_TO_ADD.md. */
(function () {
  'use strict';
  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  var TYPES = {
    pdf:    { label: 'PDF',           action: 'Open PDF',       download: false },
    pptx:   { label: 'PPTX',          action: 'Download PPTX',  download: true  },
    slides: { label: 'Google Slides', action: 'Open slides',    download: false },
    link:   { label: 'Link',          action: 'Visit link',     download: false },
    doc:    { label: 'Doc',           action: 'Open',           download: false }
  };

  var groupsEl = document.getElementById('groups');
  var chipsEl = document.getElementById('chips');
  var qEl = document.getElementById('q');
  var statusEl = document.getElementById('status');
  var state = { cat: 'all', q: '' };
  var data = { categories: [], resources: [] };

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  // Only allow site-relative files or http(s) links.
  function safeHref(u) {
    if (typeof u !== 'string' || !u.trim()) return null;
    u = u.trim();
    if (/^https?:\/\//i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.indexOf('//') === 0) return null;
    return u;
  }
  function isExternal(u) { return /^https?:\/\//i.test(u); }

  function link(href, text, cls, opts) {
    var a = el('a', { class: cls, href: href, text: text });
    if (isExternal(href) || !opts.download) { a.target = '_blank'; a.rel = 'noopener'; }
    if (opts.download && !isExternal(href)) a.setAttribute('download', '');
    if (opts.label) a.setAttribute('aria-label', opts.label);
    return a;
  }

  function card(r) {
    var t = TYPES[r.type] || TYPES.link;
    var main = safeHref(r.file || r.url);
    var pdf = safeHref(r.pdf);
    var top = el('div', { class: 'res-top' }, [
      el('span', { class: 'ftype ft-' + (TYPES[r.type] ? r.type : 'link'), text: t.label }),
      (r.size || r.updated) ? el('span', { class: 'res-meta', text: [r.size, r.updated].filter(Boolean).join(' · ') }) : null
    ]);
    var actions = el('div', { class: 'res-actions' });
    if (pdf && r.type !== 'pdf') actions.appendChild(link(pdf, 'Open PDF', 'btn primary', { label: 'Open PDF: ' + r.title }));
    if (main) actions.appendChild(link(main, t.action, pdf && r.type !== 'pdf' ? 'btn ghost' : 'btn primary', { download: t.download, label: t.action + ': ' + r.title }));
    return el('li', { style: 'display:flex' }, [
      el('article', { class: 'card glass res' }, [
        top,
        el('h4', { text: r.title || 'Untitled' }),
        el('p', { text: r.description || '' }),
        actions
      ])
    ]);
  }

  function matches(r, q) {
    if (!q) return true;
    var hay = [r.title, r.description, (TYPES[r.type] || {}).label, (r.tags || []).join(' ')].join(' ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  var ICON_EMPTY = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 7.5 12 12l8-4.5M12 12v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  function render() {
    var q = state.q.trim().toLowerCase();
    groupsEl.innerHTML = '';
    var shown = 0, totalInScope = 0;
    data.categories.forEach(function (c, i) {
      if (state.cat !== 'all' && state.cat !== c.id) return;
      var all = data.resources.filter(function (r) { return r.category === c.id; });
      var list = all.filter(function (r) { return matches(r, q); });
      totalInScope += all.length; shown += list.length;
      if (q && !list.length && all.length) return; // hide groups with no search hits
      if (q && !all.length && state.cat === 'all') return;
      var head = el('header', { class: 'cat-head' }, [
        el('span', { class: 'cat-ico', html: ICONS[c.id] || ICONS.links }),
        el('div', { class: 'cat-text' }, [
          el('p', { class: 'cat-num', text: String(i + 1).padStart(2, '0') }),
          el('h3', { id: 'h-' + c.id, text: c.name }),
          el('p', { text: c.blurb || '' })
        ]),
        el('span', { class: 'cat-count', text: all.length + (all.length === 1 ? ' item' : ' items') })
      ]);
      var body;
      if (!all.length) {
        body = el('div', { class: 'sc-empty', html: ICON_EMPTY + '<span><strong>More coming soon.</strong> Nothing has been posted in ' + escapeHtml(c.name) + ' yet.</span>' });
      } else {
        body = el('ul', { class: 'cards sc-cards', role: 'list' }, list.map(card));
      }
      groupsEl.appendChild(el('section', { class: 'sc-group', id: 'cat-' + c.id, 'aria-labelledby': 'h-' + c.id, 'data-cat': c.id }, [head, body]));
    });
    if (q) {
      statusEl.textContent = shown ? shown + (shown === 1 ? ' resource matches' : ' resources match') + ' “' + state.q.trim() + '”.' : 'No resources match “' + state.q.trim() + '”.';
      if (!shown) groupsEl.appendChild(el('div', { class: 'sc-empty', html: ICON_EMPTY + '<span><strong>No matches.</strong> Try a different word or pick another category.</span>' }));
    } else {
      statusEl.textContent = data.resources.length ? '' : 'Nothing has been posted yet. Check back soon.';
    }
    chipsEl.querySelectorAll('.sc-chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)); });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }

  var ICONS = {
    briefs: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></g></svg>',
    presentations: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 21h8M7 12l3-3 2 2 4-4"/></g></svg>',
    handouts: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 4V3h6v1M8.5 10l1.5 1.5 3-3M8.5 16l1.5 1.5 3-3"/></g></svg>',
    skills: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c3-6 6-1 8-6s5-5 8-6"/><path d="M4 18c2 0 3 1 3 3M20 6c-2 0-3-1-3-3"/></g></svg>',
    links: '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></g></svg>'
  };

  function buildChips() {
    chipsEl.innerHTML = '';
    var all = [{ id: 'all', name: 'All', n: data.resources.length }].concat(data.categories.map(function (c) {
      return { id: c.id, name: c.name, n: data.resources.filter(function (r) { return r.category === c.id; }).length };
    }));
    all.forEach(function (c) {
      var b = el('button', { type: 'button', class: 'sc-chip', 'data-cat': c.id, 'aria-pressed': 'false' });
      b.appendChild(document.createTextNode(c.name));
      b.appendChild(el('b', { text: String(c.n) }));
      b.addEventListener('click', function () { state.cat = c.id; render(); });
      chipsEl.appendChild(b);
    });
  }

  qEl.addEventListener('input', function () { state.q = qEl.value; render(); });

  fetch('resources.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (j) {
      data.categories = Array.isArray(j.categories) ? j.categories : [];
      data.resources = (Array.isArray(j.resources) ? j.resources : []).filter(function (r) { return r && r.title && r.category; });
      var hash = location.hash.replace('#', '');
      if (data.categories.some(function (c) { return c.id === hash; })) state.cat = hash;
      buildChips(); render();
    })
    .catch(function () {
      statusEl.textContent = 'The resource list could not be loaded. Please refresh the page.';
    });
})();
