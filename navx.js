(function(){
const LS = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k) || "null"); }catch(e){ return null; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
document.head.insertAdjacentHTML("beforeend", "<style>"
+ "nav button i{position:relative;width:42px;height:42px;border-radius:13px;display:grid;place-items:center;overflow:hidden;background:linear-gradient(160deg,#e4e6ec 0%,#b3b7c3 55%,#8a8e9c 100%);box-shadow:0 5px 10px rgba(0,0,0,.2),inset 0 -3px 6px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.9);transition:transform .15s}"
+ "nav button i::before{content:'';position:absolute;left:2px;right:2px;top:2px;height:48%;border-radius:11px 11px 20px 20px/11px 11px 9px 9px;background:linear-gradient(rgba(255,255,255,.85),rgba(255,255,255,.12))}"
+ "nav button i::after{content:'';position:absolute;top:-30%;left:-60%;width:40%;height:160%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent);transform:rotate(20deg);animation:nxs 3.2s ease-in-out infinite}"
+ "@keyframes nxs{0%,55%{left:-60%}100%{left:130%}}"
+ "nav button i svg{position:relative;z-index:2;width:22px;height:22px;stroke:#fff!important;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35))}"
+ "nav button.on i{background:linear-gradient(160deg,#8fa5ff 0%,#3d5af1 50%,#1b2fa8 100%);box-shadow:0 7px 14px rgba(36,64,214,.5),inset 0 -3px 6px rgba(0,0,40,.3),inset 0 1px 0 rgba(255,255,255,.7)}"
+ "nav button:active i{transform:scale(.9)}"
+ "nav button{position:relative}.nxn{position:absolute;top:2px;right:6px;background:#ff5a3c;color:#fff;font-size:9px;font-weight:900;border-radius:99px;padding:2px 6px;z-index:3}"
+ ".nxk{padding:14px 14px 90px}.nxk h2{font-size:22px;margin:4px 0 2px}.nxk .sub{color:#7a84a8;font-size:13px;margin-bottom:14px}"
+ ".nxc{background:#fff;border:1px solid #e3e8f8;border-radius:22px;padding:18px 14px;margin-bottom:12px;box-shadow:0 3px 10px rgba(36,64,214,.06)}"
+ ".nxb{display:flex;justify-content:center;gap:10px;position:relative}.nxb div{width:54px;height:64px;border-radius:16px;border:2px solid #dfe5f6;background:#f8f9fe;display:grid;place-items:center;font-size:30px;font-weight:900;color:#2440d6;transition:.15s}"
+ ".nxb div.a{border-color:#2440d6;box-shadow:0 0 0 4px rgba(36,64,214,.12)}"
+ ".nxb input{position:absolute;inset:0;opacity:0;width:100%;height:100%;font-size:16px}"
+ ".nxg{display:block;width:100%;margin-top:16px;border:0;border-radius:99px;background:linear-gradient(#3a58ee,#2440d6);color:#fff;font-weight:900;font-size:17px;padding:15px;box-shadow:0 8px 18px rgba(36,64,214,.35)}.nxg:active{transform:scale(.97)}"
+ ".nxe{color:#c0392b;font-weight:800;font-size:13px;text-align:center;margin-top:10px;min-height:16px}"
+ "@keyframes nxsh{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}.nxb.sh{animation:nxsh .3s}"
+ ".nxr{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #eef0f8;font-size:15px}.nxr:last-child{border:0}.nxr b{color:#2440d6;letter-spacing:1px}.nxr span{color:#7a84a8;font-size:12.5px}"
+ ".nxt{font-size:13px;color:#6b7699;line-height:1.55}"
+ "</style>");
const ALL = ["tests", "answer", "create", "profile"];
let val = "";
function boxes(){
  const b = document.querySelector(".nxb");
  if(!b) return;
  b.querySelectorAll("div").forEach((d, k) => { d.textContent = val[k] || ""; d.classList.toggle("a", k === Math.min(val.length, 3)); });
}
function recent(){
  const box = document.getElementById("nxrec"); if(!box) return;
  const L = LS.get("nx_codes") || [];
  box.parentNode.style.display = L.length ? "" : "none";
  box.innerHTML = L.map(x => `<div class="nxr" data-c="${x.c}"><b>${x.c}</b><span>${x.d}</span></div>`).join("");
  box.querySelectorAll(".nxr").forEach(r => r.onclick = () => { val = r.dataset.c; boxes(); submit(); });
}
function submit(){
  const err = document.querySelector(".nxe");
  if(val.length < 4){
    err.textContent = "4 xonali kodni kiriting";
    const b = document.querySelector(".nxb"); b.classList.remove("sh"); void b.offsetWidth; b.classList.add("sh"); return;
  }
  err.textContent = "";
  const L = (LS.get("nx_codes") || []).filter(x => x.c !== val);
  L.unshift({c: val, d: new Date().toLocaleDateString("ru-RU")});
  LS.set("nx_codes", L.slice(0, 5));
  const code = val; val = ""; boxes();
  if(typeof openTest === "function") openTest(code);
  else { document.getElementById("codein").value = code; document.getElementById("codego").click(); }
}
function build(){
  const nav = document.getElementById("nav"), pv = document.getElementById("v-profile");
  if(!nav || !pv || document.getElementById("v-kod")) return;
  const s = document.createElement("section");
  s.id = "v-kod"; s.className = "hidden nxk";
  s.innerHTML = '<h2>Kod bilan kirish</h2><p class="sub">Test egasi bergan kodni kiriting</p>'
    + '<div class="nxc"><div class="nxb"><div></div><div></div><div></div><div></div><input id="nxin" inputmode="numeric" maxlength="4" autocomplete="off"></div>'
    + '<button class="nxg" type="button">Kirish</button><div class="nxe"></div></div>'
    + '<div class="nxc"><b style="font-size:14px">🕘 Oxirgi kodlar</b><div id="nxrec"></div></div>'
    + '<div class="nxc nxt">💡 Kodni test egasidan yoki kanalimizdan olasiz. Kod 4 ta raqamdan iborat.</div>';
  pv.parentNode.insertBefore(s, pv.nextSibling);
  const inp = s.querySelector("#nxin");
  inp.oninput = () => { val = inp.value.replace(/\D/g, "").slice(0, 4); inp.value = val; boxes(); s.querySelector(".nxe").textContent = ""; if(val.length === 4) setTimeout(submit, 250); };
  s.querySelector(".nxb").onclick = () => inp.focus();
  s.querySelector(".nxg").onclick = submit;
  const first = nav.querySelector('button[data-v="create"]');
  const k = document.createElement("button");
  k.dataset.v = "kod";
  k.innerHTML = '<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/></svg></i>Kod' + (LS.get("nx_seen") ? "" : '<span class="nxn">yangi</span>');
  nav.insertBefore(k, first);
  k.onclick = () => go("kod");
  boxes(); recent();
}
const orig = window.go;
window.go = function(v){
  const kv = document.getElementById("v-kod");
  if(v === "kod" && kv){
    ALL.forEach(x => { const e = document.getElementById("v-" + x); if(e) e.classList.add("hidden"); });
    kv.classList.remove("hidden");
    document.querySelectorAll("nav button").forEach(b => b.classList.toggle("on", b.dataset.v === "kod"));
    const n = document.querySelector('nav button[data-v="kod"] .nxn'); if(n) n.remove();
    LS.set("nx_seen", 1); recent(); window.scrollTo(0, 0);
    return;
  }
  if(kv) kv.classList.add("hidden");
  return orig(v);
};
go = window.go;
const t = setInterval(() => { build(); if(document.getElementById("v-kod")) clearInterval(t); }, 500);
})();
  
