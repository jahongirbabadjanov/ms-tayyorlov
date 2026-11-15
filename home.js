(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".hero.lr{cursor:pointer;position:relative;overflow:hidden;background:linear-gradient(150deg,#4b6bff,#2440d6 55%,#1a2fa8);box-shadow:0 14px 26px rgba(36,64,214,.33)}"
+ ".hero.lr .gl{position:absolute;left:4px;right:4px;top:4px;height:42%;border-radius:22px 22px 60% 60%/22px 22px 24% 24%;background:linear-gradient(rgba(255,255,255,.35),rgba(255,255,255,.03));pointer-events:none}"
+ ".hero.lr .hin{position:relative}"
+ ".hero.lr .lrt{display:flex;align-items:center;gap:10px;margin:6px 0 4px}"
+ ".hero.lr .lrt b{font-size:54px;line-height:1;font-weight:900;color:#fff}"
+ ".hero.lr .lv{padding:4px 14px;border-radius:99px;background:#ffc928;color:#0f1a4d;font-weight:900;font-size:22px;box-shadow:0 3px 8px rgba(0,0,0,.2),inset 0 2px 1px rgba(255,255,255,.6)}"
+ ".hero.lr .df{padding:5px 11px;border-radius:99px;background:rgba(255,255,255,.2);color:#fff;font-weight:800;font-size:13px}"
+ ".hero.lr .lrs{display:block;color:#fff;font-weight:700;font-size:14px;margin-bottom:12px}"
+ ".hero.lr .lrc{display:flex;gap:8px}"
+ ".hero.lr .lrc div{flex:1;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:16px;padding:10px;box-shadow:inset 0 1px 1px rgba(255,255,255,.3)}"
+ ".hero.lr .lrc b{display:block;font-size:19px;color:#fff}.hero.lr .lrc small{font-size:11.5px;color:#fff;opacity:.85}"
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
  const ch = [];
  ch.push(`<div><b>${r.pct != null ? cm(r.pct) + "%" : "—"}</b><small>test foizi</small></div>`);
  ch.push(`<div><b>${r.raw}/${r.total}</b><small>to'g'ri javob</small></div>`);
  ch.push(`<div><b>${r.rank != null && r.of ? r.rank + "/" + r.of : "—"}</b><small>umumiy o'rin</small></div>`);
  h.classList.add("lr"); h.dataset.code = r.code;
  h.innerHTML = `<div class="gl"></div><div class="hin"><small>Oxirgi natijangiz</small><div class="lrt"><b>${cm(val(r))}</b>${r.level ? `<span class="lv">${esc(r.level)}</span>` : ""}${df}</div><span class="lrs">${esc(r.subject)} · ${esc(r.title)} · ${dt(r.date)}</span><div class="lrc">${ch.join("")}</div></div>`;
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
