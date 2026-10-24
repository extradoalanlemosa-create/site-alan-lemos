/* ===================================================================
   Detalhes do site (out/2026)
   0. Menu para telas menores (tablet e celular).
   1. A trena: no computador, o corpo da trena fica parado na lateral e
      a fita estica conforme a leitura avança, puxada por uma mãozinha.
      Clicar no corpo recolhe a fita (volta ao topo). Em telas menores,
      vira uma bolinha que vai se enchendo.
   2. Formas em gradiente (discos, bolinhas e triângulos do logo) presas
      a elementos da página — foto do topo, títulos, grades de cards,
      chamadas finais — girando devagar, cada uma no seu ritmo.
   3. Elementos que surgem com um movimento curto ao entrar na tela.
   Quem pede menos movimento no sistema vê tudo parado.
   =================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G1 = "#C1502E", G2 = "#F0A35E", G3 = "#9DB4E8", INK = "#2B3540";
  var GRAD = "linear-gradient(140deg," + G1 + " 0%," + G2 + " 50%," + G3 + " 100%)";
  var DESK = 1280; /* a partir dessa largura há margem lateral para a trena */

  var css = [
    /* ---------- trena (computador): desenho de traço, no estilo do logo ---------- */
    ".dl-tape{position:fixed;right:34px;top:16vh;width:40px;z-index:60;pointer-events:none;opacity:0;transition:opacity .6s ease}",
    ".dl-ready .dl-tape{opacity:1}",
    ".dl-case{position:relative;z-index:2;display:block;width:40px;height:40px;padding:0;border:0;background:none;cursor:pointer;pointer-events:auto;-webkit-tap-highlight-color:transparent}",
    ".dl-case svg{display:block;width:100%;height:100%;overflow:visible;transition:transform .25s cubic-bezier(.3,1.6,.5,1)}",
    ".dl-case:hover svg{transform:rotate(-8deg)}",
    ".dl-case:active svg{transform:scale(.94)}",
    ".dl-case:focus-visible{outline:2px solid " + G1 + ";outline-offset:5px;border-radius:10px}",
    ".dl-tip{position:absolute;right:50px;top:50%;transform:translate(6px,-50%);white-space:nowrap;font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.03em;color:#5B5A56;background:rgba(247,246,242,.96);border:1px solid #DEDAD0;border-radius:999px;padding:6px 10px;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}",
    ".dl-case:hover .dl-tip,.dl-case:focus-visible .dl-tip{opacity:1;transform:translate(0,-50%)}",
    /* fita: duas linhas finas com marquinhas espaçadas */
    ".dl-blade{position:absolute;z-index:0;left:9px;top:34px;width:7px;height:0;box-sizing:border-box;border-left:1.4px solid #3A3A38;border-right:1.4px solid #3A3A38;" +
      "background-image:repeating-linear-gradient(to top,#3A3A38 0 1.2px,transparent 1.2px 48px),repeating-linear-gradient(to top,rgba(58,58,56,.7) 0 1px,transparent 1px 12px);" +
      "background-size:100% 100%,3px 100%;background-repeat:no-repeat;background-position:left bottom}",
    ".dl-end{position:absolute;z-index:1;left:0;top:33px;width:40px;height:40px;will-change:transform}",
    ".dl-end svg{display:block;width:100%;height:100%;overflow:visible;transform-origin:12.5px 2px}",

    /* ---------- bolinha (telas menores) ---------- */
    ".dl-dot{position:fixed;right:16px;bottom:16px;width:46px;height:46px;padding:0;border:0;border-radius:50%;background:rgba(247,246,242,.94);box-shadow:0 4px 16px rgba(27,42,56,.14),inset 0 0 0 1.5px #DEDAD0;cursor:pointer;z-index:61;overflow:hidden;opacity:0;transform:translateY(12px) scale(.9);pointer-events:none;transition:opacity .35s ease,transform .35s ease;-webkit-tap-highlight-color:transparent}",
    ".dl-dot.dl-show{opacity:1;transform:none;pointer-events:auto}",
    ".dl-dot:focus-visible{outline:2px solid " + G1 + ";outline-offset:3px}",
    ".dl-dot svg{position:absolute;inset:0;width:100%;height:100%}",
    ".dl-wave{animation:dl-wave 2.6s linear infinite}",
    "@keyframes dl-wave{to{transform:translateX(-40px)}}",

    /* ---------- formas em gradiente, girando ---------- */
    ".dl-clip{overflow-x:clip}",
    ".dl-iso{isolation:isolate}",
    ".dl-acc{position:absolute;display:block;pointer-events:none;will-change:transform}",
    ".dl-acc>i{display:block;width:100%;height:100%;animation:dl-spin var(--t,30s) linear infinite;animation-direction:var(--d,normal)}",
    ".dl-acc svg{display:block;width:100%;height:100%;overflow:visible}",
    ".dl-disc>i,.dl-dotg>i{border-radius:50%;background:" + GRAD + "}",
    ".dl-disc>i{opacity:.92}",
    ".dl-back{z-index:-2}",
    /* sistema solar: um disco com um triângulo dando a volta */
    ".dl-orbit>i{animation:none;position:relative}",
    ".dl-orbit .dl-core{position:absolute;inset:22%;border-radius:50%;background:" + GRAD + ";animation:dl-spin 26s linear infinite}",
    ".dl-orbit .dl-path{position:absolute;inset:0;border-radius:50%;border:1.2px dashed rgba(193,80,46,.28)}",
    ".dl-orbit .dl-arm{position:absolute;inset:0;animation:dl-spin 14s linear infinite}",
    ".dl-orbit .dl-arm span{position:absolute;left:50%;top:0;width:22%;height:22%;transform:translate(-50%,-50%);animation:dl-spin 7s linear infinite reverse}",
    "@keyframes dl-spin{to{transform:rotate(360deg)}}",

    /* posições (computador) */
    ".dl-a-hd{width:132px;height:132px;top:-46px;left:-52px}",
    ".dl-a-ht{width:34px;height:34px;bottom:-46px;left:-20px}",
    ".dl-a-hdot{width:16px;height:16px;right:-36px;bottom:74px}",
    ".dl-a-orbit{width:132px;height:132px;top:50%;margin-top:-66px;right:max(20px,calc(50% - 560px))}",
    ".dl-a-title{position:relative!important;display:inline-block;width:.5em;height:.5em;margin-left:.32em;vertical-align:.04em}",
    ".dl-a-sd{width:96px;height:96px;top:-34px;right:-30px}",
    ".dl-a-st{width:26px;height:26px;bottom:22px;left:-40px}",
    ".dl-a-gd{width:74px;height:74px;top:-28px;right:-26px}",
    ".dl-a-gt{width:24px;height:24px;bottom:-34px;left:-6px}",
    ".dl-a-c1{width:34px;height:34px;top:28%;left:calc(50% - 360px)}",
    ".dl-a-c2{width:22px;height:22px;bottom:30%;right:calc(50% - 350px)}",
    ".dl-a-c3{width:12px;height:12px;top:22%;right:calc(50% - 300px)}",
    /* posições (tablet e celular) */
    "@media (max-width:820px){" +
      ".dl-a-hd{width:84px;height:84px;top:-30px;left:-20px}.dl-a-ht{width:26px;height:26px;bottom:-38px;left:-6px}.dl-a-hdot{width:12px;height:12px;right:-22px;bottom:40px}" +
      ".dl-a-orbit{width:58px;height:58px;top:12px;margin-top:0;right:14px}" +
      ".dl-a-sd{width:70px;height:70px;top:-24px;right:-14px}.dl-a-st{left:-8px;bottom:-34px;width:22px;height:22px}" +
      ".dl-a-gd{width:56px;height:56px;top:-20px;right:-12px}" +
      ".dl-a-c1{width:24px;height:24px;top:30px;left:18px}.dl-a-c2{width:16px;height:16px;bottom:34px;right:20px}.dl-a-c3{display:none}" +
    "}",

    /* ---------- surgir ao entrar na tela ---------- */
    ".dl-rv{opacity:0;transform:translateY(16px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}",
    ".dl-rv.dl-in{opacity:1;transform:none}",

    "@media (prefers-reduced-motion:reduce){.dl-wave,.dl-acc>i,.dl-orbit .dl-core,.dl-orbit .dl-arm,.dl-orbit .dl-arm span{animation:none}.dl-case svg{transition:none}.dl-rv{opacity:1;transform:none;transition:none}}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- desenhos ---------- */
  var DEFS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<linearGradient id="dl-cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + G1 + '"/><stop offset=".55" stop-color="' + G2 + '"/><stop offset="1" stop-color="' + G3 + '"/></linearGradient>' +
    "</defs></svg>";

  /* triângulo do logo (esquadro com a travessa do A) */
  function triSvg(kind) {
    if (kind === "fill") return '<svg viewBox="0 0 34 34"><path d="M5 3 L5 31 L31 31 Z" fill="url(#dl-cg)"/><path d="M5 23 H12" stroke="#fff" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"/></svg>';
    var c = kind === "blue" ? G3 : G1;
    return '<svg viewBox="0 0 34 34"><path d="M5 3 L5 31 L31 31 Z" fill="none" stroke="' + c + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M5 23 H13" stroke="' + c + '" stroke-width="2" stroke-linecap="round"/></svg>';
  }

  /* corpo da trena em traço: caixa, trava, miolo com um toque de gradiente e a boca por onde sai a fita */
  var LINE = 'fill="none" stroke="#3A3A38" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  var CASE_SVG =
    '<svg viewBox="0 0 40 40" aria-hidden="true">' +
    '<path d="M24 3.5 H30" ' + LINE + '/>' +
    '<path d="M9 34 H5.5 A2.5 2.5 0 0 1 3 31.5 V13 A8 8 0 0 1 11 5 H29 A8 8 0 0 1 37 13 V26 A8 8 0 0 1 29 34 H17" fill="#F7F6F2" stroke="#3A3A38" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="22" cy="19" r="7" fill="none" stroke="url(#dl-cg)" stroke-width="2"/>' +
    '<circle cx="22" cy="19" r="1.6" fill="#3A3A38"/>' +
    "</svg>";

  /* ponta da fita: o gancho e uma mãozinha em traço que puxa */
  var END_SVG =
    '<svg viewBox="0 0 40 40" aria-hidden="true">' +
    '<path d="M7.5 2 H17.5" fill="none" stroke="#3A3A38" stroke-width="2.2" stroke-linecap="round"/>' +
    '<g transform="translate(-1.5,2.5) scale(.7)">' +
    '<path d="M12 8 C12 5 14 4 17 4 H23 C26 4 28 5.5 28 8 C28 10.5 26.5 11.2 25.5 11.2 C27.5 11.4 28.6 13 28.4 15 C28.2 17 26.8 17.8 25.6 17.8 C27.4 18.2 28.2 19.8 28 21.6 C27.6 24 26 24.6 25 24.6 C25.5 28.5 22.5 31.5 19 31.5 H17.5 C14 31.5 12 28.8 12 25.5 Z" fill="#F7F6F2" stroke="#3A3A38" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M12 22 C9 20.8 7.8 15.5 9.6 12 C11 9.2 13.6 7 16.6 6 C18.3 5.5 19.3 7.3 18 8.5 C16.3 10 15 11.8 14.8 14.2" fill="#F7F6F2" stroke="#3A3A38" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M16 31.5 V40 M22 31 V40" fill="none" stroke="#3A3A38" stroke-width="2.2" stroke-linecap="round"/>' +
    "</g></svg>";

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

  /* ---------- formas: cria uma forma presa a um elemento ---------- */
  var floaters = [];
  function accent(host, kind, pos, opts) {
    opts = opts || {};
    var s = document.createElement("span");
    s.className = "dl-acc dl-a-" + pos + (kind === "disc" ? " dl-disc" : kind === "dot" ? " dl-dotg" : kind === "orbit" ? " dl-orbit" : "") + (opts.back ? " dl-back" : "");
    s.setAttribute("aria-hidden", "true");
    if (opts.t) s.style.setProperty("--t", opts.t + "s");
    if (opts.rev) s.style.setProperty("--d", "reverse");
    var inner = "";
    if (kind === "tri" || kind === "fill" || kind === "blue") inner = triSvg(kind);
    if (kind === "orbit") inner = '<span class="dl-path"></span><span class="dl-core"></span><span class="dl-arm"><span>' + triSvg("fill") + "</span></span>";
    s.innerHTML = "<i>" + inner + "</i>";
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    if (opts.back) host.classList.add("dl-iso");
    host.appendChild(s);
    var sec = host.closest("section, header, footer") || host;
    sec.classList.add("dl-clip");
    if (opts.k) floaters.push({ el: s, k: opts.k });
    return s;
  }

  function decorate(hero) {
    var used = [];
    function inHero(el) { return hero && hero.contains(el); }

    /* topo com foto: disco atrás do canto, triângulo embaixo e uma bolinha do outro lado */
    var photo = hero && hero.querySelector(".stack");
    if (photo) {
      hero.classList.add("dl-iso");
      accent(photo, "disc", "hd", { back: true, t: 40, k: 0.08 });
      accent(photo, "tri", "ht", { t: 22, k: -0.05 });
      accent(photo, "dot", "hdot", { t: 12, k: 0.12 });
    } else if (hero) {
      /* topo só com texto: um disquinho com um triângulo dando a volta */
      accent(hero, "orbit", "orbit", { k: 0.1 });
    }

    /* chamada central do fim da página: triângulo de um lado, bolinhas do outro */
    var walls = Array.prototype.filter.call(document.querySelectorAll("section .wrap"), function (w) {
      return !inHero(w) && getComputedStyle(w).textAlign === "center" && w.querySelector("h2");
    });
    var cta = walls[walls.length - 1];
    var ctaSec = cta && cta.closest("section");
    if (cta) {
      var sec = ctaSec;
      accent(sec, "tri", "c1", { t: 24, k: -0.04 });
      accent(sec, "dot", "c2", { t: 10, k: 0.05 });
      accent(sec, "dot", "c3", { t: 10, k: 0.08 });
    }

    /* primeiro título de seção: um triângulo girando ao lado */
    var head = Array.prototype.find.call(document.querySelectorAll(".section-head h2.section-title, section h2.section-title"), function (h) { return !inHero(h) && !(ctaSec && ctaSec.contains(h)); });
    if (head) {
      var s = document.createElement("span");
      s.className = "dl-acc dl-a-title";
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--t", "16s");
      s.innerHTML = "<i>" + triSvg("fill") + "</i>";
      head.appendChild(s);
      used.push(head);
    }

    /* foto fora do topo (ex.: "Sobre mim" na página inicial) */
    var stack2 = Array.prototype.find.call(document.querySelectorAll(".stack"), function (el) { return !inHero(el); });
    if (stack2) {
      accent(stack2, "disc", "sd", { back: true, t: 34, rev: true, k: 0.06 });
      accent(stack2, "blue", "st", { t: 26, rev: true, k: -0.04 });
    }

    /* primeira grade de cards: disco espiando atrás do canto do último card da primeira linha */
    var grid = Array.prototype.find.call(document.querySelectorAll(".card-grid, .func-grid, .role-grid"), function (el) { return !inHero(el); });
    if (grid) {
      var gd = accent(grid, "disc", "gd", { back: true, t: 30, k: 0.05 });
      accent(grid, "tri", "gt", { t: 20, rev: true, k: -0.03 });
      var placeGrid = function () {
        var kids = Array.prototype.filter.call(grid.children, function (c) { return !c.classList.contains("dl-acc"); });
        if (!kids.length) return;
        var last = kids[0];
        kids.forEach(function (c) { if (c.offsetTop === kids[0].offsetTop) last = c; });
        gd.style.marginRight = Math.max(0, grid.clientWidth - (last.offsetLeft + last.offsetWidth)) + "px";
      };
      placeGrid();
      window.addEventListener("resize", placeGrid);
    }
  }

  function init() {
    setupMenu();
    document.body.insertAdjacentHTML("beforeend", DEFS);

    var hero = document.querySelector("section.hero");
    decorate(hero);

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

      /* formas: deslocamento curto com a rolagem, relativo a onde estão na tela */
      if (!reduce) {
        for (var i = 0; i < floaters.length; i++) {
          var f = floaters[i];
          var r = f.el.parentNode.getBoundingClientRect();
          var off = (r.top + r.height / 2 - window.innerHeight / 2) * f.k;
          f.el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
        }
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
      ".psr-card", ".tech-item", ".final-cta", ".browser-chrome", ".func-card", ".timeline li"
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
