/* FRAGNIVO site behaviour. Prices and contact details live in data.js. */
(function () {
  "use strict";

  var C = FRAGNIVO_CONFIG, F = FRAGNIVO_FRAGRANCES;
  var byId = {}; F.forEach(function (f) { byId[f.id] = f; });
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  var SIZES = { decant: "10 ml decant", bottle: "100 ml bottle" };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function rs(n) { return "Rs. " + Number(n).toLocaleString("en-US"); }
  function plainRs(n) { return "Rs. " + Number(n).toLocaleString("en-US"); }
  function waLink(text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); }

  var WA_ICON = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.47-.28Z"/></svg>';

  /* --- the 10 ml decant, drawn in FRAGNIVO's own packaging ------------------ */
  var uid = Math.floor(Math.random() * 1e6);
  function decantSVG(f) {
    var u = "d" + (++uid), a = f.liquid[0], b = f.liquid[1];
    return '<svg class="decant" viewBox="0 0 150 460" role="img" aria-label="FRAGNIVO 10 ml decant of ' + esc(f.name) + '">' +
      "<defs>" +
      '<linearGradient id="' + u + 'c" x1="0" x2="1"><stop offset="0" stop-color="#0f110f"/><stop offset=".22" stop-color="#3b3f3a"/><stop offset=".42" stop-color="#22251f"/><stop offset="1" stop-color="#0c0d0c"/></linearGradient>' +
      '<linearGradient id="' + u + 'g" x1="0" x2="1"><stop offset="0" stop-color="#8a6a33"/><stop offset=".3" stop-color="#e6cd93"/><stop offset=".6" stop-color="#b69252"/><stop offset="1" stop-color="#6c5228"/></linearGradient>' +
      '<linearGradient id="' + u + 'l" x1="0" x2="1"><stop offset="0" stop-color="' + b + '"/><stop offset=".3" stop-color="' + a + '"/><stop offset=".72" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient>' +
      '<linearGradient id="' + u + 'b" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".14" stop-color="#fff" stop-opacity=".08"/><stop offset=".86" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".42"/></linearGradient>' +
      '<linearGradient id="' + u + 'p" x1="0" x2="1"><stop offset="0" stop-color="#d9d3c6"/><stop offset=".18" stop-color="#fcfaf6"/><stop offset=".82" stop-color="#f5f1e8"/><stop offset="1" stop-color="#cfc8b9"/></linearGradient>' +
      '<radialGradient id="' + u + 's"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      "</defs>" +
      '<ellipse cx="75" cy="446" rx="62" ry="9" fill="url(#' + u + 's)"/>' +
      '<rect x="48" y="8" width="54" height="104" rx="4" fill="url(#' + u + 'c)"/>' +
      '<rect x="46" y="110" width="58" height="12" rx="1.5" fill="url(#' + u + 'g)"/>' +
      '<rect x="40" y="120" width="70" height="326" rx="8" fill="#fff" fill-opacity=".16"/>' +
      '<rect x="44" y="146" width="62" height="292" rx="5" fill="url(#' + u + 'l)"/>' +
      '<ellipse cx="75" cy="146" rx="31" ry="3.5" fill="#fff" fill-opacity=".45"/>' +
      '<rect x="74" y="122" width="1.6" height="300" fill="#fff" fill-opacity=".28"/>' +
      '<rect x="40" y="120" width="70" height="326" rx="8" fill="url(#' + u + 'b)" stroke="#fff" stroke-opacity=".35"/>' +
      '<rect x="44" y="196" width="62" height="190" fill="url(#' + u + 'p)"/>' +
      '<g transform="translate(75 291) rotate(-90)" text-anchor="middle" fill="#1E211E">' +
      '<text y="-4" font-family="Cormorant Garamond, serif" font-size="21" font-weight="600" letter-spacing="3.4">FRAGNIVO</text>' +
      '<text y="12" font-family="DM Sans, sans-serif" font-size="8" font-weight="500" letter-spacing="1.6">' + esc(f.name.toUpperCase()) + "</text>" +
      '<text y="23" font-family="DM Sans, sans-serif" font-size="6.5" letter-spacing="1.6" fill="#7B806B">10 ML</text></g>' +
      '<rect x="47" y="124" width="5" height="312" rx="2.5" fill="#fff" fill-opacity=".34"/>' +
      "</svg>";
  }

  var SOCIAL = [
    ["facebook", "Facebook", '<path fill="currentColor" d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.4V2h-3.3C10.5 2 9.7 4.7 9.7 6.4v2.1H7.5V12h2.2v10H14V12h3l.4-3.5H14Z"/>'],
    ["instagram", "Instagram", '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/></g><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/>'],
    ["tiktok", "TikTok", '<path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>']
  ];
  function socialHTML() {
    return '<ul class="social">' + SOCIAL.map(function (s) {
      var url = C.social[s[0]];
      return '<li><a href="' + esc(url || "#") + '"' + (url ? ' target="_blank" rel="noopener"' : " data-no-link") + ' aria-label="FRAGNIVO on ' + s[1] + '" title="' + s[1] + '">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' + s[2] + "</svg></a></li>";
    }).join("") + "</ul>";
  }

  /* --- shared header, footer and WhatsApp button ---------------------------- */
  function renderChrome() {
    var links = '<a href="shop.html">Shop</a><a href="index.html#find">Find your scent</a><a href="scent-school.html">Scent School</a>' +
      F.map(function (f) { return '<a class="nav__only-menu" href="' + f.page + '">' + esc(f.name) + "</a>"; }).join("") + '<a class="nav__only-menu nav__contact" href="contact.html">Contact us</a>';
    var head = document.createElement("header");
    head.className = "site-head";
    head.innerHTML =
      '<a class="site-head__logo" href="index.html" aria-label="FRAGNIVO home">' +
      '<img class="logo-dark" src="assets/logo/fragnivo-wordmark-charcoal.svg" alt="FRAGNIVO">' +
      '<img class="logo-light" src="assets/logo/fragnivo-wordmark-ivory.svg" alt=""></a>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav>" +
      '<div class="site-head__right">' +
      '<a class="head-contact" href="contact.html">Contact us</a>' +
      '<button class="head-order" type="button" data-open-order>Order <b data-count>0</b></button>' +
      '<button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><i></i><i></i></button></div>';
    if (!$(".site-head")) body.insertBefore(head, body.firstChild);

    var foot = document.createElement("footer");
    foot.className = "site-foot";
    foot.innerHTML =
      '<i class="tp" data-t style="--x:97.5%;--y:0%;--mx:97%"></i>' +
      '<div class="site-foot__top wrap">' +
      '<h2 class="site-foot__cta">Ready to try one?</h2>' +
      '<div class="site-foot__actions"><a class="btn btn--gold" href="shop.html">Shop fragrances</a>' +
      '<a class="btn btn--line" href="contact.html">Contact us</a></div></div>' +
      '<div class="site-foot__mid wrap">' +
      '<div class="site-foot__brand"><img class="site-foot__logo" src="assets/logo/fragnivo-logo-ivory.svg" alt="FRAGNIVO. Perfumes, Fragrances, Decants">' + socialHTML() + "</div>" +
      '<ul><li><a href="shop.html">Shop all</a></li>' + F.map(function (f) { return '<li><a href="' + f.page + '">' + esc(f.name) + "</a></li>"; }).join("") + '<li><a href="scent-school.html">Scent School</a></li></ul>' +
      '<ul><li><a href="' + waLink("Hi FRAGNIVO, I have a question.") + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
      '<li><a href="tel:' + esc(C.phoneLink) + '">' + esc(C.phoneDisplay) + '</a></li>' +
      '<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li></ul></div>" +
      '<p class="site-foot__small wrap">Fragrance notes are a guide, and every scent wears differently on skin. Mood photographs are not the product, and bottle images are for illustration, so actual packaging may differ. ' +
      "Product and brand names belong to their owners. FRAGNIVO is an independent retailer. &copy; " + new Date().getFullYear() + " FRAGNIVO.</p>";
    if (!$(".site-foot")) body.appendChild(foot);

    var wa = document.createElement("a");
    wa.className = "wa-float"; wa.target = "_blank"; wa.rel = "noopener";
    wa.href = waLink("Hi FRAGNIVO, I would like to know more about your fragrances.");
    wa.setAttribute("aria-label", "Chat with us on WhatsApp");
    wa.innerHTML = '<span class="wa-float__label">Chat with us</span><span class="wa-float__icon">' + WA_ICON + "</span>";
    if (!$(".wa-float")) body.appendChild(wa);

    var burger = $(".burger");
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    var last = 0;
    function onHeadScroll() {
      var y = window.pageYOffset;
      body.classList.toggle("is-scrolled", y > 60);
      if (!body.classList.contains("menu-open")) body.classList.toggle("head-hidden", y > last && y > 500);
      last = y;
    }
    window.addEventListener("scroll", onHeadScroll, { passive: true });
    onHeadScroll();
  }

  /* --- prices and order buttons --------------------------------------------- */
  function buyBlock(f) {
    return '<dl class="notes-line reveal">' +
      "<div><dt>Opens</dt><dd>" + esc(f.notes.top.slice(0, 3).join(", ")) + "</dd></div>" +
      "<div><dt>Heart</dt><dd>" + esc(f.notes.heart.slice(0, 3).join(", ")) + "</dd></div>" +
      "<div><dt>Stays</dt><dd>" + esc(f.notes.base.slice(0, 3).join(", ")) + "</dd></div></dl>" +
      '<div class="buy reveal">' +
      '<button class="buy__opt buy__opt--main" type="button" data-order="' + f.id + ':decant"><span>Try 10 ml decant</span><b>' + rs(f.decant) + "</b></button>" +
      '<button class="buy__opt" type="button" data-order="' + f.id + ':bottle"><span>100 ml bottle</span><b>' + rs(f.bottle) + "</b></button>" +
      '</div><a class="more reveal" href="' + f.page + '">View fragrance</a>';
  }

  // the 100 ml bottle and the 10 ml decant standing together, cut out so they sit on any background
  function stage(f, isLink) {
    var bottle = f.bottleImage
      ? '<img class="st__bottle" src="assets/img/' + f.bottleImage + '" width="' + f.bottleSize[0] + '" height="' + f.bottleSize[1] + '" alt="' + esc(f.fullName) + ' 100 ml ' + esc(f.concentration) + ' bottle" loading="lazy">'
      : '<span class="st__soon"><svg viewBox="0 0 34 54" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.2" d="M12 1h10v9H12zM13 10h8v5h-8zM4 15h26a3 3 0 0 1 3 3v32a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3z"/></svg><span>Photo coming soon</span></span>';
    var tag = isLink === false ? "div" : "a", href = isLink === false ? "" : ' href="' + f.page + '" aria-label="View ' + esc(f.fullName) + '"';
    return "<" + tag + ' class="st"' + href + ">" +
      '<span class="st__item st__b"><span class="st__obj">' + bottle + '<i class="st__disc"></i></span><span class="st__label">100 ml bottle</span></span>' +
      '<span class="st__item st__d"><span class="st__obj">' + decantSVG(f) + '<i class="st__disc"></i></span><span class="st__label">10 ml decant</span></span>' +
      "</" + tag + ">";
  }

  function fillData() {
    function fill(sel, fn) { $$(sel).forEach(function (el) { if (!el.firstChild) el.innerHTML = fn(el); }); }
    fill("[data-stage]", function (el) { return stage(byId[el.getAttribute("data-stage")]); });
    fill("[data-decant]", function (el) { return decantSVG(byId[el.getAttribute("data-decant")]); });
    fill("[data-slide]", function (el) { return slideHTML(byId[el.getAttribute("data-slide")]); });
    fill("[data-notes]", notesHTML);
    fill("[data-buy]", function (el) { return buyBlock(byId[el.getAttribute("data-buy")]); });
    $$("[data-shipping]").forEach(function (el) { el.textContent = C.shippingNote; });
    var from = Math.min.apply(null, F.map(function (f) { return f.decant; }));
    $$("[data-from]").forEach(function (el) { el.textContent = rs(from); });
  }

  /* --- search engine data: page titles, descriptions, share cards, structured data --- */
  function answers(f) {
    return [
      ["How much is " + f.fullName + " in Sri Lanka?", "At FRAGNIVO the 10 ml decant is " + plainRs(f.decant) + " and the 100 ml bottle is " + plainRs(f.bottle) + ". Shipping is charged separately."],
      ["What does " + f.fullName + " smell like?", f.story + " Opens with " + f.notes.top.join(", ") + ". Heart of " + f.notes.heart.join(", ") + ". Base of " + f.notes.base.join(", ") + "."],
      ["Is " + f.fullName + " for men or women?", f.wearer === "Men" ? "It is sold as a men's fragrance, though anyone can wear it." : "It is sold as a fragrance for both men and women."],
      ["What is a 10 ml decant?", "A decant is a smaller amount of fragrance transferred from the original bottle into a separate spray atomiser. It lets you wear " + f.name + " for several days before you decide on the full bottle."],
      ["How do I order " + f.name + "?", "Pick your size and leave your name, phone, email and address. We contact you to confirm your order and shipping, and you pay on delivery. You can also message us on WhatsApp."]
    ];
  }
  function renderSeo() {
    var page = body.getAttribute("data-page"), id = body.getAttribute("data-id"), f = byId[id], U = C.siteUrl;
    var files = { home: "", shop: "shop.html", guide: "scent-school.html", contact: "contact.html" };
    var path = f ? f.page : files[page], url = U + "/" + path, head = document.head;
    var title = {
      home: "FRAGNIVO | Authentic Perfumes & 10 ml Decants in Sri Lanka",
      shop: "Shop Perfumes in Sri Lanka | Bottles & 10 ml Decants | FRAGNIVO",
      guide: "Perfume Guide: Decants, EDP vs EDT, Notes & More | FRAGNIVO",
      contact: "Contact FRAGNIVO | Perfumes in Sri Lanka"
    }[page] || (f.seoTitle + " | FRAGNIVO");
    if (title.length > 65 && f) title = f.seoTitle;
    var plain = function (n) { return plainRs(n); };
    var from = Math.min.apply(null, F.map(function (p) { return p.decant; }));
    var desc = f ? "Buy " + f.fullName + " in Sri Lanka: 10 ml decant " + plain(f.decant) + " or 100 ml bottle " + plain(f.bottle) + ". " + f.seoNotes + " Pay on delivery at FRAGNIVO."
      : $('meta[name="description"]').getAttribute("content").replace("{from}", plain(from));
    var image = U + "/assets/img/" + (f ? (f.bottleImage || "decant-" + f.id + ".png") : "rasasi-hawas-fire-100ml-bottle.png");
    function meta(attr, key, val) {
      var m = $("meta[" + attr + '="' + key + '"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); head.appendChild(m); }
      m.setAttribute("content", val);
    }
    document.documentElement.lang = "en-LK";
    document.title = title;
    meta("name", "description", desc);
    meta("name", "robots", C.previewMode ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    meta("name", "theme-color", "#1E211E");
    meta("property", "og:type", f ? "product" : "website");
    meta("property", "og:site_name", "FRAGNIVO");
    meta("property", "og:locale", "en_LK");
    meta("property", "og:title", title);
    meta("property", "og:description", desc);
    meta("property", "og:url", url);
    meta("property", "og:image", image);
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", desc);
    meta("name", "twitter:image", image);
    var link = $('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; head.appendChild(link); }
    link.href = url;

    if ($("#ld")) return;
    var org = { "@type": "OnlineStore", "@id": U + "/#store", name: "FRAGNIVO", url: U + "/", logo: U + "/assets/logo/png/fragnivo-logo-charcoal.png",
      description: "FRAGNIVO sells authentic fragrances in Sri Lanka as full bottles and 10 ml decants.", slogan: "Discover. Experience. Choose.",
      areaServed: { "@type": "Country", name: "Sri Lanka" }, currenciesAccepted: "LKR", paymentAccepted: "Cash on delivery" };
    function crumbs(list) {
      return { "@type": "BreadcrumbList", itemListElement: list.map(function (c, i) { return { "@type": "ListItem", position: i + 1, name: c[0], item: U + "/" + c[1] }; }) };
    }
    function faq(list) {
      return { "@type": "FAQPage", mainEntity: list.map(function (q) { return { "@type": "Question", name: q[0], acceptedAnswer: { "@type": "Answer", text: q[1] } }; }) };
    }
    function offer(p, size, price) {
      return { "@type": "Offer", name: size, sku: "FRAGNIVO-" + p.id + "-" + (size === SIZES.bottle ? "100ml" : "10ml"), url: U + "/" + p.page, price: String(price), priceCurrency: "LKR",
        availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition", seller: { "@id": U + "/#store" } };
    }
    var same = SOCIAL.map(function (s) { return C.social[s[0]]; }).filter(Boolean);
    if (same.length) org.sameAs = same;
    var graph = [org];
    if (page === "home") graph.push({ "@type": "WebSite", "@id": U + "/#website", url: U + "/", name: "FRAGNIVO", inLanguage: "en-LK", publisher: { "@id": U + "/#store" } });
    if (page === "shop") {
      graph.push(crumbs([["Home", ""], ["Shop", "shop.html"]]));
      graph.push({ "@type": "ItemList", name: "FRAGNIVO fragrances", itemListElement: F.map(function (p, i) { return { "@type": "ListItem", position: i + 1, name: p.fullName, url: U + "/" + p.page }; }) });
    }
    if (page === "guide") {
      graph.push(crumbs([["Home", ""], ["Scent School", "scent-school.html"]]));
      graph.push({ "@type": "Article", headline: "The FRAGNIVO Scent School", description: desc, inLanguage: "en-LK", url: url, image: image, author: { "@id": U + "/#store" }, publisher: { "@id": U + "/#store" } });
      graph.push(faq($$(".lesson").map(function (s) { var p = $("p", s); return [$("h2", s).textContent, p ? p.textContent : ""]; }).filter(function (q) { return q[1]; })));
    }
    if (page === "contact") graph.push(crumbs([["Home", ""], ["Contact", "contact.html"]]));
    if (f) {
      graph.push(crumbs([["Home", ""], ["Shop", "shop.html"], [f.fullName, f.page]]));
      graph.push({ "@type": "Product", "@id": url + "#product", name: f.fullName, alternateName: f.name, description: desc, brand: { "@type": "Brand", name: f.brand }, category: "Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne",
        image: [U + "/assets/img/decant-" + f.id + ".png"].concat(f.bottleImage ? [U + "/assets/img/" + f.bottleImage] : []), url: url,
        additionalProperty: [["Concentration", f.concentration], ["Scent type", f.scentType], ["Top notes", f.notes.top.join(", ")], ["Heart notes", f.notes.heart.join(", ")], ["Base notes", f.notes.base.join(", ")]].map(function (x) { return { "@type": "PropertyValue", name: x[0], value: x[1] }; }),
        offers: [offer(f, SIZES.decant, f.decant), offer(f, SIZES.bottle, f.bottle)] });
      graph.push(faq(answers(f)));
    }
    var s = document.createElement("script");
    s.type = "application/ld+json"; s.id = "ld";
    s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    head.appendChild(s);
  }

  /* --- home: one fragrance in focus at a time --------------------------------- */
  function slideHTML(f) {
    return '<div class="slide__bg"><img src="assets/img/' + f.hero + '.jpg" alt="' + esc(f.heroAlt) + '" loading="lazy" draggable="false"></div>' +
      '<div class="slide__copy"><p class="eyebrow">' + esc(f.fullName) + " &middot; " + esc(f.concentration) + "</p>" +
      '<p class="slide__name">' + esc(f.lead) + " <em>" + esc(f.accent) + "</em></p>" +
      '<p class="slide__line">' + esc(f.tagline) + "</p>" +
      '<p class="slide__price">100 ml bottle ' + rs(f.bottle) + " &middot; 10 ml decant " + rs(f.decant) + "</p>" +
      '<a class="btn btn--gold" href="' + f.page + '">View fragrance</a></div>' +
      '<div class="slide__stage">' + stage(f, false) + "</div>";
  }
  function initHero() {
    var hero = $("[data-hero]");
    if (!hero) return;
    var slides = $$(".slide", hero), ticks = $$(".hero__ticks i", hero), n = slides.length, cur = 0, dx = 0, timer = null, visible = true, wait = 7000;
    function place() {
      var half = Math.floor(n / 2);
      slides.forEach(function (s, i) {
        var d = ((i - cur + n + half) % n) - half;
        s.style.transform = "translateX(calc(" + d * 100 + "% + " + dx + "px))";
        s.style.visibility = Math.abs(d) > 1 ? "hidden" : "visible";
        s.toggleAttribute("inert", d !== 0);
        s.classList.toggle("is-on", d === 0);
      });
      ticks.forEach(function (t, i) { t.classList.toggle("is-on", i === cur); });
      body.classList.toggle("hero-dark", cur !== 0); // the menu turns light over the dark slides
    }
    function schedule() {
      clearTimeout(timer);
      if (reduced || !visible || document.hidden) return;
      timer = setTimeout(function () { go(cur + 1); }, wait);
    }
    function go(i) { cur = (i + n) % n; dx = 0; place(); schedule(); }
    // plays the current slide's entrance again, e.g. when a visitor scrolls back up
    function replay() {
      var s = slides[cur], t = ticks[cur];
      s.classList.remove("is-on"); if (t) t.classList.remove("is-on");
      void s.offsetWidth;
      s.classList.add("is-on"); if (t) t.classList.add("is-on");
      schedule();
    }
    place(); schedule();
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-ready"); }); });

    // drag with the mouse or a finger
    var startX = 0, moved = false, pid = null, w = 1, startT = 0;
    hero.addEventListener("dragstart", function (e) { e.preventDefault(); });
    hero.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      pid = e.pointerId; startX = e.clientX; startT = Date.now(); moved = false; w = hero.offsetWidth;
    });
    window.addEventListener("pointermove", function (e) {
      if (e.pointerId !== pid) return;
      var d = e.clientX - startX;
      if (!moved && Math.abs(d) > 8) { moved = true; hero.classList.add("is-drag"); clearTimeout(timer); }
      if (moved) { dx = d; place(); }
    });
    function end(e) {
      if (e.pointerId !== pid) return;
      pid = null; hero.classList.remove("is-drag");
      if (!moved) return;
      var fast = Math.abs(dx) > 40 && Date.now() - startT < 300;
      if (Math.abs(dx) > w * 0.14 || fast) go(cur + (dx < 0 ? 1 : -1)); else { dx = 0; place(); schedule(); }
    }
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    hero.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    hero.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "ArrowLeft") go(cur - 1);
    });

    new IntersectionObserver(function (es) {
      var on = es[0].isIntersecting;
      if (on && !visible) { visible = true; replay(); }
      else if (!on) { visible = false; clearTimeout(timer); }
    }, { threshold: 0.35 }).observe(hero);
    document.addEventListener("visibilitychange", function () { if (document.hidden) clearTimeout(timer); else schedule(); });
    window.addEventListener("pageshow", function (e) { if (e.persisted) replay(); });
  }

  /* --- home: each perfume beside its own real notes ---------------------------- */
  function notesHTML() {
    return F.map(function (f) {
      var pic = f.bottleImage
        ? '<img src="assets/img/' + f.bottleImage + '" width="' + f.bottleSize[0] + '" height="' + f.bottleSize[1] + '" alt="' + esc(f.fullName) + ' 100 ml bottle" loading="lazy">'
        : '<img src="assets/img/decant-' + f.id + '.png" alt="' + esc(f.fullName) + ' 10 ml decant" loading="lazy">';
      return '<article class="nrow"><a class="nrow__card" href="' + f.page + '"><span class="nrow__pic">' + pic + "</span>" +
        '<span class="nrow__text"><span class="nrow__brand">' + esc(f.brand) + '</span><span class="nrow__name">' + esc(f.name) + '</span><span class="more">View fragrance</span></span></a>' +
        '<ul class="nrow__notes">' + f.noteShots.map(function (s) {
          return '<li><figure class="nshot wipe"><img src="assets/img/' + s[0] + '.jpg" alt="' + esc(s[1]) + ", a note in " + esc(f.fullName) + '" loading="lazy"><figcaption>' +
            '<span>' + esc(s[2]) + "</span>" + esc(s[1]) + "</figcaption></figure></li>";
        }).join("") + "</ul></article>";
    }).join("");
  }

  /* --- shop page ------------------------------------------------------------ */
  function initShop() {
    var grid = $("[data-shop]");
    if (!grid) return;
    if (!grid.firstChild) grid.innerHTML = F.map(function (f) {
      return '<li class="card" data-family="' + esc(f.family) + '"><div class="card__stage">' + stage(f) + "</div>" +
        '<div class="card__body"><p class="card__brand">' + esc(f.brand) + " &middot; " + esc(f.concentration) + "</p>" +
        '<h2 class="card__name"><a href="' + f.page + '">' + esc(f.fullName) + "</a></h2>" +
        '<p class="card__line">' + esc(f.tagline) + "</p>" +
        '<div class="buy">' +
        '<button class="buy__opt" type="button" data-order="' + f.id + ':bottle"><span>100 ml bottle</span><b>' + rs(f.bottle) + "</b></button>" +
        '<button class="buy__opt buy__opt--main" type="button" data-order="' + f.id + ':decant"><span>10 ml decant</span><b>' + rs(f.decant) + "</b></button>" +
        '</div><a class="more" href="' + f.page + '">View fragrance</a></div></li>';
    }).join("");

    var bar = $("[data-filters]"), countEl = $("[data-count-shop]");
    var fams = ["All"].concat(F.map(function (f) { return f.family; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    if (!bar.firstChild) bar.innerHTML = fams.map(function (n, i) { return '<button type="button" aria-pressed="' + (i ? "false" : "true") + '">' + esc(n) + "</button>"; }).join("");
    function show(name) {
      var n = 0;
      $$(".card", grid).forEach(function (c) {
        var on = name === "All" || c.getAttribute("data-family") === name;
        c.hidden = !on; if (on) n++;
      });
      countEl.textContent = n + (n === 1 ? " fragrance" : " fragrances");
      $$("button", bar).forEach(function (b) { b.setAttribute("aria-pressed", b.textContent === name ? "true" : "false"); });
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) show(b.textContent); });
    show("All");
  }

  /* --- fragrance pages ------------------------------------------------------ */
  function renderFragrance() {
    var f = byId[body.getAttribute("data-id")], app = $("#app");
    if (!app.firstChild) {
      var next = F[(F.indexOf(f) + 1) % F.length];
      var stageName = [["Opens", "The first impression"], ["Heart", "The main character"], ["Stays", "What remains later"]];
      var stages = ["top", "heart", "base"].map(function (k, i) {
        return '<li class="stage stage--' + (i + 1) + '"><figure class="img wipe"><img src="assets/img/' + f.stages[i][0] + '.jpg" alt="' + esc(f.stages[i][1]) + '" loading="lazy"></figure>' +
          '<div class="reveal"><p class="eyebrow eyebrow--dark">' + stageName[i][1] + "</p><h3>" + stageName[i][0] + "</h3><p>" + esc(f.notes[k].join(", ")) + "</p></div></li>";
      }).join("");
      var spec = [["Brand", f.brand], ["Fragrance", f.fullName], ["Concentration", f.concentration], ["Released", f.year], ["Sold for", f.wearer], ["Scent type", f.scentType], ["Sizes", "10 ml decant, 100 ml bottle"]];
      var others = F.filter(function (o) { return o !== f; });
      var g = f.gallery;
      app.innerHTML =
        '<section class="p-hero"><img src="assets/img/' + f.hero + '.jpg" alt="' + esc(f.heroAlt) + '" fetchpriority="high" data-parallax="0.12"><div class="p-hero__shade"></div>' +
        '<div class="wrap p-hero__text"><h1 class="reveal"><span class="p-hero__full">' + esc(f.fullName) + " &middot; " + esc(f.concentration) + "</span>" +
        '<span class="p-hero__title">' + esc(f.lead) + " <em>" + esc(f.accent) + "</em></span></h1>" +
        '<p class="p-hero__line reveal">' + esc(f.tagline) + "</p></div><i class=\"tp\" data-t style=\"--x:49%;--y:97%;--mx:97%\"></i></section>" +
        '<section class="p-main wrap">' +
        '<nav class="crumbs p-crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> <span>/</span> <a href="shop.html">Shop</a> <span>/</span> ' + esc(f.fullName) + "</nav>" +
        '<div class="p-stand">' + stage(f, false) +
        '<div class="p-view" role="group" aria-label="Choose which size to look at"><button type="button" data-view="both" aria-pressed="true">Both</button><button type="button" data-view="bottle" aria-pressed="false">100 ml</button><button type="button" data-view="decant" aria-pressed="false">10 ml</button></div></div>' +
        '<div class="p-info"><p class="p-info__full">' + esc(f.fullName) + "</p>" +
        '<p class="p-info__story">' + esc(f.story) + "</p>" +
        '<ul class="p-tags">' + f.character.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
        '<p class="p-best"><span>Best for</span> ' + esc(f.bestFor) + "</p>" +
        '<fieldset class="size"><legend>Choose your size</legend>' +
        '<label><input type="radio" name="size" value="decant" checked><span><b>10 ml decant</b><i>Try it first</i><em>' + rs(f.decant) + "</em></span></label>" +
        '<label><input type="radio" name="size" value="bottle"><span><b>100 ml bottle</b><i>Full size</i><em>' + rs(f.bottle) + "</em></span></label></fieldset>" +
        '<button class="btn btn--wide" type="button" data-order-selected>Order now</button>' +
        '<a class="p-ask" target="_blank" rel="noopener" href="' + waLink("Hi FRAGNIVO, I have a question about " + f.name + ".") + '">' + WA_ICON + "<span>Ask about this on WhatsApp</span></a>" +
        '<p class="p-ship">No payment now. Pay on delivery. ' + esc(C.shippingNote) + "</p></div>" +
        '<i class="tp" data-t style="--x:49%;--y:97%;--mx:98.6%"></i></section>' +
        '<section class="p-notes"><i class="tp" data-t style="--x:97.5%;--y:92%;--mx:98.6%"></i><div class="wrap"><h2 class="h2 reveal">How ' + esc(f.fullName) + " <em>unfolds.</em></h2>" +
        '<p class="p-notes__intro">These stages overlap, and every fragrance develops differently on skin.</p><ol class="stages">' + stages + "</ol></div>" +
        '<i class="tp" data-t style="--x:97.5%;--y:14%;--mx:97%"></i></section>' +
        '<section class="p-strip"><figure class="wipe"><img src="assets/img/' + g[0][0] + '.jpg" alt="' + esc(g[0][1]) + '" loading="lazy"></figure>' +
        '<figure class="wipe"><img src="assets/img/' + g[1][0] + '.jpg" alt="' + esc(g[1][1]) + '" loading="lazy"></figure>' +
        '<figure class="wipe"><img src="assets/img/' + g[2][0] + '.jpg" alt="' + esc(g[2][1]) + '" loading="lazy"></figure></section>' +
        '<section class="p-facts wrap"><div><h2 class="h2">Details</h2><dl class="spec">' +
        spec.map(function (s) { return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("") + "</dl></div>" +
        '<div><h2 class="h2">Questions</h2><div class="faq">' +
        answers(f).map(function (q) { return "<details><summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>"; }).join("") + "</div></div></section>" +
        '<section class="p-more wrap"><h2 class="h2">You may also like</h2><ul class="p-more__list">' +
        others.map(function (o) { return '<li><a href="' + o.page + '"><span class="p-more__brand">' + esc(o.brand) + "</span><b>" + esc(o.fullName) + "</b><span>from " + rs(o.decant) + "</span></a></li>"; }).join("") + "</ul></section>" +
        '<a class="p-next" href="' + next.page + '"><img src="assets/img/' + next.hero + '.jpg" alt="' + esc(next.heroAlt) + '" loading="lazy" data-parallax="0.08">' +
        '<span class="eyebrow">Next fragrance</span><strong>' + esc(next.lead) + " <em>" + esc(next.accent) + "</em></strong>" +
        '<i class="tp" data-t style="--x:90%;--y:88%;--mx:97%"></i></a>' +
        '<div class="p-sticky"><div><b>' + esc(f.name) + "</b><span>from " + rs(f.decant) + '</span></div><button class="btn btn--small" type="button" data-order-selected>Order</button></div>';
    }
    var st = $(".p-stand .st");
    function view(v) {
      if (st) st.setAttribute("data-focus", v);
      $$("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-view") === v ? "true" : "false"); });
      var r = $('input[name="size"][value="' + v + '"]');
      if (r) r.checked = true;
    }
    $$('input[name="size"]').forEach(function (r) { r.addEventListener("change", function () { view(r.value); }); });
    $$("[data-view]").forEach(function (b) { b.addEventListener("click", function () { view(b.getAttribute("data-view")); }); });
    $$("[data-order-selected]").forEach(function (b) {
      b.addEventListener("click", function () {
        var s = $('input[name="size"]:checked');
        addItem(f.id, s ? s.value : "decant");
      });
    });
  }

  /* --- order drawer --------------------------------------------------------- */
  var KEY = "fragnivo-order", items = [];
  try { items = JSON.parse(sessionStorage.getItem(KEY)) || []; } catch (e) { items = []; }
  items = items.filter(function (i) { return byId[i.id] && SIZES[i.size]; });
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* the order still works without storage */ } }
  function priceOf(i) { return byId[i.id][i.size] * i.qty; }
  function total() { return items.reduce(function (s, i) { return s + priceOf(i); }, 0); }
  function count() { return items.reduce(function (s, i) { return s + i.qty; }, 0); }

  var drawer, lastFocus;
  function renderDrawer() {
    drawer = document.createElement("div");
    drawer.className = "drawer"; drawer.hidden = true;
    drawer.innerHTML =
      '<div class="drawer__veil" data-close></div>' +
      '<aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Your order" tabindex="-1">' +
      '<div class="drawer__head"><h2>Your order</h2><button type="button" class="drawer__x" data-close aria-label="Close">&times;</button></div>' +
      '<div class="drawer__body"><div data-items></div>' +
      '<form class="form" data-order-form novalidate>' +
      '<div class="drawer__fields"><label class="field"><span>Your name</span><input name="name" autocomplete="name" required></label>' +
      '<label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" required></label>' +
      '<label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>' +
      '<label class="field"><span>Delivery address</span><textarea name="address" rows="3" autocomplete="street-address" required></textarea></label>' +
      '<input class="hp" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true"></div>' +
      '<p class="form__error" role="alert" hidden></p>' +
      '<button class="btn btn--wide" type="submit">Place order request</button>' +
      '<p class="drawer__fine">No payment now. Pay on delivery. ' + esc(C.shippingNote) + "</p></form>" +
      '<div class="drawer__done" hidden></div></div></aside>';
    body.appendChild(drawer);
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) closeDrawer();
      var q = e.target.closest("[data-qty]");
      if (q) {
        var p = q.getAttribute("data-qty").split(":"), it = items[+p[0]];
        it.qty += +p[1];
        if (it.qty < 1) items.splice(+p[0], 1);
        changed();
      }
      var add = e.target.closest("[data-add]");
      if (add) { var v = add.getAttribute("data-add").split(":"); addItem(v[0], v[1]); }
    });
    $("[data-order-form]", drawer).addEventListener("submit", submitOrder);
    document.addEventListener("keydown", function (e) {
      if (drawer.hidden) return;
      if (e.key === "Escape") { closeDrawer(); return; }
      if (e.key !== "Tab") return;
      var els = $$("a[href],button,input:not(.hp),textarea", drawer).filter(function (n) { return n.offsetParent !== null; });
      if (!els.length) return;
      var a = els[0], z = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    drawItems();
  }

  function drawItems() {
    var box = $("[data-items]", drawer), rows;
    if (items.length) {
      rows = items.map(function (i, n) {
        var f = byId[i.id];
        var pic = i.size === "bottle" && f.bottleImage ? '<img src="assets/img/' + f.bottleImage + '" alt="">' : decantSVG(f);
        return '<li class="line"><span class="line__pic">' + pic + "</span>" +
          '<div class="line__t"><b>' + esc(f.name) + "</b><span>" + SIZES[i.size] + "</span></div>" +
          '<div class="qty"><button type="button" data-qty="' + n + ':-1" aria-label="Remove one ' + esc(f.name) + '">&minus;</button><span>' + i.qty + "</span>" +
          '<button type="button" data-qty="' + n + ':1" aria-label="Add one ' + esc(f.name) + '">+</button></div>' +
          '<b class="line__p">' + rs(priceOf(i)) + "</b></li>";
      }).join("");
      box.innerHTML = '<ul class="lines">' + rows + "</ul>" +
        '<p class="drawer__total"><span>Total before shipping</span><b>' + rs(total()) + "</b></p>";
    } else {
      box.innerHTML = '<p class="drawer__empty">Nothing here yet. Pick a fragrance to start:</p>';
    }
    var others = F.filter(function (f) { return !items.some(function (i) { return i.id === f.id; }); });
    if (others.length) {
      box.innerHTML += '<div class="drawer__add"><p>' + (items.length ? "Add another" : "") + "</p><ul>" +
        others.map(function (f) { return '<li><button type="button" data-add="' + f.id + ':decant">' + esc(f.name) + " <span>10 ml, " + rs(f.decant) + "</span></button></li>"; }).join("") + "</ul></div>";
    }
    $("[data-order-form]", drawer).hidden = !items.length;
    $$("[data-count]").forEach(function (el) { el.textContent = count(); });
    body.classList.toggle("has-order", items.length > 0);
  }
  function changed() { save(); drawItems(); }
  function addItem(id, size) {
    var found = items.filter(function (i) { return i.id === id && i.size === size; })[0];
    if (found) found.qty += 1; else items.push({ id: id, size: size, qty: 1 });
    changed(); openDrawer();
  }
  function openDrawer() {
    if (!drawer.hidden) return;
    resetDone();
    lastFocus = document.activeElement;
    drawer.hidden = false;
    body.classList.add("drawer-open");
    requestAnimationFrame(function () { drawer.classList.add("is-in"); $(".drawer__panel", drawer).focus(); });
  }
  function closeDrawer() {
    drawer.classList.remove("is-in");
    body.classList.remove("drawer-open");
    setTimeout(function () { drawer.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }, reduced ? 0 : 420);
  }
  function resetDone() {
    var done = $(".drawer__done", drawer);
    if (!done.hidden) { done.hidden = true; done.innerHTML = ""; drawItems(); }
  }

  /* --- forms ---------------------------------------------------------------- */
  function validate(form) {
    var err = $(".form__error", form), bad = null;
    $$("input,textarea", form).forEach(function (el) {
      if (el.classList.contains("hp")) return;
      var v = el.value.trim(), ok = !!v;
      if (ok && el.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (ok && el.type === "tel") ok = v.replace(/\D/g, "").length >= 9;
      el.closest(".field").classList.toggle("field--bad", !ok);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !bad) bad = el;
    });
    err.hidden = !bad;
    if (bad) {
      err.textContent = bad.type === "email" ? "Please enter a valid email address." : bad.type === "tel" ? "Please enter a valid phone number." : "Please fill in every field.";
      bad.focus();
    }
    return !bad;
  }
  function sendEmail(subject, fields) {
    if (!C.emailFormKey) return Promise.resolve(false);
    var payload = { access_key: C.emailFormKey, subject: subject, from_name: "FRAGNIVO website" };
    Object.keys(fields).forEach(function (k) { payload[k] = fields[k]; });
    return fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (j) { return !!j.success; }).catch(function () { return false; });
  }
  function orderText(d) {
    var lines = items.map(function (i) { return "- " + byId[i.id].name + ", " + SIZES[i.size] + " x " + i.qty + " (" + plainRs(priceOf(i)) + ")"; });
    return "Hi FRAGNIVO, I would like to order:\n" + lines.join("\n") +
      "\nTotal before shipping: " + plainRs(total()) +
      "\n\nName: " + d.name + "\nPhone: " + d.phone + "\nEmail: " + d.email + "\nAddress: " + d.address;
  }
  function submitOrder(e) {
    e.preventDefault();
    var form = e.target;
    if (form.botcheck.value || !validate(form)) return;
    var d = { name: form.name.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim(), address: form.address.value.trim() };
    var msg = orderText(d), btn = $("button[type=submit]", form);
    btn.disabled = true; btn.textContent = "Sending...";
    sendEmail("New order from " + d.name, { message: msg, name: d.name, phone: d.phone, email: d.email, address: d.address }).then(function (sent) {
      btn.disabled = false; btn.textContent = "Place order request";
      var done = $(".drawer__done", drawer), first = esc(d.name.split(" ")[0]);
      var mail = "mailto:" + C.email + "?subject=" + encodeURIComponent("Order from " + d.name) + "&body=" + encodeURIComponent(msg);
      done.innerHTML = sent
        ? "<h3>Thank you, " + first + ".</h3><p>We have your order and will contact you soon to confirm shipping and delivery.</p>" +
          '<a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink(msg) + '">' + WA_ICON + "<span>Message us on WhatsApp</span></a>"
        : "<h3>One last step, " + first + ".</h3><p>Send us your order and we will contact you to confirm shipping and delivery.</p>" +
          '<a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink(msg) + '">' + WA_ICON + "<span>Send on WhatsApp</span></a>" +
          '<a class="btn btn--ghost btn--wide" href="' + esc(mail) + '">Send by email</a>';
      form.reset();
      form.hidden = true;
      $("[data-items]", drawer).innerHTML = "";
      done.hidden = false;
      items = []; save();
      $$("[data-count]").forEach(function (el) { el.textContent = 0; });
      body.classList.remove("has-order");
    });
  }
  function initContact() {
    var ways = $("[data-contact-ways]");
    if (!ways) return;
    ways.innerHTML =
      '<li><a target="_blank" rel="noopener" href="' + waLink("Hi FRAGNIVO, I have a question.") + '"><span>WhatsApp</span>Chat with us</a></li>' +
      '<li><a href="tel:' + esc(C.phoneLink) + '"><span>Phone</span>' + esc(C.phoneDisplay) + "</a></li>" +
      '<li><a href="mailto:' + esc(C.email) + '"><span>Email</span>' + esc(C.email) + "</a></li>";
    if (!$(".contact__social")) ways.insertAdjacentHTML("afterend", '<div class="contact__social"><p>Follow us</p>' + socialHTML() + "</div>");
    var form = $("[data-contact-form]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.botcheck.value || !validate(form)) return;
      var d = { name: form.name.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };
      var msg = "Hi FRAGNIVO, this is " + d.name + " (" + d.phone + ", " + d.email + ").\n\n" + d.message;
      var btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "Sending...";
      sendEmail("New message from " + d.name, { name: d.name, phone: d.phone, email: d.email, message: msg }).then(function (sent) {
        var done = $(".form__done", form);
        var mail = "mailto:" + C.email + "?subject=" + encodeURIComponent("Message from " + d.name) + "&body=" + encodeURIComponent(msg);
        $$(".field,.form__h,button[type=submit]", form).forEach(function (n) { n.hidden = true; n.style.display = "none"; });
        done.innerHTML = sent
          ? "<h3>Thank you.</h3><p>We have your message and will get back to you soon.</p>"
          : "<h3>One last step.</h3><p>Send your message to us directly:</p>" +
            '<a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink(msg) + '">' + WA_ICON + "<span>Send on WhatsApp</span></a>" +
            '<a class="btn btn--ghost btn--wide" href="' + esc(mail) + '">Send by email</a>';
        done.hidden = false;
      });
    });
  }

  /* --- scent finder --------------------------------------------------------- */
  function initQuiz() {
    var box = $("[data-quiz]");
    if (!box) return;
    var Q = [
      { q: "When will you wear it most?", a: [
        ["At work and through the day", { "hawas-og": 2, "vulcan-feu": 1 }],
        ["Out in the sun", { "vulcan-feu": 2, "hawas-og": 1 }],
        ["Evenings and nights out", { "rebel": 2, "hawas-fire": 1 }],
        ["Special occasions", { "hawas-fire": 2, "rebel": 1 }]] },
      { q: "Which one pulls you in?", a: [
        ["Sea air and clean skin", { "hawas-og": 3 }],
        ["Warm amber and stone", { "hawas-fire": 3 }],
        ["Caramel and vanilla", { "rebel": 3 }],
        ["Ripe tropical fruit", { "vulcan-feu": 3, "rebel": 1 }]] },
      { q: "How should it make you feel?", a: [
        ["Fresh and easy", { "hawas-og": 2 }],
        ["Quietly confident", { "hawas-fire": 2 }],
        ["Playful", { "rebel": 2 }],
        ["Sunny and relaxed", { "vulcan-feu": 2 }]] }
    ];
    var step, score, tiebreak;
    function start() { step = 0; score = {}; tiebreak = null; show(); }
    function show() {
      if (step === Q.length) return result();
      var q = Q[step];
      box.innerHTML = '<p class="eyebrow">Find your scent &middot; ' + (step + 1) + " of " + Q.length + "</p>" +
        '<h2 class="find__q">' + esc(q.q) + "</h2>" +
        '<div class="find__opts">' + q.a.map(function (o, i) { return '<button type="button" data-a="' + i + '">' + esc(o[0]) + "</button>"; }).join("") + "</div>";
    }
    function result() {
      var best = F.slice().sort(function (a, b) {
        var d = (score[b.id] || 0) - (score[a.id] || 0);
        return d || (b.id === tiebreak ? 1 : a.id === tiebreak ? -1 : 0);
      })[0];
      box.innerHTML = '<div class="find__result"><div class="find__decant">' + decantSVG(best) + "</div><div>" +
        '<p class="eyebrow">Your match</p><h2 class="find__name"><a href="' + best.page + '">' + esc(best.lead) + " <em>" + esc(best.accent) + "</em></a></h2>" +
        '<p class="find__why">' + esc(best.tagline) + " " + esc(best.bestFor) + "</p>" +
        '<div class="buy"><button class="buy__opt buy__opt--main" type="button" data-order="' + best.id + ':decant"><span>Try 10 ml decant</span><b>' + rs(best.decant) + "</b></button></div>" +
        '<button class="find__again" type="button" data-again>Start again</button></div></div>';
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (b) {
        var w = Q[step].a[+b.getAttribute("data-a")][1];
        Object.keys(w).forEach(function (k) { score[k] = (score[k] || 0) + w[k]; if (step === 1 && w[k] === 3) tiebreak = k; });
        step++; show();
      }
      if (e.target.closest("[data-again]")) start();
    });
    start();
  }

  /* --- the gold line that runs through the page ----------------------------- */
  function initThread() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "thread"); svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", "3.5");
    svg.appendChild(path); svg.appendChild(dot);
    body.appendChild(svg);
    var table = [], length = 0;

    function build() {
      svg.setAttribute("height", 0); // the old height must not count towards the new page height
      var W = document.documentElement.clientWidth, H = Math.max(document.documentElement.scrollHeight, body.scrollHeight);
      svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      var narrow = W <= 1000;
      var pts = $$("[data-t]").filter(function (el) { return !(narrow && el.classList.contains("hero__origin")); }).map(function (el) {
        var r = el.getBoundingClientRect();
        return { x: r.left + window.pageXOffset, y: r.top + window.pageYOffset };
      }).sort(function (a, b) { return a.y - b.y; });
      if (pts.length < 2) { svg.style.display = "none"; return; }
      var d = "M" + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i], m = (b.y - a.y) * 0.5;
        d += "C" + a.x.toFixed(1) + " " + (a.y + m).toFixed(1) + " " + b.x.toFixed(1) + " " + (b.y - m).toFixed(1) + " " + b.x.toFixed(1) + " " + b.y.toFixed(1);
      }
      path.setAttribute("d", d);
      length = path.getTotalLength();
      path.style.strokeDasharray = length + " " + length;
      table = [];
      for (var t = 0; t <= 240; t++) { var l = length * t / 240; table.push([l, path.getPointAtLength(l)]); }
      draw();
    }
    function draw() {
      if (!table.length) return;
      var target = window.pageYOffset + window.innerHeight * 0.68, l = reduced ? length : 0, p = table[0][1];
      if (reduced) { path.style.strokeDashoffset = 0; dot.style.display = "none"; return; }
      for (var i = 0; i < table.length; i++) { if (table[i][1].y <= target) { l = table[i][0]; p = table[i][1]; } else break; }
      path.style.strokeDashoffset = length - l;
      dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y);
    }
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 180); });
    window.addEventListener("load", build);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    window.addEventListener("scroll", function () { requestAnimationFrame(draw); }, { passive: true });
    $$("img").forEach(function (im) { if (!im.complete) im.addEventListener("load", function () { clearTimeout(rt); rt = setTimeout(build, 300); }); });
    build();
  }

  /* --- motion --------------------------------------------------------------- */
  function initMotion() {
    var els = $$(".reveal,.wipe");
    if (reduced) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    // measured directly: an observer never fires for an element that is still clipped away
    var pending = els.slice();
    function revealCheck() {
      var limit = window.innerHeight * 0.94;
      pending = pending.filter(function (e) {
        if (e.getBoundingClientRect().top > limit) return true;
        e.classList.add("in");
        return false;
      });
    }
    window.addEventListener("scroll", revealCheck, { passive: true });
    window.addEventListener("resize", revealCheck);
    window.addEventListener("load", revealCheck);
    revealCheck();
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        $$(".reveal,.wipe", m.target).forEach(function (e) { if (!e.classList.contains("in")) e.classList.add("in"); });
      });
    }).observe($("[data-quiz]") || document.createElement("div"), { childList: true, subtree: true });

    var par = $$("[data-parallax]").map(function (el) { return { el: el, k: parseFloat(el.getAttribute("data-parallax")) }; });
    var ticking = false;
    function apply() {
      ticking = false;
      var vh = window.innerHeight;
      par.forEach(function (p) {
        var r = p.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var off = (r.top + r.height / 2 - vh / 2) * p.k;
        p.el.style.setProperty("--py", off.toFixed(1) + "px");
      });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }, { passive: true });
    apply();
  }

  /* --- start ---------------------------------------------------------------- */
  var isFragrance = body.getAttribute("data-page") === "fragrance";
  renderChrome();
  renderDrawer();
  if (isFragrance) renderFragrance();
  renderSeo();
  initShop();
  fillData();
  initHero();
  initQuiz();
  initContact();
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-order]");
    if (b) { var v = b.getAttribute("data-order").split(":"); addItem(v[0], v[1]); }
    if (e.target.closest("[data-open-order]")) openDrawer();
    if (e.target.closest("[data-no-link]")) e.preventDefault();
  });
  initThread();
  initMotion();
})();
