// ===== PIXEL COSMOS MAIN JS =====

(function () {
  'use strict';

  // ===== STATE =====
  let currentLang = localStorage.getItem('lang') || 'en';
  let currentTheme = localStorage.getItem('theme') || 'dark';
  let currentPage = 'home';
  let currentPost = null;
  const data = window.SITE_DATA;

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme();
    initStarfield();
    buildTopBar();
    buildNavbar();
    buildPages();
    navigateTo('home');
    updateLang();
    initSearch();
    setTimeout(initHeroCanvas, 50);
  });

  // ===== THEME =====
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme === 'light' ? 'light' : '');
  }
  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
    updateThemeBtn();
  }
  function updateThemeBtn() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    const t = data.i18n[currentLang];
    btn.textContent = currentTheme === 'dark' ? t.theme_day : t.theme_night;
    btn.title = currentTheme === 'dark' ? 'Switch to Day' : 'Switch to Night';
  }

  // ===== LANG =====
  function toggleLang() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLang();
    // Rebuild pages with new lang
    buildPages();
    if (currentPost) {
      openPost(currentPost.id, currentPost.type);
    } else {
      showPage(currentPage);
    }
    // Re-init hero canvas (3D) because buildPages() destroyed the old canvas element
    if (window._heroThreeCleanup) { window._heroThreeCleanup(); window._heroThreeCleanup = null; }
    setTimeout(initHeroCanvas, 50);
    showToast(currentLang === 'en' ? 'Switched to English' : '已切换为中文');
  }
  function t(key) {
    return data.i18n[currentLang][key] || key;
  }
  function updateLang() {
    updateThemeBtn();
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = t('lang_btn');
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(el => {
      const key = el.dataset.i18n;
      if (key) el.textContent = t(key);
    });
    // Update section titles
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!el.classList.contains('nav-link')) {
        const key = el.dataset.i18n;
        if (key) el.textContent = t(key);
      }
    });
    // Update search title
    const st = document.querySelector('.search-title');
    if (st) st.textContent = t('search_title');
    const si = document.getElementById('search-input');
    if (si) si.placeholder = t('search_placeholder');
  }

  // ===== TOP BAR =====
  function buildTopBar() {
    const bar = document.createElement('div');
    bar.id = 'top-bar';
    bar.innerHTML = `
    <div class="top-left-controls">
      <button class="pixel-btn" id="lang-btn" onclick="window.COSMOS.toggleLang()">${t('lang_btn')}</button>
      <button class="pixel-btn icon-btn" id="theme-btn" onclick="window.COSMOS.toggleTheme()"></button>
      <button class="pixel-btn icon-btn" id="search-open-btn" onclick="window.COSMOS.openSearch()" title="Search">🔍</button>
    </div>
  `;
    const mc = document.getElementById('main-content');
    mc.parentNode.insertBefore(bar, mc);
    updateThemeBtn();
  }

  // ===== NAVBAR =====
  function buildNavbar() {
    const nav = document.createElement('nav');
    nav.id = 'navbar';
    const pages = [
      { id: 'home', key: 'nav_home' },
      { id: 'research', key: 'nav_research' },
      { id: 'about', key: 'nav_about' },
      { id: 'blogs', key: 'nav_blogs' },
    ];
    nav.innerHTML = pages.map(p => `
    <a href="#" class="nav-link" data-page="${p.id}" data-i18n="${p.key}" onclick="window.COSMOS.navigateTo('${p.id}'); return false;">${t(p.key)}</a>
  `).join('');
    // Append navbar INTO top-bar on the right side
    document.getElementById('top-bar').appendChild(nav);
  }

  function setActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });
  }

  // ===== PAGES =====
  function buildPages() {
    const mc = document.getElementById('main-content');
    mc.innerHTML = `
    ${buildHomePage()}
    ${buildResearchPage()}
    ${buildAboutPage()}
    ${buildBlogsPage()}
  `;
    // Post view
    mc.insertAdjacentHTML('beforeend', `
    <div id="post-view">
      <button class="back-btn" onclick="window.COSMOS.closePost()">◀ <span data-i18n="back">${t('back')}</span></button>
      <div id="post-view-content"></div>
    </div>
  `);
  }

  function buildHomePage() {
    // Latest 3: combine research+blogs sorted by date
    const all = [
      ...data.research.map(p => ({ ...p, type: 'research' })),
      ...data.blogs.map(p => ({ ...p, type: 'blog' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    return `
    <section class="page" id="page-home">
      <div class="hero">
        <div class="hero-hud">
          <div class="hud-corner tl"></div>
          <div class="hud-corner tr"></div>
        </div>
        <div class="hero-cosmos-wrap">
          <canvas id="hero-canvas"></canvas>
        </div>
        <div class="hero-status-row">
          <span class="status-dot"></span>
          <span class="status-label" id="hero-badge">SYSTEM ONLINE</span>
        </div>
        <h1 class="hero-title" data-i18n="hero_greeting">${t('hero_greeting')}</h1>
        <p class="hero-subtitle typing-cursor" data-i18n="hero_subtitle">${t('hero_subtitle')}</p>
      </div>
      <div class="section-header">
        <h2 class="section-title" data-i18n="latest_posts">${t('latest_posts')}</h2>
        <div class="pixel-divider"></div>
      </div>
      <div class="post-grid">
        ${all.map(p => buildPostCard(p)).join('')}
      </div>
    </section>
  `;
  }

  function buildResearchPage() {
    return `
    <section class="page" id="page-research">
      <div class="section-header">
        <h2 class="section-title" data-i18n="research_title">${t('research_title')}</h2>
        <div class="pixel-divider"></div>
      </div>
      <div class="post-grid">
        ${data.research.map(p => buildPostCard({ ...p, type: 'research' })).join('')}
      </div>
    </section>
  `;
  }

  function buildBlogsPage() {
    return `
    <section class="page" id="page-blogs">
      <div class="section-header">
        <h2 class="section-title" data-i18n="blogs_title">${t('blogs_title')}</h2>
        <div class="pixel-divider"></div>
      </div>
      <div class="post-grid">
        ${data.blogs.map(p => buildPostCard({ ...p, type: 'blog' })).join('')}
      </div>
    </section>
  `;
  }

  function buildAboutPage() {
    const ab = data.about;
    const name = currentLang === 'zh' ? ab.name_zh : ab.name;
    const tagline = currentLang === 'zh' ? ab.tagline_zh : ab.tagline;
    const bio = currentLang === 'zh' ? ab.bio.zh : ab.bio.en;
    const bioLines = bio.split('\n').map(l => `<p>${l}</p>`).join('');
    const skills = ab.skills.map(s => {
      const label = currentLang === 'zh' ? s.label_zh : s.label;
      return `
      <li class="skill-bar-item">
        <div class="skill-label">${label}</div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width:${s.level}%"></div>
        </div>
      </li>
    `;
    }).join('');
    const socials = ab.socials.map(s => `<a href="${s.url}" class="social-link" target="_blank">${s.label}</a>`).join('');
    const avatarHtml = ab.avatar
      ? `<img src="${ab.avatar}" alt="avatar" loading="lazy">`
      : `<div class="avatar-placeholder">${ab.avatar_emoji}</div>`;

    return `
    <section class="page" id="page-about">
      <div class="about-container">
        <div class="avatar-frame">
          ${avatarHtml}
          <div class="avatar-badge" data-i18n="about_badge">${t('about_badge')}</div>
        </div>
        <h2 class="about-name">${name}</h2>
        <p class="about-tagline">${tagline}</p>
        <div class="about-bio">${bioLines}</div>
        <ul class="skill-bar-list">${skills}</ul>
        <div class="social-links">${socials}</div>
      </div>
    </section>
  `;
  }

  function buildPostCard(post) {
    const title = currentLang === 'zh' ? post.title_zh : post.title;
    const excerpt = currentLang === 'zh' ? post.excerpt_zh : post.excerpt;
    const tag = post.type === 'research' ? t('tag_research') : t('tag_blog');
    const thumb = post.image
      ? `<img class="post-thumb" src="${post.image}" alt="${title}" loading="lazy">`
      : `<div class="post-thumb-placeholder">${post.emoji}</div>`;

    return `
    <article class="post-card" onclick="window.COSMOS.openPost('${post.id}', '${post.type}')">
      <div class="pixel-corner tl"></div>
      <div class="pixel-corner tr"></div>
      <div class="card-scan"></div>
      ${thumb}
      <div class="post-body">
        <div class="post-tag">${tag}</div>
        <h3 class="post-title">${title}</h3>
        <p class="post-excerpt">${excerpt}</p>
        <div class="post-card-footer">
          <span class="post-date">${post.date}</span>
          <span class="read-more">${t('read_more')}</span>
        </div>
      </div>
      <div class="pixel-corner bl"></div>
      <div class="pixel-corner br"></div>
    </article>
  `;
  }

  // ===== NAVIGATION =====
  window.COSMOS = {
    navigateTo,
    openPost,
    closePost,
    toggleLang,
    toggleTheme,
    openSearch,
    closeSearch,
    doSearch
  };

  function navigateTo(page) {
    currentPost = null;
    currentPage = page;
    showPage(page);
    setActiveNav(page);
    document.getElementById('post-view').classList.remove('active');
    window.scrollTo(0, 0);
  }

  function showPage(page) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    const el = document.getElementById('page-' + page);
    if (el) el.classList.add('active');
  }

  // ===== POST VIEW =====
  function openPost(id, type) {
    const list = type === 'research' ? data.research : data.blogs;
    const post = list.find(p => p.id === id);
    if (!post) return;
    currentPost = { id, type };

    const title = currentLang === 'zh' ? post.title_zh : post.title;
    const content = currentLang === 'zh' ? post.content_zh : post.content;
    const tag = type === 'research' ? t('tag_research') : t('tag_blog');
    const thumb = post.image
      ? `<img class="post-full-hero" src="${post.image}" alt="${title}" loading="lazy">`
      : `<div class="post-full-hero-placeholder">${post.emoji}</div>`;

    const postView = document.getElementById('post-view');
    document.getElementById('post-view-content').innerHTML = `
    <div class="post-tag">${tag}</div>
    <h1 class="post-full-title">${title}</h1>
    <div class="post-full-meta">
      <span>${t('posted_on')} ${post.date}</span>
    </div>
    ${thumb}
    <div class="post-content">${renderMarkdown(content)}</div>
  `;

    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    postView.classList.add('active');
    window.scrollTo(0, 0);
  }

  function closePost() {
    currentPost = null;
    document.getElementById('post-view').classList.remove('active');
    showPage(currentPage);
    window.scrollTo(0, 0);
  }

  // ===== MARKDOWN RENDERER (lightweight) =====
  function renderMarkdown(md) {
    if (!md) return '';
    let html = md.trim();

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="lang-${lang}">${escHtml(code.trim())}</code></pre>`);
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Headings
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // HR
    html = html.replace(/^---$/gm, '<hr>');
    // Blockquote
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
    // Tables
    html = html.replace(/((\|.+\|\n)+)/g, function (match) {
      const rows = match.trim().split('\n').filter(r => !/^\|[\s\-|]+\|$/.test(r));
      const tableRows = rows.map((row, i) => {
        const cells = row.split('|').filter((_, ci) => ci > 0 && ci < row.split('|').length - 1);
        const tag2 = i === 0 ? 'th' : 'td';
        return `<tr>${cells.map(c => `<${tag2}>${c.trim()}</${tag2}>`).join('')}</tr>`;
      });
      return `<table>${tableRows.join('')}</table>`;
    });
    // Unordered lists
    html = html.replace(/((?:^- .+\n?)+)/gm, match => {
      const items = match.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    });
    // Ordered lists
    html = html.replace(/((?:^\d+\. .+\n?)+)/gm, match => {
      const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
      return `<ol>${items}</ol>`;
    });
    // Paragraphs
    html = html.split(/\n{2,}/).map(block => {
      if (/^<(h[1-6]|ul|ol|pre|blockquote|hr|table)/.test(block.trim())) return block;
      return `<p>${block.trim()}</p>`;
    }).join('\n');

    return html;
  }

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ===== SEARCH =====
  function initSearch() {
    const overlay = document.getElementById('search-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearch();
    });
    document.getElementById('search-input').addEventListener('input', function () {
      doSearch(this.value);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });
  }

  function openSearch() {
    document.getElementById('search-overlay').classList.add('active');
    setTimeout(() => document.getElementById('search-input').focus(), 100);
  }

  function closeSearch() {
    document.getElementById('search-overlay').classList.remove('active');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
  }

  function doSearch(query) {
    const results = document.getElementById('search-results');
    if (!query || query.length < 2) { results.innerHTML = ''; return; }
    query = query.toLowerCase();
    const all = [
      ...data.research.map(p => ({ ...p, type: 'research' })),
      ...data.blogs.map(p => ({ ...p, type: 'blog' }))
    ];
    const matches = all.filter(p => {
      const title = (currentLang === 'zh' ? p.title_zh : p.title).toLowerCase();
      const excerpt = (currentLang === 'zh' ? p.excerpt_zh : p.excerpt).toLowerCase();
      const content = (currentLang === 'zh' ? (p.content_zh || '') : (p.content || '')).toLowerCase();
      return title.includes(query) || excerpt.includes(query) || content.includes(query);
    });

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-no-result">${t('no_results')}</div>`;
      return;
    }

    results.innerHTML = matches.map(p => {
      const title = currentLang === 'zh' ? p.title_zh : p.title;
      const excerpt = currentLang === 'zh' ? p.excerpt_zh : p.excerpt;
      const tag = p.type === 'research' ? t('tag_research') : t('tag_blog');
      return `
      <div class="search-result-item" onclick="window.COSMOS.closeSearch(); window.COSMOS.openPost('${p.id}','${p.type}')">
        <div class="sr-tag">${tag}</div>
        <div class="sr-title">${title}</div>
        <div class="sr-excerpt">${excerpt}</div>
      </div>
    `;
    }).join('');
  }

  // ===== HERO CANVAS — Three.js 3D Solar System =====
  function initHeroCanvas() {
    const wrap = document.querySelector('.hero-cosmos-wrap');
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !wrap) return;

    // Remove old 2D canvas, create a container for Three.js
    canvas.remove();
    wrap.style.borderRadius = '50%';
    wrap.style.overflow = 'hidden';
    wrap.style.background = 'transparent';

    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';
    const size = wrap.offsetWidth || 440;

    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => initThree(wrap, size, isLight);
    document.head.appendChild(script);
  }

  function initThree(wrap, size, isLight) {
    if (typeof THREE === 'undefined') return;

    // ── Scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.set(0, 5, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x222233, 1));
    const sunLight = new THREE.PointLight(0xff6600, 2.2, 60);
    scene.add(sunLight);
    const fillLight = new THREE.DirectionalLight(0x8899cc, 0.4);
    fillLight.position.set(5, 8, 6);
    scene.add(fillLight);

    // ── Stars ──
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 300;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 150 - 30;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starField = new THREE.Points(starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.7 }));
    scene.add(starField);

    // ── Sun ──
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xff4400, emissive: 0xff2200, emissiveIntensity: 2.0,
      metalness: 0.1, roughness: 0.4
    });
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(1.6, 64, 64), sunMat);
    scene.add(sunMesh);

    // Sun glow layers
    const glow1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xff8822, transparent: true, opacity: 0.28, side: THREE.BackSide })
    );
    scene.add(glow1);
    const glow2 = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xff5500, transparent: true, opacity: 0.15, side: THREE.BackSide })
    );
    scene.add(glow2);
    const pulseGlow = new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff8844, transparent: true, opacity: 0.18, side: THREE.BackSide })
    );
    scene.add(pulseGlow);

    // Sun heat particles
    const heatGeo = new THREE.BufferGeometry();
    const heatPos = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const r = 1.8 + Math.random() * 1.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      heatPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      heatPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      heatPos[i * 3 + 2] = r * Math.cos(ph);
    }
    heatGeo.setAttribute('position', new THREE.BufferAttribute(heatPos, 3));
    const heatParticles = new THREE.Points(heatGeo,
      new THREE.PointsMaterial({
        color: 0xff7733, size: 0.05,
        transparent: true, blending: THREE.AdditiveBlending
      }));
    scene.add(heatParticles);

    // ── Dark mode: Neptune — multi-layer glow + particles + ring + 4 moons ──

    // Neptune body: accurate blue (reference: 0x3a7bbf)
    const neptuneMat = new THREE.MeshStandardMaterial({
      color: 0x3a7bbf,
      emissive: 0x1a4a8a, emissiveIntensity: 0.35,
      metalness: 0.2, roughness: 0.4
    });
    const neptuneMesh = new THREE.Mesh(new THREE.SphereGeometry(1.5, 64, 64), neptuneMat);
    scene.add(neptuneMesh);

    // Inner glow (BackSide, soft blue)
    const nepInnerGlowMat = new THREE.MeshPhongMaterial({
      color: 0x5a9eff, transparent: true, opacity: 0.15, side: THREE.BackSide
    });
    const nepInnerGlow = new THREE.Mesh(new THREE.SphereGeometry(1.58, 32, 32), nepInnerGlowMat);
    scene.add(nepInnerGlow);

    // Outer glow
    const nepOuterGlowMat = new THREE.MeshPhongMaterial({
      color: 0x4a8eff, transparent: true, opacity: 0.08, side: THREE.BackSide
    });
    const nepOuterGlow = new THREE.Mesh(new THREE.SphereGeometry(1.78, 32, 32), nepOuterGlowMat);
    scene.add(nepOuterGlow);

    // Pulse glow (outermost)
    const nepPulseGlowMat = new THREE.MeshBasicMaterial({
      color: 0x3a7aff, transparent: true, opacity: 0.06, side: THREE.BackSide
    });
    const neptuneGlow = new THREE.Mesh(new THREE.SphereGeometry(1.95, 32, 32), nepPulseGlowMat);
    scene.add(neptuneGlow);

    // Neptune self point light (enhances glow)
    const nepGlowLight = new THREE.PointLight(0x3a7aff, 0.6, 14);
    scene.add(nepGlowLight);

    // Faint ring (thin, translucent)
    const nepRingMat = new THREE.MeshStandardMaterial({
      color: 0x88aacc, transparent: true, opacity: 0.22, side: THREE.DoubleSide
    });
    const nepRingMesh = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.05, 32, 160),
      nepRingMat
    );
    nepRingMesh.rotation.x = Math.PI / 2.2;
    nepRingMesh.rotation.z = 0.3;
    neptuneMesh.add(nepRingMesh);

    // Great Dark Spot
    const darkSpot = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x0a1a55, emissive: 0x000a33, emissiveIntensity: 0.3,
        transparent: true, opacity: 0.72
      })
    );
    darkSpot.position.set(1.44, 0.2, 0.3);
    neptuneMesh.add(darkSpot);

    // Atmospheric particles (blue, around Neptune)
    const nepAtmGeo = new THREE.BufferGeometry();
    const nepAtmPos = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const r = 1.7 + Math.random() * 0.9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      nepAtmPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      nepAtmPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.5;
      nepAtmPos[i * 3 + 2] = r * Math.cos(ph);
    }
    nepAtmGeo.setAttribute('position', new THREE.BufferAttribute(nepAtmPos, 3));
    const nepAtmParticles = new THREE.Points(nepAtmGeo,
      new THREE.PointsMaterial({
        color: 0x88aaff, size: 0.022,
        transparent: true, opacity: 0.4,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(nepAtmParticles);

    // ── 4 moons using pivot objects ──
    // Triton retrograde (negative speed), Nereid, Thalassa, Despina
    const moonData = [
      { name: 'Triton', r: 0.13, dist: 3.4, speed: -0.032, color: 0xc8b294, emissive: 0x221100 },
      { name: 'Nereid', r: 0.09, dist: 4.8, speed: 0.020, color: 0xaa9a7a, emissive: 0x000000 },
      { name: 'Thalassa', r: 0.07, dist: 5.8, speed: 0.044, color: 0x9a8a6a, emissive: 0x000000 },
      { name: 'Despina', r: 0.065, dist: 6.6, speed: 0.050, color: 0x8a7a5a, emissive: 0x000000 },
    ];

    const moons = moonData.map(d => {
      const pivot = new THREE.Object3D();
      // Triton: inclined retrograde orbit
      pivot.rotation.x = d.name === 'Triton' ? 0.52 : (Math.random() - 0.5) * 0.15;
      scene.add(pivot);

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.r, 24, 24),
        new THREE.MeshStandardMaterial({
          color: d.color, emissive: d.emissive,
          metalness: 0.15, roughness: 0.8,
          depthWrite: true, depthTest: true
        })
      );
      mesh.position.set(d.dist, 0, 0);
      pivot.add(mesh);

      // Orbit ring in pivot's tilted plane
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * d.dist, 0, Math.sin(a) * d.dist));
      }
      const orbitLine = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x88aaff, transparent: true, opacity: 0.25 })
      );
      pivot.add(orbitLine);

      return { pivot, mesh, orbitLine, speed: d.speed, name: d.name };
    });

    // ── Planets data ──
    // Speed follows Kepler's 3rd law: speed ∝ 1/√dist
    // Mercury (innermost) is fastest, Mars slowest
    const planetsData = [
      { r: 0.18, dist: 3.0, speed: 0.180, color: 0xbc9a6c, emissive: 0x000000 },  // Mercury
      { r: 0.22, dist: 4.0, speed: 0.156, color: 0xe6b800, emissive: 0x110800 },  // Venus
      { r: 0.26, dist: 5.1, speed: 0.138, color: 0x4488cc, emissive: 0x001122 },  // Earth
      { r: 0.20, dist: 6.2, speed: 0.125, color: 0xcc5533, emissive: 0x110000 },  // Mars
    ];

    const planets = planetsData.map(d => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.r, 32, 32),
        new THREE.MeshStandardMaterial({
          color: d.color, emissive: d.emissive,
          metalness: 0.2, roughness: 0.6
        })
      );
      mesh.castShadow = true;
      mesh.userData = { dist: d.dist, speed: d.speed, angle: Math.random() * Math.PI * 2 };
      scene.add(mesh);
      return mesh;
    });

    // Orbit rings — save references for visibility toggling
    const planetOrbits = planetsData.map(d => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * d.dist, 0, Math.sin(a) * d.dist));
      }
      const orbitLine = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x4466aa, transparent: true, opacity: 0.3 })
      );
      scene.add(orbitLine);
      return orbitLine;
    });

    // ── Animation ──
    let t = 0;
    let lastTime = performance.now();
    let animId = null;

    function animate() {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      t += delta;

      const light = isLight();

      // Show/hide sun vs neptune based on theme
      sunMesh.visible = light;
      glow1.visible = light;
      glow2.visible = light;
      pulseGlow.visible = light;
      heatParticles.visible = light;
      neptuneMesh.visible = !light;
      neptuneGlow.visible = !light;
      nepInnerGlow.visible = !light;
      nepOuterGlow.visible = !light;
      nepAtmParticles.visible = !light;
      moons.forEach(m => { m.pivot.visible = !light; });
      // Hide solar system planets in dark mode, show in light
      planets.forEach(p => { p.visible = light; });
      planetOrbits.forEach(o => { o.visible = light; });

      // Update scene background
      if (light) {
        scene.background = null;
        renderer.setClearColor(0x000000, 0);
      } else {
        scene.background = null;
        renderer.setClearColor(0x000000, 0);
      }

      // Sun pulse
      if (light) {
        const pulse = 1 + Math.sin(t * 3.5) * 0.04;
        pulseGlow.scale.setScalar(pulse);
        glow1.material.opacity = 0.28 + Math.sin(t * 2.5) * 0.07;
        glow2.material.opacity = 0.15 + Math.sin(t * 2.2) * 0.05;
        sunMat.emissiveIntensity = 1.9 + Math.sin(t * 2.8) * 0.3;
        sunLight.intensity = 2.0 + Math.sin(t * 2.5) * 0.3;
        heatParticles.rotation.y += 0.008;
        heatParticles.rotation.x += 0.004;
      }

      // Neptune animation — pulse glow, particles, moon orbits
      if (!light) {
        // Body pulse
        neptuneMat.emissiveIntensity = 0.35 + Math.sin(t * 1.2) * 0.08;
        nepGlowLight.intensity = 0.5 + Math.sin(t * 1.2) * 0.12;
        nepInnerGlowMat.opacity = 0.15 + Math.sin(t * 1.5) * 0.04;
        nepOuterGlowMat.opacity = 0.08 + Math.sin(t * 1.2) * 0.02;
        // Pulse glow scale
        const nepScale = 1 + Math.sin(t * 2.0) * 0.03;
        neptuneGlow.scale.setScalar(nepScale);
        // Self-rotation
        neptuneMesh.rotation.y += 0.005;
        nepAtmParticles.rotation.y += 0.002;
        nepAtmParticles.rotation.x += 0.001;
        // Scene light
        sunLight.color.set(0x3a7aff);
        sunLight.intensity = 1.2 + Math.sin(t * 1.4) * 0.15;
        // Moon orbits via pivot (Triton retrograde = negative speed)
        moons.forEach(m => {
          m.pivot.rotation.y += m.speed * delta;
          m.mesh.rotation.y += 0.006;
        });
      } else {
        sunLight.color.set(0xff6600);
      }

      // Orbit planets
      planets.forEach(p => {
        p.userData.angle += p.userData.speed * delta;
        p.position.set(
          Math.cos(p.userData.angle) * p.userData.dist,
          0,
          Math.sin(p.userData.angle) * p.userData.dist
        );
        p.rotation.y += 0.01;
      });

      // Star slow drift
      starField.rotation.y += 0.0003;

      renderer.render(scene, camera);
    }

    animate();

    // Stop old animation if theme changes and restart
    window._heroThreeCleanup = () => {
      if (animId) cancelAnimationFrame(animId);
      renderer.dispose();
      wrap.removeChild(renderer.domElement);
    };
  }

  function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [], shootingStar = null;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.01,
        color: ['#ffffff', '#aaccff', '#ffccaa', '#ccffcc'][Math.floor(Math.random() * 4)]
      });
    }

    function launchShootingStar() {
      shootingStar = {
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        len: 80 + Math.random() * 120,
        speed: 8 + Math.random() * 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: 1,
        done: false
      };
    }
    setInterval(launchShootingStar, 4000);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        stars.forEach(s => {
          s.a += s.da;
          if (s.a < 0.02) s.da = Math.abs(s.da);
          if (s.a > 0.15) s.da = -Math.abs(s.da);
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,100,40,${s.a * 0.25})`;
          ctx.fill();
        });
      } else {
        stars.forEach(s => {
          s.a += s.da;
          if (s.a < 0.1) s.da = Math.abs(s.da);
          if (s.a > 1) s.da = -Math.abs(s.da);
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
          ctx.fillStyle = s.color.replace(')', `,${s.a})`).replace('rgb', 'rgba').replace('#', '').length > 10
            ? s.color : s.color + Math.round(s.a * 255).toString(16).padStart(2, '0');
          ctx.globalAlpha = s.a;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        if (shootingStar && !shootingStar.done) {
          const ss = shootingStar;
          ctx.save();
          ctx.globalAlpha = ss.alpha;
          const grad = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - Math.cos(ss.angle) * ss.len,
            ss.y - Math.sin(ss.angle) * ss.len
          );
          grad.addColorStop(0, 'rgba(255,255,255,0.9)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.alpha -= 0.02;
          if (ss.alpha <= 0 || ss.x > w || ss.y > h) ss.done = true;
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== TOAST =====
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

})();