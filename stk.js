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
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:300;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const BT = "flex:1;height:40px;border:0;border-radius:12px;font:800 13.5px system-ui,sans-serif;cursor:pointer;";
async function stkScreen(){
  const body = sub("Stikerlar", "Fan bo'yicha e'lon stikeri");
  const draw = async () => {
    let have = [];
    try{ have = (await call("/api/admin/stk", {})).have; }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
    const J = window.MSJ;
    body.innerHTML = '<p class="sub" style="margin:0 2px 8px">«Tanlash» ni bosing, bot sizga yozadi. Stikerni botga yuborsangiz, saqlanadi.</p>'
      + SUBJECTS.map(s => { const ok = have.includes(s); return `<div class="pc" data-s="${esc(s)}"><div style="display:flex;align-items:center;gap:12px">${J ? `<div style="flex:none">${J.jelly(J.keyOf(s), 42, 22)}</div>` : ""}<div style="flex:1;min-width:0"><b>${esc(s)}</b><small style="display:block;color:${ok ? "#1a8a4a" : "var(--muted)"}">${ok ? "✅ Stiker bor" : "Stiker yo'q"}</small></div></div><div style="display:flex;gap:8px;margin-top:10px"><button data-a="set" type="button" style="${BT}background:#e8edfb;color:#2440d6">${ok ? "Almashtirish" : "Tanlash"}</button>${ok ? `<button data-a="test" type="button" style="${BT}background:#dff5e8;color:#1a8a4a">Ko'rish</button><button data-a="del" type="button" style="${BT}background:#fde4e5;color:#b3262b">O'chirish</button>` : ""}</div></div>`; }).join("");
  };
  body.onclick = async e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const s = b.closest(".pc").dataset.s, a = b.dataset.a;
    try{
      if(a === "set"){ await call("/api/admin/stk_set", {subject: s}); toast("Botga o'ting va stikerni yuboring"); }
      else if(a === "test"){ await call("/api/admin/stk_test", {subject: s}); toast("Stiker botga yuborildi"); }
      else if(a === "del"){ await call("/api/admin/stk_del", {subject: s}); toast("O'chirildi"); draw(); }
    }catch(x){ toast("Bajarilmadi"); }
  };
  draw();
}
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.stk = stkScreen;
})();
    
