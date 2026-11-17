(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const som = n => Number(n || 0).toLocaleString("ru-RU");
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:300;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2800); };
const tg = window.Telegram && Telegram.WebApp;
const ask = (m, f) => { if(tg && tg.showConfirm) tg.showConfirm(m, ok => { if(ok) f(); }); else f(); };
document.head.insertAdjacentHTML("beforeend", "<style>.mps{display:flex;background:#e8edfb;border-radius:16px;padding:4px;gap:4px;margin:0 16px 12px}.mps button{flex:1;border:0;border-radius:12px;padding:12px 4px;background:transparent;color:#6b7699;font:800 15px system-ui,sans-serif;cursor:pointer}.mps button.on{background:#fff;color:#2440d6;box-shadow:0 2px 8px rgba(36,64,214,.15)}.adm2 .pmf label{display:block;margin:14px 2px 6px;font-weight:700;font-size:13.5px;color:#6b7699}.adm2 .pmf select,.adm2 .pmf textarea{width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:13px;font:600 15.5px system-ui,sans-serif;color:#0f1a4d}.adm2 .pmf textarea{min-height:120px;resize:vertical}.adm2 .pch{display:flex;gap:8px;flex-wrap:wrap}.adm2 .pch button{border:1.5px solid #dfe5f6;background:#fff;color:#0f1a4d;border-radius:999px;padding:11px 16px;font:800 14.5px system-ui,sans-serif;cursor:pointer}.adm2 .pch button.on{background:#2440d6;border-color:#2440d6;color:#fff}.adm2 .pbt{display:flex;align-items:center;justify-content:center;width:100%;height:52px;margin-top:10px;border:0;border-radius:16px;background:#2440d6;color:#fff;font:800 16px system-ui,sans-serif;cursor:pointer}.adm2 .pbt.s{background:#e8edfb;color:#2440d6}.adm2 .pbt[disabled]{opacity:.5}.adm2 .cnt{margin-top:12px;padding:12px;border-radius:14px;background:#eef6ff;color:#1f4fa8;font-weight:800;font-size:14.5px;text-align:center}</style>");
function shell(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = `<div class="ah"><button class="ab" type="button" aria-label="Orqaga">‹</button><div><b>${title}</b><small>${note || ""}</small></div></div><div class="body"></div>`;
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d;
}
function addSwitch(ov, cur, open){
  const ah = ov.querySelector(".ah"); if(!ah || ov.querySelector(".mps")) return;
  const s = document.createElement("div"); s.className = "mps";
  s.innerHTML = `<button type="button" data-m="mock" class="${cur === "mock" ? "on" : ""}">Mock</button><button type="button" data-m="past" class="${cur === "past" ? "on" : ""}">Tushgan savol</button>`;
  s.onclick = e => { const b = e.target.closest("button"); if(!b || b.dataset.m === cur) return; ov.remove(); open(b.dataset.m); };
  ah.after(s);
}
const origMsg = window.ADMIN_SECTIONS.msg, origRes = window.ADMIN_SECTIONS.res;
function openMsg(m){
  if(m === "past") return pastMsg();
  origMsg(); const ov = [...document.querySelectorAll(".adm2")].pop(); addSwitch(ov, "mock", openMsg);
}
function openRes(m){
  if(m === "past") return pastRes();
  origRes(); const ov = [...document.querySelectorAll(".adm2")].pop(); addSwitch(ov, "mock", openRes);
}
async function papers(){ return (await call("/api/admin/pm_list", {})).papers; }
const defText = t => "📚 {ism}, yangi tushgan savol qo'shildi: " + t + ". Hozir ko'ring va tayyorlaning!";
async function pastMsg(){
  const ov = shell("Xabar yuborish", "Tushgan savol bo'yicha"); addSwitch(ov, "past", openMsg);
  const body = ov.querySelector(".body"); body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let list; try{ list = await papers(); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  if(!list.length){ body.innerHTML = '<div class="empty"><div>📭</div><b>Tushgan savol yo\'q</b></div>'; return; }
  let who = "notbought", cur = list[0], T;
  body.innerHTML = `<div class="pmf"><label>Tushgan savol</label><select id="ps">${list.map(p => `<option value="${p.id}">${esc(p.title)} · ${esc(p.subject)}</option>`).join("")}</select><label>Kimga</label><div class="pch" id="pw"><button data-w="notbought" class="on" type="button">Olmaganlarga</button><button data-w="all" type="button">Hammaga</button><button data-w="bought" type="button">Olganlarga</button></div><label>Xabar matni · {ism} ismini qo'yadi</label><textarea id="pt" maxlength="1000"></textarea><div class="cnt" id="pc">Hisoblanmoqda...</div><button class="pbt s" id="pself" type="button">Avval o'zimga yuborish</button><button class="pbt" id="psend" type="button">Yuborish</button></div>`;
  const q = s => body.querySelector(s), txt = q("#pt");
  txt.value = defText(cur.title);
  const count = async () => { try{ const r = await call("/api/admin/pm_send", {id: cur.id, who, mode: "count"}); q("#pc").textContent = "Xabar boradi: " + som(r.count) + " ta foydalanuvchiga"; }catch(e){ q("#pc").textContent = "Sanab bo'lmadi"; } };
  q("#ps").onchange = e => { const old = defText(cur.title); cur = list.find(p => p.id === +e.target.value); if(txt.value === old) txt.value = defText(cur.title); count(); };
  q("#pw").onclick = e => { const b = e.target.closest("[data-w]"); if(!b) return; who = b.dataset.w; q("#pw").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); clearTimeout(T); T = setTimeout(count, 200); };
  q("#pself").onclick = async () => { try{ await call("/api/admin/pm_send", {id: cur.id, who, mode: "self", text: txt.value}); toast("O'zingizga yuborildi"); }catch(e){ toast("Yuborib bo'lmadi"); } };
  q("#psend").onclick = () => ask("Xabar hamma tanlanganlarga yuborilsinmi?", async () => { const b = q("#psend"); b.disabled = true; try{ const r = await call("/api/admin/pm_send", {id: cur.id, who, mode: "send", text: txt.value}); toast(som(r.count) + " ta odamga yuborilmoqda"); }catch(e){ toast("Yuborib bo'lmadi"); } b.disabled = false; });
  count();
}
async function pastRes(){
  const ov = shell("Natija e'loni", "Tushgan savollarni yuborish"); addSwitch(ov, "past", openRes);
  const body = ov.querySelector(".body"); body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let list; try{ list = await papers(); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  body.innerHTML = '<p class="sub" style="margin:0 2px 10px">Tanlangan tushgan savol haqida hamma foydalanuvchiga xabar va ochish tugmasi boradi.</p>' + (list.length ? list.map(p => `<div class="pc" data-id="${p.id}" data-t="${esc(p.title)}"><b>${esc(p.title)}</b><small style="display:block;color:var(--muted);margin:2px 0 8px">${esc(p.subject)} · ${p.price ? som(p.price) + " so'm" : "Bepul"}</small><button class="pbt" data-a="1" type="button" style="margin-top:0;height:46px">Hammaga yuborish</button></div>`).join("") : '<div class="empty"><div>📭</div><b>Tushgan savol yo\'q</b></div>');
  body.onclick = e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const c = b.closest(".pc");
    ask(c.dataset.t + " haqida hamma foydalanuvchiga xabar yuborilsinmi?", async () => { b.disabled = true; try{ const r = await call("/api/admin/pm_send", {id: +c.dataset.id, who: "all", mode: "send", text: defText(c.dataset.t)}); toast(som(r.count) + " ta odamga yuborilmoqda"); }catch(x){ toast("Yuborib bo'lmadi"); } b.disabled = false; });
  };
}
window.ADMIN_SECTIONS.msg = () => openMsg("mock");
window.ADMIN_SECTIONS.res = () => openRes("mock");
})();
  
