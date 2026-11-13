(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".rc{cursor:pointer;background:var(--card2);border:1.5px solid var(--line2);border-radius:20px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}"
+ ".rc .rm{flex:1;min-width:0}.rc b{display:block;font-size:17px;line-height:1.2}"
+ ".rc small{display:block;margin-top:4px;color:var(--muted);font-size:13px}"
+ ".rs{text-align:right;flex:none}.rs strong{display:block;font-size:24px;color:var(--mint)}"
+ ".rl{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:var(--violet);color:#fff;font-weight:800;font-size:13px}"
+ ".rw{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:#fff1cc;color:#8a5a00;font-size:12px}"
+ ".rc{display:block;padding:14px 14px 12px}.rc .rtop{display:flex;align-items:flex-start;gap:12px}"
+ ".rc .rm b{font-size:18px}.rs strong{font-size:30px;line-height:1}.rs .rl{margin-top:6px;padding:4px 12px;font-size:14px}"
+ ".rcps{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}"
+ ".rcp{padding:5px 9px;border-radius:99px;background:var(--soft);color:var(--violet);font-size:12px;font-weight:700;white-space:nowrap}"
+ ".rcp.g{background:#dff5e8;color:#14703d}.rcp.y{background:#fff1cc;color:#8a5a00}"
+ ".ra h3{margin:0 0 10px;font-size:16px}.ra .cd{background:var(--card);border:1.5px solid var(--line);border-radius:22px;padding:16px;margin-bottom:12px}"
+ ".rah{display:flex;align-items:center;gap:12px;margin:2px 0 14px}.rah b{font-size:20px}.rah small{display:block;color:var(--muted);font-size:13px}"
+ ".rab{flex:none;width:42px;height:42px;border:0;border-radius:14px;background:var(--ibg);color:var(--ifg);display:grid;place-items:center;cursor:pointer}"
+ ".rk{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}.rk div{background:var(--card);border:1.5px solid var(--line);border-radius:18px;padding:12px 8px;text-align:center}"
+ ".rk b{display:block;font-size:22px}.rk span{font-size:12px;color:var(--muted);font-weight:600}"
+ ".rbr{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:13px;font-weight:700}.rbr em{font-style:normal;flex:none;width:46px;color:var(--muted)}"
+ ".rbr u{display:block;height:14px;border-radius:7px;background:var(--violet);text-decoration:none;min-width:3px}.rbr u.n{background:#b9c3ec}.rbr span{flex:none;color:var(--muted);font-weight:600}.rbt{flex:1;min-width:0}"
+ ".rst{display:flex;height:16px;border-radius:8px;overflow:hidden;margin:6px 0 10px}.rst i{display:block;height:100%}"
+ ".rlg{display:flex;flex-wrap:wrap;gap:10px;font-size:13px;font-weight:700}.rlg span:before{content:'';display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:var(--c)}"
+ ".rqg{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.rqc{border-radius:12px;padding:6px 2px;text-align:center;font-size:12px;font-weight:700;background:#eef0f8;color:#5b6385}"
+ ".rqc b{display:block;font-size:15px}.rqc.ok{background:#dff5e8;color:#14703d}.rqc.part{background:#fff1cc;color:#8a5a00}.rqc.bad{background:#fde4e5;color:#b3262b}"
+ ".rtb{width:100%;border-collapse:collapse;font-size:13px}.rtb th{text-align:left;color:var(--muted);font-weight:700;padding:6px 4px}.rtb td{padding:9px 4px;border-top:1px solid var(--line)}.rtb td:last-child,.rtb th:last-child{text-align:right}"
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
$("v-answer").innerHTML = '<div id="rmain"><div class="rhi"><div><h2 id="rhi">Natijalarim</h2><small id="rcnt">Mening natijalarim</small></div><span class="rbal" id="rbal"></span></div>'
 + '<button class="rban" id="rban" type="button"><i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg></i><span><b>Umumiy tahlil</b><small>Barcha natijalaringiz statistikasi</small></span></button>'
 + '<div id="rsum"></div>'
 + '<div class="rtl"><input id="rsearch" placeholder="Test nomi, fan yoki kod..."><select id="rsort"><option value="new">Yangi avval</option><option value="old">Eski avval</option><option value="hi">Ball: yuqori</option><option value="lo">Ball: past</option></select></div>'
 + '<div id="rlist"></div></div><div id="ranal" class="hidden"></div>';

let R = [];
const dt = s => { try{ return new Date(s).toLocaleDateString("ru-RU"); }catch(e){ return ""; } };
const cm = x => String(x).replace(".", ",");
const dur = sec => { const m = Math.round(sec / 60), h = Math.floor(m / 60); return h ? h + " s " + (m % 60) + " daq" : Math.max(1, m) + " daq"; };
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
    const big = r.pending ? "…" : waiting ? cm(r.test_ball) : cm(r.final);
    const badge = r.level ? `<span class="rl">${esc(r.level)}</span>` : (r.pending ? '<span class="rw">hisoblanmoqda</span>' : (waiting ? '<span class="rw">yozma ish kutilmoqda</span>' : ""));
    const ch = [`<span class="rcp g">${r.raw}/${r.total} ✓</span>`];
    if(r.pct != null && !r.pending && !waiting) ch.push(`<span class="rcp">${cm(r.pct)}%</span>`);
    if(r.rank != null && r.of) ch.push(`<span class="rcp y">O'rin ${r.rank}/${r.of}</span>`);
    if(r.elapsed) ch.push(`<span class="rcp">${dur(r.elapsed)}</span>`);
    return `<div class="rc" data-code="${esc(r.code)}"><div class="rtop"><div class="rm"><b>${esc(r.title)}</b><small>${esc(r.subject)} · ${esc(r.code)} · ${dt(r.date)}</small></div>`
      + `<div class="rs"><strong>${big}</strong>${badge}</div></div><div class="rcps">${ch.join("")}</div></div>`;
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

async function openAnalysis(){
  $("rmain").classList.add("hidden"); $("ranal").classList.remove("hidden");
  $("ranal").innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  try{ draw2(await call("/api/results/analysis", {})); }
  catch(e){ $("ranal").innerHTML = '<div class="empty"><div>⚠️</div><b>Yuklab bo\'lmadi</b>Birozdan so\'ng qayta urinib ko\'ring.</div>'; }
}
function closeAnalysis(){ $("ranal").classList.add("hidden"); $("rmain").classList.remove("hidden"); }
function draw2(d){
  const T = d.tests.filter(x => x.final != null);
  const head = '<div class="rah"><button class="rab" id="rabk" type="button" aria-label="Orqaga"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><div><b>Umumiy tahlil</b><small>Barcha natijalaringiz statistikasi</small></div></div>';
  if(!T.length){ $("ranal").innerHTML = head + '<div class="empty"><div>📊</div><b>Tahlil uchun ball kerak</b>Ball hisoblangan natijalar paydo bo\'lgach tahlil chiqadi.</div>'; $("rabk").onclick = closeAnalysis; return; }
  const sum = T.reduce((p, x) => p + x.final, 0), best = Math.max(...T.map(x => x.final));
  let h = head + `<div class="ra"><div class="rk"><div><b>${d.tests.length}</b><span>Testlar</span></div><div><b>${cm((sum / T.length).toFixed(1))}</b><span>O'rtacha ball</span></div><div><b>${cm(best)}</b><span>Eng yuqori</span></div></div>`;
  const lv = ["A+", "A", "B+", "B", "C+", "C"], cnt = {};
  T.forEach(x => { if(x.level) cnt[x.level] = (cnt[x.level] || 0) + 1; });
  const mx = Math.max(1, ...Object.values(cnt));
  h += '<div class="cd"><h3>Ball taqsimoti</h3>' + lv.map(l => `<div class="rbr"><em>${l}</em><div class="rbt"><u style="width:${(cnt[l] || 0) / mx * 100}%;${cnt[l] ? "" : "opacity:.25"}"></u></div><span>${cnt[l] || 0} ta</span></div>`).join("") + "</div>";
  const by = {};
  T.forEach(x => { const o = by[x.subject] || (by[x.subject] = {m: [], a: []}); o.m.push(x.final); if(x.avg != null) o.a.push(x.avg); });
  const av = a => a.length ? a.reduce((p, q) => p + q, 0) / a.length : null;
  h += '<div class="cd"><h3>Men va milliy o\'rtacha</h3>' + Object.keys(by).map(k => {
    const m = av(by[k].m), n = av(by[k].a);
    return `<div style="margin:10px 0 4px;font-size:13px;font-weight:800">${esc(k)}</div>`
      + `<div class="rbr"><em>Men</em><div class="rbt"><u style="width:${m / 75 * 100}%"></u></div><span>${cm(m.toFixed(1))}</span></div>`
      + (n == null ? "" : `<div class="rbr"><em>Hamma</em><div class="rbt"><u class="n" style="width:${n / 75 * 100}%"></u></div><span>${cm(n.toFixed(1))}</span></div>`);
  }).join("") + "</div>";
  const tt = d.totals, all = Math.max(1, tt.ok + tt.part + tt.bad), pc = v => Math.round(v / all * 100);
  h += `<div class="cd"><h3>To'g'ri, qisman, xato</h3><div class="rst"><i style="width:${tt.ok / all * 100}%;background:#22b866"></i><i style="width:${tt.part / all * 100}%;background:#ffc629"></i><i style="width:${tt.bad / all * 100}%;background:#e5484d"></i></div>`
    + `<div class="rlg"><span style="--c:#22b866">To'g'ri ${pc(tt.ok)}%</span><span style="--c:#ffc629">Qisman ${pc(tt.part)}%</span><span style="--c:#e5484d">Xato ${pc(tt.bad)}%</span></div></div>`;
  if(d.last && d.last.qs.length){
    h += `<div class="cd"><h3>Oxirgi test: ${esc(d.last.title)}</h3><div class="rnote" style="margin:0 0 10px">Katak rangi sizning javobingiz, pastdagi foiz ${d.last.n} ishtirokchidan nechtasi to'g'ri yechgani.</div><div class="rqg">`
      + d.last.qs.map((q, i) => `<div class="rqc ${q === "ok" ? "ok" : q === "part" ? "part" : q === "bad" ? "bad" : ""}"><b>${i + 1}</b>${d.last.qpct[i] != null ? d.last.qpct[i] + "%" : "—"}</div>`).join("") + "</div></div>";
  }
  h += '<div class="cd"><h3>Testlarim</h3><table class="rtb"><tr><th>Test</th><th>Fan</th><th>Ball</th></tr>'
    + d.tests.slice().reverse().map(x => `<tr><td>${esc(x.title)}<br><span style="color:var(--muted)">${dt(x.date)}</span></td><td>${esc(x.subject)}</td><td><b>${x.final == null ? "…" : cm(x.final)}</b> ${x.level ? esc(x.level) : ""}</td></tr>`).join("") + "</table></div></div>";
  $("ranal").innerHTML = h;
  $("rabk").onclick = closeAnalysis;
}
window.loadResults = async function(){
  head();
  $("rlist").innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  try{ const r = await call("/api/results/list", {}); R = r.results; $("rcnt").textContent = R.length ? R.length + " ta test ishlangan" : "Mening natijalarim"; summary(); draw(); }
  catch(e){ $("rlist").innerHTML = '<div class="empty"><div>⚠️</div><b>Yuklab bo\'lmadi</b>Birozdan so\'ng qayta urinib ko\'ring.</div>'; }
};
$("rsearch").oninput = draw;
$("rsort").onchange = draw;
$("rban").onclick = openAnalysis;
$("rlist").addEventListener("click", e => {
  const c = e.target.closest(".rc");
  if(c){ $("codein").value = c.dataset.code; $("codego").click(); }
});
const _g = window.go;
window.go = v => { _g(v); if(v === "answer"){ closeAnalysis(); loadResults(); } };
})();
                                                                                                                                          
