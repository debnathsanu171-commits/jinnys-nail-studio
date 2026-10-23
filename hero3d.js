import * as THREE from 'three';
const cv=document.getElementById('gl'),mob=innerWidth<720;
const R=new THREE.WebGLRenderer({canvas:cv,antialias:!mob,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));
R.toneMapping=THREE.ACESFilmicToneMapping;R.outputColorSpace=THREE.SRGBColorSpace;
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.z=12;
// env for gloss
const pm=new THREE.PMREMGenerator(R),es=new THREE.Scene();
[[0xffd9e2,5,3,4],[0xf3dfae,-5,-2,3],[0xffffff,0,6,-4],[0x8a2a63,0,-6,2]].forEach(([c,x,y,z])=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1.5),new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);es.add(m)});
sc.environment=pm.fromScene(es,.04).texture;
const glossy=c=>new THREE.MeshPhysicalMaterial({color:c,metalness:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.05,sheen:1,sheenColor:new THREE.Color(0xffe0ea)});
const gold=new THREE.MeshPhysicalMaterial({color:0xd9b779,metalness:1,roughness:.22,clearcoat:.6});
const glass=new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:1,thickness:1.2,roughness:.05,ior:1.5,clearcoat:1});
// polish bottle
function bottle(col){const g=new THREE.Group();
const body=new THREE.Mesh(new THREE.CapsuleGeometry(.62,.7,8,32),glass);body.scale.set(1,1,.8);g.add(body);
const liq=new THREE.Mesh(new THREE.CapsuleGeometry(.5,.55,8,32),glossy(col));liq.scale.set(1,1,.78);liq.position.y=-.05;g.add(liq);
const neck=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,.2,32),gold);neck.position.y=1.05;g.add(neck);
const cap=new THREE.Mesh(new THREE.CylinderGeometry(.24,.3,1.3,32),gold);cap.position.y=1.8;g.add(cap);return g}
const items=[],cols=[0xe79bb0,0x7a1f4f,0xe8cfc0,0xc2456f];
const b1=bottle(0xc2456f);b1.position.set(mob?1.4:3.6,mob?2.6:.4,0);b1.rotation.z=-.35;items.push(b1);
const b2=bottle(0xe8cfc0);b2.scale.setScalar(.7);b2.position.set(mob?-1.6:-4,mob?-2.8:-1.4,-1);b2.rotation.z=.45;items.push(b2);
// nail shapes (almond) – flattened capsules
for(let i=0;i<(mob?6:11);i++){const m=new THREE.Mesh(new THREE.CapsuleGeometry(.32,.5,6,24),glossy(cols[i%4]));m.scale.z=.28;
const a=i/(mob?6:11)*Math.PI*2;m.position.set(Math.cos(a)*(mob?2.6:5.5)+(Math.random()-.5),Math.sin(a)*(mob?3.6:3)+(Math.random()-.5),-2-Math.random()*3);
m.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);items.push(m)}
// gold rings & pearls
[[-2.6,2.4,-1],[2.2,-2.6,-2]].forEach(p=>{const t=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,24,80),gold);t.position.set(...p);items.push(t)});
for(let i=0;i<(mob?5:9);i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.12+Math.random()*.18,32,32),new THREE.MeshPhysicalMaterial({color:0xfff3ee,roughness:.2,sheen:1,iridescence:1,clearcoat:1}));
s.position.set((Math.random()-.5)*12,(Math.random()-.5)*8,-1-Math.random()*4);items.push(s)}
items.forEach(o=>{o.userData={y:o.position.y,s:Math.random()*6,r:(Math.random()-.5)*.006};sc.add(o)});
sc.add(new THREE.AmbientLight(0xffe6ee,.5));const dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(3,5,6);sc.add(dl);
const pl=new THREE.PointLight(0xe79bb0,30,20);pl.position.set(-3,-2,4);sc.add(pl);
let mx=0,my=0,vis=true;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(cv);
const rs=()=>{const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};addEventListener('resize',rs);rs();
const red=matchMedia('(prefers-reduced-motion:reduce)').matches;const clk=new THREE.Clock();
(function loop(){requestAnimationFrame(loop);if(!vis)return;const t=clk.getElapsedTime();
items.forEach(o=>{const u=o.userData;if(!red){o.position.y=u.y+Math.sin(t*.8+u.s)*.25;o.rotation.y+=u.r+.002;o.rotation.x+=u.r}});
cam.position.x+=(mx*1.6-cam.position.x)*.04;cam.position.y+=(-my*1.2-cam.position.y)*.04;cam.position.z=12+Math.min(scrollY/innerHeight,1)*3;cam.lookAt(0,0,0);R.render(sc,cam)})();
