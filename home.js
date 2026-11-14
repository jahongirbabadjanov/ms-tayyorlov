(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".hero.lr{cursor:pointer}.hero.lr .lrt{display:flex;align-items:center;gap:10px;margin:8px 0 6px}"
+ ".hero.lr .lrt b{font-size:44px;line-height:1;color:#fff}"
+ ".hero.lr .lv{padding:5px 14px;border-radius:99px;background:var(--yel);color:var(--navy);font-weight:800;font-size:15px}"
+ ".hero.lr .df{padding:5px 11px;border-radius:99px;background:rgba(255,255,255,.2);color:#fff;font-weight:800;font-size:13px}"
+ ".hero.lr .lrc{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.hero.lr .lrc span{padding:4px 10px;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;font-size:12px;font-weight:700}"
+ "</style>");
const cm = x => String(x).replace(".", ",");
const dt = s => { try{ return new Date(s).toLocaleDateString("ru-RU"); }catch(e){ return ""; } };
let RES = [];
const tm = r => { const v = Date.parse(r.date || ""); return isNaN(v) ? 0 : v; };
const val = r => r.final != null ? r.final : (r.test_ball != null ? r.test_ball : null);

function drawHero(){
  const h = document.querySelector("#v-tests .hero");
  if(!h) return;
  const withBall = RES.filter(r => val(r) != null).sort((a, b) => tm(b) - tm(a));
  const r = withBall[0];
  if(!r){
    h.classList.remove("lr"); h.removeAttribute("data-code");
    h.innerHTML = '<small>Xush kelibsiz!</small><h2 id="herot">' + (TESTS.length ? "Testni tanlang va boshlang" : "Birinchi testingizni boshlang") + '</h2><div class="bar"><i id="barfill"></i></div><small>Milliy sertifikat uchun sinov testlari</small>';
    return;
  }
  const df = r.diff != null ? `<span class="df">${r.diff > 0 ? "↑ +" : r.diff < 0 ? "↓ " : "= "}${cm(r.diff)}</span>` : "";
  const ch = [`<span>${r.raw}/${r.total} to'g'ri</span>`];
  if(r.pct != null) ch.push(`<span>${cm(r.pct)}%</span>`);
  if(r.rank != null && r.of) ch.push(`<span>O'rin ${r.rank}/${r.of}</span>`);
  h.classList.add("lr"); h.dataset.code = r.code;
  h.innerHTML = `<small>Oxirgi natijangiz</small><div class="lrt"><b>${cm(val(r))}</b>${r.level ? `<span class="lv">${esc(r.level)}</span>` : ""}${df}</div><small>${esc(r.subject)} · ${esc(r.title)} · ${dt(r.date)}</small><div class="lrc">${ch.join("")}</div>`;
}

async function loadRes(){
  try{ const x = await call("/api/results/list", {}); RES = x.results || []; }catch(e){ RES = []; }
  drawHero();
}

const _lt = window.loadTests;
window.loadTests = async function(){ drawHero(); await _lt(); await loadRes(); };
const dn = document.querySelector('#cats .cat[data-c="done"]');
if(dn){ dn.remove(); $("cats").style.gridTemplateColumns = "repeat(2,1fr)"; }

if(!$("v-tests").classList.contains("hidden")) window.loadTests();
document.addEventListener("click", e => {
  const c = e.target.closest("#v-tests .hero.lr");
  if(c && c.dataset.code){ $("codein").value = c.dataset.code; $("codego").click(); }
});
const qc = new URLSearchParams(location.search).get("code");
if(qc && /^\d{4}$/.test(qc)){
  let n = 0;
  const iv = setInterval(() => {
    n++;
    if(!$("v-tests").classList.contains("hidden")){ clearInterval(iv); $("codein").value = qc; $("codego").click(); }
    else if(n > 60) clearInterval(iv);
  }, 500);
}
})();
