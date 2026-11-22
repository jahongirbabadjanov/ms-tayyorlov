(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const MAXB = 15 * 1024 * 1024;
const IN = "background:#fff;border:1.5px solid #dfe5f6;border-radius:12px;padding:11px;font:600 14.5px system-ui,sans-serif;color:#0f1a4d;min-width:0;width:100%;";
const AW = /(javoblar|javob|yechimlar|yechim|kalit|answers|answer|key)/i, QW = /(savollar|savol|questions|question)/i;
const rd = f => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(f); });
const guess = n => { const l = n.toLowerCase(); for(const [a, b] of [["matem","Matematika"],["fizik","Fizika"],["kimyo","Kimyo"],["biolog","Biologiya"],["geograf","Geografiya"],["tarix","Tarix"],["ingliz","Ingliz tili"],["ona","Ona tili va adabiyot"]]) if(l.includes(a) && SUBJECTS.includes(b)) return b; return ""; };
const p2 = n => String(n).padStart(2, "0");
function parse(name){
  const n = name.replace(/\.pdf$/i, "");
  let date = "", m;
  if((m = n.match(/(\d{1,2})[.\-_\/](\d{1,2})[.\-_\/](\d{4})/))) date = p2(m[1]) + "." + p2(m[2]) + "." + m[3];
  else if((m = n.match(/(\d{4})[.\-_\/](\d{1,2})[.\-_\/](\d{1,2})/))) date = p2(m[3]) + "." + p2(m[2]) + "." + m[1];
  let sm = "";
  if((m = n.match(/(\d)\s*[-_ ]?\s*smena/i)) || (m = n.match(/smena\s*[-_ ]?\s*(\d)/i))) sm = m[1];
  const base = n.replace(AW, " ").replace(QW, " ").replace(/[_\-]+/g, " ").replace(/\s+/g, " ").trim();
  const title = date ? date + (sm ? " " + sm + "-smena" : (base.replace(/\d{1,4}[.\-\/]\d{1,2}[.\-\/]\d{1,4}/, "").trim() ? " " + base.replace(/\d{1,4}[.\-\/]\d{1,2}[.\-\/]\d{1,4}/, "").trim() : "")) : base;
  return {isA: AW.test(n) && !QW.test(n) || AW.test(n), key: date ? date + "|" + sm : base.toLowerCase(), title: title || n};
}
function open(){
  const d = document.createElement("div");
  d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>Ko\'p fayl yuklash</b><small>Tushgan savollar</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove();
  document.body.appendChild(d);
  const body = d.querySelector(".body");
  let items = [], orph = [], S = {subject: SUBJECTS[0], price: "0", when: "", notify: true}, busy = false, done = 0, fin = false;
  const lbl = t => '<label style="display:block;margin:12px 2px 5px;font:700 13.5px system-ui,sans-serif;color:#6b7699">' + t + "</label>";
  const draw = () => {
    const pairs = items.filter(x => x.f && x.a).length, ok = items.filter(x => x.st === "ok").length, err = items.filter(x => x.st === "err").length;
    let h = '<input type="file" id="sf" accept="application/pdf" multiple style="display:none"><button id="spick" type="button" style="width:100%;height:54px;border:0;border-radius:99px;background:linear-gradient(#3a58ee,#2440d6);color:#fff;font:900 16px system-ui,sans-serif;box-shadow:0 8px 18px rgba(36,64,214,.3)">+ PDF fayllarni tanlash (savol + javob)</button>';
    if(fin){
      h += '<div style="margin:14px 0;border-radius:22px;background:linear-gradient(150deg,#2440d6,#1b2fa8);color:#fff;padding:16px"><b style="font-size:32px">' + ok + " / " + items.length + '</b><div style="opacity:.9">test qo\'shildi</div><div style="height:9px;background:rgba(255,255,255,.25);border-radius:9px;margin-top:12px"><div style="width:' + Math.round(ok * 100 / Math.max(1, items.length)) + '%;height:100%;background:#fcc419;border-radius:9px"></div></div></div>'
        + '<div class="sf" style="line-height:1.8;font-weight:700">✅ Savollar PDF: ' + ok + "<br>🔑 Javoblar PDF: " + items.filter(x => x.st === "ok" && x.a).length + (err ? '<br><span style="color:#c0392b">⚠️ Xato: ' + err + "</span>" : "") + "</div>";
      if(err) h += '<button id="sgo" type="button" style="width:100%;height:50px;margin-top:8px;border:0;border-radius:99px;background:#fcc419;color:#111;font:900 15.5px system-ui,sans-serif">Xatolarni qayta yuborish</button>';
      body.innerHTML = h;
      body.querySelector("#spick").onclick = () => { items = []; orph = []; fin = false; draw(); };
      const g = body.querySelector("#sgo"); if(g) g.onclick = go;
      return;
    }
    if(items.length || orph.length){
      h += '<div style="display:flex;gap:8px;margin:12px 0"><div class="sf" style="flex:1;text-align:center;margin:0;padding:10px"><b>' + (items.length + orph.length) + '</b><br><small>fayl guruhi</small></div><div class="sf" style="flex:1;text-align:center;margin:0;padding:10px;color:#1e8a4c"><b>' + pairs + '</b><br><small>juft ✓</small></div><div class="sf" style="flex:1;text-align:center;margin:0;padding:10px;color:' + (orph.length ? "#c0392b" : "#7a84a8") + '"><b>' + orph.length + '</b><br><small>juftsiz</small></div></div>';
      h += '<div class="sf">' + lbl("Fan (hammasiga)").replace("margin:12px", "margin:0") + '<select id="ssub" style="' + IN + '">' + SUBJECTS.map(s => "<option" + (s === S.subject ? " selected" : "") + ">" + esc(s) + "</option>").join("") + "</select>"
        + lbl("Narxi (hammasiga, so'm; 0 = bepul)") + '<input id="spr" type="number" inputmode="numeric" value="' + esc(S.price) + '" style="' + IN + '">'
        + lbl("Nashr vaqti (bo'sh = hozir)") + '<input id="swh" type="datetime-local" value="' + esc(S.when) + '" style="' + IN + '">'
        + '<label style="display:flex;align-items:center;gap:10px;margin:14px 2px 2px;font:700 14.5px system-ui,sans-serif"><input id="snt" type="checkbox"' + (S.notify ? " checked" : "") + ' style="width:20px;height:20px">Hammaga bitta xabar yuborish</label></div>';
      h += items.map((x, i) => '<div class="pc" data-i="' + i + '"><div style="display:flex;gap:8px;align-items:center"><span style="font-size:18px">' + (x.st === "ok" ? "✅" : x.st === "err" ? "❌" : x.st === "up" ? "⏳" : x.a ? "✓" : "•") + '</span><input data-k="title" value="' + esc(x.title) + '" style="' + IN + 'flex:1;padding:9px"><button data-del="' + i + '" type="button" style="border:0;background:none;font-size:18px;color:#b3262b">✕</button></div><div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap"><span class="badge" style="padding:4px 9px;font-size:11.5px">📄 savol</span><span class="badge" style="padding:4px 9px;font-size:11.5px;' + (x.a ? "background:#dff6e8;color:#1e8a4c" : "background:#f2f4fb;color:#7a84a8") + '">' + (x.a ? "🔑 javob bor" : "javobsiz") + "</span></div></div>").join("");
      if(orph.length) h += lbl("Juftsiz javob fayllari (qo'lda biriktiring)") + orph.map((o, i) => '<div class="pc"><b style="font-size:14px">' + esc(o.f.name) + '</b><select data-o="' + i + '" style="' + IN + 'margin-top:8px"><option value="">Qaysi testga?</option>' + items.map((x, k) => x.a ? "" : '<option value="' + k + '">' + esc(x.title) + "</option>").join("") + "</select></div>").join("");
      h += '<button id="sgo" type="button"' + (busy ? " disabled" : "") + ' style="width:100%;height:54px;margin-top:12px;border:0;border-radius:99px;background:#1fa463;color:#fff;font:900 16px system-ui,sans-serif;opacity:' + (busy ? .6 : 1) + '">' + (busy ? "⏳ Yuklanmoqda " + done + " / " + items.length : items.length + " ta testni yuklash") + "</button>";
    }
    body.innerHTML = h;
    const q = s => body.querySelector(s);
    q("#spick").onclick = () => q("#sf").click();
    q("#sf").onchange = e => { add([...e.target.files]); };
    if(q("#ssub")) q("#ssub").onchange = e => { S.subject = e.target.value; };
    if(q("#spr")) q("#spr").oninput = e => { S.price = e.target.value; };
    if(q("#swh")) q("#swh").onchange = e => { S.when = e.target.value; };
    if(q("#snt")) q("#snt").onchange = e => { S.notify = e.target.checked; };
    if(q("#sgo")) q("#sgo").onclick = go;
    body.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { items.splice(+b.dataset.del, 1); draw(); });
    body.querySelectorAll("[data-o]").forEach(s => s.onchange = () => { if(s.value === "") return; items[+s.value].a = orph[+s.dataset.o].f; orph.splice(+s.dataset.o, 1); draw(); });
  };
  body.addEventListener("input", e => { const c = e.target.closest(".pc"); if(c && e.target.dataset.k === "title") items[+c.dataset.i].title = e.target.value; });
  function add(files){
    let big = 0;
    files.forEach(f => {
      if(f.size > MAXB){ big++; return; }
      const p = parse(f.name);
      if(p.isA){
        const it = items.find(x => x.key === p.key && !x.a);
        if(it) it.a = f; else orph.push({f, key: p.key});
      }else{
        let it = items.find(x => x.key === p.key && !x.f);
        if(!it){ it = {f, a: null, key: p.key, title: p.title, st: ""}; items.push(it); } else it.f = f;
        const k = orph.findIndex(o => o.key === p.key);
        if(k >= 0){ it.a = orph[k].f; orph.splice(k, 1); }
        const g = guess(f.name); if(g && items.length === 1) S.subject = g;
      }
    });
    orph = orph.filter(o => { const it = items.find(x => x.key === o.key && !x.a); if(it){ it.a = o.f; return false; } return true; });
    const nk = t => (t || "").split(/(\d+)/).map(x => /^\d+$/.test(x) ? x.padStart(6, "0") : x).join("");
    items.sort((a, b) => nk(a.title) < nk(b.title) ? -1 : 1);
    if(big) toast(big + " ta fayl 15 MB dan katta, o'tkazib yuborildi");
    draw();
  }
  async function go(){
    if(busy) return;
    let iso = "";
    if(S.when){ const dd = new Date(S.when); if(isNaN(dd) || dd.getTime() < Date.now() + 60000){ toast("Nashr vaqti kelajakda bo'lishi kerak"); return; } iso = dd.toISOString(); }
    const price = Math.max(0, parseInt(S.price, 10) || 0);
    busy = true; done = items.filter(x => x.st === "ok").length; draw();
    for(const x of items){
      if(x.st === "ok") continue;
      if(!x.title.trim()){ x.st = "err"; continue; }
      x.st = "up";
      try{
        await call("/api/papers/create", {subject: S.subject, title: x.title.trim(), price, test_code: "", data: await rd(x.f), adata: x.a ? await rd(x.a) : "", publish_at: iso});
        x.st = "ok"; done++;
      }catch(e){ x.st = "err"; }
      draw();
    }
    busy = false; fin = true; draw();
    const n = items.filter(x => x.st === "ok").length;
    if(S.notify && n > 0 && !items.some(x => x.st === "err")){
      S.notify = false;
      try{ await call("/api/admin/sav_notify", {n, at: iso, titles: items.filter(x => x.st === "ok").map(x => x.title)}); toast(iso ? "Xabar vaqtida yuboriladi" : "Xabar yuborilmoqda..."); }catch(e){ toast("Xabarni yuborib bo'lmadi"); }
    }
  }
  draw();
}
new MutationObserver(() => {
  const m = document.getElementById("pmulti");
  if(m && !m.dataset.v2){ m.dataset.v2 = "1"; m.onclick = open; }
}).observe(document.body, {childList: true, subtree: true});
})();
  
