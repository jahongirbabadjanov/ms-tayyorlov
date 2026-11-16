(function(){
function sub(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = `<div class="ah"><button class="ab" type="button" aria-label="Orqaga">‹</button><div><b>${title}</b><small>${note || ""}</small></div></div><div class="body"></div>`;
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d.querySelector(".body");
}
document.head.insertAdjacentHTML("beforeend", "<style>.adm2 .sw{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:20px;padding:16px;margin-bottom:10px}.adm2 .sw .tx{flex:1}.adm2 .sw .tx b{display:block;font-size:16px;color:var(--text)}.adm2 .sw .tx small{display:block;margin-top:3px;color:var(--muted);font-size:13px;line-height:1.35}.adm2 .tg{flex:none;width:54px;height:32px;border:0;border-radius:16px;background:#cfd6ea;position:relative;cursor:pointer;transition:background .2s}.adm2 .tg::after{content:'';position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.25);transition:left .2s}.adm2 .tg.on{background:#1fa463}.adm2 .tg.on::after{left:25px}</style>");
const ITEMS = [
  {k: "auto_announce", t: "Yangi test e'loni", d: "Yangi mock test yuklanganda hamma foydalanuvchiga bot orqali xabar yuboriladi. O'chiq bo'lsa, xabarni «Xabar yuborish» bo'limidan o'zingiz yuborasiz."}
];
async function setScreen(){
  const body = sub("Sozlamalar", "Bot xatti-harakati");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let cur;
  try{ cur = (await call("/api/admin/settings", {})).settings; }
  catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  body.innerHTML = ITEMS.map(i => `<div class="sw"><div class="tx"><b>${i.t}</b><small>${i.d}</small></div><button class="tg${cur[i.k] === "1" ? " on" : ""}" data-k="${i.k}" type="button" aria-label="${i.t}"></button></div>`).join("");
  body.onclick = async e => {
    const b = e.target.closest(".tg"); if(!b) return;
    const v = b.classList.contains("on") ? "0" : "1";
    b.classList.toggle("on");
    try{ await call("/api/admin/set_setting", {key: b.dataset.k, value: v}); }
    catch(x){ b.classList.toggle("on"); }
  };
}
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.set = setScreen;
})();
