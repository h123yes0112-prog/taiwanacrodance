// ===== SHARED NAV GENERATOR for sub-pages =====
// Usage: include this script, then call initNav(currentPage)
function initNav(activePage) {
  const navLinks = [
    { id: 'news',     zh: '最新消息', en: 'News',          href: 'news.html' },
    { id: 'about',    zh: '關於協會', en: 'About',         href: '#',  hasDropdown: true,
      children: [
        { zh: '協會簡介', en: 'Introduction', href: 'about.html' },
        { zh: '協會章程', en: 'Charter',      href: 'charter.html' },
        { zh: '協會組織', en: 'Organization', href: 'organization.html' },
      ]
    },
    { id: 'dev',      zh: '協會發展', en: 'Development',   href: 'development.html' },
    { id: 'bigtop',   zh: '特技大鼎', en: 'BIG TOP',       href: 'bigtop.html' },
    { id: 'announce', zh: '公告事項', en: 'Announcements', href: 'announcements.html' },
    { id: 'contact',  zh: '聯絡我們', en: 'Contact',       href: 'index.html#contact' },
    { id: 'download', zh: '表單下載', en: 'Downloads',     href: 'downloads.html' },
  ];

  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.classList.add('scrolled');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <div class="logo-placeholder">🎪</div>
      <div class="logo-text">
        <span class="zh">臺灣特技舞蹈協會</span>
        <span class="en">TAIWAN ACROBATIC DANCE ASSOC.</span>
      </div>
    </a>
    <div class="nav-menu" id="navMenu">
      ${navLinks.map(l => l.hasDropdown ? `
        <div class="nav-item dropdown">
          <a class="nav-link${l.children.some(c=>c.href.replace('.html','')===activePage)?' active':''}" href="#">${l.zh} ▾</a>
          <div class="dropdown-menu">
            ${l.children.map(c=>`<a href="${c.href}"${c.href.replace('.html','')===activePage?' style="color:var(--gold)"':''}>${c.zh}</a>`).join('')}
          </div>
        </div>` : `
        <div class="nav-item">
          <a class="nav-link${l.id===activePage?' active':''}" href="${l.href}">${l.zh}</a>
        </div>`
      ).join('')}
      <div class="lang-toggle">
        <button class="lang-btn active" onclick="this.classList.add('active');this.nextElementSibling.classList.remove('active')">中</button>
        <button class="lang-btn" onclick="this.classList.add('active');this.previousElementSibling.classList.remove('active')">EN</button>
      </div>
    </div>
    <button class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>
  `;

  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });

  // Reveal on scroll
  document.querySelectorAll('.reveal').forEach(el => {
    new IntersectionObserver(([e]) => { if(e.isIntersecting) e.target.classList.add('visible'); }, {threshold:0.1}).observe(el);
  });
}
