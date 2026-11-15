(function(){
const ORIG = call;
const KEYS = {"/api/tests/list": 1, "/api/results/list": 1};
let uid = 0;
try{ uid = Telegram.WebApp.initDataUnsafe.user.id || 0; }catch(e){}
const served = {};
let refreshing = false;
const rd = p => { try{ const j = localStorage.getItem("mc:" + uid + ":" + p); return j ? JSON.parse(j) : null; }catch(e){ return null; } };
const wr = (p, v) => { try{ localStorage.setItem("mc:" + uid + ":" + p, JSON.stringify(v)); }catch(e){} };
call = async function(path, body){
  if(!KEYS[path] || !uid) return ORIG(path, body);
  if(served[path]){ const r = await ORIG(path, body); wr(path, r); return r; }
  served[path] = true;
  const c = rd(path);
  if(!c){ const r = await ORIG(path, body); wr(path, r); return r; }
  ORIG(path, body).then(fresh => {
    const changed = JSON.stringify(fresh) !== JSON.stringify(c);
    wr(path, fresh);
    if(changed && !refreshing){
      refreshing = true;
      setTimeout(() => { try{ loadTests(); }catch(e){} refreshing = false; }, 50);
    }
  }).catch(() => {});
  return c;
};
})();
