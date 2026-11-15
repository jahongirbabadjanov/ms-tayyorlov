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
async function openPanel(){
  if(busy || document.getElementById("adm")) return;
  busy = true;
  let s;
  try{ s = await call("/api/admin/stats", {}); }
  catch(e){ busy = false; return; }
  busy = false;
  const d = document.createElement("div");
  d.className = "adm"; d.id = "adm";
  const full = ME ? [ME.first_name, ME.last_name].filter(Boolean).join(" ") : "";
  const mln = n => n == null ? "—" : n >= 1000000 ? (n / 1000000).toFixed(2).replace(".", ",").replace(/,?0+$/, "") + " mln" : som(n);
  d.innerHTML = `<div class="ah"><button class="ab" id="admx" type="button" aria-label="Orqaga">‹</button><div><b>Admin panel</b><small>${esc2(full)}</small></div><span class="pill">ADMIN</span></div>`
    + `<div class="big"><b>${som(s.users)}</b><span>foydalanuvchi</span>${s.new_today ? `<em>+${s.new_today} bugun</em>` : ""}</div>`
    + `<div class="st3"><div><b>${som(s.active_today)}</b><small>bugun faol</small></div><div><b>${som(s.done_total)}</b><small>test ishlagan</small></div><div><b>${mln(s.income_today)}</b><small>bugungi kirim</small></div></div>`
    + `<div class="gr">` + SEC.map(x => { const bd = x.badge ? x.badge(s) : 0; return `<button class="tl" type="button" data-k="${x.k}">${bd ? "<em>" + bd + "</em>" : ""}${jl(x.c, x.p, 52, 27)}<span><b>${x.n}</b><small>${x.sub(s)}</small></span></button>`; }).join("") + `</div>`;
  document.body.appendChild(d);
  d.querySelector("#admx").onclick = () => d.remove();
  d.addEventListener("click", e => {
    const b = e.target.closest(".tl"); if(!b) return;
    const h = window.ADMIN_SECTIONS && window.ADMIN_SECTIONS[b.dataset.k];
    if(h) h(d, s); else toastA("Bu bo'lim tez orada qo'shiladi");
  });
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
async function msgScreen(){
  const body = sub("Xabar yuborish", "Test belgilab yoki ommaviy");
  body.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let r;
  try{ r = await call("/api/admin/msg_tests", {}); }catch(e){ body.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  if(!r.tests.length){ body.innerHTML = '<div class="empty"><div>📭</div><b>Testlar yo\'q</b></div>'; return; }
  let aud = "new", cur = r.tests[0];
  const AU = [["all", "Hammaga"], ["new", "Ishlamaganlarga"], ["done", "Ishlaganlarga"]];
  const textFor = (t, a) => {
    const e = emo(t.subject);
    if(a === "new") return e + " " + t.title + " hali ishlanmagan. Hozir boshlang va darajangizni bilib oling!";
    if(a === "done") return "🏆 " + t.title + " natijalari tayyor! Umumiy natijalar va tahlilni ilovada ko'ring.";
    return "📢 Yangi test: " + t.title + "\n" + t.subject + " · " + t.question_count + " ta savol · " + t.duration_minutes + " daqiqa\nTest kodi: " + t.code;
  };
  const lab = a => a === "done" ? "📊 Natijalarni ko'rish" : "🚀 Testni boshlash";
  body.innerHTML = '<h3 style="margin-top:4px">Test</h3><div class="pc" style="padding:0;position:relative"><select id="msl" style="width:100%;border:0;background:none;padding:16px 40px 16px 16px;font:800 16px system-ui,sans-serif;color:var(--text);appearance:none;border-radius:20px"></select><span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none">⌄</span></div>'
    + '<h3>Kimga</h3><div id="mau" style="display:flex;gap:8px"></div>'
    + '<h3>Xabar matni</h3><textarea id="mtx" rows="5" style="width:100%;border:1.5px solid var(--line2);border-radius:20px;padding:14px;font:16px system-ui,sans-serif;font-weight:600;background:#fff;color:var(--text)"></textarea>'
    + '<h3>Ko\'rinishi</h3><div style="background:#e8edfb;border-radius:24px;padding:12px"><div style="font-weight:800;font-size:13px;color:var(--muted);margin:2px 4px 8px">Bot chatida shunday chiqadi</div><div style="background:#fff;border-radius:18px;padding:14px"><div id="mpv" style="white-space:pre-wrap;font-size:15.5px;font-weight:600;color:var(--text)"></div><div id="mbt" style="margin-top:12px;height:46px;border-radius:12px;background:#2440d6;color:#fff;font-weight:800;display:grid;place-items:center"></div></div></div>'
    + '<div id="mcn" style="margin:14px 0;padding:14px;border-radius:16px;background:#fff1cc;color:#8a5a00;font-weight:800;font-size:16px"></div>'
    + '<div style="display:flex;gap:10px"><button type="button" id="mcx" style="flex:1;height:54px;border:0;border-radius:16px;background:#e8edfb;color:#2440d6;font:800 16px system-ui,sans-serif">Bekor qilish</button><button type="button" id="msnd" style="flex:1;height:54px;border:0;border-radius:16px;background:#2440d6;color:#fff;font:800 16px system-ui,sans-serif">Yuborish</button></div>';
  const sel = body.querySelector("#msl"), tx = body.querySelector("#mtx"), pv = body.querySelector("#mpv"), cn = body.querySelector("#mcn"), bt = body.querySelector("#mbt");
  sel.innerHTML = r.tests.map(t => `<option value="${esc2(t.code)}">${emo(t.subject)}  ${esc2(t.title)}</option>`).join("");
  const draw = () => { body.querySelector("#mau").innerHTML = AU.map(a => `<button class="chip${aud === a[0] ? " on" : ""}" data-a="${a[0]}" type="button" style="flex:1;min-width:0;justify-content:center;padding:12px 4px;font-size:14px">${a[1]}</button>`).join(""); };
  const fill = () => { tx.value = textFor(cur, aud); pv.textContent = tx.value; bt.textContent = lab(aud); };
  const cnt = async () => {
    cn.textContent = "Hisoblanmoqda...";
    try{ const x = await call("/api/admin/broadcast", {code: cur.code, audience: aud, send: false}); cn.innerHTML = "Yuboriladi: <b style=\"font-size:18px\">" + som(x.count) + " ta</b> foydalanuvchiga"; cn.dataset.n = x.count; }catch(e){ cn.textContent = ""; }
  };
  draw(); fill(); cnt();
  sel.onchange = () => { cur = r.tests.find(t => t.code === sel.value) || cur; fill(); cnt(); };
  tx.oninput = () => { pv.textContent = tx.value; };
  body.querySelector("#mau").onclick = e => { const a = e.target.closest("[data-a]"); if(a){ aud = a.dataset.a; draw(); fill(); cnt(); } };
  body.querySelector("#mcx").onclick = () => { const w = body.closest(".adm2"); if(w) w.remove(); };
  body.querySelector("#msnd").onclick = () => {
    const go = async () => {
      const b = body.querySelector("#msnd"); b.disabled = true;
      try{ const x = await call("/api/admin/broadcast", {code: cur.code, audience: aud, text: tx.value, send: true}); toastA("Yuborilmoqda: " + x.count + " kishiga. Tugagach botga xabar keladi."); const w = body.closest(".adm2"); if(w) w.remove(); }
      catch(x){ toastA("Yuborib bo'lmadi"); b.disabled = false; }
    };
    const msg = "Xabar " + (cn.dataset.n || "") + " kishiga yuborilsinmi?";
    if(tgw && tgw.showConfirm) tgw.showConfirm(msg, ok => { if(ok) go(); }); else go();
  };
}
const tgw = window.Telegram && Telegram.WebApp;
window.ADMIN_SECTIONS = window.ADMIN_SECTIONS || {};
window.ADMIN_SECTIONS.pay = () => paysScreen("pend", "topup");
window.ADMIN_SECTIONS.wd = () => paysScreen("pend", "withdraw");
window.ADMIN_SECTIONS.msg = msgScreen;
window.ADMIN_SECTIONS.res = resScreen;

document.addEventListener("click", e => {
  if(e.target.closest(".hello")) openPanel();
});
})();
