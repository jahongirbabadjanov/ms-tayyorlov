(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tgw = window.Telegram && Telegram.WebApp;
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const som = n => n ? Number(n).toLocaleString("ru-RU") + " so'm" : "Bepul";
const rd = f => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(f); });
document.head.insertAdjacentHTML("beforeend", "<style>.pbk{display:flex;align-items:center;gap:12px;width:100%;margin:10px 0;border:0;border-radius:20px;padding:14px 16px;background:linear-gradient(150deg,#ffe08a,#fcc419);color:#3d2d00;font:900 16px system-ui,sans-serif;text-align:left;box-shadow:0 8px 18px rgba(252,196,25,.4)}.pbk span{font-size:24px}.pbk small{display:block;font-weight:700;font-size:12.5px;opacity:.8}.pfl{display:flex;align-items:center;gap:10px;background:#f4f6fc;border-radius:14px;padding:11px 12px;margin-top:6px;font:700 14px system-ui,sans-serif;color:#2440d6}.pfl small{flex:1;color:#7a84a8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}</style>");
function screen(t, n){
  const d = document.createElement("div"); d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>' + esc(t) + "</b><small>" + n + '</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove(); document.body.appendChild(d);
  return d.querySelector(".body");
}
const list = async () => (await call("/api/papers/list", {})).papers || [];
const yearsOf = L => [...new Set(L.map(p => (String(p.title).match(/\b(20\d\d)\b/) || [])[1]).filter(Boolean))].sort().reverse();
function setCard(id, price, title){
  const c = document.querySelector('.adm2 .pc[data-id="' + id + '"]'); if(!c) return;
  const a = c.querySelector(".amt"); if(a && price != null) a.textContent = som(price);
  const b = c.querySelector(".pm b"); if(b && title) b.textContent = title;
}
async function bulk(){
  const b = screen("Umumiy narx", "Bir nechta testga birdan");
  b.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let L; try{ L = await list(); }catch(e){ b.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const subs = [...new Set(L.map(p => p.subject))], ys = yearsOf(L);
  b.innerHTML = '<div class="sf"><label>Fan</label><select id="bs" class="fi"><option value="">Barcha fanlar</option>' + subs.map(s => "<option>" + esc(s) + "</option>").join("") + "</select>"
    + '<label>Yil (test nomidan)</label><select id="by" class="fi"><option value="">Barcha yillar</option>' + ys.map(y => "<option>" + y + "</option>").join("") + "</select>"
    + '<label>Yangi narx (so\'m, 0 = bepul)</label><input id="bp" class="fi" type="number" inputmode="numeric" placeholder="Masalan: 10000"></div>'
    + '<div class="sf" id="bn" style="text-align:center;font-weight:800"></div><button class="sbtn" id="bg" type="button">Qo\'llash</button>';
  const pick = () => L.filter(p => (!b.querySelector("#bs").value || p.subject === b.querySelector("#bs").value) && (!b.querySelector("#by").value || String(p.title).includes(b.querySelector("#by").value)));
  const upd = () => { b.querySelector("#bn").innerHTML = "Tanlangan: <b style=\"color:#2440d6\">" + pick().length + " ta</b> test"; };
  b.querySelector("#bs").onchange = upd; b.querySelector("#by").onchange = upd; upd();
  b.querySelector("#bg").onclick = () => {
    const v = parseInt(b.querySelector("#bp").value, 10), n = pick().length;
    if(isNaN(v) || v < 0){ toast("Narxni yozing"); return; }
    if(!n){ toast("Test tanlanmadi"); return; }
    const go = async () => {
      try{ const r = await call("/api/admin/paper_bulk_price", {price: v, subject: b.querySelector("#bs").value, year: b.querySelector("#by").value}); r.ids.forEach(i => setCard(i, v)); toast(r.ids.length + " ta testga narx qo'yildi"); b.closest(".adm2").remove(); }
      catch(e){ toast("Saqlab bo'lmadi"); }
    };
    const m = n + " ta testning narxi " + som(v) + " bo'ladi. Davom etasizmi?";
    if(tgw && tgw.showConfirm) tgw.showConfirm(m, ok => { if(ok) go(); }); else go();
  };
}
async function edit(id){
  const b = screen("Tahrirlash", "Test ma'lumotlari");
  b.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let p, rash = null;
  try{ p = (await list()).find(x => x.id === id); if(p && p.test_code) rash = (await call("/api/papers/key_get", {id})).rash; }catch(e){}
  if(!p){ b.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const F = {};
  const fl = (k, t) => '<div class="pfl" data-f="' + k + '"><span>' + t + '</span><small id="fn_' + k + '">Almashtirish</small></div><input type="file" accept="application/pdf" id="fi_' + k + '" style="display:none">';
  b.innerHTML = '<div class="sf"><label>Nomi</label><input id="en" class="fi" value="' + esc(p.title) + '"><label>Narxi (so\'m, 0 = bepul)</label><input id="ep" class="fi" type="number" inputmode="numeric" value="' + (p.price || 0) + '">'
    + "<label>Fayllar</label>" + fl("q", "📄 Savollar PDF") + fl("a", "✅ Javoblar PDF") + "</div>"
    + (rash == null ? '<div class="sf" style="color:#7a84a8;font-size:13px">Rash tanlovi uchun avval «🔑 Javoblar» orqali kalitni kiriting.</div>'
      : '<div class="sw"><div class="tx"><b>Rash ball hisoblansin</b><small>O\'chiq bo\'lsa faqat to\'g\'ri javoblar soni ko\'rsatiladi.</small></div><button class="tg' + (rash ? " on" : "") + '" id="er" type="button"></button></div>')
    + '<button class="sbtn" id="es" type="button">Saqlash</button>';
  b.querySelectorAll(".pfl").forEach(x => { const k = x.dataset.f, i = b.querySelector("#fi_" + k); x.onclick = () => i.click(); i.onchange = () => { const f = i.files[0]; if(!f) return; if(f.size > 15 * 1024 * 1024){ toast("Fayl 15 MB dan katta"); return; } F[k] = f; b.querySelector("#fn_" + k).textContent = f.name; }; });
  const er = b.querySelector("#er"); if(er) er.onclick = () => er.classList.toggle("on");
  b.querySelector("#es").onclick = async e => {
    const t = b.querySelector("#en").value.trim(), v = parseInt(b.querySelector("#ep").value, 10);
    if(!t || isNaN(v) || v < 0){ toast("Nom va narxni tekshiring"); return; }
    e.target.disabled = true;
    try{
      await call("/api/admin/paper_upd", {id, title: t, price: v});
      if(er && er.classList.contains("on") !== !!rash) await call("/api/papers/rash", {id, rash: er.classList.contains("on")});
      if(F.q || F.a) await call("/api/papers/replace", {id, data: F.q ? await rd(F.q) : "", adata: F.a ? await rd(F.a) : ""});
      setCard(id, v, t); toast("Saqlandi"); b.closest(".adm2").remove();
    }catch(x){ toast("Saqlab bo'lmadi"); e.target.disabled = false; }
  };
}
function mark(){
  document.querySelectorAll(".adm2").forEach(a => {
    const h = a.querySelector(".ah b"); if(!h || h.textContent !== "Tushgan savollar") return;
    a.querySelectorAll('.pc[data-id] [data-a="price"]').forEach(x => { if(x.textContent !== "✏️ Tahrirlash") x.textContent = "✏️ Tahrirlash"; });
    const nw = a.querySelector("#pnew");
    if(nw && !a.querySelector("#pbulk")){
      const d = document.createElement("button"); d.id = "pbulk"; d.type = "button"; d.className = "pbk";
      d.innerHTML = '<span>💰</span><div>Umumiy narx<small>Fan yoki yil bo\'yicha birdan o\'zgartirish</small></div>';
      nw.after(d);
    }
  });
}
document.addEventListener("click", e => {
  const bk = e.target.closest("#pbulk"); if(bk){ e.stopPropagation(); bulk(); return; }
  const b = e.target.closest('.adm2 .pc[data-id] [data-a="price"]'); if(!b) return;
  e.stopPropagation(); e.preventDefault();
  edit(+b.closest(".pc").dataset.id);
}, true);
new MutationObserver(mark).observe(document.body, {childList: true, subtree: true});
})();
    
