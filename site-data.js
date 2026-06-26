


/* ===========================
   WR SITE DATA (single source of truth)
   Edit this file to update text, menu, links, hours, images.
   (No structural changes needed here; content keys map to HTML via data-t, data-bg, etc.)
   =========================== */
window.WR_SITE_DATA = {
  brand: {
    name: "Wholly Rolly!",
    domain: "whollyrolly.com",
    tagline: "Wholly Nutritious! Wholly Delicious!",
    kicker_left: "Premier • Crafted • Unique",
    kicker_right: "Sushi Bar",
  },

  links: {
    order_url: "https://cake.net/11566006",
    maps_query: "1525 N Main St #110B Bountiful UT 84010",
    phone: "385-601-9870",
    email: "",
    instagram: "",
  },

  location: {
    address_line1: "1525 N Main St #110B",
    address_line2: "Bountiful, UT 84010",
    hours_lines: ["Hours coming soon", "Order online for current availability"],
    parking_note: "Located at 1525 N Main St #110B in Bountiful. Add detailed parking notes here when finalized.",
  },

  images: {
    logo: "assets/logo.png",
    home_side: "assets/hero_side.jpg",
    menu_banner: "assets/menu.jpg",
    sushi101_banner: "assets/assets_hero.jpg",
    about_banner: "assets/hero_side.jpg",
    chibi_chef: "assets/logo.png",
    chibi_sidekick: "assets/logo.png",
  },

  home: {
    headline: "Premium Sushi for People Who Taste the Difference.",
    subhead:
      "Whole-fish thinking, Koshihikari rice, fresh wasabi, traditional soy sauce, and Sushi 101 education — served in a modern, approachable sushi bar." ,
    cta_primary: "Order Online",
    cta_secondary: "View Menu",
    cta_third: "Get Directions",
    stat1_title: "Pick-Up + Delivery",
    stat1_text: "Order through Cake — fast, simple, and fresh.",
    stat2_title: "Whole-Fish Thinking",
    stat2_text: "Limited cuts, better texture, and sushi that changes with what is best." ,
    badges: ["🍣 Premium Nigiri", "🌊 Whole-Fish Thinking", "✨ Sushi 101"],
    features: [
      {
        title: "Ingredient-obsessed",
        text: "Fish, rice, nori, soy sauce, wasabi, and knife work all matter. We build the bite from the foundation up.",
      },
      {
        title: "Premium, not pretentious",
        text: "A foodie-level sushi experience without the coat-and-tie atmosphere or generic all-you-can-eat feel.",
      },
      {
        title: "Sushi 101 included",
        text: "Learn what makes great sushi great — in a playful, easy-to-understand way.",
      },
    ],
    featured: [
      {
        title: "First time here?",
        text: "Start with a signature roll, a nigiri pairing, and the fresh wasabi + traditional soy sauce upgrade.",
      },
      {
        title: "Ask what is best today",
        text: "Some premium cuts are limited by the fish we receive. If something sells out, that is usually a quality signal.",
      },
      {
        title: "Classics, done carefully",
        text: "California, spicy tuna, salmon avocado, and other familiar rolls still get better rice, better balance, and better execution.",
      },
    ],
  },

  menu: {
    intro:
      "Premium sushi, real ingredients, and no shortcuts where it counts. Prices and availability may change as we finalize the live menu and source the best fish available." ,
    sections: [
      {
        id: "black-label",
        title: "Black Label",
        black_label: true,
        subtitle: "Our most premium selections — reserved for exceptional ingredients.",
        items: [
          { name: "Otoro Nigiri", desc: "Bluefin belly, the fattiest and most prized cut. Melts on contact.", price: "$—" },
          { name: "Ora King Salmon Nigiri", desc: "New Zealand Ora King — silky, rich, exceptional marbling.", price: "$—" },
          { name: "Uni Gunkan", desc: "Fresh sea urchin, clean ocean sweetness, delicate finish.", price: "$—" },
          { name: "A5 Wagyu Roll", desc: "Japanese A5 wagyu, truffle, gold leaf — a singular experience.", price: "$—" },
          { name: "Black Label Sashimi Plate", desc: "Chef's selection of today's finest cuts. Limited daily.", price: "$—" },
          { name: "King Crab Hand Roll", desc: "Alaskan king crab, house aioli, crisp nori, served immediately.", price: "$—" },
          { name: "Chutoro Sashimi", desc: "Medium-fat bluefin belly — rich, balanced, extraordinary.", price: "$—" },
        ],
      },
      {
        id: "sushi-rolls",
        title: "Sushi Rolls",
        items: [
          { name: "Wholly Rolly Signature", desc: "Our house roll — rich, bright, and balanced. Ask your server.", price: "$—" },
          { name: "Spicy Tuna", desc: "Spicy tuna blend, cucumber, crunch, bright finish.", price: "$—" },
          { name: "California", desc: "Crab, avocado, cucumber, sesame.", price: "$—" },
          { name: "Salmon Avocado", desc: "Atlantic salmon, ripe avocado, clean finish.", price: "$—" },
          { name: "Rainbow Roll", desc: "California base topped with assorted sashimi.", price: "$—" },
          { name: "Dragon Roll", desc: "Shrimp tempura inside, avocado on top, eel sauce.", price: "$—" },
          { name: "Hamachi Jalapeño", desc: "Yellowtail, jalapeño, yuzu ponzu — clean heat.", price: "$—" },
          { name: "Veggie Roll", desc: "Fresh cucumber, avocado, pickled radish, sesame.", price: "$—" },
        ],
      },
      {
        id: "nigiri",
        title: "Nigiri",
        subtitle: "Two pieces per order. Ask about today's premium cuts.",
        items: [
          { name: "Salmon", desc: "Atlantic salmon — buttery, mild, crowd favorite.", price: "$—" },
          { name: "Tuna", desc: "Yellowfin — clean, lean, bright red.", price: "$—" },
          { name: "Yellowtail", desc: "Hamachi — smooth, slightly sweet, rich but gentle.", price: "$—" },
          { name: "Shrimp", desc: "Ebi — naturally sweet, firm, classic.", price: "$—" },
          { name: "Scallop", desc: "Delicate, sweet, lightly torched.", price: "$—" },
          { name: "Eel", desc: "Unagi — grilled, glazed, warm and rich.", price: "$—" },
          { name: "Egg", desc: "Tamago — lightly sweet Japanese egg omelette.", price: "$—" },
          { name: "Daily Premium Cut", desc: "Ask your server — limited by what's best today.", price: "$—" },
        ],
      },
      {
        id: "sashimi",
        title: "Sashimi",
        subtitle: "Three slices per order. Pure fish, no rice.",
        items: [
          { name: "Salmon Sashimi", desc: "Atlantic salmon — clean, rich, buttery.", price: "$—" },
          { name: "Tuna Sashimi", desc: "Yellowfin — lean, firm, classic.", price: "$—" },
          { name: "Yellowtail Sashimi", desc: "Hamachi — mild, smooth, slightly sweet.", price: "$—" },
          { name: "Salmon + Tuna Combo", desc: "Three of each — a clean, crowd-pleasing pairing.", price: "$—" },
          { name: "Chef's Sashimi Plate", desc: "Today's best cuts, chef's selection. Ask what's in.", price: "$—" },
          { name: "Sablefish Sashimi", desc: "Black cod — extraordinarily buttery, silky, melt-in-mouth.", price: "$—" },
        ],
      },
      {
        id: "desserts",
        title: "Desserts",
        items: [
          { name: "Mochi Ice Cream", desc: "Assorted flavors — mango, strawberry, green tea.", price: "$—" },
          { name: "Matcha Cheesecake", desc: "House-made, earthy matcha, silky finish.", price: "$—" },
          { name: "Black Sesame Panna Cotta", desc: "Smooth, nutty, lightly sweet.", price: "$—" },
          { name: "Dorayaki", desc: "Japanese pancake sandwich, sweet red bean filling.", price: "$—" },
        ],
      },
      {
        id: "drinks",
        title: "Drinks",
        items: [
          { name: "Ramune", desc: "Japanese soda, assorted flavors.", price: "$—" },
          { name: "Calpico", desc: "Refreshing Japanese soft drink, lightly sweet.", price: "$—" },
          { name: "Matcha Latte", desc: "Hot or iced — house-prepared ceremonial matcha.", price: "$—" },
          { name: "Sparkling Water", desc: "Because balance.", price: "$—" },
          { name: "Japanese Green Tea", desc: "Hot brewed sencha.", price: "$—" },
          { name: "Yuzu Lemonade", desc: "Fresh yuzu citrus, light and bright.", price: "$—" },
        ],
      },
    ],
    sellout_note_title: "Why some cuts sell out",
    sellout_note_text:
      "At Wholly Rolly! we source whole fish whenever possible — but what that means depends on the fish. A bluefin tuna can weigh over 500 pounds. We don't bring in a whole one. Instead we work with our wholesaler to source specific sections of a whole fish — a belly block for otoro and chutoro, a loin for akami — cut to order from a single animal and delivered fresh. For most other fish we bring in the whole animal and break it down ourselves in house. For certain premium cuts like otoro, we may also source a large frozen section when a suitable fish is available and the quality meets our standard. The result is that some cuts are genuinely limited. A belly block only yields so much otoro. When it's gone, it's gone until the next suitable fish comes in. If something you want is sold out, ask your server what's exceptional right now — there's always something worth ordering.",
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

  reviews: {
    highlights: [
      { name: "Michelle Kelley", quote: "I have eaten sushi all over the world and the rolls I had here were among the best I have ever had." },
      { name: "Julien Lopez", quote: "The quality of this sushi compares to the highest scale sushi restaurants." },
      { name: "Beau Graham", quote: "Please try every nigiri and give yourself a little sampler. It is seriously good." },
    ],
  },

  fish: {
    title: "Fish Flavor Guide",
    subtitle: "A simple guide to the flavor, texture, richness, and best use of popular sushi fish.",
    sections: [
      { h: "Bluefin tuna", p: "Lean akami is clean and iron-rich; chutoro is balanced and buttery; otoro is intensely rich and best served simply." },
      { h: "Salmon", p: "Buttery, mild, crowd-pleasing, and excellent with citrus, herbs, light heat, or a gentle torch." },
      { h: "Hamachi", p: "Smooth, lightly sweet, and elegant with jalapeno, yuzu, ponzu, or clean nigiri presentation." },
      { h: "Escolar", p: "Very rich and buttery, but its waxy fats can be hard to digest. Keep portions small and use it intentionally." },
      { h: "Sablefish / black cod", p: "Silky, high-fat, delicate, and luxurious. Best when treated like a premium rich fish rather than a filler." },
      { h: "Scallop", p: "Sweet, delicate, and creamy. Works beautifully with citrus, yuzu kosho, light torching, or clean nigiri." },
    ],
  },

  nori: {
    title: "Nori 101",
    subtitle: "The wrapper is not just a wrapper. Great nori changes aroma, texture, and the whole bite.",
    sections: [
      { h: "Snap", p: "Good nori should crack cleanly when fresh. Limp, papery nori makes even good fillings feel flat." },
      { h: "Aroma", p: "Premium nori smells toasted, oceanic, and savory. That aroma hits before the fish does." },
      { h: "Timing", p: "Hand rolls are best eaten immediately because nori quality disappears quickly once it touches warm rice." },
    ],
  },

  rice: {
    title: "Rice 101",
    subtitle: "Sushi is built on rice. The fish is important, but the rice carries the whole bite.",
    sections: [
      { h: "Koshihikari", p: "Prized for sweetness, gloss, fragrance, and cohesive texture. It gives sushi rice its premium feel." },
      { h: "Water matters", p: "Water softness changes texture. We use selected bottled water to keep the rice clean, consistent, and tender." },
      { h: "Seasoning", p: "Vinegar, salt, sugar, temperature, and resting time determine whether rice tastes bright and balanced or flat." },
      { h: "Pressure and cooking", p: "A good cooker controls heat, steam, and pressure so the center and surface of each grain cook evenly." },
    ],
  },

  sides: {
    title: "Wasabi, Ginger & Soy Sauce",
    subtitle: "The supporting cast can elevate sushi — or overpower it.",
    sections: [
      { h: "Fresh wasabi", p: "Real grated wasabi is aromatic, gentle, and short-lived. It is different from the common horseradish-based green paste." },
      { h: "Soy sauce", p: "Less is often more. Traditionally, wasabi is placed on the rice or fish rather than stirred into soy sauce." },
      { h: "Ginger", p: "Ginger is a palate cleanser between bites, not a topping for every piece." },
      { h: "Premium pairing", p: "Fresh wasabi and traditional soy sauce make the most sense as a guided upgrade for guests ordering nigiri or premium cuts." },
    ],
  },

  about_location: {
    title: "About & Location",
    subtitle: "A modern sushi spot for foodies who want premium ingredients without a premium-stuffy atmosphere.",
    about_blocks: [
      {
        h: "Our philosophy",
        p: "Wholly Rolly! is built for people who notice the details: better rice, better nori, better fish handling, cleaner sauces, and a more intentional bite." ,
      },
      {
        h: "What makes us different",
        p: "We focus on whole-fish thinking, Koshihikari rice, selected water, fresh wasabi, traditional soy sauce, and education that helps guests understand what they are tasting." ,
      },
      {
        h: "Sushi 101 energy",
        p: "Sushi 101 is part of the brand: simple, visual education about rice, nori, fish cuts, wasabi, soy sauce, and why premium sushi tastes different." ,
      },
    ],
  },
};



