(function(){
const css = `
.t{cursor:pointer}
.timer{position:sticky;top:0;z-index:5;background:#0d1328;border:1px solid var(--line);border-radius:14px;padding:10px 14px;display:flex;justify-content:space-between;margin-bottom:12px;font-weight:700}
.big{font-size:44px;font-weight:800;text-align:center;color:var(--mint);margin:6px 0}
.lvl{display:inline-block;padding:6px 18px;border-radius:99px;background:linear-gradient(135deg,var(--violet),var(--mint));color:#0b1020;font-weight:800;font-size:22px}
.rrow{display:grid;grid-template-columns:48px 1fr 1fr;gap:8px;padding:7px 0;border-bottom:1px solid #1a2342;font-size:14px}
.rrow.h{color:var(--muted);font-size:12px}
.good{color:var(--mint)}.bad{color:var(--danger)}
.center{text-align:center}
`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
$("app").insertAdjacentHTML("beforeend", '<section id="v-exam" class="hidden"></section>');
$("v-answer").innerHTML = '<div class="card"><h2>Javob yuborish</h2><p class="sub">Test kodini kiriting</p><label>Test kodi</label><input id="codein" inputmode="numeric" placeholder="Masalan: 1234"><button class="btn" id="codego" type="button">Ochish</button></div>';

let timer = null, CUR = null, D = null, sending = false;
const stopTimer = () => { if(timer){ clearInterval(timer); timer = null; } };
const dk = c => "draft_" + c;
const saveDraft = () => { try{ localStorage.setItem(dk(CUR.test.code), JSON.stringify(D)); }catch(e){} };
const loadDraft = c => { try{ return JSON.parse(localStorage.getItem(dk(c))); }catch(e){ return null; } };
const clearDraft = c => { try{ localStorage.removeItem(dk(c)); }catch(e){} };
const fmt = s => { s = Math.max(0, s); return [Math.floor(s/3600), Math.floor(s%3600/60), s%60].map(v => String(v).padStart(2, "0")).join(":"); };
const box = html => { $("v-exam").innerHTML = html; };
function showExam(){
  ["tests","answer","create","profile"].forEach(x => $("v-" + x).classList.add("hidden"));
  $("v-exam").classList.remove("hidden");
  window.scrollTo(0, 0);
}

const _go = window.go;
window.go = v => { stopTimer(); $("v-exam").classList.add("hidden"); _go(v); };

$("tlist").addEventListener("click", e => {
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
    else renderResult(r.test, r.result);
  }catch(e){
    box('<div class="card"><p class="sub">Test topilmadi yoki xatolik chiqdi.</p><button class="btn sec" id="xb" type="button">Orqaga</button></div>');
    $("xb").onclick = () => go("tests");
  }
}

function renderNew(r){
  const t = r.test, price = t.price || 0, bal = (ME && ME.balance) || 0, low = price > bal;
  box(`<div class="card"><h2>${esc(t.title)}</h2><p class="sub">${esc(t.subject)}</p>
    <div class="kv"><span>Savollar soni</span><span>${t.question_count} ta</span></div>
    <div class="kv"><span>Vaqt</span><span>${t.duration_minutes} daqiqa</span></div>
    <div class="kv"><span>Narx</span><span>${som(price)}</span></div>
    <div class="kv"><span>Urinish</span><span>1 marta</span></div></div>
    <div class="card"><b>Qoidalar</b>
    <p class="sub" style="margin-top:8px">• Taymer boshlaganingizda ishga tushadi va to'xtamaydi.<br>• Javoblar avtomatik saqlanadi, ilovani yopsangiz ham davom ettirasiz.<br>• Vaqt tugasa, javoblar o'zi topshiriladi.<br>• Natija va to'g'ri javoblar darhol chiqadi.</p></div>
    ${low ? `<p class="err">Balansingiz: ${som(bal)}. Boshlash uchun ${som(price)} yetmaydi.</p>` : ""}
    <div class="err" id="xerr"></div>
    <button class="btn" id="xstart" type="button" ${low ? "disabled" : ""}>Testni boshlash${price ? " — " + som(price) : ""}</button>
    <button class="btn sec" id="xb" type="button">Orqaga</button>`);
  $("xb").onclick = () => go("tests");
  $("xstart").onclick = async () => {
    $("xstart").disabled = true;
    try{ await call("/api/tests/start", {code: t.code}); openTest(t.code); }
    catch(e){ $("xerr").textContent = String(e.message).includes("402") ? "Balans yetarli emas." : "Xatolik. Qayta urinib ko'ring."; $("xstart").disabled = false; }
  };
}

function renderSheet(r){
  CUR = r;
  const t = r.test, saved = loadDraft(t.code);
  D = {closed: Array(35).fill(""), open: t.open_parts.map(n => Array(n).fill(""))};
  if(saved && saved.closed && saved.closed.length === 35) D.closed = saved.closed;
  if(saved && saved.open && saved.open.length === D.open.length)
    D.open = D.open.map((row, i) => (saved.open[i] && saved.open[i].length === row.length) ? saved.open[i] : row);
  let left = t.duration_minutes * 60 - r.elapsed;
  box(`<div class="timer"><span>${esc(t.title)}</span><span id="tm">${fmt(left)}</span></div>
    <div class="card"><div class="sec-t" style="margin-top:0">Yopiq savollar (1-35)</div><div id="xgrid"></div>
    <div id="xopen"></div>
    ${t.written ? `<div class="note">📝 Yozma ishlar (${t.written} ta) qog'ozda bajariladi, bu yerda javob kiritilmaydi.</div>` : ""}
    <div class="err" id="xerr"></div>
    <button class="btn" id="xsend" type="button">Javoblarni yuborish</button></div>`);
  drawGrid(); drawOpen();
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
      clearDraft(t.code); sending = false; renderResult(t, res.result);
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

function renderResult(t, R){
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
  box(top + `<div class="card"><h2>To'g'ri javoblar</h2>${rows}</div><button class="btn sec" id="xb" type="button">Testlar ro'yxatiga qaytish</button>`);
  $("xb").onclick = () => go("tests");
  if($("ebtn")) $("ebtn").onclick = async () => {
    const v = parseFloat($("eball").value);
    if(!(v >= 0 && v <= 75)){ $("eerr").textContent = "0 dan 75 gacha son kiriting"; return; }
    try{ const r = await call("/api/tests/essay", {code: t.code, ball: v}); renderResult(t, r.result); }
    catch(e){ $("eerr").textContent = "Xatolik. Qayta urinib ko'ring."; }
  };
}
})();
                                                                           
