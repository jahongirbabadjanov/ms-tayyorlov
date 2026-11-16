(function(){
if(window.__dl) return;
window.__dl = true;
const pick = () => {
  let c = "";
  try{ const m0 = String(location.href).split("#")[0].match(/[?&\/]code=(\d{4})/); if(m0) c = m0[1]; }catch(e){}
  if(!c){ const m = (location.hash || "").match(/[?&#]code=(\d{4})/); if(m) c = m[1]; }
  if(!c){ try{ c = Telegram.WebApp.initDataUnsafe.start_param || ""; }catch(e){} }
  const m2 = String(c).match(/(\d{4})/);
  return m2 ? m2[1] : "";
};
const code = pick();
if(!code){
  const b0 = document.createElement("div");
  b0.style.cssText = "position:fixed;left:8px;right:8px;top:8px;z-index:200;background:#7a1d1d;color:#fff;padding:8px 12px;border-radius:12px;font:600 12px system-ui,sans-serif;line-height:1.4;word-break:break-all";
  let sp = ""; try{ sp = Telegram.WebApp.initDataUnsafe.start_param || ""; }catch(e){}
  b0.textContent = "Kod topilmadi. URL: " + location.href.slice(0, 160) + " | start_param: " + (sp || "yo'q");
  const add = () => { document.body.appendChild(b0); setTimeout(() => b0.remove(), 9000); };
  if(document.body) add(); else document.addEventListener("DOMContentLoaded", add);
  return;
}
const bar = document.createElement("div");
bar.style.cssText = "position:fixed;left:8px;right:8px;top:8px;z-index:200;background:#0f1a4d;color:#fff;padding:8px 12px;border-radius:12px;font:600 12.5px system-ui,sans-serif;line-height:1.4";
document.body.appendChild(bar);
const say = t => { bar.textContent = t; };
const hid = id => { const e = document.getElementById(id); return !e || e.classList.contains("hidden"); };
let tries = 0, counted = false;
const bq = (() => { try{ const m = String(location.href).split("#")[0].match(/[?&]b=(\d+)/); return m ? +m[1] : 0; }catch(e){ return 0; } })();
const step = () => {
  tries++;
  const examOpen = !hid("v-exam");
  say("Test " + code + " · urinish " + tries + " · ilova " + (typeof ME !== "undefined" && ME ? "tayyor" : "yuklanmoqda") + " · bosh sahifa " + (hid("v-tests") ? "yopiq" : "ochiq") + (examOpen ? " · test oynasi ochiq" : ""));
  if(examOpen){ say("✅ " + code + "-test ochildi"); setTimeout(() => bar.remove(), 1500); return; }
  if(typeof ME === "undefined" || !ME || hid("v-tests")){
    if(tries < 80) setTimeout(step, 500); else say("❌ Ilova tayyor bo'lmadi. Qayta oching.");
    return;
  }
  if(!counted){ counted = true; if(bq > 0){ try{ call("/api/bc/click", {id: bq}).catch(() => {}); }catch(e){} } }
  const inp = document.getElementById("codein"), go = document.getElementById("codego");
  if(!inp || !go){ say("❌ Kod kiritish maydoni topilmadi"); return; }
  inp.value = code;
  go.click();
  if(tries < 60) setTimeout(step, 1500);
};
setTimeout(step, 400);
})();
