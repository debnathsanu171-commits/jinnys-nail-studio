(()=>{const S=window.STUDIO,$=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN'),orig=p=>Math.round(p*(1+S.offerPct/100));
const wa='https://wa.me/'+S.whatsapp,tel='tel:+'+S.whatsapp;
$$('[data-offer]').forEach(e=>e.textContent=S.offerLabel);$$('[data-ig]').forEach(e=>e.href=S.instagram);
$$('[data-wa]').forEach(e=>e.href=wa+'?text='+encodeURIComponent("Hi Jinny! I'd like to book a nail appointment 💅"));
$$('[data-tel]').forEach(e=>{e.href=tel;if(!e.children.length)e.textContent=S.phoneDisplay});
$$('[data-hours]').forEach(e=>e.textContent=S.hours);$$('[data-area]').forEach(e=>e.textContent=S.areaLabel);
$('#mapf').src='https://www.google.com/maps?q='+encodeURIComponent(S.mapQuery)+'&output=embed';
$('#maplink').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(S.mapQuery);$('#yr').textContent=new Date().getFullYear();
// services
$('#svc').innerHTML=S.services.map(s=>`<article class="card tilt r"><span class="badge"${s.price?'':' style="background:var(--nude)"'}>${s.price?S.offerLabel:'Combo'}</span><h3>${s.name}</h3><p>${s.desc}</p>${s.price?`<div class="price"><b>${inr(s.price)}</b><s>${inr(orig(s.price))}</s></div>`:`<div class="price"><b style="font-size:2rem">Ask for price</b></div>`}<div class="dur">${s.duration}</div>${s.price?`<a href="#book" class="btn ghost" data-pick="${s.name}">Book this</a>`:`<a class="btn" target="_blank" rel="noopener" href="${wa}?text=${encodeURIComponent('Hi Jinny! নমস্কার 🙏 Could you please share a quote for the '+s.name+'? Thank you! 💅')}">Get a quote on WhatsApp</a>`}</article>`).join('')+
`<article class="card custom tilt r"><span class="badge" style="background:var(--nude)">Bespoke</span><h3>Custom Nail Art</h3><p>Chrome, French, ombré, 3D charms, hand‑painted art — bring any idea. Price varies by design.</p><div class="price"><b style="font-size:2rem">Price on design</b></div><div class="dur">Share a reference for an exact quote</div><a class="btn" target="_blank" rel="noopener" href="${wa}?text=${encodeURIComponent("Hi Jinny! নমস্কার 🙏 I'd love a quote for custom nail art. I'll share my reference design here. Thank you! 💅")}">Get a quote</a></article>`;
$('#svcsel').innerHTML='<option value="" disabled selected>Choose a service</option>'+S.services.map(s=>`<option>${s.name} – ${s.price?inr(s.price):'ask for price'}</option>`).join('')+'<option>Custom Nail Art (quote)</option>';
$('#slots').innerHTML='<option value="" disabled selected>Pick a slot</option>'+S.timeSlots.map(t=>`<option>${t}</option>`).join('');
$$('[data-pick]').forEach(a=>a.addEventListener('click',()=>{const o=[...$('#svcsel').options].find(o=>o.text.startsWith(a.dataset.pick));if(o)o.selected=true}));
const d=new Date();$('#dt').min=new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
$('#bf').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target),g=k=>(f.get(k)||'').toString().trim();
const dt=g('date')?new Date(g('date')+'T00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}):'';
const m=`✨ *New Booking Request – Jinny's Nail Studio* ✨\n\n👤 *Name:* ${g('name')}\n📞 *Phone:* ${g('phone')}\n💅 *Service:* ${g('service')}\n📅 *Date:* ${dt}\n⏰ *Time slot:* ${g('slot')}\n📝 *Notes:* ${g('notes')||'-'}\n\n🎉 ${S.offerLabel}`;
window.open(wa+'?text='+encodeURIComponent(m),'_blank');success()});

const red=matchMedia('(prefers-reduced-motion:reduce)').matches,mobile=innerWidth<720,saveData=!!(navigator.connection&&navigator.connection.saveData);
const idle=window.requestIdleCallback||(f=>setTimeout(f,200));
// one-shot "in view" helper (IntersectionObserver instead of scroll handlers)
const onView=(els,fn,opt)=>{const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){o.unobserve(x.target);fn(x.target)}}),opt||{rootMargin:'0px 0px -10% 0px'});[].concat(els).forEach(e=>e&&o.observe(e));return o};
// click-to-success on booking submit: check + small confetti burst (transform/opacity only)
function success(){const b=$('#subbtn');$('#substat').textContent='Opening WhatsApp with your booking message';b.classList.add('ok');
  if(!red){const C=['#f3dfae','#e79bb0','#d9b779','#f4c6cf','#fff'],box=document.createElement('span');box.className='confetti';
    for(let i=0;i<18;i++){const s=document.createElement('i'),a=Math.PI*2*i/18+Math.random()*.4,r=60+Math.random()*70;
      s.style.cssText=`--x:${Math.cos(a)*r}px;--y:${Math.sin(a)*r*.7-30}px;--r:${Math.random()*540-270}deg;background:${C[i%5]};animation-delay:${Math.random()*60}ms`;box.appendChild(s)}
    b.appendChild(box);setTimeout(()=>box.remove(),1300)}
  clearTimeout(success.t);success.t=setTimeout(()=>{b.classList.remove('ok');$('#substat').textContent=''},3200)}
// ---------- images ----------
const IM=window.IMGS||[];const G=Array.from({length:23},(_,i)=>String(i+1).padStart(2,'0'));
const set=(n,ext)=>`media/n${n}-s.${ext} 480w, media/n${n}-m.${ext} 800w, media/n${n}.${ext} 1100w`;
// lazy:true -> native lazy; lazy:'js' -> srcset held in data-* until we ask for it
const pic=(n,i,sz,lazy)=>{const d=IM[i]||{w:900,h:1200,q:''},js=lazy==='js',S=js?'data-srcset':'srcset';
  return `<picture><source type="image/avif" ${S}="${set(n,'avif')}" sizes="${sz}"><img class="lq" ${js?'':'loading="lazy"'} decoding="async" draggable="false" width="${d.w}" height="${d.h}" style="background-image:url(${d.q})" ${js?'data-src':'src'}="media/n${n}-m.webp" ${S}="${set(n,'webp')}" sizes="${sz}" alt="Nail design ${i+1} by Jinny's Nail Studio" onload="this.classList.add('ok')"></picture>`};
const wake=el=>{if(!el||el._w)return;el._w=1;el.querySelectorAll('[data-srcset]').forEach(s=>{s.srcset=s.dataset.srcset;s.removeAttribute('data-srcset')});const im=el.querySelector('img[data-src]');if(im){im.src=im.dataset.src;im.removeAttribute('data-src')}};
$('#cf').innerHTML=G.map((n,i)=>`<div class="cfc" data-i="${i}">${pic(n,i,'(max-width:720px) 62vw, 360px','js')}</div>`).join('');
const buildGal=()=>{if(buildGal.d)return;buildGal.d=1;const g=$('#gal');let i=0;const chunk=()=>{let h='';const end=Math.min(G.length,i+6);for(;i<end;i++)h+=`<div class="gi" data-i="${i}">${pic(G[i],i,'(max-width:720px) 45vw, 25vw',true)}</div>`;g.insertAdjacentHTML('beforeend',h);if(i<G.length)idle(chunk)};chunk()};
$('.all').addEventListener('toggle',buildGal);
// ---------- reels: poster + metadata only when near, play only while visible ----------
const V=Array.from({length:10},(_,i)=>String(i+1).padStart(2,'0'));
$('#strip').innerHTML=V.map((n,i)=>`<div class="reel" data-v="${i}"><video muted loop playsinline preload="none" data-poster="media/v${n}-p.webp" data-src="media/v${n}.mp4" aria-label="Nail reel ${i+1}"></video></div>`).join('');
const vids=$$('#strip video');
const near=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const v=x.target;near.unobserve(v);v.poster=v.dataset.poster;v.preload='metadata';v.src=v.dataset.src}),{rootMargin:'300px'});
const play=new IntersectionObserver(es=>es.forEach(x=>{const v=x.target;if(x.isIntersecting&&!red&&!saveData&&!document.hidden){if(!v.src){v.poster=v.dataset.poster;v.src=v.dataset.src}v.preload='auto';v.play().catch(()=>{})}else v.pause()}),{threshold:.6});
vids.forEach(v=>{near.observe(v);play.observe(v)});
const lb=$('#lb'),lc=$('.lbc',lb);let cur=0,mode='i';
// ---------- 3D coverflow (only the ~11 nearest cards are touched per frame) ----------
(()=>{const cards=$$('#cf .cfc'),N=cards.length,st=cards.map(()=>({v:null}));let p=0,tgt=0,drag=null,moved=0,inView=false,armed=false;
const sp=()=>innerWidth<720?52:42;
const render=()=>{const s=sp();for(let i=0;i<N;i++){const c=cards[i];let d=i-p;if(d>N/2)d-=N;if(d<-N/2)d+=N;const a=Math.abs(d),vis=a<=5;
  if(vis!==st[i].v){st[i].v=vis;c.style.visibility=vis?'visible':'hidden';c.classList.toggle('near',vis)}
  if(!vis)continue;if(a<=3&&armed)wake(c);
  c.style.transform=`translateX(${d*s}%) translateZ(${-a*140}px) rotateY(${-Math.max(-1,Math.min(1,d))*42+(-d*4)}deg) scale(${1-Math.min(a,4)*.04})`;
  c.style.zIndex=100-Math.round(a*10);c.style.opacity=a>4.5?0:1;c.style.setProperty('--dim',(Math.min(a,3)*.18).toFixed(3))}};
let lt=0,ticking=false;const tick=t=>{const dt=lt?Math.min((t-lt)/1000,.05):1/60;lt=t;p+=(tgt-p)*(1-Math.pow(.88,dt*60));render();if(Math.abs(tgt-p)>.001||drag)requestAnimationFrame(tick);else{p=tgt;render();ticking=false;lt=0}};
const kick=()=>{if(red){p=tgt;render();return}if(!ticking){ticking=true;lt=0;requestAnimationFrame(tick)}};
const go=t=>{tgt=t;kick();$('#cfn').textContent=String(((Math.round(t)%N)+N)%N+1).padStart(2,'0')+' / '+N};
const el=$('#cf');el.addEventListener('pointerdown',e=>{drag={x:e.clientX,t:tgt};moved=0;el.setPointerCapture(e.pointerId);stop();kick()});
el.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;moved=Math.abs(dx);tgt=drag.t-dx/(innerWidth<720?160:260)});
const up=e=>{if(!drag)return;drag=null;if(moved<6){const c=e.target.closest('.cfc');if(c){const i=+c.dataset.i,k=((Math.round(tgt)%N)+N)%N;if(i===k){mode='i';cur=i;show()}else{let d=i-k;if(d>N/2)d-=N;if(d<-N/2)d+=N;go(Math.round(tgt)+d)}}}else go(Math.round(tgt))};
el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
$('#cfp').onclick=()=>{stop();go(Math.round(tgt)-1)};$('#cfx').onclick=()=>{stop();go(Math.round(tgt)+1)};
el.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();stop();tgt+=e.deltaX/300;kick();clearTimeout(el._w);el._w=setTimeout(()=>go(Math.round(tgt)),120)}},{passive:false});
// autoplay only while the gallery is on screen and the tab is visible
let auto=0,user=false;const startA=()=>{if(red||user||auto||!inView||document.hidden)return;auto=setInterval(()=>go(Math.round(tgt)+1),4000)},stopA=()=>{clearInterval(auto);auto=0};
function stop(){user=true;stopA()}el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')stopA()});el.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!user)startA()});
new IntersectionObserver(([x])=>{inView=x.isIntersecting;inView?startA():stopA()},{rootMargin:'200px'}).observe(el);
document.addEventListener('visibilitychange',()=>document.hidden?stopA():startA());
// first render: images stay asleep until the gallery gets close
render();$('#cfn').textContent='01 / '+N;
new IntersectionObserver(([x],o)=>{if(x.isIntersecting){o.disconnect();armed=true;render()}},{rootMargin:'600px'}).observe(el)})();
// ---------- lightbox ----------
const show=()=>{lc.innerHTML=mode=='i'?`<picture><source type="image/avif" srcset="media/n${G[cur]}.avif"><img src="media/n${G[cur]}.webp" alt="Nail design ${cur+1}" decoding="async"></picture>`:`<video src="media/v${V[cur]}.mp4" poster="media/v${V[cur]}-p.webp" autoplay loop playsinline controls muted></video>`;lb.classList.add('on');document.documentElement.classList.add('lock')};
const hide=()=>{lb.classList.remove('on');lc.innerHTML='';document.documentElement.classList.remove('lock')};
lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))hide()};
$('#gal').addEventListener('click',e=>{const g=e.target.closest('.gi');if(g){mode='i';cur=+g.dataset.i;show()}});
$('#strip').addEventListener('click',e=>{const g=e.target.closest('.reel');if(g){mode='v';cur=+g.dataset.v;show()}});
const step=k=>{const L=mode=='i'?G.length:V.length;cur=(cur+k+L)%L;show()};
$('.pv',lb).onclick=e=>{e.stopPropagation();step(-1)};$('.nx',lb).onclick=e=>{e.stopPropagation();step(1)};
document.addEventListener('visibilitychange',()=>{if(document.hidden)$$('video').forEach(v=>v.pause())});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')hide();if(e.key=='ArrowRight')step(1);if(e.key=='ArrowLeft')step(-1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)step(dx<0?1:-1)},{passive:true});
// ---------- menu + nav ----------
const bg=$('.burger'),setMenu=o=>{document.body.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.documentElement.classList.toggle('lock',o)};
bg.addEventListener('click',()=>setMenu(!document.body.classList.contains('open')));
$$('nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
// nav background: a sentinel observer instead of a scroll listener
const sen=document.createElement('div');sen.style.cssText='position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none';document.body.prepend(sen);
new IntersectionObserver(([x])=>$('.nav').classList.toggle('s',!x.isIntersecting)).observe(sen);
// ---------- desktop-only hover: tilt + glow ----------
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fine&&!red){const c=$('#cursor');let cx=0,cy=0,cR=0;addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;if(!cR)cR=requestAnimationFrame(()=>{cR=0;c.style.transform=`translate3d(${cx-170}px,${cy-170}px,0)`})},{passive:true});
$$('.tilt').forEach(el=>{let q=0,ev,b;el.addEventListener('pointerenter',()=>b=el.getBoundingClientRect());el.addEventListener('pointermove',e=>{ev=e;if(q)return;q=requestAnimationFrame(()=>{q=0;b=b||el.getBoundingClientRect();const x=(ev.clientX-b.left)/b.width,y=(ev.clientY-b.top)/b.height;
el.style.transform=`perspective(900px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*12}deg) translateZ(0)`;el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%')})},{passive:true});
el.addEventListener('pointerleave',()=>{el.style.transform='';b=null})})}
// ---------- scroll reveals (IntersectionObserver + CSS transitions) ----------
if(red)document.documentElement.classList.add('reduced');
onView($$('.r').filter(e=>!e.closest('.hero')),e=>e.classList.add('in'),{rootMargin:'0px 0px -8% 0px'});
// marquee: pause when off-screen
new IntersectionObserver(([x])=>$('.marquee').classList.toggle('off',!x.isIntersecting)).observe($('.marquee'));
// ---------- hero word rotator ----------
(()=>{const ws=$$('.rot-pill .rw');if(ws.length<2||red)return;let i=0,t=0,vis=true;
const next=()=>{const a=ws[i];i=(i+1)%ws.length;const b=ws[i];a.classList.remove('on');a.classList.add('out');b.classList.remove('out');b.classList.add('on');setTimeout(()=>a.classList.remove('out'),700)};
const run=()=>{clearInterval(t);t=0;if(vis&&!document.hidden)t=setInterval(next,2400)};
new IntersectionObserver(([x])=>{vis=x.isIntersecting;run()}).observe($('.hero'));document.addEventListener('visibilitychange',run)})();
// ---------- count-up stats (values come from the site's own data) ----------
(()=>{const box=$('#stats');if(!box)return;const priced=S.services.filter(s=>s.price).map(s=>s.price);
const val={gal:G.length,reels:V.length,from:priced.length?Math.min(...priced):null};
$$('[data-count]',box).forEach(b=>{const k=b.dataset.k;if(k&&val[k]!=null)b.dataset.count=val[k];if(k&&val[k]==null)b.parentNode.remove();else b.textContent=(b.dataset.pre||'')+b.dataset.count});
if(red)return;const nums=$$('[data-count]',box);
onView(box,()=>nums.forEach((b,j)=>{const to=+b.dataset.count,pre=b.dataset.pre||'',t0=performance.now()+j*120,D=1400;
  const f=t=>{const k=Math.min(Math.max((t-t0)/D,0),1),e=1-Math.pow(1-k,3);b.textContent=pre+Math.round(to*e).toLocaleString('en-IN');if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.4})})();
// ---------- process line draw ----------
onView($('#proc'),e=>e.classList.add('in'),{threshold:.25});
// service worker (media cache) when idle after load
addEventListener('load',()=>idle(()=>{if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})},{timeout:3000}));
})();
