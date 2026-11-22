(function(){
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".mkb{position:fixed;left:0;right:0;bottom:0;z-index:140;background:#dfe4f6;border-radius:22px 22px 0 0;padding:8px 8px calc(12px + env(safe-area-inset-bottom));box-shadow:0 -10px 30px rgba(15,26,77,.25);animation:mkin .18s ease-out;user-select:none;-webkit-user-select:none}"
+ "@keyframes mkin{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}"
+ ".mkt{display:flex;gap:6px;padding:2px 2px 8px;overflow-x:auto}.mkt button{flex:none;border:0;border-radius:99px;padding:8px 14px;font:800 13px system-ui,sans-serif;background:#e3e8f8;color:#4a5680}.mkt button.on{background:#2440d6;color:#fff;box-shadow:0 4px 10px rgba(36,64,214,.4)}"
+ ".mkk{display:flex;flex-wrap:wrap;justify-content:center;max-height:176px;overflow-y:auto}"
+ ".mkk button,.mkc button{height:40px;margin:3px;border:0;border-radius:10px;background:#fff;color:#111;font:800 17px system-ui,sans-serif;box-shadow:0 2px 0 #cfd5ea;touch-action:manipulation}"
+ ".mkk button{min-width:calc(12.5% - 6px);padding:0 4px}.mkk button:active,.mkc button:active{transform:translateY(2px);box-shadow:none;background:#eef1fa}"
+ ".mkk button.w{min-width:calc(25% - 6px);font-size:15px}.mkk button.s{background:#f4f6fc;color:#2440d6}"
+ ".mkc{display:flex;gap:2px;margin-top:4px}.mkc button{flex:1;margin:2px;font-size:15px}.mkc button.ok{flex:2;background:#2440d6;color:#fff;box-shadow:0 2px 0 #1b2fa8}"
+ "</style>");
const T = {
  "123": ["1","2","3","4","5","6","7","8","9","0",",",".","-","+","/","=","(",")",";","%"],
  "Amal": ["+","−","×","÷","=","≠","≈","<",">","≤","≥","±","(",")","[","]","√","∛","%","‰","|","π","∞","°"],
  "Daraja": ["^","²","³","ⁿ","₁","₂","ₙ","log","ln","lg","sin","cos","tg","ctg","arcsin","arccos","lim","Σ","∫","∠","△","⊥","∥","∈","∪","∩","⇒","⇔","∀","∃"],
  "Yunon": ["α","β","γ","δ","ε","θ","λ","μ","π","σ","φ","ω","ψ","ρ","τ","Δ","Σ","Φ","Ω","Π","Γ","Θ","Λ","Ψ"],
  "abc": "abcdefghijklmnopqrstuvwxyz".split("").concat(["ʻ","'"])
};
const TPL = [["a/b", "()/()", 1], ["√( )", "√()", 2], ["∛( )", "∛()", 2], ["x^( )", "^()", 2], ["|x|", "||", 1]];
let kb = null, inp = null, tab = "123", up = false;
function ins(s, back){
  if(!inp) return;
  const a = inp.selectionStart == null ? inp.value.length : inp.selectionStart, b = inp.selectionEnd == null ? a : inp.selectionEnd;
  inp.setRangeText(s, a, b, "end");
  if(back != null){ const p = a + s.length - back; inp.setSelectionRange(p, p); }
  inp.dispatchEvent(new Event("input", {bubbles: true}));
}
function del(){
  if(!inp) return;
  const a = inp.selectionStart, b = inp.selectionEnd;
  if(a !== b){ ins(""); return; }
  if(a > 0){ inp.setRangeText("", a - 1, a, "end"); inp.dispatchEvent(new Event("input", {bubbles: true})); }
}
function move(d){ if(!inp) return; const p = Math.max(0, Math.min(inp.value.length, inp.selectionStart + d)); inp.setSelectionRange(p, p); }
function draw(){
  if(!kb) return;
  const keys = T[tab].map(k => {
    const v = tab === "abc" && up ? k.toUpperCase() : k;
    return '<button type="button" data-k="' + v + '"' + (v.length > 2 ? ' class="w"' : "") + ">" + v + "</button>";
  }).join("");
  const tpl = tab === "Amal" || tab === "123" ? TPL.map((x, i) => '<button type="button" class="s w" data-t="' + i + '">' + x[0] + "</button>").join("") : "";
  kb.innerHTML = '<div class="mkt">' + Object.keys(T).map(n => '<button type="button" data-tab="' + n + '"' + (n === tab ? ' class="on"' : "") + ">" + n + "</button>").join("") + "</div>"
    + '<div class="mkk">' + tpl + keys + '</div>'
    + '<div class="mkc"><button type="button" data-c="l">⬅</button><button type="button" data-c="r">➡</button>' + (tab === "abc" ? '<button type="button" data-c="up">⇧</button>' : "") + '<button type="button" data-c="d">⌫</button><button type="button" data-c="sys">⌨</button><button type="button" class="ok" data-c="ok">Tayyor</button></div>';
}
function show(i){
  inp = i; i.setAttribute("inputmode", "none");
  if(!kb){
    kb = document.createElement("div"); kb.className = "mkb";
    kb.addEventListener("pointerdown", e => { e.preventDefault(); });
    kb.addEventListener("click", e => {
      const b = e.target.closest("button"); if(!b) return;
      if(b.dataset.tab){ tab = b.dataset.tab; draw(); return; }
      if(b.dataset.k != null){ ins(b.dataset.k); return; }
      if(b.dataset.t != null){ const x = TPL[b.dataset.t]; ins(x[1], x[2]); return; }
      const c = b.dataset.c;
      if(c === "l") move(-1); else if(c === "r") move(1); else if(c === "d") del();
      else if(c === "up"){ up = !up; draw(); }
      else if(c === "sys"){ inp.setAttribute("inputmode", "text"); inp.blur(); setTimeout(() => inp.focus(), 50); hide(); }
      else if(c === "ok") hide(true);
    });
    document.body.appendChild(kb); draw();
  }
  document.body.style.paddingBottom = "320px";
  setTimeout(() => { try{ i.scrollIntoView({block: "center", behavior: "smooth"}); }catch(e){} }, 120);
}
function hide(blur){
  if(kb){ kb.remove(); kb = null; }
  document.body.style.paddingBottom = "";
  if(blur && inp) inp.blur();
}
document.addEventListener("focusin", e => {
  const t = e.target;
  if(t && t.matches && t.matches("#xopen input") && t.getAttribute("inputmode") !== "text") show(t);
});
document.addEventListener("pointerdown", e => {
  if(!kb) return;
  if(kb.contains(e.target) || (e.target.matches && e.target.matches("#xopen input"))) return;
  hide();
}, true);
})();
                 
