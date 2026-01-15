/* ===========================
   WR SITE DATA (single source of truth)
   Edit this file to update text, menu, links, hours, images.
   (No structural changes needed here; content keys map to HTML via data-t, data-bg, etc.)
   =========================== */
window.WR_SITE_DATA = {
  brand: {
    name: "Wholly Rolly!",
    domain: "whollyrolly.com",
    tagline: "Bold sushi. Beautifully made.",
    kicker_left: "Fresh • Crafted • Fun",
    kicker_right: "Sushi Bar",
  },

  links: {
    order_url: "https://cake.net/11566006",
    maps_query: "1525 N Main St #110B Bountiful UT 84010",
    phone: "801-891-9637",
    email: "PASTE_EMAIL_HERE",
    instagram: "@PASTE_HANDLE_HERE",
  },

  location: {
    address_line1: "1525 N Main St #110B",
    address_line2: "Bountiful, UT 84010",
    hours_lines: ["Mon–Thu: —", "Fri–Sat: —", "Sun: —"],
    parking_note: "Optional: Parking tips go here.",
  },

  images: {
    logo: "assets/logo.png",
    home_side: "assets/hero_side.jpg",
    menu_banner: "assets/menu.jpg",
    sushi101_banner: "assets/sushi101.jpg",
    about_banner: "assets/about.jpg",
    chibi_chef: "assets/chibi_chef.png",
    chibi_sidekick: "assets/chibi_sidekick.png",
  },

  home: {
    headline: "Wholly Nutritious! Wholly Delicoius!.",
    subhead:
      "Premium ingredients, careful technique, and a modern vibe — built for cravings and crafted with care.",
    cta_primary: "Order Online",
    cta_secondary: "View Menu",
    cta_third: "Get Directions",
    stat1_title: "Pick-Up + Delivery",
    stat1_text: "Order through Cake — fast, simple, and fresh.",
    stat2_title: "Premium Cuts",
    stat2_text: "Nigiri & sashimi that taste as good as they look.",
    badges: ["🔥 Signature Sushi", "🍣 Nigiri & Sashimi", "✨ Sushi 101"],
    features: [
      {
        title: "Quality-forward",
        text: "We obsess over fish, rice, nori, and knife work — so every bite is clean, balanced, and bright.",
      },
      {
        title: "Modern + fun",
        text: "Eye-catching, craveable, and built to share. Sushi should feel exciting.",
      },
      {
        title: "Sushi 101 included",
        text: "Learn what makes great sushi great — in a playful, easy-to-understand way.",
      },
    ],
    featured: [
      {
        title: "Signature Nigiri Set",
        text: "A premium lineup with clean flavor and perfect rice texture.",
      },
      {
        title: "Chef’s Special Sushi",
        text: "Rotating cuts and combos — when it’s gone, it’s gone.",
      },
      {
        title: "Classic Roll (done right)",
        text: "Familiar, but elevated — crisp nori, balanced seasoning, bright finish.",
      },
    ],
  },

  menu: {
    intro:
      "A clean, premium menu that’s easy to scan. Replace names, descriptions, and prices anytime in site-data.js.",
    sections: [
      {
        title: "Signature Sushi",
        items: [
          { name: "Wholly Rolly Signature", desc: "House favorite build — rich, bright, balanced.", price: "$—" },
          { name: "Inferno Sushi", desc: "Heat + sweetness + finish that lingers.", price: "$—" },
          { name: "Seasonal Special", desc: "Rotating premium cut combo.", price: "$—" },
        ],
      },
      {
        title: "Nigiri & Sashimi",
        items: [
          { name: "Salmon", desc: "Clean, buttery, fresh finish.", price: "$—" },
          { name: "Tuna", desc: "Bright, lean, classic.", price: "$—" },
          { name: "Premium Cut", desc: "Limited daily — ask what’s best today.", price: "$—" },
        ],
      },
      {
        title: "Classic Rolls",
        items: [
          { name: "California", desc: "Crab, avocado, cucumber, sesame.", price: "$—" },
          { name: "Spicy Tuna", desc: "Spicy tuna blend, crunch, bright finish.", price: "$—" },
          { name: "Veggie", desc: "Fresh, crisp, clean.", price: "$—" },
        ],
      },
      {
        title: "Drinks",
        items: [
          { name: "Ramune", desc: "Japanese soda (assorted flavors).", price: "$—" },
          { name: "Calpico", desc: "Refreshing and crisp.", price: "$—" },
          { name: "Water", desc: "Because balance.", price: "$—" },
        ],
      },
    ],
    sellout_note_title: "Heads up!",
    sellout_note_text:
      "Some sushi sells out when premium cuts run out. If your first pick is gone, ask what’s amazing today — we’ll guide you.",
  },

  order: {
    title: "Order Online",
    subtitle: "Fast pickup, simple delivery — powered by Cake.",
    card_title: "Ready to order?",
    card_text: "Tap below to go straight to our Cake ordering page.",
    steps: [
      { title: "Choose", text: "Pick your favorites — nigiri, sashimi, classics, and specials." },
      { title: "Checkout", text: "Select pickup/delivery and a time that works for you." },
      { title: "Enjoy", text: "Freshly made and beautifully packed — ready to crush." },
    ],
  },

  sushi101: {
    title: "Sushi 101",
    subtitle: "Playful, easy-to-understand sushi education — with our instructors.",
    cards: [
      {
        title: "Cuts & Quality",
        text: "Why some cuts cost more — like ribeye vs sirloin, but for fish.",
        link: "sushi-cuts-quality.html",
        link_text: "Explore cuts",
      },
      {
        title: "Aging, Rice & Nori",
        text: "Aged vs “fresh,” why Koshihikari matters, and how nori quality changes everything.",
        link: "sushi-aging-rice-nori.html",
        link_text: "Learn the details",
      },
      {
        title: "Sell-outs (whole fish)",
        text: "Why some sushi sells out when premium cuts are gone — and why that’s a good sign.",
        link: "#limited-cuts",
        link_text: "Read the convo",
      },
    ],
    limited: {
      hook: "“Wait… why is my sushi sold out?” 😮🍣",
      chef_title: "Chef Neko and Niko",
      chef_text:
        "Ah! Great question. Some of our sushi is limited each day because we break down whole fish for premium cuts. When a prized cut is gone, it’s gone until the next prep.",
      sidekick_title: "Niko",
      sidekick_text: "So it’s like… a cow only has so many ribeyes? 🐄",
      chef2_title: "Neko Chef",
      chef2_text:
        "Exactly. We could use pre-cut, pre-portioned fish to keep everything stocked… but premium texture and flavor often suffer. We choose quality over shortcuts.",
      footer: "If your first pick is gone, ask what’s amazing right now — we’ll point you to today’s best bite. ✨",
    },
  },

  cuts_quality: {
    title: "Cuts & Quality",
    subtitle: "Why some sushi costs more — explained like cuts of beef (but tastier).",
    sections: [
      {
        h: "Cuts are not equal",
        p: "Just like a cow has ribeye, sirloin, and brisket, fish has prized cuts and leaner cuts. Marbling, texture, and flavor intensity change the experience — and the cost.",
      },
      {
        h: "Handling & trim",
        p: "Premium sushi includes careful trimming, precise knife work, and timing. Great nigiri is as much about technique as the fish itself.",
      },
      {
        h: "Sourcing & season",
        p: "Some fish peaks in certain seasons. When a cut is at its best, it’s more limited — and more special.",
      },
    ],
  },

  aging_rice_nori: {
    title: "Aging, Rice & Nori",
    subtitle: "Where sushi gets its magic: flavor, aroma, texture — and tiny details.",
    sections: [
      {
        h: "Aged vs “fresh” fish",
        p: "Fresh isn’t always best. Controlled aging can deepen umami, soften texture, and make flavors bloom — when done correctly and safely.",
      },
      {
        h: "Koshihikari rice (our favorite)",
        p: "Koshihikari is prized for its sweetness, fragrance, and stickiness — perfect for clean, elegant nigiri. Great rice makes great sushi.",
      },
      {
        h: "Nori quality",
        p: "Better nori is darker, more aromatic, and snaps cleanly instead of turning papery. It changes the whole bite.",
      },
      {
        h: "Seasoning & water",
        p: "Rice seasoning, mineral balance, and temperature control affect clarity and texture. Small tweaks = big difference.",
      },
    ],
  },

  about_location: {
    title: "About & Location",
    subtitle: "A modern sushi spot built around craft, quality, and good vibes.",
    about_blocks: [
      {
        h: "Our philosophy",
        p: "We build sushi for people who care about flavor — clean, balanced, and craveable. No shortcuts where it counts.",
      },
      {
        h: "What makes us different",
        p: "Premium rice (Koshihikari), nori that snaps, and technique you can taste. Sushi should feel special — every time.",
      },
      {
        h: "Sushi 101 energy",
        p: "We love teaching what we love. If you’re curious, ask questions — we’re happy to nerd out.",
      },
    ],
  },
};

