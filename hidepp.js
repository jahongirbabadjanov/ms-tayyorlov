(function(){
let codes = new Set(), got = 0;
function apply(){
  const l = document.getElementById("tlist"); if(!l) return;
  l.querySelectorAll(".t.cp[data-code]").forEach(c => {
    if(c.classList.contains("pp")) return;
    const h = codes.has(c.dataset.code);
    if(h && c.style.display !== "none") c.style.display = "none";
    else if(!h && c.style.display === "none") c.style.display = "";
  });
}
async function load(){
  if(!window.call) return;
  try{
    const r = await call("/api/papers/list", {});
    codes = new Set((r.papers || []).map(p => p.test_code).filter(Boolean));
    got = Date.now(); apply();
  }catch(e){}
}
const l = () => document.getElementById("tlist");
let n = 0;
const iv = setInterval(() => {
  const el = l();
  if(el){
    clearInterval(iv); load();
    new MutationObserver(apply).observe(el, {childList: true});
    setInterval(() => { if(Date.now() - got > 45000) load(); }, 15000);
  } else if(++n > 60) clearInterval(iv);
}, 300);
})();
