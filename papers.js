(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".pp .th{display:flex;align-items:center;gap:12px}.pp .ppb{display:flex;gap:8px;margin-top:12px}.pp .ppb .btn{margin-top:0}"
+ ".pp .del{flex:none;width:52px;border:0;border-radius:16px;background:#fde4e5;color:#b3262b;font-size:18px;cursor:pointer}"
+ "#pform .row2{margin-top:6px}"
+ "</style>");
let PP = [], ADMIN = false;
const tgw = window.Telegram && Telegram.WebApp;

function drawPapers(){
  const box = $("tlist");
  const list = PP.filter(p => !FILTER || p.subject === FILTER);
  if(!list.length){ box.innerHTML = '<div class="empty"><div>📭</div><b>Hozircha tushgan savollar yo\'q</b>Tez orada savollar qo\'shiladi.</div>'; return; }
  box.innerHTML = list.map(p => `<div class="t pp" data-id="${p.id}"><div class="th"><div class="ti">${iconOf(p.subject)}</div>`
    + `<div class="tm"><b>${esc(p.title)}</b><small>${esc(p.subject)}</small></div>`
    + (p.price ? `<span class="tag paid">${som(p.price)}</span>` : '<span class="tag live">Bepul</span>') + `</div>`
    + `<div class="ppb"><button class="btn yel" data-act="${p.owned ? "open" : "buy"}" type="button">${p.owned ? "PDF ochish" : "Sotib olish · " + som(p.price)}</button>`
    + (ADMIN ? '<button class="del" data-act="del" type="button" aria-label="O\'chirish">🗑</button>' : "") + `</div></div>`).join("");
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
  if(!ADMIN || $("pform")) return;
  const h = document.createElement("div");
  h.className = "card"; h.id = "pform";
  h.innerHTML = '<h2>Tushgan savol qo\'shish</h2><p class="sub">Faqat admin ko\'radi</p>'
    + '<label>Fan</label><select id="psub"></select><label>Nomi *</label><input id="ptitle" placeholder="Masalan: 2025-yil Tarix savollari">'
    + '<label>Narxi (so\'m, 0 = bepul)</label><input id="pprice" type="number" inputmode="numeric" value="0">'
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
      await call("/api/papers/create", {subject: $("psub").value, title, price: parseInt($("pprice").value, 10) || 0, data});
      $("ptitle").value = ""; $("pfile").value = ""; $("pprice").value = "0";
      if(tgw && tgw.showAlert) tgw.showAlert("Qo'shildi. Asosiy ekran → Tushgan savollar bo'limida ko'rinadi."); 
      loadPapers(false);
    }catch(e){ $("perr").textContent = "Yuklab bo'lmadi. Qayta urinib ko'ring."; }
    $("padd").disabled = false;
  };
}

const _rt = window.renderTests;
window.renderTests = function(){ if(CAT === "past"){ drawPapers(); loadPapers(false); } else _rt(); };
const _lt = window.loadTests;
window.loadTests = async function(){ await _lt(); loadPapers(false); };
if(!$("v-tests").classList.contains("hidden")) loadPapers(false);

const openUrl = u => { if(tgw && tgw.openLink) tgw.openLink(u); else window.open(u, "_blank"); };
$("tlist").addEventListener("click", async e => {
  const b = e.target.closest("[data-act]"); const c = e.target.closest(".pp");
  if(!b || !c) return;
  const p = PP.find(x => x.id === +c.dataset.id); if(!p) return;
  if(b.dataset.act === "open"){ if(p.url) openUrl(p.url); return; }
  if(b.dataset.act === "del"){
    const go = async () => { try{ await call("/api/papers/delete", {id: p.id}); loadPapers(false); }catch(x){} };
    if(tgw && tgw.showConfirm) tgw.showConfirm("O'chirilsinmi?", ok => { if(ok) go(); }); else go();
    return;
  }
  const go = async () => {
    b.disabled = true;
    try{ const r = await call("/api/papers/buy", {id: p.id}); await loadPapers(false); if(r.url) openUrl(r.url); }
    catch(x){ b.disabled = false; const m = String(x.message); const t = m.includes("402") ? "Balans yetarli emas." : "Xatolik. Qayta urinib ko'ring."; if(tgw && tgw.showAlert) tgw.showAlert(t); }
  };
  const msg = p.title + " savollarini " + som(p.price) + " evaziga sotib olasizmi?";
  if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
});
})();
     
