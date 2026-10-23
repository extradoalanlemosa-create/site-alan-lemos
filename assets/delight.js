/* ===================================================================
   Detalhes lúdicos do site (out/2026)
   1. O esquadro: o triângulo do logo, em gradiente, acompanha a leitura
      pela lateral da página. Mostra quanto já foi lido e, ao clicar,
      volta ao topo.
   2. Formas no topo: um círculo difuso, um anel e um triângulo pequeno,
      flutuando devagar atrás do conteúdo.
   3. Elementos que surgem com um movimento curto ao entrar na tela.
   Quem pede menos movimento no sistema vê tudo parado.
   =================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G1 = "#C1502E", G2 = "#F0A35E", G3 = "#9DB4E8";

  var css = [
    /* ---------- esquadro ---------- */
    ".dl-track{position:fixed;right:42px;top:22vh;height:56vh;width:2px;border-radius:2px;background:rgba(58,58,56,.10);z-index:60;pointer-events:none;opacity:0;transition:opacity .6s ease}",
    ".dl-track i{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:2px;background:linear-gradient(180deg," + G1 + "," + G2 + " 55%," + G3 + ");transform-origin:top;transform:scaleY(0)}",
    ".dl-sq{position:fixed;right:22px;top:0;width:42px;height:42px;padding:0;border:0;background:none;cursor:pointer;z-index:61;opacity:0;transition:opacity .6s ease;-webkit-tap-highlight-color:transparent}",
    ".dl-ready .dl-sq,.dl-ready .dl-track{opacity:1}",
    ".dl-sq svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 6px 10px rgba(193,80,46,.22))}",
    ".dl-sq .dl-bob{animation:dl-bob 4.5s ease-in-out infinite;transform-origin:center}",
    ".dl-sq:hover svg{filter:drop-shadow(0 8px 14px rgba(193,80,46,.34))}",
    ".dl-sq:focus-visible{outline:2px solid " + G1 + ";outline-offset:6px;border-radius:10px}",
    ".dl-sq .dl-tip{position:absolute;right:52px;top:50%;transform:translate(6px,-50%);white-space:nowrap;font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.04em;color:#5B5A56;background:rgba(247,246,242,.95);border:1px solid #DEDAD0;border-radius:999px;padding:6px 10px;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}",
    ".dl-sq:hover .dl-tip,.dl-sq:focus-visible .dl-tip{opacity:1;transform:translate(0,-50%)}",
    ".dl-sq .dl-ring{display:none}",
    /* modo compacto (telas menores): canto inferior direito, com anel de progresso */
    ".dl-compact .dl-track{display:none}",
    ".dl-compact .dl-sq{top:auto!important;bottom:18px;right:18px;width:46px;height:46px;border-radius:50%;background:rgba(247,246,242,.92);box-shadow:0 4px 16px rgba(27,42,56,.14);padding:9px;transform:translateY(12px) scale(.9);opacity:0;pointer-events:none;transition:opacity .35s ease,transform .35s ease}",
    ".dl-compact .dl-sq.dl-show{opacity:1;transform:none;pointer-events:auto}",
    ".dl-compact .dl-sq svg{filter:none}",
    ".dl-compact .dl-sq .dl-ring{display:block;position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}",
    ".dl-compact .dl-sq .dl-tip{display:none}",
    "@keyframes dl-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",

    /* ---------- formas do topo ---------- */
    ".dl-has-shapes{position:relative;overflow:hidden;isolation:isolate}",
    ".dl-shapes{position:absolute;inset:0;z-index:-1;pointer-events:none}",
    ".dl-p{position:absolute;display:block;will-change:transform}",
    ".dl-p>i{display:block;width:100%;height:100%}",
    ".dl-orb{width:440px;height:440px;top:-170px;right:-90px}",
    ".dl-orb>i{border-radius:50%;background:radial-gradient(circle at 35% 35%," + G2 + " 0%,rgba(240,163,94,.55) 28%,rgba(157,180,232,.45) 55%,rgba(157,180,232,0) 72%);filter:blur(26px);opacity:.42;animation:dl-drift 19s ease-in-out infinite alternate}",
    ".dl-ring{width:150px;height:150px;left:3%;bottom:-58px}",
    ".dl-ring>i{animation:dl-float 13s ease-in-out infinite alternate}",
    ".dl-tri{width:30px;height:30px;top:17%;left:4.5%}",
    ".dl-tri>i{animation:dl-spin 38s linear infinite}",
    "@keyframes dl-drift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-46px,30px) scale(1.08)}}",
    "@keyframes dl-float{0%{transform:translateY(0)}100%{transform:translateY(-18px)}}",
    "@keyframes dl-spin{to{transform:rotate(360deg)}}",
    "@media (max-width:820px){.dl-ring,.dl-tri{display:none}.dl-orb{width:300px;height:300px;top:-120px;right:-120px}}",

    /* ---------- surgir ao entrar na tela ---------- */
    ".dl-rv{opacity:0;transform:translateY(16px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}",
    ".dl-rv.dl-in{opacity:1;transform:none}",

    "@media (prefers-reduced-motion:reduce){.dl-sq .dl-bob,.dl-orb>i,.dl-ring>i,.dl-tri>i{animation:none}.dl-rv{opacity:1;transform:none;transition:none}}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* triângulo do logo (A + L num esquadro), em gradiente, com o vazado de um esquadro de verdade */
  function squareSvg(id) {
    return '<svg viewBox="0 0 60 60" aria-hidden="true"><defs>' +
      '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + G1 + '"/><stop offset=".55" stop-color="' + G2 + '"/><stop offset="1" stop-color="' + G3 + '"/>' +
      "</linearGradient></defs>" +
      '<g class="dl-rot"><g class="dl-bob"><path fill="url(#' + id + ')" fill-rule="evenodd" d="M9 5 L9 55 L56 55 Z M17 25 L17 47 L36 47 Z"/>' +
      '<g stroke="#fff" stroke-opacity=".75" stroke-width="1.4" stroke-linecap="round">' +
      '<line x1="21" y1="55" x2="21" y2="51.5"/><line x1="29" y1="55" x2="29" y2="52.5"/><line x1="37" y1="55" x2="37" y2="51.5"/><line x1="45" y1="55" x2="45" y2="52.5"/>' +
      "</g></g></g></svg>";
  }

  function init() {
    /* ---------- formas do topo ---------- */
    var hero = document.querySelector("section.hero");
    var shapes = [];
    if (hero) {
      hero.classList.add("dl-has-shapes");
      var box = document.createElement("div");
      box.className = "dl-shapes";
      box.setAttribute("aria-hidden", "true");
      box.innerHTML =
        '<span class="dl-p dl-orb" data-k="0.22"><i></i></span>' +
        '<span class="dl-p dl-ring" data-k="-0.10"><i><svg viewBox="0 0 150 150" width="100%" height="100%"><defs><linearGradient id="dl-rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + G2 + '"/><stop offset="1" stop-color="' + G3 + '"/></linearGradient></defs><circle cx="75" cy="75" r="72" fill="none" stroke="url(#dl-rg)" stroke-width="1.6" opacity=".8"/><circle cx="75" cy="3" r="4" fill="' + G1 + '"/></svg></i></span>' +
        '<span class="dl-p dl-tri" data-k="0.05"><i><svg viewBox="0 0 60 60" width="100%" height="100%"><path d="M9 5 L9 55 L56 55 Z" fill="none" stroke="' + G1 + '" stroke-width="3" stroke-linejoin="round" opacity=".55"/></svg></i></span>';
      hero.insertBefore(box, hero.firstChild);
      shapes = Array.prototype.slice.call(box.querySelectorAll(".dl-p"));
    }

    /* ---------- esquadro ---------- */
    var track = document.createElement("div");
    track.className = "dl-track";
    track.setAttribute("aria-hidden", "true");
    track.innerHTML = "<i></i>";
    var sq = document.createElement("button");
    sq.type = "button";
    sq.className = "dl-sq";
    sq.setAttribute("aria-label", "Voltar ao topo");
    sq.innerHTML = squareSvg("dl-sg") +
      '<svg class="dl-ring" viewBox="0 0 46 46" aria-hidden="true"><circle cx="23" cy="23" r="21.5" fill="none" stroke="rgba(58,58,56,.10)" stroke-width="2"/>' +
      '<circle class="dl-ring-p" cx="23" cy="23" r="21.5" fill="none" stroke="' + G1 + '" stroke-width="2" stroke-linecap="round" stroke-dasharray="135.1" stroke-dashoffset="135.1"/></svg>' +
      '<span class="dl-tip">voltar ao topo</span>';
    document.body.appendChild(track);
    document.body.appendChild(sq);
    var fill = track.firstChild;
    var ringP = sq.querySelector(".dl-ring-p");
    var rotG = sq.querySelector(".dl-rot");
    rotG.style.transformOrigin = "30px 30px";

    sq.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    var tilt = 0, tiltTarget = 0;
    if (!reduce) {
      window.addEventListener("mousemove", function (e) {
        tiltTarget = ((e.clientX / window.innerWidth) - 0.5) * 16;
        schedule();
      }, { passive: true });
    }

    var ticking = false;
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
      var compact = window.innerWidth < 1260;
      document.body.classList.toggle("dl-compact", compact);

      tilt += (tiltTarget - tilt) * 0.12;
      if (Math.abs(tiltTarget - tilt) > 0.05) schedule();
      var rot = reduce ? 0 : p * 270 + tilt;

      if (compact) {
        sq.style.top = "";
        sq.style.visibility = "";
        sq.classList.toggle("dl-show", scrollable && y > 260);
        ringP.setAttribute("stroke-dashoffset", (135.1 * (1 - p)).toFixed(1));
        rotG.style.transform = "rotate(" + (reduce ? 0 : p * 360) + "deg)";
      } else {
        sq.style.visibility = scrollable ? "visible" : "hidden";
        track.style.visibility = scrollable ? "visible" : "hidden";
        var top = window.innerHeight * 0.22, h = window.innerHeight * 0.56;
        sq.style.top = (top + p * h - 21) + "px";
        fill.style.transform = "scaleY(" + p.toFixed(4) + ")";
        rotG.style.transform = "rotate(" + rot.toFixed(2) + "deg)";
      }

      /* parallax suave das formas do topo */
      if (!reduce) {
        for (var i = 0; i < shapes.length; i++) {
          var k = parseFloat(shapes[i].getAttribute("data-k"));
          var extra = shapes[i].classList.contains("dl-tri") ? " rotate(" + (y * 0.12).toFixed(1) + "deg)" : "";
          shapes[i].style.transform = "translate3d(0," + (y * k).toFixed(1) + "px,0)" + extra;
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
