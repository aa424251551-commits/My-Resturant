(() => {
"use strict";

/* =====================================================================
   SETTINGS – edit this block
   ===================================================================== */
const CUR = "$";          // currency symbol shown next to prices
const WHATSAPP = "970594897547";      // restaurant WhatsApp number with country code, no + (e.g. "970591234567").
                          // If set, "Place order" opens WhatsApp with the order text. If empty, only a confirmation is shown.
const LANGS = ["en", "ar"];                 // add a language: push its code here + add a 3rd value to every line in D
const NAMES = { en: "English", ar: "العربية" };
const RTL = ["ar"];
const BRANCHES = [                          // used by contact page, footer and checkout
  { k: "gaza",     ph: "20-123456" },
  { k: "nuseirat", ph: "20-246812" },
  { k: "khan",     ph: "20-246812" },
  { k: "rafah",    ph: "20-246812" }
];
const CATS = ["all", "breakfast", "grills", "fast", "mains", "drinks"];
const MENU = [   // n = name [en, ar], d = description [en, ar]
  { id: "breakfast", cat: "breakfast", img: "breakfast.jpg", price: 20, top: 1,
    n: ["Breakfast Platter", "فطور شعبي"], d: ["Dips, salads and fresh bread served in clay bowls.", "مقبلات وسلطات متنوعة مع الخبز الطازج في صحون فخارية."] },
  { id: "grills", cat: "grills", img: "grills.jpg", price: 40, top: 1,
    n: ["Mixed Grills", "مشاوي مشكلة"], d: ["Juicy charcoal-grilled kebab and skewers.", "كباب وأسياخ مشوية على الفحم."] },
  { id: "drinks", cat: "drinks", img: "drinks.jpg", price: 15, top: 1,
    n: ["Cold Drinks", "مشروبات باردة"], d: ["Energy and soft drinks served ice cold.", "مشروبات غازية ومشروبات طاقة باردة."] },
  { id: "burger", cat: "fast", img: "burger.jpg", price: 18, fresh: 1,
    n: ["Beef Burger", "برغر لحم"], d: ["Beef patty, bacon, fresh lettuce and tomato.", "قطعة لحم مع لحم مقدد وخس وطماطم طازجة."] },
  { id: "curry", cat: "mains", img: "curry.jpg", price: 25, fresh: 1,
    n: ["Curry Pan with Naan", "طاجن كاري مع النان"], d: ["Creamy spiced curry served with warm naan.", "كاري كريمي متبّل يقدَّم مع خبز النان الساخن."] },
  { id: "shrimp", cat: "mains", img: "shrimp.jpg", price: 35, fresh: 1,
    n: ["Spiced Shrimp", "جمبري متبّل"], d: ["Pan-fried shrimp with herbs and spices.", "جمبري مقلي بالبهارات والأعشاب."] },
  { id: "fish", cat: "mains", img: "fish.jpg", price: 38,
    n: ["Fish with Rice", "سمك مع أرز"], d: ["Whole fish on seasoned rice topped with almonds.", "سمكة كاملة على أرز مبهّر مع اللوز."] },
  { id: "rice", cat: "mains", img: "rice.jpg", price: 22,
    n: ["Chicken & Rice", "دجاج مع أرز"], d: ["Roasted chicken over fragrant rice.", "دجاج محمّر فوق أرز بنكهة مميزة."] }
];

/* =====================================================================
   TRANSLATIONS  key: [English, Arabic]
   ===================================================================== */
const D = {
  brand: ["Alsaada Restaurant", "مطعم السعادة"],
  home: ["Home", "الرئيسية"], menu: ["Menu", "القائمة"], contact: ["Contact us", "تواصل معنا"], login: ["Log in", "تسجيل الدخول"],
  themeBtn: ["Dark / light mode", "الوضع الليلي / النهاري"], cartBtn: ["Open cart", "فتح السلة"], menuBtn: ["Menu", "القائمة"], closeX: ["Close", "إغلاق"],
  heroT: ["Welcome to our restaurant", "أهلاً بكم في مطعمنا"], heroP: ["Fresh food made with love. Order online in a few taps.", "أكل طازج محضّر بحب. اطلب أونلاين بخطوات بسيطة."],
  orderNow: ["Order now", "اطلب الآن"], topT: ["Most Requested", "الأكثر طلباً"], newT: ["Newly Added", "وصل حديثاً"],
  menuT: ["Choose your meal", "اختر وجبتك"], menuP: ["Pick a category, add items to your cart and send your order.", "اختر القسم وأضف الأصناف للسلة ثم أرسل طلبك."],
  cat_all: ["All", "الكل"], cat_breakfast: ["Breakfast", "فطور"], cat_grills: ["Grills", "مشاوي"], cat_fast: ["Fast food", "وجبات سريعة"], cat_mains: ["Main dishes", "أطباق رئيسية"], cat_drinks: ["Drinks", "مشروبات"],
  add: ["Add to cart", "أضف للسلة"], added: ["Added to cart", "تمت الإضافة للسلة"],
  cart: ["Your order", "طلبك"], empty: ["Your cart is empty", "السلة فارغة"], total: ["Total", "المجموع"],
  checkout: ["Checkout", "إتمام الطلب"], back: ["Back", "رجوع"], send: ["Place order", "تأكيد الطلب"], close: ["Close", "إغلاق"],
  fName: ["Full name", "الاسم الكامل"], fPhone: ["Phone", "رقم الهاتف"], fType: ["Order type", "نوع الطلب"],
  delivery: ["Delivery", "توصيل"], pickup: ["Pickup", "استلام من الفرع"], fBranch: ["Branch", "الفرع"], fAddr: ["Address", "العنوان"], fNotes: ["Notes (optional)", "ملاحظات (اختياري)"],
  eName: ["Please enter your name", "الرجاء إدخال الاسم"], ePhone: ["Enter a valid phone number", "أدخل رقم هاتف صحيح"], eAddr: ["Please enter your address", "الرجاء إدخال العنوان"],
  eEmail: ["Enter a valid email", "أدخل بريداً إلكترونياً صحيحاً"], ePass: ["At least 6 characters", "6 أحرف على الأقل"], eMatch: ["Passwords do not match", "كلمتا المرور غير متطابقتين"],
  msgHead: ["New order", "طلب جديد"], doneT: ["Order received!", "تم استلام طلبك!"], doneP: ["Order number", "رقم الطلب"],
  doneWA: ["WhatsApp opened with your order – press send to finish.", "فتحنا طلبك في واتساب – اضغط إرسال لإتمامه."],
  doneNoWA: ["We will call you to confirm your order.", "سنتصل بك لتأكيد طلبك."],
  cT: ["Contact Us", "تواصل معنا"], cP: ["We would love to hear from you.", "يسعدنا تواصلكم معنا."],
  bT: ["Our Branches", "فروعنا"], bP: ["Contact information for all our branches", "معلومات التواصل لجميع فروعنا"],
  thBranch: ["Branch", "الفرع"], thName: ["Name", "الاسم"], thPhone: ["Contact number", "رقم التواصل"],
  br_gaza: ["Gaza", "غزة"], br_nuseirat: ["Nuseirat", "النصيرات"], br_khan: ["Khan Younis", "خانيونس"], br_rafah: ["Rafah", "رفح"],
  pn_gaza: ["Ahmed Hani", "أحمد هاني"], pn_nuseirat: ["Mohammed Hani", "محمد هاني"], pn_khan: ["Anas Hani", "أنس هاني"], pn_rafah: ["Farah Hani", "فرح هاني"],
  loginT: ["Welcome to Alsaada Restaurant", "أهلاً بك في مطعم السعادة"], loginH: ["Login here", "سجّل دخولك"],
  email: ["Email", "البريد الإلكتروني"], password: ["Password", "كلمة المرور"], phEmail: ["Enter your email", "أدخل بريدك الإلكتروني"], phPass: ["Enter your password", "أدخل كلمة المرور"],
  forgot: ["Forgot your password?", "نسيت كلمة المرور؟"], newAcc: ["Create a new account", "إنشاء حساب جديد"], okLogin: ["Signed in", "تم تسجيل الدخول"],
  signT: ["Create A New Account", "إنشاء حساب جديد"], signH: ["Enter your information", "أدخل معلوماتك"],
  fn: ["First name", "الاسم الأول"], sn: ["Last name", "اسم العائلة"], confirm: ["Confirm password", "تأكيد كلمة المرور"], createBtn: ["Create", "إنشاء"],
  haveAcc: ["Already have an account?", "لديك حساب بالفعل؟"], okSignup: ["Account created", "تم إنشاء الحساب"],
  fDesc: ["Fresh, home-style food served with love since day one.", "أكل طازج بنكهة البيت يُقدَّم بحب."], links: ["Links", "روابط"],
  nlT: ["Newsletter", "النشرة البريدية"], subscribe: ["Subscribe", "اشترك"], subbed: ["Thanks for subscribing!", "شكراً لاشتراكك!"], rights: ["All rights reserved", "جميع الحقوق محفوظة"]
};

/* =====================================================================
   Helpers / state
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } }
};
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = n => `<bdi>${CUR}${n}</bdi>`;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let lang = store.get("lang", (navigator.language || "en").slice(0, 2));
if (!LANGS.includes(lang)) lang = "en";
let theme = store.get("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const li = () => LANGS.indexOf(lang);
const t = k => (D[k] && D[k][li()]) || (D[k] && D[k][0]) || k;

let cat = CATS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "all";
let cart = store.get("cart", {});
for (const id of Object.keys(cart)) if (!MENU.some(m => m.id === id) || !(cart[id] > 0)) delete cart[id];
let step = "cart";               // cart | checkout | done
let draft = { type: "delivery" }; // keeps checkout fields when language changes
let last = null;

const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
const sum = () => Object.entries(cart).reduce((s, [id, q]) => s + MENU.find(m => m.id === id).price * q, 0);

/* =====================================================================
   Layout injected on every page (edit header/footer once, here)
   ===================================================================== */
const ICON = {
  cart: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  moon: '<svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  sun: '<svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
};

function buildLayout() {
  const page = (location.pathname.split("/").pop() || "home.html").toLowerCase();
  const nav = [["Home.html", "home"], ["menu.html", "menu"], ["contact.html", "contact"]]
    .map(([h, k]) => `<a href="${h}" data-i="${k}"${h.toLowerCase() === page ? ' class="on"' : ""}></a>`).join("");
  const hdr = $("#hdr");
  if (hdr) hdr.innerHTML = `<header><div class="wrap bar">
    <a class="brand" href="Home.html"><img src="images/rice.jpg" alt=""><span data-i="brand"></span></a>
    <nav class="links" id="links">${nav}</nav>
    <div class="tools">
      <button class="ibtn" id="lang" type="button"></button>
      <button class="ibtn" id="theme" type="button" data-aria="themeBtn">${ICON.moon}${ICON.sun}</button>
      <button class="ibtn" id="cartBtn" type="button" data-aria="cartBtn">${ICON.cart}<b class="badge" id="badge"></b></button>
      <a class="login" href="login.html" data-i="login"></a>
      <button class="ibtn burger" id="burger" type="button" data-aria="menuBtn">${ICON.menu}</button>
    </div></div></header>`;
  const ftr = $("#ftr");
  if (ftr) ftr.innerHTML = `<footer><div class="wrap fg">
    <div><h4 data-i="brand"></h4><p data-i="fDesc"></p></div>
    <div><h4 data-i="links"></h4>${nav}</div>
    <div><h4 data-i="bT"></h4>${BRANCHES.map(b => `<a href="contact.html" data-i="br_${b.k}"></a>`).join("")}</div>
    <div><h4 data-i="nlT"></h4><form class="nl" id="nl" novalidate>
      <input type="email" name="email" data-ph="phEmail" aria-label="Email"><button class="btn" data-i="subscribe"></button></form></div>
    </div><p class="copy">© ${new Date().getFullYear()} <span data-i="brand"></span> – <span data-i="rights"></span></p></footer>`;
  document.body.insertAdjacentHTML("beforeend", `<div class="shade" id="shade"></div>
    <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="dtitle">
      <div class="dh"><h3 id="dtitle"></h3><button class="x" type="button" data-act="close" data-aria="closeX">×</button></div>
      <div class="db" id="dbody"></div><div class="df" id="dfoot"></div></aside>
    <div class="toast" id="toast" role="status"></div>`);
}

/* =====================================================================
   Rendering
   ===================================================================== */
const card = m => `<article class="item rv"><img src="images/${m.img}" alt="${esc(m.n[li()])}" loading="lazy">
  <h3>${esc(m.n[li()])}</h3><p>${esc(m.d[li()])}</p>
  <div class="row"><span class="price">${money(m.price)}</span><button class="btn" type="button" data-add="${m.id}">${t("add")}</button></div></article>`;

function renderPage() {
  const top = $("#top"), fresh = $("#new"), menu = $("#menu"), chips = $("#chips"), rows = $("#rows");
  if (top) top.innerHTML = MENU.filter(m => m.top).map(card).join("");
  if (fresh) fresh.innerHTML = MENU.filter(m => m.fresh).map(card).join("");
  if (chips && menu) {
    chips.innerHTML = CATS.map(c => `<button class="chip${c === cat ? " on" : ""}" type="button" data-cat="${c}">${t("cat_" + c)}</button>`).join("");
    menu.innerHTML = MENU.filter(m => cat === "all" || m.cat === cat).map(card).join("");
  }
  if (rows) rows.innerHTML = BRANCHES.map(b => `<tr><td>${t("br_" + b.k)}</td><td>${t("pn_" + b.k)}</td><td dir="ltr">${b.ph}</td></tr>`).join("");
  reveal();
}

function renderCart() {
  const body = $("#dbody"), foot = $("#dfoot");
  if (!body) return;
  if (!count() && step !== "done") step = "cart";
  $("#dtitle").textContent = t(step === "checkout" ? "checkout" : "cart");
  const badge = $("#badge");
  if (badge) { badge.textContent = count() || ""; badge.dataset.n = count(); }

  if (step === "done") {
    body.innerHTML = `<div class="done"><b>✓ ${t("doneT")}</b><p>${t("doneP")}: <bdi>#${last.no}</bdi></p><p>${WHATSAPP ? t("doneWA") : t("doneNoWA")}</p></div>`;
    foot.innerHTML = `<button class="btn block" type="button" data-act="close">${t("close")}</button>`;
  } else if (!count()) {
    body.innerHTML = `<p class="empty">${t("empty")}</p>`;
    foot.innerHTML = `<a class="btn block" href="menu.html">${t("menuT")}</a>`;
  } else if (step === "cart") {
    body.innerHTML = Object.entries(cart).map(([id, q]) => {
      const m = MENU.find(x => x.id === id);
      return `<div class="line"><img src="images/${m.img}" alt=""><div class="nm">${esc(m.n[li()])}<small>${money(m.price)}</small></div>
        <div class="qty"><button type="button" data-dec="${id}" aria-label="−">−</button><b>${q}</b><button type="button" data-inc="${id}" aria-label="+">+</button></div></div>`;
    }).join("");
    foot.innerHTML = `<div class="total"><span>${t("total")}</span><span>${money(sum())}</span></div><button class="btn block" type="button" data-act="checkout">${t("checkout")}</button>`;
  } else {
    const d = draft, del = d.type !== "pickup";
    body.innerHTML = `<form id="oform" novalidate>
      <label>${t("fName")}</label><input name="cname" value="${esc(d.cname)}" autocomplete="name"><div class="err"></div>
      <label>${t("fPhone")}</label><input name="phone" type="tel" dir="ltr" value="${esc(d.phone)}" autocomplete="tel"><div class="err"></div>
      <label>${t("fType")}</label><div class="radios">
        <label><input type="radio" name="type" value="delivery"${del ? " checked" : ""}><span>${t("delivery")}</span></label>
        <label><input type="radio" name="type" value="pickup"${del ? "" : " checked"}><span>${t("pickup")}</span></label></div>
      <label>${t("fBranch")}</label><select name="branch">${BRANCHES.map(b => `<option value="${b.k}"${d.branch === b.k ? " selected" : ""}>${t("br_" + b.k)}</option>`).join("")}</select>
      <div id="addrBox"${del ? "" : " hidden"}><label>${t("fAddr")}</label><input name="addr" value="${esc(d.addr)}" autocomplete="street-address"><div class="err"></div></div>
      <label>${t("fNotes")}</label><textarea name="notes" rows="2">${esc(d.notes)}</textarea></form>`;
    foot.innerHTML = `<div class="total"><span>${t("total")}</span><span>${money(sum())}</span></div>
      <button class="btn block" type="button" data-act="send">${t("send")}</button>
      <button class="btn ghost block" type="button" style="margin-top:8px" data-act="back">${t("back")}</button>`;
  }
}

let io;
function reveal() {
  const els = $$(".rv:not(.in)");
  els.forEach(e => e.style.setProperty("--d", ([...e.parentElement.children].indexOf(e) % 3) * 120 + "ms"));
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  io = io || new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
  }), { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

function applyLang() {
  const h = document.documentElement;
  h.lang = lang; h.dir = RTL.includes(lang) ? "rtl" : "ltr";
  $$("[data-i]").forEach(e => { e.textContent = t(e.dataset.i); });
  $$("[data-ph]").forEach(e => { e.placeholder = t(e.dataset.ph); });
  $$("[data-aria]").forEach(e => e.setAttribute("aria-label", t(e.dataset.aria)));
  document.title = t(document.body.dataset.title || "brand") + " | " + t("brand");
  const next = LANGS[(li() + 1) % LANGS.length];
  $("#lang").textContent = NAMES[next];
  $("#lang").lang = next;
  renderPage(); renderCart();
}
function applyTheme() { document.documentElement.dataset.theme = theme; }

/* =====================================================================
   Actions
   ===================================================================== */
let tt;
function toast(m) {
  const e = $("#toast"); e.textContent = m; e.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => e.classList.remove("show"), 2200);
}
const saveCart = () => { store.set("cart", cart); renderCart(); };
function openCart() { renderCart(); $("#drawer").classList.add("open"); $("#shade").classList.add("open"); }
function closeCart() { $("#drawer").classList.remove("open"); $("#shade").classList.remove("open"); if (step === "done") step = "cart"; renderCart(); }

function validator(form) {
  let ok = true;
  return {
    check(name, cond, key) {
      const el = form.elements[name], msg = el.nextElementSibling;
      el.classList.toggle("invalid", !cond);
      if (msg && msg.classList.contains("err")) msg.textContent = cond ? "" : t(key);
      if (!cond && ok) { ok = false; el.focus(); }
    },
    get ok() { return ok; }
  };
}

function submitOrder() {
  const f = $("#oform"), v = n => (f.elements[n].value || "").trim(), type = v("type");
  const val = validator(f);
  val.check("cname", v("cname").length >= 2, "eName");
  val.check("phone", /^\+?[\d\s-]{7,15}$/.test(v("phone")), "ePhone");
  if (type === "delivery") val.check("addr", v("addr").length >= 4, "eAddr");
  if (!val.ok) return;

  const no = String(Date.now()).slice(-6), br = v("branch");
  const msg = [
    `${t("msgHead")} #${no}`,
    `${t("fName")}: ${v("cname")}`, `${t("fPhone")}: ${v("phone")}`,
    `${t("fType")}: ${t(type)}`, `${t("fBranch")}: ${t("br_" + br)}`,
    type === "delivery" ? `${t("fAddr")}: ${v("addr")}` : null, "",
    ...Object.entries(cart).map(([id, q]) => { const m = MENU.find(x => x.id === id); return `${q} × ${m.n[li()]} = ${CUR}${m.price * q}`; }),
    "", `${t("total")}: ${CUR}${sum()}`,
    v("notes") ? `${t("fNotes")}: ${v("notes")}` : null
  ].filter(x => x !== null).join("\n");

  last = { no, msg };
  store.set("lastOrder", { no, msg, time: Date.now() });
  if (WHATSAPP) window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  cart = {}; draft = { type: "delivery" }; step = "done"; saveCart();
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-add],[data-inc],[data-dec],[data-cat],[data-act],#cartBtn,#lang,#theme,#burger,#shade,.links a");
  if (!el) return;
  const d = el.dataset;
  if (d.add) { cart[d.add] = (cart[d.add] || 0) + 1; saveCart(); toast(t("added")); }
  else if (d.inc) { cart[d.inc]++; saveCart(); }
  else if (d.dec) { if (--cart[d.dec] <= 0) delete cart[d.dec]; saveCart(); }
  else if (d.cat) { cat = d.cat; history.replaceState(null, "", "#" + cat); renderPage(); }
  else if (d.act === "checkout") { step = "checkout"; renderCart(); }
  else if (d.act === "back") { step = "cart"; renderCart(); }
  else if (d.act === "send") submitOrder();
  else if (d.act === "close" || el.id === "shade") closeCart();
  else if (el.id === "cartBtn") openCart();
  else if (el.id === "lang") { lang = LANGS[(li() + 1) % LANGS.length]; store.set("lang", lang); applyLang(); }
  else if (el.id === "theme") { theme = theme === "dark" ? "light" : "dark"; store.set("theme", theme); applyTheme(); }
  else if (el.id === "burger") $("#links").classList.toggle("open");
  else if (el.matches(".links a")) $("#links").classList.remove("open");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

// keep checkout fields when the language is switched mid-order
document.addEventListener("input", e => {
  const f = e.target.form;
  if (f && f.id === "oform") {
    draft[e.target.name] = e.target.value;
    if (e.target.name === "type") $("#addrBox").hidden = e.target.value === "pickup";
  }
  if (e.target.classList.contains("invalid")) {
    e.target.classList.remove("invalid");
    const m = e.target.nextElementSibling; if (m && m.classList.contains("err")) m.textContent = "";
  }
});

// NOTE: login / sign-up / newsletter are front-end only (validation + local feedback).
// Real accounts need a backend – never store passwords in the browser.
document.addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, kind = f.dataset.form, val = validator(f), v = n => f.elements[n].value.trim();
  if (f.id === "nl") {
    const ok = EMAIL.test(v("email"));
    f.elements.email.classList.toggle("invalid", !ok);
    if (ok) { f.reset(); toast(t("subbed")); } else toast(t("eEmail"));
  } else if (kind === "login") {
    val.check("email", EMAIL.test(v("email")), "eEmail");
    val.check("password", f.elements.password.value.length >= 6, "ePass");
    if (val.ok) { toast(t("okLogin")); setTimeout(() => { location.href = "Home.html"; }, 1000); }
  } else if (kind === "signup") {
    val.check("fName", v("fName").length >= 2, "eName");
    val.check("sName", v("sName").length >= 2, "eName");
    val.check("email", EMAIL.test(v("email")), "eEmail");
    val.check("password", f.elements.password.value.length >= 6, "ePass");
    val.check("passwordd", f.elements.passwordd.value === f.elements.password.value, "eMatch");
    if (val.ok) { toast(t("okSignup")); setTimeout(() => { location.href = "login.html"; }, 1000); }
  }
});

/* ===== start ===== */
applyTheme();
buildLayout();
applyLang();
})();
