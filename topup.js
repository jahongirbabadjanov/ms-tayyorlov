(function(){
window.goTopup = function(){
  try{ go("profile"); }catch(e){ return; }
  let n = 0;
  const t = setInterval(() => {
    const b = document.querySelector("#v-profile [data-a]");
    if(b){ clearInterval(t); b.click(); }
    else if(++n > 20) clearInterval(t);
  }, 150);
};
const css = document.createElement("style");
css.textContent = ".topbtn{display:flex;align-items:center;justify-content:center;width:100%;height:50px;margin-top:10px;border:0;border-radius:14px;background:#ffc629;color:#0f1a4d;font:800 15.5px system-ui,sans-serif;cursor:pointer}";
document.head.appendChild(css);
let busy = false;
function fix(){
  if(busy) return; busy = true;
  const e = document.getElementById("xerr");
  const has = e && /Balans yetarli emas/i.test(e.textContent || "");
  let b = document.getElementById("xtop");
  if(has && !b){
    b = document.createElement("button");
    b.id = "xtop"; b.type = "button"; b.className = "topbtn"; b.textContent = "Balansni to'ldirish";
    b.onclick = window.goTopup;
    e.after(b);
  }else if(!has && b){ b.remove(); }
  busy = false;
}
new MutationObserver(fix).observe(document.body, {childList: true, subtree: true, characterData: true});
})();
