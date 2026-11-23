(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".pkc{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:10px}.pkc span{border-radius:9px;background:#e8edfb;color:#2440d6;text-align:center;padding:5px 0;font:800 12.5px system-ui,sans-serif}.pkc span small{display:block;font-size:9.5px;opacity:.7}"
+ ".pkc span.y{background:#fff0c9;color:#7a5200}.pkc span.x{background:#fde4e5;color:#b3262b}.pkc span.e{background:#f2f4fb;color:#b9c0dc}"
+ ".pko{display:flex;align-items:center;gap:8px;margin-bottom:8px}.pko b{width:34px;font-size:14px;color:#6b7699}.pko input{flex:1}"
+ ".pkq{background:#f6f8ff;border-radius:16px;padding:8px 10px;margin-bottom:10px}.pkh{display:flex;align-items:center;gap:8px;margin-bottom:6px}.pkh span{flex:1;font:800 14px system-ui,sans-serif;color:#0f1a4d}.pkh button{width:42px;height:34px;border:0;border-radius:11px;font:800 17px system-ui,sans-serif;color:#fff}.pp1{background:#2440d6}.pp2{background:#e5484d}"
+ ".pkb{flex:none;border:0;background:#fff0c9;color:#7a5200;border-radius:12px;padding:9px 11px;font:800 13px system-ui,sans-serif;margin-left:6px}"
+ "</style>");
function screen(t, n){
  const d = document.createElement("div"); d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>' + esc(t) + "</b><small>" + n + '</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove(); document.body.appendChild(d);
  return d.querySelector(".body");
}
const loc = s => { if(!s) return ""; const d = new Date(s); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
async function open(id, title){
  const b = screen("Javoblar", esc(title));
  b.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let k; try{ k = await call("/api/papers/key_get", {id}); }catch(e){ b.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const O = Array.from({length: 10}, (_, i) => k.open[i] || "");
  const P = O.map(v => { const a = (Array.isArray(v) ? v : String(v).split(";")).map(x => String(x).trim()); return a.length ? a : [""]; });
  b.innerHTML = '<div class="sf"><label>Yopiq javoblar (1–35)</label><input id="kc" autocapitalize="characters" autocomplete="off" placeholder="BDACABCD..." value="' + esc(k.closed) + '" style="text-transform:uppercase;letter-spacing:1px">'
    + '<div id="kn" style="margin-top:6px;font:800 13.5px system-ui,sans-serif"></div><div class="pkc" id="kg"></div>'
    + '<p class="sub" style="font-size:12.5px;margin:8px 0 0">Hammasini bitta qatorda yozing yoki joylashtiring. 1–32: A B C D, 33–35: A–F. Bo\'sh joy va vergul e\'tiborga olinmaydi.</p></div>'
    + '<div class="sf"><label>Ochiq javoblar (36–45)</label><div id="ko"></div><p class="sub" style="font-size:12.5px;margin:0">Savolda bir necha qism bo\'lsa «＋» bosing. Ishlatmaydigan savolni bo\'sh qoldiring.</p></div>'
    + '<div class="sf"><label>Vaqt (daqiqa)</label><input id="km" type="number" inputmode="numeric" value="' + esc(k.minutes) + '">'
    + '<label>Boshlanishi (ixtiyoriy)</label><input id="ks" type="datetime-local" value="' + loc(k.starts_at) + '"><label>Tugashi (ixtiyoriy)</label><input id="ke" type="datetime-local" value="' + loc(k.ends_at) + '"></div>'
    + '<div class="sw"><div class="tx"><b>Rash ball hisoblansin</b><small>Yoqilsa, 30 ta ishtirokchidan keyin ball Rasch usulida qayta hisoblanadi. O\'chiq bo\'lsa oddiy ball.</small></div><button class="tg' + (k.rash ? " on" : "") + '" id="kr" type="button"></button></div>'
    + '<button class="sbtn" id="ksv" type="button">Saqlash</button>'
    + (k.code ? '<p class="sub" style="text-align:center">Test kodi: <b>' + esc(k.code) + "</b></p>" : "");
  const ko = b.querySelector("#ko");
  const drawO = () => {
    ko.innerHTML = P.map((a, i) => '<div class="pkq"><div class="pkh"><span>' + (36 + i) + '-savol</span><button type="button" class="pp1" data-q="' + i + '" data-d="1">＋</button><button type="button" class="pp2" data-q="' + i + '" data-d="-1">－</button></div>'
      + a.map((v, j) => '<div class="pko okey"><b>' + (j + 1) + ')</b><input data-q="' + i + '" data-p="' + j + '" value="' + esc(v) + '" placeholder="To\'g\'ri javob"></div>').join("") + "</div>").join("");
  };
  ko.oninput = e => { const t = e.target; if(t.dataset.p != null) P[+t.dataset.q][+t.dataset.p] = t.value; };
  ko.onclick = e => { const t = e.target.closest("[data-d]"); if(!t) return; const a = P[+t.dataset.q];
    if(t.dataset.d === "1"){ if(a.length < 6) a.push(""); } else if(a.length > 1) a.pop();
    drawO(); };
  drawO();
  const inp = b.querySelector("#kc");
  const grid = () => {
    const v = inp.value.toUpperCase().replace(/[^A-F]/g, "").slice(0, 35);
    if(v !== inp.value) inp.value = v;
    let bad = 0, h = "";
    for(let i = 0; i < 35; i++){
      const c = v[i], wrong = c && i < 32 && !"ABCD".includes(c);
      if(wrong) bad++;
      h += '<span class="' + (wrong ? "x" : !c ? "e" : i >= 32 ? "y" : "") + '"><small>' + (i + 1) + "</small>" + (c || "·") + "</span>";
    }
    b.querySelector("#kg").innerHTML = h;
    b.querySelector("#kn").innerHTML = '<span style="color:' + (v.length === 35 && !bad ? "#1e8a4c" : "#c0392b") + '">' + v.length + " / 35</span>" + (bad ? ' <span style="color:#c0392b">· 1–32 da faqat A–D</span>' : "");
    return v.length === 35 && !bad;
  };
  inp.oninput = grid; grid();
  b.querySelector("#kr").onclick = e => e.target.classList.toggle("on");
  b.querySelector("#ksv").onclick = async e => {
    if(!grid()){ toast("Yopiq javoblar 35 ta bo'lsin"); return; }
    const iso = s => s ? new Date(s).toISOString() : "";
    e.target.disabled = true;
    try{
      const r = await call("/api/papers/key_save", {id, closed: inp.value, open: P.map(a => a.map(x => x.trim()).filter(Boolean).join(";")), minutes: parseInt(b.querySelector("#km").value, 10) || 180, rash: b.querySelector("#kr").classList.contains("on"), starts_at: iso(b.querySelector("#ks").value), ends_at: iso(b.querySelector("#ke").value)});
      toast("Saqlandi · test kodi " + r.code); b.closest(".adm2").remove();
    }catch(x){ toast("Saqlab bo'lmadi. Ma'lumotni tekshiring."); e.target.disabled = false; }
  };
}
function mark(){
  document.querySelectorAll(".adm2").forEach(a => {
    const t = a.querySelector(".ah b"); if(!t || t.textContent !== "Tushgan savollar") return;
    a.querySelectorAll(".pc[data-id]").forEach(c => {
      const r = c.querySelector(".pr2"); if(!r || r.querySelector(".pkb")) return;
      const bt = document.createElement("button"); bt.type = "button"; bt.className = "pkb"; bt.textContent = "🔑 Javoblar";
      bt.dataset.kk = c.dataset.id; r.insertBefore(bt, r.firstChild);
    });
  });
}
document.addEventListener("click", e => {
  const b = e.target.closest(".pkb"); if(!b) return;
  e.stopPropagation();
  const c = b.closest(".pc"); open(+b.dataset.kk, c.querySelector("b").textContent);
}, true);
new MutationObserver(mark).observe(document.body, {childList: true, subtree: true});
})();
    
