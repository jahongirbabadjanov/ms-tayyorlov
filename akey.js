(function(){
document.head.insertAdjacentHTML("beforeend", "<style>.akr{display:flex;align-items:center;gap:12px;margin-top:14px;padding:14px;border-radius:18px;background:linear-gradient(135deg,#fff7dc,#ffeeb0);color:#3d2d00;font:800 15px system-ui,sans-serif}.akr input{width:22px;height:22px;flex:none}.akr small{display:block;font-weight:700;font-size:12.5px;opacity:.8;margin-top:2px}</style>");
let want = null;
function add(){
  const b = document.getElementById("padd");
  if(!b || document.getElementById("akr")) return;
  const d = document.createElement("label"); d.id = "akr"; d.className = "akr";
  d.innerHTML = '<input type="checkbox" id="akc" checked><span>🔑 Qo\'shgach javoblarni kiritish<small>35 ta yopiq, ochiq javoblar, vaqt va Rash</small></span>';
  b.before(d);
}
setInterval(add, 400);
function pick(title){
  let n = 0;
  const t = setInterval(() => {
    const c = [...document.querySelectorAll(".adm2 .pc[data-id]")].find(x => { const e = x.querySelector(".pm b"); return e && e.textContent.trim() === title; });
    const k = c && c.querySelector(".pkb");
    if(k){ clearInterval(t); k.click(); } else if(++n > 40) clearInterval(t);
  }, 250);
}
const w = () => {
  const o = window.call; if(!o || o.__ak) return !!(o && o.__ak);
  const f = async function(path, body){
    const on = path === "/api/papers/create" && body && (document.getElementById("akc") || {}).checked;
    const r = await o.call(this, path, body);
    if(on && !(body.test_code)) pick(String(body.title).trim());
    return r;
  };
  f.__ak = 1; window.call = f; return true;
};
let k = 0; const iv = setInterval(() => { if(w() || ++k > 40) clearInterval(iv); }, 250);
})();
