(function(){
let on = true;
document.head.insertAdjacentHTML("beforeend", "<style>.rt{display:flex;align-items:center;gap:12px;margin:12px 0;padding:14px;border-radius:20px;background:linear-gradient(135deg,#eef2ff,#f6f0ff);border:1.5px solid #dfe5f6}.rt b{display:block;font:800 15.5px system-ui,sans-serif;color:#0f1a4d}.rt small{display:block;color:#6b7699;font:600 12.5px system-ui,sans-serif;margin-top:2px}.rt .sw{flex:none;width:52px;height:30px;border-radius:20px;background:#c9d1ec;position:relative;border:0;transition:.2s}.rt .sw i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.25);transition:.2s}.rt .sw.on{background:#1fa463}.rt .sw.on i{left:25px}</style>");
const txt = () => on ? "Natija Rash modeli bo'yicha hisoblanadi (5 ta ishtirokchidan keyin)" : "Faqat to'g'ri javoblar soni ko'rsatiladi";
function add(){
  const e = document.getElementById("essay");
  if(!e || document.getElementById("rtg")) return;
  const host = e.closest("label") || e.parentElement;
  const d = document.createElement("div"); d.className = "rt"; d.id = "rtg";
  d.innerHTML = '<div style="flex:1;min-width:0"><b>📈 Rash hisobi</b><small id="rtx"></small></div><button type="button" class="sw on"><i></i></button>';
  host.after(d);
  const s = d.querySelector(".sw"), x = d.querySelector("#rtx"); x.textContent = txt();
  s.onclick = () => { on = !on; s.classList.toggle("on", on); x.textContent = txt(); };
}
setInterval(add, 500);
const w = () => {
  const o = window.call;
  if(!o || o.__rt) return false;
  const n = function(path, body){
    if(path === "/api/tests/create2" && body) body = Object.assign({}, body, {rash: on});
    return o.call(this, path, body);
  };
  n.__rt = 1; window.call = n; return true;
};
let k = 0; const iv = setInterval(() => { if(w() || ++k > 40) clearInterval(iv); }, 250);
})();
