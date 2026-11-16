(function(){
const CFG = [
  {id: "pdfq", t: "Savollar PDF", c: "#2440d6", p: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>'},
  {id: "pdfk", t: "Yechimlar PDF", c: "#1fa463", p: '<path d="M6 3h8l5 5v13H6Z"/><path d="M14 3v5h5"/><path d="m9 15 2 2 4-4"/>'}
];
const fsz = n => n > 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
document.head.insertAdjacentHTML("beforeend", "<style>.pcd{display:flex;align-items:center;gap:12px;border:2px dashed #cfd8f3;background:#fbfcff;border-radius:22px;padding:14px;margin:10px 0}.pcd .nm{flex:1;min-width:0}.pcd .nm b{display:block;font-size:16px;white-space:nowrap}.pcd .nm small{display:block;color:#6b7699;font-size:14px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pcd .yb{flex:none;border:0;border-radius:16px;background:#e8edfb;color:#2440d6;font:800 14.5px system-ui,sans-serif;padding:12px 13px;cursor:pointer}.pcd.ok{border-color:#9fdcb8;background:#f4fcf7}.pcd.ok .yb{background:#dff5e8;color:#1a8a4a}.pcd .jl2{flex:none;width:52px;height:52px;border-radius:16px;display:grid;place-items:center;color:#fff;position:relative;overflow:hidden}.pcd .jl2::before{content:'';position:absolute;left:0;right:0;top:0;height:50%;background:linear-gradient(rgba(255,255,255,.5),rgba(255,255,255,.05))}.pcd .jl2 svg{position:relative}</style>");
CFG.forEach(f => {
  const inp = document.getElementById(f.id);
  if(!inp || inp.dataset.cardified) return;
  inp.dataset.cardified = "1";
  const lab = inp.previousElementSibling;
  if(lab && lab.tagName === "LABEL") lab.style.display = "none";
  inp.style.display = "none";
  const c = document.createElement("div");
  c.className = "pcd";
  c.innerHTML = `<span class="jl2" style="background:linear-gradient(160deg,${f.c}ee,${f.c} 45%,${f.c}bb);box-shadow:0 8px 14px ${f.c}55,inset 0 -4px 7px rgba(0,0,0,.22)"><svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${f.p}</svg></span><div class="nm"><b>${f.t}</b><small>Yuklanmagan</small></div><button class="yb" type="button">Yuklash</button>`;
  inp.before(c);
  const sync = () => {
    const file = inp.files && inp.files[0];
    c.classList.toggle("ok", !!file);
    c.querySelector("small").textContent = file ? file.name + " · " + fsz(file.size) : "Yuklanmagan";
    c.querySelector(".yb").textContent = file ? "O'zgartirish" : "Yuklash";
  };
  c.onclick = () => inp.click();
  inp.addEventListener("change", sync);
  setInterval(sync, 1200);
});
})();
