(function(){
let codes = new Set(), got = 0, busy = false;
function apply(){
  document.querySelectorAll(".t[data-code]").forEach(c => {
    if(c.classList.contains("pp") || c.closest(".adm2") || c.closest(".tpg")) return;
    const h = codes.has(String(c.dataset.code));
    if(h && c.style.display !== "none") c.style.display = "none";
    else if(!h && c.style.display === "none") c.style.display = "";
  });
}
async function load(){
  if(busy || typeof call !== "function") return;
  busy = true;
  try{
    const r = await call("/api/papers/list", {});
    codes = new Set((r.papers || []).map(p => p.test_code).filter(Boolean).map(String));
    got = Date.now();
  }catch(e){}
  busy = false; apply();
}
setInterval(() => { if(!got || Date.now() - got > 30000) load(); apply(); }, 700);
})();
