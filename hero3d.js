// 3D hero: boots after the page has loaded and gone idle, renders in a Worker via OffscreenCanvas when possible,
// runs only while the hero is on screen and the tab is visible, caps mobile/low-end devices at 30fps,
// and renders a single still frame for prefers-reduced-motion.
const cv=document.getElementById('gl'),mob=innerWidth<720,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const low=mob||(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4;
const dpr=mob?1:Math.min(devicePixelRatio,1.5),fps=low?30:0;
function start(){
  const w=cv.clientWidth,h=cv.clientHeight;let api,send;
  const opts={w,h,dpr,mob,reduced,fps};
  if(cv.transferControlToOffscreen&&window.Worker&&!/[?&]noworker/.test(location.search)){
    try{const off=cv.transferControlToOffscreen(),wk=new Worker(new URL('hero-worker.js?v=3',import.meta.url),{type:'module'});
      wk.postMessage({type:'init',canvas:off,...opts},[off]);send=m=>wk.postMessage(m);
      api={run:on=>send({type:'run',on}),resize:(w,h)=>send({type:'resize',w,h}),input:o=>send({type:'input',...o})};
      wk.onerror=e=>console.warn('3D worker failed',e.message)}catch(e){api=null}}
  if(!api){import('./scene.js?v=3').then(({createScene,makeLoop})=>{const S=createScene(cv,opts);const L=makeLoop(S,fps);
    api={run:L.run,resize:S.resize,input:S.input};wire()});return}
  wire();
  function wire(){cv.classList.add('on');
    if(reduced){api.run(true);setTimeout(()=>api.run(false),600);return}
    let vis=true,q=0,mx=0,my=0;const upd=()=>api.run(vis&&!document.hidden);
    new IntersectionObserver(([e])=>{vis=e.isIntersecting;upd()}).observe(cv);document.addEventListener('visibilitychange',upd);
    if(!mob)addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(!q)q=requestAnimationFrame(()=>{q=0;api.input({mx,my})})},{passive:true});
    // scroll depth only matters while the hero is visible
    let sq=0;addEventListener('scroll',()=>{if(!vis||sq)return;sq=requestAnimationFrame(()=>{sq=0;api.input({sy:scrollY,vh:innerHeight})})},{passive:true});
    let rq=0,lw=innerWidth;addEventListener('resize',()=>{if(mob&&innerWidth===lw)return;lw=innerWidth;clearTimeout(rq);rq=setTimeout(()=>api.resize(cv.clientWidth,cv.clientHeight),150)});upd()}
}
const idle=window.requestIdleCallback||(f=>setTimeout(f,300));
const boot=()=>setTimeout(()=>idle(start,{timeout:2000}),low?900:200);
if(document.readyState==='complete')boot();else addEventListener('load',boot);
