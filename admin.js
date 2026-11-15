(function(){
const S = (b, s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const SEC = [
  {k:"users", n:"Foydalanuvchilar", c:"#2440d6", p:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.9.2 5 2.3 5 5.3"/>'},
  {k:"pay", n:"To'lovlar", c:"#1f9d55", p:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10.5h18"/><path d="M7 15.5h3"/>'},
  {k:"msg", n:"Xabar yuborish", c:"#0e8fc7", p:'<path d="M21 4L3 11l7 3 3 7 8-17Z"/><path d="M10 14l11-10"/>'},
  {k:"tests", n:"Testlar", c:"#7a45d6", p:'<path d="M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2"/><rect x="8" y="3" width="8" height="4" rx="1.2"/><path d="M9 14l2 2 4-4"/>'},
  {k:"past", n:"Tushgan savollar", c:"#d62f8f", p:'<path d="M4 7l8-4 8 4-8 4-8-4Z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>'},
  {k:"cart", n:"Savatcha", c:"#e0652b", p:'<path d="M3 4h2.5l2 11h10.5l2-8H7"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>'},
  {k:"ref", n:"Referallar", c:"#0f9f7a", p:'<path d="M20 12v8H4v-8"/><rect x="2" y="7" width="20" height="5" rx="1.5"/><path d="M12 7v13"/><path d="M12 7c-2.5 0-4.5-.8-4.5-2.6C7.5 3 9 2.6 10 3.4 11.2 4.4 12 7 12 7Zm0 0c2.5 0 4.5-.8 4.5-2.6C16.5 3 15 2.6 14 3.4 12.8 4.4 12 7 12 7Z"/>'},
  {k:"wd", n:"Yechib olish", c:"#c27a10", p:'<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/>'},
  {k:"stk", n:"Stikerlar", c:"#d6455d", p:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>'},
  {k:"set", n:"Sozlamalar", c:"#5a6a99", p:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 7.2l2.6 1.5M17.2 15.3l2.6 1.5M4.2 16.8l2.6-1.5M17.2 8.7l2.6-1.5"/>'}
];
const jl = (c, p, size, s) => `<span class="jl" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * .3)}px;background:linear-gradient(160deg,${c}ee,${c} 45%,${c}bb);box-shadow:0 8px 14px ${c}55,inset 0 -4px 7px rgba(0,0,0,.22),inset 0 1.5px 1px rgba(255,255,255,.7)"><span class="jg"></span><span class="ji">${S(p, s)}</span></span>`;
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".jl{position:relative;display:grid;place-items:center;flex:none;color:#fff}"
+ ".jl .jg{position:absolute;left:3px;right:3px;top:3px;height:48%;border-radius:12px 12px 60% 60%/12px 12px 28% 28%;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.04));pointer-events:none}"
+ ".jl .ji{position:relative;display:grid;filter:drop-shadow(0 2px 2px rgba(0,0,0,.28))}"
+ ".adm{position:fixed;inset:0;z-index:60;background:linear-gradient(#f3f6ff,#fbf3ea);overflow:auto;padding:14px 16px 40px}"
+ ".adm .ah{display:flex;align-items:center;gap:12px;margin-bottom:12px}.adm .ah b{font-size:21px;color:var(--text)}.adm .ah small{display:block;color:var(--muted);font-size:13px}"
+ ".adm .ab{width:44px;height:44px;border-radius:14px;border:0;background:#e8edfb;color:#2440d6;font:700 22px system-ui,sans-serif;cursor:pointer}"
+ ".adm .st{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}"
+ ".adm .st div{background:#fff;border:1px solid var(--line);border-radius:16px;padding:10px 12px;box-shadow:0 4px 12px rgba(36,64,214,.06)}"
+ ".adm .st b{display:block;font-size:19px;color:var(--text)}.adm .st small{color:var(--muted);font-size:12px}"
+ ".adm .st div.al{background:#fff1cc;border-color:#f3d98a}"
+ ".adm .gr{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}"
+ ".adm .tl{border:1px solid var(--line);background:#fff;border-radius:22px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;font:800 14px system-ui,sans-serif;color:var(--text);cursor:pointer;box-shadow:0 6px 16px rgba(36,64,214,.08);position:relative}"
+ ".adm .tl em{position:absolute;top:8px;right:10px;min-width:22px;height:22px;border-radius:99px;background:#e5484d;color:#fff;font:800 12px system-ui,sans-serif;display:grid;place-items:center;font-style:normal;padding:0 6px}"
+ "</style>");
const som = n => n == null ? "—" : Number(n).toLocaleString("ru-RU");
let busy = false;
function toastA(m){ const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:99;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function openPanel(){
  if(busy || document.getElementById("adm")) return;
  busy = true;
  let s;
  try{ s = await call("/api/admin/stats", {}); }
  catch(e){ busy = false; return; }
  busy = false;
  const d = document.createElement("div");
  d.className = "adm"; d.id = "adm";
  const name = (ME && ME.first_name) || "";
  d.innerHTML = `<div class="ah"><button class="ab" id="admx" type="button" aria-label="Orqaga">‹</button><div><b>Admin panel</b><small>Salom, admin ${name ? name : ""}</small></div></div>`
    + `<div class="st"><div><b>${som(s.users)}</b><small>foydalanuvchi${s.new_today != null ? " · bugun +" + s.new_today : ""}</small></div>`
    + `<div><b>${som(s.income_today)}</b><small>bugungi tushum, so'm</small></div>`
    + `<div><b>${som(s.balance)}</b><small>hisoblardagi jami, so'm</small></div>`
    + `<div><b>${som(s.ref_balance)}</b><small>referal summasi, so'm</small></div></div>`
    + `<div class="gr">` + SEC.map(x => `<button class="tl" type="button" data-k="${x.k}">${x.k === "pay" && s.pending ? "<em>" + s.pending + "</em>" : ""}${jl(x.c, x.p, 54, 28)}<span>${x.n}</span></button>`).join("") + `</div>`;
  document.body.appendChild(d);
  d.querySelector("#admx").onclick = () => d.remove();
  d.addEventListener("click", e => {
    const b = e.target.closest(".tl"); if(!b) return;
    const h = window.ADMIN_SECTIONS && window.ADMIN_SECTIONS[b.dataset.k];
    if(h) h(d, s); else toastA("Bu bo'lim tez orada qo'shiladi");
  });
}
document.addEventListener("click", e => {
  if(e.target.closest(".hello")) openPanel();
});
})();
                     
