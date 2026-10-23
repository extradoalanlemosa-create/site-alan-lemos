/* ===================================================================
   Detalhes do site (out/2026)
   0. Menu para telas menores (tablet e celular).
   1. A trena: no computador, o corpo da trena fica parado na lateral e
      a fita estica conforme a leitura avança, puxada por uma mãozinha.
      Clicar no corpo da trena recolhe a fita (volta ao topo).
      Em telas menores, vira uma bolinha que vai se enchendo.
   2. Formas presas à foto do topo: um disco em gradiente atrás da foto
      e um triângulo pequeno no canto oposto.
   3. Elementos que surgem com um movimento curto ao entrar na tela.
   Quem pede menos movimento no sistema vê tudo parado.
   =================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G1 = "#C1502E", G2 = "#F0A35E", G3 = "#9DB4E8", INK = "#2B3540";
  var DESK = 1280; /* a partir dessa largura há margem lateral para a trena */

  var css = [
    /* ---------- trena (computador) ---------- */
    ".dl-tape{position:fixed;right:30px;top:16vh;width:48px;z-index:60;pointer-events:none;opacity:0;transition:opacity .6s ease}",
    ".dl-ready .dl-tape{opacity:1}",
    ".dl-case{position:relative;display:block;width:48px;height:48px;padding:0;border:0;background:none;cursor:pointer;pointer-events:auto;-webkit-tap-highlight-color:transparent}",
    ".dl-case svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 5px 9px rgba(193,80,46,.22));transition:transform .25s cubic-bezier(.3,1.6,.5,1)}",
    ".dl-case:hover svg{transform:rotate(-8deg) scale(1.05)}",
    ".dl-case:active svg{transform:scale(.94)}",
    ".dl-case:focus-visible{outline:2px solid " + G1 + ";outline-offset:5px;border-radius:12px}",
    ".dl-tip{position:absolute;right:58px;top:50%;transform:translate(6px,-50%);white-space:nowrap;font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.03em;color:#5B5A56;background:rgba(247,246,242,.96);border:1px solid #DEDAD0;border-radius:999px;padding:6px 10px;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}",
    ".dl-case:hover .dl-tip,.dl-case:focus-visible .dl-tip{opacity:1;transform:translate(0,-50%)}",
    /* a fita sai da boca da trena, na base do corpo */
    ".dl-blade{position:absolute;left:12px;top:42px;width:11px;height:0;border-radius:0 0 1px 1px;" +
      "background-color:#FBEBD6;" +
      "background-image:repeating-linear-gradient(to top,rgba(43,53,64,.55) 0 1px,transparent 1px 30px),repeating-linear-gradient(to top,rgba(43,53,64,.38) 0 1px,transparent 1px 6px);" +
      "background-size:100% 100%,4px 100%;background-repeat:no-repeat;background-position:left bottom,left bottom;" +
      "box-shadow:inset -1px 0 0 rgba(240,163,94,.65),inset 1px 0 0 rgba(193,80,46,.25)}",
    ".dl-end{position:absolute;left:0;top:42px;width:36px;height:46px;will-change:transform}",
    ".dl-end svg{display:block;width:100%;height:100%;overflow:visible;transform-origin:17px 2px}",

    /* ---------- bolinha (telas menores) ---------- */
    ".dl-dot{position:fixed;right:16px;bottom:16px;width:46px;height:46px;padding:0;border:0;border-radius:50%;background:rgba(247,246,242,.94);box-shadow:0 4px 16px rgba(27,42,56,.14),inset 0 0 0 1.5px #DEDAD0;cursor:pointer;z-index:61;overflow:hidden;opacity:0;transform:translateY(12px) scale(.9);pointer-events:none;transition:opacity .35s ease,transform .35s ease;-webkit-tap-highlight-color:transparent}",
    ".dl-dot.dl-show{opacity:1;transform:none;pointer-events:auto}",
    ".dl-dot:focus-visible{outline:2px solid " + G1 + ";outline-offset:3px}",
    ".dl-dot svg{position:absolute;inset:0;width:100%;height:100%}",
    ".dl-wave{animation:dl-wave 2.6s linear infinite}",
    "@keyframes dl-wave{to{transform:translateX(-40px)}}",

    /* ---------- formas presas à foto do topo ---------- */
    ".dl-has-shapes{position:relative;overflow-x:clip;isolation:isolate}",
    ".dl-disc{position:absolute;z-index:-2;pointer-events:none;width:132px;height:132px;top:-46px;left:-52px}",
    ".dl-disc>i{display:block;width:100%;height:100%;border-radius:50%;background:linear-gradient(140deg," + G1 + " 0%," + G2 + " 50%," + G3 + " 100%);opacity:.9;animation:dl-float 9s ease-in-out infinite alternate}",
    ".dl-tri{position:absolute;z-index:3;pointer-events:none;width:34px;height:34px;bottom:-44px;left:-18px}",
    ".dl-tri svg{display:block;width:100%;height:100%}",
    "@keyframes dl-float{0%{transform:translate(0,0)}100%{transform:translate(6px,10px)}}",
    "@media (max-width:820px){.dl-disc{width:84px;height:84px;top:-30px;left:-20px}.dl-tri{width:26px;height:26px;bottom:-36px;left:-6px}}",

    /* ---------- surgir ao entrar na tela ---------- */
    ".dl-rv{opacity:0;transform:translateY(16px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}",
    ".dl-rv.dl-in{opacity:1;transform:none}",

    "@media (prefers-reduced-motion:reduce){.dl-wave,.dl-disc>i{animation:none}.dl-case svg{transition:none}.dl-rv{opacity:1;transform:none;transition:none}}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* corpo da trena: caixa arredondada em gradiente, com o miolo e a trava */
  var CASE_SVG =
    '<svg viewBox="0 0 48 48" aria-hidden="true"><defs>' +
    '<linearGradient id="dl-cg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="' + G1 + '"/><stop offset=".55" stop-color="' + G2 + '"/><stop offset="1" stop-color="' + G3 + '"/>' +
    "</linearGradient></defs>" +
    '<rect x="26" y="3" width="10" height="5" rx="2.5" fill="' + INK + '"/>' +
    '<path d="M10 6 H38 A8 8 0 0 1 46 14 V36 A8 8 0 0 1 38 44 H24 V42 H11 V44 H10 A8 8 0 0 1 2 36 V14 A8 8 0 0 1 10 6 Z" fill="url(#dl-cg)"/>' +
    '<circle cx="26" cy="25" r="10" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>' +
    '<circle cx="26" cy="25" r="3.2" fill="#fff" fill-opacity=".85"/>' +
    '<rect x="10" y="41" width="15" height="3" rx="1.2" fill="' + INK + '" fill-opacity=".85"/>' +
    "</svg>";

  /* ponta da fita: o gancho de metal e a mãozinha que puxa */
  var END_SVG =
    '<svg viewBox="0 0 36 46" aria-hidden="true">' +
    '<rect x="10" y="0" width="15" height="3.2" rx="1" fill="' + INK + '"/>' +
    /* manga em gradiente */
    '<path d="M14 31.5 h9 l1.4 12.5 h-11.8 z" fill="url(#dl-cg)"/>' +
    /* punho fechado segurando o gancho, com os dedos dobrados */
    '<path d="M12 8 C12 5 14 4 17 4 H23 C26 4 28 5.5 28 8 C28 10.5 26.5 11.2 25.5 11.2 C27.5 11.4 28.6 13 28.4 15 C28.2 17 26.8 17.8 25.6 17.8 C27.4 18.2 28.2 19.8 28 21.6 C27.6 24 26 24.6 25 24.6 C25.5 28.5 22.5 31.5 19 31.5 H17.5 C14 31.5 12 28.8 12 25.5 Z" fill="#FFF8F1" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>' +
    '<path d="M21 11.2 H25.5 M21 17.8 H25.6 M21.5 24.6 H25" stroke="' + INK + '" stroke-width="1.3" stroke-linecap="round" fill="none"/>' +
    /* polegar por cima do gancho */
    '<path d="M12 22 C9 20.8 7.8 15.5 9.6 12 C11 9.2 13.6 7 16.6 6 C18.3 5.5 19.3 7.3 18 8.5 C16.3 10 15 11.8 14.8 14.2" fill="#FFF8F1" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  function setupMenu() {
    var bar = document.querySelector(".topbar .wrap");
    var nav = bar && bar.querySelector("nav.main-nav");
    if (!nav) return;
    var topbar = bar.parentNode;
    var cta = nav.querySelector("a.btn-primary");
    if (cta) {
      var c2 = cta.cloneNode(true);
      c2.className = "btn btn-primary topbar-cta";
      c2.removeAttribute("style");
      bar.appendChild(c2);
    }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menu");
    if (!nav.id) nav.id = "menu-principal";
    btn.setAttribute("aria-controls", nav.id);
    btn.innerHTML = "<span></span><span></span>";
    bar.appendChild(btn);
    function set(open) {
      topbar.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }
    btn.addEventListener("click", function () { set(!topbar.classList.contains("nav-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    document.addEventListener("click", function (e) { if (!topbar.contains(e.target)) set(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 980) set(false); });
  }

  function init() {
    setupMenu();

    /* ---------- formas presas à foto do topo ---------- */
    var hero = document.querySelector("section.hero");
    var photo = hero && hero.querySelector(".stack");
    var disc = null, tri = null;
    if (photo) {
      hero.classList.add("dl-has-shapes");
      disc = document.createElement("span");
      disc.className = "dl-disc";
      disc.setAttribute("aria-hidden", "true");
      disc.innerHTML = "<i></i>";
      tri = document.createElement("span");
      tri.className = "dl-tri";
      tri.setAttribute("aria-hidden", "true");
      tri.innerHTML = '<svg viewBox="0 0 34 34"><path d="M5 3 L5 31 L31 31 Z" fill="none" stroke="' + G1 + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M5 23 H13" stroke="' + G1 + '" stroke-width="2" stroke-linecap="round"/></svg>';
      photo.insertBefore(disc, photo.firstChild);
      photo.appendChild(tri);
    }

    /* ---------- trena ---------- */
    var tape = document.createElement("div");
    tape.className = "dl-tape";
    tape.innerHTML =
      '<div class="dl-blade"></div>' +
      '<div class="dl-end">' + END_SVG + "</div>" +
      '<button type="button" class="dl-case" aria-label="Voltar ao topo">' + CASE_SVG + '<span class="dl-tip">recolher a trena · voltar ao topo</span></button>';
    var blade = tape.querySelector(".dl-blade");
    var end = tape.querySelector(".dl-end");
    var hand = tape.querySelector(".dl-end svg");

    /* ---------- bolinha ---------- */
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dl-dot";
    dot.setAttribute("aria-label", "Voltar ao topo");
    dot.innerHTML =
      '<svg viewBox="0 0 46 46" aria-hidden="true"><defs>' +
      '<linearGradient id="dl-dg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="' + G1 + '"/><stop offset=".55" stop-color="' + G2 + '"/><stop offset="1" stop-color="' + G3 + '"/></linearGradient>' +
      '<clipPath id="dl-dc"><circle cx="23" cy="23" r="21.5"/></clipPath></defs>' +
      '<g clip-path="url(#dl-dc)"><g class="dl-level"><path class="dl-wave" fill="url(#dl-dg)" d="M0 4 Q10 0 20 4 T40 4 T60 4 T80 4 T100 4 V60 H0 Z"/></g></g>' +
      '<path d="M17 25.5 L23 19.5 L29 25.5" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var level = dot.querySelector(".dl-level");

    document.body.appendChild(tape);
    document.body.appendChild(dot);

    function toTop() { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }
    tape.querySelector(".dl-case").addEventListener("click", toTop);
    dot.addEventListener("click", toTop);

    var ticking = false, lastY = window.scrollY || 0, sway = 0;
    function schedule() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var y = window.scrollY || window.pageYOffset;
      var p = Math.min(1, Math.max(0, y / max));
      var scrollable = doc.scrollHeight - window.innerHeight > 240;
      var desk = window.innerWidth >= DESK;

      /* a mão balança um pouco na direção do puxão e volta ao repouso */
      var dy = y - lastY; lastY = y;
      if (!reduce) {
        sway += (Math.max(-9, Math.min(9, dy * 0.35)) - sway) * 0.25;
        if (Math.abs(sway) > 0.05) schedule(); else sway = 0;
      }

      tape.style.display = desk && scrollable ? "" : "none";
      if (desk) {
        var L = window.innerHeight * 0.62;
        var len = p * L;
        blade.style.height = len.toFixed(1) + "px";
        end.style.transform = "translate3d(0," + len.toFixed(1) + "px,0)";
        hand.style.transform = "rotate(" + (-sway).toFixed(2) + "deg)";
        dot.classList.remove("dl-show");
      } else {
        dot.classList.toggle("dl-show", scrollable && y > 260);
        /* nível do líquido: de 44 (vazio) a 0 (cheio) */
        level.setAttribute("transform", "translate(0," + (44 - p * 46).toFixed(1) + ")");
      }

      /* formas da foto: deslocamento curto com a rolagem */
      if (!reduce && disc) {
        disc.style.transform = "translate3d(0," + (y * 0.08).toFixed(1) + "px,0)";
        tri.style.transform = "translate3d(0," + (y * -0.05).toFixed(1) + "px,0) rotate(" + (y * 0.08).toFixed(1) + "deg)";
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    requestAnimationFrame(function () { document.body.classList.add("dl-ready"); });

    /* ---------- surgir ao entrar na tela ---------- */
    if (reduce || !("IntersectionObserver" in window)) return;
    var sel = [
      ".section-head", "section h2.section-title", ".p-card", ".role-card", ".step", ".showcase",
      ".about-photo", ".about-body", ".hobby", ".related", ".photo-pair figure", ".article h2", ".article h3",
      ".psr-card", ".tech-item", ".final-cta", ".demo-wide", ".browser-chrome", ".func-card"
    ].join(",");
    var nodes = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) {
      if (hero && hero.contains(el)) return false;
      if (el.matches("h2.section-title") && el.closest(".section-head")) return false;
      var r = el.getBoundingClientRect();
      return r.top > window.innerHeight * 0.92; /* o que já está na tela fica parado */
    });
    nodes = nodes.filter(function (el) {
      return !nodes.some(function (o) { return o !== el && o.contains(el); });
    });
    nodes.forEach(function (el) { el.classList.add("dl-rv"); });
    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (en) { return en.isIntersecting; }).map(function (en) { return en.target; });
      shown.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
      shown.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i, 4) * 80 + "ms";
        el.classList.add("dl-in");
        io.unobserve(el);
        /* depois de aparecer, devolve o elemento ao estilo normal (hover dos cards etc.) */
        setTimeout(function () { el.style.transitionDelay = ""; el.classList.remove("dl-rv", "dl-in"); }, 1400);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
