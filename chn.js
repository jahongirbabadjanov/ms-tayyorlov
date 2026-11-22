(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); };
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".chc{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e3e8f8;border-radius:20px;padding:12px;margin-bottom:10px}"
+ ".chc i{flex:none;width:42px;height:42px;border-radius:14px;background:linear-gradient(160deg,#4cc3ff,#2b7be4);display:grid;place-items:center;color:#fff;font-style:normal;font-weight:900}"
+ ".chc div{flex:1;min-width:0}.chc b{display:block;font-size:15.5px}.chc small{display:block;color:#7a84a8;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+ ".chc button.e{border:0;background:#e8edfb;color:#2440d6;border-radius:12px;padding:9px 12px;font:800 13px system-ui,sans-serif}"
+ ".chadd{display:block;width:100%;height:50px;border:0;border-radius:99px;background:linear-gradient(#3a58ee,#2440d6);color:#fff;font:900 16px system-ui,sans-serif;margin:4px 0 12px;box-shadow:0 8px 18px rgba(36,64,214,.3)}"
+ ".chlink{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e3e8f8;border-radius:20px;padding:16px;margin-bottom:10px;cursor:pointer}.chlink b{flex:1;font-size:16px}.chlink span{color:#9aa3c4;font-size:20px}"
+ "</style>");
let L = [];
function screen(title, note){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>' + title + "</b><small>" + (note || "") + '</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  return d;
}
async function save(){
  await call("/api/admin/channels_save", {channels: L});
}
function form(c, done){
  const isNew = !c;
  c = c || {id: "", name: "", url: "", chat: "", until: "", on: true};
  const s = screen(isNew ? "Kanal qo'shish" : "Kanalni tahrirlash", "Majburiy obuna");
  const b = s.querySelector(".body");
  b.innerHTML = '<div class="sf"><label>Kanal nomi</label><input id="cn" value="' + esc(c.name) + '" placeholder="Masalan: Hamkor kanal">'
    + '<label>Kanal @nomi (obunani tekshirish uchun)</label><input id="cc" value="' + esc(c.chat) + '" placeholder="@kanal_nomi">'
    + '<label>Havola (bo\'sh qolsa @nomdan olinadi)</label><input id="cu" value="' + esc(c.url) + '" placeholder="https://t.me/kanal_nomi">'
    + '<label>Tugash sanasi (ixtiyoriy)</label><input id="cd" type="date" value="' + esc(c.until) + '"></div>'
    + '<div class="sw"><div class="tx"><b>Faol</b><small>O\'chirilsa, obuna tekshirilmaydi</small></div><button class="tg' + (c.on ? " on" : "") + '" id="con" type="button"></button></div>'
    + '<button class="sbtn" id="csv" type="button">Saqlash</button>'
    + (isNew ? "" : '<button class="sbtn" id="cdl" type="button" style="background:#fde4e5;color:#b3262b">O\'chirish</button>')
    + '<p class="sub" style="font-size:12.5px;margin-top:10px">Bot kanalda administrator bo\'lishi shart, aks holda obuna tekshirilmaydi.</p>';
  b.querySelector("#con").onclick = e => e.target.classList.toggle("on");
  b.querySelector("#csv").onclick = async () => {
    const n = {id: c.id, name: b.querySelector("#cn").value.trim(), chat: b.querySelector("#cc").value.trim(), url: b.querySelector("#cu").value.trim(), until: b.querySelector("#cd").value, on: b.querySelector("#con").classList.contains("on")};
    if(!n.name){ toast("Nomini kiriting"); return; }
    const old = L.slice();
    if(isNew) L.push(n); else L = L.map(x => x.id === c.id ? n : x);
    try{ await save(); s.remove(); done(); toast("Saqlandi"); }
    catch(e){ L = old; toast("Noto'g'ri: @nom yoki havolani tekshiring"); }
  };
  const dl = b.querySelector("#cdl");
  if(dl) dl.onclick = async () => {
    const old = L.slice(); L = L.filter(x => x.id !== c.id);
    try{ await save(); s.remove(); done(); toast("O'chirildi"); }catch(e){ L = old; toast("Saqlab bo'lmadi"); }
  };
}
async function list(){
  const s = screen("Majburiy obuna", "Kanallar ro'yxati");
  const b = s.querySelector(".body");
  const draw = () => {
    const today = new Date().toISOString().slice(0, 10);
    b.innerHTML = '<p class="sub" style="font-size:13px">Foydalanuvchi botga kirganda shu kanallarga obuna bo\'lishi so\'raladi. Faol kanallar tekshiriladi.</p>'
      + (L.length ? L.map((c, i) => '<div class="chc"><i>' + (i + 1) + '</i><div><b>' + esc(c.name) + '</b><small>' + esc(c.chat || c.url || "—") + (c.until ? " · " + c.until + " gacha" : "") + '</small></div>'
        + (!c.on ? '<span style="color:#9aa3c4;font-weight:800;font-size:12px">o\'chiq</span>' : (c.until && c.until < today ? '<span style="color:#c0392b;font-weight:800;font-size:12px">muddati o\'tgan</span>' : ""))
        + '<button class="e" data-i="' + i + '" type="button">✏️</button></div>').join("") : '<p class="sub" style="text-align:center">Hali kanal yo\'q.</p>')
      + '<button class="chadd" id="cadd" type="button">+ Kanal qo\'shish</button>';
    b.querySelector("#cadd").onclick = () => form(null, draw);
    b.querySelectorAll(".e").forEach(x => x.onclick = () => form(L[+x.dataset.i], draw));
  };
  b.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  try{ L = (await call("/api/admin/channels", {})).channels || []; }catch(e){ b.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  draw();
}
const mo = new MutationObserver(() => {
  document.querySelectorAll(".adm2").forEach(a => {
    const t = a.querySelector(".ah b");
    const body = a.querySelector(".body");
    if(!t || t.textContent !== "Sozlamalar" || !body || body.querySelector("#chlink") || !body.querySelector("#sst")) return;
    const d = document.createElement("div");
    d.id = "chlink"; d.className = "chlink";
    d.innerHTML = '<span style="font-size:22px">📢</span><b>Majburiy obuna kanallari</b><span>›</span>';
    d.onclick = list;
    body.insertBefore(d, body.firstChild);
  });
});
mo.observe(document.body, {childList: true, subtree: true});
})();
    
