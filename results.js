(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".rc{cursor:pointer;background:var(--card2);border:1.5px solid var(--line2);border-radius:20px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}"
+ ".rc .rm{flex:1;min-width:0}.rc b{display:block;font-size:17px;line-height:1.2}"
+ ".rc small{display:block;margin-top:4px;color:var(--muted);font-size:13px}"
+ ".rs{text-align:right;flex:none}.rs strong{display:block;font-size:24px;color:var(--mint)}"
+ ".rl{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:var(--violet);color:#fff;font-weight:800;font-size:13px}"
+ ".rw{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:99px;background:#fff1cc;color:#8a5a00;font-size:12px}"
+ "</style>");
$("v-answer").innerHTML = '<div class="card"><h2>Mening natijalarim</h2>'
 + '<input id="rsearch" placeholder="🔍 Test nomi yoki kod bo\'yicha..." style="margin-top:10px">'
 + '<div id="rlist" style="margin-top:12px"></div></div>';

let R = [];
const dt = s => { try{ return new Date(s).toLocaleDateString("ru-RU"); }catch(e){ return ""; } };

function draw(){
  const q = $("rsearch").value.trim().toLowerCase();
  const list = R.filter(r => !q || r.title.toLowerCase().includes(q) || String(r.code).includes(q));
  if(!R.length){ $("rlist").innerHTML = '<div class="empty"><div>📊</div><b>Hali natija yo\'q</b>Test ishlang — natijalar shu yerda paydo bo\'ladi.</div>'; return; }
  if(!list.length){ $("rlist").innerHTML = '<div class="empty"><b>Hech narsa topilmadi</b></div>'; return; }
  $("rlist").innerHTML = list.map(r => {
    const waiting = r.extra && r.extra_ball == null;
    const big = waiting ? r.score : r.final;
    const badge = r.level ? `<span class="rl">${esc(r.level)}</span>` : (waiting ? '<span class="rw">ball kutilmoqda</span>' : "");
    return `<div class="rc" data-code="${esc(r.code)}"><div class="rm"><b>${esc(r.title)}</b><small>${esc(r.subject)} · ${dt(r.date)}</small></div>`
      + `<div class="rs"><strong>${big}</strong>${badge}</div></div>`;
  }).join("");
}

window.loadResults = async function(){
  $("rlist").innerHTML = '<p class="sub">Yuklanmoqda...</p>';
  try{ const r = await call("/api/results/list", {}); R = r.results; draw(); }
  catch(e){ $("rlist").innerHTML = '<div class="empty"><div>⚠️</div><b>Yuklab bo\'lmadi</b>Birozdan so\'ng qayta urinib ko\'ring.</div>'; }
};
$("rsearch").oninput = draw;
$("rlist").addEventListener("click", e => {
  const c = e.target.closest(".rc");
  if(c){ $("codein").value = c.dataset.code; $("codego").click(); }
});
const _g = window.go;
window.go = v => { _g(v); if(v === "answer") loadResults(); };
})();
