(function(){
const show = m => { const d = document.createElement("div"); d.textContent = "⚠ " + m; d.style.cssText = "position:fixed;left:8px;right:8px;top:8px;background:#b3262b;color:#fff;padding:10px 12px;border-radius:12px;font:700 12.5px system-ui,sans-serif;z-index:9999;word-break:break-all"; d.onclick = () => d.remove(); document.body.appendChild(d); setTimeout(() => d.remove(), 20000); };
window.addEventListener("error", e => show((e.message || "xato") + " | " + String(e.filename || "").split("/").pop() + ":" + e.lineno));
window.addEventListener("unhandledrejection", e => show("promise: " + ((e.reason && e.reason.message) || e.reason)));
const w = () => { const J = window.MSJ; if(!J || J.__s) return !!J; ["jelly","keyOf"].forEach(k => { const o = J[k]; if(typeof o == "function") J[k] = function(){ try{ return o.apply(this, arguments); }catch(x){ show("MSJ." + k + ": " + x.message); return ""; } }; }); J.__s = 1; return true; };
let n = 0; const iv = setInterval(() => { if(w() || ++n > 40) clearInterval(iv); }, 250);
})();
