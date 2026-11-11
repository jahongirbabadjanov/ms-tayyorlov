(function(){
const css = `
.timer{position:sticky;top:0;z-index:5;background:var(--card2);border:1.5px solid var(--line2);border-radius:14px;padding:10px 14px;display:flex;justify-content:space-between;margin-bottom:12px;font-weight:700}
.big{font-size:44px;font-weight:800;text-align:center;color:var(--mint);margin:6px 0}
.lvl{display:inline-block;padding:6px 18px;border-radius:99px;background:linear-gradient(135deg,var(--violet),var(--mint));color:#0b1020;font-weight:800;font-size:22px}
.rrow{display:grid;grid-template-columns:48px 1fr 1fr;gap:8px;padding:7px 0;border-bottom:1px solid #1a2342;font-size:14px}
.rrow.h{color:var(--muted);font-size:12px}
.good{color:var(--mint)}.bad{color:var(--danger)}
.center{text-align:center}
.zb{display:flex;gap:10px;align-items:center;margin-bottom:8px}
.zb button{width:42px;height:36px;border-radius:10px;border:1.5px solid var(--line2);background:var(--card2);color:#fff;font-size:20px}
.pdfbox{height:70vh;overflow:auto;background:#0b1020;border-radius:12px;padding:4px;-webkit-overflow-scrolling:touch}
`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
$("app").insertAdjacentHTML("beforeend", '<section id="v-exam" class="hidden"></section>');

let timer = null, CUR = null, D = null, sending = false;
const stopTimer = () => { if(timer){ clearInterval(timer); timer = null; } };
const dk = c => "draft_" + c;
const saveDraft = () => { try{ localStorage.setItem(dk(CUR.test.code), JSON.stringify(D)); }catch(e){} };
const loadDraft = c => { try{ return JSON.parse(localStorage.getItem(dk(c))); }catch(e){ return null; } };
const clearDraft = c => { try{ localStorage.removeItem(dk(c)); }catch(e){} };
const fmt = s => { s = Math.max(0, s); return [Math.floor(s/3600), Math.floor(s%3600/60), s%60].map(v => String(v).padStart(2, "0")).join(":"); };
const box = html => { $("v-exam").innerHTML = html; };
let pdfDoc = null, zoom = 1, drawId = 0;
function loadPdfJs(){
  return new Promise((ok, no) => {
    if(window.pdfjsLib) return ok();
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => { pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; ok(); };
    s.onerror = no;
    document.head.appendChild(s);
  });
}
async function showPdf(url){
  try{
    await loadPdfJs();
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    drawPdf();
  }catch(e){
    const b = $("xpages");
    if(b) b.innerHTML = '<p class="sub">PDF ochilmadi. <a href="' + url + '" target="_blank">Yuklab olish</a></p>';
  }
}
async function drawPdf(){
  const wrap = $("xpages");
  if(!wrap || !pdfDoc) return;
  const my = ++drawId;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = wrap.clientWidth - 8;
  const pages = [];
  for(let i = 1; i <= pdfDoc.numPages; i++){
    const pg = await pdfDoc.getPage(i);
    if(my !== drawId) return;
    const sc = (w / pg.getViewport({scale: 1}).width) * zoom;
    const vp = pg.getViewport({scale: sc * dpr});
    const cv = document.createElement("canvas");
    cv.width = vp.width; cv.height = vp.height;
    cv.style.cssText = "display:block;margin-bottom:8px;background:#fff;width:" + (vp.width / dpr) + "px";
    await pg.render({canvasContext: cv.getContext("2d"), viewport: vp}).promise;
    if(my !== drawId) return;
    pages.push(cv);
    if(i === 1){ wrap.innerHTML = ""; }
    wrap.appendChild(cv);
  }
}
function setZoom(d){
  zoom = Math.min(3, Math.max(0.5, zoom + d));
  $("zv").textContent = Math.round(zoom * 100) + "%";
  const wrap = $("xpages"); if(wrap) wrap.innerHTML = "";
  drawPdf();
}
function showExam(){
  ["tests","answer","create","profile"].forEach(x => $("v-" + x).classList.add("hidden"));
  $("v-exam").classList.remove("hidden");
  window.scrollTo(0, 0);
}

const _go = window.go;
window.go = v => { stopTimer(); $("v-exam").classList.add("hidden"); _go(v); };

$("tlist").addEventListener("click", e => {
  const a = e.target.closest("a.pdfdl");
  if(a){ e.preventDefault(); if(tg.openLink) tg.openLink(a.href); else window.open(a.href, "_blank"); return; }
  const c = e.target.closest(".t");
  if(c && c.dataset.code) openTest(c.dataset.code);
});
$("codego").onclick = () => { const c = $("codein").value.trim(); if(c) openTest(c); };

async function openTest(code){
  showExam();
  box('<div class="card"><p class="sub" style="margin:0">Yuklanmoqda...</p></div>');
  try{
    const r = await call("/api/tests/get", {code});
    CUR = r;
    if(r.state === "new"){
      try{ const m = await call("/api/me", {}); ME = m.user; }catch(e){}
      renderNew(r);
    }else if(r.state === "started") renderSheet(r);
    else renderResult(r.test, r.result, r.key_pdf_url);
  }catch(e){
    box('<div class="card"><p class="sub">Test topilmadi yoki xatolik chiqdi.</p><button class="btn sec" id="xb" type="button">Orqaga</button></div>');
    $("xb").onclick = () => go("tests");
  }
}
  
function renderNew(r){
  const t = r.test, price = t.price || 0, bal = (ME && ME.balance) || 0, low = price > bal;
  const st = t.starts_at ? Date.parse(t.starts_at) : 0, en = t.ends_at ? Date.parse(t.ends_at) : 0, nowT = Date.now();
  const fm = x => new Date(x).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit"});
  const early = st && nowT < st, late = en && nowT > en, closedNow = early || late;
  const note = early ? `<p class="err">Test hali boshlanmagan. Boshlanish: ${fm(st)}</p>` : late ? `<p class="err">Test vaqti tugagan (${fm(en)}).</p>` : (en ? `<p class="sub">Tugash vaqti: ${fm(en)}</p>` : "");
  box(`<div class="card"><h2>${esc(t.title)}</h2><p class="sub">${esc(t.subject)}</p>
    <div class="kv"><span>Savollar soni</span><span>${t.question_count} ta</span></div>
    <div class="kv"><span>Vaqt</span><span>${t.duration_minutes} daqiqa</span></div>
    <div class="kv"><span>Narx</span><span>${som(price)}</span></div>
    <div class="kv"><span>Urinish</span><span>1 marta</span></div></div>
    <div class="card"><b>Qoidalar</b>
    <p class="sub" style="margin-top:8px">• Taymer boshlaganingizda ishga tushadi va to'xtamaydi.<br>• Javoblar avtomatik saqlanadi, ilovani yopsangiz ham davom ettirasiz.<br>• Vaqt tugasa, javoblar o'zi topshiriladi.<br>• Natija va to'g'ri javoblar darhol chiqadi.</p></div>
    ${low ? `<p class="err">Balansingiz: ${som(bal)}. Boshlash uchun ${som(price)} yetmaydi.</p>` : ""}
    ${note}
    <div class="err" id="xerr"></div>
    <button class="btn" id="xstart" type="button" ${low || closedNow ? "disabled" : ""}>Testni boshlash${price ? " — " + som(price) : ""}</button>
    <button class="btn sec" id="xb" type="button">Orqaga</button>`);
  $("xb").onclick = () => go("tests");
  $("xstart").onclick = async () => {
    $("xstart").disabled = true;
    try{ await call("/api/tests/start", {code: t.code}); openTest(t.code); }
    catch(e){ const m = String(e.message); $("xerr").textContent = m.includes("402") ? "Balans yetarli emas." : m.includes("403") ? "Test hozir ochiq emas (vaqti tugagan yoki hali boshlanmagan)." : "Xatolik. Qayta urinib ko'ring."; $("xstart").disabled = false; }
  }
}

  function renderSheet(r){
  CUR = r;
  const t = r.test, saved = loadDraft(t.code);
  D = {closed: Array(35).fill(""), open: t.open_parts.map(n => Array(n).fill(""))};
  if(saved && saved.closed && saved.closed.length === 35) D.closed = saved.closed;
  if(saved && saved.open && saved.open.length === D.open.length)
    D.open = D.open.map((row, i) => (saved.open[i] && saved.open[i].length === row.length) ? saved.open[i] : row);
  let left = t.duration_minutes * 60 - r.elapsed;
  zoom = 1; pdfDoc = null;
  box(`<div class="timer"><button id="xback" type="button" style="background:none;border:0;color:#fff;font-size:22px;padding:0 10px 0 0">←</button><span style="flex:1">${esc(t.title)}</span><span id="tm">${fmt(left)}</span></div>
    ${t.pdf_url ? `<div class="card"><div class="zb"><button id="zm" type="button">−</button><span id="zv">100%</span><button id="zp" type="button">+</button></div><div class="pdfbox" id="xpages"><p class="sub">PDF yuklanmoqda...</p></div></div>` : ""}
    <div class="card"><div class="sec-t" style="margin-top:0">Yopiq savollar (1-35)</div><div id="xgrid"></div>
    <div id="xopen"></div>
    ${t.written ? `<div class="note">📝 Yozma ishlar (${t.written} ta) qog'ozda bajariladi, bu yerda javob kiritilmaydi.</div>` : ""}
    <div class="err" id="xerr"></div>
    <button class="btn" id="xsend" type="button">Javoblarni yuborish</button></div>`);
  drawGrid(); drawOpen();
  $("xback").onclick = () => {
    const out = () => go("tests");
    if(tg.showConfirm) tg.showConfirm("Testdan chiqasizmi? Vaqt to'xtamaydi, javoblaringiz saqlanadi. Kod bilan qaytib davom ettirasiz.", ok => { if(ok) out(); });
    else out();
  };
  if(t.pdf_url){ $("zm").onclick = () => setZoom(-0.25); $("zp").onclick = () => setZoom(0.25); showPdf(t.pdf_url); }
  $("xsend").onclick = () => send(false);
  stopTimer();
  if(left <= 0){ send(true); return; }
  timer = setInterval(() => {
    left--;
    const el = $("tm"); if(el) el.textContent = fmt(left);
    if(left <= 0){ stopTimer(); send(true); }
  }, 1000);
}

function drawGrid(){
  const g = $("xgrid"); g.innerHTML = "";
  D.closed.forEach((a, i) => {
    const row = document.createElement("div"); row.className = "qrow";
    row.innerHTML = `<span class="qn">${i + 1}</span>`;
    for(const c of (i >= 32 ? "abcdef" : "abcd")){
      const b = document.createElement("button"); b.type = "button";
      b.textContent = c.toUpperCase(); b.className = "opt" + (a === c ? " on" : "");
      b.onclick = () => {
        D.closed[i] = D.closed[i] === c ? "" : c; saveDraft();
        row.querySelectorAll(".opt").forEach(x => x.classList.toggle("on", x.textContent.toLowerCase() === D.closed[i]));
      };
      row.appendChild(b);
    }
    g.appendChild(row);
  });
}

function drawOpen(){
  const o = $("xopen"); o.innerHTML = "";
  if(!D.open.length) return;
  o.insertAdjacentHTML("beforeend", `<div class="sec-t">Ochiq savollar (36-${35 + D.open.length})</div>`);
  D.open.forEach((row, qi) => {
    o.insertAdjacentHTML("beforeend", `<div class="ohead"><span>${36 + qi}-savol</span></div>`);
    row.forEach((v, pi) => {
      const r = document.createElement("div"); r.className = "orow";
      r.innerHTML = `<span class="qn">${pi + 1})</span>`;
      const inp = document.createElement("input"); inp.value = v; inp.placeholder = "Javobingiz";
      inp.oninput = () => { D.open[qi][pi] = inp.value; saveDraft(); };
      r.appendChild(inp); o.appendChild(r);
    });
  });
}

function send(auto){
  const t = CUR.test;
  const go2 = async () => {
    if(sending) return;
    sending = true; stopTimer();
    if($("xsend")) $("xsend").disabled = true;
    try{
      const res = await call("/api/tests/submit", {code: t.code, closed: D.closed, open_a: D.open});
      clearDraft(t.code); sending = false; openTest(t.code);
    }catch(e){
      sending = false;
      if(String(e.message).includes("409")){ openTest(t.code); return; }
      if($("xerr")) $("xerr").textContent = "Yuborib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.";
      if($("xsend")) $("xsend").disabled = false;
    }
  };
  const empty = D.closed.filter(x => !x).length;
  if(!auto && empty > 0 && tg.showConfirm)
    tg.showConfirm(empty + " ta yopiq savol belgilanmagan. Baribir yuborasizmi?", ok => { if(ok) go2(); });
  else go2();
}

function renderResult(t, R, keyPdf){
  stopTimer(); showExam();
  const lvl = R.level ? `<span class="lvl">${R.level}</span>` : `<span class="sub">Daraja berilmadi (46 balldan past)</span>`;
  const nm = R.extra === "written" ? "Yozma ish ball" : "Esse ball";
  let top = `<div class="card center"><h2>MS test natijalar</h2><p class="sub">${esc(t.title)} · ${esc(t.subject)}</p>
    <div class="big">${R.score}</div>
    <p class="sub">Test bali (90 dan) · ${R.method === "rasch" ? "Rasch modeli" : "oddiy hisob"}</p>`;
  if(R.extra){
    if(R.extra_ball == null){
      top += `<label style="text-align:left">${nm} (0-75)</label><input id="eball" type="number" inputmode="decimal" placeholder="Masalan: 58"><div class="err" id="eerr"></div><button class="btn" id="ebtn" type="button">Umumiy ballni hisoblash</button>`;
    }else{
      top += `<div class="kv"><span>${nm}</span><span>${R.extra_ball}</span></div><p class="sub">(${R.extra_ball} + ${R.score}) / 2 = ${R.final}</p><div style="margin-top:8px">${lvl}</div>`;
    }
  }else top += `<div style="margin-top:8px">${lvl}</div>`;
  if(R.method !== "rasch") top += `<p class="sub" style="margin-top:12px">Ball hozircha oddiy hisoblangan. Testda 30 ta ishtirokchi to'planganda Rasch modeli ishga tushadi va ballingiz yangilanishi mumkin.</p>`;
  top += "</div>";

  let rows = `<div class="rrow h"><span>№</span><span>Sizniki</span><span>To'g'ri</span></div>`, idx = 0;
  R.key.closed.forEach((c, i) => {
    const ok = R.ok[idx++], my = ((R.my.closed[i] || "-") + "").toUpperCase();
    rows += `<div class="rrow"><span>${i + 1}</span><span class="${ok ? "good" : "bad"}">${ok ? "✔" : "✖"} ${esc(my)}</span><span>${c.toUpperCase()}</span></div>`;
  });
  R.key.open.forEach((parts, qi) => parts.forEach((p, pi) => {
    const ok = R.ok[idx++], my = (R.my.open[qi] && R.my.open[qi][pi]) || "-";
    rows += `<div class="rrow"><span>${36 + qi}.${pi + 1}</span><span class="${ok ? "good" : "bad"}">${ok ? "✔" : "✖"} ${esc(my)}</span><span>${esc(p)}</span></div>`;
  }));
  const keyBtn = keyPdf ? `<button class="btn yel" id="xkey" type="button">✅ Yechimlar PDF</button>` : "";
  box(top + keyBtn + `<div class="card"><h2>To'g'ri javoblar</h2>${rows}</div><button class="btn sec" id="xb" type="button">Testlar ro'yxatiga qaytish</button>`);
  $("xb").onclick = () => go("tests");
  if($("xkey")) $("xkey").onclick = () => { if(tg.openLink) tg.openLink(keyPdf); else window.open(keyPdf, "_blank"); };
  if($("ebtn")) $("ebtn").onclick = async () => {
    const v = parseFloat($("eball").value);
    if(!(v >= 0 && v <= 75)){ $("eerr").textContent = "0 dan 75 gacha son kiriting"; return; }
    try{ const r = await call("/api/tests/essay", {code: t.code, ball: v}); renderResult(t, r.result, keyPdf); }
    catch(e){ $("eerr").textContent = "Xatolik. Qayta urinib ko'ring."; }
  };
}
})();
