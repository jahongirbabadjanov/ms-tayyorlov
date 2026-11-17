(function(){
function sub(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = `<div class="ah"><button class="ab" type="button" aria-label="Orqaga">‹</button><div><b>${title}</b><small>${note || ""}</small></div></div><div class="body"></div>`;
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d.querySelector(".body");
}
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:300;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); };
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.head.insertAdjacentHTML("beforeend", "<style>.adm2 .sw{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:20px;padding:16px;margin-bottom:10px}.adm2 .sw .tx{flex:1}.adm2 .sw .tx b{display:block;font-size:16px;color:var(--text)}.adm2 .sw .tx small{display:block;margin-top:3px;color:var(--muted);font-size:13px;line-height:1.35}.adm2 .tg{flex:none;width:54px;height:32px;border:0;border-radius:16px;background:#cfd6ea;position:relative;cursor:pointer;transition:background .2s}.adm2 .tg::after{content:'';position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.25);transition:left .2s}.adm2 .tg.on{background:#1fa463}.adm2 .tg.on::after{left:25px}.adm2 .sf{background:#fff;border:1px solid var(--line);border-radius:20px;padding:14px;margin-bottom:10px}.adm2 .sf label{display:block;margin:10px 2px 5px;font-weight:700;font-size:13.5px;color:var(--muted)}.adm2 .sf label:first-child{margin-top:0}.adm2 .sf input{width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:12px;padding:12px;font:600 15.5px system-ui,sans-serif;color:#0f1a4d}.adm2 .sbtn{display:flex;align-items:center;justify-content:center;width:100%;height:50px;margin-top:12px;border:0;border-radius:14px;background:#2440d6;color:#fff;font:800 15.5px system-ui,sans-serif;cursor:pointer}.adm2 .meter{height:12px;border-radius:6px;background:#e8edfb;overflow:hidden;margin-top:10px}.adm2 .meter i{display:block;height:100%;background:#1fa463;border-radius:6px}</style>");
const FIELDS = [
  {k: "card", t: "Karta raqami", ph: "8600 0000 0000 0000", mode: "numeric"},
  {k: "min_topup", t: "Hisobni to'ldirish: eng kam summa (so'm)", mode: "numeric"},
  {k: "max_topup", t: "Hisobni to'ldirish: eng ko'p summa (so'm)", mode: "numeric"},
  {k: "min_withdraw", t: "Pul yechish: eng kam summa (so'm)", mode: "numeric"},
  {k: "ref_bonus", t: "Referal bonusi (so'm)", mode: "numeric"},
  {k: "channel", t: "Kanal havolasi («Test tahlil» tugmasi uchun)", ph: "https://t.me/kanal_nomi", mode: "url", empty: true},
  {k: "channel_chat", t: "Natija hisoboti yuboriladigan kanal (ixtiyoriy)", ph: "@kanal_nomi", mode: "text", empty: true}
];
const gb = n => n >= 1073741824 ? (n / 1073741824).toFixed(2).replace(".", ",") + " GB" : (n / 1048576).toFixed(1).replace(".", ",") + " MB";
async function setScreen(){
  const body = sub("Sozlamalar", "Bot va to'lovlar");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let cur;
  try{ cur = (await call("/api/admin/settings", {})).settings; }
  catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  body.innerHTML = `<div class="sw"><div class="tx"><b>Yangi test e'loni</b><small>Yangi mock test yuklanganda hamma foydalanuvchiga bot orqali xabar yuboriladi. O'chiq bo'lsa, xabarni «Xabar yuborish» bo'limidan o'zingiz yuborasiz.</small></div><button class="tg${cur.auto_announce === "1" ? " on" : ""}" data-k="auto_announce" type="button" aria-label="Yangi test e'loni"></button></div>`
    + `<div class="sf">${FIELDS.map(f => `<label>${f.t}</label><input data-f="${f.k}" inputmode="${f.mode}" value="${esc(cur[f.k])}" placeholder="${f.ph || ""}">`).join("")}<button class="sbtn" id="ssave" type="button">Saqlash</button></div>`
    + '<div class="sf" id="sst"><label>Xotira (PDF fayllar)</label><small style="color:var(--muted)">Hisoblanmoqda...</small></div>';
  body.onclick = async e => {
    const b = e.target.closest(".tg");
    if(b){
      const v = b.classList.contains("on") ? "0" : "1";
      b.classList.toggle("on");
      try{ await call("/api/admin/set_setting", {key: b.dataset.k, value: v}); }
      catch(x){ b.classList.toggle("on"); toast("Saqlab bo'lmadi"); }
      return;
    }
    if(e.target.id === "ssave"){
      const btn = e.target; btn.disabled = true;
      let bad = 0;
      for(const f of FIELDS){
        const inp = body.querySelector(`[data-f="${f.k}"]`);
        const v = inp.value.trim();
        if(v === cur[f.k]) continue;
        if(v === "" && !f.empty){ bad++; continue; }
        try{ await call("/api/admin/set_setting", {key: f.k, value: v}); cur[f.k] = v; }catch(x){ bad++; inp.style.borderColor = "#b3262b"; }
      }
      btn.disabled = false;
      toast(bad ? bad + " ta maydon noto'g'ri. Raqamlar faqat raqam, kanal havolasi https://t.me/... bo'lsin" : "Saqlandi");
    }
  };
  try{
    const s = await call("/api/admin/storage", {});
    const p = Math.min(100, Math.round(s.used / s.limit * 100));
    body.querySelector("#sst").innerHTML = `<label>Xotira (PDF fayllar)</label><b style="font-size:17px;color:#0f1a4d">${gb(s.used)}</b> <span style="color:var(--muted)">/ ${gb(s.limit)} · ${s.files} ta fayl</span><div class="meter"><i style="width:${Math.max(p, 1)}%;background:${p > 85 ? "#d6342d" : p > 60 ? "#e8a317" : "#1fa463"}"></i></div>`;
  }catch(e){ body.querySelector("#sst").innerHTML = '<label>Xotira</label><small style="color:var(--muted)">Hisoblab bo\'lmadi.</small>'; }
}
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.set = setScreen;
})();
