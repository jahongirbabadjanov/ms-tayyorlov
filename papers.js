(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".pp .th{display:flex;align-items:center;gap:12px}.pp .ppb{display:flex;gap:8px;margin-top:12px}.pp .ppb .btn{margin-top:0}"
+ ".pp .del{flex:none;width:52px;border:0;border-radius:16px;background:#fde4e5;color:#b3262b;font-size:18px;cursor:pointer}"
+ "#pform .row2{margin-top:6px}"
+ ".t.cp.pp{cursor:pointer}.t.cp .tag.free{background:#dff5e8;color:#1a8a4a}"
+ ".shd{position:fixed;inset:0;background:rgba(15,26,77,.45);z-index:50;display:flex;align-items:flex-end}"
+ ".shs{width:100%;max-height:88vh;overflow:auto;background:#fff;border-radius:28px 28px 0 0;padding:18px 16px 26px;box-shadow:0 -10px 30px rgba(0,0,0,.2)}"
+ ".shs .shh{display:flex;gap:12px;align-items:center}.shs .shh h2{margin:0;font-size:19px;line-height:1.2}.shs .shh p{margin:3px 0 0;color:var(--muted);font-size:13.5px}"
+ ".shs .sb{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:54px;margin-top:10px;border:0;border-radius:16px;font:800 16px system-ui,sans-serif;cursor:pointer}"
+ ".shs .sb.p{background:#2440d6;color:#fff}.shs .sb.s{background:#e8edfb;color:#2440d6}.shs .sb.y{background:#ffc629;color:#0f1a4d}.shs .sb.r{background:#fde4e5;color:#b3262b}.shs .sb[disabled]{opacity:.5}"
+ "</style>");
let PP = [], ADMIN = false;
const tgw = window.Telegram && Telegram.WebApp;

function drawPapers(){
  const box = $("tlist"), J = window.MSJ;
  const list = PP.filter(p => !FILTER || p.subject === FILTER);
  if(!list.length){ box.innerHTML = '<div class="empty"><div>📭</div><b>Hozircha tushgan savollar yo\'q</b>Tez orada savollar qo\'shiladi.</div>'; return; }
  box.innerHTML = list.map(p => {
    const ic = J ? J.jelly(J.keyOf(p.subject), 44, 24) : '<div class="ti">' + iconOf(p.subject) + '</div>';
    const tag = p.owned ? '<span class="tag free">Sotib olingan</span>' : (p.price ? '<span class="tag paid">' + Number(p.price).toLocaleString("ru-RU") + '</span>' : '<span class="tag free">Bepul</span>');
    return '<div class="t cp pp" data-id="' + p.id + '"><div class="th">' + ic + '<div class="tm"><b>' + esc(p.title) + '</b><small>' + esc(p.subject) + ' · tushgan savol</small></div>' + tag + '</div></div>';
  }).join("");
}

async function loadPapers(show){
  if(show) $("tlist").innerHTML = '<div class="card"><p class="sub" style="margin:0">Yuklanmoqda...</p></div>';
  try{
    const r = await call("/api/papers/list", {});
    PP = r.papers; ADMIN = r.admin; adminForm();
    if(CAT === "past") drawPapers();
  }catch(e){ if(show) $("tlist").innerHTML = '<div class="empty"><div>⚠️</div><b>Yuklab bo\'lmadi</b>Birozdan so\'ng qayta urinib ko\'ring.</div>'; }
}

function adminForm(){
  return;
  if(!ADMIN || $("pform")) return;
  const h = document.createElement("div");
  h.className = "card"; h.id = "pform";
  h.innerHTML = '<h2>Tushgan savol qo\'shish</h2><p class="sub">Faqat admin ko\'radi</p>'
    + '<label>Fan</label><select id="psub"></select><label>Nomi *</label><input id="ptitle" placeholder="Masalan: 2025-yil Tarix savollari">'
    + '<label>Narxi (so\'m, 0 = bepul)</label><input id="pprice" type="number" inputmode="numeric" value="0">'
    + '<label>Test kodi (ixtiyoriy)</label><input id="pcode" inputmode="numeric" maxlength="4" placeholder="Masalan: 1234">'
    + '<label>PDF fayl *</label><input id="pfile" type="file" accept="application/pdf">'
    + '<div class="err" id="perr"></div><button class="btn" id="padd" type="button">Qo\'shish</button>';
  $("v-create").appendChild(h);
  SUBJECTS.forEach(n => { const o = document.createElement("option"); o.value = o.textContent = n; $("psub").appendChild(o); });
  $("padd").onclick = async () => {
    const f = $("pfile").files[0], title = $("ptitle").value.trim();
    if(!title){ $("perr").textContent = "Nomini kiriting."; return; }
    if(!f){ $("perr").textContent = "PDF faylni tanlang."; return; }
    if(f.size > 15 * 1024 * 1024){ $("perr").textContent = "Fayl 15 MB dan katta."; return; }
    $("padd").disabled = true; $("perr").textContent = "";
    try{
      const data = await new Promise((ok, no) => { const rd = new FileReader(); rd.onload = () => ok(rd.result); rd.onerror = no; rd.readAsDataURL(f); });
      await call("/api/papers/create", {subject: $("psub").value, title, price: parseInt($("pprice").value, 10) || 0, test_code: $("pcode").value.trim(), data});
      $("ptitle").value = ""; $("pfile").value = ""; $("pprice").value = "0"; $("pcode").value = "";
      if(tgw && tgw.showAlert) tgw.showAlert("Qo'shildi. Asosiy ekran → Tushgan savollar bo'limida ko'rinadi."); 
      loadPapers(false);
    }catch(e){ $("perr").textContent = String(e.message).includes("400") ? "Bunday kodli test topilmadi yoki ma'lumot noto'g'ri." : "Yuklab bo'lmadi. Qayta urinib ko'ring."; }
    $("padd").disabled = false;
  };
}

const _rt = window.renderTests;
window.renderTests = function(){ if(CAT === "past"){ drawPapers(); loadPapers(false); } else _rt(); };
const _lt = window.loadTests;
window.loadTests = async function(){ await _lt(); loadPapers(false); };
if(!$("v-tests").classList.contains("hidden")) loadPapers(false);

const openUrl = u => { if(tgw && tgw.openLink) tgw.openLink(u); else window.open(u, "_blank"); };
function closeSheet(){ const d = document.getElementById("shd"); if(d) d.remove(); }
function openSheet(p){
  closeSheet();
  const J = window.MSJ, bal = (typeof ME !== "undefined" && ME && ME.balance) || 0;
  const ic = J ? J.jelly(J.keyOf(p.subject), 52, 28) : "";
  const pdfSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/><text x="12.5" y="17.3" font-size="5.2" font-weight="800" text-anchor="middle" fill="currentColor" stroke="none">PDF</text></svg>';
  const kv = (a, b) => '<div class="kv"><span>' + a + '</span><span>' + b + '</span></div>';
  let h = '<div class="shh">' + ic + '<div><h2>' + esc(p.title) + '</h2><p>' + esc(p.subject) + ' · tushgan savol</p></div></div><div style="height:6px"></div>';
  h += kv("Narxi", p.price ? som(p.price) : "Bepul");
  if(!p.owned && p.price) h += kv("Balansingiz", som(bal));
  if(p.test_code) h += kv("Test bilan ishlash", '<span style="color:#1f9d55">Mumkin (kod ' + esc(p.test_code) + ')</span>');
  if(p.owned){
    h += '<button class="sb p" data-a="open" type="button">' + pdfSvg + ' Savollar PDF</button>';
    if(p.test_code) h += '<button class="sb y" data-a="test" type="button">Test bilan ishlash</button>';
  }else{
    h += '<p class="sub" style="margin:12px 0 0">Sotib olgach savollar PDF' + (p.test_code ? " va testni ishlash" : "") + ' ochiladi.</p>';
    h += '<button class="sb p" data-a="buy" type="button">' + (p.price ? "Sotib olish (" + som(p.price) + ")" : "Olish (bepul)") + '</button>';
  }
  if(ADMIN) h += '<button class="sb r" data-a="del" type="button">O\'chirish</button>';
  h += '<button class="sb s" data-a="x" type="button">Yopish</button>';
  const d = document.createElement("div");
  d.className = "shd"; d.id = "shd"; d.innerHTML = '<div class="shs">' + h + '</div>';
  d.addEventListener("click", async e => {
    if(e.target === d){ closeSheet(); return; }
    const b = e.target.closest("[data-a]"); if(!b) return;
    const a = b.dataset.a;
    if(a === "x"){ closeSheet(); return; }
    if(a === "open"){ if(p.url) openUrl(p.url); return; }
    if(a === "test"){ closeSheet(); $("codein").value = p.test_code; $("codego").click(); return; }
    if(a === "del"){
      const go = async () => { try{ await call("/api/papers/delete", {id: p.id}); closeSheet(); loadPapers(false); }catch(x){} };
      if(tgw && tgw.showConfirm) tgw.showConfirm("O'chirilsinmi?", ok => { if(ok) go(); }); else go();
      return;
    }
    const go = async () => {
      b.disabled = true;
      try{ const r = await call("/api/papers/buy", {id: p.id}); await loadPapers(false); const np = PP.find(x => x.id === p.id); if(np) openSheet(np); else closeSheet(); if(r.url) openUrl(r.url); }
      catch(x){ b.disabled = false; const m = String(x.message); const t = m.includes("402") ? "Balans yetarli emas." : "Xatolik. Qayta urinib ko'ring."; if(tgw && tgw.showAlert) tgw.showAlert(t); }
    };
    const msg = p.title + " savollarini " + som(p.price) + " evaziga sotib olasizmi?";
    if(!p.price) go(); else if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
  });
  document.body.appendChild(d);
}
$("tlist").addEventListener("click", e => {
  const c = e.target.closest(".pp"); if(!c) return;
  const p = PP.find(x => x.id === +c.dataset.id); if(p) openSheet(p);
});
})();
      
