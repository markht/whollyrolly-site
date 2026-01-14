/* =========================================
   Wholly Rolly Site Script (single system)
   - Inject shared header/footer into #site-header / #site-footer
   - Apply WR_SITE_DATA content to data-t / data-a / data-bg placeholders
   - Build Menu + Info sections based on page
   - Mobile nav toggle (hamburger menu) for injected header
   ========================================= */
(function () {
  const DATA = window.WR_SITE_DATA || {};
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m])
    );
  }

  /* ===========================
     Shared Header/Footer Injection
     =========================== */
  function injectSharedLayout() {
    const headerMount = $("#site-header");
    const footerMount = $("#site-footer");

    if (headerMount) {
      const brandName = DATA.brand?.name || "Wholly Rolly!";
      const orderUrl = DATA.links?.order_url || "#";
      const logoSrc = DATA.images?.logo || "assets/logo.png";

      // Inject the shared header HTML into the header mount point
      headerMount.innerHTML = `
        <header class="nav">
          <div class="container nav-inner">
            <a class="brand" href="index.html" aria-label="Home">
              <img class="brand-logo" src="${escapeHtml(logoSrc)}" alt="${escapeHtml(brandName)} logo" />
              <span data-t="brand_name">${escapeHtml(brandName)}</span>
            </a>

            <button class="hamburger" type="button"
              aria-controls="primary-nav"
              aria-expanded="false"
              aria-label="Toggle navigation">
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
      // Inject the shared footer HTML into the footer mount point
      footerMount.innerHTML = `
        <footer class="footer">
          <div class="divider"></div>
          <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:space-between; align-items:center;">
            <div>© <span data-year></span> <span data-t="brand_name">${escapeHtml(brandName)}</span> ${
        domain ? `• <span data-t="brand_domain">${escapeHtml(domain)}</span>` : ""
      }</div>
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

  /* ===========================
     Mobile Nav Toggle Behavior
     =========================== */
  function initNavToggle() {
    const header = $(".nav");
    if (!header) return;

    const btn = $(".hamburger", header);
    const links = $(".nav-links", header);
    if (!btn || !links) return;

    const setExpanded = (open) => btn.setAttribute("aria-expanded", String(open));

    // Toggle the mobile nav open/closed when the hamburger is clicked
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      setExpanded(open);
    });

    // Close the nav menu when any link is clicked (on mobile)
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        setExpanded(false);
      }
    });

    // If the window is resized beyond mobile width, ensure nav is closed/reset
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        links.classList.remove("open");
        setExpanded(false);
      }
    });

    setExpanded(false);
  }

  /* ===========================
     Data binding helper functions
     =========================== */
  function setText(key, value) {
    $$(`[data-t="${key}"]`).forEach((el) => (el.textContent = value ?? ""));
  }

  function setAttr(key, value) {
    $$(`[data-a="${key}"]`).forEach((el) => {
      const attr = el.getAttribute("data-attr") || "href";
      if (value) el.setAttribute(attr, value);
    });
  }

  function setBg(key, url) {
    $$(`[data-bg="${key}"]`).forEach((el) => {
      if (url && !String(url).includes("PASTE_")) {
        el.classList.add("has-img");                   // Mark element as having a loaded image (for CSS styling)
        el.style.backgroundImage = `url('${url}')`;
        el.removeAttribute("data-placeholder");        // Remove placeholder text when image is set
      }
    });
  }

  function fillYear() {
    const y = new Date().getFullYear();
    $$("[data-year]").forEach((el) => (el.textContent = String(y)));
  }

  function markActiveNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === path) a.classList.add("active");    // Highlight current page link
    });
  }

  /* ===========================
     Page-Specific Content Builders
     =========================== */
  function buildMenu() {
    if (document.body.getAttribute("data-page") !== "menu") return;
    const holder = document.getElementById("menu-sections");
    if (!holder) return;

    const sections = DATA.menu?.sections || [];
    holder.innerHTML = sections
      .map((sec) => {
        const items = (sec.items || [])
          .map(
            (it) => `
            <div class="item">
              <div>
                <div class="name">${escapeHtml(it.name || "")}</div>
                <div class="desc">${escapeHtml(it.desc || "")}</div>
              </div>
              <div class="price">${escapeHtml(it.price || "")}</div>
            </div>
          `
          )
          .join("");

        return `
          <div class="card menu-card">
            <h2>${escapeHtml(sec.title || "")}</h2>
            ${items}
          </div>
        `;
      })
      .join("");
  }

  function buildInfoSections() {
    const page = document.body.getAttribute("data-page");
    const cfg = {
      cuts: { key: "cuts_quality", id: "cuts-sections" },      // for sushi-cuts-quality page
      aging: { key: "aging_rice_nori", id: "aging-sections" }, // for sushi-aging-rice-nori page
    }[page];

    if (!cfg) return;
    const holder = document.getElementById(cfg.id);
    if (!holder) return;

    const sections = DATA[cfg.key]?.sections || [];
    holder.innerHTML = sections
      .map(
        (s) => `
        <div class="card feature">
          <h3>${escapeHtml(s.h || "")}</h3>
          <p>${escapeHtml(s.p || "")}</p>
        </div>
      `
      )
      .join("");
  }

  /* ===========================
     Apply Dynamic Data to Page
     =========================== */
  function applyData() {
    // Brand text
    setText("brand_name", DATA.brand?.name || "Wholly Rolly!");
    setText("brand_domain", DATA.brand?.domain || "");
    setText("brand_tagline", DATA.brand?.tagline || "");
    setText("brand_kicker_left", DATA.brand?.kicker_left || "");
    setText("brand_kicker_right", DATA.brand?.kicker_right || "");

    // Links (hrefs and text)
    setAttr("order_url", DATA.links?.order_url || "");
    setAttr("phone_href", DATA.links?.phone ? `tel:${DATA.links.phone}` : "");
    setText("phone_text", DATA.links?.phone || "");
    setText("email_text", DATA.links?.email || "");
    setAttr("email_href", DATA.links?.email ? `mailto:${DATA.links.email}` : "");
    setText("instagram_text", DATA.links?.instagram || "");

    // Location details
    setText("loc_line1", DATA.location?.address_line1 || "");
    setText("loc_line2", DATA.location?.address_line2 || "");
    setText("parking_note", DATA.location?.parking_note || "");
    const hoursEl = document.getElementById("hours-lines");
    if (hoursEl && Array.isArray(DATA.location?.hours_lines)) {
      hoursEl.innerHTML = DATA.location.hours_lines
        .map((x) => `<div>${escapeHtml(x)}</div>`)
        .join("");
    }
    const addr = `${DATA.location?.address_line1 || ""} ${DATA.location?.address_line2 || ""}`.trim();
    const query = encodeURIComponent(
      addr && !addr.includes("PASTE") ? addr : DATA.links?.maps_query || ""
    );
    const mapsUrl = query ? `https://www.google.com/maps/search/?api=1&query=${query}` : "";
    setAttr("maps_url", mapsUrl);

    // Images (set background images for elements with data-bg)
    setBg("home_side", DATA.images?.home_side);
    setBg("menu_banner", DATA.images?.menu_banner);
    setBg("sushi101_banner", DATA.images?.sushi101_banner);
    setBg("about_banner", DATA.images?.about_banner);
    setBg("chibi_chef", DATA.images?.chibi_chef);
    setBg("chibi_sidekick", DATA.images?.chibi_sidekick);

    // Home page content
    setText("home_headline", DATA.home?.headline || "");
    setText("home_subhead", DATA.home?.subhead || "");
    setText("home_cta_primary", DATA.home?.cta_primary || "Order Online");
    setText("home_cta_secondary", DATA.home?.cta_secondary || "View Menu");
    setText("home_cta_third", DATA.home?.cta_third || "Get Directions");
    setText("home_stat1_title", DATA.home?.stat1_title || "");
    setText("home_stat1_text", DATA.home?.stat1_text || "");
    setText("home_stat2_title", DATA.home?.stat2_title || "");
    setText("home_stat2_text", DATA.home?.stat2_text || "");
    const badgesEl = document.getElementById("home-badges");
    if (badgesEl && Array.isArray(DATA.home?.badges)) {
      badgesEl.innerHTML = DATA.home.badges
        .map((b) => `<span class="badge">${escapeHtml(b)}</span>`)
        .join("");
    }
    const featsEl = document.getElementById("home-features");
    if (featsEl && Array.isArray(DATA.home?.features)) {
      featsEl.innerHTML = DATA.home.features
        .map(
          (f) => `
          <div class="card feature">
            <h3>${escapeHtml(f.title || "")}</h3>
            <p>${escapeHtml(f.text || "")}</p>
          </div>
        `
        )
        .join("");
    }
    const featuredEl = document.getElementById("home-featured");
    if (featuredEl && Array.isArray(DATA.home?.featured)) {
      featuredEl.innerHTML = DATA.home.featured
        .map(
          (f) => `
          <div class="card feature">
            <h3>${escapeHtml(f.title || "")}</h3>
            <p>${escapeHtml(f.text || "")}</p>
          </div>
        `
        )
        .join("");
    }

    // Menu page content
    setText("menu_intro", DATA.menu?.intro || "");
    setText("menu_sellout_title", DATA.menu?.sellout_note_title || "");
    setText("menu_sellout_text", DATA.menu?.sellout_note_text || "");

    // Order page content
    setText("order_title", DATA.order?.title || "");
    setText("order_subtitle", DATA.order?.subtitle || "");
    setText("order_card_title", DATA.order?.card_title || "");
    setText("order_card_text", DATA.order?.card_text || "");
    const stepsEl = document.getElementById("order-steps");
    if (stepsEl && Array.isArray(DATA.order?.steps)) {
      stepsEl.innerHTML = DATA.order.steps
        .map(
          (s) => `
          <div class="card feature">
            <h3>${escapeHtml(s.title || "")}</h3>
            <p>${escapeHtml(s.text || "")}</p>
          </div>
        `
        )
        .join("");
    }

    // Sushi 101 page content
    setText("s101_title", DATA.sushi101?.title || "");
    setText("s101_subtitle", DATA.sushi101?.subtitle || "");
    const cardsEl = document.getElementById("s101-cards");
    if (cardsEl && Array.isArray(DATA.sushi101?.cards)) {
      cardsEl.innerHTML = DATA.sushi101.cards
        .map(
          (c) => `
          <div class="card feature">
            <h3>${escapeHtml(c.title || "")}</h3>
            <p>${escapeHtml(c.text || "")}</p>
            <div class="actions" style="margin-top:12px;">
              <a class="btn" href="${escapeHtml(c.link || "#")}">${escapeHtml(c.link_text || "Learn more")}</a>
            </div>
          </div>
        `
        )
        .join("");
    }
    setText("lc_hook", DATA.sushi101?.limited?.hook || "");
    setText("lc_b1_title", DATA.sushi101?.limited?.chef_title || "");
    setText("lc_b1_text", DATA.sushi101?.limited?.chef_text || "");
    setText("lc_b2_title", DATA.sushi101?.limited?.sidekick_title || "");
    setText("lc_b2_text", DATA.sushi101?.limited?.sidekick_text || "");
    setText("lc_b3_title", DATA.sushi101?.limited?.chef2_title || "");
    setText("lc_b3_text", DATA.sushi101?.limited?.chef2_text || "");
    setText("lc_footer", DATA.sushi101?.limited?.footer || "");

    // Cuts & Aging info pages content
    setText("cuts_title", DATA.cuts_quality?.title || "");
    setText("cuts_subtitle", DATA.cuts_quality?.subtitle || "");
    setText("aging_title", DATA.aging_rice_nori?.title || "");
    setText("aging_subtitle", DATA.aging_rice_nori?.subtitle || "");
    setText("al_title", DATA.about_location?.title || "");
    setText("al_subtitle", DATA.about_location?.subtitle || "");
    const aboutEl = document.getElementById("about-blocks");
    if (aboutEl && Array.isArray(DATA.about_location?.about_blocks)) {
      aboutEl.innerHTML = DATA.about_location.about_blocks
        .map(
          (b) => `
          <div class="card feature">
            <h3>${escapeHtml(b.h || "")}</h3>
            <p>${escapeHtml(b.p || "")}</p>
          </div>
        `
        )
        .join("");
    }

    // Build dynamic sections for Menu and Info pages
    buildMenu();
    buildInfoSections();
    fillYear();
    markActiveNav();
  }

  // Initialize the site after DOM content is loaded
  document.addEventListener("DOMContentLoaded", () => {
    injectSharedLayout();  /* Inject shared header and footer into placeholders */
    initNavToggle();       /* Initialize hamburger menu functionality */
    applyData();           /* Populate all dynamic content */
  });
})();

