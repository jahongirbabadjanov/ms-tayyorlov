(function(){
function sub(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = `<div class="ah"><button class="ab" type="button" aria-label="Orqaga">‹</button><div><b>${title}</b><small>${note || ""}</small></div></div><div class="body"></div>`;
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d.querySelector(".body");
}
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const som = n => Number(n || 0).toLocaleString("ru-RU");
async function refScreen(){
  const body = sub("Referallar", "Eng ko'p taklif qilganlar");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let r;
  try{ r = await call("/api/admin/refs", {}); }
  catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const box = (n, l) => `<div style="flex:1;background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;text-align:center"><b style="display:block;font-size:20px;color:#2440d6">${som(n)}</b><small style="color:var(--muted)">${l}</small></div>`;
  body.innerHTML = `<div style="display:flex;gap:8px">${box(r.total, "taklif")}${box(r.rewarded, "mukofotlangan")}${box(r.inviters, "taklifchi")}</div>`
    + (r.top.length ? "<h3>Top 20</h3>" + r.top.map((u, i) => `<div class="pc"><div style="display:flex;align-items:center;gap:12px"><b style="flex:none;width:30px;height:30px;border-radius:10px;background:${i < 3 ? "#f5b82e" : "#e8edfb"};color:${i < 3 ? "#fff" : "#2440d6"};display:grid;place-items:center">${i + 1}</b><div style="flex:1;min-width:0"><b>${esc(u.name)}</b><small style="display:block;color:var(--muted)">${u.invited} ta taklif · ${u.rewarded} tasi mukofotlangan</small></div><span class="amt" style="font-size:15px">${som(u.ref_balance)} so'm</span></div></div>`).join("") : '<div class="empty" style="margin-top:20px"><div>🤝</div><b>Hali taklif yo\'q</b></div>');
}
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.ref = refScreen;
})();
