import {createScene} from './scene.js';
let S,run=false,last=0,cost;
const loop=t=>{if(!run)return;const dt=last?(t-last)/1000:1/60;last=t;const a=performance.now();S.frame(dt,cost);cost=performance.now()-a;requestAnimationFrame(loop)};
onmessage=({data:d})=>{if(d.type==='init'){S=createScene(d.canvas,d);postMessage('ready')}
else if(d.type==='resize')S&&S.resize(d.w,d.h);else if(d.type==='input')S&&S.input(d);
else if(d.type==='run'){if(d.on&&!run){run=true;last=0;requestAnimationFrame(loop)}else if(!d.on)run=false}};
