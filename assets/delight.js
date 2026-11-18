/* Menu para telas menores (tablet e celular). É a única função deste arquivo:
   as formas decorativas, a trena e as animações de entrada foram retiradas
   na repaginada minimalista de nov/2026. */
(function () {
  "use strict";
  var EN = (document.documentElement.lang || "").indexOf("en") === 0;
  var TXT = EN ? { open: "Open menu", close: "Close menu" } : { open: "Abrir menu", close: "Fechar menu" };

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
  btn.setAttribute("aria-label", TXT.open);
  if (!nav.id) nav.id = "menu-principal";
  btn.setAttribute("aria-controls", nav.id);
  btn.innerHTML = "<span></span><span></span>";
  bar.appendChild(btn);

  function set(open) {
    topbar.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? TXT.close : TXT.open);
  }
  btn.addEventListener("click", function () { set(!topbar.classList.contains("nav-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  document.addEventListener("click", function (e) { if (!topbar.contains(e.target)) set(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 980) set(false); });
})();
