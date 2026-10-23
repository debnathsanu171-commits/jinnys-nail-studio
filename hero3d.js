// Boots the 3D hero after first paint. Prefers OffscreenCanvas + Worker (rendering off the main thread).
const cv=document.getElementById('gl'),mob=innerWidth<720,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const dpr=mob?1:Math.min(devicePixelRatio,1.5);
function start(){
  const w=cv.clientWidth,h=cv.clientHeight;let api,send;
  if(cv.transferControlToOffscreen&&window.Worker&&!/[?&]noworker/.test(location.search)){
    try{const off=cv.transferControlToOffscreen(),wk=new Worker(new URL('hero-worker.js',import.meta.url),{type:'module'});
      wk.postMessage({type:'init',canvas:off,w,h,dpr,mob,reduced},[off]);send=m=>wk.postMessage(m);
      api={run:on=>send({type:'run',on}),resize:(w,h)=>send({type:'resize',w,h}),input:o=>send({type:'input',...o})};
      wk.onerror=e=>console.warn('3D worker failed',e.message)}catch(e){api=null}}
  if(!api){import('./scene.js').then(({createScene})=>{const S=createScene(cv,{w,h,dpr,mob,reduced});let run=false,last=0,cost;
    const loop=t=>{if(!run)return;const dt=last?(t-last)/1000:1/60;last=t;const a=performance.now();S.frame(dt,cost);cost=performance.now()-a;requestAnimationFrame(loop)};
    api={run:on=>{if(on&&!run){run=true;last=0;requestAnimationFrame(loop)}else if(!on)run=false},resize:S.resize,input:S.input};wire()});return}
  wire();
  function wire(){let vis=true,q=0,mx=0,my=0;const upd=()=>api.run(vis&&!document.hidden);
    new IntersectionObserver(([e])=>{vis=e.isIntersecting;upd()}).observe(cv);document.addEventListener('visibilitychange',upd);
    addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(!q)q=requestAnimationFrame(()=>{q=0;api.input({mx,my})})},{passive:true});
    let sq=0;addEventListener('scroll',()=>{if(!sq)sq=requestAnimationFrame(()=>{sq=0;api.input({sy:scrollY,vh:innerHeight})})},{passive:true});
    let rq=0;addEventListener('resize',()=>{clearTimeout(rq);rq=setTimeout(()=>api.resize(cv.clientWidth,cv.clientHeight),120)});upd()}
}
const idle=window.requestIdleCallback||(f=>setTimeout(f,200));
if(document.readyState==='complete')idle(start,{timeout:1200});else addEventListener('load',()=>idle(start,{timeout:1200}));
