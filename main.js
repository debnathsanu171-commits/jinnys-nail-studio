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
window.open(wa+'?text='+encodeURIComponent(m),'_blank')});
// gallery
const IM=window.IMGS||[];const pic=(n,i,sz,eager)=>{const d=IM[i]||{w:900,h:1200,q:''};return `<img class="lq" ${eager?'loading="eager" fetchpriority="high"':'loading="lazy"'} decoding="async" draggable="false" width="${d.w}" height="${d.h}" style="background-image:url(${d.q})" src="media/n${n}-m.webp" srcset="media/n${n}-s.webp 480w, media/n${n}-m.webp 800w, media/n${n}.webp 1100w" sizes="${sz}" alt="Nail design ${i+1} by Jinny's Nail Studio" onload="this.classList.add('ok')">`};
const G=Array.from({length:23},(_,i)=>String(i+1).padStart(2,'0'));
$('#cf').innerHTML=G.map((n,i)=>`<div class="cfc" data-i="${i}">${pic(n,i,'(max-width:720px) 62vw, 360px',i<3||i>G.length-3)}</div>`).join('');
const buildGal=()=>{if(buildGal.d)return;buildGal.d=1;const g=$('#gal');let i=0;const chunk=dl=>{const f=document.createElement('div');let h='';const end=Math.min(G.length,i+6);for(;i<end;i++){const n=G[i];h+=`<div class=\"gi\" data-i=\"${i}\">${pic(n,i,'(max-width:720px) 45vw, 25vw',false)}</div>`}g.insertAdjacentHTML('beforeend',h);if(i<G.length)(window.requestIdleCallback||setTimeout)(chunk)};chunk()};
$('.all').addEventListener('toggle',buildGal);
const V=Array.from({length:10},(_,i)=>String(i+1).padStart(2,'0'));
$('#strip').innerHTML=V.map((n,i)=>`<div class="reel" data-v="${i}" style="background-image:url(media/v${n}.jpg)"><video muted loop playsinline preload="none" poster="media/v${n}.jpg" data-src="media/v${n}.mp4"></video></div>`).join('');
const io=new IntersectionObserver(es=>es.forEach(x=>{const v=x.target;if(x.isIntersecting){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}),{rootMargin:'100px',threshold:.15});
$$('#strip video').forEach(v=>io.observe(v));
const lb=$('#lb'),lc=$('.lbc',lb);let cur=0,mode='i';
var show;
// 3D coverflow swipe
(()=>{const cards=$$('#cf .cfc'),N=cards.length;let p=0,tgt=0,drag=null,moved=0;
const render=()=>{cards.forEach((c,i)=>{let d=i-p;if(d>N/2)d-=N;if(d<-N/2)d+=N;const a=Math.abs(d);
c.style.transform=`translateX(${d*(innerWidth<720?52:42)}%) translateZ(${-a*140}px) rotateY(${-Math.max(-1,Math.min(1,d))*42+(-d*4)}deg) scale(${1-Math.min(a,4)*.04})`;
c.style.zIndex=100-Math.round(a*10);c.style.opacity=a>4.5?0:1;c.style.visibility=a>5?'hidden':'visible';c.style.setProperty('--dim',Math.min(a,3)*.18)})};
let lt=0,ticking=false;const tick=t=>{const dt=lt?Math.min((t-lt)/1000,.05):1/60;lt=t;p+=(tgt-p)*(1-Math.pow(.88,dt*60));render();if(Math.abs(tgt-p)>.001||drag)requestAnimationFrame(tick);else{p=tgt;render();ticking=false;lt=0}};const kick=()=>{if(!ticking){ticking=true;lt=0;requestAnimationFrame(tick)}};
const go=t=>{tgt=t;kick();$('#cfn').textContent=String(((Math.round(t)%N)+N)%N+1).padStart(2,'0')+' / '+N};
const el=$('#cf');el.addEventListener('pointerdown',e=>{drag={x:e.clientX,t:tgt};moved=0;el.setPointerCapture(e.pointerId);kick()});
el.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;moved=Math.abs(dx);tgt=drag.t-dx/(innerWidth<720?160:260)});
el.addEventListener('pointerup',e=>{if(!drag)return;drag=null;if(moved<6){const c=e.target.closest('.cfc');if(c){const i=+c.dataset.i,cur=((Math.round(tgt)%N)+N)%N;if(i===cur){mode='i';cur2(i)}else{let d=i-cur;if(d>N/2)d-=N;if(d<-N/2)d+=N;go(Math.round(tgt)+d)}}}else go(Math.round(tgt))});
$('#cfp').onclick=()=>go(Math.round(tgt)-1);$('#cfx').onclick=()=>go(Math.round(tgt)+1);
el.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();tgt+=e.deltaX/300;kick();clearTimeout(el._w);el._w=setTimeout(()=>go(Math.round(tgt)),120)}},{passive:false});
let auto=setInterval(()=>go(Math.round(tgt)+1),4000);el.addEventListener('pointerenter',()=>clearInterval(auto));el.addEventListener('pointerdown',()=>clearInterval(auto));go(0)})();
function cur2(i){cur=i;show()}
// warm remaining images when idle
addEventListener('load',()=>(window.requestIdleCallback||setTimeout)(()=>{G.forEach(n=>{const i=new Image();i.decoding='async';i.src=`media/n${n}-${innerWidth<720?'s':'m'}.webp`});if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})},{timeout:2500}));
// lightbox

show=()=>{lc.innerHTML=mode=='i'?`<img src="media/n${G[cur]}.webp" alt="" decoding="async">`:`<video src="media/v${V[cur]}.mp4" autoplay loop playsinline controls muted></video>`;lb.classList.add('on')};
$('#gal').addEventListener('click',e=>{const g=e.target.closest('.gi');if(g){mode='i';cur=+g.dataset.i;show()}});
$('#strip').addEventListener('click',e=>{const g=e.target.closest('.reel');if(g){mode='v';cur=+g.dataset.v;show()}});
const step=k=>{const L=mode=='i'?G.length:V.length;cur=(cur+k+L)%L;show()};
$('.pv',lb).onclick=e=>{e.stopPropagation();step(-1)};$('.nx',lb).onclick=e=>{e.stopPropagation();step(1)};
document.addEventListener('visibilitychange',()=>{if(document.hidden)$$('video').forEach(v=>v.pause())});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')lb.classList.remove('on');if(e.key=='ArrowRight')step(1);if(e.key=='ArrowLeft')step(-1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX);lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)step(dx<0?1:-1)});
const bg=$('.burger'),setMenu=o=>{document.body.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.documentElement.style.overflow=o?'hidden':'';if(window.lenis)o?lenis.stop():lenis.start()};
bg.addEventListener('click',()=>setMenu(!document.body.classList.contains('open')));
$$('nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
let sT=0;addEventListener('scroll',()=>{if(sT)return;sT=requestAnimationFrame(()=>{sT=0;$('.nav').classList.toggle('s',scrollY>40)})},{passive:true});
// tilt + glow
const fine=matchMedia('(hover:hover)').matches,red=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(fine&&!red){const c=$('#cursor');let cx=0,cy=0,cR=0;addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;if(!cR)cR=requestAnimationFrame(()=>{cR=0;c.style.transform=`translate3d(${cx-170}px,${cy-170}px,0)`})},{passive:true});
$$('.tilt').forEach(el=>{let q=0,ev;el.addEventListener('pointermove',e=>{ev=e;if(q)return;q=requestAnimationFrame(()=>{q=0;const b=el.getBoundingClientRect(),x=(ev.clientX-b.left)/b.width,y=(ev.clientY-b.top)/b.height;
el.style.transform=`perspective(900px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*12}deg) translateZ(0)`;el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%')})},{passive:true});
el.addEventListener('pointerleave',()=>el.style.transform='')})}
// GSAP
const go=()=>{if(!window.gsap||red){document.body.classList.add('reduced');return}gsap.registerPlugin(ScrollTrigger);
if(window.Lenis){const lenis=new Lenis({duration:1.15,smoothWheel:true,syncTouch:false});window.lenis=lenis;lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=a.getAttribute('href');if(t.length>1&&$(t)){e.preventDefault();setTimeout(()=>lenis.scrollTo(t,{offset:-60}),0)}}));
const lbo=new MutationObserver(()=>$('#lb').classList.contains('on')?lenis.stop():lenis.start());lbo.observe($('#lb'),{attributes:true})}

$$('.r').filter(e=>!e.closest('.hero')).forEach(e=>gsap.to(e,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 90%'}}));
gsap.to('.p1',{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.about',scrub:true}});gsap.fromTo('.p2',{yPercent:15},{yPercent:-15,ease:'none',scrollTrigger:{trigger:'.about',scrub:true}});
gsap.to('.hero-in',{yPercent:30,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.fromTo('.strip',{x:80},{x:-40,ease:'none',scrollTrigger:{trigger:'.reels',scrub:true}})};
window.gsap?go():addEventListener('load',go);setTimeout(()=>{if(!window.gsap)document.body.classList.add('reduced')},4000)})();
