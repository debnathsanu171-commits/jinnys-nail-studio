import {createScene,makeLoop} from './scene.js?v=3';
let L,S;
onmessage=({data:d})=>{if(d.type==='init'){S=createScene(d.canvas,d);L=makeLoop(S,d.fps);postMessage('ready')}
else if(d.type==='resize')S&&S.resize(d.w,d.h);else if(d.type==='input')S&&S.input(d);
else if(d.type==='run')L&&L.run(d.on)};
