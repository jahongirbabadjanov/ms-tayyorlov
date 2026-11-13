(function(){
const SUPPORT = "https://t.me/babadjanov5";
const css = `
nav button svg{width:24px;height:24px;display:block}
.pf-bal{padding:18px;border-radius:22px;background:linear-gradient(135deg,#4338ca,#0f766e);color:#fff;margin-bottom:14px;display:flex;flex-direction:column;gap:14px}
.pf-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.pf-lbl{display:flex;align-items:center;gap:8px;font-size:13px;color:#e3e7ff}
.pf-amt{font-size:32px;font-weight:700;margin-top:4px}
.pf-pill{border:0;border-radius:99px;background:#fff;color:#3730a3;font:inherit;font-weight:700;font-size:15px;padding:0 20px;min-height:44px;cursor:pointer}
.pf-link{display:inline-flex;align-items:center;gap:4px;min-height:44px;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:600;text-decoration:underline;padding:0;cursor:pointer}
.pf-chips{display:flex;gap:8px}
.pf-chip{flex:1;min-height:44px;border:1px solid rgba(255,255,255,.45);border-radius:14px;background:rgba(255,255,255,.14);color:#fff;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.pf-row{display:flex;align-items:center;gap:14px;width:100%;min-height:72px;padding:14px 16px;border-radius:20px;background:var(--card);border:1px solid var(--line);color:var(--text);font:inherit;text-align:left;margin-bottom:14px;cursor:pointer}
.pf-ic{flex:none;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:#1f2a55;color:#9fb0ff}
.pf-ic.g{background:#123a3a;color:#5eead4}
.pf-row b,.pf-ref b{display:block;font-size:16px}
.pf-row small,.pf-ref small{color:var(--muted);font-size:13px}
.pf-ft{margin:12px 0 0;padding:10px 12px;border-radius:14px;background:#fff1cc;color:#8a5a00;font-size:13px;font-weight:600;line-height:1.4}.pf-ref{padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--line);margin-bottom:14px}
.pf-head{display:flex;align-items:center;gap:14px}
.pf-url{margin:12px 0;padding:12px 14px;border-radius:12px;background:#0c1226;border:1px dashed #3a4778;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;color:#cfd6f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pf-btns{display:flex;gap:10px}
.pf-btns button{flex:1;min-height:44px;border-radius:14px;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
.pf-b1{border:1px solid #3a4778;background:transparent;color:var(--text)}
.pf-b2{border:0;background:#5b4cf0;color:#fff}
.wl-head{display:flex;align-items:center;gap:8px;margin-bottom:14px}
.wl-back{flex:none;width:44px;height:44px;border-radius:14px;background:var(--card);border:1px solid var(--line);color:var(--text);display:grid;place-items:center;cursor:pointer}
.wl-title{font-size:20px;font-weight:700}
.wl-sum{padding:18px;border-radius:22px;background:linear-gradient(135deg,#4338ca,#0f766e);color:#fff;margin-bottom:14px}
.wl-sum small{display:block;font-size:13px;color:#e3e7ff}
.wl-sum b{display:block;font-size:32px;font-weight:700;margin-top:2px}
.wl-sum div{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.35);font-size:13px;display:flex;justify-content:space-between;gap:8px}
.wl-box{padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--line);margin-bottom:14px}
.wl-box label{margin:12px 0 6px}
.wl-box label:first-child{margin-top:0}
.wl-chips{display:flex;gap:8px;margin-top:10px}
.wl-chips button{flex:1;min-height:44px;border-radius:14px;border:1px solid var(--line2);background:var(--card2);color:var(--text);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.wl-calc{display:flex;justify-content:space-between;gap:8px;padding:12px 14px;border-radius:12px;background:#0c1226;font-size:14px;margin-top:12px}
.wl-notes{margin:12px 0 0;padding-left:18px;font-size:13px;line-height:1.6;color:var(--muted)}
.wl-card{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;border-radius:12px;background:#0c1226;border:1px dashed #3a4778;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:16px;letter-spacing:1px}
.wl-card button{flex:none;min-height:44px;padding:0 14px;border-radius:12px;border:1px solid #3a4778;background:transparent;color:var(--text);font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.wl-file{display:flex;align-items:center;gap:10px;min-height:52px;padding:0 14px;border-radius:14px;border:1px dashed #3a4778;background:#0c1226;color:var(--text);font-size:14px;cursor:pointer}
.wl-file img{width:36px;height:36px;border-radius:8px;object-fit:cover}
.wl-go{width:100%;margin-top:14px;min-height:48px;border:0;border-radius:14px;background:#5b4cf0;color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer}
.wl-go:disabled{opacity:.5}
.wl-sec{font-size:16px;font-weight:700;margin:6px 0 10px}
.wl-item{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-radius:18px;background:var(--card);border:1px solid var(--line);margin-bottom:10px}
.wl-item small{display:block;color:var(--muted);font-size:12px}
.wl-st{padding:6px 12px;border-radius:99px;font-size:12px;font-weight:700}
.st-p{background:#3a2c0c;color:#fbbf24}.st-o{background:#123a3a;color:#5eead4}.st-n{background:#3b1620;color:#ff8da1}
.wl-ok{text-align:center;padding:26px 16px}
.wl-ok h2{margin:0 0 8px}
`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
$("app").insertAdjacentHTML("beforeend", '<section id="v-wallet" class="hidden"></section>');

const S = 'width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const IC = {
  wallet: '<svg ' + S + ' style="width:18px;height:18px"><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1.2"/></svg>',
  chev: '<svg ' + S + ' style="width:16px;height:16px"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg ' + S + '><path d="M15 6l-6 6 6 6"/></svg>',
  headset: '<svg ' + S + '><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/><path d="M19 20c0 1.5-2 2-5 2"/></svg>',
  users: '<svg ' + S + '><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M17 5a3.5 3.5 0 0 1 0 6.5M18 14.8c2.4.6 3.5 2.3 3.5 5.2"/></svg>'
};

let W = null, FT = null;
const num = n => Number(n || 0).toLocaleString("ru-RU");
const money = n => num(n) + " so‘m";
const digits = s => (s || "").replace(/\D/g, "");
const openTg = url => { if(tg.openTelegramLink) tg.openTelegramLink(url); else window.open(url, "_blank"); };
const loadW = async () => { try{ W = await call("/api/wallet", {}); }catch(e){} try{ FT = await call("/api/freetest", {}); }catch(e){} };
const ST = {pending: ["Kutilmoqda", "st-p"], ok: ["Tasdiqlandi", "st-o"], no: ["Rad etildi", "st-n"]};

const _go = window.go;
window.go = v => { $("v-wallet").classList.add("hidden"); _go(v); };

function showWallet(){
  ["tests", "answer", "create", "profile"].forEach(x => $("v-" + x).classList.add("hidden"));
  const ex = $("v-exam"); if(ex) ex.classList.add("hidden");
  $("v-wallet").classList.remove("hidden");
  window.scrollTo(0, 0);
}
const head = title => '<div class="wl-head"><button class="wl-back" id="wl-back" type="button" aria-label="Orqaga">' + IC.back + '</button><div class="wl-title">' + title + '</div></div>';
const wire = () => { $("wl-back").onclick = () => go("profile"); };
function hist(kind){
  const list = ((W && W.payments) || []).filter(p => p.kind === kind);
  if(!list.length) return "";
  return '<div class="wl-sec">So‘rovlar holati</div>' + list.map(p => {
    const s = ST[p.status] || ST.pending;
    const d = p.created_at ? new Date(p.created_at).toLocaleDateString("ru-RU") : "#" + p.id;
    return '<div class="wl-item"><div><b>' + money(p.amount) + '</b><small>' + d + '</small></div><span class="wl-st ' + s[1] + '">' + s[0] + '</span></div>';
  }).join("");
}
function doneView(title, text){
  $("v-wallet").innerHTML = head(title) + '<div class="wl-box wl-ok"><h2>✅ Yuborildi</h2><p class="sub">' + text + '</p><button class="wl-go" id="wl-ok" type="button">Profilga qaytish</button></div>';
  wire(); $("wl-ok").onclick = () => go("profile");
}
function toJpeg(file){
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, 1600 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      const g = c.getContext("2d");
      g.fillStyle = "#ffffff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      res(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => rej(new Error("img"));
    img.src = url;
  });
}

function readFile(file){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result));
    fr.onerror = () => rej(new Error("read"));
    fr.readAsDataURL(file);
  });
}

async function openTopup(amount){
  showWallet();
  if(!W) await loadW();
  const w = W || {}, min = w.min_topup || 5000, max = w.max_topup || 5000000;
  const card = digits(w.card).replace(/(.{4})/g, "$1 ").trim();
  let photo = "", kind = "photo";
  $("v-wallet").innerHTML = head("Balansni to‘ldirish") +
    '<div class="wl-sum"><small>Hozirgi balans</small><b>' + money(w.balance) + '</b></div>' +
    '<div class="wl-box"><label for="tp-sum">Summa (so‘m)</label>' +
    '<input id="tp-sum" inputmode="numeric" placeholder="Masalan: 25 000" value="' + (amount ? num(amount) : "") + '">' +
    '<div class="wl-chips">' + [10000, 25000, 50000, 100000].map(n => '<button type="button" data-n="' + n + '">' + num(n) + '</button>').join("") + '</div>' +
    '<label>Karta raqami (Humo)</label>' +
    '<div class="wl-card"><span id="tp-card">' + (card || "Hali kiritilmagan") + '</span>' + (card ? '<button id="tp-copy" type="button">Nusxalash</button>' : '') + '</div>' +
    '<ul class="wl-notes"><li>Summani yozing va shu kartaga o‘tkazing</li><li>To‘lov chekining rasmini yuboring</li><li>Admin tasdiqlagach balans to‘ldiriladi</li></ul>' +
    '<label>Chek (rasm yoki PDF)</label><label class="wl-file" for="tp-file"><span id="tp-fn">Rasm yoki PDF tanlang</span></label>' +
    '<input id="tp-file" type="file" accept="image/*,application/pdf" class="hidden">' +
    '<div class="err" id="tp-err"></div><button class="wl-go" id="tp-go" type="button">Chekni yuborish</button></div>' +
    hist("topup");
  wire();
  document.querySelectorAll(".wl-chips button").forEach(b => b.onclick = () => { $("tp-sum").value = num(b.dataset.n); });
  $("tp-sum").oninput = e => { const d = digits(e.target.value); e.target.value = d ? num(d) : ""; };
  if($("tp-copy")) $("tp-copy").onclick = async () => {
    try{ await navigator.clipboard.writeText(digits(w.card)); $("tp-copy").textContent = "Nusxalandi ✓"; }catch(e){}
  };
  $("tp-file").onchange = async e => {
    const f = e.target.files[0]; if(!f) return;
    $("tp-err").textContent = "";
    try{
      if(f.type === "application/pdf" || /\.pdf$/i.test(f.name)){
        if(f.size > 4 * 1024 * 1024){ photo = ""; $("tp-err").textContent = "PDF hajmi 4 MB dan oshmasin."; return; }
        photo = await readFile(f); kind = "pdf";
        $("tp-fn").textContent = "📄 " + f.name;
      }else if(f.size <= 4 * 1024 * 1024 && /^image\/(png|jpeg|webp)$/.test(f.type)){
        photo = await readFile(f); kind = "photo";
        $("tp-fn").innerHTML = '<img src="' + photo + '" alt=""> ' + esc(f.name);
      }else{
        photo = await toJpeg(f); kind = "photo";
        $("tp-fn").innerHTML = '<img src="' + photo + '" alt=""> ' + esc(f.name);
      }
    }catch(err){ photo = ""; $("tp-err").textContent = "Fayl o‘qilmadi. Boshqa fayl tanlang."; }
  };
  $("tp-go").onclick = async () => {
    const amt = parseInt(digits($("tp-sum").value), 10) || 0;
    $("tp-err").textContent = "";
    if(amt < min || amt > max){ $("tp-err").textContent = "Summa " + money(min) + " dan " + money(max) + " gacha bo‘lishi kerak."; return; }
    if(!photo){ $("tp-err").textContent = "Chek rasmini yoki PDF faylini tanlang."; return; }
    $("tp-go").disabled = true;
    try{
      await call("/api/topup", {amount: amt, photo: photo.split(",")[1], kind: kind});
      await loadW();
      doneView("Balansni to‘ldirish", "Chek yuborildi. Admin tekshirgach balansingiz to‘ldiriladi.");
    }catch(e){
      $("tp-err").textContent = e.detail || "Xatolik. Qayta urinib ko‘ring.";
      $("tp-go").disabled = false;
    }
  };
}

async function openWithdraw(){
  showWallet();
  if(!W) await loadW();
  const w = W || {}, ref = w.ref_balance || 0, min = w.min_withdraw || 5000, fee = w.fee == null ? 5 : w.fee;
  const can = ref >= min;
  $("v-wallet").innerHTML = head("Pulni chiqarish") +
    '<div class="wl-sum"><small>Referal daromadi (chiqarish mumkin)</small><b>' + money(ref) + '</b>' +
    '<div><span>Test balansi: ' + money(w.balance) + '</span><span>Chiqarilmaydi</span></div></div>' +
    '<div class="wl-box"><label for="wd-sum">Summa (so‘m)</label>' +
    '<input id="wd-sum" inputmode="numeric" placeholder="' + num(min) + '" value="' + (can ? num(ref) : "") + '">' +
    '<div class="wl-chips"><button type="button" id="wd-all">Hammasi</button></div>' +
    '<label for="wd-card">Karta raqami</label><input id="wd-card" inputmode="numeric" maxlength="19" placeholder="8600 0000 0000 0000">' +
    '<div class="wl-calc"><span id="wd-fee"></span><b id="wd-net"></b></div>' +
    '<ul class="wl-notes"><li>Faqat referal orqali ishlangan pul chiqariladi</li><li>Admin tasdiqlagach pul kartaga tushadi</li><li>Minimal summa: ' + money(min) + ', komissiya: ' + fee + '%</li></ul>' +
    (can ? "" : '<p class="err">Chiqarish uchun yana ' + money(min - ref) + ' kerak.</p>') +
    '<div class="err" id="wd-err"></div><button class="wl-go" id="wd-go" type="button"' + (can ? "" : " disabled") + '>So‘rov yuborish</button></div>' +
    hist("withdraw");
  wire();
  const calc = () => {
    const a = parseInt(digits($("wd-sum").value), 10) || 0, f = Math.floor(a * fee / 100);
    $("wd-fee").textContent = "Komissiya (" + fee + "%): " + money(f);
    $("wd-net").textContent = "Qo‘lingizga: " + money(Math.max(0, a - f));
  };
  calc();
  $("wd-sum").oninput = e => { const d = digits(e.target.value); e.target.value = d ? num(d) : ""; calc(); };
  $("wd-all").onclick = () => { $("wd-sum").value = ref ? num(ref) : ""; calc(); };
  $("wd-card").oninput = e => { e.target.value = digits(e.target.value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim(); };
  $("wd-go").onclick = async () => {
    const a = parseInt(digits($("wd-sum").value), 10) || 0;
    $("wd-err").textContent = "";
    if(a < min){ $("wd-err").textContent = "Minimal summa " + money(min) + "."; return; }
    if(a > ref){ $("wd-err").textContent = "Referal daromadingiz yetarli emas."; return; }
    if(digits($("wd-card").value).length !== 16){ $("wd-err").textContent = "Karta raqami 16 ta raqamdan iborat bo‘lishi kerak."; return; }
    $("wd-go").disabled = true;
    try{
      const r = await call("/api/withdraw", {amount: a, card: digits($("wd-card").value)});
      await loadW();
      doneView("Pulni chiqarish", "Kartangizga " + money(r.net) + " o‘tkaziladi (komissiya " + money(r.fee) + "). Admin tasdiqlagach pul tushadi.");
    }catch(e){
      $("wd-err").textContent = e.detail || "Xatolik. Qayta urinib ko‘ring.";
      $("wd-go").disabled = false;
    }
  };
}

function draw(){
  const u = ME || {};
  const name = [u.last_name, u.first_name, u.middle_name].filter(Boolean).join(" ");
  const bal = W ? W.balance : u.balance;
  const ref = W ? W.ref_balance : u.ref_balance;
  const bonus = W ? W.bonus : 1000;
  const chips = [10000, 25000, 50000].map(n => '<button class="pf-chip" data-a="' + n + '" type="button">' + num(n) + '</button>').join("");
  $("v-profile").innerHTML =
    '<div class="pf-bal"><div class="pf-top"><div>' +
      '<div class="pf-lbl">' + IC.wallet + '<span>Balans</span></div>' +
      '<div class="pf-amt">' + money(bal) + '</div>' +
      '<button class="pf-link" id="pf-wd" type="button">Referal: ' + money(ref) + ' · Chiqarish ' + IC.chev + '</button>' +
    '</div><button class="pf-pill" data-a="0" type="button">To‘ldirish</button></div>' +
    '<div class="pf-chips">' + chips + '<button class="pf-chip" data-a="0" type="button">Boshqa</button></div></div>' +
    '<div class="card"><h2>' + esc(name) + '</h2><p class="sub">Profil</p>' +
      '<div class="kv"><span>Telefon</span><span>' + esc(u.phone || "-") + '</span></div>' +
      '<div class="kv"><span>Viloyat</span><span>' + esc(u.region || "-") + '</span></div>' +
      '<div class="kv"><span>Tuman</span><span>' + esc(u.district || "-") + '</span></div></div>' +
    '<button class="pf-row" id="pf-sup" type="button"><span class="pf-ic">' + IC.headset + '</span>' +
      '<span style="flex:1"><b>Qo‘llab-quvvatlash</b><small>Savol yoki muammo bo‘lsa, yozing</small></span>' +
      '<span style="color:var(--muted)">' + IC.chev + '</span></button>' +
    '<div class="pf-ref"><div class="pf-head"><span class="pf-ic g">' + IC.users + '</span><span>' +
      '<b>Do‘stlarni taklif qiling</b><small>Har bir do‘st uchun ' + money(bonus) + ' bonus olasiz</small></span></div>' +
      (FT ? '<div class="pf-ft">🎁 Bepul testlar: <strong>' + FT.credits + '</strong> ta · ' + FT.per + ' ta do‘st = 1 bepul test (keyingisigacha ' + FT.left + ' ta do‘st qoldi)</div>' : '') +
      '<div class="pf-url">' + (W ? esc(W.ref_link) : "Yuklanmoqda...") + '</div>' +
      '<div class="pf-btns"><button class="pf-b1" id="pf-copy" type="button">Nusxalash</button>' +
      '<button class="pf-b2" id="pf-share" type="button">Ulashish</button></div></div>';
  bind();
}

function bind(){
  document.querySelectorAll("#v-profile [data-a]").forEach(b => b.onclick = () => openTopup(parseInt(b.dataset.a, 10) || 0));
  $("pf-wd").onclick = openWithdraw;
  $("pf-sup").onclick = () => openTg(SUPPORT);
  $("pf-copy").onclick = async () => {
    if(!W) return;
    const b = $("pf-copy");
    try{ await navigator.clipboard.writeText(W.ref_link); }
    catch(e){
      const t = document.createElement("textarea");
      t.value = W.ref_link; document.body.appendChild(t); t.select();
      try{ document.execCommand("copy"); }catch(_){}
      t.remove();
    }
    b.textContent = "Nusxalandi ✓";
    setTimeout(() => { b.textContent = "Nusxalash"; }, 1500);
  };
  $("pf-share").onclick = () => {
    if(!W) return;
    openTg("https://t.me/share/url?url=" + encodeURIComponent(W.ref_link) +
      "&text=" + encodeURIComponent("MS Tayyorlov: milliy sertifikat testlariga tayyorlaning!"));
  };
}

window.fillProfile = async function(){
  draw();
  await loadW();
  draw();
};
})();
