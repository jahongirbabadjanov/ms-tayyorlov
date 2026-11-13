(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".rc{cursor:pointer;background:var(--card2);border:1.5px solid var(--line2);border-radius:20px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}"
+ ".rc .rm{flex:1;min-width:0}.rc b{display:block;font-size:17px;line-height:1.2}"
+ ".rc small{display:block;margin-top:4px;color:var(--muted);font-size:13px}"
+ ".rs{text-align:right;flex:none}.rs strong{display:block;font-size:24px;color:var(--mint)}"
+ ".rl{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:var(--violet);color:#fff;font-weight:800;font-size:13px}"
+ ".rw{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:#fff1cc;color:#8a5a00;font-size:12px}"
+ ".rhi{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:4px 0 14px}"
+ ".rhi h2{margin:0;font-size:22px;line-height:1.2}.rhi small{display:block;margin-top:2px;color:var(--muted);font-size:13px;font-weight:600}"
+ ".rbal{flex:none;padding:8px 14px;border-radius:99px;background:var(--yel);color:var(--navy);font-weight:800;font-size:14px}"
+ ".rban{width:100%;display:flex;align-items:center;gap:14px;text-align:left;border:0;border-radius:22px;padding:16px;margin-bottom:14px;color:#fff;font:inherit;cursor:pointer;background:linear-gradient(135deg,#2440d6,#4a63f0);box-shadow:0 10px 28px rgba(36,64,214,.22)}"
+ ".rban i{flex:none;width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.18);display:grid;place-items:center}"
+ ".rban b{display:block;font-size:17px}.rban small{display:block;margin-top:2px;font-size:13px;opacity:.85}"
+ ".rsm{background:var(--card);border:1.5px solid var(--line);border-radius:24px;padding:16px;margin-bottom:14px}"
+ ".rsm .rt{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}"
+ ".rsm .rt b{font-size:34px;font-weight:800;line-height:1}.rsm .rt span{font-size:14px;font-weight:600;color:var(--muted)}"
+ ".rdf{padding:6px 12px;border-radius:99px;font-size:14px;font-weight:800}.rdf.up{background:#dff5e8;color:#14703d}.rdf.dn{background:#fde4e5;color:#b3262b}.rdf.eq{background:#eef0f8;color:#5b6385}"
+ ".rsm svg{display:block;width:100%;height:auto;margin-top:12px}"
+ ".rtl{display:flex;gap:8px;margin-bottom:12px}.rtl input{flex:1;min-width:0}.rtl select{width:140px;flex:none}"
+ "</style>");
$("v-answer").innerHTML = '<div class="rhi"><div><h2 id="rhi">Natijalarim</h2><small id="rcnt">Mening natijalarim</small></div><span class="rbal" id="rbal"></span></div>'
 + '<button class="rban" id="rban" type="button"><i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg></i><span><b>Umumiy tahlil</b><small>Barcha natijalaringiz statistikasi</small></span></button>'
 + '<div id="rsum"></div>'
 + '<div class="rtl"><input id="rsearch" placeholder="Test nomi, fan yoki kod..."><select id="rsort"><option value="new">Yangi avval</option><option value="old">Eski avval</option><option value="hi">Ball: yuqori</option><option value="lo">Ball: past</option></select></div>'
 + '<div id="rlist"></div>';

let R = [];
const dt = s => { try{ return new Date(s).toLocaleDateString("ru-RU"); }catch(e){ return ""; } };
const cm = x => String(x).replace(".", ",");
const val = r => r.final != null ? r.final : (r.test_ball != null ? r.test_ball : null);
const tm = r => { const v = Date.parse(r.date || ""); return isNaN(v) ? 0 : v; };

function chart(){
  const pts = R.filter(r => val(r) != null).sort((a, b) => tm(a) - tm(b)).slice(-10).map(val);
  if(pts.length < 2) return '<div class="rnote" style="margin-top:10px">Grafik uchun kamida 2 ta ball hisoblangan natija kerak.</div>';
  const W = 300, H = 100, px = 16, py = 16;
  let lo = Math.min(...pts), hi = Math.max(...pts);
  if(hi - lo < 10){ const m = (hi + lo) / 2; lo = m - 5; hi = m + 5; }
  const xs = i => px + i * (W - 2 * px) / (pts.length - 1);
  const ys = v => H - py - (v - lo) / (hi - lo) * (H - 2 * py);
  const line = pts.map((v, i) => xs(i).toFixed(1) + "," + ys(v).toFixed(1)).join(" ");
  const dots = pts.map((v, i) => `<circle cx="${xs(i).toFixed(1)}" cy="${ys(v).toFixed(1)}" r="${i === pts.length - 1 ? 5 : 3.5}" fill="${i === pts.length - 1 ? "#ffc629" : "#2440d6"}" stroke="#2440d6" stroke-width="2"/>`).join("");
  const lab = `<text x="${px}" y="${H - 2}" font-size="10" fill="#6b7394">${cm(pts[0])}</text><text x="${W - px}" y="${H - 2}" font-size="10" fill="#6b7394" text-anchor="end">${cm(pts[pts.length - 1])}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" style="height:${H * 1.0}px" role="img" aria-label="Ball grafigi"><polyline points="${line}" fill="none" stroke="#2440d6" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${lab}</svg>`;
}

function summary(){
  if(!R.length){ $("rsum").innerHTML = ""; return; }
  const withBall = R.filter(r => val(r) != null);
  const last = (withBall.length ? withBall : R).slice().sort((a, b) => tm(b) - tm(a))[0];
  const v = val(last);
  let df = "";
  if(last.diff != null){
    const d = last.diff, cls = d > 0 ? "up" : d < 0 ? "dn" : "eq";
    df = `<span class="rdf ${cls}">${d > 0 ? "↑ +" : d < 0 ? "↓ " : "= "}${cm(d)} ball</span>`;
  }
  $("rsum").innerHTML = `<div class="rsm"><div class="rt"><div><span>So'nggi natija · ${esc(last.subject)}</span><br><b>${v == null ? last.raw + "/" + last.total : cm(v)}</b></div>${df}</div>${chart()}</div>`;
}

function draw(){
  const q = $("rsearch").value.trim().toLowerCase();
  const so = $("rsort").value;
  let list = R.filter(r => !q || r.title.toLowerCase().includes(q) || String(r.subject).toLowerCase().includes(q) || String(r.code).includes(q));
  if(so === "old") list.sort((a, b) => tm(a) - tm(b));
  else if(so === "hi" || so === "lo") list.sort((a, b) => ((val(b) == null ? -1 : val(b)) - (val(a) == null ? -1 : val(a))) * (so === "hi" ? 1 : -1));
  else list.sort((a, b) => tm(b) - tm(a));
  if(!R.length){ $("rlist").innerHTML = '<div class="empty"><div>📊</div><b>Hali natija yo\'q</b>Test ishlang — natijalar shu yerda paydo bo\'ladi.</div>'; return; }
  if(!list.length){ $("rlist").innerHTML = '<div class="empty"><b>Hech narsa topilmadi</b></div>'; return; }
  $("rlist").innerHTML = list.map(r => {
    const waiting = !r.pending && r.extra && r.extra_ball == null;
    const big = r.pending ? (r.raw + "/" + r.total) : waiting ? r.test_ball : r.final;
    const badge = r.level ? `<span class="rl">${esc(r.level)}</span>` : (r.pending ? '<span class="rw">ball hisoblanmoqda</span>' : (waiting ? '<span class="rw">ball kutilmoqda</span>' : ""));
    const cnt = r.pending ? "" : ` · ${r.raw}/${r.total}`;
    return `<div class="rc" data-code="${esc(r.code)}"><div class="rm"><b>${esc(r.title)}</b><small>${esc(r.subject)} · ${dt(r.date)}${cnt}</small></div>`
      + `<div class="rs"><strong>${big}</strong>${badge}</div></div>`;
  }).join("");
}

async function head(){
  try{
    const m = await call("/api/me", {});
    if(m.user){
      ME = m.user;
      const b = m.user.balance || 0;
      $("rbal").textContent = String(b).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
    }
  }catch(e){}
}

window.loadResults = async function(){
  head();
  $("rlist").innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  try{ const r = await call("/api/results/list", {}); R = r.results; $("rcnt").textContent = R.length ? R.length + " ta test ishlangan" : "Mening natijalarim"; summary(); draw(); }
  catch(e){ $("rlist").innerHTML = '<div class="empty"><div>⚠️</div><b>Yuklab bo\'lmadi</b>Birozdan so\'ng qayta urinib ko\'ring.</div>'; }
};
$("rsearch").oninput = draw;
$("rsort").onchange = draw;
$("rban").onclick = () => { const t = window.Telegram && Telegram.WebApp; const m = "Umumiy tahlil tez orada qo'shiladi."; if(t && t.showAlert) t.showAlert(m); };
$("rlist").addEventListener("click", e => {
  const c = e.target.closest(".rc");
  if(c){ $("codein").value = c.dataset.code; $("codego").click(); }
});
const _g = window.go;
window.go = v => { _g(v); if(v === "answer") loadResults(); };
})();
       
