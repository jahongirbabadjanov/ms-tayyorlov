(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tgw = window.Telegram && Telegram.WebApp;
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2800); };
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".dmu{display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e3e8f8;border-radius:16px;padding:10px 12px;margin-bottom:8px}.dmu.on{border-color:#2440d6;background:#eef2ff}"
+ ".dmu i{width:38px;height:38px;border-radius:50%;background:linear-gradient(160deg,#6f8aff,#2440d6);color:#fff;display:grid;place-items:center;font-style:normal;font-weight:900}.dmu div{flex:1;min-width:0}.dmu b{display:block;font-size:15px}.dmu small{color:#7a84a8;font-size:12.5px}"
+ ".dmc{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.dmc button{border:0;border-radius:99px;background:#e8edfb;color:#2440d6;padding:8px 12px;font:800 12.5px system-ui,sans-serif}"
+ ".dmp{background:#0e1621;border-radius:18px;padding:14px;margin-top:10px}.dmp .m{background:#182533;color:#fff;border-radius:14px;padding:11px 13px;font-size:14.5px;line-height:1.5;white-space:pre-wrap}.dmp .k{margin-top:6px;background:#2b3d52;color:#8ec5ff;border-radius:10px;text-align:center;padding:9px;font-weight:700;font-size:13.5px}"
+ ".dmx{flex:none;border:0;background:#e8edfb;color:#2440d6;border-radius:12px;padding:0 14px;font:800 17px system-ui,sans-serif}"
+ "</style>");
const TPL = [["👋 Salom", "Assalomu alaykum, {ism}! "], ["💳 Balans to'ldirildi", "{ism}, balansingiz to'ldirildi ✅ Rahmat!"], ["🙏 Javob", "{ism}, savolingizga javob: "], ["🎁 Bonus", "{ism}, sizga bonus berildi 🎁"]];
function screen(t, n){
  const d = document.createElement("div"); d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>' + esc(t) + "</b><small>" + n + '</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove(); document.body.appendChild(d);
  return d.querySelector(".body");
}
function openDM(pre){
  const b = screen("Shaxsga xabar", "Bitta foydalanuvchiga");
  let U = pre || null, T = null, btn = "none";
  const draw = () => {
    b.innerHTML = '<div class="sf"><label>Kimga</label>' + (U
      ? '<div class="dmu on"><i>' + esc((U.name || "?")[0]) + '</i><div><b>' + esc(U.name) + "</b><small>ID " + U.id + '</small></div><button class="dmx" id="dmc" type="button">✕</button></div>'
      : '<input class="fi" id="dq" placeholder="Ism yoki Telegram ID" style="width:100%"><div id="dl" style="margin-top:8px"></div>') + "</div>"
    + (U ? '<div class="sf"><label>Xabar matni</label><div class="dmc">' + TPL.map((x, i) => '<button type="button" data-t="' + i + '">' + x[0] + "</button>").join("") + '</div><textarea id="dt" class="fi" rows="5" style="width:100%" placeholder="Xabar yozing. {ism} o\'rniga ism qo\'yiladi">' + esc(b.dataset.txt || "") + '</textarea>'
      + '<label>Tugma</label><div class="dmc" id="db">' + [["none", "Tugmasiz"], ["open", "🚀 Ilovani ochish"], ["balance", "💳 Balansni ko'rish"]].map(x => '<button type="button" data-b="' + x[0] + '" style="' + (btn === x[0] ? "background:#2440d6;color:#fff" : "") + '">' + x[1] + "</button>").join("") + "</div>"
      + '<div class="dmp"><div class="m" id="dv"></div><div class="k" id="dk"></div></div></div><button class="sbtn" id="ds" type="button">✉️ Yuborish</button>' : "");
    const q = s => b.querySelector(s);
    if(!U){
      const load = async () => {
        try{
          const r = await call("/api/admin/users", {q: q("#dq").value});
          T = {}; r.users.forEach(u => T[u.telegram_id] = u);
          q("#dl").innerHTML = r.users.slice(0, 20).map(u => { const n = ((u.first_name || "") + " " + (u.last_name || "")).trim(); return '<div class="dmu" data-u="' + u.telegram_id + '"><i>' + esc((n || "?")[0]) + "</i><div><b>" + esc(n) + "</b><small>" + esc(u.region || "—") + " · ID " + u.telegram_id + "</small></div></div>"; }).join("") || '<p class="sub">Topilmadi</p>';
        }catch(e){ q("#dl").innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; }
      };
      let tm; q("#dq").oninput = () => { clearTimeout(tm); tm = setTimeout(load, 400); };
      q("#dl").onclick = e => { const c = e.target.closest("[data-u]"); if(!c) return; const u = T[c.dataset.u]; U = {id: u.telegram_id, name: ((u.first_name || "") + " " + (u.last_name || "")).trim() || "Foydalanuvchi", first: u.first_name}; draw(); };
      load(); return;
    }
    q("#dmc").onclick = () => { if(!pre){ U = null; draw(); } };
    const pv = () => { b.dataset.txt = q("#dt").value; q("#dv").textContent = q("#dt").value.replace(/\{ism\}/g, U.first || U.name.split(" ")[0]) || "Xabar matni shu yerda ko'rinadi"; q("#dk").style.display = btn === "none" ? "none" : ""; q("#dk").textContent = btn === "open" ? "🚀 Ilovani ochish" : "💳 Balansni ko'rish"; };
    q("#dt").oninput = pv; pv();
    b.querySelectorAll("[data-t]").forEach(x => x.onclick = () => { q("#dt").value = TPL[+x.dataset.t][1]; pv(); q("#dt").focus(); });
    b.querySelectorAll("[data-b]").forEach(x => x.onclick = () => { b.dataset.txt = q("#dt").value; btn = x.dataset.b; draw(); });
    q("#ds").onclick = () => {
      const text = q("#dt").value.trim(); if(!text){ toast("Xabar yozing"); return; }
      const go = async () => {
        q("#ds").disabled = true;
        try{ await call("/api/admin/dm", {id: U.id, text, btn}); toast("Yuborildi ✅ " + U.name); b.closest(".adm2").remove(); }
        catch(e){ toast(String(e.message).includes("502") ? "Yuborilmadi: foydalanuvchi botni bloklagan" : "Yuborib bo'lmadi"); q("#ds").disabled = false; }
      };
      const m = U.name + " ga xabar yuborilsinmi?";
      if(tgw && tgw.showConfirm) tgw.showConfirm(m, ok => { if(ok) go(); }); else go();
    };
  };
  draw();
}
function mark(){
  document.querySelectorAll(".adm2").forEach(a => {
    const h = a.querySelector(".ah b"); if(!h) return;
    if(h.textContent === "Xabar yuborish"){
      const seg = a.querySelector(".seg");
      if(seg && !seg.querySelector("[data-dm]")){ const d = document.createElement("div"); d.dataset.dm = "1"; d.textContent = "Shaxsga"; seg.appendChild(d); }
    }
    if(h.textContent === "Foydalanuvchilar"){
      a.querySelectorAll(".pc[data-id] .pr2").forEach(r => {
        if(r.querySelector(".dmb")) return;
        const x = document.createElement("button"); x.type = "button"; x.className = "dmb"; x.textContent = "✉️";
        x.style.cssText = "flex:1;border:0;border-radius:12px;background:#e8edfb;color:#2440d6;font:800 18px system-ui,sans-serif";
        r.appendChild(x);
      });
    }
  });
}
document.addEventListener("click", e => {
  if(e.target.closest("[data-dm]")){ e.stopPropagation(); openDM(null); return; }
  const x = e.target.closest(".dmb"); if(!x) return;
  e.stopPropagation();
  const c = x.closest(".pc"), n = c.querySelector(".pm b").textContent.trim();
  openDM({id: +c.dataset.id, name: n || "Foydalanuvchi", first: n.split(" ")[0]});
}, true);
new MutationObserver(mark).observe(document.body, {childList: true, subtree: true});
})();
      
