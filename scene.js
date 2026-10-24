import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';
// Shared scene: runs in a Worker (OffscreenCanvas) or on the main thread.
export function createScene(canvas,{w,h,dpr,mob,reduced}){
const R=new THREE.WebGLRenderer({canvas,antialias:!mob&&dpr<1.5,alpha:true,powerPreference:'high-performance'});
R.toneMapping=THREE.ACESFilmicToneMapping;R.outputColorSpace=THREE.SRGBColorSpace;R.shadowMap.enabled=false;
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,w/h,.1,100);cam.position.z=12;
const pm=new THREE.PMREMGenerator(R),es=new THREE.Scene();
[[0xffd9e2,5,3,4],[0xf3dfae,-5,-2,3],[0xffffff,0,6,-4],[0x8a2a63,0,-6,2]].forEach(([c,x,y,z])=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,8),new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);es.add(m)});
sc.environment=pm.fromScene(es,.04).texture;pm.dispose();
// mobile: MeshStandard (cheaper shader) tuned to look the same glossy
const glossy=c=>mob?new THREE.MeshStandardMaterial({color:c,metalness:.15,roughness:.08,envMapIntensity:1.3}):new THREE.MeshPhysicalMaterial({color:c,metalness:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.05,sheen:1,sheenColor:new THREE.Color(0xffe0ea)});
const gold=new THREE.MeshStandardMaterial({color:0xd9b779,metalness:1,roughness:.22});
const glass=mob?new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.28,roughness:.05,metalness:.1}):new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.3,roughness:.04,metalness:.1,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:1.6,depthWrite:false});
const S=mob?20:32,items=[];
function bottle(col){const g=new THREE.Group();
const body=new THREE.Mesh(new THREE.CapsuleGeometry(.62,.7,6,S),glass);body.scale.set(1,1,.8);g.add(body);
const liq=new THREE.Mesh(new THREE.CapsuleGeometry(.5,.55,6,S),glossy(col));liq.scale.set(1,1,.78);liq.position.y=-.05;g.add(liq);
const neck=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,.2,S),gold);neck.position.y=1.05;g.add(neck);
const cap=new THREE.Mesh(new THREE.CylinderGeometry(.24,.3,1.3,S),gold);cap.position.y=1.8;g.add(cap);return g}
const b1=bottle(0xc2456f);b1.position.set(mob?1.4:3.6,mob?2.6:.4,0);b1.rotation.z=-.35;items.push(b1);
const b2=bottle(0xe8cfc0);b2.scale.setScalar(.7);b2.position.set(mob?-1.6:-4,mob?-2.8:-1.4,-1);b2.rotation.z=.45;items.push(b2);
[[-2.6,2.4,-1],[2.2,-2.6,-2]].forEach(p=>{const t=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,mob?16:24,mob?48:80),gold);t.position.set(...p);items.push(t)});
items.forEach(o=>{o.userData={y:o.position.y,s:Math.random()*6,r:(Math.random()-.5)*.36};sc.add(o)});
// instanced nails (1 draw call) and pearls (1 draw call)
const cols=[0xe79bb0,0x7a1f4f,0xe8cfc0,0xc2456f],NN=mob?5:11,NP=mob?5:9,dummy=new THREE.Object3D(),col=new THREE.Color();
const nails=new THREE.InstancedMesh(new THREE.CapsuleGeometry(.32,.5,mob?4:6,mob?14:24),glossy(0xffffff),NN);
const nd=[];for(let i=0;i<NN;i++){const a=i/NN*Math.PI*2;nd.push({p:new THREE.Vector3(Math.cos(a)*(mob?2.6:5.5)+(Math.random()-.5),Math.sin(a)*(mob?3.6:3)+(Math.random()-.5),-2-Math.random()*3),r:new THREE.Euler(Math.random()*3,Math.random()*3,Math.random()*3),s:Math.random()*6,v:(Math.random()-.5)*.36});nails.setColorAt(i,col.set(cols[i%4]))}
sc.add(nails);
const pearls=new THREE.InstancedMesh(new THREE.SphereGeometry(1,mob?16:32,mob?16:32),new THREE.MeshPhysicalMaterial({color:0xfff3ee,roughness:.2,sheen:mob?0:1,iridescence:mob?0:1,clearcoat:1}),NP);
const pd=[];for(let i=0;i<NP;i++)pd.push({p:new THREE.Vector3((Math.random()-.5)*12,(Math.random()-.5)*8,-1-Math.random()*4),k:.12+Math.random()*.18,s:Math.random()*6});
sc.add(pearls);
sc.add(new THREE.AmbientLight(0xffe6ee,.5));const dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(3,5,6);sc.add(dl);
const pl=new THREE.PointLight(0xe79bb0,30,20);pl.position.set(-3,-2,4);sc.add(pl);
let W=w,H=h,pr=dpr,maxPr=dpr,mx=0,my=0,sy=0,vh=h,T=0;
const resize=(w,h)=>{W=w;H=h;R.setPixelRatio(pr);R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};resize(w,h);
// adaptive resolution: scale down before frames drop, scale back up when there is headroom
let acc=0,n=0;
function frame(dt,cost){ // dt in seconds (refresh independent); cost = last render ms
  dt=Math.min(dt,.05);T+=reduced?0:dt;
  if(cost!==undefined){acc+=cost;n++;if(n>=30){const a=acc/n;acc=n=0;if(a>4&&pr>.6){pr=Math.max(.6,pr*.85);resize(W,H)}else if(a<2&&pr<maxPr){pr=Math.min(maxPr,pr*1.08);resize(W,H)}}}
  items.forEach(o=>{const u=o.userData;o.position.y=u.y+Math.sin(T*.8+u.s)*.25;if(!reduced){o.rotation.y+=(u.r+.12)*dt;o.rotation.x+=u.r*dt}});
  nd.forEach((d,i)=>{if(!reduced){d.r.y+=(d.v+.12)*dt;d.r.x+=d.v*dt}dummy.position.set(d.p.x,d.p.y+Math.sin(T*.8+d.s)*.25,d.p.z);dummy.rotation.copy(d.r);dummy.scale.set(1,1,.28);dummy.updateMatrix();nails.setMatrixAt(i,dummy.matrix)});nails.instanceMatrix.needsUpdate=true;
  pd.forEach((d,i)=>{dummy.position.set(d.p.x,d.p.y+Math.sin(T*.8+d.s)*.25,d.p.z);dummy.rotation.set(0,0,0);dummy.scale.setScalar(d.k);dummy.updateMatrix();pearls.setMatrixAt(i,dummy.matrix)});pearls.instanceMatrix.needsUpdate=true;
  const k=1-Math.pow(.96,dt*60);cam.position.x+=(mx*1.6-cam.position.x)*k;cam.position.y+=(-my*1.2-cam.position.y)*k;cam.position.z=12+Math.min(sy/vh,1)*3;cam.lookAt(0,0,0);R.render(sc,cam)}
return {frame,resize,input(o){if('mx'in o){mx=o.mx;my=o.my}if('sy'in o){sy=o.sy;vh=o.vh}}}}

// frame loop shared by worker and main-thread fallback; optional fps cap (30 on mobile / low-end)
export function makeLoop(S,fps){let run=false,last=0,acc=0,cost,id=0;const step=fps?1/fps:0;
  const loop=t=>{if(!run)return;id=requestAnimationFrame(loop);const dt=last?(t-last)/1000:1/60;last=t;
    if(step){acc+=dt;if(acc<step*.92)return;const d=acc;acc=0;const a=performance.now();S.frame(Math.min(d,.1),cost);cost=performance.now()-a;return}
    const a=performance.now();S.frame(dt,cost);cost=performance.now()-a};
  return {run(on){if(on&&!run){run=true;last=0;acc=1;id=requestAnimationFrame(loop)}else if(!on&&run){run=false;cancelAnimationFrame(id)}}}}
