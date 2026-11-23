(function(){
const tt = m => { const d = document.createElement("div"); d.textContent = m; d.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#0f1a4d;color:#fff;padding:10px 16px;border-radius:14px;font:700 14px system-ui,sans-serif;z-index:400"; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
new MutationObserver(() => {
  const q = document.getElementById("mtq");
  if(!q || document.getElementById("mtm")) return;
  const o = q.closest(".mt-ov"), code = ((o.querySelector(".mt-h small") || {}).textContent || "").match(/\d{4}/);
  if(!code) return;
  const b = document.createElement("button"); b.id = "mtm"; b.type = "button"; b.className = "mt-b p"; b.style.cssText = "width:100%;margin-bottom:10px"; b.textContent = "✉️ Ishtirokchilarga xabar";
  q.before(b);
  b.onclick = () => {
    const box = document.createElement("div"); box.className = "mt-c";
    box.innerHTML = '<b>Xabar matni</b><textarea class="mt-in" rows="4" maxlength="600" placeholder="Masalan: Natijalar tayyor, tabriklaymiz!" style="margin-top:10px"></textarea><div class="mt-row"><button type="button" data-x="0">Bekor</button><button class="p" type="button" data-x="1">Yuborish</button></div>';
    b.replaceWith(box);
    box.onclick = async e => { const x = e.target.closest("[data-x]"); if(!x) return;
      if(x.dataset.x == "0"){ box.replaceWith(b); return; }
      const v = box.querySelector("textarea").value.trim(); if(!v){ tt("Matnni yozing"); return; }
      x.disabled = true;
      try{ const r = await call("/api/my/test_msg", {code: code[0], text: v}); tt("Yuborildi: " + r.sent + " / " + r.total); box.replaceWith(b); }
      catch(er){ tt(String(er.message).includes("429") ? "1 daqiqadan keyin urinib ko'ring" : "Yuborib bo'lmadi"); x.disabled = false; } };
  };
}).observe(document.body, {childList: true, subtree: true});
})();
