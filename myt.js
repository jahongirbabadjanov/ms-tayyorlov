(function(){
const tg = window.Telegram && Telegram.WebApp;
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400;max-width:90%;text-align:center"; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); };
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".mt-seg{display:flex;gap:6px;background:#e8edfb;border-radius:16px;padding 4px;padding:4px;margin:0 0 14px}.mt-seg button{flex:1;border:0;border-radius:12px;height:42px;background:transparent;color:#2440d6;font:800 15px system-ui,sans-serif}.mt-seg .on{background:#fff;box-shadow:0 3px 10px rgba(36,64,214,.18)}"
+ ".mt-c{background:#fff;border:1.5px solid #e3e8f8;border-radius:22px;padding:14px;margin-bottom:12px;box-shadow:0 6px 18px rgba(36,64,214,.07)}.mt-c b{font:800 17px system-ui,sans-serif;color:#0f1a4d}.mt-c small{display:block;color:#6b7699;font:600 13.5px system-ui,sans-serif;margin-top:3px}"
+ ".mt-ch{display:inline-block;border-radius:10px;padding:3px 9px;font:800 12.5px system-ui,sans-serif;margin-left:6px}.mt-row{display:flex;gap:8px;margin-top:10px}.mt-row button,.mt-b{flex:1;height:44px;border:0;border-radius:14px;background:#e8edfb;color:#2440d6;font:800 14.5px system-ui,sans-serif}.mt-row .p,.mt-b.p{background:#2440d6;color:#fff;box-shadow:0 6px 14px rgba(36,64,214,.3)}"
+ ".mt-ov{position:fixed;inset:0;z-index:125;background:#f3f6ff;overflow:auto;padding-bottom:40px}.mt-h{display:flex;align-items:center;gap:10px;padding:14px;background:#fff;position:sticky;top:0;z-index:2;box-shadow:0 2px 10px rgba(15,26,77,.06)}.mt-h .x{width:40px;height:40px;border:0;border-radius:13px;background:#e8edfb;color:#2440d6;font:800 22px system-ui}.mt-h b{display:block;font:800 17px system-ui,sans-serif;color:#0f1a4d}.mt-h small{color:#6b7699;font:600 13px system-ui}"
+ ".mt-hero{margin:14px;border-radius:26px;padding:20px;color:#fff;background:linear-gradient(135deg,#2440d6,#6a4cf0);box-shadow:0 12px 28px rgba(36,64,214,.35)}.mt-hero .g{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.mt-hero .g div{background:rgba(255,255,255,.16);border-radius:16px;padding:10px 12px}.mt-hero .g b{display:block;font:800 22px system-ui}.mt-hero .g small{opacity:.85;font:600 12.5px system-ui}"
+ ".mt-bar{height:12px;border-radius:8px;background:#e8edfb;overflow:hidden;flex:1}.mt-bar i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#2440d6,#6a4cf0)}.mt-lv{display:flex;align-items:center;gap:10px;margin:8px 0;font:800 14px system-ui;color:#0f1a4d}.mt-lv span{width:34px}.mt-lv em{font-style:normal;width:30px;text-align:right;color:#6b7699}"
+ ".mt-p{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid #eef1fb;font:700 14.5px system-ui;color:#0f1a4d}.mt-p .r{width:30px;height:30px;border-radius:10px;background:#e8edfb;color:#2440d6;display:flex;align-items:center;justify-content:center;font-weight:800}.mt-p .n{flex:1;min-width:0}.mt-p .n small{display:block;color:#6b7699;font-weight:600;font-size:12.5px}.mt-in{width:100%;box-sizing:border-box;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:13px;font:600 15.5px system-ui;color:#0f1a4d;margin-bottom:10px}.mt-t{display:flex;gap:6px;padding:0 14px}.mt-t button{flex:1;height:40px;border:0;border-radius:12px;background:#e8edfb;color:#2440d6;font:800 13.5px system-ui}.mt-t .on{background:#2440d6;color:#fff}.mt-bd{padding:14px}"
+ "</style>");
const BOT = "https://t.me/MSTayyorlovBot";
const st = t => { const n = Date.now(), s = t.starts_at && new Date(t.starts_at), e = t.ends_at && new Date(t.ends_at);
  if(e && e < n) return ["🏁 Yakunlangan", "#e8edfb", "#4a5788", 2]; if(s && s > n) return ["🟡 Kutilmoqda", "#fff3d6", "#9a6a00", 1]; return ["🟢 Faol", "#dff5e8", "#1a8a4a", 0]; };
const share = t => { const u = BOT + "?start=" + t.code, tx = "📝 " + t.title + "\nTest kodi: " + t.code; const l = "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(tx); tg && tg.openTelegramLink ? tg.openTelegramLink(l) : window.open(l); };
let list = [];
async function manage(code){
  const o = document.createElement("div"); o.className = "mt-ov";
  o.innerHTML = '<div class="mt-h"><button class="x" type="button">‹</button><div><b>Test boshqaruvi</b><small>Yuklanmoqda...</small></div></div>';
  o.querySelector(".x").onclick = () => o.remove(); document.body.appendChild(o);
  let d; try{ d = await call("/api/my/test", {code}); }catch(e){ o.querySelector("small").textContent = "Ochib bo'lmadi"; return; }
  const t = d.test, S = st(t);
  o.querySelector(".mt-h div").innerHTML = "<b>" + esc(t.title) + "</b><small>Kod " + esc(t.code) + " · " + S[0] + "</small>";
  const tabs = ["Umumiy", "Ishtirokchilar", "Savollar", "Sozlama"];
  o.insertAdjacentHTML("beforeend", '<div class="mt-t" style="margin-top:12px">' + tabs.map((x, i) => '<button type="button" data-i="' + i + '">' + x + "</button>").join("") + '</div><div id="mtb"></div>');
  const B = o.querySelector("#mtb"), pct = d.started ? Math.round(d.n * 100 / d.started) : 0;
  const views = [
    () => { const mx = Math.max(1, ...Object.values(d.levels)); return '<div class="mt-hero"><b style="font:800 18px system-ui">' + esc(t.subject || "Test") + "</b><div class=\"g\"><div><b>" + d.n + "</b><small>Topshirganlar</small></div><div><b>" + pct + "%</b><small>Yakunlaganlar (" + d.started + " dan)</small></div><div><b>" + (d.avg_final != null ? d.avg_final : d.avg_raw) + "</b><small>O'rtacha ball</small></div><div><b>" + (d.max_final != null ? d.max_final : d.max_raw) + "</b><small>Eng yuqori</small></div></div></div>"
      + '<div class="mt-bd"><div class="mt-c"><b>Darajalar</b>' + (Object.keys(d.levels).length ? Object.entries(d.levels).sort().map(([k, v]) => '<div class="mt-lv"><span>' + esc(k) + '</span><div class="mt-bar"><i style="width:' + Math.round(v * 100 / mx) + '%"></i></div><em>' + v + "</em></div>").join("") : "<small>Hali natija yo'q</small>") + (d.rash ? "" : "<small>Rash o'chirilgan: ballar xom ko'rinadi</small>") + '</div><div class="mt-row"><button class="p" data-a="pdf" type="button">📄 Natijalar PDF</button><button data-a="sh" type="button">📤 Ulashish</button></div></div>'; },
    () => '<div class="mt-bd"><input class="mt-in" id="mtq" placeholder="Ism bo\'yicha qidirish"><div id="mtl"></div></div>',
    () => '<div class="mt-bd"><div class="mt-c"><b>Eng qiyin savollar</b>' + (d.hard.length ? d.hard.map(([q, p]) => '<div class="mt-lv"><span>' + q + '-</span><div class="mt-bar"><i style="width:' + p + '%"></i></div><em>' + p + "%</em></div>").join("") + "<small>To'g'ri javob berganlar ulushi</small>" : "<small>Hali ma'lumot yo'q</small>") + "</div></div>",
    () => '<div class="mt-bd"><label style="font:700 13.5px system-ui;color:#6b7699">Nomi</label><input class="mt-in" id="mtt" value="' + esc(t.title) + '"><label style="font:700 13.5px system-ui;color:#6b7699">Narxi (so\'m)</label><input class="mt-in" id="mtp" type="number" inputmode="numeric" value="' + (t.price || 0) + '"><label style="font:700 13.5px system-ui;color:#6b7699">Tugash vaqti</label><input class="mt-in" id="mte" type="datetime-local" value="' + (t.ends_at ? new Date(new Date(t.ends_at) - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 16) : "") + '"><button class="mt-b p" id="mts" type="button" style="width:100%">Saqlash</button></div>'];
  const people = () => { const q = (o.querySelector("#mtq").value || "").toLowerCase(); o.querySelector("#mtl").innerHTML = d.people.map((p, i) => [p, i]).filter(([p]) => p.name.toLowerCase().includes(q)).map(([p, i]) => '<div class="mt-p"><div class="r">' + (i + 1) + '</div><div class="n">' + esc(p.name) + "<small>" + (p.level || "") + (p.elapsed ? " · " + Math.round(p.elapsed / 60) + " daq" : "") + "</small></div><b>" + (p.final != null ? p.final : p.raw) + "</b></div>").join("") || '<small style="color:#6b7699">Hech kim topilmadi</small>'; };
  const show = i => { B.innerHTML = views[i](); o.querySelectorAll(".mt-t button").forEach((b, j) => b.classList.toggle("on", i == j));
    if(i == 1){ people(); o.querySelector("#mtq").oninput = people; }
    if(i == 3) o.querySelector("#mts").onclick = async () => { try{ await call("/api/my/test_upd", {code, title: o.querySelector("#mtt").value, price: parseInt(o.querySelector("#mtp").value, 10) || 0, ends_at: o.querySelector("#mte").value ? new Date(o.querySelector("#mte").value).toISOString() : ""}); toast("Saqlandi"); }catch(e){ toast("Saqlab bo'lmadi"); } }; };
  o.querySelector(".mt-t").onclick = e => { const b = e.target.closest("button"); if(b) show(+b.dataset.i); };
  B.onclick = async e => { const b = e.target.closest("[data-a]"); if(!b) return;
    if(b.dataset.a == "sh") share(t);
    else try{ b.disabled = true; await call("/api/my/test_pdf", {code}); toast("PDF botga yuborildi"); }catch(x){ toast("PDF hozircha yo'q"); } b.disabled = false; };
  show(0);
}
function cards(){ return list.length ? list.map(t => { const S = st(t); return '<div class="mt-c"><b>' + esc(t.title) + '</b><span class="mt-ch" style="background:' + S[1] + ";color:" + S[2] + '">' + S[0] + "</span><small>" + esc(t.subject || "") + " · kod " + esc(t.code) + " · 👥 " + t.n + '</small><div class="mt-row"><button class="p" data-m="' + esc(t.code) + '" type="button">📊 ' + (S[3] == 2 ? "Natijalarni ko'rish" : "Boshqarish") + '</button><button data-s="' + esc(t.code) + '" type="button">📤 Ulashish</button></div></div>'; }).join("") : ""; }
async function init(){
  let r; try{ r = await call("/api/my/tests", {}); }catch(e){ return; }
  list = r.tests || []; if(!list.length) return;
  const v = document.getElementById("v-create"); if(!v || v.querySelector(".mt-seg")) return;
  const seg = document.createElement("div"); seg.className = "mt-seg"; seg.innerHTML = '<button class="on" type="button">Yaratish</button><button type="button">Mening testlarim</button>';
  const pane = document.createElement("div"); pane.style.display = "none"; pane.innerHTML = cards();
  v.prepend(seg); seg.after(pane);
  seg.onclick = e => { const b = e.target.closest("button"); if(!b) return; const mine = b === seg.children[1];
    [...seg.children].forEach(x => x.classList.toggle("on", x === b)); pane.style.display = mine ? "" : "none";
    [...v.children].forEach(c => { if(c !== seg && c !== pane) c.style.display = mine ? "none" : ""; }); };
  pane.onclick = e => { const m = e.target.closest("[data-m]"), s = e.target.closest("[data-s]"); if(m) manage(m.dataset.m); if(s) share(list.find(t => t.code == s.dataset.s)); };
}
const go0 = new URLSearchParams(location.search).get("my") || (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param || "").replace(/^my_?/, "");
let n = 0; const iv = setInterval(() => { if(window.call && document.getElementById("v-create")){ clearInterval(iv); init(); if(go0 && /^\d{4}$/.test(go0)) manage(go0); } else if(++n > 60) clearInterval(iv); }, 300);
})();
                                                                                          
