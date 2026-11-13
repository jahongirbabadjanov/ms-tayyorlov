(function(){
const css = `
.timer{position:sticky;top:0;z-index:5;background:var(--card2);border:1.5px solid var(--line2);border-radius:14px;padding:10px 14px;display:flex;justify-content:space-between;margin-bottom:12px;font-weight:700}
.big{font-size:44px;font-weight:800;text-align:center;color:var(--violet);margin:6px 0}
.lvl{display:inline-block;padding:6px 18px;border-radius:99px;background:var(--violet);color:#fff;font-weight:800;font-size:22px}
.rrow{display:grid;grid-template-columns:48px 1fr 1fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--line);font-size:14px}
.rrow.h{color:var(--muted);font-size:12px}
.good{color:var(--mint)}.bad{color:var(--danger)}
.center{text-align:center}
.zb{display:flex;gap:10px;align-items:center;margin-bottom:8px}
.zb button{width:42px;height:36px;border-radius:10px;border:1.5px solid var(--line2);background:var(--card2);color:var(--text);font-size:20px}
.ibtn{width:44px;height:44px;flex:none;border-radius:14px;border:1.5px solid var(--line2);background:var(--ibg,#2b3770);color:var(--ifg,#cfd9ff);display:grid;place-items:center;padding:0}
.timer{align-items:center}
.rh{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.rh b{display:block;font-size:17px;line-height:1.25}.rh small{display:block;margin-top:2px;color:var(--muted);font-size:13px}
.rcd{background:var(--card);border:1.5px solid var(--line);border-radius:28px;padding:20px;box-shadow:0 10px 28px rgba(36,64,214,.08);margin-bottom:14px}
.rtop{display:flex;align-items:center;gap:16px}
.rbadge{width:84px;height:84px;flex:none;border-radius:24px;background:#0f1a4d;color:#ffc629;font-size:36px;font-weight:800;display:grid;place-items:center}
.rmid{min-width:0}.rball b{font-size:40px;font-weight:800;line-height:1.05}.rball span{margin-left:6px;font-size:16px;font-weight:700;color:var(--muted)}
.rsub{margin-top:2px;font-size:14px;font-weight:600;color:var(--muted)}
.rbar{height:10px;border-radius:99px;background:var(--soft);overflow:hidden;margin:14px 0}.rbar i{display:block;height:100%;border-radius:99px;background:var(--violet)}
.rgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}
.rchip{border-radius:16px;padding:12px 10px;background:var(--bg);border:1.5px solid var(--line)}.rchip b{display:block;font-size:18px;font-weight:800}.rchip small{display:block;margin-top:2px;font-size:12px;font-weight:600;color:var(--muted)}
.rline{margin-top:12px;font-size:13px;font-weight:600;color:var(--muted)}
.rhint{margin-top:12px;border-radius:16px;padding:12px 14px;background:#fff1cc;color:#6f4700;font-size:14px;font-weight:700;line-height:1.4}
.rnote{margin-top:12px;font-size:12px;font-weight:500;color:var(--muted);line-height:1.45}
.rtiles{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.rtile{border-radius:20px;border:1.5px solid var(--line);background:var(--card);padding:14px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;text-align:left;color:var(--text);font:inherit;cursor:pointer}
.rtile b{font-size:16px}.rtile small{margin-top:-6px;font-size:12px;color:var(--muted)}
.rti{width:44px;height:44px;border-radius:14px;background:var(--soft);color:var(--violet);display:grid;place-items:center}
.qlg{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;font-size:14px;font-weight:600;margin-bottom:12px}
.qlg span{display:flex;align-items:center;gap:8px}.qlg i{width:18px;height:18px;border-radius:6px;border:1.5px solid;display:inline-block}
.qg{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;padding:6px;margin-bottom:12px}
.qc{height:46px;border-radius:12px;border:1.5px solid;font:700 16px system-ui,sans-serif;cursor:pointer;padding:0}
.qc.ok,.qlg i.ok{background:#dff5e8;color:#14703d;border-color:#22b866}
.qc.bad,.qlg i.bad{background:#fde4e5;color:#b3262b;border-color:#e5484d}
.qc.part,.qlg i.part{background:#fff1cc;color:#8a5a00;border-color:#f5a524}
.qc.none,.qlg i.none{background:#eef0f8;color:#5b6385;border-color:#c9cfe3}
.qc.sel{box-shadow:0 0 0 2px var(--bg),0 0 0 5px #ffc629}
.qd{border-radius:22px;padding:18px;background:var(--card);border:1.5px solid var(--line);box-shadow:0 10px 28px rgba(36,64,214,.08);margin-bottom:12px}
.qd .qh{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.qd .qh b{font-size:20px}
.qd .qb{padding:5px 12px;border-radius:10px;font-size:13px;font-weight:700}
.qd .qr{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:34px;font-size:15px}.qd .qr span{color:var(--muted);font-weight:500}.qd .qr strong{font-size:18px;font-weight:800}
.qd .qr strong.g{color:#14703d}.qd .qr strong.r{color:#b3262b}
.qbtn{display:flex;gap:10px;margin-top:12px}.qbtn button{flex:1;height:52px;border:0;border-radius:14px;font:700 15px system-ui,sans-serif;cursor:pointer}
.qbtn .p{background:var(--violet);color:#fff}.qbtn .s{background:var(--soft);color:var(--violet)}
.pdfbox{position:relative;height:70vh;overflow:auto;background:var(--soft);border-radius:12px;padding:4px;-webkit-overflow-scrolling:touch}
`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
$("app").insertAdjacentHTML("beforeend", '<section id="v-exam" class="hidden"></section>');

let timer = null, CUR = null, D = null, sending = false, PREV = "tests", RT = false, LASTKEY = "";
const BACK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const stopTimer = () => { if(timer){ clearInterval(timer); timer = null; } };
const dk = c => (RT ? "rdraft_" : "draft_") + c;
const saveDraft = () => { try{ localStorage.setItem(dk(CUR.test.code), JSON.stringify(D)); }catch(e){} };
const loadDraft = c => { try{ return JSON.parse(localStorage.getItem(dk(c))); }catch(e){ return null; } };
const clearDraft = c => { try{ localStorage.removeItem(dk(c)); }catch(e){} };
const fmt = s => { s = Math.max(0, s); return [Math.floor(s/3600), Math.floor(s%3600/60), s%60].map(v => String(v).padStart(2, "0")).join(":"); };
const box = html => {
  $("v-exam").innerHTML = (html.includes('id="xback"') ? "" : '<button id="xtop" type="button" class="ibtn" aria-label="Orqaga" style="margin-bottom:10px">' + BACK + '</button>') + html;
  const tb = $("xtop");
  if(tb) tb.onclick = () => { stopTimer(); go(PREV); };
};
let pdfDoc = null, zoom = 1, drawId = 0, goPage = 0;
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
    if(goPage && i === goPage){ wrap.scrollTop = Math.max(0, cv.offsetTop - 4); goPage = 0; }
  }
  updPg();
}
function curPage(){
  const wrap = $("xpages");
  if(!wrap) return 1;
  let p = 1;
  wrap.querySelectorAll("canvas").forEach((c, i) => { if(c.offsetTop <= wrap.scrollTop + 30) p = i + 1; });
  return p;
}
function updPg(){
  const el = $("xpg");
  if(el && pdfDoc) el.textContent = curPage() + " / " + pdfDoc.numPages;
}
function pageTo(p){
  const wrap = $("xpages");
  if(!wrap) return;
  const cs = wrap.querySelectorAll("canvas");
  if(!cs.length) return;
  p = Math.max(1, Math.min(cs.length, p));
  wrap.scrollTop = Math.max(0, cs[p - 1].offsetTop - 4);
  updPg();
}
async function findPage(doc, n){
  const re = new RegExp("(^|\\s)" + n + "\\s*[.)]\\s");
  for(let i = 1; i <= doc.numPages; i++){
    const pg = await doc.getPage(i), tc = await pg.getTextContent();
    if(re.test(tc.items.map(x => x.str).join(" "))) return i;
  }
  return 0;
}
function setZoom(d){
  zoom = Math.min(3, Math.max(0.5, zoom + d));
  $("zv").textContent = Math.round(zoom * 100) + "%";
  goPage = curPage();
  const wrap = $("xpages"); if(wrap) wrap.innerHTML = "";
  drawPdf();
}
function showExam(){
  const cur = ["tests","answer","create","profile"].find(x => !$("v-" + x).classList.contains("hidden"));
  if(cur) PREV = cur;
  ["tests","answer","create","profile"].forEach(x => $("v-" + x).classList.add("hidden"));
  $("v-exam").classList.remove("hidden");
  window.scrollTo(0, 0);
}

const _go = window.go;
window.go = v => { stopTimer(); $("v-exam").classList.add("hidden"); _go(v); };

function toast(m){
  const d = document.createElement("div");
  d.textContent = m;
  d.style.cssText = "position:fixed;left:16px;right:16px;bottom:96px;z-index:99;padding:13px 16px;border-radius:14px;background:#0f1b4d;border:1.5px solid #ffc629;color:#fff;font-size:14px;font-weight:600;text-align:center";
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 2800);
}
$("tlist").addEventListener("click", e => {
  const a = e.target.closest("a.pdfdl");
  if(a && a.dataset.lock){ e.preventDefault(); toast("Savollarni yuklab olish uchun avval testni sotib oling."); return; }
  if(a){ e.preventDefault(); if(tg.openLink) tg.openLink(a.href); else window.open(a.href, "_blank"); return; }
  const c = e.target.closest(".t");
  if(c && c.dataset.code) openTest(c.dataset.code);
});
$("codego").onclick = () => { const c = $("codein").value.trim(); if(c) openTest(c); };

async function openTest(code){
  RT = false;
  showExam();
  box('<div class="card"><p class="sub" style="margin:0">Yuklanmoqda...</p></div>');
  try{
    const r = await call("/api/tests/get", {code});
    const fresh = !!(CUR && CUR.state === "started");
    CUR = r;
    if(r.state === "new"){
      try{ const m = await call("/api/me", {}); ME = m.user; }catch(e){}
      renderNew(r);
    }else if(r.state === "started") renderSheet(r);
    else if(fresh && r.result.extra && r.result.extra_ball == null) renderEssay(r.test, r.result, r.key_pdf_url);
    else renderResult(r.test, r.result, r.key_pdf_url);
  }catch(e){
    box('<div class="card"><p class="sub">Test topilmadi yoki xatolik chiqdi.</p><button class="btn sec" id="xb" type="button">Orqaga</button></div>');
    $("xb").onclick = () => go(PREV);
  }
}
  
function renderNew(r){
  const t = r.test, price = t.price || 0, bal = (ME && ME.balance) || 0, low = price > bal;
  const st = t.starts_at ? Date.parse(t.starts_at) : 0, en = t.ends_at ? Date.parse(t.ends_at) : 0, nowT = Date.now();
  const fm = x => new Date(x).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit"});
  const early = st && nowT < st, late = en && nowT > en, closedNow = early || late;
  const note = early ? `<p class="err" id="wn" style="color:#b7791f"></p>` : late ? `<p class="err">Test vaqti tugagan (${fm(en)}).</p>` : (en ? `<p class="sub">Tugash vaqti: ${fm(en)}</p>` : "");
  box(`<div class="card"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div><h2>${esc(t.title)}</h2><p class="sub">${esc(t.subject)}</p></div>${early ? '<span class="tag wait" id="cd"></span>' : ""}</div>
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
  $("xb").onclick = () => go(PREV);
  if(early){
    const cd = $("cd"), wn = $("wn");
    const p2 = n => String(n).padStart(2, "0");
    const tick = () => {
      if(!cd.isConnected){ clearInterval(iv); return; }
      const s = Math.max(0, Math.ceil((st - Date.now()) / 1000));
      if(s <= 0){ clearInterval(iv); renderNew(r); return; }
      const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      cd.textContent = "⏰ " + (d ? d + " kun " : "") + p2(h) + ":" + p2(m) + ":" + p2(s % 60);
      wn.textContent = "Test hali boshlanmadi. Boshlanishiga " + (d ? d + " kun " : "") + (h ? h + " soat " : "") + m + " daqiqa qoldi";
    };
    const iv = setInterval(tick, 1000);
    tick();
  }
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
  box(`<div class="timer"><button id="xback" type="button" class="ibtn" aria-label="Orqaga" style="margin-right:10px">${BACK}</button><span style="flex:1">${esc(t.title)}</span><span id="tm">${fmt(left)}</span></div>
    ${t.pdf_url ? `<div class="card"><div class="zb"><button id="zm" type="button">−</button><span id="zv">100%</span><button id="zp" type="button">+</button></div><div class="pdfbox" id="xpages"><p class="sub">PDF yuklanmoqda...</p></div></div>` : ""}
    <div class="card"><div class="phd"><b>Javob varaqasi</b><span id="xpc"></span></div><div class="pbar"><i id="xpf"></i></div>
    <div class="pchips"><button type="button" class="pch" data-t="xgrid">Yopiq 1-35 <em id="xc1"></em></button>${t.open_parts.length ? `<button type="button" class="pch" data-t="xopen">Ochiq 36-${35 + t.open_parts.length} <em id="xc2"></em></button>` : ""}</div></div>
    <div class="card"><div class="sec-t" style="margin-top:0">Yopiq savollar (1-35)</div><div id="xgrid"></div>
    <div id="xopen"></div>
    ${t.written ? `<div class="note">📝 Yozma ishlar (${t.written} ta) qog'ozda bajariladi, bu yerda javob kiritilmaydi.</div>` : ""}
    <div class="err" id="xerr"></div></div>
    <button class="btn" id="xsend" type="button" style="position:sticky;bottom:88px;z-index:5;box-shadow:0 8px 24px rgba(36,64,214,.3)">Yakunlash va yuborish</button>`);
  if(!document.getElementById("xsheet-css")) document.head.insertAdjacentHTML("beforeend", "<style id=\"xsheet-css\">.phd{display:flex;align-items:center;justify-content:space-between;font-size:16px}.phd span{font-size:14px;font-weight:700;color:var(--muted)}.pbar{height:10px;border-radius:99px;background:var(--soft);overflow:hidden;margin:10px 0 12px}.pbar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#2440d6,#4a63f0);transition:width .25s}.pchips{display:flex;gap:8px;flex-wrap:wrap}.pch{border:1.5px solid var(--line2);background:#fff;color:var(--text);border-radius:99px;padding:8px 14px;font:700 13px system-ui,sans-serif;cursor:pointer}.pch em{font-style:normal;margin-left:4px;color:var(--violet)}.qn.dn{color:var(--violet);font-weight:800}</style>");
  drawGrid(); drawOpen(); updateProg();
  document.querySelectorAll(".pch").forEach(b => { b.onclick = () => { const e = $(b.dataset.t); if(e) e.scrollIntoView({behavior: "smooth", block: "start"}); }; });
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

function updateProg(){
  const T = 35 + D.open.reduce((p, r) => p + r.length, 0);
  const c1 = D.closed.filter(x => x).length;
  const c2 = D.open.reduce((p, r) => p + r.filter(x => String(x).trim()).length, 0);
  const n = c1 + c2, set = (id, v) => { const e = $(id); if(e) e.textContent = v; };
  set("xpc", n + "/" + T + " javob");
  set("xc1", c1 + "/35");
  set("xc2", c2 + "/" + (T - 35));
  set("xsend", "Yakunlash va yuborish (" + n + "/" + T + ")");
  const f = $("xpf"); if(f) f.style.width = (n / T * 100) + "%";
}

function drawGrid(){
  const g = $("xgrid"); g.innerHTML = "";
  D.closed.forEach((a, i) => {
    const row = document.createElement("div"); row.className = "qrow";
    row.innerHTML = `<span class="qn${a ? " dn" : ""}">${i + 1}</span>`;
    for(const c of (i >= 32 ? "abcdef" : "abcd")){
      const b = document.createElement("button"); b.type = "button";
      b.textContent = c.toUpperCase(); b.className = "opt" + (a === c ? " on" : "");
      b.onclick = () => {
        D.closed[i] = D.closed[i] === c ? "" : c; saveDraft(); updateProg();
        row.firstChild.classList.toggle("dn", !!D.closed[i]);
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
      inp.oninput = () => { D.open[qi][pi] = inp.value; saveDraft(); updateProg(); };
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
      const res = await call(RT ? "/api/tests/retake_submit" : "/api/tests/submit", {code: t.code, closed: D.closed, open_a: D.open});
      clearDraft(t.code); sending = false;
      if(RT){ RT = false; renderResult(t, res.result, LASTKEY); } else openTest(t.code);
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

async function renderPdfView(t, R, keyPdf, kind, q){
  const url = kind === "k" ? keyPdf : t.pdf_url;
  if(!url){ toast(kind === "k" ? "Yechimlar PDF hali yuklanmagan." : "Savollar PDF yuklanmagan."); return; }
  stopTimer(); showExam();
  zoom = 1; pdfDoc = null; goPage = 0;
  const ttl = (q ? q + "-savol · " : "") + (kind === "k" ? "Yechimlar PDF" : "Savollar PDF");
  const bs = "flex:1;height:50px;border-radius:14px;font:700 15px system-ui,sans-serif;cursor:pointer;";
  const zb = "width:44px;height:44px;border-radius:12px;border:1.5px solid var(--line2);background:#fff;color:var(--text);font:700 20px system-ui,sans-serif;cursor:pointer;padding:0";
  box(`<div class="rh"><button id="xback" type="button" class="ibtn" aria-label="Orqaga">${BACK}</button><div style="flex:1;min-width:0"><b>${esc(ttl)}</b><small>${esc(t.subject)} · ${esc(t.title)}</small></div><span id="xpg" style="font-size:14px;font-weight:700;color:var(--muted)"></span></div>` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px"><button id="xpv" type="button" aria-label="Oldingi sahifa" style="${zb}">‹</button><button id="zm" type="button" aria-label="Kichraytirish" style="${zb}">−</button><span id="zv" style="min-width:56px;text-align:center;font-size:15px;font-weight:700">100%</span><button id="zp" type="button" aria-label="Kattalashtirish" style="${zb}">+</button><button id="xnx" type="button" aria-label="Keyingi sahifa" style="${zb}">›</button></div>` +
    `<div class="pdfbox" id="xpages" style="height:52vh"><p class="sub">PDF yuklanmoqda...</p></div>` +
    `<div style="display:flex;gap:10px;margin-top:12px"><button id="xa" type="button" style="${bs}border:0;background:#2440d6;color:#fff">${kind === "k" ? "Savolni ko'rish" : "Yechimini ko'rish"}</button><button id="xb2" type="button" style="${bs}border:0;background:#ffc629;color:#0f1a4d">${kind === "k" ? "Barcha savollar" : "Barcha yechimlar"}</button></div>` +
    `<div style="display:flex;gap:10px;margin-top:10px"><button id="xdl" type="button" style="${bs}border:1.5px solid var(--line2);background:#fff;color:var(--text)">Yuklab olish</button><button id="xbot" type="button" style="${bs}border:1.5px solid var(--line2);background:#fff;color:var(--text)">Botga yuborish</button></div>`);
  const other = kind === "k" ? "q" : "k";
  $("xback").onclick = () => renderSolutions(t, R, keyPdf, q || 0);
  $("zm").onclick = () => setZoom(-0.25);
  $("zp").onclick = () => setZoom(0.25);
  $("xpv").onclick = () => pageTo(curPage() - 1);
  $("xnx").onclick = () => pageTo(curPage() + 1);
  $("xa").onclick = () => renderPdfView(t, R, keyPdf, other, q);
  $("xb2").onclick = () => renderPdfView(t, R, keyPdf, other, 0);
  $("xdl").onclick = () => { if(tg.openLink) tg.openLink(url); else window.open(url, "_blank"); };
  $("xbot").onclick = async () => {
    $("xbot").disabled = true;
    try{ await call("/api/tests/pdf_send", {code: t.code, kind}); toast("PDF botga yuborildi ✅"); }
    catch(e){ toast("Yuborib bo'lmadi. Qayta urinib ko'ring."); }
    $("xbot").disabled = false;
  };
  $("xpages").onscroll = updPg;
  try{
    await loadPdfJs();
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    if(q){
      const f = await findPage(pdfDoc, q);
      if(f) goPage = f; else toast("Savol avtomatik topilmadi. ‹ › tugmalari bilan sahifani tanlang.");
    }
    updPg();
    drawPdf();
  }catch(e){
    const w = $("xpages");
    if(w) w.innerHTML = '<p class="sub">PDF ochilmadi. <a href="' + esc(url) + '" target="_blank">Yuklab olish</a></p>';
  }
}

function renderSolutions(t, R, keyPdf, sel){
  const qs = R.qs || [];
  const cnt = {ok: 0, bad: 0, part: 0, none: 0};
  qs.forEach(x => { cnt[x]++; });
  if(!sel){ const f = qs.findIndex(x => x !== "ok"); sel = f < 0 ? 1 : f + 1; }
  const names = {ok: "To'g'ri", bad: "Xato", part: "Qisman", none: "Javobsiz"};
  const grid = () => qs.map((x, i) => `<button class="qc ${x}${i + 1 === sel ? " sel" : ""}" type="button" data-n="${i + 1}">${i + 1}</button>`).join("");
  const card = () => {
    const st = qs[sel - 1], nC = R.key.closed.length;
    let rows = "";
    const ro = (l, v, cls) => `<div class="qr"><span>${l}</span>${v ? `<strong class="${cls}">${esc(v)}</strong>` : '<em style="font-style:normal;padding:5px 12px;border-radius:10px;background:#eef0f8;color:#5b6385;font-size:14px;font-weight:600">javobsiz</em>'}</div>`;
    if(sel <= nC){
      const mine = ((R.my.closed[sel - 1] || "") + "").toUpperCase(), right = R.key.closed[sel - 1].toUpperCase();
      rows = ro("Sizning javobingiz", mine, st === "ok" ? "g" : "r") + ro("To'g'ri javob", right, "");
    }else{
      const qi = sel - nC - 1, parts = R.key.open[qi], my = R.my.open[qi] || [];
      parts.forEach((p, pi) => {
        const l = "abcdef"[pi] + ")", m = (my[pi] || "").trim();
        rows += ro(l + " sizniki", m, norm(m) === norm(p) ? "g" : "r") + ro(l + " to'g'ri", p, "");
      });
    }
    const bc = {ok: "background:#dff5e8;color:#14703d", bad: "background:#fde4e5;color:#b3262b", part: "background:#fff1cc;color:#8a5a00", none: "background:#eef0f8;color:#5b6385"}[st];
    return `<div class="qh"><b>${sel}-savol</b><span class="qb" style="${bc}">${names[st]}</span></div>${rows}`;
  };
  const norm = x => String(x).trim().toLowerCase().replace(/ /g, "").replace(/,/g, ".");
  box(`<div class="rh"><button id="xback" type="button" class="ibtn" aria-label="Orqaga">${BACK}</button><div><b>${esc(t.subject)} · ${esc(t.title)}</b><small>Yechimlar · ${qs.length} ta savol</small></div></div>` +
    `<div class="qlg"><span><i class="ok"></i>to'g'ri · ${cnt.ok}</span><span><i class="bad"></i>xato · ${cnt.bad}</span><span><i class="part"></i>qisman · ${cnt.part}</span><span><i class="none"></i>javobsiz · ${cnt.none}</span></div>` +
    `<p class="sub">Savolni bosing: javob va yechim chiqadi</p><div class="qg" id="xg">${grid()}</div>` +
    `<div class="qd" id="xc">${card()}<div class="qbtn"><button class="p" id="xsolv" type="button">Yechimini ko'rish</button><button class="s" id="xq" type="button">Savolni ko'rish</button></div></div>` +
    `<div class="qbtn" style="margin-top:0"><button class="p" id="xall" type="button" style="background:#ffc629;color:#0f1a4d">Barcha yechimlar</button><button class="s" id="xre" type="button" style="background:#fff;color:#0f1a4d;border:1.5px solid #0f1a4d">Qayta ishlash</button></div>`);
  $("xback").onclick = () => renderResult(t, R, keyPdf);
  $("xg").onclick = e => {
    const b = e.target.closest(".qc"); if(!b) return;
    sel = +b.dataset.n;
    $("xg").innerHTML = grid();
    const c = $("xc"), bt = c.querySelector(".qbtn");
    c.innerHTML = card(); c.appendChild(bt);
  };
  $("xsolv").onclick = () => renderPdfView(t, R, keyPdf, "k", sel);
  $("xall").onclick = () => renderPdfView(t, R, keyPdf, "k", 0);
  $("xq").onclick = () => renderPdfView(t, R, keyPdf, "q", sel);
  $("xre").onclick = () => startRetake(t, keyPdf);
}

function renderResult(t, R, keyPdf){
  stopTimer(); showExam();
  LASTKEY = keyPdf;
  const cm = x => String(x).replace(".", ",");
  const nm = R.lang ? "Yozma ish bahosi (0-24)" : R.extra === "written" ? "Yozma ish ball (0-75)" : "Esse ball (0-75)";
  const tm = R.elapsed == null ? "—" : fmt(R.elapsed);
  const waitE = R.extra && R.extra_ball == null;
  const shown = R.pending ? null : (R.final != null ? R.final : R.test_ball);
  const closedOk = (R.ok || []).slice(0, 35).reduce((x, y) => x + y, 0);
  const openOk = R.raw - closedOk, openAll = R.total - 35;
  const chip = (v, l) => `<div class="rchip"><b>${v}</b><small>${l}</small></div>`;
  const badge = R.level || (R.pending || waitE ? "…" : "—");
  const S2 = 'width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const tile = (id, p, a, b) => `<button class="rtile" id="${id}" type="button"><span class="rti"><svg ${S2}>${p}</svg></span><b>${a}</b><small>${b}</small></button>`;
  let card = `<div class="rcd"><div class="rtop"><div class="rbadge">${badge}</div><div class="rmid">`;
  if(R.pending) card += `<div class="rball"><b>${R.raw}/${R.total}</b></div><div class="rsub">Ball hisoblanmoqda</div>`;
  else card += `<div class="rball"><b>${cm(shown)}</b><span>/ 75 ball</span></div><div class="rsub">${esc(t.subject)}</div>`;
  card += `</div></div>`;
  if(!R.pending) card += `<div class="rbar"><i style="width:${Math.min(100, shown / 75 * 100)}%"></i></div>`;
  card += `<div class="rgrid">` + chip(R.raw + " / " + R.total, "to'g'ri javoblar") + chip(R.pct != null ? cm(R.pct) + "%" : "—", "foiz") + chip(R.rank ? R.rank + "-o'rin" : "—", R.rank ? R.of + " kishidan" : "o'rin") + chip(tm, "sarflangan vaqt") + `</div>`;
  card += `<div class="rline">Yopiq ${closedOk}/35 · Ochiq ${openOk}/${openAll}</div>`;
  if(R.pending){
    card += `<div class="rhint">Ball Rasch modeli bo'yicha kamida ${R.min_n} ishtirokchi to'planganda chiqadi (hozir ${R.participants} ta). To'g'ri javoblar soni darrov ko'rinadi.</div>`;
    if(R.extra && R.extra_ball != null) card += `<div class="rline">${nm.split(" (")[0]}: ${R.lang && R.essay_raw != null ? cm(R.essay_raw) + " → " + cm(R.extra_ball) : cm(R.extra_ball)} (kiritildi). Umumiy ball test balli hisoblangach chiqadi.</div>`;
  }
  if(waitE) card += `<div class="rhint">Yozma ish bali hali kiritilmagan. Umumiy ball shundan keyin chiqadi.</div><button class="btn" id="eopen" type="button">Yozma ish ballini kiritish</button>`;
  if(!R.pending){
    if(waitE){
    }else if(R.extra){
      card += `<div class="rline">${nm.split(" (")[0]}: ${R.lang && R.essay_raw != null ? cm(R.essay_raw) + " → " + cm(R.extra_ball) : cm(R.extra_ball)} · (${cm(R.extra_ball)} + ${cm(R.test_ball)}) / 2 = ${cm(R.final)}</div>`;
    }
    if(R.next && R.next.need != null) card += `<div class="rhint">${R.next.level} daraja uchun yana ${R.next.need} ta to'g'ri javob kerak</div>`;
    if(R.otm) card += `<div class="rline">OTM bali: 1-fan ${cm(R.otm.b1)} · 2-fan ${cm(R.otm.b2)}</div>`;
    if(!R.retake) card += `<div class="rnote">Ball Rasch modeli bo'yicha, shu testni birinchi marta ishlagan ${R.participants} ishtirokchi natijasiga ko'ra hisoblanadi va ishtirokchilar qo'shilgani sari yangilanadi.</div>`;
  }
  card += `</div>`;
  const tiles = R.retake ? (`<div class="rtiles">` + tile("xt-sol", '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>', "Yechimlar", "Savollar katagi") + tile("xt-off", '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', "Rasmiy natija", "Asosiy natijaga qaytish") + `</div>`) : `<div class="rtiles">` +
    tile("xt-cert", '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/>', "Sertifikat", "Ma'lumotlar va rasm") +
    tile("xt-sol", '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>', "Yechimlar", "Savollar katagi") +
    tile("xt-an", '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>', "Natija tahlili", "Statistika") +
    tile("xt-all", '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>', "Umumiy natijalar", "Reyting jadvali") + `</div>`;
  const keyBtn = keyPdf ? `<button class="btn yel" id="xkey" type="button" style="margin-top:0;margin-bottom:14px">Yechimlar PDF</button>` : "";
  box(`<div class="rh"><button id="xback" type="button" class="ibtn" aria-label="Orqaga">${BACK}</button><div><b>${esc(t.subject)} · ${esc(t.title)}</b><small>Natija</small></div></div>` +
    (R.retake ? `<div class="rhint" style="margin-top:0;margin-bottom:14px">Qayta ishlash natijasi. Rasmiy ballingiz, reyting va sertifikatga ta'sir qilmaydi.</div>` : "") + card + tiles + keyBtn +
    `<button class="btn sec" id="xre2" type="button" style="margin-top:0;margin-bottom:10px">Qayta ishlash</button>` +
    (R.retake ? "" : `<button class="btn" id="xshare" type="button" style="background:#0f1a4d;color:#fff;box-shadow:none">Ulashish</button>`));
  $("xback").onclick = () => { if(R.retake) openTest(t.code); else go(PREV); };
  $("xre2").onclick = () => startRetake(t, keyPdf);
  if($("xt-off")) $("xt-off").onclick = () => openTest(t.code);
  if($("xt-cert")) $("xt-cert").onclick = () => {
    if(R.pending || !R.level){ toast(R.pending ? "Ball hisoblangach sertifikat olish mumkin bo'ladi." : "Sertifikat daraja (C dan yuqori) olganlar uchun beriladi."); return; }
    renderCert(t, R, keyPdf);
  };
  if($("xt-an")) $("xt-an").onclick = () => toast("Natija tahlili tez orada qo'shiladi.");
  if($("xt-all")) $("xt-all").onclick = () => toast("Umumiy natijalar tez orada qo'shiladi.");
  $("xt-sol").onclick = () => renderSolutions(t, R, keyPdf, 0);
  if($("xshare")) $("xshare").onclick = async () => {
    try{
      const w = await call("/api/wallet", {});
      const txt = R.pending ? `MS Tayyorlov: ${t.subject} testida ${R.raw}/${R.total} to'g'ri javob berdim!` : `MS Tayyorlov: ${t.subject} testidan ${cm(shown)} ball${R.level ? " (" + R.level + ")" : ""} oldim!`;
      const u = "https://t.me/share/url?url=" + encodeURIComponent(w.ref_link) + "&text=" + encodeURIComponent(txt);
      if(tg.openTelegramLink) tg.openTelegramLink(u); else window.open(u, "_blank");
    }catch(e){ toast("Ulashib bo'lmadi. Qayta urinib ko'ring."); }
  };
  if($("xkey")) $("xkey").onclick = () => renderPdfView(t, R, keyPdf, "k", 0);
  if($("eopen")) $("eopen").onclick = () => renderEssay(t, R, keyPdf);
}
async function renderCert(t, R, keyPdf){
  stopTimer(); showExam();
  let m = ME || {};
  if(!m.first_name){ try{ const r = await call("/api/me", {}); m = r.user || {}; ME = m; }catch(e){} }
  const cm = x => String(x).replace(".", ",");
  let photo = "";
  try{ photo = localStorage.getItem("cert_photo") || ""; }catch(e){}
  const fs = "width:100%;height:50px;border-radius:14px;border:1.5px solid var(--line2);background:#fff;color:var(--text);padding:0 14px;font:600 16px system-ui,sans-serif;box-sizing:border-box";
  const lb = "display:block;margin:12px 0 6px;font-size:13px;font-weight:700;color:var(--muted)";
  box(`<div class="rh"><button id="xback" type="button" class="ibtn" aria-label="Orqaga">${BACK}</button><div><b>Sertifikat</b><small>${esc(t.subject)} · ${esc(t.title)}</small></div></div>` +
    `<div class="rcd"><div class="rtop"><div class="rbadge">${esc(R.level)}</div><div class="rmid"><div class="rball"><b>${cm(R.final)}</b><span>/ 75</span></div><div class="rsub">${R.pct != null ? cm(R.pct) + "%" : ""}</div></div></div></div>` +
    `<label style="${lb}">Familiya</label><input id="cl" type="text" value="${esc(m.last_name || "")}" style="${fs}">` +
    `<label style="${lb}">Ism</label><input id="cf" type="text" value="${esc(m.first_name || "")}" style="${fs}">` +
    `<label style="${lb}">Otasining ismi</label><input id="cm" type="text" value="${esc(m.middle_name || "")}" style="${fs}">` +
    `<label style="${lb}">Rasm (ixtiyoriy)</label>` +
    `<div style="display:flex;align-items:center;gap:12px"><div id="cpv" style="width:75px;height:100px;flex:none;border-radius:12px;border:1.5px dashed var(--line2);background:var(--soft);background-size:cover;background-position:center"></div>` +
    `<div style="flex:1"><button id="cpick" type="button" style="width:100%;height:50px;border-radius:14px;border:1.5px solid var(--line2);background:#fff;color:var(--text);font:700 15px system-ui,sans-serif;cursor:pointer">Rasm tanlash</button><button id="cdel" type="button" style="width:100%;margin-top:8px;height:40px;border:0;background:none;color:var(--muted);font:600 14px system-ui,sans-serif;cursor:pointer">Rasmni olib tashlash</button></div></div>` +
    `<input id="cfile" type="file" accept="image/*" style="display:none">` +
    `<div class="err" id="cerr" style="margin-top:10px"></div>` +
    `<button class="btn yel" id="cget" type="button" style="margin-top:14px">Sertifikatni olish</button>` +
    `<div class="rnote">Sertifikat PDF ko'rinishida bot orqali yuboriladi. Bu MS Tayyorlov platformasidagi sinov testi natijasi, rasmiy Milliy sertifikat emas.</div>`);
  const show = () => { $("cpv").style.backgroundImage = photo ? "url(" + photo + ")" : "none"; };
  show();
  $("xback").onclick = () => renderResult(t, R, keyPdf);
  $("cpick").onclick = () => $("cfile").click();
  $("cdel").onclick = () => { photo = ""; try{ localStorage.removeItem("cert_photo"); }catch(e){} show(); };
  $("cfile").onchange = () => {
    const f = $("cfile").files[0];
    if(!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      const im = new Image();
      im.onload = () => {
        const k = Math.min(1, 700 / Math.max(im.width, im.height));
        const cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(im.width * k)); cv.height = Math.max(1, Math.round(im.height * k));
        const cx = cv.getContext("2d");
        cx.drawImage(im, 0, 0, cv.width, cv.height);
        cx.globalCompositeOperation = "destination-over";
        cx.fillStyle = "#ffffff"; cx.fillRect(0, 0, cv.width, cv.height);
        photo = cv.toDataURL("image/jpeg", 0.85);
        try{ localStorage.setItem("cert_photo", photo); }catch(e){}
        show();
      };
      im.onerror = () => { $("cerr").textContent = "Rasmni o'qib bo'lmadi. Boshqa rasm tanlang."; };
      im.src = rd.result;
    };
    rd.readAsDataURL(f);
  };
  $("cget").onclick = async () => {
    const a = $("cl").value.trim(), b = $("cf").value.trim(), c2 = $("cm").value.trim();
    if(!a || !b){ $("cerr").textContent = "Familiya va ismni kiriting."; return; }
    $("cerr").textContent = "";
    $("cget").disabled = true; $("cget").textContent = "Tayyorlanmoqda...";
    try{
      await call("/api/tests/cert", {code: t.code, last: a, first: b, middle: c2, photo: photo ? photo.split(",")[1] : null});
      toast("Sertifikat botga yuborildi.");
    }catch(e){
      $("cerr").textContent = "Yuborib bo'lmadi. Qayta urinib ko'ring.";
    }
    $("cget").disabled = false; $("cget").textContent = "Sertifikatni olish";
  };
}
function renderEssay(t, R, keyPdf){
  stopTimer(); showExam();
  const cm = x => String(x).replace(".", ",");
  const nm = R.lang ? "Yozma ish bahosi (0-24)" : "Yozma ish ball (0-75)";
  const nT = R.extra === "essay" ? 1 : (t.written || 1);
  const rates = Array(nT).fill("");
  const sg = (i, v, l) => `<button type="button" class="rt" data-i="${i}" data-v="${v}" style="flex:1;height:44px;border-radius:12px;border:1.5px solid var(--line2);background:#fff;color:var(--text);font:700 14px system-ui,sans-serif;cursor:pointer">${l}</button>`;
  let rows = "";
  for(let i = 0; i < nT; i++) rows += `<div style="margin-top:12px"><div style="font-size:14px;font-weight:700;margin-bottom:6px">${nT === 1 ? (R.lang ? "Esse" : "Yozma ish") : (i + 1) + "-yozma topshiriq"}</div><div style="display:flex;gap:8px">${sg(i, "f", "To'liq")}${sg(i, "p", "Qisman")}${sg(i, "z", "0 ball")}</div></div>`;
  box(`<div class="rh"><button id="xback" type="button" class="ibtn" aria-label="Orqaga">${BACK}</button><div><b>Yozma ish</b><small>${esc(t.subject)} · ${esc(t.title)}</small></div></div>` +
    `<div class="rcd"><label style="display:block;margin-bottom:6px">${nm}</label><input id="eball" type="text" inputmode="decimal" placeholder="${R.lang ? "Masalan: 18,5" : "Masalan: 58"}"></div>` +
    `<div class="rcd"><div style="font-size:16px;font-weight:800">Yozma ishni qanday bajardingiz?</div>` +
    `<div class="rnote" style="margin-top:8px"><b>To'liq</b> — hammasini ishladim, yechim va javoblarim Yechimlar PDF dagi bilan bir xil, aniq natija chiqdi.<br><b>Qisman</b> — usul yoki yo'nalish to'g'ri, lekin hisobda xato bor yoki oxirigacha yetkazmadim.<br><b>0 ball</b> — ishlamadim yoki yechimim noto'g'ri.</div>` + rows +
    `<div class="rnote">Kiritgan ballingiz belgilangan baholarga mos kelmasa, bot uni mos ballga o'zgartiradi.</div></div>` +
    `<div class="err" id="eerr"></div><button class="btn" id="ebtn" type="button">Saqlash va natijani ko'rish</button>` +
    `<button class="btn sec" id="eskip" type="button">Keyinroq kiritaman</button>`);
  $("xback").onclick = () => renderResult(t, R, keyPdf);
  $("eskip").onclick = () => renderResult(t, R, keyPdf);
  document.querySelectorAll(".rt").forEach(b => {
    b.onclick = () => {
      rates[+b.dataset.i] = b.dataset.v;
      document.querySelectorAll('.rt[data-i="' + b.dataset.i + '"]').forEach(x => {
        const on = x === b;
        x.style.background = on ? "#2440d6" : "#fff"; x.style.color = on ? "#fff" : "var(--text)"; x.style.borderColor = on ? "#2440d6" : "var(--line2)";
      });
    };
  });
  $("ebtn").onclick = async () => {
    const v = parseFloat(String($("eball").value).replace(",", "."));
    if(R.lang){
      if(!(v >= 0 && v <= 24 && Math.abs(v * 2 - Math.round(v * 2)) < 1e-9)){ $("eerr").textContent = "0 dan 24 gacha, 0,5 qadam bilan kiriting"; return; }
    }else if(!(v >= 0 && v <= 75)){ $("eerr").textContent = "0 dan 75 gacha son kiriting"; return; }
    if(rates.some(x => !x)){ $("eerr").textContent = "Har bir topshiriq uchun holatni belgilang."; return; }
    $("ebtn").disabled = true;
    try{
      const r = await call("/api/tests/essay2", {code: t.code, ball: v, rates});
      renderResult(t, r.result, keyPdf);
      if(r.adjusted){
        const msg = "Kiritgan ballingiz (" + cm(r.claim) + ") belgilangan baholarga mos kelmadi, shuning uchun " + cm(r.adj) + " ball hisoblandi.";
        if(tg.showAlert) tg.showAlert(msg); else toast(msg);
      }
    }catch(e){ $("eerr").textContent = "Xatolik. Qayta urinib ko'ring."; $("ebtn").disabled = false; }
  };
}
async function startRetake(t, keyPdf){
  const go2 = async () => {
    try{
      const r = await call("/api/tests/retake_start", {code: t.code});
      LASTKEY = keyPdf; RT = true;
      renderSheet({test: t, elapsed: r.elapsed});
    }catch(e){ toast("Boshlab bo'lmadi. Qayta urinib ko'ring."); }
  };
  const msg = "Qayta ishlash: natija rasmiy ballingizga, reytingga va sertifikatga ta'sir qilmaydi. Boshlaymizmi?";
  if(tg.showConfirm) tg.showConfirm(msg, ok => { if(ok) go2(); }); else go2();
}
})();
  
