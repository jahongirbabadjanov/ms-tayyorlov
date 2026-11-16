(function(){
const S = (b, s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const SEC = [
  {k:"tests", n:"Testlar", c:"#7a45d6", p:'<path d="M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2"/><rect x="8" y="3" width="8" height="4" rx="1.2"/><path d="M9 14l2 2 4-4"/>', sub: s => (s.tests || 0) + " ta · yaratish, narx"},
  {k:"past", n:"Tushgan savollar", c:"#d62f8f", p:'<path d="M4 7l8-4 8 4-8 4-8-4Z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>', sub: s => (s.papers || 0) + " ta · bepul/pullik"},
  {k:"pay", n:"To'lovlar", c:"#1f9d55", p:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10.5h18"/><path d="M7 15.5h3"/>', sub: () => "Cheklarni tasdiqlash", badge: s => s.pending_topup},
  {k:"wd", n:"Yechib olish", c:"#c27a10", p:'<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/>', sub: () => "So'rovlar", badge: s => s.pending_withdraw},
  {k:"users", n:"Foydalanuvchilar", c:"#2440d6", p:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.9.2 5 2.3 5 5.3"/>', sub: () => "Qidirish · balans"},
  {k:"ref", n:"Referallar", c:"#0f9f7a", p:'<path d="M20 12v8H4v-8"/><rect x="2" y="7" width="20" height="5" rx="1.5"/><path d="M12 7v13"/><path d="M12 7c-2.5 0-4.5-.8-4.5-2.6C7.5 3 9 2.6 10 3.4 11.2 4.4 12 7 12 7Zm0 0c2.5 0 4.5-.8 4.5-2.6C16.5 3 15 2.6 14 3.4 12.8 4.4 12 7 12 7Z"/>', sub: () => "Eng faollar"},
  {k:"msg", n:"Xabar yuborish", c:"#0e8fc7", p:'<path d="M21 4L3 11l7 3 3 7 8-17Z"/><path d="M10 14l11-10"/>', sub: () => "Test belgilab, ommaviy"},
  {k:"res", n:"Natija e'loni", c:"#e0a010", p:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v1a3 3 0 0 0 3 3M16 6h4v1a3 3 0 0 1-3 3"/><path d="M12 13v4M8 20h8M10 17h4"/>', sub: () => "Test tugagach"},
  {k:"stk", n:"Stikerlar", c:"#d6455d", p:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>', sub: () => "Fanlar uchun"},
  {k:"set", n:"Sozlamalar", c:"#5a6a99", p:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 7.2l2.6 1.5M17.2 15.3l2.6 1.5M4.2 16.8l2.6-1.5M17.2 8.7l2.6-1.5"/>', sub: () => "Karta · limitlar"}
];
const jl = (c, p, size, s) => `<span class="jl" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * .3)}px;background:linear-gradient(160deg,${c}ee,${c} 45%,${c}bb);box-shadow:0 8px 14px ${c}55,inset 0 -4px 7px rgba(0,0,0,.22),inset 0 1.5px 1px rgba(255,255,255,.7)"><span class="jg"></span><span class="ji">${S(p, s)}</span></span>`;
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".jl{position:relative;display:grid;place-items:center;flex:none;color:#fff}"
+ ".jl .jg{position:absolute;left:3px;right:3px;top:3px;height:48%;border-radius:12px 12px 60% 60%/12px 12px 28% 28%;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.04));pointer-events:none}"
+ ".jl .ji{position:relative;display:grid;filter:drop-shadow(0 2px 2px rgba(0,0,0,.28))}"
+ ".adm{position:fixed;inset:0;z-index:60;background:linear-gradient(#f3f6ff,#fbf3ea);overflow:auto;padding:14px 16px 40px}"
+ ".adm .ah,.adm2 .ah{display:flex;align-items:center;gap:12px;margin-bottom:12px}.adm .ah b,.adm2 .ah b{font-size:21px;color:var(--text)}.adm .ah small,.adm2 .ah small{display:block;color:var(--muted);font-size:13px}"
+ ".adm .ab,.adm2 .ab{flex:none;width:44px;height:44px;border-radius:14px;border:0;background:#e8edfb;color:#2440d6;font:700 22px system-ui,sans-serif;cursor:pointer}"
+ ".adm .ah>div{flex:1;min-width:0}.adm .pill{flex:none;padding:8px 14px;border-radius:99px;background:#0f1a4d;color:#ffc629;font:900 13px system-ui,sans-serif;letter-spacing:.04em}"
+ ".adm .uc{position:relative;overflow:hidden;border-radius:26px;padding:16px;color:#fff;background:linear-gradient(150deg,#4b6bff,#2440d6 55%,#1a2fa8);box-shadow:0 14px 26px rgba(36,64,214,.33);margin-bottom:18px}.adm .uc .gl{position:absolute;left:4px;right:4px;top:4px;height:40%;border-radius:22px 22px 60% 60%/22px 22px 24% 24%;background:linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,.02));pointer-events:none}.adm .uc .in{position:relative}"
+ ".adm .uc .h1{display:flex;justify-content:space-between;align-items:center;font:700 14px system-ui,sans-serif;opacity:.95}.adm .uc .up{background:#38d17a;color:#053d1c;font:800 13px system-ui,sans-serif;padding:5px 11px;border-radius:99px;opacity:1;white-space:nowrap}"
+ ".adm .uc .h2{display:flex;align-items:flex-end;gap:12px;margin-top:2px}.adm .uc .h2 b{font-size:54px;line-height:1;font-weight:900}.adm .uc .sp{flex:1;display:flex;align-items:flex-end;gap:5px;height:48px}.adm .uc .sp i{flex:1;border-radius:6px 6px 3px 3px;background:rgba(255,255,255,.25);min-height:6px}.adm .uc .sp i:last-child{background:linear-gradient(#ffd966,#ff9a3d)}"
+ ".adm .uc .m3{display:flex;gap:8px;margin-top:12px}.adm .uc .m3 div{flex:1;background:rgba(255,255,255,.17);border:1px solid rgba(255,255,255,.28);border-radius:14px;padding:9px 10px;box-shadow:inset 0 1px 1px rgba(255,255,255,.25)}.adm .uc .m3 b{display:block;font-size:18px;white-space:nowrap}.adm .uc .m3 small{font-size:11.5px;opacity:.85}"
+ ".adm .big{display:flex;align-items:baseline;gap:10px;margin:8px 2px 12px}.adm .big b{font-size:46px;line-height:1;font-weight:900;color:var(--text);letter-spacing:-.02em}.adm .big span{color:var(--muted);font-size:17px;font-weight:600;flex:1}"
+ ".adm .big em{font-style:normal;background:#dff5e8;color:#1a8a4a;font:800 14px system-ui,sans-serif;padding:7px 11px;border-radius:99px;white-space:nowrap}"
+ ".adm .st3{display:flex;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-bottom:18px}.adm .st3 div{flex:1;padding:12px 12px 12px 0}.adm .st3 div+div{border-left:1px solid var(--line);padding-left:14px}.adm .st3 b{display:block;white-space:nowrap;font-size:21px;font-weight:900;color:var(--text)}.adm .st3 small{color:var(--muted);font-size:13px}"
+ ".adm .gr{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}"
+ ".adm .tl{border:1px solid var(--line);background:#fff;border-radius:26px;padding:14px;min-height:150px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;text-align:left;cursor:pointer;box-shadow:0 8px 20px rgba(36,64,214,.08);position:relative}"
+ ".adm .tl b{display:block;font:800 17px system-ui,sans-serif;color:var(--text)}.adm .tl small{display:block;margin-top:3px;font:600 13px system-ui,sans-serif;color:var(--muted)}"
+ ".adm .tl em{position:absolute;top:12px;right:14px;min-width:28px;height:28px;border-radius:99px;background:#e5484d;color:#fff;font:800 14px system-ui,sans-serif;display:grid;place-items:center;font-style:normal;padding:0 8px}"
+ "</style>");
const esc2 = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const som = n => n == null ? "—" : Number(n).toLocaleString("ru-RU");
let busy = false;
function toastA(m){ const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:99;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
function openPanel(){
  if(document.getElementById("adm")) return;
  let uid = 0; try{ uid = Telegram.WebApp.initDataUnsafe.user.id; }catch(e){}
  if(uid !== 7336571895) return;
  const d = document.createElement("div");
  d.className = "adm"; d.id = "adm";
  const full = ME ? [ME.first_name, ME.last_name].filter(Boolean).join(" ") : "";
  const mln = n => n == null ? "—" : n >= 1000000 ? (n / 1000000).toFixed(2).replace(".", ",").replace(/,?0+$/, "") + " mln" : som(n);
  const v = (n, f) => n === undefined ? "…" : (f || som)(n);
  const paint = s => {
    const ld = s === null;
    s = s || {};
    const g = s.growth || [], mx = Math.max(1, ...g);
    d.querySelector("#admb").innerHTML = `<div class="uc"><div class="gl"></div><div class="in"><div class="h1"><span>Foydalanuvchilar</span>${s.new_today ? `<span class="up">+${s.new_today} bugun</span>` : ""}</div><div class="h2"><b>${ld ? "…" : som(s.users)}</b><div class="sp">${g.map(x => `<i style="height:${Math.max(12, Math.round(x * 100 / mx))}%"></i>`).join("")}</div></div>`
      + `<div class="m3"><div><b>${ld ? "…" : som(s.active_today)}</b><small>bugun faol</small></div><div><b>${ld ? "…" : som(s.done_total)}</b><small>test ishlagan</small></div><div><b>${ld ? "…" : mln(s.income_today)}</b><small>bugungi kirim</small></div></div></div></div>`
      + `<div class="gr">` + SEC.map(x => { const bd = x.badge ? x.badge(s) : 0; return `<button class="tl" type="button" data-k="${x.k}">${bd ? "<em>" + bd + "</em>" : ""}${jl(x.c, x.p, 52, 27)}<span><b>${x.n}</b><small>${x.sub(s)}</small></span></button>`; }).join("") + `</div>`;
  };
  d.innerHTML = `<div class="ah"><button class="ab" id="admx" type="button" aria-label="Orqaga">‹</button><div><b>Admin panel</b><small>${esc2(full)}</small></div><span class="pill">ADMIN</span></div><div id="admb"></div>`;
  paint(null);
  document.body.appendChild(d);
  d.querySelector("#admx").onclick = () => d.remove();
  let last = {};
  d.addEventListener("click", e => {
    const b = e.target.closest(".tl"); if(!b) return;
    const h = window.ADMIN_SECTIONS && window.ADMIN_SECTIONS[b.dataset.k];
    if(h) h(d, last); else toastA("Bu bo'lim tez orada qo'shiladi");
  });
  call("/api/admin/stats", {}).then(s => { last = s; if(document.body.contains(d)) paint(s); }).catch(e => { if(String(e.message).includes("403")){ d.remove(); } });
}

/* ---- Pastki oyna (bo'lim ichi) ---- */
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".adm2{position:fixed;inset:0;z-index:70;background:linear-gradient(#f3f6ff,#fbf3ea);overflow:auto;padding:14px 16px 40px}"
+ ".adm2 .pc{background:#fff;border:1px solid var(--line);border-radius:20px;padding:14px;margin-bottom:10px;box-shadow:0 4px 12px rgba(36,64,214,.06)}"
+ ".adm2 .pc .r1{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}.adm2 .pc b{font-size:16px;color:var(--text)}"
+ ".adm2 .pc small{display:block;color:var(--muted);font-size:12.5px;margin-top:3px}"
+ ".adm2 .amt{font-weight:900;font-size:18px;color:#2440d6;white-space:nowrap}"
+ ".adm2 .kd{display:inline-block;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:800;margin-bottom:6px}"
+ ".adm2 .kd.t{background:#dff5e8;color:#1a8a4a}.adm2 .kd.w{background:#fff1cc;color:#8a5a00}"
+ ".adm2 .ac{display:flex;gap:8px;margin-top:10px}.adm2 .ac button{flex:1;height:46px;border:0;border-radius:14px;font:800 15px system-ui,sans-serif;cursor:pointer}"
+ ".adm2 .ac .ok{background:#1f9d55;color:#fff}.adm2 .ac .no{background:#fde4e5;color:#b3262b}.adm2 .ac .ph{flex:none;width:100%;background:#e8edfb;color:#2440d6;margin-top:0}"
+ ".adm2 .stt{font-weight:800;font-size:13px;margin-top:8px}.adm2 .stt.ok{color:#1a8a4a}.adm2 .stt.no{color:#b3262b}"
+ ".adm2 .pr{display:flex;gap:12px}.adm2 .th{flex:none;width:92px;min-height:110px;border:0;border-radius:16px;background:linear-gradient(160deg,#eef1fb,#d3daf0);color:#6b7699;font:700 13px system-ui,sans-serif;text-align:center;cursor:pointer;padding:6px}.adm2 .th span{display:block;margin-top:4px;font-size:11px;font-weight:600;opacity:.8}.adm2 .th.n{display:grid;place-items:center;cursor:default;word-break:break-all;font-size:12px}"
+ ".adm2 .pm{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.adm2 .pm .amt{margin-top:6px;font-size:21px;color:var(--text)}.adm2 .pm .kd{align-self:flex-start}"
+ ".adm2 h3{margin:14px 2px 8px;font-size:15px;color:var(--muted)}"
+ "</style>");
function sub(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = `<div class="ah"><button class="ab" type="button" aria-label="Orqaga">‹</button><div><b>${title}</b><small>${note || ""}</small></div></div><div class="body"></div>`;
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d.querySelector(".body");
}
const dtm = s => { try{ return new Date(s).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"}); }catch(e){ return ""; } };
const ago = s => { const m = Math.floor((Date.now() - Date.parse(s)) / 60000); if(isNaN(m)) return ""; if(m < 1) return "hozirgina"; if(m < 60) return m + " daqiqa oldin"; if(m < 1440) return Math.floor(m / 60) + " soat oldin"; return Math.floor(m / 1440) + " kun oldin"; };
function lightbox(src){
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;inset:0;z-index:90;background:rgba(10,15,40,.92);display:flex;flex-direction:column";
  d.innerHTML = '<div style="display:flex;justify-content:flex-end;padding:12px"><button type="button" style="width:44px;height:44px;border:0;border-radius:14px;background:rgba(255,255,255,.18);color:#fff;font:700 22px system-ui,sans-serif">✕</button></div><div style="flex:1;overflow:auto;text-align:center;padding:0 8px 24px"><img src="' + src + '" style="max-width:100%;border-radius:12px;background:#fff"></div>';
  d.querySelector("button").onclick = () => d.remove();
  document.body.appendChild(d);
}
async function showChek(id, btn){
  btn.disabled = true;
  try{
    const r = await call("/api/admin/pay_img", {id});
    if(r.img) lightbox(r.img);
    else if(r.sent) toastA("Bu fayl PDF, bot chatiga yuborildi");
  }catch(x){ toastA("Chek ochilmadi"); }
  btn.disabled = false;
}
async function paysScreen(tab, kind){
  tab = tab || "pend"; kind = kind || "topup";
  const body = sub(kind === "topup" ? "To'lovlar" : "Yechib olish", kind === "topup" ? "Cheklarni tasdiqlash" : "Referal pulini yechish so'rovlari");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let r;
  try{ r = await call("/api/admin/pays", {kind}); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi. Qayta urinib ko\'ring.</p>'; return; }
  const pend = r.items.filter(x => x.status === "pending"), okk = r.items.filter(x => x.status === "ok"), nno = r.items.filter(x => x.status === "no");
  const card = p => {
    const t = p.kind === "topup";
    const thumb = t && p.has_photo ? `<button class="th" type="button" data-a="img"><div style="font-size:26px">🧾</div>chek rasmi<span>bosib ko'ring</span></button>` : `<div class="th n">${t ? "chek<br>botda" : "💳<br>" + esc2(p.info || "")}</div>`;
    let h = `<div class="pc" data-id="${p.id}"><div class="pr">${thumb}<div class="pm"><span class="kd ${t ? "t" : "w"}">${t ? "To'ldirish" : "Yechib olish"} #${p.id}</span><b>${esc2(p.name) || "id " + p.user_id}</b><small>ID ${p.user_id}${p.created_at ? " · " + ago(p.created_at) : ""}</small><span class="amt">${som(p.amount)} so'm</span></div></div>`;
    if(p.status === "pending") h += `<div class="ac"><button class="ok" type="button" data-a="ok">Tasdiqlash</button><button class="no" type="button" data-a="no">Rad etish</button></div>`;
    else h += `<div class="stt ${p.status === "ok" ? "ok" : "no"}">${p.status === "ok" ? "✅ Tasdiqlangan" : "❌ Rad etilgan"}</div>`;
    return h + "</div>";
  };
  const list = tab === "pend" ? pend : tab === "ok" ? okk : nno;
  const tb = (k, n, c) => `<button class="chip${tab === k ? " on" : ""}" data-tab="${k}" type="button">${n}${c ? `<em>${c}</em>` : ""}</button>`;
  body.innerHTML = `<div class="chips" style="margin-bottom:6px">${tb("pend", "Kutilmoqda", pend.length)}${tb("ok", "Tasdiqlangan", okk.length)}${tb("no", "Rad etilgan", nno.length)}</div>`
    + (list.length ? list.map(card).join("") : `<div class="empty" style="margin-top:20px"><div>${tab === "pend" ? "✅" : "📭"}</div><b>${tab === "pend" ? "Kutilayotgan so'rov yo'q" : "Hozircha bo'sh"}</b>${tab === "pend" ? "Yangi to'lov kelsa, botga ham xabar keladi." : "So'nggi 15 ta ko'rib chiqilgan so'rov shu yerda chiqadi."}</div>`);
  body.onclick = async e => {
    const tbn = e.target.closest("[data-tab]");
    if(tbn){ const w = body.closest(".adm2"); if(w) w.remove(); paysScreen(tbn.dataset.tab, kind); return; }
    const b = e.target.closest("[data-a]"); if(!b) return;
    const c = b.closest(".pc"), id = +c.dataset.id, a = b.dataset.a;
    if(a === "img"){ showChek(id, b); return; }
    const go = async () => {
      c.querySelectorAll("button").forEach(x => x.disabled = true);
      try{ await call("/api/admin/pay_act", {id, ok: a === "ok"}); toastA(a === "ok" ? "Tasdiqlandi" : "Rad etildi"); }
      catch(x){ toastA(String(x.message).includes("409") ? "Bu so'rov allaqachon ko'rib chiqilgan" : "Xatolik. Qayta urinib ko'ring."); }
      const w = body.closest(".adm2"); if(w) w.remove(); paysScreen(tab, kind);
    };
    const msg = a === "ok" ? "So'rov #" + id + " tasdiqlansinmi?" : "So'rov #" + id + " rad etilsinmi?";
    if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
  };
}

const EMO = {"Matematika":"🧮","Fizika":"⚛️","Kimyo":"🧪","Biologiya":"🧬","Tarix":"🏛️","Geografiya":"🌍","Ingliz":"🔤","Ona tili":"📖"};
const emo = s => { for(const k in EMO) if((s || "").startsWith(k)) return EMO[k]; return "📘"; };
document.head.insertAdjacentHTML("beforeend", "<style id=\"bc-css\">"
+ ".bc .seg{display:flex;background:#e8edfb;border-radius:14px;padding:4px;gap:4px;margin-bottom:6px}.bc .seg div{flex:1;text-align:center;padding:10px 4px;border-radius:11px;font-weight:800;font-size:14px;color:#5a6a99;cursor:pointer}.bc .seg div.on{background:#fff;color:#2440d6;box-shadow:0 2px 6px rgba(36,64,214,.15)}"
+ ".bc .chips{display:flex;gap:8px;flex-wrap:wrap}.bc .chip{padding:10px 14px;border-radius:99px;border:1.5px solid #dfe5f6;background:#fff;font:700 14px system-ui,sans-serif;color:#0f1a4d;cursor:pointer}.bc .chip.on{background:#2440d6;border-color:#2440d6;color:#fff}.bc .chip.s{padding:8px 12px;font-size:13px;background:#f3f6ff}.bc .chip.s.on{background:#2440d6}"
+ ".bc .ta{width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:20px;padding:14px;font:600 15.5px/1.4 system-ui,sans-serif;color:#0f1a4d}.bc input,.bc select{width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:12px;font:600 15px system-ui,sans-serif;color:#0f1a4d;margin-top:8px}"
+ ".bc .tools{display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap}.bc .tl2{padding:8px 12px;border-radius:12px;background:#e8edfb;color:#2440d6;font:800 13px system-ui,sans-serif;border:0;cursor:pointer}.bc .cnt{margin-left:auto;color:#8a93b3;font-size:12px;font-weight:700}"
+ ".bc .prev{background:#dbe4f7;border-radius:24px;padding:12px}.bc .prev .lb{font-weight:800;font-size:12.5px;color:#5a6a99;margin:2px 4px 8px}.bc .bub{background:#fff;border-radius:6px 18px 18px 18px;padding:12px;font:600 15px/1.35 system-ui,sans-serif;color:#0f1a4d}.bc .bub img{width:100%;border-radius:12px;margin-bottom:10px;display:block}.bc .bub .bt{margin-top:10px;height:44px;border-radius:12px;background:#e8edfb;color:#2440d6;font-weight:800;display:grid;place-items:center}.bc .bub .tm{font-size:11px;color:#8a93b3;text-align:right;margin-top:6px}"
+ ".bc .cn{margin:14px 0;padding:14px;border-radius:16px;background:#fff1cc;color:#8a5a00;font-weight:800;font-size:15px;display:flex;justify-content:space-between;align-items:center}.bc .cn b{font-size:19px}"
+ ".bc .btns{display:flex;gap:10px}.bc .btns button{flex:1;height:54px;border-radius:16px;border:0;font:800 16px system-ui,sans-serif;cursor:pointer}.bc .btns .a{background:#e8edfb;color:#2440d6}.bc .btns .b{background:#2440d6;color:#fff;box-shadow:0 8px 16px rgba(36,64,214,.3)}.bc .btns .r{background:#fde4e5;color:#b3262b}.bc .btns button[disabled]{opacity:.5}"
+ ".bc .bar{height:14px;border-radius:99px;background:#e8edfb;overflow:hidden;margin:14px 0 10px}.bc .bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#1f9d55,#38c777);transition:width .4s}"
+ ".bc .bign{font-size:44px;font-weight:900;line-height:1;color:#0f1a4d}.bc .stt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.bc .stt div{background:#f6f8ff;border-radius:14px;padding:10px}.bc .stt b{display:block;font-size:20px}.bc .stt small{color:#6b7699;font-size:12px}"
+ ".bc .tg{display:inline-block;padding:3px 9px;border-radius:99px;font-size:12px;font-weight:800}.bc .tg.g{background:#dff5e8;color:#1a8a4a}.bc .tg.y{background:#fff1cc;color:#8a5a00}.bc .tg.r{background:#fde4e5;color:#b3262b}"
+ ".bc .note{padding:10px 12px;border-radius:14px;background:#e8edfb;color:#2440d6;font-weight:700;font-size:13px;margin-top:8px}.bc .pc.tp{cursor:pointer}.bc .xx{float:right;border:0;background:none;color:#b3262b;font-size:18px;font-weight:800;cursor:pointer}"
+ "</style>");
const STATUS = {sending:["Yuborilmoqda", "y"], stopping:["To'xtatilmoqda", "y"], done:["Yuborildi", "g"], stopped:["To'xtatilgan", "r"], scheduled:["Rejalashtirilgan", "y"], cancelled:["Bekor qilingan", "r"]};
const BUILTIN = [
  ["🚀 Yangi test", "📢 Yangi test: {test}\n{fan} · {n} ta savol · {min} daqiqa\nTest kodi: {kod}"],
  ["⏰ Eslatma", "⏰ {ism}, {test} tez orada boshlanadi. Tayyor turing!"],
  ["📣 Ishlamaganlarga", "{emoji} {ism}, {test} hali ishlanmagan. Hozir boshlang va darajangizni bilib oling!"],
  ["🏆 Natijalar tayyor", "🏆 {test} natijalari tayyor! Umumiy natijalar va tahlilni ilovada ko'ring."]
];
const fillT = (s, t) => s.replace(/\{test\}/g, t.title).replace(/\{fan\}/g, t.subject).replace(/\{n\}/g, t.question_count).replace(/\{min\}/g, t.duration_minutes).replace(/\{kod\}/g, t.code).replace(/\{emoji\}/g, emo(t.subject));
const shrink = file => new Promise((res, rej) => {
  const fr = new FileReader();
  fr.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 1280 / Math.max(im.width, im.height)); const c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", .82)); }; im.onerror = rej; im.src = fr.result; };
  fr.onerror = rej; fr.readAsDataURL(file);
});
const hmm = x => { try{ return new Date(x).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"}); }catch(e){ return ""; } };

async function msgScreen(){
  const body = sub("Xabar yuborish", "Test belgilab yoki ommaviy");
  body.classList.add("bc");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let M;
  try{ M = await call("/api/admin/bc_meta", {}); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  if(!M.tests.length){ body.innerHTML = '<div class="empty"><div>📭</div><b>Testlar yo\'q</b></div>'; return; }
  const S = {tab: "w", t: M.tests[0], aud: "new", fan: false, regOn: false, region: "", bal: false, text: "", btn: "start", link: "", when: "now", at: "", photo: "", edited: false, saveOpen: false};
  const defText = () => S.aud === "done" ? fillT(BUILTIN[3][1], S.t) : S.aud === "new" ? fillT(BUILTIN[2][1], S.t) : fillT(BUILTIN[0][1], S.t);
  S.text = defText();
  const myName = (ME && ME.first_name) || "Jahongir";
  const tabs = () => `<div class="seg">${[["w", "Yozish"], ["t", "Tayyor matnlar"], ["h", "Tarix"]].map(x => `<div data-tab="${x[0]}" class="${S.tab === x[0] ? "on" : ""}">${x[1]}</div>`).join("")}</div>`;
  const btnLab = () => S.btn === "start" ? "🚀 Testni boshlash" : S.btn === "res" ? "📊 Natijalarni ko'rish" : S.btn === "link" ? "🔗 Ochish" : "";
  const prevHtml = () => (S.photo ? `<img src="${S.photo}">` : "") + esc2(S.text.replace(/\{ism\}/g, myName)).replace(/\n/g, "<br>") + (btnLab() ? `<div class="bt">${btnLab()}</div>` : "") + `<div class="tm">${new Date().toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit"})}</div>`;
  let cntTimer = 0;
  const cnt = () => {
    clearTimeout(cntTimer);
    cntTimer = setTimeout(async () => {
      const el = body.querySelector("#bcn"); if(!el) return;
      el.querySelector("b").textContent = "...";
      try{ const x = await call("/api/admin/bc_do", {mode: "count", code: S.t.code, audience: S.aud, fan: S.fan, region: S.regOn ? S.region : "", balance: S.bal}); const e2 = body.querySelector("#bcn"); if(e2){ e2.querySelector("b").textContent = som(x.count) + " ta foydalanuvchiga"; e2.dataset.n = x.count; } }catch(e){ const e3 = body.querySelector("#bcn"); if(e3) e3.querySelector("b").textContent = "—"; }
    }, 350);
  };
  const upd = () => { const p = body.querySelector("#bpv"); if(p) p.innerHTML = prevHtml(); const c = body.querySelector("#bch"); if(c) c.textContent = S.text.length + " / 1000"; };

  function renderWrite(){
    body.innerHTML = tabs()
      + '<h3 style="margin:12px 2px 7px;font-size:14px;color:#6b7699">Test</h3><div class="pc" style="padding:0;position:relative"><select id="bsel" style="border:0;margin:0;padding:16px 40px 16px 16px;font-weight:800;font-size:16px;appearance:none;background:none">' + M.tests.map(t => `<option value="${esc2(t.code)}"${t.code === S.t.code ? " selected" : ""}>${emo(t.subject)}  ${esc2(t.title)}</option>`).join("") + '</select><span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#6b7699;pointer-events:none">⌄</span></div>'
      + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699">Kimga</h3><div class="chips">' + [["new", "Ishlamaganlarga"], ["all", "Hammaga"], ["done", "Ishlaganlarga"]].map(a => `<div class="chip${S.aud === a[0] ? " on" : ""}" data-aud="${a[0]}">${a[1]}</div>`).join("") + '</div>'
      + '<div class="chips" style="margin-top:8px"><div class="chip s' + (S.fan ? " on" : "") + '" data-f="fan">📚 Faqat ' + esc2(S.t.subject) + ' o\'qiganlar</div><div class="chip s' + (S.regOn ? " on" : "") + '" data-f="reg">📍 Viloyat bo\'yicha</div><div class="chip s' + (S.bal ? " on" : "") + '" data-f="bal">💰 Balansi bor</div></div>'
      + (S.regOn ? '<select id="breg"><option value="">Viloyatni tanlang</option>' + M.regions.map(r => `<option${r === S.region ? " selected" : ""}>${esc2(r)}</option>`).join("") + '</select>' : "")
      + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699;display:flex;justify-content:space-between">Xabar matni <i style="font-style:normal;font-size:12px;color:#8a93b3">{ism} — ismini qo\'yadi</i></h3><textarea class="ta" id="btx" rows="5"></textarea>'
      + '<div class="tools"><button class="tl2" data-t="ism" type="button">{ism}</button><button class="tl2" data-t="emo" type="button">😀 Emoji</button><button class="tl2" data-t="img" type="button">🖼 Rasm' + (S.photo ? " ✓" : "") + '</button><button class="tl2" data-t="save" type="button">💾 Saqlash</button><span class="cnt" id="bch"></span></div>'
      + '<input type="file" id="bfile" accept="image/*" style="display:none">'
      + (S.saveOpen ? '<div style="display:flex;gap:8px"><input id="bsn" placeholder="Matn nomi (masalan: Eslatma)" maxlength="40"><button class="tl2" data-t="savego" type="button" style="margin-top:8px;flex:none">Saqlash</button></div>' : "")
      + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699">Tugma</h3><div class="chips">' + [["start", "🚀 Testni boshlash"], ["res", "📊 Natijalar"], ["link", "🔗 Havola"], ["none", "Tugmasiz"]].map(a => `<div class="chip${S.btn === a[0] ? " on" : ""}" data-btn="${a[0]}">${a[1]}</div>`).join("") + '</div>'
      + (S.btn === "link" ? '<input id="blk" placeholder="https://..." value="' + esc2(S.link) + '">' : "")
      + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699">Qachon</h3><div class="seg"><div data-when="now" class="' + (S.when === "now" ? "on" : "") + '">Hozir</div><div data-when="later" class="' + (S.when === "later" ? "on" : "") + '">⏰ Vaqt belgilash</div></div>'
      + (S.when === "later" ? '<input type="datetime-local" id="bat" value="' + esc2(S.at) + '">' : "")
      + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699">Ko\'rinishi</h3><div class="prev"><div class="lb">Bot chatida shunday chiqadi</div><div class="bub" id="bpv"></div></div>'
      + '<div class="cn" id="bcn"><span>Yuboriladi</span><b>...</b></div>'
      + '<div class="btns"><button class="a" id="bme" type="button">Avval o\'zimga</button><button class="b" id="bgo" type="button">' + (S.when === "later" ? "Rejalashtirish" : "Yuborish") + '</button></div>';
    body.querySelector("#btx").value = S.text;
    upd(); cnt();
  }

  const validate = () => {
    if(!S.text.trim()) return "Xabar matnini yozing";
    if(S.btn === "link" && !/^https?:\/\//.test(S.link)) return "Havolani to'g'ri yozing (https://...)";
    if(S.regOn && !S.region) return "Viloyatni tanlang";
    if(S.when === "later" && (!S.at || new Date(S.at).getTime() < Date.now() + 60000)) return "Kelajakdagi vaqtni belgilang";
    return "";
  };
  const payload = mode => ({mode, code: S.t.code, audience: S.aud, fan: S.fan, region: S.regOn ? S.region : "", balance: S.bal, text: S.text, button: S.btn, link: S.link, photo: S.photo, run_at: mode === "send" && S.when === "later" ? new Date(S.at).toISOString() : ""});

  async function progress(id){
    body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
    const draw = r => {
      const total = r.total || 0, done = (r.ok || 0) + (r.fail || 0), pct = total ? Math.round(done * 100 / total) : 0;
      const st = STATUS[r.status] || [r.status, "y"];
      const live = r.status === "sending" || r.status === "stopping";
      body.innerHTML = `<div class="pc" style="padding:18px"><div style="display:flex;justify-content:space-between;align-items:baseline"><span class="bign">${som(done)}</span><span style="font-weight:800;color:#6b7699">/ ${som(total)}</span></div><div class="bar"><i style="width:${pct}%"></i></div><div style="display:flex;justify-content:space-between;align-items:center"><span class="tg ${st[1]}">${st[0]}</span><span style="color:#6b7699;font-weight:700;font-size:13px">${esc2(r.title)}</span></div><div class="stt"><div><b style="color:#1f9d55">${som(r.ok || 0)}</b><small>yetib bordi</small></div><div><b style="color:#b3262b">${som(r.fail || 0)}</b><small>yetmadi</small></div><div><b>${som(Math.max(0, total - done))}</b><small>navbatda</small></div></div></div>`
        + (live ? '<div class="note">Ilovani yopsangiz ham yuborish davom etadi. Tugagach botga xabar keladi.</div>' : (r.clicks ? `<div class="note">👆 ${som(r.clicks)} kishi tugmani bosdi</div>` : ""))
        + `<div class="btns" style="margin-top:14px">${live ? '<button class="r" id="bstop" type="button">To\'xtatish</button>' : ""}<button class="b" id="bback" type="button">${live ? "Yopish" : "Tarixga"}</button></div>`;
      const s1 = body.querySelector("#bstop"); if(s1) s1.onclick = async () => { s1.disabled = true; try{ await call("/api/admin/bc_act", {id, act: "stop"}); }catch(e){} };
      body.querySelector("#bback").onclick = () => { S.tab = "h"; histShow(); };
    };
    const tick = async () => {
      if(!document.body.contains(body)) return;
      let r; try{ r = await call("/api/admin/bc_get", {id}); }catch(e){ setTimeout(tick, 3000); return; }
      draw(r);
      if(r.status === "sending" || r.status === "stopping") setTimeout(tick, 2000);
    };
    tick();
  }

  async function histShow(){
    body.innerHTML = tabs() + '<p class="sub" style="margin-top:12px">Yuklanmoqda...</p>';
    let r; try{ r = await call("/api/admin/bc_list", {}); }catch(e){ body.innerHTML = tabs() + '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
    body.innerHTML = tabs() + (r.items.length ? r.items.map(x => {
      const st = STATUS[x.status] || [x.status, "y"];
      const lab = x.status === "scheduled" ? "⏰ " + hmm(x.run_at) : st[0];
      return `<div class="pc tp" data-bid="${x.id}"><div class="r1"><div><b>${esc2(x.title)}</b><small>${{all: "Hammaga", new: "Ishlamaganlarga", done: "Ishlaganlarga"}[x.audience] || ""} · ${hmm(x.created_at)}</small></div><span class="tg ${st[1]}">${lab}</span></div><div style="display:flex;gap:14px;margin-top:8px;font-size:13.5px"><span>👥 ${som(x.total || 0)}</span><span style="color:#1a8a4a">✅ ${som(x.ok || 0)}</span><span style="color:#b3262b">🚫 ${som(x.fail || 0)}</span><span style="color:#2440d6">👆 ${som(x.clicks || 0)}</span></div>${x.status === "scheduled" ? `<div class="btns" style="margin-top:10px"><button class="r" data-cancel="${x.id}" type="button" style="height:44px">Bekor qilish</button></div>` : ""}</div>`;
    }).join("") + '<div class="note">«👆» — tugmani bosganlar soni.</div>' : '<div class="empty" style="margin-top:20px"><div>📭</div><b>Hali xabar yuborilmagan</b></div>');
  }

  function tplShow(){
    const own = M.templates || [];
    body.innerHTML = tabs() + '<h3 style="margin:14px 2px 7px;font-size:14px;color:#6b7699">Tanlang</h3><div class="pc">'
      + BUILTIN.map((b, i) => `<div class="pc tp" data-tp="b${i}" style="box-shadow:none;border:0;border-bottom:1px solid #eef1fb;border-radius:0;margin:0"><b>${b[0]}</b><small>${esc2(fillT(b[1], S.t))}</small></div>`).join("")
      + own.map(o => `<div class="pc tp" data-tp="o${o.id}" style="box-shadow:none;border:0;border-bottom:1px solid #eef1fb;border-radius:0;margin:0"><button class="xx" data-del="${o.id}" type="button">✕</button><b>💾 ${esc2(o.name)}</b><small>${esc2(o.text)}</small></div>`).join("") + '</div>'
      + '<div class="note">Tanlangan matn «Yozish» bo\'limiga tushadi, uni o\'zgartirishingiz mumkin. O\'z matningizni «Yozish» da 💾 Saqlash bilan qo\'shing.</div>';
  }

  const show = () => { if(S.tab === "w") renderWrite(); else if(S.tab === "t") tplShow(); else histShow(); };
  body.onclick = async e => {
    const tb = e.target.closest("[data-tab]");
    if(tb){ S.tab = tb.dataset.tab; show(); return; }
    const au = e.target.closest("[data-aud]");
    if(au){ S.aud = au.dataset.aud; if(!S.edited) S.text = defText(); renderWrite(); return; }
    const fl = e.target.closest("[data-f]");
    if(fl){ const k = fl.dataset.f; if(k === "fan") S.fan = !S.fan; else if(k === "bal") S.bal = !S.bal; else { S.regOn = !S.regOn; if(!S.regOn) S.region = ""; } renderWrite(); return; }
    const bn = e.target.closest("[data-btn]");
    if(bn){ S.btn = bn.dataset.btn; renderWrite(); return; }
    const wn = e.target.closest("[data-when]");
    if(wn){ S.when = wn.dataset.when; renderWrite(); return; }
    const tl = e.target.closest("[data-t]");
    if(tl){
      const k = tl.dataset.t, ta = body.querySelector("#btx");
      if(k === "ism" || k === "emo"){ const add = k === "ism" ? "{ism}" : "😊"; const a = ta.selectionStart || ta.value.length; ta.value = ta.value.slice(0, a) + add + ta.value.slice(ta.selectionEnd || a); S.text = ta.value; S.edited = true; upd(); }
      else if(k === "img"){ if(S.photo){ S.photo = ""; renderWrite(); } else body.querySelector("#bfile").click(); }
      else if(k === "save"){ S.saveOpen = !S.saveOpen; renderWrite(); }
      else if(k === "savego"){ const nm = body.querySelector("#bsn").value.trim(); if(!nm){ toastA("Nom yozing"); return; } try{ await call("/api/admin/tpl_save", {name: nm, text: S.text}); M = await call("/api/admin/bc_meta", {}); S.saveOpen = false; toastA("Saqlandi"); renderWrite(); }catch(x){ toastA("Saqlab bo'lmadi"); } }
      return;
    }
    const tp = e.target.closest("[data-tp]");
    if(tp){
      const del = e.target.closest("[data-del]");
      if(del){ try{ await call("/api/admin/tpl_del", {id: +del.dataset.del}); M = await call("/api/admin/bc_meta", {}); tplShow(); }catch(x){ toastA("O'chirib bo'lmadi"); } return; }
      const id = tp.dataset.tp;
      S.text = id[0] === "b" ? fillT(BUILTIN[+id.slice(1)][1], S.t) : fillT((M.templates.find(o => o.id === +id.slice(1)) || {text: S.text}).text, S.t);
      S.edited = true; S.tab = "w"; renderWrite(); return;
    }
    const ca = e.target.closest("[data-cancel]");
    if(ca){ try{ await call("/api/admin/bc_act", {id: +ca.dataset.cancel, act: "cancel"}); toastA("Bekor qilindi"); histShow(); }catch(x){ toastA("Xatolik"); } return; }
    const hi = e.target.closest("[data-bid]");
    if(hi){ progress(+hi.dataset.bid); return; }
    if(e.target.id === "bme"){
      const er = validate(); if(er && !er.startsWith("Kelajak")){ toastA(er); return; }
      e.target.disabled = true;
      try{ await call("/api/admin/bc_do", payload("self")); toastA("O'zingizga yuborildi"); }catch(x){ toastA("Yuborib bo'lmadi"); }
      e.target.disabled = false; return;
    }
    if(e.target.id === "bgo"){
      const er = validate(); if(er){ toastA(er); return; }
      const go = async () => {
        const b = body.querySelector("#bgo"); if(b) b.disabled = true;
        try{
          const x = await call("/api/admin/bc_do", payload("send"));
          if(x.scheduled){ toastA("Rejalashtirildi"); S.tab = "h"; histShow(); } else progress(x.id);
        }catch(x){ toastA("Yuborib bo'lmadi"); if(b) b.disabled = false; }
      };
      const n = (body.querySelector("#bcn") || {dataset: {}}).dataset.n || "";
      const msg = S.when === "later" ? "Xabar " + hmm(new Date(S.at)) + " da yuborilsinmi?" : "Xabar " + n + " kishiga yuborilsinmi?";
      if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
    }
  };
  body.oninput = e => {
    if(e.target.id === "btx"){ S.text = e.target.value; S.edited = true; upd(); }
    else if(e.target.id === "blk") S.link = e.target.value.trim();
    else if(e.target.id === "bat") S.at = e.target.value;
  };
  body.onchange = async e => {
    if(e.target.id === "bsel"){ S.t = M.tests.find(t => t.code === e.target.value) || S.t; if(!S.edited) S.text = defText(); renderWrite(); }
    else if(e.target.id === "breg"){ S.region = e.target.value; cnt(); }
    else if(e.target.id === "bfile" && e.target.files[0]){ try{ S.photo = await shrink(e.target.files[0]); renderWrite(); }catch(x){ toastA("Rasm ochilmadi"); } }
  };
  renderWrite();
}

/* ---- Natija e'loni ---- */
async function resScreen(){
  const body = sub("Natija e'loni", "Test tugagach natijalarni yuborish");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let r;
  try{ r = await call("/api/admin/bc_meta", {}); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const fm = x => { try{ return new Date(x).toLocaleString("ru-RU", {day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"}); }catch(e){ return ""; } };
  body.innerHTML = '<div class="note" style="margin:0 0 12px">Test tugagach natijalar o\'zi avtomatik yuboriladi. Bu yerdan qo\'lda ham yuborish mumkin: har bir ishtirokchiga o\'z natijasi va «Umumiy natijalar» tugmasi boradi.</div>'
    + r.tests.map(t => `<div class="pc" data-c="${esc2(t.code)}"><div class="r1"><div><b>${esc2(t.title)}</b><small>${esc2(t.subject)} · kod ${esc2(t.code)}${t.ends_at ? " · tugash " + fm(t.ends_at) : ""}</small></div></div><div class="ac"><button class="ok" type="button" data-a="send" style="background:#2440d6">Natijalarni yuborish</button></div></div>`).join("");
  body.onclick = e => {
    const b = e.target.closest('[data-a="send"]'); if(!b) return;
    const code = b.closest(".pc").dataset.c;
    const go = async () => {
      b.disabled = true;
      try{ const x = await call("/api/admin/natija", {code}); toastA("Yuborilmoqda: " + x.count + " kishiga"); }
      catch(x){ toastA("Yuborib bo'lmadi"); }
      b.disabled = false;
    };
    const msg = code + " testi natijalari ishtirokchilarga yuborilsinmi?";
    if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
  };
}

/* ---- Tushgan savollar ---- */
document.head.insertAdjacentHTML("beforeend", "<style id=\"pp-css\">"
+ ".pdc{display:flex;align-items:center;gap:12px;border:2px dashed #cfd8f3;background:#fbfcff;border-radius:22px;padding:14px;margin-top:10px}.pdc .nm{flex:1;min-width:0}.pdc .nm b{display:block;font-size:17px;color:#0f1a4d}.pdc .nm small{display:block;color:#6b7699;font-size:14px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+ ".pdc .yb{flex:none;border:0;border-radius:16px;background:#e8edfb;color:#2440d6;font:800 16px system-ui,sans-serif;padding:14px 20px;cursor:pointer}.pdc.ok{border-color:#9fdcb8;background:#f4fcf7}.pdc.ok .yb{background:#dff5e8;color:#1a8a4a}"
+ ".adm2 label{display:block;margin:12px 2px 6px;font-weight:700;font-size:14px;color:#6b7699}.adm2 .fi{width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:13px;font:600 15.5px system-ui,sans-serif;color:#0f1a4d}"
+ ".adm2 .big2{display:flex;align-items:center;justify-content:center;width:100%;height:54px;margin-top:14px;border:0;border-radius:16px;background:#2440d6;color:#fff;font:800 16px system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 16px rgba(36,64,214,.3)}.adm2 .big2.s{background:#e8edfb;color:#2440d6;box-shadow:none}.adm2 .big2[disabled]{opacity:.5}"
+ ".adm2 .pr2{display:flex;gap:8px;margin-top:10px}.adm2 .pr2 button{flex:1;height:42px;border:0;border-radius:12px;font:800 14px system-ui,sans-serif;cursor:pointer;background:#e8edfb;color:#2440d6}.adm2 .pr2 .d{background:#fde4e5;color:#b3262b}.adm2 .perr{color:#b3262b;font-weight:700;font-size:14px;margin-top:8px}"
+ "</style>");
const fsz = n => n > 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
async function pastScreen(){
  const body = sub("Tushgan savollar", "Qo'shish, narx, o'chirish");
  const J = window.MSJ;
  const draw = async () => {
    body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
    let r; try{ r = await call("/api/papers/list", {}); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
    body.innerHTML = '<button class="big2" id="pnew" type="button" style="margin-top:0">＋ Yangi qo\'shish</button>'
      + (r.papers.length ? `<h3>Hammasi (${r.papers.length})</h3>` + r.papers.map(p => `<div class="pc" data-id="${p.id}"><div class="pr"><div style="flex:none">${J ? J.jelly(J.keyOf(p.subject), 46, 25) : ""}</div><div class="pm"><b>${esc2(p.title)}</b><small>${esc2(p.subject)}${p.test_code ? " · test " + esc2(p.test_code) : ""}</small><span class="amt" style="font-size:17px">${p.price ? som(p.price) + " so'm" : "Bepul"}</span></div></div><div class="pr2"><button data-a="price" type="button">Narxini o'zgartirish</button><button class="d" data-a="del" type="button">O'chirish</button></div></div>`).join("") : '<div class="empty" style="margin-top:20px"><div>📭</div><b>Hali tushgan savol yo\'q</b>«Yangi qo\'shish» ni bosing.</div>');
    body.querySelector("#pnew").onclick = form;
  };
  body.onclick = async e => {
    const b = e.target.closest("[data-a]"); if(!b) return;
    const c = b.closest(".pc"), id = +c.dataset.id;
    if(b.dataset.a === "del"){
      const go = async () => { try{ await call("/api/papers/delete", {id}); toastA("O'chirildi"); draw(); }catch(x){ toastA("O'chirib bo'lmadi"); } };
      if(tgw && tgw.showConfirm) tgw.showConfirm("O'chirilsinmi?", ok => { if(ok) go(); }); else go();
    }else if(b.dataset.a === "price"){
      if(c.querySelector(".pe")) return;
      const row = document.createElement("div"); row.className = "pr2 pe";
      row.innerHTML = '<input class="fi" id="pnp" type="number" inputmode="numeric" placeholder="Yangi narx (0 = bepul)" style="flex:2"><button data-a="psave" type="button">Saqlash</button>';
      c.appendChild(row);
    }else if(b.dataset.a === "psave"){
      const v = parseInt(c.querySelector("#pnp").value, 10);
      if(isNaN(v) || v < 0){ toastA("Narxni yozing"); return; }
      try{ await call("/api/admin/paper_upd", {id, price: v}); toastA("Saqlandi"); draw(); }catch(x){ toastA("Saqlab bo'lmadi"); }
    }
  };
  function form(){
    body.onclick = null;
    let file = null;
    body.innerHTML = '<label>Fan</label><select class="fi" id="psb">' + SUBJECTS.map(n => `<option>${esc2(n)}</option>`).join("") + '</select>'
      + '<label>Nomi</label><input class="fi" id="ptt" placeholder="Masalan: 2025-yil Tarix savollari">'
      + '<label>Narxi (so\'m, 0 = bepul)</label><input class="fi" id="ppr" type="number" inputmode="numeric" value="0">'
      + '<label>Test kodi (ixtiyoriy)</label><input class="fi" id="pcd" inputmode="numeric" maxlength="4" placeholder="Masalan: 1234">'
      + '<label>Fayl</label><div class="pdc" id="pdc"><div style="flex:none">' + jl("#2440d6", '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>', 52, 27) + '</div><div class="nm"><b>Savollar PDF</b><small id="pnm">Yuklanmagan</small></div><button class="yb" type="button" id="pyb">Yuklash</button></div>'
      + '<input type="file" id="pfl" accept="application/pdf" style="display:none"><div class="perr" id="perr"></div>'
      + '<button class="big2" id="padd" type="button">Qo\'shish</button><button class="big2 s" id="pbk" type="button">Orqaga</button>';
    body.querySelector("#pyb").onclick = () => body.querySelector("#pfl").click();
    body.querySelector("#pdc").onclick = e => { if(e.target.id !== "pyb") body.querySelector("#pfl").click(); };
    body.querySelector("#pfl").onchange = e => {
      const f = e.target.files[0]; if(!f) return;
      if(f.size > 15 * 1024 * 1024){ body.querySelector("#perr").textContent = "Fayl 15 MB dan katta."; return; }
      file = f; body.querySelector("#perr").textContent = "";
      body.querySelector("#pnm").textContent = f.name + " · " + fsz(f.size);
      body.querySelector("#pdc").classList.add("ok"); body.querySelector("#pyb").textContent = "O'zgartirish";
    };
    body.querySelector("#pbk").onclick = draw;
    body.querySelector("#padd").onclick = async () => {
      const er = body.querySelector("#perr"), t = body.querySelector("#ptt").value.trim();
      if(!t){ er.textContent = "Nomini yozing."; return; }
      if(!file){ er.textContent = "PDF faylni yuklang."; return; }
      const b = body.querySelector("#padd"); b.disabled = true; er.textContent = "";
      try{
        const data = await new Promise((ok, no) => { const rd = new FileReader(); rd.onload = () => ok(rd.result); rd.onerror = no; rd.readAsDataURL(file); });
        await call("/api/papers/create", {subject: body.querySelector("#psb").value, title: t, price: parseInt(body.querySelector("#ppr").value, 10) || 0, test_code: body.querySelector("#pcd").value.trim(), data});
        toastA("Qo'shildi"); draw();
      }catch(x){ er.textContent = String(x.message).includes("400") ? "Bunday kodli test topilmadi yoki ma'lumot noto'g'ri." : "Yuklab bo'lmadi. Qayta urinib ko'ring."; b.disabled = false; }
    };
  }
  draw();
}

/* ---- Foydalanuvchilar ---- */
async function usersScreen(){
  const body = sub("Foydalanuvchilar", "Qidirish va balans");
  body.innerHTML = '<input class="fi" id="uq" placeholder="Ism yoki Telegram ID" style="width:100%;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:13px;font:600 15.5px system-ui,sans-serif"><div id="ul"></div>';
  const list = body.querySelector("#ul"); let T, cur = {};
  const load = async () => {
    list.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
    try{
      const r = await call("/api/admin/users", {q: body.querySelector("#uq").value});
      cur = {}; r.users.forEach(u => cur[u.telegram_id] = u);
      list.innerHTML = r.users.length ? r.users.map(u => `<div class="pc" data-id="${u.telegram_id}"><div class="pm"><b>${esc2((u.first_name || "") + " " + (u.last_name || ""))}</b><small>${esc2(u.region || "—")} · ID ${u.telegram_id}</small><span class="amt" style="font-size:17px">${som(u.balance || 0)} so'm</span><small>Referal: ${som(u.ref_balance || 0)} so'm</small></div><div class="pr2" style="display:flex;gap:8px;margin-top:10px"><input class="fi" type="number" inputmode="numeric" placeholder="Summa" style="flex:2;background:#fff;border:1.5px solid #dfe5f6;border-radius:12px;padding:10px;font:600 15px system-ui,sans-serif;min-width:0"><button data-s="1" type="button" style="flex:1;border:0;border-radius:12px;background:#dff5e8;color:#1a8a4a;font:800 18px system-ui,sans-serif">＋</button><button data-s="-1" type="button" style="flex:1;border:0;border-radius:12px;background:#fde4e5;color:#b3262b;font:800 18px system-ui,sans-serif">−</button></div></div>`).join("") : '<div class="empty" style="margin-top:20px"><div>🔍</div><b>Topilmadi</b></div>';
    }catch(e){ list.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; }
  };
  body.querySelector("#uq").oninput = () => { clearTimeout(T); T = setTimeout(load, 450); };
  list.onclick = async e => {
    const b = e.target.closest("[data-s]"); if(!b) return;
    const c = b.closest(".pc"), v = parseInt(c.querySelector("input").value, 10);
    if(!v || v < 0){ toastA("Summani yozing"); return; }
    try{
      const r = await call("/api/admin/user_bal", {id: +c.dataset.id, delta: v * +b.dataset.s});
      toastA("Balans: " + som(r.balance) + " so'm"); load();
    }catch(x){ toastA("Bajarilmadi (balans yetmasligi mumkin)"); }
  };
  load();
}
const tgw = window.Telegram && Telegram.WebApp;
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.pay = () => paysScreen("pend", "topup");
window.ADMIN_SECTIONS.wd = () => paysScreen("pend", "withdraw");
window.ADMIN_SECTIONS.msg = msgScreen;
window.ADMIN_SECTIONS.res = resScreen;
window.ADMIN_SECTIONS.past = pastScreen;
window.ADMIN_SECTIONS.users = usersScreen;

document.addEventListener("click", e => {
  if(e.target.closest(".hello")) openPanel();
});
})();
