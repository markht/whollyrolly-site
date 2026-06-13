* =========================================
   Wholly Rolly Site Script (single system)
   - Inject shared header/footer into #site-header / #site-footer
   - Apply WR_SITE_DATA content to data-t / data-a / data-bg placeholders
   - Build Menu + Info sections based on page
   - Mobile nav toggle (hamburger menu) for injected header
   - Review image carousel (homepage only)
   ========================================= */
(function () {
  const DATA = window.WR_SITE_DATA || {};
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );
  }

  function injectSharedLayout() {
    const headerMount = $("#site-header");
    const footerMount = $("#site-footer");

    if (headerMount) {
      const brandName = DATA.brand?.name || "Wholly Rolly!";
      const orderUrl = DATA.links?.order_url || "#";
      const logoSrc = DATA.images?.logo || "assets/logo.png";

      headerMount.innerHTML = `
        <header class="nav">
          <div class="container nav-inner">
            <a class="brand" href="index.html" aria-label="Home">
              <img class="brand-logo" src="${escapeHtml(logoSrc)}" alt="${escapeHtml(brandName)} logo" />
              <span data-t="brand_name">${escapeHtml(brandName)}</span>
            </a>
            <button class="hamburger" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="hamburger-lines" aria-hidden="true"></span>
            </button>
            <nav id="primary-nav" class="nav-links" aria-label="Primary">
              <a href="index.html">Home</a>
              <a href="menu.html">Menu</a>
              <a href="order.html">Order</a>
              <a href="sushi-101.html">Sushi 101</a>
              <a href="sushi-cuts-quality.html">Cuts &amp; Quality</a>
              <a href="sushi-aging-rice-nori.html">Aging, Rice &amp; Nori</a>
              <a href="about-location.html">About &amp; Location</a>
            </nav>
            <a class="cta" href="${escapeHtml(orderUrl)}" target="_blank" rel="noopener">
              <span class="dot" aria-hidden="true"></span>
              <span data-t="home_cta_primary">Order Online</span>
            </a>
            <a class="cta mobile-cta" href="${escapeHtml(orderUrl)}" target="_blank" rel="noopener">
              <span class="dot" aria-hidden="true"></span>
              Order
            </a>
          </div>
        </header>
      `;
    }

    if (footerMount) {
      const brandName = DATA.brand?.name || "Wholly Rolly!";
      const domain = DATA.brand?.domain || "";
      footerMount.innerHTML = `
        <footer class="footer">
          <div class="divider"></div>
          <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:space-between; align-items:center;">
            <div>© <span data-year></span> <span data-t="brand_name">${escapeHtml(brandName)}</span>
            ${domain ? `• <span data-t="brand_domain">${escapeHtml(domain)}</span>` : ""}</div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <a href="menu.html">Menu</a>
              <a href="sushi-101.html">Sushi 101</a>
              <a href="about-location.html">Location</a>
            </div>
          </div>
        </footer>
      `;
    }
  }

  // Apply all data-bg images from DATA.images
  function applyBackgroundImages() {
    document.querySelectorAll('[data-bg]').forEach(el => {
      const key = el.getAttribute('data-bg');
      const src = DATA.images?.[key];
      if (src) {
        el.style.backgroundImage = `url('${src}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });
  }

  function initNavToggle() {
    const header = $(".nav");
    if (!header) return;
    const btn = $(".hamburger", header);
    const links = $(".nav-links", header);
    if (!btn || !links) return;
    const setExpanded = (open) => btn.setAttribute("aria-expanded", String(open));
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      setExpanded(open);
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        setExpanded(false);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        links.classList.remove("open");
        setExpanded(false);
      }
    });
    setExpanded(false);
  }

  function fillYear() {
    const y = new Date().getFullYear();
    $$("[data-year]").forEach((el) => (el.textContent = String(y)));
  }

  function markActiveNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === path) a.classList.add("active");
    });
  }

  function buildMenu() {
    const mount = $("#menu-sections");
    if (!mount) return;
    const menu = DATA.menu;
    if (!menu || !menu.sections) return;

    // Sellout / whole fish notice at top
    if (menu.sellout_note_title) {
      const notice = document.createElement("div");
      notice.className = "menu-whole-fish-notice";
      notice.innerHTML = `
        <div class="wf-icon"><i class="ti ti-fish" aria-hidden="true"></i></div>
        <div>
          <h3 class="wf-title">${escapeHtml(menu.sellout_note_title)}</h3>
          <p class="wf-text">${escapeHtml(menu.sellout_note_text)}</p>
        </div>
      `;
      mount.before(notice);
    }

    // Build sticky jump bar
    const jumpBar = document.createElement("div");
    jumpBar.className = "menu-jump-bar";
    jumpBar.innerHTML = `
      <div class="menu-jump-inner">
        <span class="menu-jump-label">Jump to</span>
        ${menu.sections.map(s => `
          <a class="menu-jump-link${s.black_label ? " bl" : ""}" href="#${s.id || s.title.toLowerCase().replace(/\s+/g,"-")}">
            ${s.black_label ? "⬛ " : ""}${s.title}
          </a>
        `).join("")}
      </div>
    `;
    mount.before(jumpBar);

    // Build each section
    menu.sections.forEach(section => {
      const id = section.id || section.title.toLowerCase().replace(/\s+/g, "-");
      const isBlackLabel = !!section.black_label;

      const sec = document.createElement("div");
      sec.className = "menu-section" + (isBlackLabel ? " menu-section--bl" : "");
      sec.id = id;

      const header = `
        <div class="menu-section-header">
          ${isBlackLabel ? '<span class="bl-badge">⬛ Black Label</span>' : ""}
          <h2 class="menu-section-title">${escapeHtml(section.title)}</h2>
          ${section.subtitle ? `<p class="menu-section-subtitle">${escapeHtml(section.subtitle)}</p>` : ""}
        </div>
      `;

      const items = section.items.map(item => `
        <div class="menu-item${isBlackLabel ? " menu-item--bl" : ""}">
          <div class="menu-item-main">
            <span class="menu-item-name">${escapeHtml(item.name)}</span>
            <span class="menu-item-price">${escapeHtml(item.price)}</span>
          </div>
          <p class="menu-item-desc">${escapeHtml(item.desc)}</p>
        </div>
      `).join("");

      sec.innerHTML = header + `<div class="menu-items-grid">${items}</div>`;
      mount.appendChild(sec);
    });

  }

  function initStickyJumpBar() {
    const bar = document.querySelector(".menu-jump-bar");
    if (!bar) return;
    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    bar.before(sentinel);
    const observer = new IntersectionObserver(([e]) => {
      bar.classList.toggle("stuck", !e.isIntersecting);
    }, { threshold: 1.0 });
    observer.observe(sentinel);
  }

  function initReviewCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselContainer || !carouselTrack) return;

    const originalImages = Array.from(carouselTrack.children);
    const totalImages = originalImages.length;
    let visibleCount = 3;
    if (window.innerWidth <= 600) visibleCount = 1;
    else if (window.innerWidth <= 900) visibleCount = 2;

    for (let i = 0; i < visibleCount; i++) {
      carouselTrack.appendChild(originalImages[i].cloneNode(true));
    }
    for (let i = 0; i < visibleCount; i++) {
      const cloneIndex = totalImages - 1 - i;
      carouselTrack.insertBefore(originalImages[cloneIndex].cloneNode(true), carouselTrack.firstChild);
    }

    let currentSlide = 0;
    const totalSlides = Math.ceil(totalImages / visibleCount);
    const updateSlidePosition = (index, animate = true) => {
      carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
      const containerWidth = carouselContainer.clientWidth;
      carouselTrack.style.transform = `translateX(-${(index + 1) * containerWidth}px)`;
    };

    updateSlidePosition(currentSlide, false);
    setInterval(() => {
      currentSlide++;
      updateSlidePosition(currentSlide);
    }, 10000);

    const prevButton = document.querySelector('.carousel-arrow.left');
    const nextButton = document.querySelector('.carousel-arrow.right');
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        currentSlide--;
        updateSlidePosition(currentSlide);
      });
      nextButton.addEventListener('click', () => {
        currentSlide++;
        updateSlidePosition(currentSlide);
      });
    }

    carouselTrack.addEventListener('transitionend', () => {
      if (currentSlide >= totalSlides) {
        currentSlide = 0;
        updateSlidePosition(currentSlide, false);
      } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
        updateSlidePosition(currentSlide, false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectSharedLayout();
    applyBackgroundImages();
    buildMenu();
    initStickyJumpBar();
    initNavToggle();
    fillYear();
    markActiveNav();
    initReviewCarousel();
  });
})();

