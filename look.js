(function(){
/* 1) Qoraqalpoq va Rus tilini olib tashlash */
for(let i = SUBJECTS.length - 1; i >= 0; i--){
  if(/^(Qoraqalpoq|Rus)/.test(SUBJECTS[i])) SUBJECTS.splice(i, 1);
}
const sel = $("subject");
if(sel) Array.from(sel.options).forEach(o => { if(/^(Qoraqalpoq|Rus)/.test(o.value)) o.remove(); });

/* 2) Belgilar */
const S = (b, s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const P = {
  mat: '<rect x="5" y="3" width="14" height="18" rx="3"/><rect x="8" y="6" width="8" height="4" rx="1"/><circle cx="9" cy="14" r=".6"/><circle cx="12" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/><circle cx="9" cy="17.5" r=".6"/><circle cx="12" cy="17.5" r=".6"/><circle cx="15" cy="17.5" r=".6"/>',
  fiz: '<circle cx="12" cy="12" r="1.7" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  kim: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>',
  bio: '<path d="M12 21v-8"/><path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6Z"/><path d="M12 16c0-3-2-5-6-5 0 3 2 5 6 5Z"/>',
  tar: '<path d="M3 9l9-5 9 5H3Z"/><path d="M5.5 9v9M9.8 9v9M14.2 9v9M18.5 9v9M3 20h18"/>',
  geo: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  ing: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/><text x="12" y="14" font-size="7.5" font-weight="800" text-anchor="middle" fill="currentColor" stroke="none">Aa</text>',
  ona: '<path d="M12 6c-2-1.6-5-2-8-1.5v13c3-.5 6-.1 8 1.5 2-1.6 5-2 8-1.5v-13C17 4 14 4.4 12 6Z"/><path d="M12 6v13"/>',
  past: '<path d="M4 7l8-4 8 4-8 4-8-4Z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>',
  test: '<path d="M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2"/><rect x="8" y="3" width="8" height="4" rx="1.2"/><path d="M9 14l2 2 4-4"/>',
  def: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/>'
};
const COL = {mat:"#2440d6", fiz:"#7a45d6", kim:"#1f9d55", bio:"#0f9f7a", tar:"#c27a10", geo:"#0f8fb5", ing:"#d6455d", ona:"#e0652b", past:"#d62f8f", test:"#0e8fc7", def:"#5a6a99"};
const keyOf = s => { s = s || ""; if(s.startsWith("Matematika")) return "mat"; if(s.startsWith("Fizika")) return "fiz"; if(s.startsWith("Kimyo")) return "kim"; if(s.startsWith("Biologiya")) return "bio"; if(s.startsWith("Tarix")) return "tar"; if(s.startsWith("Geografiya")) return "geo"; if(s.startsWith("Ingliz")) return "ing"; if(s.startsWith("Ona tili")) return "ona"; return "def"; };
const jelly = (k, size, s) => {
  const c = COL[k];
  return `<span class="jl" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * .3)}px;background:linear-gradient(160deg,${c}ee,${c} 45%,${c}bb);box-shadow:0 8px 14px ${c}55,inset 0 -4px 7px rgba(0,0,0,.22),inset 0 1.5px 1px rgba(255,255,255,.7)"><span class="jg"></span><span class="ji">${S(P[k], s)}</span></span>`;
};

window.MSJ = {jelly: jelly, keyOf: keyOf};
document.head.insertAdjacentHTML("beforeend", "<style>"
+ ".jl{position:relative;display:grid;place-items:center;flex:none;color:#fff}"
+ ".jl .jg{position:absolute;left:3px;right:3px;top:3px;height:48%;border-radius:12px 12px 60% 60%/12px 12px 28% 28%;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.04));pointer-events:none}"
+ ".jl .ji{position:relative;display:grid;filter:drop-shadow(0 2px 2px rgba(0,0,0,.28))}"
+ ".cats{gap:10px;margin:6px 0 12px}"
+ ".cat{flex-direction:row!important;min-height:0!important;padding:10px 12px!important;gap:10px!important;justify-content:flex-start!important;text-align:left;font-size:14px!important;border-radius:18px!important;border:1px solid var(--line2)!important;box-shadow:0 4px 12px rgba(36,64,214,.07)}"
+ ".cat.on{background:var(--soft)!important;border-color:var(--violet)!important}"
+ ".cat .jl{flex:none}"
+ ".chip{padding:9px 14px!important;font-size:14px!important}"
+ ".t.cp{padding:10px 12px;border-radius:18px;margin-bottom:8px;box-shadow:0 4px 12px rgba(36,64,214,.06);border:1px solid var(--line)}"
+ ".t.cp .th{gap:12px}.t.cp .tm b{font-size:16px;line-height:1.2}.t.cp .tm small{font-size:12.5px;margin-top:3px}"
+ ".t.cp .tag{padding:6px 11px;border-radius:99px;font-size:13px;align-self:center}"
+ ".t.cp .tag.paid{background:#e8edfb;color:#2440d6}.t.cp .tag.free{background:#dff5e8;color:#1a8a4a}"
+ ".t.cp .tg2{display:inline-block;margin-top:5px;padding:3px 9px;border-radius:99px;background:#fff1cc;color:#8a5a00;font-size:12px;font-weight:800}"
+ "</style>");

/* 3) Ixcham tugmalar */
const cats = $("cats");
const mkCat = (c, k, name) => { const b = cats.querySelector('.cat[data-c="' + c + '"]'); if(b) b.innerHTML = jelly(k, 38, 20) + "<span>" + name + "</span>"; };
if($("chips") && cats.parentNode === $("chips").parentNode) $("chips").parentNode.insertBefore(cats, $("chips"));
mkCat("past", "past", "Tushgan savollar");
mkCat("ms", "test", "MS testlar");

/* 4) Fan tugmalari */
const jd = s => { const v = Date.parse(s); return isNaN(v) ? "" : new Date(v).toLocaleDateString("ru-RU"); };
function tagNew(t){
  const now = Date.now();
  const st = t.starts_at ? Date.parse(t.starts_at) : 0, en = t.ends_at ? Date.parse(t.ends_at) : 0;
  const hm = x => new Date(x).toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit"});
  const dm = x => new Date(x).toLocaleDateString("ru-RU", {day: "2-digit", month: "2-digit"});
  const today = x => new Date(x).toDateString() === new Date().toDateString();
  let price = en && now > en ? '<span class="tag end">Tugagan</span>' : (t.price ? '<span class="tag paid">' + Number(t.price).toLocaleString("ru-RU") + '</span>' : '<span class="tag free">Bepul</span>');
  let extra = "";
  if(st && now < st) extra = '<span class="tg2">⏰ ' + (today(st) ? "bugun" : dm(st)) + " " + hm(st) + " da</span>";
  else if(en && now < en) extra = '<span class="tg2" style="background:#dff5e8;color:#1a8a4a">⏱ ' + hm(en) + " gacha</span>";
  return {price, extra};
}

/* 5) Ixcham test qatorlari */
const _prev = renderTests;
renderTests = function(){
  const box = $("tlist");
  if(CAT === "past"){ _prev(); return; }
  if(CAT !== "ms"){
    box.innerHTML = `<div class="empty"><div>${CAT === "past" ? "📭" : "🗂️"}</div><b>${CAT === "past" ? "Hozircha tushgan savollar yo'q" : "Hozircha ishlangan savollar yo'q"}</b>Tez orada shu yerda paydo bo'ladi.</div>`;
    return;
  }
  const list = TESTS.filter(t => !FILTER || t.subject === FILTER);
  if(!list.length){ box.innerHTML = `<div class="empty"><div>📭</div><b>Hozircha testlar yo'q</b>"Yaratish" bo'limidan test yarating.</div>`; return; }
  box.innerHTML = list.map(t => {
    const g = tagNew(t);
    const sub = esc(t.subject) + " · " + esc(t.code) + (jd(t.starts_at || t.ends_at) ? " · " + jd(t.starts_at || t.ends_at) : "");
    return `<div class="t cp" data-code="${esc(t.code)}"><div class="th">${jelly(keyOf(t.subject), 44, 24)}<div class="tm"><b>${esc(t.title)}</b><small>${sub}</small>${g.extra}</div>${g.price}</div></div>`;
  }).join("");
};
renderChips();
renderTests();
})();
                                                                                                                                                                                                                                                                                                                         
