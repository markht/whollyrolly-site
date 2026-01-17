/* =========================================
   Wholly Rolly Site Script (single system)
   - Inject shared header/footer into #site-header / #site-footer
   - Apply WR_SITE_DATA content to data-t / data-a / data-bg placeholders
   - Build Menu + Info sections based on page
   - Mobile nav toggle (hamburger menu) for injected header
   ========================================= */
/* =========================================
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
    }, 5000);

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
    initNavToggle();
    fillYear();
    markActiveNav();
    initReviewCarousel();
  });
})();
