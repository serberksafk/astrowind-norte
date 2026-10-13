/* Telectrich I1 · prototipo · JS suelto (en Astro: islas con GSAP donde corresponda) */
(() => {
  const d = document, root = d.documentElement;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const io = (els, fn, opt) => {
    if (!("IntersectionObserver" in window)) { els.forEach((e) => fn(e, true)); return; }
    const o = new IntersectionObserver((es) => es.forEach((e) => fn(e.target, e.isIntersecting, o)), opt);
    els.forEach((e) => o.observe(e));
  };

  // menú móvil
  const mb = $(".menu-btn"), nav = $("#nav");
  if (mb && nav) {
    mb.addEventListener("click", () => {
      const o = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", o);
    });
    d.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); mb.setAttribute("aria-expanded", false); mb.focus(); } });
  }

  // hero unifilar (una vez por sesión)
  if (root.classList.contains("u-play")) {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("u-go")));
    try { sessionStorage.setItem("u-played", "1"); } catch {}
  }

  // hero: carrusel de imágenes (pausable; sin autoplay con reduced-motion)
  const hs = $(".hero-slides");
  if (hs) {
    const sl = $$(".sl", hs), dots = $$(".hero-dot"), out = $("[data-cap-out]"), pb = $(".hero-pause");
    let i = 0, timer = 0, paused = still, seen = true;
    const go = (n) => {
      sl[i].classList.remove("on"); dots[i].removeAttribute("aria-current");
      i = (n + sl.length) % sl.length;
      sl[i].classList.add("on"); dots[i].setAttribute("aria-current", "true");
      out && (out.textContent = sl[i].dataset.cap);
    };
    const run = () => { clearInterval(timer); if (!paused && seen && !d.hidden) timer = setInterval(() => go(i + 1), 6500); };
    const setPause = (p) => { paused = p; pb.setAttribute("aria-pressed", p); pb.setAttribute("aria-label", p ? "Reanudar el carrusel" : "Pausar el carrusel"); run(); };
    dots.forEach((b, n) => b.addEventListener("click", () => { go(n); run(); }));
    pb.addEventListener("click", () => setPause(!paused));
    d.addEventListener("visibilitychange", run);
    io([hs], (el, on) => { seen = on; run(); });
    setPause(still);
  }

  // barra inferior (celular) y flotante: se esconden con el CTA a la vista
  const watch = $$("[data-cta-watch]");
  const bar = $(".barra"), fab = $(".fab");
  if (watch.length && (bar || fab)) {
    const vis = new Set();
    io(watch, (el, on) => {
      on ? vis.add(el) : vis.delete(el);
      const h = vis.size > 0;
      bar && bar.classList.toggle("hide", h);
      fab && fab.classList.toggle("hide", h);
    });
  }

  // tarjetas de soluciones: revelado + número que rueda
  $$(".num[data-n]").forEach((n) => {
    const txt = n.dataset.n;
    const plain = n.querySelector(".plain");
    const roll = d.createElement("span");
    roll.className = "roll"; roll.setAttribute("aria-hidden", "true");
    [...txt].forEach((ch, i) => {
      const col = d.createElement("span"); col.className = "col"; col.style.setProperty("--cd", (0.15 + i * 0.06) + "s");
      col.dataset.d = ch;
      for (let k = 0; k < 10; k++) { const s = d.createElement("span"); s.textContent = k; col.appendChild(s); }
      roll.appendChild(col);
    });
    n.appendChild(roll);
    if (plain) plain.classList.add("sr");
    if (still) roll.querySelectorAll(".col").forEach((c) => (c.style.transform = `translateY(${-c.dataset.d}em)`));
  });
  const cards = $$(".reveal");
  cards.forEach((c, i) => c.style.setProperty("--rd", ((i % 2) * 0.1) + "s"));
  io(cards, (el, on, o) => {
    if (!on) return;
    el.classList.add("in");
    $$(".col", el).forEach((c) => (c.style.transform = `translateY(${-c.dataset.d}em)`));
    o && o.unobserve(el);
  }, { rootMargin: "0px 0px -15% 0px" });

  // línea FAT -> SAT
  const line = $(".line");
  if (line) {
    const steps = $$(".step", line);
    const end = $(".btn--ring", line);
    let ringed = false, tick = false;
    const upd = () => {
      tick = false;
      const vh = innerHeight, r = line.getBoundingClientRect();
      const y = vh * 0.6;
      const p = Math.min(1, Math.max(0, (y - r.top - 20) / Math.max(1, r.height - 140)));
      line.style.setProperty("--p", p.toFixed(4));
      steps.forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < y));
      if (!ringed && end && p > 0.985) { ringed = true; end.classList.add("go"); }
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    if (still) { line.style.setProperty("--p", 1); steps.forEach((s) => s.classList.add("on")); }
    else { addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); upd(); }
  }

  // cookies
  const ck = $(".cookie");
  if (ck) {
    if (!store.get("ck")) ck.classList.add("show");
    $$("[data-ck]", ck).forEach((b) => b.addEventListener("click", () => { store.set("ck", b.dataset.ck); ck.classList.remove("show"); }));
    $$("[data-open-ck]").forEach((b) => b.addEventListener("click", () => { ck.classList.add("show"); $("[data-ck]", ck).focus(); }));
  }

  // contacto
  const form = $("#cotiza");
  if (form) {
    const wrap = form.closest(".form");
    if (/[?&]wa=1/.test(location.search)) d.body.classList.add("wa-only");
    const msgs = { nombre: "Escribe tu nombre.", correo: "Escribe tu correo.", area: "Elige el área de desempeño.", gama: "Elige una gama.", consent: "Acepta la política de privacidad para enviar." };
    const setErr = (f, t) => {
      const box = f.closest(".field, .check");
      box.classList.toggle("bad", !!t);
      const e = $(".err span", box); if (e && t) e.textContent = t;
      const c = $("input,select,textarea", box); c && (t ? c.setAttribute("aria-invalid", "true") : c.removeAttribute("aria-invalid"));
    };
    const validate = (f) => {
      const v = f.type === "checkbox" ? f.checked : f.value.trim();
      if (f.required && !v) return msgs[f.name];
      if (f.name === "correo" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Revisa el correo: parece incompleto.";
      if (f.name === "tel" && v && !/^[0-9 +()\-]+$/.test(v)) return "Revisa el teléfono: usa solo números, espacios y + ( ) -.";
      return "";
    };
    $$("input,select,textarea", form).forEach((f) => { if (f.type !== "file") f.addEventListener("blur", () => setErr(f, validate(f))); });
    const file = $("#archivo"), fname = $("#archivo-nombre");
    file.addEventListener("change", () => {
      const f = file.files[0]; const box = file.closest(".field");
      if (!f) { fname.textContent = "Ningún archivo seleccionado"; setErr(file, ""); return; }
      const ok = /\.(pdf|dwg|dxf|png|jpe?g|xlsx)$/i.test(f.name);
      if (!ok) { setErr(file, "Tipo de archivo no permitido. Usa PDF, DWG, DXF, PNG, JPG o XLSX."); file.value = ""; fname.textContent = "Ningún archivo seleccionado"; return; }
      if (f.size > 10 * 1024 * 1024) { setErr(file, "El archivo supera 10 MB. Adjunta uno más liviano o envíanoslo a ventas@atingenieria.com."); file.value = ""; fname.textContent = "Ningún archivo seleccionado"; return; }
      setErr(file, ""); fname.textContent = f.name;
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let first = null;
      $$("input,select,textarea", form).forEach((f) => { if (f.type === "file") return; const t = validate(f); setErr(f, t); if (t && !first) first = f; });
      if (first) { first.focus(); return; }
      // prototipo: sin envío real
      const btn = $("#enviar"); btn.textContent = "Enviando…"; btn.disabled = true;
      setTimeout(() => { wrap.classList.add("sent"); const ok = $(".form-ok", wrap); ok.setAttribute("tabindex", "-1"); ok.focus(); }, 500);
    });
  }

  // altura de la pieza del tablero (iframe)
  addEventListener("message", (e) => {
    if (!e.data || e.data.tablero !== "h") return;
    const f = $("#tablero"); if (f) f.style.height = e.data.v + "px";
  });
})();
