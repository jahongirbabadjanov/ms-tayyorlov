(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".sit{display:flex;align-items:center;justify-content:center;gap:8px;margin:12px 0 4px;padding:12px;border-radius:16px;background:linear-gradient(150deg,#2440d6,#1b2fa8);color:#fff;font-weight:900;font-size:17px;box-shadow:0 8px 18px rgba(36,64,214,.3)}"
+ ".sit.end{background:linear-gradient(150deg,#8a93b8,#5d6690);box-shadow:none}.sit.on{background:linear-gradient(150deg,#2fb463,#1b8a47)}"
+ ".sir{display:inline-block;background:#dff6e8;color:#1e8a4c;font-weight:800;font-size:12.5px;border-radius:99px;padding:3px 10px}"
+ ".snb{margin-top:10px;padding:12px;border-radius:14px;background:#fff4d1;color:#8a6a00;font-weight:800;font-size:14px;text-align:center}"
+ "</style>");
const two = n => String(n).padStart(2, "0");
const fdt = s => { const d = new Date(s); return two(d.getDate()) + "." + two(d.getMonth() + 1) + "." + d.getFullYear() + " " + two(d.getHours()) + ":" + two(d.getMinutes()); };
const hms = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return two(Math.floor(s / 3600)) + ":" + two(Math.floor(s % 3600 / 60)) + ":" + two(s % 60); };
let cache = {t: 0, v: null}, tick = null;
async function papers(){
  if(cache.v && Date.now() - cache.t < 30000) return cache.v;
  cache = {t: Date.now(), v: (await call("/api/papers/list", {})).papers || []};
  return cache.v;
}
function topup(){
  const d = document.getElementById("shd"); if(d) d.remove();
  go("profile");
  let n = 0;
  const t = setInterval(() => {
    const b = document.querySelector(".pf-pill");
    if(b){ clearInterval(t); b.click(); } else if(++n > 20) clearInterval(t);
  }, 250);
}
async function enhance(d){
  const h2 = d.querySelector(".shh h2"); if(!h2) return;
  const title = h2.textContent;
  let p;
  try{ p = (await papers()).find(x => x.title === title); }catch(e){ return; }
  if(!p || !document.body.contains(d)) return;
  const sh = d.querySelector(".shs");
  const bal = (typeof ME !== "undefined" && ME && ME.balance) || 0;
  if(!p.owned && p.price > bal){
    const buy = sh.querySelector('[data-a="buy"]');
    const need = p.price - bal;
    if(buy){
      buy.insertAdjacentHTML("beforebegin", '<div class="snb">Balans yetarli emas: yana ' + Number(need).toLocaleString("ru-RU") + " so'm kerak</div>");
      buy.className = "sb y"; buy.dataset.a = "tp"; buy.textContent = "💳 Balans to'ldirish";
      buy.addEventListener("click", e => { e.stopPropagation(); topup(); }, true);
    }
  }
  if(!p.test_code) return;
  let t;
  try{ t = await call("/api/papers/info", {code: p.test_code}); }catch(e){ return; }
  if(!document.body.contains(d)) return;
  const kv = (a, b) => '<div class="kv"><span>' + a + "</span><span>" + b + "</span></div>";
  const last = [...sh.querySelectorAll(".kv")].pop();
  let rows = kv("Savollar soni", (t.questions || "-") + " ta") + kv("Vaqt", (t.minutes || "-") + " daqiqa");
  if(t.starts_at) rows += kv("Boshlanishi", fdt(t.starts_at));
  if(t.ends_at) rows += kv("Tugashi", fdt(t.ends_at));
  if(t.rash) rows += kv("Rash ball", '<span class="sir">Hisoblanadi ✓</span>');
  rows += '<div class="sit" id="sit"></div>';
  if(last) last.insertAdjacentHTML("afterend", rows); else sh.insertAdjacentHTML("afterbegin", rows);
  const go1 = sh.querySelector('[data-a="test"]');
  const draw = () => {
    const el = document.getElementById("sit");
    if(!el){ clearInterval(tick); return; }
    const now = Date.now(), st = t.starts_at ? new Date(t.starts_at).getTime() : 0, en = t.ends_at ? new Date(t.ends_at).getTime() : 0;
    if(st && st > now){ el.className = "sit"; el.textContent = "⏱ Boshlanishiga " + hms(st - now); if(go1){ go1.disabled = true; go1.textContent = "Test hali boshlanmagan"; } }
    else if(en && en <= now){ el.className = "sit end"; el.textContent = "🏁 Test yakunlangan"; }
    else{ el.className = "sit on"; el.textContent = en ? "🟢 Tugashiga " + hms(en - now) : "🟢 Test ochiq"; if(go1 && go1.disabled){ go1.disabled = false; go1.textContent = "Testni boshlash"; } }
  };
  clearInterval(tick); draw(); tick = setInterval(draw, 1000);
}
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if(n.id === "shd") enhance(n); }))).observe(document.body, {childList: true});
})();
