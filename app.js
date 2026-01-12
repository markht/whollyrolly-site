(function(){
  const DATA = window.WR_SITE_DATA || {};
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function setText(key, value){
    $$(`[data-t="${key}"]`).forEach(el => el.textContent = value ?? "");
  }

  function setAttr(key, value){
    $$(`[data-a="${key}"]`).forEach(el => {
      const attr = el.getAttribute("data-attr") || "href";
      if(value) el.setAttribute(attr, value);
    });
  }

  function setBg(key, url){
    $$(`[data-bg="${key}"]`).forEach(el => {
      if(url && !String(url).includes("PASTE_")){
        el.classList.add("has-img");
        el.style.backgroundImage = `url('${url}')`;
        el.removeAttribute("data-placeholder");
      }
    });
  }

  function fillYear(){
    const y = new Date().getFullYear();
    $$("[data-year]").forEach(el => el.textContent = y);
  }

  function markActiveNav(){
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-links a").forEach(a=>{
      const href = (a.getAttribute("href")||"").toLowerCase();
      if(href === path) a.classList.add("active");
    });
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function buildMenu(){
    if(document.body.getAttribute("data-page") !== "menu") return;
    const holder = document.getElementById("menu-sections");
    if(!holder) return;
    const sections = DATA.menu?.sections || [];
    holder.innerHTML = sections.map(sec=>{
      const items = (sec.items||[]).map(it=>`
        <div class="item">
          <div>
            <div class="name">${escapeHtml(it.name||"")}</div>
            <div class="desc">${escapeHtml(it.desc||"")}</div>
          </div>
          <div class="price">${escapeHtml(it.price||"")}</div>
        </div>
      `).join("");
      return `
        <div class="card menu-card">
          <h2>${escapeHtml(sec.title||"")}</h2>
          ${items}
        </div>
      `;
    }).join("");
  }

  function buildInfoSections(){
    const page = document.body.getAttribute("data-page");
    const cfg = {
      "cuts": {key:"cuts_quality", id:"cuts-sections"},
      "aging": {key:"aging_rice_nori", id:"aging-sections"}
    }[page];
    if(!cfg) return;
    const holder = document.getElementById(cfg.id);
    if(!holder) return;
    const sections = DATA[cfg.key]?.sections || [];
    holder.innerHTML = sections.map(s=>`
      <div class="card feature">
        <h3>${escapeHtml(s.h||"")}</h3>
        <p>${escapeHtml(s.p||"")}</p>
      </div>
    `).join("");
  }

  function applyData(){
    // Brand
    setText("brand_name", DATA.brand?.name || "Wholly Rolly!");
    setText("brand_tagline", DATA.brand?.tagline || "");
    setText("brand_kicker_left", DATA.brand?.kicker_left || "");
    setText("brand_kicker_right", DATA.brand?.kicker_right || "");
    setText("brand_domain", DATA.brand?.domain || "");

    // Links
    setAttr("order_url", DATA.links?.order_url || "");
    setAttr("phone_href", DATA.links?.phone ? `tel:${DATA.links.phone}` : "");

    setText("phone_text", DATA.links?.phone || "");
    setText("email_text", DATA.links?.email || "");
    setAttr("email_href", DATA.links?.email ? `mailto:${DATA.links.email}` : "");
    setText("instagram_text", DATA.links?.instagram || "");

    // Location
    setText("loc_line1", DATA.location?.address_line1 || "");
    setText("loc_line2", DATA.location?.address_line2 || "");
    setText("parking_note", DATA.location?.parking_note || "");
    const hoursEl = document.getElementById("hours-lines");
    if(hoursEl && Array.isArray(DATA.location?.hours_lines)){
      hoursEl.innerHTML = DATA.location.hours_lines.map(x=>`<div>${escapeHtml(x)}</div>`).join("");
    }
    const addr = `${DATA.location?.address_line1||""} ${DATA.location?.address_line2||""}`.trim();
    const q = encodeURIComponent(addr && !addr.includes("PASTE") ? addr : (DATA.links?.maps_query || ""));
    const mapsUrl = q ? `https://www.google.com/maps/search/?api=1&query=${q}` : "";
    setAttr("maps_url", mapsUrl);

    // Images
    setBg("home_side", DATA.images?.home_side);
    setBg("menu_banner", DATA.images?.menu_banner);
    setBg("sushi101_banner", DATA.images?.sushi101_banner);
    setBg("about_banner", DATA.images?.about_banner);
    setBg("chibi_chef", DATA.images?.chibi_chef);
    setBg("chibi_sidekick", DATA.images?.chibi_sidekick);

    // Home
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
    if(badgesEl && Array.isArray(DATA.home?.badges)){
      badgesEl.innerHTML = DATA.home.badges.map(b=>`<span class="badge">${escapeHtml(b)}</span>`).join("");
    }
    const featsEl = document.getElementById("home-features");
    if(featsEl && Array.isArray(DATA.home?.features)){
      featsEl.innerHTML = DATA.home.features.map(f=>`
        <div class="card feature">
          <h3>${escapeHtml(f.title||"")}</h3>
          <p>${escapeHtml(f.text||"")}</p>
        </div>
      `).join("");
    }
    const featuredEl = document.getElementById("home-featured");
    if(featuredEl && Array.isArray(DATA.home?.featured)){
      featuredEl.innerHTML = DATA.home.featured.map(f=>`
        <div class="card feature">
          <h3>${escapeHtml(f.title||"")}</h3>
          <p>${escapeHtml(f.text||"")}</p>
        </div>
      `).join("");
    }

    // Menu note
    setText("menu_intro", DATA.menu?.intro || "");
    setText("menu_sellout_title", DATA.menu?.sellout_note_title || "");
    setText("menu_sellout_text", DATA.menu?.sellout_note_text || "");

    // Order
    setText("order_title", DATA.order?.title || "");
    setText("order_subtitle", DATA.order?.subtitle || "");
    setText("order_card_title", DATA.order?.card_title || "");
    setText("order_card_text", DATA.order?.card_text || "");
    const stepsEl = document.getElementById("order-steps");
    if(stepsEl && Array.isArray(DATA.order?.steps)){
      stepsEl.innerHTML = DATA.order.steps.map(s=>`
        <div class="card feature">
          <h3>${escapeHtml(s.title||"")}</h3>
          <p>${escapeHtml(s.text||"")}</p>
        </div>
      `).join("");
    }

    // Sushi 101
    setText("s101_title", DATA.sushi101?.title || "");
    setText("s101_subtitle", DATA.sushi101?.subtitle || "");
    const cardsEl = document.getElementById("s101-cards");
    if(cardsEl && Array.isArray(DATA.sushi101?.cards)){
      cardsEl.innerHTML = DATA.sushi101.cards.map(c=>`
        <div class="card feature">
          <h3>${escapeHtml(c.title||"")}</h3>
          <p>${escapeHtml(c.text||"")}</p>
          <div class="actions" style="margin-top:12px;">
            <a class="btn" href="${escapeHtml(c.link||"#")}">${escapeHtml(c.link_text||"Learn more")}</a>
          </div>
        </div>
      `).join("");
    }
    setText("lc_hook", DATA.sushi101?.limited?.hook || "");
    setText("lc_b1_title", DATA.sushi101?.limited?.chef_title || "");
    setText("lc_b1_text", DATA.sushi101?.limited?.chef_text || "");
    setText("lc_b2_title", DATA.sushi101?.limited?.sidekick_title || "");
    setText("lc_b2_text", DATA.sushi101?.limited?.sidekick_text || "");
    setText("lc_b3_title", DATA.sushi101?.limited?.chef2_title || "");
    setText("lc_b3_text", DATA.sushi101?.limited?.chef2_text || "");
    setText("lc_footer", DATA.sushi101?.limited?.footer || "");

    // Cuts/Aging/About&Location
    setText("cuts_title", DATA.cuts_quality?.title || "");
    setText("cuts_subtitle", DATA.cuts_quality?.subtitle || "");
    setText("aging_title", DATA.aging_rice_nori?.title || "");
    setText("aging_subtitle", DATA.aging_rice_nori?.subtitle || "");
    setText("al_title", DATA.about_location?.title || "");
    setText("al_subtitle", DATA.about_location?.subtitle || "");

    const aboutEl = document.getElementById("about-blocks");
    if(aboutEl && Array.isArray(DATA.about_location?.about_blocks)){
      aboutEl.innerHTML = DATA.about_location.about_blocks.map(b=>`
        <div class="card feature">
          <h3>${escapeHtml(b.h||"")}</h3>
          <p>${escapeHtml(b.p||"")}</p>
        </div>
      `).join("");
    }

    buildMenu();
    buildInfoSections();
    fillYear();
    markActiveNav();
  }

  // Smooth scroll for in-page anchors
  document.addEventListener("click", (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
  function initNavToggle(){
    const toggle = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 900){
        if(nav.classList.contains('open')) nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{ applyData(); initNavToggle(); });
})();
/* ===========================
   APP BOOTSTRAP
   - Injects a shared header/footer into every page
   - Handles mobile hamburger toggle
   =========================== */

(function () {
  // ---- Helper: safe selector ----
  const $ = (sel, root = document) => root.querySelector(sel);

  // ---- Read shared config (from site-data.js) ----
  const data = window.SITE_DATA || {};
  const brandName = data.brand?.name || "Wholly Rolly!";
  const orderUrl = data.links?.orderUrl || "#";
  const addressLine = data.location?.addressLine || "";
  const logoSrc = data.images?.logo || "";

  /* ===========================
     HEADER TEMPLATE
     - Uses data attributes for a reliable toggle state
     - aria-* improves accessibility and mobile behavior
     =========================== */
  const headerHTML = `
    <header class="site-header" data-menu="closed">
      <div class="site-header__inner">
        <a class="brand" href="index.html" aria-label="${brandName} home">
          ${logoSrc ? `<img class="brand__logo" src="${logoSrc}" alt="${brandName} logo">` : ""}
          <span class="brand__name">${brandName}</span>
        </a>

        <!-- Hamburger button: only visible on small screens via CSS -->
        <button class="nav-toggle" type="button"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="site-nav">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>

        <nav id="site-nav" class="site-nav" aria-label="Primary">
          <a class="site-nav__link" href="menu.html">Menu</a>
          <a class="site-nav__link" href="order.html">Order</a>
          <a class="site-nav__link" href="sushi-101.html">Sushi 101</a>
          <a class="site-nav__link" href="about-location.html">Location</a>

          <!-- Primary CTA: always points to Cake -->
          <a class="site-nav__cta" href="${orderUrl}" target="_blank" rel="noopener">Order Online</a>
        </nav>
      </div>
    </header>
  `;

  /* ===========================
     FOOTER TEMPLATE
     - Shares address + includes order link again
     =========================== */
  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">${brandName}</div>
        ${addressLine ? `<div class="site-footer__address">${addressLine}</div>` : ""}
        <div class="site-footer__links">
          <a href="${orderUrl}" target="_blank" rel="noopener">Order (Cake)</a>
        </div>
      </div>
    </footer>
  `;

  /* ===========================
     INJECT HEADER/FOOTER
     - Requires <div id="site-header"></div> and <div id="site-footer"></div> in HTML
     =========================== */
  function injectSharedLayout() {
    const headerMount = $("#site-header");
    const footerMount = $("#site-footer");

    if (headerMount) headerMount.innerHTML = headerHTML;
    if (footerMount) footerMount.innerHTML = footerHTML;
  }

  /* ===========================
     MOBILE MENU TOGGLE
     - Toggles data-menu="open|closed"
     - Updates aria-expanded for accessibility
     - Closes menu on link click (mobile)
     =========================== */
  function setupMobileMenu() {
    const header = $(".site-header");
    if (!header) return;

    const toggleBtn = $(".nav-toggle", header);
    const nav = $("#site-nav", header);

    if (!toggleBtn || !nav) return;

    const setState = (state) => {
      header.setAttribute("data-menu", state);
      const isOpen = state === "open";
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    };

    toggleBtn.addEventListener("click", () => {
      const current = header.getAttribute("data-menu") || "closed";
      setState(current === "open" ? "closed" : "open");
    });

    // Close after clicking a nav link on mobile
    nav.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      setState("closed");
    });

    // Close if you resize from mobile to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) setState("closed");
    });

    // Default closed
    setState("closed");
  }

  /* ===========================
     INIT
     =========================== */
  document.addEventListener("DOMContentLoaded", () => {
    injectSharedLayout();
    setupMobileMenu();
  });
})();

