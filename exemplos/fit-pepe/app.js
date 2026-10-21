// app-src.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
function Icon({ paths, circles, size = 20, color = "currentColor", strokeWidth = 2, className, fill = "none" }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill,
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className
    },
    (paths || []).map((d, i) => /* @__PURE__ */ React.createElement("path", { key: i, d })),
    (circles || []).map((c, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: c[0], cy: c[1], r: c[2] }))
  );
}
var Home = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M4 11.5 12 4l8 7.5", "M6 10v10h12V10"] });
var UtensilsCrossed = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M7 3v7M5 3v4a2 2 0 0 0 4 0V3M7 10v11", "M18 3c-2 1-4 4-4 7 0 1.5 1 2 2 2l1-1v9"] });
var Dumbbell = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M3 10v4", "M21 10v4", "M6 8v8", "M18 8v8", "M6 12h12"] });
var TrendingUp = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M3 17l6-6 4 4 8-9", "M15 6h6v6"] });
var ClipboardList = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M9 4h6v3H9z", "M6 6h2M16 6h2v15H6V6h2", "M9 12h6M9 15h6M9 18h4"] });
var Plus = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M12 5v14", "M5 12h14"] });
var Check = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M5 13l4 4L19 7"] });
var X = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M6 6l12 12", "M18 6L6 18"] });
var ChevronDown = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M6 9l6 6 6-6"] });
var ChevronLeft = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M15 6l-6 6 6 6"] });
var ChevronRight = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M9 6l6 6-6 6"] });
var Trash2 = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M4 7h16", "M9 7V4h6v3", "M6 7l1 13h10l1-13", "M10 11v6M14 11v6"] });
var Flame = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M12 3c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 3-6 5-10z"] });
var Search = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M20 20l-4-4"], circles: [[10, 10, 6]] });
var ArrowLeft = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M19 12H5", "M11 18l-6-6 6-6"] });
var HistoryIcon = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M3 11a9 9 0 1 1 2.6 6.3", "M3 5v6h6", "M12 8v4l3 2"] });
var RotateCcw = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M3 11a9 9 0 1 1 2.6 6.3", "M3 5v6h6"] });
var Download = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M12 3v12", "M7 10l5 5 5-5", "M5 21h14"] });
var Upload = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M12 20V6", "M7 11l5-5 5 5", "M5 21h14"] });
var Pencil = (p) => /* @__PURE__ */ React.createElement(Icon, { ...p, paths: ["M4 20l1-5L16 4l3 3L8 18l-4 2z", "M13 6l3 3"] });
function MiniLineChart({ data, lines, height = 190 }) {
  const w = 320, h = height, padL = 28, padR = 10, padT = 10, padB = 20;
  const allVals = data.flatMap((d) => lines.map((l) => d[l.key])).filter((v) => v != null && !isNaN(v));
  const min = Math.min(...allVals, 0);
  const max = Math.max(...allVals, 1);
  const range = max - min || 1;
  const xStep = data.length > 1 ? (w - padL - padR) / (data.length - 1) : 0;
  const yScale = (v) => h - padB - (v - min) / range * (h - padT - padB);
  return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { display: "block" } }, /* @__PURE__ */ React.createElement("line", { x1: padL, y1: h - padB, x2: w - padR, y2: h - padB, stroke: "#DEE0D9", strokeWidth: "1" }), lines.map((line) => /* @__PURE__ */ React.createElement(
    "polyline",
    {
      key: line.key,
      fill: "none",
      stroke: line.color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: data.map((d, i) => `${padL + i * xStep},${yScale(d[line.key])}`).join(" ")
    }
  )), lines.map((line) => data.map((d, i) => /* @__PURE__ */ React.createElement("circle", { key: line.key + i, cx: padL + i * xStep, cy: yScale(d[line.key]), r: "3", fill: line.color }))), data.map((d, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: padL + i * xStep, y: h - 5, fontSize: "9", fill: "#6D7268", textAnchor: "middle" }, d.label)));
}
function MiniBarChart({ data, refValue, height = 140 }) {
  const w = 320, h = height, padL = 10, padR = 10, padT = 8, padB = 16;
  const max = Math.max(...data.map((d) => d.value), refValue || 0, 1);
  const gap = (w - padL - padR) / data.length;
  const barW = Math.max(gap * 0.55, 2);
  const yScale = (v) => h - padB - v / max * (h - padT - padB);
  return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { display: "block" } }, refValue != null && /* @__PURE__ */ React.createElement("line", { x1: padL, x2: w - padR, y1: yScale(refValue), y2: yScale(refValue), stroke: "#B8492C", strokeWidth: "1.5", strokeDasharray: "4 4" }), data.map((d, i) => /* @__PURE__ */ React.createElement("rect", { key: i, x: padL + i * gap + (gap - barW) / 2, y: yScale(d.value), width: barW, height: Math.max(h - padB - yScale(d.value), 0), fill: "#B8862E", rx: "2" })), data.map((d, i) => i % 2 === 0 && /* @__PURE__ */ React.createElement("text", { key: i, x: padL + i * gap + gap / 2, y: h - 4, fontSize: "8", fill: "#6D7268", textAnchor: "middle" }, d.label)));
}
var WEEKDAYS = ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"];
var MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
var FOOD_DB = [
  { id: "frango_peito", name: "Peito de frango grelhado", kcal100: 156, protein100: 31, carb100: 0, fat100: 3.6 },
  { id: "arroz_branco", name: "Arroz branco cozido", kcal100: 126, protein100: 2.7, carb100: 28, fat100: 0.3 },
  { id: "arroz_integral", name: "Arroz integral cozido", kcal100: 111, protein100: 2.6, carb100: 23, fat100: 0.9 },
  { id: "feijao", name: "Feij\xE3o carioca cozido", kcal100: 78, protein100: 4.8, carb100: 13.6, fat100: 0.5 },
  { id: "ovo", name: "Ovo inteiro cozido", kcal100: 155, protein100: 13, carb100: 1.1, fat100: 11 },
  { id: "clara_ovo", name: "Clara de ovo", kcal100: 49, protein100: 11, carb100: 0.7, fat100: 0.2 },
  { id: "aveia", name: "Aveia em flocos", kcal100: 395, protein100: 17, carb100: 66, fat100: 7 },
  { id: "batata_doce", name: "Batata doce cozida", kcal100: 87, protein100: 1.6, carb100: 20, fat100: 0.1 },
  { id: "pao_integral", name: "P\xE3o integral", kcal100: 252, protein100: 13, carb100: 41, fat100: 4 },
  { id: "banana", name: "Banana", kcal100: 99, protein100: 1.1, carb100: 23, fat100: 0.3 },
  { id: "whey", name: "Whey protein (p\xF3)", kcal100: 406, protein100: 80, carb100: 8, fat100: 6 },
  { id: "pasta_amendoim", name: "Pasta de amendoim", kcal100: 630, protein100: 25, carb100: 20, fat100: 50 },
  { id: "azeite", name: "Azeite de oliva", kcal100: 900, protein100: 0, carb100: 0, fat100: 100 },
  { id: "tilapia", name: "Til\xE1pia grelhada", kcal100: 128, protein100: 26, carb100: 0, fat100: 2.7 },
  { id: "carne_moida", name: "Carne mo\xEDda (patinho)", kcal100: 167, protein100: 26, carb100: 0, fat100: 7 },
  { id: "brocolis", name: "Br\xF3colis cozido", kcal100: 41, protein100: 2.4, carb100: 7, fat100: 0.4 },
  { id: "alface", name: "Alface", kcal100: 19, protein100: 1.4, carb100: 2.9, fat100: 0.2 },
  { id: "tomate", name: "Tomate", kcal100: 21, protein100: 0.9, carb100: 3.9, fat100: 0.2 },
  { id: "iogurte", name: "Iogurte natural desnatado", kcal100: 42, protein100: 4, carb100: 6, fat100: 0.2 },
  { id: "queijo_minas", name: "Queijo minas frescal", kcal100: 260, protein100: 17, carb100: 3, fat100: 20 },
  { id: "leite_desnatado", name: "Leite desnatado", kcal100: 35, protein100: 3.4, carb100: 5, fat100: 0.1 },
  { id: "macarrao", name: "Macarr\xE3o cozido", kcal100: 155, protein100: 5.8, carb100: 31, fat100: 0.9 },
  { id: "mel", name: "Mel", kcal100: 329, protein100: 0.3, carb100: 82, fat100: 0 },
  { id: "amendoas", name: "Am\xEAndoas", kcal100: 622, protein100: 21, carb100: 22, fat100: 50 },
  { id: "abacate", name: "Abacate", kcal100: 174, protein100: 2, carb100: 8.5, fat100: 14.7 },
  { id: "granola", name: "Granola", kcal100: 476, protein100: 10, carb100: 64, fat100: 20 }
];
var EXERCISE_LIBRARY = {
  "Peito": ["Supino reto barra", "Supino reto halteres", "Supino inclinado barra", "Supino inclinado halteres", "Supino declinado", "Crucifixo m\xE1quina (peck deck)", "Crucifixo halteres", "Crossover polia alta", "Crossover polia baixa", "Flex\xE3o de bra\xE7o", "Flex\xE3o com afastamento"],
  "Costas": ["Puxada frente", "Puxada tri\xE2ngulo", "Puxada pegada supinada", "Remada curvada barra", "Remada curvada halteres", "Remada unilateral (serrote)", "Remada cavalinho", "Remada baixa (cabo)", "Barra fixa", "Barra fixa pegada supinada", "Levantamento terra", "Hiperextens\xE3o lombar"],
  "Pernas": ["Agachamento livre", "Agachamento frontal", "Agachamento no smith", "Agachamento b\xFAlgaro", "Leg press 45\xB0", "Leg press horizontal", "Hack squat", "Cadeira extensora", "Mesa flexora", "Stiff barra", "Stiff halteres", "Panturrilha em p\xE9", "Panturrilha sentado", "Afundo", "Passada", "Eleva\xE7\xE3o p\xE9lvica (hip thrust)"],
  "Ombro": ["Desenvolvimento halteres", "Desenvolvimento militar barra", "Desenvolvimento m\xE1quina", "Arnold press", "Eleva\xE7\xE3o lateral halteres", "Eleva\xE7\xE3o lateral cabo", "Eleva\xE7\xE3o frontal", "Remada alta", "Crucifixo invertido", "Face pull"],
  "B\xEDceps": ["Rosca direta barra", "Rosca direta halteres", "Rosca alternada", "Rosca scott", "Rosca martelo", "Rosca concentrada", "Rosca 21", "Rosca no cabo"],
  "Tr\xEDceps": ["Tr\xEDceps corda", "Tr\xEDceps barra (pulley)", "Tr\xEDceps franc\xEAs barra", "Tr\xEDceps franc\xEAs halteres", "Mergulho no banco", "Mergulho em paralelas", "Tr\xEDceps testa", "Tr\xEDceps coice (kickback)"],
  "Abd\xF4men": ["Prancha", "Prancha lateral", "Abdominal supra", "Abdominal infra", "Eleva\xE7\xE3o de pernas", "Abdominal bicicleta", "Abdominal no cabo (cable crunch)", "Rota\xE7\xE3o de tronco"],
  "Cardio": ["Esteira", "Bike ergom\xE9trica", "El\xEDptico", "Pular corda", "Escada (stairmaster)", "Remo erg\xF4metro", "Corrida na rua", "Nata\xE7\xE3o"]
};
var inputCls = "bg-app border border-hair rounded-lg px-3 py-2 fs-13 outline-none focus-brass w-full";
var inputSmCls = "bg-app border border-hair rounded-lg px-2 py-1.5 fs-12 outline-none focus-brass";
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function pad2(n) {
  return String(n).padStart(2, "0");
}
function todayKey(d = /* @__PURE__ */ new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function monthKey(d = /* @__PURE__ */ new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}
function fmtDateLong(d) {
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][d.getMonth()]}`;
}
function fmtDateShort(iso) {
  if (!iso) return "";
  const [y, m, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[m - 1]} ${y}`;
}
function shiftMonth(n) {
  const d = /* @__PURE__ */ new Date();
  d.setMonth(d.getMonth() + n);
  return monthKey(d);
}
function shiftDay(n) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + n);
  return todayKey(d);
}
function toNum(v) {
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
function calcTargets(profile) {
  const { weightKg, heightCm, age, sex, activity, goal, proteinPerKg, fatPerKg } = profile;
  const bmr = sex === "M" ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5 : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = bmr * activity;
  const goalFactor = goal === "cut" ? 0.8 : goal === "bulk" ? 1.08 : 1;
  const kcal = Math.round(tdee * goalFactor);
  const protein = Math.round(weightKg * toNum(proteinPerKg));
  const fat = Math.round(weightKg * toNum(fatPerKg));
  const carbKcal = Math.max(kcal - protein * 4 - fat * 9, 0);
  const carb = Math.round(carbKcal / 4);
  return { kcal, protein, carb, fat };
}
var SKINFOLD_SITES = {
  M: [
    { key: "chest", label: "Peitoral", hint: "Dobra diagonal, na metade da dist\xE2ncia entre a linha da axila e o mamilo." },
    { key: "abdomen", label: "Abd\xF4men", hint: "Dobra vertical, cerca de 2 cm \xE0 direita do umbigo." },
    { key: "thigh", label: "Coxa", hint: "Dobra vertical, na frente da coxa, no meio do caminho entre o quadril e o joelho." }
  ],
  F: [
    { key: "triceps", label: "Tr\xEDceps", hint: "Dobra vertical, atr\xE1s do bra\xE7o, no meio do caminho entre o ombro e o cotovelo." },
    { key: "suprailiac", label: "Suprail\xEDaca", hint: "Dobra diagonal, logo acima do osso do quadril, seguindo a linha natural da pele." },
    { key: "thigh", label: "Coxa", hint: "Dobra vertical, na frente da coxa, no meio do caminho entre o quadril e o joelho." }
  ]
};
function calcBodyFatJP3(sex, age, sum) {
  const density = sex === "M" ? 1.10938 - 8267e-7 * sum + 16e-7 * sum * sum - 2574e-7 * age : 1.0994921 - 9929e-7 * sum + 23e-7 * sum * sum - 1392e-7 * age;
  const bf = 495 / density - 450;
  return Math.round(bf * 10) / 10;
}
function calcBodyFatNavy(sex, heightCm, neck, waist, hip) {
  let bf;
  if (sex === "M") {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(heightCm)) - 450;
  }
  return Math.round(bf * 10) / 10;
}
var BODY_MEASUREMENT_FIELDS = [
  { key: "waist", label: "Cintura" },
  { key: "hip", label: "Quadril" },
  { key: "chest", label: "Peito" },
  { key: "arm", label: "Bra\xE7o" },
  { key: "thigh", label: "Coxa" },
  { key: "calf", label: "Panturrilha" }
];
function getAllFoods(data) {
  return [...FOOD_DB, ...data.customFoods || []];
}
function earliestRecordDate(data) {
  const dates = [...Object.keys(data.mealsByDate || {}), ...Object.keys(data.workoutLogByDate || {})];
  if (dates.length === 0) return todayKey();
  return dates.reduce((min, d) => d < min ? d : min, dates[0]);
}
function getBubaState(data, todayStr, targets, consumedKcal) {
  const activityDates = /* @__PURE__ */ new Set();
  Object.keys(data.mealsByDate || {}).forEach((d) => {
    if ((data.mealsByDate[d] || []).length > 0) activityDates.add(d);
  });
  Object.keys(data.workoutLogByDate || {}).forEach((d) => {
    const hasSet = Object.values(data.workoutLogByDate[d] || {}).some((entry) => (entry.sets || []).some((s) => s.done));
    if (hasSet) activityDates.add(d);
  });
  const sorted = [...activityDates].filter((d) => d <= todayStr).sort();
  const lastActive = sorted[sorted.length - 1] || null;
  const daysSinceActive = lastActive ? Math.round((/* @__PURE__ */ new Date(todayStr + "T00:00:00") - /* @__PURE__ */ new Date(lastActive + "T00:00:00")) / 864e5) : 30;
  const todayMeals = (data.mealsByDate[todayStr] || []).length;
  const todaySets = Object.values(data.workoutLogByDate[todayStr] || {}).reduce((a, e) => a + (e.sets || []).filter((s) => s.done).length, 0);
  const trained = todaySets > 0;
  const ateAny = todayMeals > 0;
  const overTarget = targets?.kcal ? (consumedKcal || 0) > targets.kcal : false;
  let mood, shape, message;
  if (daysSinceActive >= 2 && !trained && !ateAny) {
    mood = "morto";
    shape = "magrinho";
    message = `Pepe t\xE1 bem paradinho... j\xE1 fazem ${daysSinceActive} dias sem nenhum registro. \u{1F480}`;
  } else if (!trained && !ateAny) {
    mood = "triste";
    shape = "magrinho";
    message = "Pepe t\xE1 triste, ainda n\xE3o tem nada registrado hoje.";
  } else if (trained && ateAny) {
    mood = "muitofeliz";
    if (overTarget) {
      shape = "muitogordinho";
      message = `Pepe t\xE1 muito feliz com o treino, mas comeu al\xE9m da meta hoje (${Math.round(consumedKcal)} kcal) e ficou bem estufado!`;
    } else {
      shape = "normal";
      message = "Pepe t\xE1 muito feliz! Treino e refei\xE7\xF5es em dia hoje \u{1F389}";
    }
  } else if (trained && !ateAny) {
    mood = "meiofeliz";
    shape = "magrinho";
    message = "Pepe treinou bem, mas ainda t\xE1 com fome \u2014 falta registrar as refei\xE7\xF5es!";
  } else {
    mood = "meiofeliz";
    if (overTarget) {
      shape = "muitogordinho";
      message = `Pepe comeu al\xE9m da meta hoje (${Math.round(consumedKcal)} kcal) e ainda n\xE3o treinou...`;
    } else {
      shape = "gordinho";
      message = "Pepe comeu bem, mas sentiu falta do treino hoje.";
    }
  }
  const moodPct = { morto: 5, triste: 22, meiofeliz: 58, muitofeliz: 95 }[mood];
  return { mood, shape, message, moodPct, todayMeals, todaySets, daysSinceActive };
}
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && next === "\n") i++;
        row.push(field);
        field = "";
        if (row.some((v) => v !== "")) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter((r) => r.some((v) => (v || "").trim() !== "")).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] || "").trim();
    });
    return obj;
  });
}
function toCSVValue(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function cycleToCSV(cycle) {
  const lines = ["Dia,Exercicio,Series,Reps,Peso,Tecnica"];
  cycle.forEach((day) => {
    if (day.exercises.length === 0) {
      lines.push([toCSVValue(day.name), "", "", "", "", ""].join(","));
    } else {
      day.exercises.forEach((ex) => {
        const tec = ex.technique === "restpause" ? "Rest-pause" : ex.technique === "dropset" ? "Drop-set" : "";
        lines.push([toCSVValue(day.name), toCSVValue(ex.name), ex.sets, toCSVValue(ex.reps), ex.targetWeight, tec].join(","));
      });
    }
  });
  return lines.join("\n");
}
function csvToCycle(text) {
  const rows = parseCSV(text);
  const grouped = [];
  const dayMap = {};
  rows.forEach((r) => {
    const dayName = (r.Dia || r.dia || "").trim();
    const exName = (r.Exercicio || r["Exerc\xEDcio"] || r.exercicio || "").trim();
    if (!dayName) return;
    if (!dayMap[dayName]) {
      dayMap[dayName] = { id: uid(), name: dayName, exercises: [] };
      grouped.push(dayMap[dayName]);
    }
    if (!exName) return;
    const tecRaw = (r.Tecnica || r["T\xE9cnica"] || "").toLowerCase();
    dayMap[dayName].exercises.push({
      id: uid(),
      name: exName,
      sets: Number(r.Series || r["S\xE9ries"]) || 3,
      reps: r.Reps || "10",
      targetWeight: Number(r.Peso) || 0,
      technique: tecRaw.includes("rest") ? "restpause" : tecRaw.includes("drop") ? "dropset" : null
    });
  });
  return grouped;
}
function dietPlanToCSV(slots, allFoods) {
  const lines = ["Refeicao,Horario,Opcao,Alimento,Kcal100,Proteina100,Carboidrato100,Gordura100,Gramas"];
  slots.forEach((slot) => {
    slot.options.forEach((opt) => {
      if (opt.items.length === 0) {
        lines.push([toCSVValue(slot.name), slot.time || "", toCSVValue(opt.label), "", "", "", "", "", ""].join(","));
      } else {
        opt.items.forEach((it) => {
          if (it.custom) {
            lines.push([toCSVValue(slot.name), slot.time || "", toCSVValue(opt.label), toCSVValue(it.custom.name), "", "", "", "", ""].join(","));
          } else {
            const f = allFoods.find((f2) => f2.id === it.foodId);
            lines.push([toCSVValue(slot.name), slot.time || "", toCSVValue(opt.label), toCSVValue(f?.name || "Alimento"), f?.kcal100 || 0, f?.protein100 || 0, f?.carb100 || 0, f?.fat100 || 0, it.grams].join(","));
          }
        });
      }
    });
  });
  return lines.join("\n");
}
function csvToDietPlan(text, existingFoods) {
  const rows = parseCSV(text);
  const slots = [];
  const slotMap = {};
  const foodsByName = {};
  existingFoods.forEach((f) => {
    foodsByName[f.name.trim().toLowerCase()] = f;
  });
  const newFoods = [];
  rows.forEach((r) => {
    const slotName = (r.Refeicao || r["Refei\xE7\xE3o"] || "").trim();
    const optLabel = (r.Opcao || r["Op\xE7\xE3o"] || "Padr\xE3o").trim() || "Padr\xE3o";
    const foodName = (r.Alimento || "").trim();
    if (!slotName) return;
    if (!slotMap[slotName]) {
      slotMap[slotName] = { id: uid(), name: slotName, time: (r.Horario || r["Hor\xE1rio"] || "").trim(), options: [] };
      slots.push(slotMap[slotName]);
    }
    const slot = slotMap[slotName];
    let opt = slot.options.find((o) => o.label === optLabel);
    if (!opt) {
      opt = { id: uid(), label: optLabel, items: [] };
      slot.options.push(opt);
    }
    if (!foodName) return;
    const key = foodName.toLowerCase();
    let food = foodsByName[key];
    if (!food) {
      food = {
        id: uid(),
        name: foodName,
        kcal100: Number(r.Kcal100) || 0,
        protein100: Number(r.Proteina100 || r["Prote\xEDna100"]) || 0,
        carb100: Number(r.Carboidrato100) || 0,
        fat100: Number(r.Gordura100) || 0
      };
      foodsByName[key] = food;
      newFoods.push(food);
    }
    opt.items.push({ id: uid(), foodId: food.id, grams: Number(r.Gramas) || 100 });
  });
  return { slots, newFoods };
}
function rowsToCSV(rows) {
  if (rows.length === 0) return "Info\nNenhum dado registrado neste per\xEDodo";
  const headers = Array.from(rows.reduce((set, r) => {
    Object.keys(r).forEach((k) => set.add(k));
    return set;
  }, /* @__PURE__ */ new Set()));
  const lines = [headers.map(toCSVValue).join(",")];
  rows.forEach((r) => lines.push(headers.map((h) => toCSVValue(r[h] ?? "")).join(",")));
  return lines.join("\n");
}
function downloadTextFile(filename, content, mime) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function getExerciseLibrary(data) {
  const lib = {};
  Object.keys(EXERCISE_LIBRARY).forEach((cat) => {
    lib[cat] = [...EXERCISE_LIBRARY[cat]];
  });
  (data.customExercises || []).forEach((ex) => {
    if (!lib[ex.category]) lib[ex.category] = [];
    lib[ex.category].push(ex.name);
  });
  return lib;
}
function kcalFromMacros(protein, carb, fat) {
  return (protein || 0) * 4 + (carb || 0) * 4 + (fat || 0) * 9;
}
function computeItemsMacros(items, allFoods) {
  return (items || []).reduce((acc, it) => {
    let protein, carb, fat;
    if (it.custom) {
      protein = it.custom.protein || 0;
      carb = it.custom.carb || 0;
      fat = it.custom.fat || 0;
    } else {
      const f = allFoods.find((f2) => f2.id === it.foodId);
      if (!f) return acc;
      const q = (it.grams || 0) / 100;
      protein = f.protein100 * q;
      carb = f.carb100 * q;
      fat = f.fat100 * q;
    }
    return {
      kcal: acc.kcal + kcalFromMacros(protein, carb, fat),
      protein: acc.protein + protein,
      carb: acc.carb + carb,
      fat: acc.fat + fat
    };
  }, { kcal: 0, protein: 0, carb: 0, fat: 0 });
}
function cloneDeep(v) {
  return JSON.parse(JSON.stringify(v));
}
function normalizeWorkoutPlan(p) {
  if (!p) return { id: uid(), name: "Minha ficha", createdAt: todayKey(), cycle: defaultCycle(), currentIndex: 0 };
  if (p.cycle) return p;
  const days = p.days || p;
  const cycle = WEEKDAYS.map((w) => ({ id: uid(), name: days[w]?.name || "Descanso", exercises: days[w]?.exercises || [] }));
  return { id: p.id || uid(), name: p.name || "Minha ficha", createdAt: p.createdAt || todayKey(), cycle, currentIndex: (/* @__PURE__ */ new Date()).getDay() };
}
function migrate(old) {
  if (!old) return null;
  const workoutPlan = normalizeWorkoutPlan(old.workoutPlan);
  const workoutHistory = (old.workoutHistory || []).map(normalizeWorkoutPlan);
  let dietPlan;
  if (old.dietPlan) {
    dietPlan = old.dietPlan;
  } else if (old.dietVariations && old.dietVariations.length) {
    dietPlan = {
      id: uid(),
      name: "Minha dieta",
      createdAt: todayKey(),
      slots: old.dietVariations.map((v) => ({
        id: uid(),
        name: v.name,
        time: "",
        options: [{ id: uid(), label: "Padr\xE3o", items: (v.meals || []).map((m) => ({
          id: uid(),
          custom: { name: m.name, kcal: m.kcal, protein: m.protein, carb: m.carb, fat: m.fat }
        })) }]
      }))
    };
  } else {
    dietPlan = defaultDietPlan();
  }
  return {
    profile: old.profile,
    workoutPlan,
    workoutHistory,
    dietPlan,
    dietHistory: old.dietHistory || [],
    customFoods: old.customFoods || [],
    customExercises: old.customExercises || [],
    mealsByDate: old.mealsByDate || {},
    workoutLogByDate: old.workoutLogByDate || {},
    bodyLogMonthly: old.bodyLogMonthly || []
  };
}
function withDefaults(d) {
  return { customFoods: [], customExercises: [], ...d };
}
function autoAdvanceCycle(d, todayStr) {
  if (!d?.workoutPlan?.cycle?.length) return d;
  const lastAdvanced = d.workoutPlan.lastAdvancedOn || null;
  const plannedIds = /* @__PURE__ */ new Set();
  d.workoutPlan.cycle.forEach((day) => (day.exercises || []).forEach((ex) => plannedIds.add(ex.id)));
  const trainedDays = Object.keys(d.workoutLogByDate || {}).filter((dateKey) => {
    if (dateKey >= todayStr) return false;
    const dayLog = d.workoutLogByDate[dateKey] || {};
    return Object.keys(dayLog).some(
      (exId) => plannedIds.has(exId) && (dayLog[exId].sets || []).some((s) => s.done)
    );
  }).sort();
  const lastTrained = trainedDays[trainedDays.length - 1];
  if (!lastTrained) return d;
  if (lastAdvanced && lastAdvanced >= lastTrained) return d;
  const next = (d.workoutPlan.currentIndex + 1) % d.workoutPlan.cycle.length;
  return { ...d, workoutPlan: { ...d.workoutPlan, currentIndex: next, lastAdvancedOn: lastTrained } };
}
function defaultDietPlan() {
  return {
    id: uid(),
    name: "Minha dieta",
    createdAt: todayKey(),
    slots: [
      { id: uid(), name: "Caf\xE9 da manh\xE3", time: "07:00", options: [{ id: uid(), label: "Padr\xE3o", items: [] }] },
      { id: uid(), name: "Almo\xE7o", time: "12:30", options: [{ id: uid(), label: "Padr\xE3o", items: [] }] },
      { id: uid(), name: "Lanche", time: "16:00", options: [{ id: uid(), label: "Padr\xE3o", items: [] }] },
      { id: uid(), name: "Jantar", time: "20:00", options: [{ id: uid(), label: "Padr\xE3o", items: [] }] }
    ]
  };
}
function defaultCycle() {
  return [
    { id: uid(), name: "Dia 1", exercises: [] },
    { id: uid(), name: "Dia 2", exercises: [] },
    { id: uid(), name: "Dia 3", exercises: [] }
  ];
}
function seedData() {
  const today = todayKey();
  const thisMonth = monthKey();
  const profile = {
    weightKg: 78,
    heightCm: 178,
    age: 28,
    sex: "M",
    activity: 1.55,
    goal: "cut",
    proteinPerKg: 2,
    fatPerKg: 0.8
  };
  const cycle = [
    { id: uid(), name: "Peito e Tr\xEDceps", exercises: [
      { id: uid(), name: "Supino reto barra", sets: 4, reps: "8-10", targetWeight: 60, technique: null },
      { id: uid(), name: "Supino inclinado halteres", sets: 3, reps: 10, targetWeight: 22, technique: null },
      { id: uid(), name: "Crucifixo m\xE1quina", sets: 3, reps: 12, targetWeight: 14, technique: null },
      { id: uid(), name: "Tr\xEDceps corda", sets: 4, reps: 12, targetWeight: 25, technique: null },
      { id: uid(), name: "Tr\xEDceps franc\xEAs", sets: 3, reps: 10, targetWeight: 18, technique: null }
    ] },
    { id: uid(), name: "Costas e B\xEDceps", exercises: [
      { id: uid(), name: "Puxada frente", sets: 4, reps: 10, targetWeight: 55, technique: null },
      { id: uid(), name: "Remada curvada", sets: 4, reps: 10, targetWeight: 50, technique: null },
      { id: uid(), name: "Remada unilateral", sets: 3, reps: 12, targetWeight: 24, technique: null },
      { id: uid(), name: "Rosca direta", sets: 3, reps: 10, targetWeight: 20, technique: null },
      { id: uid(), name: "Rosca alternada", sets: 3, reps: 12, targetWeight: 12, technique: null }
    ] },
    { id: uid(), name: "Pernas", exercises: [
      { id: uid(), name: "Agachamento livre", sets: 4, reps: 8, targetWeight: 80, technique: null },
      { id: uid(), name: "Leg press", sets: 4, reps: 12, targetWeight: 140, technique: null },
      { id: uid(), name: "Cadeira extensora", sets: 3, reps: 12, targetWeight: 40, technique: null },
      { id: uid(), name: "Mesa flexora", sets: 3, reps: 12, targetWeight: 30, technique: null },
      { id: uid(), name: "Panturrilha em p\xE9", sets: 4, reps: 15, targetWeight: 60, technique: null }
    ] },
    { id: uid(), name: "Ombro e Abd\xF4men", exercises: [
      { id: uid(), name: "Desenvolvimento halteres", sets: 4, reps: 10, targetWeight: 18, technique: null },
      { id: uid(), name: "Eleva\xE7\xE3o lateral", sets: 4, reps: 12, targetWeight: 10, technique: null },
      { id: uid(), name: "Eleva\xE7\xE3o frontal", sets: 3, reps: 12, targetWeight: 8, technique: null },
      { id: uid(), name: "Prancha", sets: 3, reps: "45s", targetWeight: 0, technique: null }
    ] },
    { id: uid(), name: "Full body / Bra\xE7o", exercises: [
      { id: uid(), name: "Supino reto barra", sets: 3, reps: 10, targetWeight: 55, technique: null },
      { id: uid(), name: "Puxada frente", sets: 3, reps: 10, targetWeight: 50, technique: null },
      { id: uid(), name: "Rosca direta", sets: 3, reps: 12, targetWeight: 15, technique: null }
    ] },
    { id: uid(), name: "Cardio / Mobilidade", exercises: [
      { id: uid(), name: "Esteira", sets: 1, reps: "30min", targetWeight: 0, technique: null }
    ] },
    { id: uid(), name: "Descanso", exercises: [] }
  ];
  const workoutPlan = { id: uid(), name: "Push Pull Legs \u2014 Fase 1", createdAt: shiftDay(-38), cycle, currentIndex: 0 };
  const workoutHistory = [
    {
      id: uid(),
      name: "Full Body (Adapta\xE7\xE3o)",
      createdAt: shiftDay(-95),
      archivedAt: shiftDay(-39),
      currentIndex: 0,
      cycle: [
        { id: uid(), name: "Full Body A", exercises: [
          { id: uid(), name: "Agachamento livre", sets: 3, reps: 12, targetWeight: 50, technique: null },
          { id: uid(), name: "Supino reto barra", sets: 3, reps: 12, targetWeight: 40, technique: null },
          { id: uid(), name: "Remada curvada", sets: 3, reps: 12, targetWeight: 35, technique: null }
        ] },
        { id: uid(), name: "Full Body B", exercises: [
          { id: uid(), name: "Leg press", sets: 3, reps: 12, targetWeight: 90, technique: null },
          { id: uid(), name: "Puxada frente", sets: 3, reps: 12, targetWeight: 35, technique: null },
          { id: uid(), name: "Desenvolvimento halteres", sets: 3, reps: 12, targetWeight: 12, technique: null }
        ] },
        { id: uid(), name: "Full Body C", exercises: [
          { id: uid(), name: "Stiff", sets: 3, reps: 12, targetWeight: 40, technique: null },
          { id: uid(), name: "Supino inclinado halteres", sets: 3, reps: 12, targetWeight: 16, technique: null }
        ] }
      ]
    }
  ];
  const dietPlan = {
    id: uid(),
    name: "Cutting \u2014 Fase 1",
    createdAt: shiftDay(-38),
    slots: [
      { id: uid(), name: "Caf\xE9 da manh\xE3", time: "07:00", options: [
        { id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "ovo", grams: 150 },
          { id: uid(), foodId: "aveia", grams: 50 },
          { id: uid(), foodId: "banana", grams: 100 }
        ] },
        { id: uid(), label: "Varia\xE7\xE3o \u2014 sem ovo", items: [
          { id: uid(), foodId: "whey", grams: 30 },
          { id: uid(), foodId: "aveia", grams: 60 },
          { id: uid(), foodId: "pasta_amendoim", grams: 15 }
        ] }
      ] },
      { id: uid(), name: "Almo\xE7o", time: "12:30", options: [
        { id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "frango_peito", grams: 180 },
          { id: uid(), foodId: "arroz_branco", grams: 150 },
          { id: uid(), foodId: "brocolis", grams: 100 },
          { id: uid(), foodId: "azeite", grams: 5 }
        ] },
        { id: uid(), label: "Varia\xE7\xE3o \u2014 peixe", items: [
          { id: uid(), foodId: "tilapia", grams: 200 },
          { id: uid(), foodId: "arroz_integral", grams: 150 },
          { id: uid(), foodId: "brocolis", grams: 100 }
        ] }
      ] },
      { id: uid(), name: "Lanche", time: "16:00", options: [
        { id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "whey", grams: 32 },
          { id: uid(), foodId: "banana", grams: 100 },
          { id: uid(), foodId: "pasta_amendoim", grams: 15 }
        ] }
      ] },
      { id: uid(), name: "Jantar", time: "20:00", options: [
        { id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "tilapia", grams: 180 },
          { id: uid(), foodId: "batata_doce", grams: 200 },
          { id: uid(), foodId: "alface", grams: 40 }
        ] }
      ] }
    ]
  };
  const dietHistory = [
    {
      id: uid(),
      name: "Manuten\xE7\xE3o \u2014 pr\xE9 temporada",
      createdAt: shiftDay(-95),
      archivedAt: shiftDay(-39),
      slots: [
        { id: uid(), name: "Caf\xE9 da manh\xE3", time: "07:00", options: [{ id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "pao_integral", grams: 60 },
          { id: uid(), foodId: "ovo", grams: 100 },
          { id: uid(), foodId: "queijo_minas", grams: 30 }
        ] }] },
        { id: uid(), name: "Almo\xE7o", time: "12:30", options: [{ id: uid(), label: "Padr\xE3o", items: [
          { id: uid(), foodId: "carne_moida", grams: 150 },
          { id: uid(), foodId: "arroz_branco", grams: 180 },
          { id: uid(), foodId: "feijao", grams: 100 }
        ] }] }
      ]
    }
  ];
  const allFoods = getAllFoods({ customFoods: [] });
  const cafeItems = dietPlan.slots[0].options[0].items;
  const almocoItems = dietPlan.slots[1].options[0].items;
  const cafeMacros = computeItemsMacros(cafeItems, allFoods);
  const almocoMacros = computeItemsMacros(almocoItems, allFoods);
  const mealsByDate = {
    [today]: [
      { logId: uid(), name: "Caf\xE9 da manh\xE3", ...round1(cafeMacros) },
      { logId: uid(), name: "Almo\xE7o", ...round1(almocoMacros) }
    ]
  };
  const firstEx = cycle[workoutPlan.currentIndex]?.exercises?.[0];
  const workoutLogByDate = firstEx ? {
    [today]: { [firstEx.id]: { name: firstEx.name, technique: firstEx.technique || null, sets: [{ weight: firstEx.targetWeight || 0, reps: 10, done: true }] } }
  } : {};
  const bodyLogMonthly = [
    { month: shiftMonth(-3), weight: 82.4, bodyFat: 19.8 },
    { month: shiftMonth(-2), weight: 81, bodyFat: 18.9 },
    { month: shiftMonth(-1), weight: 79.6, bodyFat: 17.8 },
    { month: thisMonth, weight: 78, bodyFat: 16.9 }
  ];
  return {
    profile,
    workoutPlan,
    workoutHistory,
    dietPlan,
    dietHistory,
    customFoods: [],
    customExercises: [],
    mealsByDate,
    workoutLogByDate,
    bodyLogMonthly
  };
}
function round1(m) {
  return { kcal: Math.round(m.kcal), protein: Math.round(m.protein), carb: Math.round(m.carb), fat: Math.round(m.fat) };
}
function Num({ children, className = "", style }) {
  return /* @__PURE__ */ React.createElement("span", { className: `font-mono tabular-nums ${className}`, style }, children);
}
var PEPE_VIDEO = {
  "muitofeliz-normal": "feliz-normal",
  "muitofeliz-magrinho": "feliz-normal",
  "muitofeliz-gordinho": "feliz-gordo",
  "muitofeliz-muitogordinho": "feliz-gordo",
  "meiofeliz-magrinho": "meio-magro",
  "meiofeliz-normal": "meio-magro",
  "meiofeliz-gordinho": "meio-gordo",
  "meiofeliz-muitogordinho": "meio-gordo",
  "triste-magrinho": "triste-magro",
  "triste-normal": "triste-magro",
  "triste-gordinho": "triste-magro",
  "triste-muitogordinho": "triste-magro",
  "morto-magrinho": "morto",
  "morto-normal": "morto",
  "morto-gordinho": "morto",
  "morto-muitogordinho": "morto"
};
function Buba({ mood = "muitofeliz", shape = "normal", size = 120 }) {
  const file = PEPE_VIDEO[`${mood}-${shape}`] || "feliz-normal";
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
      });
    }
  }, [file]);
  return /* @__PURE__ */ React.createElement("div", { style: { width: size, height: size, display: "inline-block" } }, /* @__PURE__ */ React.createElement(
    "video",
    {
      key: file,
      ref: videoRef,
      src: `pepe/${file}.mp4`,
      poster: "pepe/base.png",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      style: { width: size, height: size, objectFit: "contain", display: "block" }
    }
  ));
}
function TickDivider() {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-tick my-5 opacity-40", "aria-hidden": "true" }, Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `w-px bg-ticktone ${i % 5 === 0 ? "h-2.5" : "h-1"}` })));
}
function Card({ children, className = "" }) {
  return /* @__PURE__ */ React.createElement("div", { className: `bg-surface border border-hair rounded-xl p-4 ${className}` }, children);
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "fs-11 tracking-tick uppercase text-muted font-medium mb-2" }, children);
}
function MacroChips({ m }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 fs-11 text-muted font-mono flex-wrap" }, /* @__PURE__ */ React.createElement("span", null, Math.round(m.kcal), " kcal"), /* @__PURE__ */ React.createElement("span", null, "P ", Math.round(m.protein), "g"), /* @__PURE__ */ React.createElement("span", null, "C ", Math.round(m.carb), "g"), /* @__PURE__ */ React.createElement("span", null, "G ", Math.round(m.fat), "g"));
}
function MacroRing({ label, value, target, unit = "g", accent }) {
  const pct = target > 0 ? Math.min(value / target, 1) : 0;
  const r = 30, c = 2 * Math.PI * r;
  const over = value > target;
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-1.5" }, /* @__PURE__ */ React.createElement("div", { className: "relative ring-w ring-h" }, /* @__PURE__ */ React.createElement("svg", { width: "76", height: "76", viewBox: "0 0 76 76", className: "-rotate-90" }, /* @__PURE__ */ React.createElement("circle", { cx: "38", cy: "38", r, fill: "none", stroke: "#DEE0D9", strokeWidth: "6" }), /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "38",
      cy: "38",
      r,
      fill: "none",
      stroke: over ? "#B8492C" : accent,
      strokeWidth: "6",
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: c - pct * c,
      style: { transition: "stroke-dashoffset .4s ease" }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement(Num, { className: "text-sm text-ink leading-none" }, Math.round(value)), /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted mt-0.5" }, "/", Math.round(target), unit))), /* @__PURE__ */ React.createElement("span", { className: "fs-11 text-muted uppercase tracking-wide" }, label));
}
function Bar({ value, target, accent }) {
  const pct = target > 0 ? Math.min(value / target * 100, 100) : 0;
  const over = value > target;
  return /* @__PURE__ */ React.createElement("div", { className: "h-1.5 w-full bg-track rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "h-full rounded-full", style: { width: `${pct}%`, background: over ? "#B8492C" : accent, transition: "width .3s ease" } }));
}
function GhostBtn({ children, onClick, className = "" }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, className: `flex items-center justify-center gap-1.5 rounded-lg border border-hair px-3 py-2 fs-12 text-ink hoverbg-row transition ${className}` }, children);
}
function PrimaryBtn({ children, onClick, className = "" }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, className: `flex items-center justify-center gap-1.5 rounded-lg bg-brass text-onbrass px-3 py-2 fs-12 font-medium active:scale-95 transition ${className}` }, children);
}
function FoodPicker({ foods, onSelect, onCreateFood }) {
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);
  const [nf, setNf] = useState({ name: "", kcal100: "", protein100: "", carb100: "", fat100: "" });
  const filtered = q.trim() ? foods.filter((f) => f.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8) : foods.slice(0, 8);
  function submitNewFood() {
    if (!nf.name || !nf.kcal100) return;
    const food = {
      id: uid(),
      name: nf.name,
      kcal100: Number(nf.kcal100) || 0,
      protein100: Number(nf.protein100) || 0,
      carb100: Number(nf.carb100) || 0,
      fat100: Number(nf.fat100) || 0
    };
    onCreateFood(food);
    onSelect(food);
    setNf({ name: "", kcal100: "", protein100: "", carb100: "", fat100: "" });
    setCreating(false);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "bg-app border border-hair rounded-lg p-2.5 space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Search, { size: 14, className: "text-muted shrink-0" }), /* @__PURE__ */ React.createElement("input", { placeholder: "Buscar alimento\u2026", value: q, onChange: (e) => setQ(e.target.value), className: "flex-1 bg-transparent outline-none fs-13" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1 max-h-40 overflow-y-auto" }, filtered.map((f) => /* @__PURE__ */ React.createElement("button", { key: f.id, onClick: () => onSelect(f), className: "w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg bg-surface hoverbg-row" }, /* @__PURE__ */ React.createElement("span", { className: "fs-12" }, f.name), /* @__PURE__ */ React.createElement("span", { className: "fs-10 font-mono text-muted shrink-0 ml-2" }, f.kcal100, "kcal/100g"))), filtered.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted px-1" }, "Nenhum alimento encontrado.")), !creating ? /* @__PURE__ */ React.createElement("button", { onClick: () => setCreating(true), className: "flex items-center gap-1 fs-11 text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 12 }), " Cadastrar novo alimento") : /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 pt-1 border-t border-hair" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Nome do alimento", value: nf.name, onChange: (e) => setNf((v) => ({ ...v, name: e.target.value })), className: inputSmCls + " w-full" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-1.5" }, /* @__PURE__ */ React.createElement("input", { placeholder: "kcal/100g", inputMode: "numeric", value: nf.kcal100, onChange: (e) => setNf((v) => ({ ...v, kcal100: e.target.value })), className: inputSmCls }), /* @__PURE__ */ React.createElement("input", { placeholder: "P", inputMode: "numeric", value: nf.protein100, onChange: (e) => setNf((v) => ({ ...v, protein100: e.target.value })), className: inputSmCls }), /* @__PURE__ */ React.createElement("input", { placeholder: "C", inputMode: "numeric", value: nf.carb100, onChange: (e) => setNf((v) => ({ ...v, carb100: e.target.value })), className: inputSmCls }), /* @__PURE__ */ React.createElement("input", { placeholder: "G", inputMode: "numeric", value: nf.fat100, onChange: (e) => setNf((v) => ({ ...v, fat100: e.target.value })), className: inputSmCls })), /* @__PURE__ */ React.createElement("button", { onClick: submitNewFood, className: "w-full bg-brass text-onbrass rounded-lg py-1.5 fs-12 font-medium" }, "Adicionar e usar")));
}
function App() {
  const [tab, setTab] = useState("hoje");
  const [data, setData] = useState(null);
  const loaded = useRef(false);
  useEffect(() => {
    (async () => {
      let d = null;
      try {
        const r = await window.storage.get("medida-app-data");
        if (r && r.value) d = migrate(JSON.parse(r.value));
      } catch (e) {
      }
      setData(autoAdvanceCycle(withDefaults(d || seedData()), todayKey()));
      loaded.current = true;
    })();
  }, []);
  useEffect(() => {
    if (!loaded.current || !data) return;
    (async () => {
      try {
        await window.storage.set("medida-app-data", JSON.stringify(data));
      } catch (e) {
        console.error("Falha ao salvar", e);
      }
    })();
  }, [data]);
  const today = useMemo(() => /* @__PURE__ */ new Date(), []);
  if (!data) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-app flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-muted fs-13 animate-pulse" }, "carregando\u2026"));
  }
  const tKey = todayKey(today);
  const mKey = monthKey(today);
  const targets = calcTargets(data.profile);
  const tabs = [
    { id: "hoje", label: "Hoje", icon: Home },
    { id: "diario", label: "Di\xE1rio", icon: UtensilsCrossed },
    { id: "treino", label: "Treino", icon: Dumbbell },
    { id: "progresso", label: "Progresso", icon: TrendingUp },
    { id: "plano", label: "Plano", icon: ClipboardList }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-app text-ink", style: { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui" } }, /* @__PURE__ */ React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        html, body { background: #EDEEEA; color: #1B211D; }
        body { -webkit-tap-highlight-color: transparent; }
        input, select, textarea, button { color: inherit; font-family: inherit; }

        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .bg-app { background-color: #EDEEEA; }
        .bg-surface { background-color: #FFFFFF; }
        .bg-chip { background-color: #E4E6E0; }
        .bg-track { background-color: #E2E4DE; }
        .bg-teal { background-color: #2E8A82; }
        .bg-ticktone { background-color: #C7C9C2; }
        .bg-brass { background-color: #B8862E; }
        .bg-navbar { background-color: rgba(255,255,255,0.92); }
        .bg-doneset { background-color: rgba(46,138,130,0.14); }
        .hoverbg-row:hover { background-color: #E4E6E0; }
        .hoverbg-chip:hover { background-color: #D8DAD3; }

        .border-hair { border-color: #DEE0D9; }
        .border-faint { border-color: #C7C9C2; }
        .border-teal { border-color: #2E8A82; }
        .border-brass { border-color: #B8862E; }
        .focus-brass:focus { border-color: #B8862E; }

        .text-ink { color: #1B211D; }
        .text-muted { color: #6D7268; }
        .text-brass { color: #96691E; }
        .text-teal { color: #2E8A82; }
        .text-warn { color: #B8492C; }
        .text-onbrass { color: #14171A; }
        .hovertext-warn:hover { color: #B8492C; }

        .fs-9 { font-size: 9px; } .fs-10 { font-size: 10px; } .fs-11 { font-size: 11px; }
        .fs-12 { font-size: 12px; } .fs-13 { font-size: 13px; } .fs-14 { font-size: 14px; }

        .tracking-tick { letter-spacing: .18em; }
        .gap-tick { gap: 3px; }
        .ring-h { height: 76px; }
        .ring-w { width: 76px; }
        .minw-100 { min-width: 100px; }
      `), /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto min-h-screen flex flex-col" }, /* @__PURE__ */ React.createElement("header", { className: "px-5 pt-6 pb-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-semibold tracking-tight" }, "FIT PEPE"), /* @__PURE__ */ React.createElement("span", { className: "fs-10 font-mono text-brass tracking-widest" }, "v2")), /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-muted mt-0.5 capitalize" }, fmtDateLong(today))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end" }, /* @__PURE__ */ React.createElement(Num, { className: "text-lg text-brass leading-none" }, data.profile.weightKg), /* @__PURE__ */ React.createElement("span", { className: "fs-10 text-muted" }, "kg atual"))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 px-5 pb-28 overflow-y-auto" }, tab === "hoje" && /* @__PURE__ */ React.createElement(HojeTab, { data, tKey, targets }), tab === "diario" && /* @__PURE__ */ React.createElement(DiarioTab, { data, setData, tKey, targets }), tab === "treino" && /* @__PURE__ */ React.createElement(TreinoTab, { data, setData, tKey }), tab === "progresso" && /* @__PURE__ */ React.createElement(ProgressoTab, { data, setData, mKey, tKey, targets }), tab === "plano" && /* @__PURE__ */ React.createElement(PlanoTab, { data, setData, targets })), /* @__PURE__ */ React.createElement("nav", { className: "fixed bottom-0 left-0 right-0 bg-navbar backdrop-blur border-t border-hair" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto flex" }, tabs.map((t) => {
    const Icon2 = t.icon;
    const active = tab === t.id;
    return /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setTab(t.id), className: "flex-1 flex flex-col items-center gap-1 py-2.5 relative" }, active && /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-brass" }), /* @__PURE__ */ React.createElement(Icon2, { size: 20, strokeWidth: active ? 2.4 : 1.8, color: active ? "#B8862E" : "#6D7268" }), /* @__PURE__ */ React.createElement("span", { className: `fs-10 ${active ? "text-ink" : "text-muted"}` }, t.label));
  })))));
}
function DateNav({ dateKey, onChange, minDate }) {
  const isToday = dateKey === todayKey();
  const atMin = minDate ? dateKey <= minDate : false;
  function shift(n) {
    const d = /* @__PURE__ */ new Date(dateKey + "T00:00:00");
    d.setDate(d.getDate() + n);
    const next = todayKey(d);
    if (next > todayKey()) return;
    if (minDate && next < minDate) return;
    onChange(next);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => shift(-1), disabled: atMin, className: "text-muted disabled:opacity-30 shrink-0" }, /* @__PURE__ */ React.createElement(ChevronLeft, { size: 18 })), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: dateKey,
      min: minDate || void 0,
      max: todayKey(),
      onChange: (e) => {
        let v = e.target.value;
        if (!v) return;
        if (minDate && v < minDate) v = minDate;
        if (v > todayKey()) v = todayKey();
        onChange(v);
      },
      className: "flex-1 bg-surface border border-hair rounded-lg px-3 py-1.5 fs-12 text-center outline-none focus-brass"
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => shift(1), disabled: isToday, className: "text-muted disabled:opacity-30 shrink-0" }, /* @__PURE__ */ React.createElement(ChevronRight, { size: 18 })), !isToday && /* @__PURE__ */ React.createElement("button", { onClick: () => onChange(todayKey()), className: "fs-10 text-brass shrink-0" }, "Hoje"));
}
function HojeTab({ data, tKey, targets }) {
  const meals = data.mealsByDate[tKey] || [];
  const consumed = meals.reduce((a, m) => ({
    kcal: a.kcal + m.kcal,
    protein: a.protein + m.protein,
    carb: a.carb + m.carb,
    fat: a.fat + m.fat
  }), { kcal: 0, protein: 0, carb: 0, fat: 0 });
  const cycle = data.workoutPlan.cycle;
  const plan = cycle[data.workoutPlan.currentIndex];
  const log = data.workoutLogByDate[tKey] || {};
  const totalSets = (plan?.exercises || []).reduce((a, e) => a + e.sets, 0);
  const doneSets = (plan?.exercises || []).reduce((a, e) => a + (log[e.id]?.sets?.filter((s) => s.done).length || 0), 0);
  const buba = getBubaState(data, tKey, targets, consumed.kcal);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement(Card, { className: "mb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Buba, { mood: buba.mood, shape: buba.shape, size: 96 }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "fs-13 font-medium text-ink" }, buba.message), /* @__PURE__ */ React.createElement("div", { className: "h-1.5 w-full bg-track rounded-full overflow-hidden mt-2" }, /* @__PURE__ */ React.createElement("div", { className: "h-full rounded-full", style: { width: `${buba.moodPct}%`, background: "#C99B6E", transition: "width .4s ease" } })))), /* @__PURE__ */ React.createElement(SectionLabel, null, "Calorias de hoje"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Num, { className: "text-3xl text-ink" }, Math.round(consumed.kcal)), /* @__PURE__ */ React.createElement("span", { className: "fs-13 text-muted ml-1" }, "/ ", targets.kcal, " kcal")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-brass" }, /* @__PURE__ */ React.createElement(Flame, { size: 16 }), /* @__PURE__ */ React.createElement(Num, { className: "fs-13" }, Math.max(targets.kcal - Math.round(consumed.kcal), 0)), /* @__PURE__ */ React.createElement("span", { className: "fs-11 text-muted" }, "restantes"))), /* @__PURE__ */ React.createElement(Bar, { value: consumed.kcal, target: targets.kcal, accent: "#B8862E" }), /* @__PURE__ */ React.createElement("div", { className: "flex justify-around mt-4" }, /* @__PURE__ */ React.createElement(MacroRing, { label: "Prot", value: consumed.protein, target: targets.protein, accent: "#2E8A82" }), /* @__PURE__ */ React.createElement(MacroRing, { label: "Carb", value: consumed.carb, target: targets.carb, accent: "#B8862E" }), /* @__PURE__ */ React.createElement(MacroRing, { label: "Gord", value: consumed.fat, target: targets.fat, accent: "#3F8F5C" }))), /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mt-6 block" }, "Treino de hoje \xB7 dia ", data.workoutPlan.currentIndex + 1, " de ", cycle.length)), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, plan?.name || "Descanso"), /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-muted mt-0.5" }, totalSets > 0 ? `${doneSets}/${totalSets} s\xE9ries conclu\xEDdas` : "Dia livre"), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mt-1" }, "Ficha: ", data.workoutPlan.name)), totalSets > 0 && /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 relative shrink-0" }, /* @__PURE__ */ React.createElement("svg", { width: "48", height: "48", className: "-rotate-90" }, /* @__PURE__ */ React.createElement("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "#DEE0D9", strokeWidth: "5" }), /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "24",
      cy: "24",
      r: "20",
      fill: "none",
      stroke: "#2E8A82",
      strokeWidth: "5",
      strokeLinecap: "round",
      strokeDasharray: 2 * Math.PI * 20,
      strokeDashoffset: 2 * Math.PI * 20 * (1 - doneSets / totalSets)
    }
  ))))), /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mt-6 block" }, "Refei\xE7\xF5es registradas")), meals.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "fs-13 text-muted" }, "Nada registrado ainda hoje. V\xE1 at\xE9 o Di\xE1rio para adicionar.") : /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, meals.map((m) => /* @__PURE__ */ React.createElement(Card, { key: m.logId, className: "!p-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "fs-13" }, m.name), /* @__PURE__ */ React.createElement(Num, { className: "fs-13 text-muted" }, Math.round(m.kcal), " kcal")))));
}
function DiarioTab({ data, setData, tKey, targets }) {
  const [viewDate, setViewDate] = useState(tKey);
  const [showAdd, setShowAdd] = useState(false);
  const [editingMealId, setEditingMealId] = useState(null);
  const [mealDraft, setMealDraft] = useState({});
  const meals = data.mealsByDate[viewDate] || [];
  const allFoods = getAllFoods(data);
  const consumed = meals.reduce((a, m) => ({
    kcal: a.kcal + m.kcal,
    protein: a.protein + m.protein,
    carb: a.carb + m.carb,
    fat: a.fat + m.fat
  }), { kcal: 0, protein: 0, carb: 0, fat: 0 });
  function addMeal(entry) {
    setData((d) => ({ ...d, mealsByDate: { ...d.mealsByDate, [viewDate]: [...d.mealsByDate[viewDate] || [], { ...entry, logId: uid() }] } }));
    setShowAdd(false);
  }
  function removeMeal(logId) {
    setData((d) => ({ ...d, mealsByDate: { ...d.mealsByDate, [viewDate]: (d.mealsByDate[viewDate] || []).filter((m) => m.logId !== logId) } }));
  }
  function addCustomFood(food) {
    setData((d) => ({ ...d, customFoods: [...d.customFoods, food] }));
  }
  function startEditMeal(m) {
    setEditingMealId(m.logId);
    setMealDraft({ name: m.name, kcal: String(m.kcal), protein: String(m.protein), carb: String(m.carb), fat: String(m.fat) });
  }
  function saveEditMeal() {
    const protein = Number(mealDraft.protein) || 0, carb = Number(mealDraft.carb) || 0, fat = Number(mealDraft.fat) || 0;
    setData((d) => ({
      ...d,
      mealsByDate: {
        ...d.mealsByDate,
        [viewDate]: (d.mealsByDate[viewDate] || []).map((m) => m.logId === editingMealId ? { ...m, name: mealDraft.name || m.name, kcal: Math.round(kcalFromMacros(protein, carb, fat)), protein, carb, fat } : m)
      }
    }));
    setEditingMealId(null);
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement(DateNav, { dateKey: viewDate, onChange: setViewDate, minDate: earliestRecordDate(data) }), /* @__PURE__ */ React.createElement(SectionLabel, null, "Metas do dia \u2014 ", data.dietPlan.name), /* @__PURE__ */ React.createElement(Card, { className: "space-y-3" }, [
    ["Calorias", consumed.kcal, targets.kcal, "#B8862E", "kcal"],
    ["Prote\xEDna", consumed.protein, targets.protein, "#2E8A82", "g"],
    ["Carboidrato", consumed.carb, targets.carb, "#B8862E", "g"],
    ["Gordura", consumed.fat, targets.fat, "#3F8F5C", "g"]
  ].map(([label, val, tgt, accent, unit]) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between fs-12 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, label), /* @__PURE__ */ React.createElement(Num, { className: val > tgt ? "text-warn" : "text-ink" }, Math.round(val), " / ", Math.round(tgt), unit)), /* @__PURE__ */ React.createElement(Bar, { value: val, target: tgt, accent })))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-6 mb-2" }, /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mb-0" }, "Refei\xE7\xF5es ", viewDate === tKey ? "de hoje" : "deste dia")), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAdd((s) => !s), className: "flex items-center gap-1 fs-12 text-brass font-medium" }, /* @__PURE__ */ React.createElement(Plus, { size: 14 }), " Adicionar")), showAdd && /* @__PURE__ */ React.createElement(AddMealPanel, { dietPlan: data.dietPlan, allFoods, onAdd: addMeal, onCreateFood: addCustomFood, onClose: () => setShowAdd(false) }), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 mt-2" }, meals.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-13 text-muted" }, "Nenhuma refei\xE7\xE3o registrada."), meals.map((m) => /* @__PURE__ */ React.createElement(Card, { key: m.logId, className: "!p-3" }, editingMealId === m.logId ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("input", { value: mealDraft.name, onChange: (e) => setMealDraft((v) => ({ ...v, name: e.target.value })), className: inputSmCls + " w-full" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, ["protein", "carb", "fat"].map((k) => /* @__PURE__ */ React.createElement("label", { key: k, className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, k === "protein" ? "Prot(g)" : k === "carb" ? "Carb(g)" : "Gord(g)"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: mealDraft[k], onChange: (e) => setMealDraft((v) => ({ ...v, [k]: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })))), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-center text-muted" }, "Calorias calculadas: ", /* @__PURE__ */ React.createElement(Num, { className: "text-ink" }, Math.round(kcalFromMacros(Number(mealDraft.protein) || 0, Number(mealDraft.carb) || 0, Number(mealDraft.fat) || 0))), " kcal"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: () => setEditingMealId(null) }, "Cancelar"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: saveEditMeal }, "Salvar"))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "fs-13 font-medium" }, m.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 shrink-0 ml-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => startEditMeal(m), className: "text-muted" }, /* @__PURE__ */ React.createElement(Pencil, { size: 13 })), /* @__PURE__ */ React.createElement("button", { onClick: () => removeMeal(m.logId), className: "text-muted hovertext-warn" }, /* @__PURE__ */ React.createElement(Trash2, { size: 14 })))), /* @__PURE__ */ React.createElement("div", { className: "mt-1.5" }, /* @__PURE__ */ React.createElement(MacroChips, { m })))))));
}
function AddMealPanel({ dietPlan, allFoods, onAdd, onCreateFood, onClose }) {
  const [mode, setMode] = useState("plano");
  const [foodGrams, setFoodGrams] = useState({});
  const [pickedFood, setPickedFood] = useState(null);
  const [form, setForm] = useState({ name: "", kcal: "", protein: "", carb: "", fat: "" });
  const [editingKey, setEditingKey] = useState(null);
  const [editItems, setEditItems] = useState([]);
  function logOption(slot, option) {
    const m = computeItemsMacros(option.items, allFoods);
    onAdd({ name: option.label === "Padr\xE3o" ? slot.name : `${slot.name} \xB7 ${option.label}`, ...round1(m) });
  }
  function startEdit(slot, opt) {
    setEditingKey(`${slot.id}:${opt.id}`);
    setEditItems(opt.items.map((it) => ({ ...it })));
  }
  function updEditGrams(itemId, grams) {
    setEditItems((items) => items.map((it) => it.id === itemId ? { ...it, grams: Number(grams) || 0 } : it));
  }
  function removeEditItem(itemId) {
    setEditItems((items) => items.filter((it) => it.id !== itemId));
  }
  function logEdited(slot, opt) {
    const m = computeItemsMacros(editItems, allFoods);
    onAdd({ name: opt.label === "Padr\xE3o" ? `${slot.name} (ajustado)` : `${slot.name} \xB7 ${opt.label} (ajustado)`, ...round1(m) });
    setEditingKey(null);
  }
  function logFood() {
    if (!pickedFood) return;
    const grams = Number(foodGrams[pickedFood.id]) || 100;
    const q = grams / 100;
    const protein = pickedFood.protein100 * q, carb = pickedFood.carb100 * q, fat = pickedFood.fat100 * q;
    onAdd({
      name: `${pickedFood.name} (${grams}g)`,
      kcal: Math.round(kcalFromMacros(protein, carb, fat)),
      protein: Math.round(protein),
      carb: Math.round(carb),
      fat: Math.round(fat)
    });
    setPickedFood(null);
  }
  function submitCustom() {
    if (!form.name) return;
    const protein = Number(form.protein) || 0, carb = Number(form.carb) || 0, fat = Number(form.fat) || 0;
    onAdd({ name: form.name, kcal: Math.round(kcalFromMacros(protein, carb, fat)), protein, carb, fat });
  }
  return /* @__PURE__ */ React.createElement(Card, { className: "mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 mb-3 overflow-x-auto" }, [["plano", "Plano do dia"], ["alimento", "Alimento"], ["manual", "Manual"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => setMode(id), className: `shrink-0 fs-12 px-3 py-1.5 rounded-lg ${mode === id ? "bg-brass text-onbrass font-medium" : "bg-chip text-muted"}` }, label)), /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "ml-auto text-muted shrink-0" }, /* @__PURE__ */ React.createElement(X, { size: 16 }))), mode === "plano" && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 max-h-96 overflow-y-auto pr-0.5" }, dietPlan.slots.map((slot) => /* @__PURE__ */ React.createElement("div", { key: slot.id }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted uppercase tracking-wide mb-1" }, slot.name, slot.time ? ` \xB7 ${slot.time}` : ""), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, slot.options.map((opt) => {
    const m = computeItemsMacros(opt.items, allFoods);
    const key = `${slot.id}:${opt.id}`;
    const isEditing = editingKey === key;
    return /* @__PURE__ */ React.createElement("div", { key: opt.id }, /* @__PURE__ */ React.createElement("div", { className: "w-full flex items-center rounded-lg bg-app hoverbg-row overflow-hidden" }, /* @__PURE__ */ React.createElement("button", { onClick: () => logOption(slot, opt), className: "flex-1 flex items-center justify-between text-left px-3 py-2" }, /* @__PURE__ */ React.createElement("span", { className: "fs-12" }, opt.label), /* @__PURE__ */ React.createElement("span", { className: "fs-10 font-mono text-muted shrink-0 ml-2" }, Math.round(m.kcal), " kcal")), /* @__PURE__ */ React.createElement("button", { onClick: () => isEditing ? setEditingKey(null) : startEdit(slot, opt), className: "px-2.5 self-stretch flex items-center" }, /* @__PURE__ */ React.createElement(Pencil, { size: 13, className: isEditing ? "text-brass" : "text-muted" }))), isEditing && /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 mb-1 bg-surface border border-hair rounded-lg p-2.5 space-y-1.5" }, /* @__PURE__ */ React.createElement("p", { className: "fs-9 text-muted uppercase tracking-wide" }, "Ajustar s\xF3 esta vez"), editItems.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted" }, "Sem itens \u2014 cancela e escolhe outra op\xE7\xE3o."), editItems.map((it) => {
      const f = allFoods.find((f2) => f2.id === it.foodId);
      return /* @__PURE__ */ React.createElement("div", { key: it.id, className: "flex items-center justify-between fs-11" }, /* @__PURE__ */ React.createElement("span", { className: "text-ink" }, f?.name || it.custom?.name || "Alimento"), it.foodId ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: it.grams, onChange: (e) => updEditGrams(it.id, e.target.value), className: "w-12 bg-transparent text-right font-mono outline-none border-b border-hair" }), /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, "g"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeEditItem(it.id) }, /* @__PURE__ */ React.createElement(X, { size: 11, className: "text-muted" }))) : /* @__PURE__ */ React.createElement("button", { onClick: () => removeEditItem(it.id) }, /* @__PURE__ */ React.createElement(X, { size: 11, className: "text-muted" })));
    }), /* @__PURE__ */ React.createElement(MacroChips, { m: computeItemsMacros(editItems, allFoods) }), /* @__PURE__ */ React.createElement("button", { onClick: () => logEdited(slot, opt), className: "w-full bg-brass text-onbrass rounded-lg py-1.5 fs-12 font-medium mt-1" }, "Registrar com esses ajustes")));
  }))))), mode === "alimento" && /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(FoodPicker, { foods: allFoods, onSelect: setPickedFood, onCreateFood }), pickedFood && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-app border border-hair rounded-lg px-3 py-2" }, /* @__PURE__ */ React.createElement("span", { className: "fs-12 flex-1" }, pickedFood.name), /* @__PURE__ */ React.createElement(
    "input",
    {
      inputMode: "numeric",
      value: foodGrams[pickedFood.id] ?? 100,
      onChange: (e) => setFoodGrams((g) => ({ ...g, [pickedFood.id]: e.target.value })),
      className: "w-14 bg-transparent text-right font-mono fs-12 outline-none"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "fs-11 text-muted" }, "g"), /* @__PURE__ */ React.createElement("button", { onClick: logFood, className: "bg-brass text-onbrass rounded-lg px-2.5 py-1 fs-11 font-medium" }, "Registrar"))), mode === "manual" && /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Nome da refei\xE7\xE3o", value: form.name, onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })), className: inputCls }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, ["protein", "carb", "fat"].map((k) => /* @__PURE__ */ React.createElement("label", { key: k, className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, k === "protein" ? "Prote\xEDna (g)" : k === "carb" ? "Carbo (g)" : "Gordura (g)"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: form[k], onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })))), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-center text-muted" }, "Calorias calculadas: ", /* @__PURE__ */ React.createElement(Num, { className: "text-ink" }, Math.round(kcalFromMacros(Number(form.protein) || 0, Number(form.carb) || 0, Number(form.fat) || 0))), " kcal"), /* @__PURE__ */ React.createElement("button", { onClick: submitCustom, className: "w-full bg-brass text-onbrass rounded-lg py-2 fs-13 font-medium" }, "Registrar refei\xE7\xE3o")));
}
function TreinoTab({ data, setData, tKey }) {
  const cycle = data.workoutPlan.cycle;
  const [viewDate, setViewDate] = useState(tKey);
  const [viewIndex, setViewIndex] = useState(data.workoutPlan.currentIndex);
  const isToday = viewDate === tKey;
  const plan = cycle[viewIndex];
  const log = data.workoutLogByDate[viewDate] || {};
  function toggleSet(ex, setIndex) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      const entry = dayLog[ex.id] ? { ...dayLog[ex.id], sets: [...dayLog[ex.id].sets] } : { name: ex.name, technique: ex.technique || null, sets: [] };
      while (entry.sets.length <= setIndex) entry.sets.push({ weight: ex.targetWeight, reps: 0, done: false });
      entry.sets[setIndex] = { ...entry.sets[setIndex], done: !entry.sets[setIndex].done };
      dayLog[ex.id] = entry;
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  function updateWeight(ex, setIndex, weight) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      const entry = dayLog[ex.id] ? { ...dayLog[ex.id], sets: [...dayLog[ex.id].sets] } : { name: ex.name, technique: ex.technique || null, sets: [] };
      while (entry.sets.length <= setIndex) entry.sets.push({ weight: 0, reps: 0, done: false });
      entry.sets[setIndex] = { ...entry.sets[setIndex], weight: Number(weight) || 0 };
      dayLog[ex.id] = entry;
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  function updateReps(ex, setIndex, reps) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      const entry = dayLog[ex.id] ? { ...dayLog[ex.id], sets: [...dayLog[ex.id].sets] } : { name: ex.name, technique: ex.technique || null, sets: [] };
      while (entry.sets.length <= setIndex) entry.sets.push({ weight: ex.targetWeight, reps: 0, done: false });
      entry.sets[setIndex] = { ...entry.sets[setIndex], reps: Number(reps) || 0 };
      dayLog[ex.id] = entry;
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  function addSet(ex) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      const entry = dayLog[ex.id] ? { ...dayLog[ex.id], sets: [...dayLog[ex.id].sets] } : { name: ex.name, technique: ex.technique || null, sets: [] };
      while (entry.sets.length < ex.sets) entry.sets.push({ weight: ex.targetWeight, reps: 0, done: false });
      entry.sets.push({ weight: ex.targetWeight, reps: 0, done: false });
      dayLog[ex.id] = entry;
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  function removeSet(ex, setIndex) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      const entry = dayLog[ex.id] ? { ...dayLog[ex.id], sets: [...dayLog[ex.id].sets] } : { name: ex.name, technique: ex.technique || null, sets: [] };
      while (entry.sets.length <= setIndex) entry.sets.push({ weight: ex.targetWeight, reps: 0, done: false });
      entry.sets.splice(setIndex, 1);
      dayLog[ex.id] = entry;
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  const [adHocOpen, setAdHocOpen] = useState(false);
  const [adHocForm, setAdHocForm] = useState({ name: "", sets: "3", reps: "10", weight: "0" });
  function addAdHocExercise() {
    if (!adHocForm.name.trim()) return;
    const n = Math.max(Number(adHocForm.sets) || 1, 1);
    const newId = uid();
    setData((d) => ({
      ...d,
      workoutLogByDate: {
        ...d.workoutLogByDate,
        [viewDate]: {
          ...d.workoutLogByDate[viewDate] || {},
          [newId]: {
            name: adHocForm.name.trim(),
            technique: null,
            sets: Array.from({ length: n }, () => ({ weight: Number(adHocForm.weight) || 0, reps: Number(adHocForm.reps) || 0, done: true }))
          }
        }
      }
    }));
    setAdHocForm({ name: "", sets: "3", reps: "10", weight: "0" });
    setAdHocOpen(false);
  }
  function removeAdHocExercise(exId) {
    setData((d) => {
      const dayLog = { ...d.workoutLogByDate[viewDate] || {} };
      delete dayLog[exId];
      return { ...d, workoutLogByDate: { ...d.workoutLogByDate, [viewDate]: dayLog } };
    });
  }
  function setAsToday(i) {
    setData((d) => ({ ...d, workoutPlan: { ...d.workoutPlan, currentIndex: i, lastAdvancedOn: tKey } }));
  }
  function advanceCycle() {
    const next = (data.workoutPlan.currentIndex + 1) % cycle.length;
    setData((d) => ({ ...d, workoutPlan: { ...d.workoutPlan, currentIndex: next, lastAdvancedOn: tKey } }));
    setViewIndex(next);
  }
  const loggedExercises = Object.values(log);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement(DateNav, { dateKey: viewDate, onChange: setViewDate, minDate: earliestRecordDate(data) }), !isToday ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SectionLabel, null, "Registro deste dia"), loggedExercises.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "fs-13 text-muted" }, "Nenhum treino registrado nesse dia.") : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, loggedExercises.map((entry, idx) => {
    const doneCount = entry.sets.filter((s) => s.done).length;
    return /* @__PURE__ */ React.createElement(Card, { key: idx }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium fs-14" }, entry.name), entry.technique === "restpause" && /* @__PURE__ */ React.createElement("span", { className: "fs-9 px-1.5 py-0.5 rounded-full bg-chip text-teal" }, "Rest-pause"), entry.technique === "dropset" && /* @__PURE__ */ React.createElement("span", { className: "fs-9 px-1.5 py-0.5 rounded-full bg-chip text-warn" }, "Drop-set")), /* @__PURE__ */ React.createElement(Num, { className: "fs-11 text-muted" }, doneCount, "/", entry.sets.length, " s\xE9ries")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, entry.sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `flex items-center gap-1.5 rounded-lg px-2 py-1.5 border ${s.done ? "bg-doneset border-teal" : "bg-app border-hair"}` }, /* @__PURE__ */ React.createElement(Check, { size: 14, color: s.done ? "#2E8A82" : "#C7C9C2" }), /* @__PURE__ */ React.createElement(Num, { className: "fs-12" }, s.weight), /* @__PURE__ */ React.createElement("span", { className: "fs-10 text-muted" }, "kg")))));
  }))) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted mb-2" }, "Ficha ativa: ", /* @__PURE__ */ React.createElement("span", { className: "text-ink" }, data.workoutPlan.name)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto pb-1 mb-3 -mx-1 px-1" }, cycle.map((c, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: c.id,
      onClick: () => setViewIndex(i),
      className: `shrink-0 px-3 py-1.5 rounded-lg fs-12 ${viewIndex === i ? "bg-brass text-onbrass font-medium" : "bg-surface text-muted border border-hair"}`
    },
    c.name,
    i === data.workoutPlan.currentIndex ? " \u2022" : ""
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mb-0" }, plan?.name)), viewIndex !== data.workoutPlan.currentIndex ? /* @__PURE__ */ React.createElement("button", { onClick: () => setAsToday(viewIndex), className: "fs-10 text-brass shrink-0" }, "Definir como hoje") : /* @__PURE__ */ React.createElement("button", { onClick: advanceCycle, className: "fs-10 text-muted shrink-0" }, "Avan\xE7ar ciclo \u2192")), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mb-3" }, "O ciclo avan\xE7a sozinho no dia seguinte se voc\xEA registrar ao menos um exerc\xEDcio da ficha. Avulsos n\xE3o contam."), !plan || plan.exercises.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "fs-13 text-muted" }, "Dia de descanso. Aproveite para recuperar.") : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, plan.exercises.map((ex) => {
    const sets = log[ex.id]?.sets || [];
    const doneCount = sets.filter((s) => s.done).length;
    return /* @__PURE__ */ React.createElement(Card, { key: ex.id }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium fs-14" }, ex.name), ex.technique === "restpause" && /* @__PURE__ */ React.createElement("span", { className: "fs-9 px-1.5 py-0.5 rounded-full bg-chip text-teal" }, "Rest-pause"), ex.technique === "dropset" && /* @__PURE__ */ React.createElement("span", { className: "fs-9 px-1.5 py-0.5 rounded-full bg-chip text-warn" }, "Drop-set")), /* @__PURE__ */ React.createElement(Num, { className: "fs-11 text-muted" }, doneCount, "/", ex.sets, " s\xE9ries")), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted mb-2" }, "Alvo: ", ex.reps, " reps @ ", /* @__PURE__ */ React.createElement(Num, null, ex.targetWeight), "kg"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, Array.from({ length: Math.max(ex.sets, sets.length) }).map((_, i) => {
      const s = sets[i];
      return /* @__PURE__ */ React.createElement("div", { key: i, className: `flex items-center gap-1 rounded-lg pl-2 pr-1 py-1.5 border ${s?.done ? "bg-doneset border-teal" : "bg-app border-hair"}` }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleSet(ex, i) }, /* @__PURE__ */ React.createElement(Check, { size: 14, color: s?.done ? "#2E8A82" : "#C7C9C2" })), /* @__PURE__ */ React.createElement(
        "input",
        {
          inputMode: "numeric",
          value: s?.weight ?? ex.targetWeight,
          onChange: (e) => updateWeight(ex, i, e.target.value),
          className: "w-8 bg-transparent fs-11 font-mono outline-none"
        }
      ), /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted" }, "kg"), /* @__PURE__ */ React.createElement(
        "input",
        {
          inputMode: "numeric",
          placeholder: "reps",
          value: s?.reps || "",
          onChange: (e) => updateReps(ex, i, e.target.value),
          className: "w-8 bg-transparent fs-11 font-mono outline-none border-l border-hair pl-1"
        }
      ), /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted" }, "x"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeSet(ex, i) }, /* @__PURE__ */ React.createElement(X, { size: 11, className: "text-muted" })));
    }), /* @__PURE__ */ React.createElement("button", { onClick: () => addSet(ex), className: "flex items-center justify-center rounded-lg px-2.5 py-1.5 border border-dashed border-hair text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 14 }))));
  })), (() => {
    const plannedIds = new Set((plan?.exercises || []).map((e) => e.id));
    const adHocIds = Object.keys(log).filter((id) => !plannedIds.has(id));
    return /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement(SectionLabel, null, "Exerc\xEDcios avulsos de hoje"), adHocIds.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-3" }, adHocIds.map((exId) => {
      const entry = log[exId];
      const pseudoEx = { id: exId, name: entry.name, targetWeight: entry.sets[0]?.weight || 0 };
      const sets = entry.sets || [];
      const doneCount = sets.filter((s) => s.done).length;
      return /* @__PURE__ */ React.createElement(Card, { key: exId }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium fs-14" }, entry.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Num, { className: "fs-11 text-muted" }, doneCount, "/", sets.length, " s\xE9ries"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeAdHocExercise(exId) }, /* @__PURE__ */ React.createElement(Trash2, { size: 13, className: "text-muted hovertext-warn" })))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `flex items-center gap-1 rounded-lg pl-2 pr-1 py-1.5 border ${s?.done ? "bg-doneset border-teal" : "bg-app border-hair"}` }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleSet(pseudoEx, i) }, /* @__PURE__ */ React.createElement(Check, { size: 14, color: s?.done ? "#2E8A82" : "#C7C9C2" })), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: s?.weight ?? 0, onChange: (e) => updateWeight(pseudoEx, i, e.target.value), className: "w-8 bg-transparent fs-11 font-mono outline-none" }), /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted" }, "kg"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", placeholder: "reps", value: s?.reps || "", onChange: (e) => updateReps(pseudoEx, i, e.target.value), className: "w-8 bg-transparent fs-11 font-mono outline-none border-l border-hair pl-1" }), /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted" }, "x"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeSet(pseudoEx, i) }, /* @__PURE__ */ React.createElement(X, { size: 11, className: "text-muted" })))), /* @__PURE__ */ React.createElement("button", { onClick: () => addSet(pseudoEx), className: "flex items-center justify-center rounded-lg px-2.5 py-1.5 border border-dashed border-hair text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 14 }))));
    })), !adHocOpen ? /* @__PURE__ */ React.createElement("button", { onClick: () => setAdHocOpen(true), className: "w-full flex items-center justify-center gap-1.5 border border-dashed border-hair rounded-lg py-2.5 fs-12 text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 14 }), " Registrar exerc\xEDcio avulso") : /* @__PURE__ */ React.createElement(Card, { className: "space-y-2" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Nome do exerc\xEDcio", value: adHocForm.name, onChange: (e) => setAdHocForm((f) => ({ ...f, name: e.target.value })), className: inputCls }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "S\xE9ries"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: adHocForm.sets, onChange: (e) => setAdHocForm((f) => ({ ...f, sets: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })), /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "Reps"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: adHocForm.reps, onChange: (e) => setAdHocForm((f) => ({ ...f, reps: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })), /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "Peso (kg)"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: adHocForm.weight, onChange: (e) => setAdHocForm((f) => ({ ...f, weight: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" }))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: () => setAdHocOpen(false) }, "Cancelar"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: addAdHocExercise }, "Adicionar"))));
  })()));
}
function ProgressoTab({ data, setData, mKey, tKey, targets }) {
  const [form, setForm] = useState({ weight: "", bodyFat: "" });
  const [bfMode, setBfMode] = useState("manual");
  const [showGuide, setShowGuide] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [folds, setFolds] = useState({});
  const [tape, setTape] = useState({ neck: "", waist: "", hip: "" });
  const [measurements, setMeasurements] = useState({});
  const [showMeasurements, setShowMeasurements] = useState(false);
  const sites = SKINFOLD_SITES[data.profile.sex] || SKINFOLD_SITES.M;
  const foldSum = sites.reduce((a, s) => a + (Number(folds[s.key]) || 0), 0);
  const calculatedBf = foldSum > 0 ? calcBodyFatJP3(data.profile.sex, data.profile.age, foldSum) : null;
  const isFemale = data.profile.sex === "F";
  const tapeReady = Number(tape.neck) > 0 && Number(tape.waist) > 0 && (!isFemale || Number(tape.hip) > 0);
  const tapeBf = tapeReady ? calcBodyFatNavy(data.profile.sex, data.profile.heightCm, Number(tape.neck), Number(tape.waist), Number(tape.hip)) : null;
  const sorted = [...data.bodyLogMonthly].sort((a, b) => a.month.localeCompare(b.month));
  const chartData = sorted.map((e) => ({ label: MONTHS[Number(e.month.slice(5, 7)) - 1], peso: e.weight, gordura: e.bodyFat }));
  const last14 = Array.from({ length: 14 }, (_, i) => shiftDay(-(13 - i)));
  const calorieData = last14.map((dk) => {
    const kcal = (data.mealsByDate[dk] || []).reduce((a, m) => a + m.kcal, 0);
    const d = /* @__PURE__ */ new Date(dk + "T00:00:00");
    return { label: `${d.getDate()}/${d.getMonth() + 1}`, value: Math.round(kcal) };
  });
  const trainedDays = last14.map((dk) => Object.values(data.workoutLogByDate[dk] || {}).some((entry) => (entry.sets || []).some((s) => s.done)));
  const trainedCount = trainedDays.filter(Boolean).length;
  function saveEntry() {
    if (!form.weight) return;
    const bodyFat = bfMode === "calipers" ? calculatedBf ?? 0 : bfMode === "tape" ? tapeBf ?? 0 : Number(form.bodyFat) || 0;
    const measure = {};
    BODY_MEASUREMENT_FIELDS.forEach((f) => {
      if (measurements[f.key]) measure[f.key] = Number(measurements[f.key]);
    });
    setData((d) => {
      const idx = d.bodyLogMonthly.findIndex((e) => e.month === mKey);
      const entry = { month: mKey, weight: Number(form.weight), bodyFat, measurements: measure };
      const list = [...d.bodyLogMonthly];
      if (idx >= 0) list[idx] = entry;
      else list.push(entry);
      return { ...d, bodyLogMonthly: list, profile: { ...d.profile, weightKg: entry.weight } };
    });
    setForm({ weight: "", bodyFat: "" });
    setFolds({});
    setTape({ neck: "", waist: "", hip: "" });
    setMeasurements({});
  }
  const last = sorted[sorted.length - 1];
  const prev = sorted[sorted.length - 2];
  const measurementRows = BODY_MEASUREMENT_FIELDS.map((f) => {
    let value = null, prevVal = null, foundIdx = -1;
    for (let i = sorted.length - 1; i >= 0; i--) {
      const v = sorted[i].measurements?.[f.key];
      if (v != null) {
        value = v;
        foundIdx = i;
        break;
      }
    }
    if (foundIdx >= 0) {
      for (let i = foundIdx - 1; i >= 0; i--) {
        const v = sorted[i].measurements?.[f.key];
        if (v != null) {
          prevVal = v;
          break;
        }
      }
    }
    return { ...f, value, prevVal };
  }).filter((r) => r.value != null);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement(SectionLabel, null, "Registro mensal \u2014 ", MONTHS[Number(mKey.slice(5, 7)) - 1]), /* @__PURE__ */ React.createElement(Card, { className: "mb-4" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Peso (kg)", inputMode: "decimal", value: form.weight, onChange: (e) => setForm((f) => ({ ...f, weight: e.target.value })), className: inputCls + " font-mono mb-2" }), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 mb-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setBfMode("manual"), className: `flex-1 fs-11 py-1.5 rounded-lg ${bfMode === "manual" ? "bg-brass text-onbrass font-medium" : "bg-chip text-muted"}` }, "Digitar %"), /* @__PURE__ */ React.createElement("button", { onClick: () => setBfMode("calipers"), className: `flex-1 fs-11 py-1.5 rounded-lg ${bfMode === "calipers" ? "bg-brass text-onbrass font-medium" : "bg-chip text-muted"}` }, "Adip\xF4metro"), /* @__PURE__ */ React.createElement("button", { onClick: () => setBfMode("tape"), className: `flex-1 fs-11 py-1.5 rounded-lg ${bfMode === "tape" ? "bg-brass text-onbrass font-medium" : "bg-chip text-muted"}` }, "Fita m\xE9trica")), bfMode === "manual" && /* @__PURE__ */ React.createElement("input", { placeholder: "% gordura", inputMode: "decimal", value: form.bodyFat, onChange: (e) => setForm((f) => ({ ...f, bodyFat: e.target.value })), className: inputCls + " font-mono" }), bfMode === "calipers" && /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowGuide((s) => !s), className: "w-full flex items-center justify-between fs-11 text-brass bg-app border border-hair rounded-lg px-3 py-2" }, /* @__PURE__ */ React.createElement("span", null, "Como medir cada dobra"), /* @__PURE__ */ React.createElement(ChevronDown, { size: 14, style: { transform: showGuide ? "rotate(180deg)" : "none" } })), showGuide && /* @__PURE__ */ React.createElement("div", { className: "bg-app border border-hair rounded-lg p-3 space-y-2.5" }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-ink" }, "Use sempre o lado ", /* @__PURE__ */ React.createElement("b", null, "direito"), " do corpo. Pegue a dobra firmemente entre o polegar e o indicador (pele + gordura, sem m\xFAsculo), posicione o adip\xF4metro cerca de 1\xA0cm abaixo dos dedos e leia o valor ~2 segundos depois de soltar a press\xE3o do aparelho \u2014 o tecido precisa se acomodar. Fa\xE7a 2\u20133 medi\xE7\xF5es por ponto e use a m\xE9dia. Me\xE7a sempre no mesmo hor\xE1rio do dia, de prefer\xEAncia em jejum."), sites.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.key }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 font-medium text-ink" }, s.label), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted" }, s.hint)))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, sites.map((s) => /* @__PURE__ */ React.createElement("label", { key: s.key, className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, s.label), /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", placeholder: "mm", value: folds[s.key] || "", onChange: (e) => setFolds((f) => ({ ...f, [s.key]: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })))), calculatedBf !== null && /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-center text-ink" }, "Resultado: ", /* @__PURE__ */ React.createElement(Num, { className: "text-brass" }, calculatedBf, "%"), " de gordura corporal")), bfMode === "tape" && /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowGuide((s) => !s), className: "w-full flex items-center justify-between fs-11 text-brass bg-app border border-hair rounded-lg px-3 py-2" }, /* @__PURE__ */ React.createElement("span", null, "Como medir com a fita"), /* @__PURE__ */ React.createElement(ChevronDown, { size: 14, style: { transform: showGuide ? "rotate(180deg)" : "none" } })), showGuide && /* @__PURE__ */ React.createElement("div", { className: "bg-app border border-hair rounded-lg p-3 space-y-2.5" }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-ink" }, "Use o m\xE9todo da Marinha americana: a fita deve ficar ajustada mas sem apertar a pele. Me\xE7a 2 vezes cada ponto e use a m\xE9dia."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "fs-11 font-medium text-ink" }, "Pesco\xE7o"), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted" }, "Logo abaixo do pomo de ad\xE3o, com a fita levemente inclinada para baixo na frente.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "fs-11 font-medium text-ink" }, "Cintura"), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted" }, isFemale ? "Na parte mais estreita do abd\xF4men, geralmente acima do umbigo." : "Na altura do umbigo, com a barriga relaxada (sem contrair).")), isFemale && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "fs-11 font-medium text-ink" }, "Quadril"), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted" }, "Na parte mais larga dos gl\xFAteos, com os p\xE9s juntos."))), /* @__PURE__ */ React.createElement("div", { className: `grid ${isFemale ? "grid-cols-3" : "grid-cols-2"} gap-2` }, /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "Pesco\xE7o"), /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", placeholder: "cm", value: tape.neck, onChange: (e) => setTape((t) => ({ ...t, neck: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })), /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "Cintura"), /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", placeholder: "cm", value: tape.waist, onChange: (e) => setTape((t) => ({ ...t, waist: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })), isFemale && /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, "Quadril"), /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", placeholder: "cm", value: tape.hip, onChange: (e) => setTape((t) => ({ ...t, hip: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" }))), tapeBf !== null && /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-center text-ink" }, "Resultado: ", /* @__PURE__ */ React.createElement(Num, { className: "text-brass" }, tapeBf, "%"), " de gordura corporal")), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowMeasurements((s) => !s), className: "w-full flex items-center justify-between fs-11 text-muted bg-app border border-hair rounded-lg px-3 py-2 mt-3" }, /* @__PURE__ */ React.createElement("span", null, "+ Medidas corporais do m\xEAs (opcional)"), /* @__PURE__ */ React.createElement(ChevronDown, { size: 14, style: { transform: showMeasurements ? "rotate(180deg)" : "none" } })), showMeasurements && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2 mt-2" }, BODY_MEASUREMENT_FIELDS.map((f) => /* @__PURE__ */ React.createElement("label", { key: f.key, className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-9 text-muted uppercase tracking-wide" }, f.label), /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", placeholder: "cm", value: measurements[f.key] || "", onChange: (e) => setMeasurements((m) => ({ ...m, [f.key]: e.target.value })), className: inputSmCls + " w-full mt-1 font-mono" })))), /* @__PURE__ */ React.createElement("button", { onClick: saveEntry, className: "w-full bg-brass text-onbrass rounded-lg py-2 fs-13 font-medium mt-3" }, "Salvar medida do m\xEAs"), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted text-center mt-2" }, "Isso tamb\xE9m atualiza seu peso atual em Plano \u2192 Perfil")), last && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-4" }, /* @__PURE__ */ React.createElement(Card, { className: "!p-3" }, /* @__PURE__ */ React.createElement(SectionLabel, null, "Peso"), /* @__PURE__ */ React.createElement(Num, { className: "text-2xl" }, last.weight, /* @__PURE__ */ React.createElement("span", { className: "fs-13 text-muted" }, " kg")), prev && /* @__PURE__ */ React.createElement("p", { className: "fs-11 mt-1", style: { color: last.weight <= prev.weight ? "#3F8F5C" : "#B8492C" } }, (last.weight - prev.weight).toFixed(1), " kg vs m\xEAs anterior")), /* @__PURE__ */ React.createElement(Card, { className: "!p-3" }, /* @__PURE__ */ React.createElement(SectionLabel, null, "% Gordura"), /* @__PURE__ */ React.createElement(Num, { className: "text-2xl" }, last.bodyFat, /* @__PURE__ */ React.createElement("span", { className: "fs-13 text-muted" }, "%")), prev && /* @__PURE__ */ React.createElement("p", { className: "fs-11 mt-1", style: { color: last.bodyFat <= prev.bodyFat ? "#3F8F5C" : "#B8492C" } }, (last.bodyFat - prev.bodyFat).toFixed(1), "% vs m\xEAs anterior"))), measurementRows.length > 0 && /* @__PURE__ */ React.createElement(Card, { className: "mb-4" }, /* @__PURE__ */ React.createElement(SectionLabel, null, "Medidas corporais"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, measurementRows.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.key }, /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted uppercase tracking-wide" }, r.label), /* @__PURE__ */ React.createElement(Num, { className: "text-lg text-ink" }, r.value, /* @__PURE__ */ React.createElement("span", { className: "fs-10 text-muted" }, " cm")), r.prevVal != null && /* @__PURE__ */ React.createElement(Num, { className: "fs-10 text-muted" }, r.value - r.prevVal >= 0 ? "+" : "", (r.value - r.prevVal).toFixed(1)))))), data.bodyLogMonthly.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowLog((s) => !s), className: "flex items-center gap-1.5 fs-12 text-muted" }, /* @__PURE__ */ React.createElement(HistoryIcon, { size: 13 }), " Ver e apagar registros mensais (", data.bodyLogMonthly.length, ")", /* @__PURE__ */ React.createElement(ChevronDown, { size: 13, style: { transform: showLog ? "rotate(180deg)" : "none" } })), showLog && /* @__PURE__ */ React.createElement("div", { className: "mt-2 space-y-1.5" }, [...data.bodyLogMonthly].sort((a, b) => b.month.localeCompare(a.month)).map((e) => /* @__PURE__ */ React.createElement("div", { key: e.month, className: "flex items-center justify-between bg-surface border border-hair rounded-lg px-3 py-2" }, /* @__PURE__ */ React.createElement("span", { className: "fs-12 text-ink" }, MONTHS[Number(e.month.slice(5, 7)) - 1], " ", e.month.slice(0, 4), " \u2014 ", e.weight, "kg, ", e.bodyFat, "%"), /* @__PURE__ */ React.createElement("button", { onClick: () => setData((d) => ({ ...d, bodyLogMonthly: d.bodyLogMonthly.filter((x) => x.month !== e.month) })) }, /* @__PURE__ */ React.createElement(Trash2, { size: 14, className: "text-muted hovertext-warn" })))))), /* @__PURE__ */ React.createElement(SectionLabel, null, "Evolu\xE7\xE3o"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(MiniLineChart, { data: chartData, lines: [{ key: "peso", color: "#B8862E" }, { key: "gordura", color: "#2E8A82" }] }), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 justify-center mt-1 fs-11 text-muted" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-brass" }), " Peso (kg)"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-teal" }), " Gordura (%)"))), /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mt-6 block" }, "Consist\xEAncia \u2014 \xFAltimos 14 dias")), /* @__PURE__ */ React.createElement(Card, { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted mb-2" }, "Calorias registradas por dia (linha tracejada = sua meta)"), /* @__PURE__ */ React.createElement(MiniBarChart, { data: calorieData, refValue: targets.kcal })), /* @__PURE__ */ React.createElement(SectionLabel, null, "Frequ\xEAncia de treino"), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("p", { className: "fs-12 mb-2" }, /* @__PURE__ */ React.createElement(Num, { className: "text-brass" }, trainedCount), /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, " de 14 dias com treino registrado")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5" }, trainedDays.map((t, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex-1 aspect-square rounded", style: { background: t ? "#B8862E" : "#E2E4DE" } })))));
}
function PlanoTab({ data, setData, targets }) {
  const [open, setOpen] = useState("perfil");
  const [subView, setSubView] = useState(null);
  if (subView === "w-new" || subView === "w-edit") {
    return /* @__PURE__ */ React.createElement(WorkoutBuilder, { data, setData, mode: subView === "w-new" ? "new" : "edit", onClose: () => setSubView(null) });
  }
  if (subView === "d-new" || subView === "d-edit") {
    return /* @__PURE__ */ React.createElement(DietBuilder, { data, setData, mode: subView === "d-new" ? "new" : "edit", onClose: () => setSubView(null) });
  }
  const wDaysCount = data.workoutPlan.cycle.filter((c) => c.exercises.length > 0).length;
  const wExCount = data.workoutPlan.cycle.reduce((a, c) => a + c.exercises.length, 0);
  const dSlotsCount = data.dietPlan.slots.length;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement(Collapsible, { title: "Perfil e metas de macro", id: "perfil", open, setOpen }, /* @__PURE__ */ React.createElement(ProfileEditor, { data, setData, targets })), /* @__PURE__ */ React.createElement(Collapsible, { title: "Treino", id: "treino", open, setOpen }, /* @__PURE__ */ React.createElement(Card, { className: "mb-3" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium fs-14" }, data.workoutPlan.name), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted mt-0.5" }, "Desde ", fmtDateShort(data.workoutPlan.createdAt), " \xB7 ", wDaysCount, " dias de treino \xB7 ", wExCount, " exerc\xEDcios")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mb-3" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: () => setSubView("w-edit") }, "Editar ficha atual"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: () => setSubView("w-new") }, /* @__PURE__ */ React.createElement(Plus, { size: 13 }), " Criar novo treino")), /* @__PURE__ */ React.createElement(
    HistoryList,
    {
      icon: HistoryIcon,
      label: "Hist\xF3rico de treinos",
      items: data.workoutHistory,
      renderSummary: (p) => `${p.cycle.filter((c) => c.exercises.length > 0).length} dias \xB7 ${p.cycle.reduce((a, c) => a + c.exercises.length, 0)} exerc\xEDcios`,
      renderDetail: (p) => /* @__PURE__ */ React.createElement(WorkoutPlanDetail, { plan: p }),
      onRestore: (p) => setData((d) => ({
        ...d,
        workoutHistory: [...d.workoutHistory.filter((h) => h.id !== p.id), { ...d.workoutPlan, archivedAt: todayKey() }],
        workoutPlan: { ...p, createdAt: p.createdAt }
      }))
    }
  )), /* @__PURE__ */ React.createElement(Collapsible, { title: "Dieta", id: "dieta", open, setOpen }, /* @__PURE__ */ React.createElement(Card, { className: "mb-3" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium fs-14" }, data.dietPlan.name), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted mt-0.5" }, "Desde ", fmtDateShort(data.dietPlan.createdAt), " \xB7 ", dSlotsCount, " refei\xE7\xF5es planejadas")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mb-3" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: () => setSubView("d-edit") }, "Editar dieta atual"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: () => setSubView("d-new") }, /* @__PURE__ */ React.createElement(Plus, { size: 13 }), " Criar nova dieta")), /* @__PURE__ */ React.createElement(
    HistoryList,
    {
      icon: HistoryIcon,
      label: "Hist\xF3rico de dietas",
      items: data.dietHistory,
      renderSummary: (p) => `${p.slots.length} refei\xE7\xF5es planejadas`,
      renderDetail: (p) => /* @__PURE__ */ React.createElement(DietPlanDetail, { plan: p, allFoods: getAllFoods(data) }),
      onRestore: (p) => setData((d) => ({
        ...d,
        dietHistory: [...d.dietHistory.filter((h) => h.id !== p.id), { ...d.dietPlan, archivedAt: todayKey() }],
        dietPlan: { ...p, createdAt: p.createdAt }
      }))
    }
  )), /* @__PURE__ */ React.createElement(Collapsible, { title: "Exportar dados", id: "exportar", open, setOpen }, /* @__PURE__ */ React.createElement(ExportSection, { data })), /* @__PURE__ */ React.createElement(Collapsible, { title: "Backup entre aparelhos", id: "backup", open, setOpen }, /* @__PURE__ */ React.createElement(BackupSection, { data, setData })));
}
function BackupSection({ data, setData }) {
  const fileInputRef = useRef(null);
  const [pending, setPending] = useState(null);
  const [importError, setImportError] = useState("");
  function exportBackup() {
    downloadTextFile(`medida-backup_${todayKey()}.json`, JSON.stringify(data, null, 2), "application/json");
  }
  function handleImportClick() {
    setImportError("");
    fileInputRef.current?.click();
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target.result));
        if (!parsed || typeof parsed !== "object" || !parsed.profile) throw new Error("formato inv\xE1lido");
        setPending(parsed);
        setImportError("");
      } catch (err) {
        setPending(null);
        setImportError("Esse arquivo n\xE3o parece um backup v\xE1lido do MEDIDA.");
      }
    };
    reader.readAsText(file, "utf-8");
    e.target.value = "";
  }
  function confirmImport() {
    if (pending) setData(withDefaults(migrate(pending) || pending));
    setPending(null);
  }
  return /* @__PURE__ */ React.createElement(Card, { className: "space-y-2" }, /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-muted" }, "Gera um arquivo com ", /* @__PURE__ */ React.createElement("b", null, "tudo"), " (perfil, treinos, dietas, refei\xE7\xF5es, medidas) pra levar exatamente esse estado pra outro aparelho \u2014 diferente da exporta\xE7\xE3o em CSV, que \xE9 s\xF3 pra planilha."), /* @__PURE__ */ React.createElement("button", { onClick: exportBackup, className: "w-full bg-brass text-onbrass rounded-lg py-2 fs-13 font-medium flex items-center justify-center gap-1.5" }, /* @__PURE__ */ React.createElement(Download, { size: 14 }), " Exportar backup completo (.json)"), /* @__PURE__ */ React.createElement("div", { className: "pt-1 border-t border-hair" }, /* @__PURE__ */ React.createElement("button", { onClick: handleImportClick, className: "w-full bg-chip text-ink rounded-lg py-2 fs-13 font-medium flex items-center justify-center gap-1.5 mt-2" }, /* @__PURE__ */ React.createElement(Upload, { size: 14 }), " Importar backup neste aparelho"), /* @__PURE__ */ React.createElement("input", { ref: fileInputRef, type: "file", accept: ".json,application/json", onChange: handleFileChange, style: { display: "none" } })), importError && /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-warn" }, importError), pending && /* @__PURE__ */ React.createElement("div", { className: "bg-app border border-hair rounded-lg p-3 space-y-2" }, /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-warn" }, "Isso substitui TODOS os dados deste aparelho pelos do arquivo importado. N\xE3o d\xE1 pra desfazer \u2014 exporte um backup daqui antes, se quiser guardar o que j\xE1 tem."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: () => setPending(null) }, "Cancelar"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: confirmImport }, "Confirmar importa\xE7\xE3o"))));
}
function ExportSection({ data }) {
  const [from, setFrom] = useState(shiftDay(-29));
  const [to, setTo] = useState(todayKey());
  function handleExport() {
    const mealRows = [];
    Object.keys(data.mealsByDate).sort().forEach((dateKey) => {
      if (dateKey < from || dateKey > to) return;
      (data.mealsByDate[dateKey] || []).forEach((m) => {
        mealRows.push({ Data: dateKey, Refei\u00E7\u00E3o: m.name, Kcal: m.kcal, "Prote\xEDna (g)": m.protein, "Carboidrato (g)": m.carb, "Gordura (g)": m.fat });
      });
    });
    const workoutRows = [];
    Object.keys(data.workoutLogByDate).sort().forEach((dateKey) => {
      if (dateKey < from || dateKey > to) return;
      Object.values(data.workoutLogByDate[dateKey] || {}).forEach((entry) => {
        (entry.sets || []).forEach((s, i) => {
          workoutRows.push({
            Data: dateKey,
            Exerc\u00EDcio: entry.name,
            T\u00E9cnica: entry.technique === "restpause" ? "Rest-pause" : entry.technique === "dropset" ? "Drop-set" : "",
            S\u00E9rie: i + 1,
            "Peso (kg)": s.weight,
            Reps: s.reps,
            Conclu\u00EDda: s.done ? "Sim" : "N\xE3o"
          });
        });
      });
    });
    const bodyRows = [...data.bodyLogMonthly].filter((e) => e.month >= from.slice(0, 7) && e.month <= to.slice(0, 7)).sort((a, b) => a.month.localeCompare(b.month)).map((e) => {
      const row = { M\u00EAs: e.month, "Peso (kg)": e.weight, "% Gordura": e.bodyFat };
      BODY_MEASUREMENT_FIELDS.forEach((f) => {
        if (e.measurements?.[f.key] != null) row[`${f.label} (cm)`] = e.measurements[f.key];
      });
      return row;
    });
    const empty = [{ Info: "Nenhum dado registrado neste per\xEDodo" }];
    downloadTextFile(`medida-refeicoes_${from}_a_${to}.csv`, rowsToCSV(mealRows.length ? mealRows : empty), "text/csv");
    downloadTextFile(`medida-treino_${from}_a_${to}.csv`, rowsToCSV(workoutRows.length ? workoutRows : empty), "text/csv");
    downloadTextFile(`medida-medidas_${from}_a_${to}.csv`, rowsToCSV(bodyRows.length ? bodyRows : empty), "text/csv");
  }
  return /* @__PURE__ */ React.createElement(Card, { className: "space-y-3" }, /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-muted" }, "Exporta refei\xE7\xF5es, treinos e medidas do per\xEDodo escolhido em 3 arquivos CSV (abrem direto no Excel, Numbers ou Google Sheets)."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(Field, { label: "De" }, /* @__PURE__ */ React.createElement("input", { type: "date", value: from, max: to, onChange: (e) => {
    let v = e.target.value;
    if (!v) return;
    if (v > to) v = to;
    setFrom(v);
  }, className: inputCls })), /* @__PURE__ */ React.createElement(Field, { label: "At\xE9" }, /* @__PURE__ */ React.createElement("input", { type: "date", value: to, min: from, max: todayKey(), onChange: (e) => {
    let v = e.target.value;
    if (!v) return;
    if (v < from) v = from;
    if (v > todayKey()) v = todayKey();
    setTo(v);
  }, className: inputCls }))), /* @__PURE__ */ React.createElement("button", { onClick: handleExport, className: "w-full bg-brass text-onbrass rounded-lg py-2 fs-13 font-medium flex items-center justify-center gap-1.5" }, /* @__PURE__ */ React.createElement(Download, { size: 14 }), " Exportar CSV"));
}
function Collapsible({ title, id, open, setOpen, children }) {
  const isOpen = open === id;
  return /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(isOpen ? null : id), className: "w-full flex items-center justify-between py-2" }, /* @__PURE__ */ React.createElement("span", { className: "fs-13 font-medium tracking-wide" }, title), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "text-muted transition-transform", style: { transform: isOpen ? "rotate(180deg)" : "none" } })), isOpen && /* @__PURE__ */ React.createElement("div", { className: "pb-2" }, children));
}
function HistoryList({ label, items, renderSummary, renderDetail, onRestore }) {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(null);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => setShow((s) => !s), className: "flex items-center gap-1.5 fs-12 text-muted" }, /* @__PURE__ */ React.createElement(HistoryIcon, { size: 13 }), " ", label, " (", items.length, ")", /* @__PURE__ */ React.createElement(ChevronDown, { size: 13, style: { transform: show ? "rotate(180deg)" : "none" } })), show && /* @__PURE__ */ React.createElement("div", { className: "mt-2 space-y-2" }, items.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted" }, "Nenhum registro anterior ainda."), [...items].reverse().map((p) => /* @__PURE__ */ React.createElement(Card, { key: p.id, className: "!p-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded(expanded === p.id ? null : p.id), className: "w-full flex items-center justify-between text-left" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "fs-13 font-medium" }, p.name), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mt-0.5" }, fmtDateShort(p.createdAt), " \u2014 ", fmtDateShort(p.archivedAt), " \xB7 ", renderSummary(p))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 14, className: "text-muted shrink-0", style: { transform: expanded === p.id ? "rotate(180deg)" : "none" } })), expanded === p.id && /* @__PURE__ */ React.createElement("div", { className: "mt-3 pt-3 border-t border-hair" }, renderDetail(p), /* @__PURE__ */ React.createElement("button", { onClick: () => onRestore(p), className: "mt-3 flex items-center gap-1.5 fs-11 text-brass" }, /* @__PURE__ */ React.createElement(RotateCcw, { size: 12 }), " Reativar este plano"))))));
}
function WorkoutPlanDetail({ plan }) {
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, plan.cycle.filter((c) => c.exercises.length > 0).map((c, i) => /* @__PURE__ */ React.createElement("div", { key: c.id }, /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted uppercase tracking-wide" }, "Dia ", i + 1, " \u2014 ", c.name), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-ink" }, c.exercises.map((e) => e.name).join(", ")))));
}
function DietPlanDetail({ plan, allFoods }) {
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, plan.slots.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id }, /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted uppercase tracking-wide" }, s.name), s.options.map((o) => /* @__PURE__ */ React.createElement(MacroChips, { key: o.id, m: computeItemsMacros(o.items, allFoods) })))));
}
function ProfileEditor({ data, setData, targets }) {
  const p = data.profile;
  function upd(field, value) {
    setData((d) => ({ ...d, profile: { ...d.profile, [field]: value } }));
  }
  return /* @__PURE__ */ React.createElement(Card, { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(Field, { label: "Peso (kg)" }, /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", value: p.weightKg, onChange: (e) => upd("weightKg", Number(e.target.value) || 0), className: inputCls + " font-mono" })), /* @__PURE__ */ React.createElement(Field, { label: "Altura (cm)" }, /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: p.heightCm, onChange: (e) => upd("heightCm", Number(e.target.value) || 0), className: inputCls + " font-mono" })), /* @__PURE__ */ React.createElement(Field, { label: "Idade" }, /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: p.age, onChange: (e) => upd("age", Number(e.target.value) || 0), className: inputCls + " font-mono" })), /* @__PURE__ */ React.createElement(Field, { label: "Sexo" }, /* @__PURE__ */ React.createElement("select", { value: p.sex, onChange: (e) => upd("sex", e.target.value), className: inputCls }, /* @__PURE__ */ React.createElement("option", { value: "M" }, "Masculino"), /* @__PURE__ */ React.createElement("option", { value: "F" }, "Feminino"))), /* @__PURE__ */ React.createElement(Field, { label: "Atividade" }, /* @__PURE__ */ React.createElement("select", { value: p.activity, onChange: (e) => upd("activity", Number(e.target.value)), className: inputCls }, /* @__PURE__ */ React.createElement("option", { value: 1.2 }, "Sedent\xE1rio"), /* @__PURE__ */ React.createElement("option", { value: 1.375 }, "Leve"), /* @__PURE__ */ React.createElement("option", { value: 1.55 }, "Moderado"), /* @__PURE__ */ React.createElement("option", { value: 1.725 }, "Intenso"), /* @__PURE__ */ React.createElement("option", { value: 1.9 }, "Atleta"))), /* @__PURE__ */ React.createElement(Field, { label: "Objetivo" }, /* @__PURE__ */ React.createElement("select", { value: p.goal, onChange: (e) => upd("goal", e.target.value), className: inputCls }, /* @__PURE__ */ React.createElement("option", { value: "cut" }, "Emagrecimento"), /* @__PURE__ */ React.createElement("option", { value: "maintain" }, "Manuten\xE7\xE3o"), /* @__PURE__ */ React.createElement("option", { value: "bulk" }, "Ganho de massa"))), /* @__PURE__ */ React.createElement(Field, { label: "Prot. g/kg" }, /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", value: p.proteinPerKg, onChange: (e) => upd("proteinPerKg", e.target.value), onBlur: (e) => upd("proteinPerKg", toNum(e.target.value)), className: inputCls + " font-mono" })), /* @__PURE__ */ React.createElement(Field, { label: "Gord. g/kg" }, /* @__PURE__ */ React.createElement("input", { inputMode: "decimal", value: p.fatPerKg, onChange: (e) => upd("fatPerKg", e.target.value), onBlur: (e) => upd("fatPerKg", toNum(e.target.value)), className: inputCls + " font-mono" }))), /* @__PURE__ */ React.createElement(TickDivider, null), /* @__PURE__ */ React.createElement("div", { className: "flex justify-around" }, /* @__PURE__ */ React.createElement(MacroRing, { label: "Kcal", value: targets.kcal, target: targets.kcal, unit: "", accent: "#B8862E" }), /* @__PURE__ */ React.createElement(MacroRing, { label: "Prot", value: targets.protein, target: targets.protein, accent: "#2E8A82" }), /* @__PURE__ */ React.createElement(MacroRing, { label: "Carb", value: targets.carb, target: targets.carb, accent: "#B8862E" }), /* @__PURE__ */ React.createElement(MacroRing, { label: "Gord", value: targets.fat, target: targets.fat, accent: "#3F8F5C" })), /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted text-center" }, "Metas calculadas automaticamente (Mifflin-St Jeor)"));
}
function Field({ label, children }) {
  return /* @__PURE__ */ React.createElement("label", { className: "block" }, /* @__PURE__ */ React.createElement("span", { className: "fs-10 text-muted uppercase tracking-wide" }, label), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, children));
}
function WorkoutBuilder({ data, setData, mode, onClose }) {
  const [name, setName] = useState(mode === "edit" ? data.workoutPlan.name : `${data.workoutPlan.name} (novo)`);
  const [draftCycle, setDraftCycle] = useState(() => cloneDeep(data.workoutPlan.cycle));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef(null);
  const library = getExerciseLibrary(data);
  const [category, setCategory] = useState(Object.keys(library)[0]);
  const [search, setSearch] = useState("");
  const [creatingEx, setCreatingEx] = useState(false);
  const [newExDraft, setNewExDraft] = useState({ name: "", category: Object.keys(library)[0] });
  const day = draftCycle[selectedIndex];
  function handleImportClick() {
    setImportError("");
    fileInputRef.current?.click();
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = csvToCycle(String(ev.target.result));
        if (parsed.length === 0) {
          setImportError("N\xE3o encontrei nenhuma linha v\xE1lida (confira as colunas Dia e Exercicio).");
          return;
        }
        setDraftCycle(parsed);
        setSelectedIndex(0);
        setImportError("");
      } catch (err) {
        setImportError("N\xE3o consegui ler esse arquivo como CSV.");
      }
    };
    reader.readAsText(file, "utf-8");
    e.target.value = "";
  }
  function exportCurrentCSV() {
    downloadTextFile(`ficha-${(name || "treino").toLowerCase().replace(/\s+/g, "-")}.csv`, cycleToCSV(draftCycle), "text/csv");
  }
  function updDayName(v) {
    setDraftCycle((c) => c.map((d, i) => i === selectedIndex ? { ...d, name: v } : d));
  }
  function addExercise(name2) {
    setDraftCycle((c) => c.map((d, i) => i === selectedIndex ? { ...d, exercises: [...d.exercises, { id: uid(), name: name2, sets: 3, reps: 10, targetWeight: 0, technique: null }] } : d));
  }
  function updExercise(exId, field, value) {
    setDraftCycle((c) => c.map((d, i) => i === selectedIndex ? { ...d, exercises: d.exercises.map((e) => e.id === exId ? { ...e, [field]: value } : e) } : d));
  }
  function removeExercise(exId) {
    setDraftCycle((c) => c.map((d, i) => i === selectedIndex ? { ...d, exercises: d.exercises.filter((e) => e.id !== exId) } : d));
  }
  function addCycleDay() {
    setDraftCycle((c) => {
      const next = [...c, { id: uid(), name: `Dia ${c.length + 1}`, exercises: [] }];
      setSelectedIndex(next.length - 1);
      return next;
    });
  }
  function removeCycleDay(i) {
    if (draftCycle.length <= 1) return;
    setDraftCycle((c) => c.filter((_, idx) => idx !== i));
    setSelectedIndex((idx) => i <= idx ? Math.max(0, idx - 1) : idx);
  }
  function moveDay(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= draftCycle.length) return;
    setDraftCycle((c) => {
      const next = [...c];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setSelectedIndex(j);
  }
  function clearAll() {
    setDraftCycle(defaultCycle());
    setSelectedIndex(0);
  }
  function submitNewExercise() {
    const exName = newExDraft.name.trim();
    if (!exName) return;
    setData((d) => ({ ...d, customExercises: [...d.customExercises || [], { id: uid(), name: exName, category: newExDraft.category }] }));
    addExercise(exName);
    setNewExDraft({ name: "", category: newExDraft.category });
    setCreatingEx(false);
  }
  function save() {
    const finalName = name.trim() || "Minha ficha";
    if (mode === "new") {
      setData((d) => ({
        ...d,
        workoutHistory: [...d.workoutHistory, { ...d.workoutPlan, archivedAt: todayKey() }],
        workoutPlan: { id: uid(), name: finalName, createdAt: todayKey(), cycle: draftCycle, currentIndex: 0 }
      }));
    } else {
      setData((d) => ({
        ...d,
        workoutPlan: { ...d.workoutPlan, name: finalName, cycle: draftCycle, currentIndex: Math.min(d.workoutPlan.currentIndex, draftCycle.length - 1) }
      }));
    }
    onClose();
  }
  const q = search.trim().toLowerCase();
  const filteredLibrary = q ? Object.entries(library).flatMap(([cat, names]) => names.filter((n) => n.toLowerCase().includes(q)).map((n) => ({ name: n, category: cat }))) : (library[category] || []).map((n) => ({ name: n, category }));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "text-muted" }, /* @__PURE__ */ React.createElement(ArrowLeft, { size: 18 })), /* @__PURE__ */ React.createElement("h2", { className: "fs-14 font-semibold" }, mode === "new" ? "Criar novo treino" : "Editar ficha atual")), /* @__PURE__ */ React.createElement(Field, { label: "Nome da ficha" }, /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), className: inputCls, placeholder: "Ex: Push Pull Legs \u2014 Fase 2" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: handleImportClick }, /* @__PURE__ */ React.createElement(Upload, { size: 13 }), " Importar CSV"), /* @__PURE__ */ React.createElement(GhostBtn, { onClick: exportCurrentCSV }, /* @__PURE__ */ React.createElement(Download, { size: 13 }), " Exportar CSV")), /* @__PURE__ */ React.createElement("input", { ref: fileInputRef, type: "file", accept: ".csv,text/csv", onChange: handleFileChange, style: { display: "none" } }), importError && /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-warn mt-1.5" }, importError), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mt-1.5" }, 'Colunas do CSV: Dia, Exercicio, Series, Reps, Peso, Tecnica. Linhas com o mesmo "Dia" formam um dia do ciclo.'), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mt-4 mb-2" }, /* @__PURE__ */ React.createElement(SectionLabel, null, /* @__PURE__ */ React.createElement("span", { className: "mb-0" }, "Dias do ciclo")), /* @__PURE__ */ React.createElement("button", { onClick: clearAll, className: "fs-10 text-muted hovertext-warn" }, "Limpar tudo")), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mb-2" }, "Sequ\xEAncia que se repete conforme voc\xEA treina \u2014 n\xE3o presa a dia da semana."), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto pb-1 mb-3 -mx-1 px-1" }, draftCycle.map((d, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: d.id,
      onClick: () => setSelectedIndex(i),
      className: `shrink-0 px-3 py-1.5 rounded-lg fs-12 ${selectedIndex === i ? "bg-brass text-onbrass font-medium" : "bg-surface text-muted border border-hair"}`
    },
    d.name,
    d.exercises.length > 0 ? " \u2022" : ""
  )), /* @__PURE__ */ React.createElement("button", { onClick: addCycleDay, className: "shrink-0 px-3 py-1.5 rounded-lg fs-12 border border-dashed border-hair text-brass flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Plus, { size: 12 }), " Dia")), /* @__PURE__ */ React.createElement(Card, { className: "mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement("input", { value: day.name, onChange: (e) => updDayName(e.target.value), className: inputCls + " font-medium", placeholder: "Nome do treino do dia (ex: Peito e Tr\xEDceps)" }), /* @__PURE__ */ React.createElement("button", { onClick: () => moveDay(selectedIndex, -1), disabled: selectedIndex === 0, className: "text-muted disabled:opacity-30 shrink-0" }, /* @__PURE__ */ React.createElement(ArrowLeft, { size: 16 })), /* @__PURE__ */ React.createElement("button", { onClick: () => moveDay(selectedIndex, 1), disabled: selectedIndex === draftCycle.length - 1, className: "text-muted disabled:opacity-30 shrink-0", style: { transform: "scaleX(-1)" } }, /* @__PURE__ */ React.createElement(ArrowLeft, { size: 16 })), draftCycle.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: () => removeCycleDay(selectedIndex), className: "text-muted hovertext-warn shrink-0" }, /* @__PURE__ */ React.createElement(Trash2, { size: 15 }))), day.exercises.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-12 text-muted mb-2" }, "Nenhum exerc\xEDcio ainda. Adicione pela biblioteca abaixo."), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, day.exercises.map((ex) => /* @__PURE__ */ React.createElement("div", { key: ex.id, className: "bg-app border border-hair rounded-lg p-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "fs-12 font-medium" }, ex.name), /* @__PURE__ */ React.createElement("button", { onClick: () => removeExercise(ex.id) }, /* @__PURE__ */ React.createElement(X, { size: 13, className: "text-muted" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 fs-11 text-muted" }, /* @__PURE__ */ React.createElement("span", null, "s\xE9ries"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: ex.sets, onChange: (e) => updExercise(ex.id, "sets", Number(e.target.value) || 0), className: "w-9 bg-transparent border-b border-hair text-center font-mono outline-none" }), /* @__PURE__ */ React.createElement("span", null, "reps"), /* @__PURE__ */ React.createElement("input", { value: ex.reps, onChange: (e) => updExercise(ex.id, "reps", e.target.value), className: "w-10 bg-transparent border-b border-hair text-center font-mono outline-none" }), /* @__PURE__ */ React.createElement("span", null, "kg"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: ex.targetWeight, onChange: (e) => updExercise(ex.id, "targetWeight", Number(e.target.value) || 0), className: "w-10 bg-transparent border-b border-hair text-center font-mono outline-none" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 mt-2" }, [[null, "Normal"], ["restpause", "Rest-pause"], ["dropset", "Drop-set"]].map(([val, label]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: label,
      onClick: () => updExercise(ex.id, "technique", val),
      className: `fs-10 px-2 py-1 rounded-full ${(ex.technique || null) === val ? "bg-teal text-onbrass font-medium" : "bg-chip text-muted"}`
    },
    label
  ))))))), /* @__PURE__ */ React.createElement(SectionLabel, null, "Biblioteca de exerc\xEDcios"), /* @__PURE__ */ React.createElement(Card, { className: "mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto pb-1 mb-2 -mx-1 px-1" }, Object.keys(library).map((cat) => /* @__PURE__ */ React.createElement("button", { key: cat, onClick: () => setCategory(cat), className: `shrink-0 fs-11 px-2.5 py-1 rounded-lg ${category === cat ? "bg-teal text-onbrass font-medium" : "bg-chip text-muted"}` }, cat))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2 bg-app border border-hair rounded-lg px-2.5 py-1.5" }, /* @__PURE__ */ React.createElement(Search, { size: 13, className: "text-muted shrink-0" }), /* @__PURE__ */ React.createElement("input", { placeholder: "Buscar em todos os grupos\u2026", value: search, onChange: (e) => setSearch(e.target.value), className: "flex-1 bg-transparent outline-none fs-12" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-1.5 mb-2" }, filteredLibrary.map((item, i) => /* @__PURE__ */ React.createElement("button", { key: `${item.category}-${item.name}-${i}`, onClick: () => addExercise(item.name), className: "flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg bg-app hoverbg-row fs-11" }, /* @__PURE__ */ React.createElement("span", null, item.name, q ? /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, " \xB7 ", item.category) : null), /* @__PURE__ */ React.createElement(Plus, { size: 12, className: "text-brass shrink-0" }))), filteredLibrary.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "fs-11 text-muted col-span-2" }, "Nenhum exerc\xEDcio encontrado.")), !creatingEx ? /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setNewExDraft({ name: "", category });
    setCreatingEx(true);
  }, className: "flex items-center gap-1 fs-11 text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 12 }), " Cadastrar novo exerc\xEDcio") : /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 pt-2 border-t border-hair" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Nome do exerc\xEDcio", value: newExDraft.name, onChange: (e) => setNewExDraft((v) => ({ ...v, name: e.target.value })), className: inputSmCls + " w-full" }), /* @__PURE__ */ React.createElement("select", { value: newExDraft.category, onChange: (e) => setNewExDraft((v) => ({ ...v, category: e.target.value })), className: inputSmCls + " w-full" }, Object.keys(library).map((cat) => /* @__PURE__ */ React.createElement("option", { key: cat, value: cat }, cat))), /* @__PURE__ */ React.createElement("button", { onClick: submitNewExercise, className: "w-full bg-brass text-onbrass rounded-lg py-1.5 fs-12 font-medium" }, "Adicionar e usar"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 pb-4" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: onClose }, "Cancelar"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: save }, /* @__PURE__ */ React.createElement(Check, { size: 14 }), " ", mode === "new" ? "Salvar novo treino" : "Salvar altera\xE7\xF5es")));
}
function DietBuilder({ data, setData, mode, onClose }) {
  const [name, setName] = useState(mode === "edit" ? data.dietPlan.name : `${data.dietPlan.name} (novo)`);
  const [slots, setSlots] = useState(() => cloneDeep(data.dietPlan.slots));
  const [pickerFor, setPickerFor] = useState(null);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef(null);
  const allFoods = getAllFoods(data);
  function handleImportClick() {
    setImportError("");
    fileInputRef.current?.click();
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const { slots: parsedSlots, newFoods } = csvToDietPlan(String(ev.target.result), allFoods);
        if (parsedSlots.length === 0) {
          setImportError("N\xE3o encontrei nenhuma linha v\xE1lida (confira as colunas Refeicao e Alimento).");
          return;
        }
        if (newFoods.length) setData((d) => ({ ...d, customFoods: [...d.customFoods || [], ...newFoods] }));
        setSlots(parsedSlots);
        setImportError("");
      } catch (err) {
        setImportError("N\xE3o consegui ler esse arquivo como CSV.");
      }
    };
    reader.readAsText(file, "utf-8");
    e.target.value = "";
  }
  function exportCurrentCSV() {
    downloadTextFile(`dieta-${(name || "plano").toLowerCase().replace(/\s+/g, "-")}.csv`, dietPlanToCSV(slots, allFoods), "text/csv");
  }
  function updSlot(slotId, field, value) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, [field]: value } : sl));
  }
  function addSlot() {
    setSlots((s) => [...s, { id: uid(), name: "Nova refei\xE7\xE3o", time: "", options: [{ id: uid(), label: "Padr\xE3o", items: [] }] }]);
  }
  function removeSlot(slotId) {
    setSlots((s) => s.filter((sl) => sl.id !== slotId));
  }
  function addOption(slotId) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, options: [...sl.options, { id: uid(), label: `Varia\xE7\xE3o ${sl.options.length}`, items: [] }] } : sl));
  }
  function removeOption(slotId, optionId) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, options: sl.options.filter((o) => o.id !== optionId) } : sl));
  }
  function updOptionLabel(slotId, optionId, label) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, options: sl.options.map((o) => o.id === optionId ? { ...o, label } : o) } : sl));
  }
  function addItem(slotId, optionId, food) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? {
      ...sl,
      options: sl.options.map((o) => o.id === optionId ? { ...o, items: [...o.items, { id: uid(), foodId: food.id, grams: 100 }] } : o)
    } : sl));
  }
  function updItemGrams(slotId, optionId, itemId, grams) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? {
      ...sl,
      options: sl.options.map((o) => o.id === optionId ? { ...o, items: o.items.map((it) => it.id === itemId ? { ...it, grams: Number(grams) || 0 } : it) } : o)
    } : sl));
  }
  function removeItem(slotId, optionId, itemId) {
    setSlots((s) => s.map((sl) => sl.id === slotId ? {
      ...sl,
      options: sl.options.map((o) => o.id === optionId ? { ...o, items: o.items.filter((it) => it.id !== itemId) } : o)
    } : sl));
  }
  function createFood(food) {
    setData((d) => ({ ...d, customFoods: [...d.customFoods, food] }));
  }
  function save() {
    const finalName = name.trim() || "Minha dieta";
    if (mode === "new") {
      setData((d) => ({
        ...d,
        dietHistory: [...d.dietHistory, { ...d.dietPlan, archivedAt: todayKey() }],
        dietPlan: { id: uid(), name: finalName, createdAt: todayKey(), slots }
      }));
    } else {
      setData((d) => ({ ...d, dietPlan: { ...d.dietPlan, name: finalName, slots } }));
    }
    onClose();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "text-muted" }, /* @__PURE__ */ React.createElement(ArrowLeft, { size: 18 })), /* @__PURE__ */ React.createElement("h2", { className: "fs-14 font-semibold" }, mode === "new" ? "Criar nova dieta" : "Editar dieta atual")), /* @__PURE__ */ React.createElement(Field, { label: "Nome da dieta" }, /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), className: inputCls, placeholder: "Ex: Cutting \u2014 Fase 2" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: handleImportClick }, /* @__PURE__ */ React.createElement(Upload, { size: 13 }), " Importar CSV"), /* @__PURE__ */ React.createElement(GhostBtn, { onClick: exportCurrentCSV }, /* @__PURE__ */ React.createElement(Download, { size: 13 }), " Exportar CSV")), /* @__PURE__ */ React.createElement("input", { ref: fileInputRef, type: "file", accept: ".csv,text/csv", onChange: handleFileChange, style: { display: "none" } }), importError && /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-warn mt-1.5" }, importError), /* @__PURE__ */ React.createElement("p", { className: "fs-10 text-muted mt-1.5" }, "Colunas do CSV: Refeicao, Horario, Opcao, Alimento, Kcal100, Proteina100, Carboidrato100, Gordura100, Gramas. Alimentos novos s\xE3o cadastrados automaticamente."), /* @__PURE__ */ React.createElement("div", { className: "mt-4 space-y-3" }, slots.map((slot) => /* @__PURE__ */ React.createElement(Card, { key: slot.id }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("input", { value: slot.name, onChange: (e) => updSlot(slot.id, "name", e.target.value), className: inputSmCls + " flex-1 font-medium", placeholder: "Nome da refei\xE7\xE3o" }), /* @__PURE__ */ React.createElement("input", { value: slot.time, onChange: (e) => updSlot(slot.id, "time", e.target.value), className: inputSmCls + " w-16 font-mono", placeholder: "hh:mm" }), /* @__PURE__ */ React.createElement("button", { onClick: () => removeSlot(slot.id) }, /* @__PURE__ */ React.createElement(Trash2, { size: 14, className: "text-muted" }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, slot.options.map((opt) => {
    const m = computeItemsMacros(opt.items, allFoods);
    const isPicking = pickerFor && pickerFor.slotId === slot.id && pickerFor.optionId === opt.id;
    return /* @__PURE__ */ React.createElement("div", { key: opt.id, className: "bg-app border border-hair rounded-lg p-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1.5" }, /* @__PURE__ */ React.createElement("input", { value: opt.label, onChange: (e) => updOptionLabel(slot.id, opt.id, e.target.value), className: "flex-1 bg-transparent fs-12 font-medium outline-none border-b border-hair" }), slot.options.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: () => removeOption(slot.id, opt.id) }, /* @__PURE__ */ React.createElement(X, { size: 13, className: "text-muted" }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1 mb-1.5" }, opt.items.map((it) => {
      const f = allFoods.find((f2) => f2.id === it.foodId);
      return /* @__PURE__ */ React.createElement("div", { key: it.id, className: "flex items-center justify-between fs-11" }, /* @__PURE__ */ React.createElement("span", { className: "text-ink" }, f?.name || "Alimento"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: it.grams, onChange: (e) => updItemGrams(slot.id, opt.id, it.id, e.target.value), className: "w-10 bg-transparent text-right font-mono outline-none border-b border-hair" }), /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, "g"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeItem(slot.id, opt.id, it.id) }, /* @__PURE__ */ React.createElement(X, { size: 11, className: "text-muted" }))));
    })), /* @__PURE__ */ React.createElement(MacroChips, { m }), !isPicking ? /* @__PURE__ */ React.createElement("button", { onClick: () => setPickerFor({ slotId: slot.id, optionId: opt.id }), className: "mt-2 flex items-center gap-1 fs-11 text-brass" }, /* @__PURE__ */ React.createElement(Plus, { size: 12 }), " Adicionar alimento") : /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement(FoodPicker, { foods: allFoods, onCreateFood: createFood, onSelect: (food) => addItem(slot.id, opt.id, food) }), /* @__PURE__ */ React.createElement("button", { onClick: () => setPickerFor(null), className: "mt-1.5 fs-11 text-muted" }, "Concluir")));
  }), /* @__PURE__ */ React.createElement("button", { onClick: () => addOption(slot.id), className: "flex items-center gap-1 fs-11 text-teal" }, /* @__PURE__ */ React.createElement(Plus, { size: 12 }), " Adicionar varia\xE7\xE3o para esta refei\xE7\xE3o")))), /* @__PURE__ */ React.createElement("button", { onClick: addSlot, className: "w-full flex items-center justify-center gap-1.5 border border-dashed border-hair rounded-lg py-2.5 fs-12 text-muted" }, /* @__PURE__ */ React.createElement(Plus, { size: 14 }), " Novo hor\xE1rio de refei\xE7\xE3o")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-5 pb-4" }, /* @__PURE__ */ React.createElement(GhostBtn, { onClick: onClose }, "Cancelar"), /* @__PURE__ */ React.createElement(PrimaryBtn, { onClick: save }, /* @__PURE__ */ React.createElement(Check, { size: 14 }), " ", mode === "new" ? "Salvar nova dieta" : "Salvar altera\xE7\xF5es")));
}
export {
  App as default
};
