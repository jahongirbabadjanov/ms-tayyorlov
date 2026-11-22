(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ "#chips .chip{display:inline-flex!important;align-items:center;gap:7px}#chips .chip .cix{display:inline-flex;flex:none}"
+ "#chips .chip .cix>*{transform-origin:center}"
+ ".yfx{position:relative;margin:0 0 12px;display:flex;gap:8px;align-items:center}"
+ ".yfb{flex:1;display:flex;justify-content:space-between;align-items:center;background:#fff;border:1.5px solid #dfe5f6;border-radius:14px;padding:12px 14px;font-weight:800;font-size:15px;color:#0f1a4d;box-shadow:0 3px 8px rgba(36,64,214,.06)}"
+ ".yfb span{color:#2440d6;transition:transform .2s}.yfx.open .yfb span{transform:rotate(180deg)}.yfx.open .yfb{border-color:#2440d6}"
+ ".yfl{position:absolute;left:0;top:calc(100% + 6px);min-width:170px;background:#fff;border:1px solid #e3e8f8;border-radius:16px;padding:6px;box-shadow:0 14px 30px rgba(15,26,77,.25);z-index:40;display:none}"
+ ".yfx.open .yfl{display:block;animation:yfi .16s ease-out}@keyframes yfi{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}"
+ ".yfl div{padding:11px 12px;border-radius:11px;font-weight:800;font-size:15px;color:#0f1a4d}.yfl div.on{background:#e8edfb;color:#2440d6}"
+ ".yfc{font-size:13px;color:#7a84a8;font-weight:700;white-space:nowrap}"
+ "</style>");
let YEAR = "", busy = false;
const yearOf = el => { const m = (el.querySelector("b") || el).textContent.match(/\b(20\d\d)\b/); return m ? m[1] : ""; };
function icons(){
  const J = window.MSJ;
  document.querySelectorAll("#chips .chip").forEach(c => {
    if(c.querySelector(".cix")) return;
    const s = c.dataset.s; if(!s) return;
    let h = "";
    try{ h = J ? J.jelly(J.keyOf(s), 26, 15) : ""; }catch(e){}
    if(!h && typeof iconOf === "function"){ try{ h = iconOf(s); }catch(e){} }
    if(h){ const w = document.createElement("span"); w.className = "cix"; w.innerHTML = h; c.insertBefore(w, c.firstChild); }
  });
}
function years(cards){ return [...new Set(cards.map(yearOf).filter(Boolean))].sort().reverse(); }
function apply(){
  const list = document.getElementById("tlist"); if(!list) return;
  const cards = [...list.querySelectorAll(".t.cp.pp")];
  let bar = document.getElementById("yfx");
  if(!cards.length){ if(bar) bar.remove(); return; }
  const ys = years(cards);
  if(YEAR && !ys.includes(YEAR)) YEAR = "";
  if(!bar){
    bar = document.createElement("div"); bar.id = "yfx"; bar.className = "yfx";
    list.parentNode.insertBefore(bar, list);
  }
  const shown = cards.filter(c => !YEAR || yearOf(c) === YEAR);
  cards.forEach(c => c.style.display = (!YEAR || yearOf(c) === YEAR) ? "" : "none");
  bar.innerHTML = '<div class="yfb" role="button"><b>' + (YEAR || "Barcha yillar") + '</b><span>▾</span></div><div class="yfc">' + shown.length + ' ta</div>'
    + '<div class="yfl"><div data-y=""' + (!YEAR ? ' class="on"' : "") + '>Barcha yillar</div>' + ys.map(y => '<div data-y="' + y + '"' + (y === YEAR ? ' class="on"' : "") + '>' + y + '</div>').join("") + '</div>';
  bar.querySelector(".yfb").onclick = () => bar.classList.toggle("open");
  bar.querySelectorAll(".yfl div").forEach(d => d.onclick = () => { YEAR = d.dataset.y; apply(); });
}
function run(){
  if(busy) return; busy = true;
  try{ icons(); apply(); }catch(e){}
  busy = false;
}
document.addEventListener("click", e => { const b = document.getElementById("yfx"); if(b && !b.contains(e.target)) b.classList.remove("open"); });
const t = setInterval(() => {
  const c = document.getElementById("chips"), l = document.getElementById("tlist");
  if(!c || !l) return;
  clearInterval(t);
  const mo = new MutationObserver(() => { mo.disconnect(); run(); mo.observe(c, {childList: true}); mo.observe(l, {childList: true}); });
  mo.observe(c, {childList: true}); mo.observe(l, {childList: true});
  run();
}, 500);
})();
