(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".tpg{position:fixed;inset:0;z-index:120;overflow:auto;background:linear-gradient(#eef2ff 0%,#f6f3fb 55%,#fbf3ea 100%);padding:12px 14px 40px;color:#0f1a4d;font-family:inherit}"
+ ".tph{display:flex;align-items:center;gap:12px;margin-bottom:12px}.tph button{width:42px;height:42px;border:0;border-radius:14px;background:#e6ebfb;color:#2440d6;font-size:22px;font-weight:800}.tph b{font-size:19px}"
+ ".thr{position:relative;overflow:hidden;border-radius:28px;padding:18px;color:#fff;background:linear-gradient(150deg,#3a58ee 0%,#2440d6 45%,#14247f 100%);box-shadow:0 16px 30px rgba(36,64,214,.38)}"
+ ".thr:before{content:'';position:absolute;right:-40px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.09)}"
+ ".t1{display:flex;gap:14px;align-items:center;position:relative;z-index:1}.thr h2{margin:0;font-size:21px;line-height:1.18}.thr .sb{opacity:.85;font-size:13.5px;margin-top:4px}"
+ ".chs{display:flex;gap:7px;margin-top:14px;position:relative;z-index:1;flex-wrap:wrap}.ch{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:6px 12px;font-weight:800;font-size:12.5px}.ch.g{background:#2fc77a;border-color:#2fc77a}.ch.o{background:#ff9d2e;border-color:#ff9d2e}.ch.x{background:rgba(0,0,0,.25)}"
+ ".cd{margin-top:14px;position:relative;z-index:1}.cd small{display:block;opacity:.85;font-weight:700;font-size:12.5px}.tcl{display:flex;gap:8px;margin-top:7px}.tcl div{flex:1;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);border-radius:15px;padding:9px 0;text-align:center}.tcl b{display:block;font-size:25px;line-height:1}.tcl small{font-size:11px;opacity:.85;display:block;margin:0}"
+ ".tls{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:12px 0}.tl{background:#fff;border:1px solid #e3e8f8;border-radius:18px;padding:11px 6px;text-align:center;box-shadow:0 4px 12px rgba(36,64,214,.06)}.tl b{display:block;font-size:19px}.tl span{font-size:11.5px;color:#7a84a8;font-weight:700}"
+ ".tbt{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;height:58px;border:0;border-radius:20px;font:900 17px system-ui,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(#4a68f5,#2440d6);box-shadow:0 12px 22px rgba(36,64,214,.4),inset 0 1px 0 rgba(255,255,255,.35)}.tbt:active{transform:scale(.98)}"
+ ".tbt.y{background:linear-gradient(#ffd24d,#ffbb12);color:#2b1d00;box-shadow:0 12px 22px rgba(255,187,18,.42)}.tbt.d{background:#d9deee;color:#8a92b2;box-shadow:none}.tbt.s{height:48px;border-radius:17px;font-size:14.5px;background:#e6ebfb;color:#2440d6;box-shadow:none;margin-top:11px}"
+ ".tpd{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:11px}.pf{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e3e8f8;border-radius:20px;padding:12px;box-shadow:0 4px 12px rgba(36,64,214,.06);text-align:left;font:inherit;color:inherit}.pf b{font-size:14px;display:block}.pf small{font-size:11.5px;color:#7a84a8;font-weight:600}.pf[disabled]{opacity:.6}"
+ ".pi{width:40px;height:40px;border-radius:13px;flex:none;position:relative;overflow:hidden;display:grid;place-items:center;font-size:11px;font-weight:900;color:#fff;box-shadow:0 5px 10px rgba(0,0,0,.2),inset 0 -3px 5px rgba(0,0,0,.2)}.pi:before{content:'';position:absolute;left:2px;right:2px;top:2px;height:48%;border-radius:11px 11px 18px 18px/11px 11px 8px 8px;background:linear-gradient(rgba(255,255,255,.7),rgba(255,255,255,.08))}.pi i{position:relative;font-style:normal}"
+ ".pi.q{background:linear-gradient(160deg,#ff8a7a,#e5483a)}.pi.a{background:linear-gradient(160deg,#5fe3a0,#1b9e5c)}.pi.l{background:linear-gradient(160deg,#cfd4e6,#8a90a8)}"
+ ".sec{margin-top:12px;background:#fff;border:1px solid #e3e8f8;border-radius:22px;padding:13px 14px;box-shadow:0 4px 12px rgba(36,64,214,.06)}.sec h4{margin:0 0 6px;font-size:14.5px}.tp{display:flex;align-items:center;gap:10px;padding:6px 0;font-size:13.5px;font-weight:700}.tp .m{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-size:14px}.tp .nm{flex:1}.tp b{color:#2440d6}"
+ ".tbc .r{display:flex;justify-content:space-between;font-weight:800;font-size:14px}.tbc .r span{color:#7a84a8}.tbc .bar{height:9px;background:#eef1fa;border-radius:9px;margin:10px 0}.tbc .bar i{display:block;height:100%;background:linear-gradient(90deg,#ff9d2e,#ffc629);border-radius:9px}.tbc .nd{color:#8a6a00;font-weight:800;font-size:13.5px}"
+ ".nt{margin-top:10px;font-size:12.5px;color:#7a84a8;font-weight:600;text-align:center}"
+ "</style>");
const tgw = window.Telegram && Telegram.WebApp;
const two = n => String(n).padStart(2, "0");
const fdt = s => { const d = new Date(s); return two(d.getDate()) + "." + two(d.getMonth() + 1) + " · " + two(d.getHours()) + ":" + two(d.getMinutes()); };
const money = n => Number(n || 0).toLocaleString("ru-RU") + " so'm";
const openUrl = u => { if(tgw && tgw.openLink) tgw.openLink(u); else window.open(u, "_blank"); };
const esc = s => { const d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; };
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
function startTest(code){
  close(); document.getElementById("codein").value = code; document.getElementById("codego").click();
  let n = 0;
  const t = setInterval(() => {
    const b = document.getElementById("xstart");
    if(b){ clearInterval(t); if(!b.disabled && /^Testni boshlash/.test(b.textContent)) b.click(); }
    else if(++n > 40) clearInterval(t);
  }, 150);
}
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
const pdfBtn = (a, cls, ttl, sub, dis) => '<button class="pf" type="button"' + (dis ? " disabled" : ' data-a="' + a + '"') + '><div class="pi ' + cls + '"><i>PDF</i></div><div><b>' + ttl + "</b><small>" + sub + "</small></div></button>";
function render(p, t){
  const J = window.MSJ, bal = (typeof ME !== "undefined" && ME && ME.balance) || 0;
  const S = t ? state(t) : null, pu = p.url || (t && t.pdf_url) || null, kind = p.kind || "tushgan savol";
  const ic = J ? J.jelly(J.keyOf(p.subject), 62, 30) : "";
  let h = '<div class="tph"><button type="button" id="tpx">‹</button><b>Test haqida</b></div><div class="thr"><div class="t1">' + ic + '<div><h2>' + esc(p.title) + '</h2><div class="sb">' + esc(p.subject) + " · " + esc(kind) + '</div></div></div><div class="chs">';
  if(S) h += S.k === "wait" ? '<span class="ch o">🟡 Hali boshlanmagan</span>' : S.k === "end" ? '<span class="ch x">🏁 Yakunlangan</span>' : '<span class="ch g">🟢 Test ochiq</span>';
  else h += "<span class=\"ch\">📄 Savollar to'plami</span>";
  if(t && t.rash) h += '<span class="ch">📈 Rash ball</span>';
  h += '<span class="ch">' + (p.price ? "💳 " + money(p.price) : "🎁 Bepul") + "</span></div>";
  if(S && S.k !== "end" && (S.k === "wait" || (t && t.ends_at))) h += '<div class="cd"><small>' + (S.k === "wait" ? "Boshlanishiga qoldi" : "Tugashiga qoldi") + '</small><div class="tcl" id="tcl">' + cells(S.ms) + "</div></div>";
  else if(S && S.k === "end" && t.ends_at) h += '<div class="cd"><small>' + fdt(t.ends_at) + " da tugagan</small></div>";
  h += "</div>";
  if(t) h += '<div class="tls"><div class="tl"><b>' + (t.questions || "-") + "</b><span>savol</span></div><div class=\"tl\"><b>" + (t.minutes || "-") + "</b><span>daqiqa</span></div><div class=\"tl\"><b>" + (t.n || 0) + "</b><span>ishtirokchi</span></div></div>";
  else h += '<div style="height:12px"></div>';
  const need = p.price - bal;
  if(!p.owned){
    const pc = p.price ? Math.min(100, Math.round(bal * 100 / p.price)) : 100;
    h += '<div class="sec tbc"><div class="r"><span>Balansingiz</span><b>' + money(bal) + '</b></div><div class="bar"><i style="width:' + pc + '%"></i></div>' + (need > 0 ? '<div class="nd">Yana <b>' + money(need) + "</b> kerak</div>" : '<div class="nd" style="color:#1e8a4c">Balans yetarli ✓</div>') + "</div>";
    h += need > 0 ? '<button class="tbt y" data-a="tp" type="button" style="margin-top:12px">💳 Balans to\'ldirish</button>' : '<button class="tbt y" data-a="buy" type="button" style="margin-top:12px">Sotib olish (' + money(p.price) + ")</button>";
  }else{
    if(p.test_code){
      if(S.k === "wait") h += '<button class="tbt d" disabled type="button">⏳ Test hali boshlanmagan</button>';
      else h += '<button class="tbt" data-a="test" type="button">' + (S.k === "end" ? "📊 Natijani ko'rish" : "▶ Testni boshlash" + (p.kind && p.price ? " — " + money(p.price) : "")) + "</button>";
    }
    if(pu || p.answer_url || p.has_answer) { const a1 = pu ? pdfBtn("q", "q", "Savollar", "Ochish") : "", a2 = p.answer_url ? pdfBtn("ans", "a", "Javoblar", "Ochish") : p.has_answer ? pdfBtn("", "l", "Javoblar", "Test tugagach", 1) : ""; h += '<div class="tpd"' + (a1 && a2 ? "" : ' style="grid-template-columns:1fr"') + ">" + a1 + a2 + "</div>"; }
    if(!p.test_code && !p.kind) h += '<div class="nt">Bu savol uchun onlayn test hali yo\'q</div>';
  }
  h += '<button class="tbt s" data-a="sh" type="button">📤 Do\'stlarga ulashish</button>';
  ov.innerHTML = h;
  ov.querySelector("#tpx").onclick = close;
  ov.onclick = async e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const a = b.dataset.a;
    if(a === "tp") topup();
    else if(a === "test") startTest(p.test_code);
    else if(a === "q") openUrl(pu);
    else if(a === "ans") openUrl(p.answer_url);
    else if(a === "sh"){ const u = "https://t.me/MSTayyorlovBot" + (p.test_code ? "?start=" + p.test_code : ""), l = "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent("📝 " + p.title + (p.test_code ? "\nTest kodi: " + p.test_code : "")); tgw && tgw.openTelegramLink ? tgw.openTelegramLink(l) : window.open(l); }
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
function shell(){
  close();
  ov = document.createElement("div"); ov.className = "tpg";
  ov.innerHTML = '<p style="text-align:center;color:#7a84a8;margin-top:40px">Yuklanmoqda...</p>';
  document.body.appendChild(ov);
}
const fail = () => { close(); if(tgw && tgw.showAlert) tgw.showAlert("Yuklab bo'lmadi. Qayta urinib ko'ring."); };
async function openMock(code){
  shell();
  try{
    const t = await call("/api/papers/info", {code});
    render({title: t.title, subject: t.subject || "", price: t.price || 0, owned: true, test_code: code, kind: "MS test · kod " + code}, t);
  }catch(e){ fail(); }
}
async function open(id){
  shell();
  try{
    const p = (await papers()).find(x => x.id === id);
    if(!p){ close(); return; }
    let t = null;
    if(p.test_code){ try{ t = await call("/api/papers/info", {code: p.test_code}); }catch(e){} }
    if(ov) render(p, t);
  }catch(e){ fail(); }
}
const l = document.getElementById("tlist");
if(l) l.addEventListener("click", e => {
  const c = e.target.closest(".t.cp"); if(!c) return;
  e.stopImmediatePropagation(); e.stopPropagation();
  if(c.classList.contains("pp")) open(+c.dataset.id);
  else if(c.dataset.code) openMock(c.dataset.code);
}, true);
})();
             
