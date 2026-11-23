(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".tpg{position:fixed;inset:0;z-index:120;overflow:auto;background:linear-gradient(#eef2ff,#fbf3ea);padding:12px 14px 40px;color:#0f1a4d;font-family:inherit}"
+ ".tph{display:flex;gap:12px;align-items:center;margin-bottom:10px}.tph button{width:42px;height:42px;border:0;border-radius:13px;background:#e8edfb;color:#2440d6;font-size:22px;font-weight:800}.tph b{font-size:18px}"
+ ".thr{border-radius:26px;background:linear-gradient(150deg,#2440d6,#1b2fa8 70%,#12206f);color:#fff;padding:16px;margin-bottom:12px;position:relative;overflow:hidden;box-shadow:0 12px 26px rgba(36,64,214,.3)}"
+ ".thr:after{content:'';position:absolute;right:-30px;top:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.08)}"
+ ".thr .t1{display:flex;gap:12px;align-items:center;position:relative;z-index:1}.thr h2{margin:0;font-size:21px;line-height:1.2}.thr .t1 span{opacity:.85;font-size:13px}"
+ ".tch{display:inline-block;margin-top:12px;background:rgba(255,255,255,.2);border-radius:99px;padding:5px 12px;font-weight:800;font-size:13px}"
+ ".tlb{margin-top:10px;font-size:13px;opacity:.9;font-weight:700}"
+ ".tcl{display:flex;gap:8px;margin-top:8px}.tcl div{flex:1;background:rgba(255,255,255,.16);border-radius:14px;padding:9px 0;text-align:center}.tcl b{display:block;font-size:26px;line-height:1}.tcl small{font-size:11px;opacity:.85;font-weight:700}"
+ ".tg2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}.tg2 div{background:#fff;border:1px solid #e3e8f8;border-radius:18px;padding:12px}.tg2 small{display:block;color:#7a84a8;font-size:12px;font-weight:700}.tg2 b{font-size:16.5px}"
+ ".tbc{background:#fff;border:1px solid #e3e8f8;border-radius:18px;padding:14px;margin-bottom:12px}.tbc .r{display:flex;justify-content:space-between;font-weight:800;font-size:14px}.tbc .r span{color:#7a84a8}"
+ ".tbc .bar{height:9px;background:#eef1fa;border-radius:9px;margin:10px 0}.tbc .bar i{display:block;height:100%;background:linear-gradient(90deg,#ff9d2e,#ffc629);border-radius:9px}.tbc .nd{color:#8a6a00;font-weight:800;font-size:13.5px}"
+ ".tbt{display:block;width:100%;height:54px;margin-bottom:9px;border:0;border-radius:18px;font:900 16.5px system-ui,sans-serif;cursor:pointer}.tbt:active{transform:scale(.98)}"
+ ".tbt.p{background:linear-gradient(#3a58ee,#2440d6);color:#fff;box-shadow:0 10px 20px rgba(36,64,214,.35)}.tbt.s{background:#e8edfb;color:#2440d6;height:48px}.tbt.y{background:#ffc629;color:#0f1a4d;box-shadow:0 10px 20px rgba(252,196,25,.45)}.tbt.d{background:#f2f4fb;color:#9aa3c4;height:48px}.tbt[disabled]{opacity:.6}"
+ "</style>");
const tgw = window.Telegram && Telegram.WebApp;
const two = n => String(n).padStart(2, "0");
const fdt = s => { const d = new Date(s); return two(d.getDate()) + "." + two(d.getMonth() + 1) + " · " + two(d.getHours()) + ":" + two(d.getMinutes()); };
const money = n => Number(n || 0).toLocaleString("ru-RU") + " so'm";
const openUrl = u => { if(tgw && tgw.openLink) tgw.openLink(u); else window.open(u, "_blank"); };
let cache = {t: 0, v: null}, tick = null, ov = null;
async function papers(fresh){
  if(!fresh && cache.v && Date.now() - cache.t < 20000) return cache.v;
  cache = {t: Date.now(), v: (await call("/api/papers/list", {})).papers || []};
  return cache.v;
}
function close(){ clearInterval(tick); if(ov){ ov.remove(); ov = null; } }
function topup(){
  close(); go("profile");
  let n = 0;
  const t = setInterval(() => { const b = document.querySelector(".pf-pill"); if(b){ clearInterval(t); b.click(); } else if(++n > 20) clearInterval(t); }, 250);
}
function startTest(code){ close(); document.getElementById("codein").value = code; document.getElementById("codego").click(); }
function state(t){
  const now = Date.now(), st = t && t.starts_at ? new Date(t.starts_at).getTime() : 0, en = t && t.ends_at ? new Date(t.ends_at).getTime() : 0;
  if(st && st > now) return {k: "wait", ms: st - now};
  if(en && en <= now) return {k: "end"};
  return {k: "open", ms: en ? en - now : 0};
}
function cells(ms){
  let s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const c = [[two(Math.floor(s / 3600)), "soat"], [two(Math.floor(s % 3600 / 60)), "daqiqa"], [two(s % 60), "soniya"]];
  if(d) c.unshift([String(d), "kun"]);
  return c.map(x => "<div><b>" + x[0] + "</b><small>" + x[1] + "</small></div>").join("");
}
function render(p, t){
  const J = window.MSJ, bal = (typeof ME !== "undefined" && ME && ME.balance) || 0;
  const S = t ? state(t) : null, pu = p.url || (t && t.pdf_url) || null, kind = p.kind || "tushgan savol";
  const ic = J ? J.jelly(J.keyOf(p.subject), 52, 28) : "";
  const chip = !S ? (p.owned ? "📄 Savollar to'plami" : "🔒 Yopiq") : S.k === "wait" ? "🟡 Hali boshlanmagan" : S.k === "end" ? "🏁 Test yakunlangan" : "🟢 Test ochiq";
  let h = '<div class="tph"><button type="button" id="tpx">‹</button><b>Test haqida</b></div>'
    + '<div class="thr"><div class="t1">' + ic + '<div><h2>' + esc(p.title) + '</h2><span>' + esc(p.subject) + ' · ' + kind + '</span></div></div><div class="tch">' + chip + '</div>';
  if(S && S.k !== "end") h += '<div class="tlb">' + (S.k === "wait" ? "Boshlanishiga qoldi" : (t.ends_at ? "Tugashiga qoldi" : "Test ochiq")) + '</div>' + (S.k === "wait" || t.ends_at ? '<div class="tcl" id="tcl">' + cells(S.ms) + '</div>' : "");
  if(S && S.k === "end") h += '<div class="tlb">' + (t.ends_at ? fdt(t.ends_at) + " da tugagan" : "") + '</div>';
  h += '</div>';
  const g = [["Narxi", p.price ? money(p.price) : "Bepul 🎁"]];
  if(t){
    g.unshift(["Vaqt", (t.minutes || "-") + " daqiqa"]); g.unshift(["Savollar soni", (t.questions || "-") + " ta"]);
    if(t.rash) g.push(["Rash ball", "Hisoblanadi ✓"]);
    if(t.n != null) g.push(["Ishtirokchilar", t.n + " kishi"]);
    if(t.starts_at) g.push(["Boshlanishi", fdt(t.starts_at)]);
    if(t.ends_at) g.push(["Tugashi", fdt(t.ends_at)]);
  }
  h += '<div class="tg2">' + g.map(x => "<div><small>" + x[0] + "</small><b>" + x[1] + "</b></div>").join("") + '</div>';
  const need = p.price - bal;
  if(!p.owned){
    const pc = p.price ? Math.min(100, Math.round(bal * 100 / p.price)) : 100;
    h += '<div class="tbc"><div class="r"><span>Balansingiz</span><b>' + money(bal) + '</b></div><div class="bar"><i style="width:' + pc + '%"></i></div>'
      + (need > 0 ? '<div class="nd">Yana <b>' + money(need) + '</b> kerak</div>' : '<div class="nd" style="color:#1e8a4c">Balans yetarli ✓</div>') + '</div>';
    h += need > 0 ? '<button class="tbt y" data-a="tp" type="button">💳 Balans to\'ldirish</button><button class="tbt d" disabled type="button">Sotib olish (balans yetarli emas)</button>'
      : '<button class="tbt y" data-a="buy" type="button">Sotib olish (' + money(p.price) + ')</button>';
  }else{
    if(p.test_code){
      if(S.k === "wait") h += '<button class="tbt d" disabled id="tgo" type="button">Test hali boshlanmagan</button>';
      else h += '<button class="tbt p" data-a="test" id="tgo" type="button">' + (S.k === "end" ? "📊 Natijani ko'rish" : "▶ Testni boshlash" + (!p.kind || !p.price ? "" : " — " + money(p.price))) + '</button>';
    }
    if(pu) h += '<button class="tbt s" data-a="q" type="button">📄 Savollar PDF</button>';
    if(p.answer_url) h += '<button class="tbt s" data-a="ans" type="button">✅ Javoblar PDF</button>';
    else if(p.has_answer) h += '<button class="tbt d" disabled type="button">🔒 Javoblar PDF (test tugagach)</button>';
  }
  ov.innerHTML = h;
  ov.querySelector("#tpx").onclick = close;
  ov.onclick = async e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const a = b.dataset.a;
    if(a === "tp") topup();
    else if(a === "test") startTest(p.test_code);
    else if(a === "q") openUrl(pu);
    else if(a === "ans") openUrl(p.answer_url);
    else if(a === "buy"){
      const go1 = async () => {
        b.disabled = true;
        try{ await call("/api/papers/buy", {id: p.id}); const np = (await papers(true)).find(x => x.id === p.id); if(np) render(np, t); }
        catch(x){ b.disabled = false; if(tgw && tgw.showAlert) tgw.showAlert(String(x.message).includes("402") ? "Balans yetarli emas." : "Xatolik. Qayta urinib ko'ring."); }
      };
      const m = p.title + " ni " + money(p.price) + " evaziga sotib olasizmi?";
      if(tgw && tgw.showConfirm) tgw.showConfirm(m, ok => { if(ok) go1(); }); else go1();
    }
  };
  clearInterval(tick);
  if(S && S.k !== "end"){
    tick = setInterval(() => {
      const n = state(t), el = document.getElementById("tcl");
      if(n.k !== S.k){ render(p, t); return; }
      if(el) el.innerHTML = cells(n.ms);
    }, 1000);
  }
}
async function openMock(code){
  close();
  ov = document.createElement("div"); ov.className = "tpg";
  ov.innerHTML = '<p style="text-align:center;color:#7a84a8;margin-top:40px">Yuklanmoqda...</p>';
  document.body.appendChild(ov);
  try{
    const t = await call("/api/papers/info", {code});
    render({title: t.title, subject: t.subject || "", price: t.price || 0, owned: true, test_code: code, kind: "MS test · kod " + code}, t);
  }catch(e){ close(); if(tgw && tgw.showAlert) tgw.showAlert("Yuklab bo'lmadi. Qayta urinib ko'ring."); }
}
async function open(id){
  close();
  ov = document.createElement("div"); ov.className = "tpg";
  ov.innerHTML = '<p style="text-align:center;color:#7a84a8;margin-top:40px">Yuklanmoqda...</p>';
  document.body.appendChild(ov);
  try{
    const p = (await papers()).find(x => x.id === id);
    if(!p){ close(); return; }
    let t = null;
    if(p.test_code){ try{ t = await call("/api/papers/info", {code: p.test_code}); }catch(e){} }
    if(ov) render(p, t);
  }catch(e){ close(); if(tgw && tgw.showAlert) tgw.showAlert("Yuklab bo'lmadi. Qayta urinib ko'ring."); }
}
function esc(s){ const d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
const l = document.getElementById("tlist");
if(l) l.addEventListener("click", e => {
  const c = e.target.closest(".t.cp"); if(!c) return;
  e.stopImmediatePropagation(); e.stopPropagation();
  if(c.classList.contains("pp")) open(+c.dataset.id);
  else if(c.dataset.code) openMock(c.dataset.code);
}, true);
})();
        
