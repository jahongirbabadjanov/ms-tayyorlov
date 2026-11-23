(function(){
const tt = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
new MutationObserver(() => {
  const p = document.querySelector('.mt-ov [data-a="pdf"]');
  if(!p || document.getElementById("mtx")) return;
  const o = p.closest(".mt-ov"), code = ((o.querySelector(".mt-h small") || {}).textContent || "").match(/\d{4}/);
  if(!code) return;
  const b = document.createElement("button"); b.id = "mtx"; b.type = "button"; b.className = "mt-b"; b.style.cssText = "width:100%;margin-top:8px"; b.textContent = "📥 Natijalar jadvali (Excel)";
  p.parentNode.after(b);
  b.onclick = async () => { b.disabled = true; try{ await call("/api/my/test_csv", {code: code[0]}); tt("Fayl botga yuborildi"); }catch(e){ tt("Hali natija yo'q"); } b.disabled = false; };
}).observe(document.body, {childList: true, subtree: true});
})();
