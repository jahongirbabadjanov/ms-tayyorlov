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
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:300;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); };
const dt = s => { try{ return new Date(s).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit", timeZone:"Asia/Tashkent"}); }catch(e){ return ""; } };
const tg = window.Telegram && Telegram.WebApp;
const IN = "width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:13px;font:600 15.5px system-ui,sans-serif;color:#0f1a4d";
const BT = "flex:1;height:42px;border:0;border-radius:12px;font:800 14px system-ui,sans-serif;cursor:pointer;";
async function testsScreen(){
  const body = sub("Testlar", "Narx va o'chirish");
  body.innerHTML = `<input id="tq" placeholder="Nom yoki kod" style="${IN}"><div id="tl"></div>`;
  const list = body.querySelector("#tl"); let T;
  const load = async () => {
    list.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
    try{
      const r = await call("/api/admin/tests", {q: body.querySelector("#tq").value});
      list.innerHTML = r.tests.length ? r.tests.map(t => `<div class="pc" data-c="${esc(t.code)}"><b>${esc(t.title)}</b><small style="display:block;color:var(--muted);margin-top:2px">${esc(t.subject)} · kod ${esc(t.code)} · ${dt(t.starts_at)}</small><span class="amt" style="font-size:17px">${t.price ? som(t.price) + " so'm" : "Bepul"}</span><div style="display:flex;gap:8px;margin-top:10px"><button data-a="p" type="button" style="${BT}background:#e8edfb;color:#2440d6">Narxi</button><button data-a="d" type="button" style="${BT}background:#fde4e5;color:#b3262b">O'chirish</button></div></div>`).join("") : '<div class="empty" style="margin-top:20px"><div>🔍</div><b>Topilmadi</b></div>';
    }catch(e){ list.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; }
  };
  body.querySelector("#tq").oninput = () => { clearTimeout(T); T = setTimeout(load, 450); };
  list.onclick = async e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const c = b.closest(".pc"), code = c.dataset.c, a = b.dataset.a;
    if(a === "p"){
      if(c.querySelector(".pe")) return;
      const row = document.createElement("div"); row.className = "pe"; row.style.cssText = "display:flex;gap:8px;margin-top:10px";
      row.innerHTML = `<input type="number" inputmode="numeric" placeholder="Yangi narx (0 = bepul)" style="${IN}flex:2;min-width:0;padding:10px"><button data-a="s" type="button" style="${BT}background:#2440d6;color:#fff">Saqlash</button>`;
      c.appendChild(row);
    }else if(a === "s"){
      const v = parseInt(c.querySelector(".pe input").value, 10);
      if(isNaN(v) || v < 0){ toast("Narxni yozing"); return; }
      try{ await call("/api/admin/test_price", {code, price: v}); toast("Saqlandi"); load(); }catch(x){ toast("Saqlab bo'lmadi"); }
    }else if(a === "d"){
      const go = async () => { try{ await call("/api/admin/test_del", {code}); toast("O'chirildi"); load(); }catch(x){ toast(String(x.message).includes("409") ? "Ishlagan testni o'chirib bo'lmaydi" : "O'chirib bo'lmadi"); } };
      if(tg && tg.showConfirm) tg.showConfirm(code + "-test o'chirilsinmi?", ok => { if(ok) go(); }); else go();
    }
  };
  load();
}
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.tests = testsScreen;
})();
    
