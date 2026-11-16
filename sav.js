(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:300;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const MAXB = 15 * 1024 * 1024;
const fsz = n => n > 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
const IN = "background:#fff;border:1.5px solid #dfe5f6;border-radius:12px;padding:10px;font:600 14.5px system-ui,sans-serif;color:#0f1a4d;min-width:0;";
const guess = n => { const l = n.toLowerCase(); const k = [["matem","Matematika"],["fizik","Fizika"],["kimyo","Kimyo"],["biolog","Biologiya"],["geograf","Geografiya"],["tarix","Tarix"],["ingliz","Ingliz tili"],["ona","Ona tili va adabiyot"]]; for(const [a,b] of k) if(l.includes(a) && SUBJECTS.includes(b)) return b; return SUBJECTS[0]; };
const rd = f => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(f); });
function open(){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>Ko\'p fayl yuklash</b><small>Tushgan savollar</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  const body = d.querySelector(".body");
  let items = [], busy = false, notify = false, when = "";
  const draw = () => {
    body.innerHTML = `<input type="file" id="sf" accept="application/pdf" multiple style="display:none"><button id="spick" type="button" class="big2" style="margin-top:0;display:flex;align-items:center;justify-content:center;width:100%;height:54px;border:0;border-radius:16px;background:#2440d6;color:#fff;font:800 16px system-ui,sans-serif">＋ PDF fayllarni tanlash</button>`
    + (items.length ? `<div style="display:flex;gap:8px;margin-top:12px"><input id="sall" type="number" inputmode="numeric" placeholder="Hammasiga narx" style="${IN}flex:1"><button id="sapp" type="button" style="border:0;border-radius:12px;background:#e8edfb;color:#2440d6;font:800 14px system-ui,sans-serif;padding:0 14px">Qo'llash</button></div>` : "")
    + items.map((x, i) => `<div class="pc" data-i="${i}"><div style="display:flex;gap:8px;align-items:center"><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(x.f.name)}</b><small style="color:${x.st === "ok" ? "#1a8a4a" : x.st === "err" ? "#b3262b" : "var(--muted)"};font-weight:700;white-space:nowrap">${x.st === "ok" ? "✅ Yuklandi" : x.st === "err" ? "❌ " + esc(x.msg) : x.st === "up" ? "⏳ Yuklanmoqda" : fsz(x.f.size)}</small></div>`
      + (x.st === "ok" ? "" : `<input data-k="title" value="${esc(x.title)}" placeholder="Nomi" style="${IN}width:100%;margin-top:8px"><div style="display:flex;gap:8px;margin-top:8px"><select data-k="subject" style="${IN}flex:2">${SUBJECTS.map(s => `<option${s === x.subject ? " selected" : ""}>${esc(s)}</option>`).join("")}</select><input data-k="price" type="number" inputmode="numeric" value="${x.price}" placeholder="Narx" style="${IN}flex:1"></div>`) + "</div>").join("")
    + (items.some(x => x.st !== "ok") ? `<label style="display:block;margin:8px 2px 4px;font:700 13.5px system-ui,sans-serif;color:#6b7699">Nashr vaqti (bo'sh = hozir)</label><input id="swh" type="datetime-local" value="${esc(when)}" style="${IN}width:100%;margin-bottom:6px"><label style="display:flex;align-items:center;gap:10px;margin:6px 2px 10px;font:600 14.5px system-ui,sans-serif;color:#0f1a4d"><input id="snt" type="checkbox"${notify ? " checked" : ""} style="width:20px;height:20px">Yuklangach hammaga bitta xabar yuborish</label><button id="sgo" type="button" ${busy ? "disabled" : ""} style="display:flex;align-items:center;justify-content:center;width:100%;height:54px;margin-top:6px;border:0;border-radius:16px;background:#1fa463;color:#fff;font:800 16px system-ui,sans-serif;opacity:${busy ? .5 : 1}">${items.some(x => x.st === "err") ? "Xatolarni qayta yuborish" : "Hammasini yuklash (" + items.filter(x => x.st !== "ok").length + ")"}</button>` : "");
    const q = s => body.querySelector(s);
    q("#spick").onclick = () => q("#sf").click();
    q("#sf").onchange = e => {
      let big = 0;
      [...e.target.files].forEach(f => { if(f.size > MAXB){ big++; return; } items.push({f, title: f.name.replace(/\.pdf$/i, "").replace(/[_]+/g, " "), subject: guess(f.name), price: 0, st: "", msg: ""}); });
      if(big) toast(big + " ta fayl 15 MB dan katta, o'tkazib yuborildi");
      draw();
    };
    if(q("#sapp")) q("#sapp").onclick = () => { const v = parseInt(q("#sall").value, 10); if(isNaN(v) || v < 0) return; items.forEach(x => { if(x.st !== "ok") x.price = v; }); draw(); };
    if(q("#swh")) q("#swh").onchange = e => { when = e.target.value; };
    if(q("#snt")) q("#snt").onchange = e => { notify = e.target.checked; };
    if(q("#sgo")) q("#sgo").onclick = go;
  };
  body.addEventListener("input", e => { const c = e.target.closest(".pc"); if(!c || !e.target.dataset.k) return; const x = items[+c.dataset.i]; x[e.target.dataset.k] = e.target.dataset.k === "price" ? (parseInt(e.target.value, 10) || 0) : e.target.value; });
  async function go(){
    if(busy) return;
    let iso = "";
    if(when){ const dd = new Date(when); if(isNaN(dd) || dd.getTime() < Date.now() + 60000){ toast("Nashr vaqti kelajakda bo'lishi kerak"); return; } iso = dd.toISOString(); }
    busy = true;
    for(const x of items){
      if(x.st === "ok") continue;
      if(!x.title.trim()){ x.st = "err"; x.msg = "Nomi yo'q"; continue; }
      x.st = "up"; draw();
      try{
        const data = await rd(x.f);
        await call("/api/papers/create", {subject: x.subject, title: x.title.trim(), price: x.price, test_code: "", data, publish_at: iso});
        x.st = "ok";
      }catch(e){ x.st = "err"; x.msg = "Qayta urinib ko'ring"; }
    }
    busy = false; draw();
    const n = items.filter(x => x.st === "ok").length;
    toast(n + " / " + items.length + " ta yuklandi");
    if(notify && n > 0 && !items.some(x => x.st === "err")){
      notify = false;
      try{ await call("/api/admin/sav_notify", {n, at: iso, titles: items.filter(x => x.st === "ok").map(x => x.title)}); toast(iso ? "Xabar vaqtida yuboriladi" : "Xabar yuborilmoqda..."); }catch(e){ toast("Xabarni yuborib bo'lmadi"); }
    }
  }
  draw();
}
const prev = (window.ADMIN_SECTIONS || {}).past;
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.past = function(){
  if(prev) prev();
  let n = 0;
  const t = setInterval(() => {
    const b = document.querySelector("#pnew");
    if(b && !document.querySelector("#pmulti")){
      const m = document.createElement("button");
      m.id = "pmulti"; m.type = "button"; m.textContent = "📦 Ko'p fayl yuklash";
      m.style.cssText = "display:flex;align-items:center;justify-content:center;width:100%;height:50px;margin-top:10px;border:0;border-radius:16px;background:#e8edfb;color:#2440d6;font:800 15.5px system-ui,sans-serif";
      m.onclick = open;
      b.after(m); clearInterval(t);
    }
    if(++n > 20) clearInterval(t);
  }, 150);
};
})();
  
