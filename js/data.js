/* ==========================================================================
   FRAGNIVO: everything you are likely to change lives in this one file.
   Change a price or a phone number here and the whole site updates.
   After changing anything, run "Build Site.bat" to refresh the upload folder.
   ========================================================================== */

var FRAGNIVO_CONFIG = {
  // PLACEHOLDERS: replace these with the real details before going live.
  siteUrl: "https://ryceon.github.io/FRAGNIVO", // change to your real web address at launch, no slash at the end
  previewMode: true,                  // keeps the preview out of Google. Set to false at launch
  whatsapp: "94700000000",            // country code + number, no + or spaces
  phoneDisplay: "+94 70 000 0000",
  phoneLink: "+94700000000",
  email: "hello@example.com",

  // Paste your full page links between the quotes, for example "https://www.instagram.com/fragnivo"
  social: { facebook: "", instagram: "", tiktok: "" },

  // Free key from web3forms.com. It sends each order to your email inbox.
  // While this is empty, customers are asked to send their order by WhatsApp or email instead.
  emailFormKey: "",

  shippingNote: "Shipping is charged separately. We will confirm the cost when we contact you."
};

var FRAGNIVO_FRAGRANCES = [
  {
    id: "hawas-og",
    noteShots: [["apple-green", "Apple", "Opens"], ["sea-horizon", "Water notes", "Heart"], ["driftwood", "Driftwood", "Stays"]],
    bottleImage: "rasasi-hawas-for-him-100ml-bottle.png",   // leave empty to show "Photo coming soon"
    bottleSize: [289, 485],
    family: "Fresh",
    page: "hawas-og.html",
    name: "Hawas OG",
    lead: "Hawas", accent: "OG",
    brand: "Rasasi",
    fullName: "Rasasi Hawas for Him",
    concentration: "Eau de Parfum",
    year: 2015,
    wearer: "Men",
    scentType: "Aromatic aquatic",
    decant: 1900,
    bottle: 19000,
    tagline: "Sea air, with something sweet in it.",
    story: "Crisp apple and bergamot open over a cool, watery heart, warmed by cinnamon and plum. Then it settles into ambergris, driftwood and soft musk.",
    character: ["Fresh", "Aquatic", "Sweet spice"],
    bestFor: "Easy everyday wear, warm days and relaxed evenings.",
    notes: {
      top: ["Apple", "Bergamot", "Lemon", "Cinnamon"],
      heart: ["Water notes", "Plum", "Orange blossom", "Cardamom"],
      base: ["Ambergris", "Musk", "Driftwood", "Patchouli"]
    },
    hero: "sea-dark",
    heroAlt: "Dark sea water at dusk",
    stages: [["apple-water", "A wet green apple"], ["plum-glass", "A single plum beside a glass of water"], ["driftwood", "Driftwood on an empty beach"]],
    gallery: [["cinnamon", "Coiled cinnamon bark"], ["sea-horizon", "Calm sea at dusk"], ["spices", "Cinnamon sticks and star anise"]],
    seoTitle: "Rasasi Hawas for Him Price in Sri Lanka | 100 ml & 10 ml Decant",
    seoNotes: "Fresh apple, water notes and ambergris.",
    liquid: ["#E9DDB0", "#CDB877"]
  },
  {
    id: "hawas-fire",
    noteShots: [["sage", "Sage", "Opens"], ["jasmine", "Jasmine", "Heart"], ["mineral-sand", "Mineral notes", "Stays"]],
    bottleImage: "rasasi-hawas-fire-100ml-bottle.png",
    bottleSize: [291, 489],
    family: "Amber",
    page: "hawas-fire.html",
    name: "Hawas Fire",
    lead: "Hawas", accent: "Fire",
    brand: "Rasasi",
    fullName: "Rasasi Hawas Fire",
    concentration: "Eau de Parfum",
    year: 2025,
    wearer: "Men",
    scentType: "Aromatic aquatic",
    decant: 2100,
    bottle: 21000,
    tagline: "Sage, sea air and warm amber.",
    story: "Clary sage opens green and herbal, then Egyptian jasmine moves through a cool marine heart. The warmth comes last: amber, ambergris and a dry mineral edge.",
    character: ["Herbal", "Marine", "Warm amber"],
    bestFor: "Evenings out and any time you want a little more presence.",
    notes: {
      top: ["Clary sage"],
      heart: ["Egyptian jasmine", "Marine notes"],
      base: ["Amber", "Ambergris", "Mineral notes"]
    },
    hero: "lava",
    heroAlt: "Cooled black lava with glowing red seams",
    stages: [["sage", "Soft green sage leaves"], ["jasmine", "White jasmine flower"], ["mineral-sand", "Rippled sand in low sunlight"]],
    gallery: [["embers", "A glowing ember on black"], ["shadow-gold", "Leaf shadow on a golden wall"], ["sap", "Golden resin on tree bark"]],
    seoTitle: "Rasasi Hawas Fire Price in Sri Lanka | 100 ml & 10 ml Decant",
    seoNotes: "Clary sage, jasmine and amber.",
    liquid: ["#E2A85C", "#B9722B"]
  },
  {
    id: "rebel",
    noteShots: [["pineapple", "Pineapple", "Opens"], ["vanilla", "Vanilla", "Heart"], ["cedar-slices", "Dry woods", "Stays"]],
    bottleImage: "afnan-9pm-rebel-100ml-bottle.png",
    bottleSize: [242, 549],
    family: "Sweet",
    page: "rebel.html",
    name: "Rebel",
    lead: "Rebel", accent: "9PM",
    brand: "Afnan",
    fullName: "Afnan 9PM Rebel",
    concentration: "Eau de Parfum",
    year: 2024,
    wearer: "Men and women",
    scentType: "Aromatic fruity",
    decant: 2500,
    bottle: 25000,
    tagline: "The sweet one that stays out late.",
    story: "Pineapple, green apple and mandarin arrive bright and juicy. Vanilla softens them over cedar and oakmoss, and it ends on caramel, dry woods and musk.",
    character: ["Fruity", "Sweet", "Unisex"],
    bestFor: "Nights out, dates and anyone with a sweet tooth.",
    notes: {
      top: ["Pineapple", "Granny Smith apple", "Mandarin"],
      heart: ["Vanilla", "Cedar", "Oakmoss"],
      base: ["Caramel", "Dry woods", "Ambergris", "Musk"]
    },
    hero: "night-lights",
    heroAlt: "City lights blurred behind a rain-wet window",
    stages: [["pineapple-splash", "Pineapple splashing through water on black"], ["vanilla", "Vanilla pods on ivory silk"], ["driftwood", "Dry driftwood on sand"]],
    gallery: [["pineapple", "Pineapple against blurred evening lights"], ["apple-green", "Green apple with water drops on black"], ["night-lights", "City lights blurred behind a rain-wet window"]],
    seoTitle: "Afnan 9PM Rebel Price in Sri Lanka | 100 ml & 10 ml Decant",
    seoNotes: "Pineapple, vanilla and caramel.",
    liquid: ["#D99A58", "#A9642C"]
  },
  {
    id: "vulcan-feu",
    noteShots: [["mango-board", "Mango", "Opens"], ["ginger-lemon", "Ginger and lemon", "Opens"], ["jasmine", "Jasmine", "Heart"]],
    bottleImage: "french-avenue-vulcan-feu-100ml-bottle.png",   // from FRAGNIVO's own photo
    bottleSize: [323, 897],
    family: "Fruity",
    page: "vulcan-feu.html",
    name: "Vulcan Feu",
    lead: "Vulcan", accent: "Feu",
    brand: "French Avenue",
    fullName: "French Avenue Vulcan Feu",
    concentration: "Eau de Parfum",
    year: 2025,
    wearer: "Men and women",
    scentType: "Fruity floral",
    decant: 2500,
    bottle: 25000,
    tagline: "Named for a volcano. Smells of ripe mango.",
    story: "Expect smoke and you will be surprised. It opens on sweet mango with ginger, lemon and rhubarb, softens through jasmine, violet and praline, then rests on cedarwood, tonka and moss.",
    character: ["Tropical", "Fruity", "Unisex"],
    bestFor: "Hot days, holidays and warm-weather evenings.",
    notes: {
      top: ["Mango", "Ginger", "Lemon", "Rhubarb"],
      heart: ["Jasmine", "Violet", "Praline", "Pink pepper"],
      base: ["Cedarwood", "Ambergris", "Tonka bean", "Moss"]
    },
    hero: "mango",
    heroAlt: "Ripe mango cut into golden cubes",
    stages: [["mango-board", "Sliced mango on a wooden board"], ["jasmine", "White jasmine flower"], ["cedar-slices", "Close view of warm wood grain"]],
    gallery: [["ginger-lemon", "Fresh ginger root and lemons"], ["dunes", "Warm sand ridges at sunset"], ["sunset", "Orange sun setting over dark hills"]],
    seoTitle: "French Avenue Vulcan Feu Price in Sri Lanka | 100 ml & 10 ml Decant",
    seoNotes: "Ripe mango, ginger and jasmine.",
    liquid: ["#F0C25E", "#D2902B"]
  }
];
