(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tg = window.Telegram && Telegram.WebApp;
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const ask = (m, f) => { if(tg && tg.showConfirm) tg.showConfirm(m, ok => { if(ok) f(); }); else if(confirm(m)) f(); };
document.head.insertAdjacentHTML("beforeend", "<style>.tae{background:#fff;border:1.5px solid #e3e8f8;border-radius:20px;padding:14px;margin-bottom:12px}.tae label{display:block;margin:10px 2px 5px;font:700 13.5px system-ui,sans-serif;color:#6b7699}.tae .fi{width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:12px;font:600 15px system-ui,sans-serif;color:#0f1a4d}.tae h4{margin:0 0 4px;font:800 16px system-ui,sans-serif;color:#0f1a4d}.tab{display:flex;gap:8px;margin-top:8px}.tab button{flex:1;border:0;border-radius:13px;height:46px;background:#e8edfb;color:#2440d6;font:800 14px system-ui,sans-serif}.tab .r{background:#fde4e5;color:#b3262b}.tab .g{background:#dff5e8;color:#1a8a4a}.tab button[disabled]{opacity:.5}.tal{display:flex;align-items:center;gap:10px;margin-top:10px;font:800 14.5px system-ui,sans-serif;color:#0f1a4d}.tal input{width:22px;height:22px}</style>");
document.head.insertAdjacentHTML("beforeend", "<style>.codebar{display:none!important}</style>");
function screen(t, n){
  const d = document.createElement("div"); d.className = "adm2";
  d.innerHTML = '<div class="ah"><button class="ab" type="button">‹</button><div><b>' + esc(t) + "</b><small>" + esc(n) + '</small></div></div><div class="body"></div>';
  d.querySelector(".ab").onclick = () => d.remove(); document.body.appendChild(d);
  return d.querySelector(".body");
}
const loc = s => { if(!s) return ""; const d = new Date(s); return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16); };
const iso = s => s ? new Date(s).toISOString() : "";
const rd = f => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(f); });
async function edit(code, onDone){
  const b = screen("Tahrirlash", "Test " + code);
  b.innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  let k; try{ k = await call("/api/admin/test_get", {code}); }catch(e){ b.innerHTML = '<p class="sub">Yuklab bo\'lmadi.</p>'; return; }
  const P = Array.from({length: 10}, (_, i) => { const a = String(k.open[i] || "").split(";").map(x => x.trim()); return a.length ? a : [""]; });
  b.innerHTML = '<div class="tae"><h4>Asosiy</h4><label>Nomi</label><input class="fi" id="tn" value="' + esc(k.title) + '"><label>Fan</label><select class="fi" id="ts">' + SUBJECTS.map(s => "<option" + (s === k.subject ? " selected" : "") + ">" + esc(s) + "</option>").join("") + '</select><label>Narxi (so\'m, 0 = bepul)</label><input class="fi" id="tp" type="number" inputmode="numeric" value="' + k.price + '"><label>Vaqt (daqiqa)</label><input class="fi" id="tm" type="number" inputmode="numeric" value="' + k.minutes + '"><label>Boshlanishi</label><input class="fi" id="t1" type="datetime-local" value="' + loc(k.starts_at) + '"><label>Tugashi</label><input class="fi" id="t2" type="datetime-local" value="' + loc(k.ends_at) + '"></div>'
    + '<div class="tae"><h4>Javoblar</h4><label>Yopiq (1–35)</label><input class="fi" id="tc" autocapitalize="characters" autocomplete="off" value="' + esc(k.closed) + '" style="text-transform:uppercase;letter-spacing:1px"><small id="tcn" style="font:800 13px system-ui"></small><label>Ochiq (36–45)</label><div id="to"></div><label class="tal"><input type="checkbox" id="tr"' + (k.rash ? " checked" : "") + '>📈 Rash hisobi yoqilgan</label>' + (k.n ? '<p class="sub" style="font-size:12.5px;margin:8px 0 0">Javoblar o\'zgarsa, Rash qayta hisoblanadi. Mavjud natijalar yangi kalit bo\'yicha ko\'rinadi.</p>' : "") + '</div>'
    + '<button class="sbtn" id="tsv" type="button">Saqlash</button>'
    + '<div class="tae" style="margin-top:14px"><h4>PDF fayllar</h4><div class="tab"><button data-f="q" type="button">📄 Savollar ' + (k.pdf ? "✓" : "yo\'q") + '</button><button data-f="k" type="button">✅ Javoblar ' + (k.key ? "✓" : "yo\'q") + '</button></div>' + (k.pdf || k.key ? '<div class="tab">' + (k.pdf ? '<button class="r" data-y="q" type="button">🗑 Savollar PDF</button>' : "") + (k.key ? '<button class="r" data-y="k" type="button">🗑 Javoblar PDF</button>' : "") + "</div>" : "") + '<input type="file" id="tf" accept="application/pdf" style="display:none"></div>'
    + '<div class="tae"><h4>Boshqa amallar</h4><div class="tab"><button data-x="sh" type="button">📤 Ulashish</button><button data-x="dp" type="button">📄 Nusxa</button></div><div class="tab"><button class="r" data-x="rs" type="button">🧹 Natijalar (' + k.n + ')</button><button class="r" data-x="dl" type="button">🗑 O\'chirish</button></div></div>';
  const ko = b.querySelector("#to"), inp = b.querySelector("#tc");
  const draw = () => { ko.innerHTML = P.map((a, i) => '<div class="pkq"><div class="pkh"><span>' + (36 + i) + '-savol</span><button type="button" class="pp1" data-q="' + i + '" data-d="1">＋</button><button type="button" class="pp2" data-q="' + i + '" data-d="-1">－</button></div>' + a.map((v, j) => '<div class="pko okey"><b>' + (j + 1) + ')</b><input data-q="' + i + '" data-p="' + j + '" value="' + esc(v) + '" placeholder="To\'g\'ri javob"></div>').join("") + "</div>").join(""); };
  ko.oninput = e => { const t = e.target; if(t.dataset.p != null) P[+t.dataset.q][+t.dataset.p] = t.value; };
  ko.onclick = e => { const t = e.target.closest("[data-d]"); if(!t) return; const a = P[+t.dataset.q]; if(t.dataset.d === "1"){ if(a.length < 6) a.push(""); } else if(a.length > 1) a.pop(); draw(); };
  draw();
  const grid = () => { const v = inp.value.toUpperCase().replace(/[^A-F]/g, "").slice(0, 35); if(v !== inp.value) inp.value = v; const bad = [...v].some((c, i) => i < 32 && !"ABCD".includes(c)); const n = b.querySelector("#tcn"); n.style.color = v.length === 35 && !bad ? "#1e8a4c" : "#c0392b"; n.textContent = v.length + " / 35" + (bad ? " · 1–32 da faqat A–D" : ""); return v.length === 35 && !bad; };
  inp.oninput = grid; grid();
  b.querySelector("#tsv").onclick = async e => {
    if(!grid()){ toast("Yopiq javoblar 35 ta bo'lsin"); return; }
    e.target.disabled = true;
    try{ await call("/api/admin/test_upd2", {code, title: b.querySelector("#tn").value, subject: b.querySelector("#ts").value, price: parseInt(b.querySelector("#tp").value, 10) || 0, minutes: parseInt(b.querySelector("#tm").value, 10) || 180, starts_at: iso(b.querySelector("#t1").value), ends_at: iso(b.querySelector("#t2").value), closed: inp.value, open: P.map(a => a.map(x => x.trim()).filter(Boolean).join(";")), rash: b.querySelector("#tr").checked}); toast("Saqlandi"); b.closest(".adm2").remove(); if(onDone) onDone(); }
    catch(x){ toast("Saqlab bo'lmadi. Ma'lumotni tekshiring."); e.target.disabled = false; }
  };
  let kind = "";
  const fl = b.querySelector("#tf");
  b.querySelectorAll("[data-f]").forEach(x => x.onclick = () => { kind = x.dataset.f; fl.click(); });
  fl.onchange = async () => { const f = fl.files[0]; fl.value = ""; if(!f) return; if(f.size > 15 * 1048576){ toast("Fayl 15 MB dan katta"); return; } try{ await call("/api/admin/test_pdf", {code, kind, data: await rd(f)}); toast("PDF yuklandi"); b.querySelector('[data-f="' + kind + '"]').textContent = (kind === "q" ? "📄 Savollar ✓" : "✅ Javoblar ✓"); }catch(e){ toast("Yuklab bo'lmadi"); } };
  b.onclick = e => { const y = e.target.closest("[data-y]");
    if(y){ ask((y.dataset.y === "q" ? "Savollar" : "Javoblar") + " PDF olib tashlansinmi?", async () => { try{ await call("/api/admin/test_pdf_del", {code, kind: y.dataset.y}); toast("Olib tashlandi"); y.remove(); }catch(er){ toast("Bajarilmadi"); } }); return; }
    const x = e.target.closest("[data-x]"); if(!x) return; const a = x.dataset.x;
    if(a === "sh"){ const u = "https://t.me/MSTayyorlovBot?start=" + code, l = "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent("📝 " + k.title + "\nTest kodi: " + code); tg && tg.openTelegramLink ? tg.openTelegramLink(l) : window.open(l); }
    else if(a === "dp") ask("Test nusxasi yaratilsinmi?", async () => { try{ const r = await call("/api/admin/test_dup", {code}); toast("Yangi test kodi: " + r.code); if(onDone) onDone(); }catch(e){ toast("Bajarilmadi"); } });
    else if(a === "rs") ask(k.n + " ta natija o'chirilsinmi? Test qoladi.", async () => { try{ await call("/api/admin/test_reset", {code}); toast("Natijalar tozalandi"); x.textContent = "🧹 Natijalar (0)"; k.n = 0; if(onDone) onDone(); }catch(e){ toast("Bajarilmadi"); } });
    else if(a === "dl") ask(code + "-test va uning " + k.n + " ta natijasi butunlay o'chiriladi. Davom etasizmi?", async () => { try{ await call("/api/admin/test_del2", {code}); toast("O'chirildi"); b.closest(".adm2").remove(); if(onDone) onDone(); }catch(e){ toast("O'chirib bo'lmadi"); } }); };
}
function mark(){
  document.querySelectorAll(".adm2").forEach(a => {
    const h = a.querySelector(".ah b"); if(!h || h.textContent !== "Testlar") return;
    a.querySelectorAll('.pc[data-c] [data-a="p"]').forEach(x => { if(x.textContent !== "✏️ Tahrirlash") x.textContent = "✏️ Tahrirlash"; });
  });
}
document.addEventListener("click", e => {
  const p = e.target.closest('.adm2 .pc[data-c] [data-a="p"]'), d = e.target.closest('.adm2 .pc[data-c] [data-a="d"]');
  const x = p || d; if(!x) return;
  e.stopPropagation(); e.preventDefault();
  const c = x.closest(".pc"), code = c.dataset.c, scr = c.closest(".adm2");
  const reload = () => { const q = scr.querySelector("#tq"); if(q) q.dispatchEvent(new Event("input")); };
  if(p) edit(code, reload);
  else ask(code + "-test va barcha natijalari o'chirilsinmi?", async () => { try{ await call("/api/admin/test_del2", {code}); toast("O'chirildi"); c.remove(); }catch(er){ toast("O'chirib bo'lmadi"); } });
}, true);
new MutationObserver(mark).observe(document.body, {childList: true, subtree: true});
})();
    
