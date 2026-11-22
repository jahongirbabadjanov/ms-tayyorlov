(function(){
const esc = x => String(x == null ? "" : x).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fm = n => Number(n).toFixed(1).replace(".", ",");
const MC = ["#fcc419", "#d5dae6", "#efc7a0"];
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".t10t{margin:0 0 14px;border-radius:22px;background:linear-gradient(150deg,#ffb52e,#ff7a1a);color:#fff;padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;box-shadow:0 10px 20px rgba(255,122,26,.35)}"
+ ".t10t i{width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,.25);display:grid;place-items:center;font-size:28px;font-style:normal}"
+ ".t10t div{flex:1}.t10t b{display:block;font-size:18px}.t10t small{display:block;font-size:13px;font-weight:600;opacity:.95;margin-top:2px}.t10t span{font-size:26px}"
+ ".t10o{position:fixed;left:0;right:0;top:0;bottom:0;z-index:130;overflow:auto;background:linear-gradient(#eef2ff,#fbf3ea);padding:14px 14px 40px;color:#0f1a4d;font-family:inherit}"
+ ".t10h{display:flex;gap:12px;align-items:center;margin-bottom:12px}.t10h b{font-size:22px;display:block}.t10h small{color:#7a84a8;font-size:13px}"
+ ".t10b{width:44px;height:44px;border:0;border-radius:14px;background:#e8edfb;color:#2440d6;font-size:22px;font-weight:800;flex:none}"
+ ".t10s{display:flex;align-items:center;gap:8px;margin-bottom:12px}.t10s>div{flex:1;text-align:center;min-width:0}.t10s b{display:block;font-size:15.5px}.t10s small{color:#7a84a8;font-size:12.5px}"
+ ".t10s button{width:40px;height:40px;border:0;border-radius:12px;background:#e8edfb;color:#2440d6;font-size:20px;font-weight:800;flex:none}.t10s button:disabled{background:#f2f4fb;color:#b9c0dc}"
+ ".t10r{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:14px;margin-bottom:6px;background:#fff;border:1px solid #e3e8f8}.t10r.me{background:#eef2ff;border:1.5px solid #2440d6}"
+ ".t10r em{width:30px;height:30px;border-radius:10px;background:#e8edfb;display:grid;place-items:center;font-style:normal;font-weight:900;font-size:14px;color:#2440d6;flex:none}"
+ ".t10r b{flex:1;font-size:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.t10r strong{color:#2440d6}"
+ ".t10r span{background:#fff0c9;color:#7a5200;font-weight:800;font-size:12px;border-radius:99px;padding:4px 10px}"
+ ".t10m{margin-top:10px;background:#fff4d1;border-radius:14px;padding:12px;font-weight:800;font-size:14px;color:#8a6a00;text-align:center}"
+ "</style>");
let data = null, i = 0, ov = null;
function draw(){
  if(!ov) return;
  const body = ov.querySelector(".t10c");
  if(!data){ body.innerHTML = '<p style="text-align:center;color:#7a84a8">Yuklanmoqda...</p>'; return; }
  if(!data.length){ body.innerHTML = '<p style="text-align:center;color:#7a84a8;margin-top:30px">Hali tugagan test yo\'q.</p>'; return; }
  const t = data[i];
  body.innerHTML = `<div class="t10s"><button type="button" id="t10p" ${i >= data.length - 1 ? "disabled" : ""}>‹</button><div><b>${esc(t.title)}</b><small>${t.n} ishtirokchi</small></div><button type="button" id="t10n" ${i <= 0 ? "disabled" : ""}>›</button></div>`
    + t.top.map((r, k) => `<div class="t10r${t.me && t.me.rank === k + 1 ? " me" : ""}"><em${k < 3 ? ` style="background:${MC[k]}"` : ""}>${k + 1}</em><b>${esc(r.name)}</b><strong>${fm(r.ball)}</strong>${r.level ? `<span>${esc(r.level)}</span>` : ""}</div>`).join("")
    + `<div class="t10m">${t.me ? "Sizning o'rningiz: " + t.me.rank + " · " + fm(t.me.ball) + " ball" : "Siz bu testda qatnashmagansiz"}</div>`;
  body.querySelector("#t10p").onclick = () => { if(i < data.length - 1){ i++; draw(); } };
  body.querySelector("#t10n").onclick = () => { if(i > 0){ i--; draw(); } };
}
async function openTop(){
  ov = document.createElement("div"); ov.className = "t10o";
  ov.innerHTML = '<div class="t10h"><button class="t10b" type="button" id="t10x">‹</button><div><b>🏆 Top 10</b><small>Eng yaxshi natijalar</small></div></div><div class="t10c"></div>';
  document.body.appendChild(ov);
  ov.querySelector("#t10x").onclick = () => { ov.remove(); ov = null; };
  i = 0; draw();
  try{ data = (await call("/api/top", {})).tests || []; }catch(e){ data = []; }
  draw();
}
setInterval(() => {
  const v = document.getElementById("v-answer");
  if(!v || document.getElementById("t10t")) return;
  const d = document.createElement("div");
  d.id = "t10t"; d.className = "t10t";
  d.innerHTML = '<i>🏆</i><div><b>Top 10</b><small>Eng yaxshi natijalar reytingi</small></div><span>›</span>';
  d.onclick = openTop;
  v.prepend(d);
}, 800);
})();
