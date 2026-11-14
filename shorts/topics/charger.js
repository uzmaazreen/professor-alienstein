// Topic: how a phone charger works
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14233f"/><stop offset="1" stop-color="#2a4a7a"/></linearGradient></defs>
<rect x="-2400" y="-2600" width="4800" height="5600" fill="url(#bg)"/><g id="a"></g><g id="b"></g></svg>`}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 let a=`<rect x="-860" y="-150" width="200" height="300" rx="30" fill="#e9eef5" stroke="#9fb4cf" stroke-width="8"/><rect x="-800" y="-70" width="16" height="50" fill="#333"/><rect x="-736" y="-70" width="16" height="50" fill="#333"/><path d="M-760 40 q0 30 0 30" stroke="#333" stroke-width="10"/>`;
 a+=`<rect x="-160" y="-170" width="320" height="340" rx="40" fill="#f5f1e6" stroke="#cfc6a8" stroke-width="8"/><rect x="-100" y="-90" width="200" height="140" rx="16" fill="#1e2d4d"/><path d="M-70 -20 l30 -40 l30 70 l30 -70 l30 70 l30 -40" stroke="#6fcf4a" stroke-width="8" fill="none"/>`;
 // AC wave from socket to charger
 let w='';for(let i=0;i<=40;i++){const x=-640+i*12;w+=`${i?'L':'M'}${x} ${(Math.sin(i*0.9-t*8)*70).toFixed(1)} `}
 a+=`<path d="${w}" stroke="#ff7a8a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
 // DC line charger->phone
 a+=`<path d="M180 0 H540" stroke="#6fcf4a" stroke-width="12" stroke-linecap="round"/>`;
 for(let i=0;i<5;i++){const u=((t*0.6+i/5)%1);a+=`<circle cx="${180+u*360}" cy="0" r="12" fill="#ffe14d"/>`}
 // phone + battery
 a+=`<rect x="540" y="-300" width="320" height="600" rx="50" fill="#10131a" stroke="#cfd8e6" stroke-width="10"/><rect x="570" y="-260" width="260" height="520" rx="26" fill="#18263f"/>`;
 const k=clamp((t-wt(3,0))/(wt(3,10)-wt(3,0)));
 a+=`<rect x="600" y="-200" width="90" height="400" rx="14" fill="#8a5a30"/><rect x="710" y="-200" width="90" height="400" rx="14" fill="#cfd8e6"/>`;
 for(let i=0;i<10;i++){const p=clamp(k*1.4-(i/10)*0.4);const x=645+p*110;const y=-170+i*38;a+=`<circle cx="${x.toFixed(1)}" cy="${y}" r="14" fill="#ffd23f" stroke="#b97a0c" stroke-width="3"/>`}
 const lvl=clamp((t-wt(1,0))/(SC[4].e-wt(1,0)));const slow=t>=wt(5,0)?1:0;
 a+=`<rect x="640" y="${(200-400*Math.min(lvl,1)*0.9).toFixed(0)}" width="150" height="${(400*Math.min(lvl,1)*0.9).toFixed(0)}" fill="none"/>`;
 G.a.innerHTML=a;
 let b='';if(t>=wt(4,0)){const u=(t*1.2)%1;b=`<path d="M200 -40 H520" stroke="#8fd3ff" stroke-width="6" stroke-dasharray="14 12" opacity="${(1-u).toFixed(2)}"/><path d="M520 40 H200" stroke="#ffd23f" stroke-width="6" stroke-dasharray="14 12" opacity="${u.toFixed(2)}"/>`}
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('How chargers work')});
H({sc:1,w:0,x:0,y:-560,html:pill('Wall power = AC')});
A({sc:1,w:4,x:-440,y:-200,html:lbl('Alternating current','#ff7a8a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Charger: AC to DC','#2d7fd3')});
A({sc:2,w:7,x:0,y:260,html:lbl('Steady flow','#6fcf4a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Lithium ions move','#d9232a')});
A({sc:3,w:9,x:700,y:-400,html:lbl('Lithium ions','#ffd23f')});
H({sc:4,w:0,x:0,y:-560,html:pill('Phone and charger talk')});
H({sc:5,w:0,x:0,y:-560,html:pill('Slows near full')});
return {art,init,anim,cam:[{sc:0,x:0,y:0,z:0.62},{sc:1,x:-500,y:0,z:0.85},{sc:2,x:0,y:0,z:0.95},{sc:3,x:700,y:0,z:1.0},{sc:4,x:200,y:0,z:0.72},{sc:5,x:0,y:0,z:0.62}],sfx:()=>[]};
};
