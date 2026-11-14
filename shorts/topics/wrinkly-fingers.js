// Topic: wrinkly fingers
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5a7a"/><stop offset="1" stop-color="#6aa8c8"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/><g id="a"></g><g id="b"></g></svg>`}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const wr=clamp((t-wt(2,0))/(wt(3,0)+2-wt(2,0)));
 const k=t<wt(2,0)?0:wr;
 let a=`<rect x="-200" y="-460" width="400" height="800" rx="200" fill="#e0a77a" stroke="#b8805a" stroke-width="10"/>`;
 const n=7;for(let i=0;i<n;i++){const y=-300+i*90;a+=`<path d="M-170 ${y} q85 ${(-70*k).toFixed(0)} 170 0 t170 0" stroke="#a8704a" stroke-width="${(4+10*k).toFixed(1)}" fill="none" opacity="${(0.15+0.85*k).toFixed(2)}" stroke-linecap="round"/>`}
 const soak=t<wt(2,0)?1:0;
 for(let i=0;i<18;i++){const u=((t*0.4+rnd(i))%1);const x=-420+rnd(i+3)*840;const y=-700+u*1200;if(!(Math.abs(x)<210&&y>-460&&y<340))a+=`<circle cx="${x}" cy="${y}" r="${9+rnd(i+7)*8}" fill="#cfeaff" opacity=".8"/>`}
 if(t>=wt(4,0)){for(let i=0;i<4;i++){const u=((t*0.6+i/4)%1);a+=`<path d="M${-120+i*80} ${-250+i*90} l${(-50*u).toFixed(0)} ${(60*u).toFixed(0)}" stroke="#5aa8ff" stroke-width="12" stroke-linecap="round" opacity="${1-u}"/>`}}
 G.a.innerHTML=a;
 let b='';if(t>=wt(4,6)){b=`<rect x="260" y="-120" width="130" height="220" rx="30" fill="#f5f1e6" stroke="#9fb4cf" stroke-width="8"/><path d="M200 -10 l60 0" stroke="#e0a77a" stroke-width="30" stroke-linecap="round"/>`}
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Wrinkly fingers')});
H({sc:1,w:0,x:0,y:-560,html:pill('Old idea: skin swells')});
H({sc:2,w:0,x:0,y:-560,html:pill('Real cause: nerves','#2d7fd3')});
A({sc:2,w:8,x:0,y:-420,html:lbl('Vessels tighten','#ff7a6a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Grooves, like rain tyres')});
H({sc:4,w:0,x:0,y:-560,html:pill('Better wet grip?','#d9232a')});
H({sc:5,w:0,x:0,y:-560,html:pill('Smart upgrade')});
return {art,init,anim,cam:[{sc:0,x:0,y:-50,z:0.85},{sc:1,x:0,y:-50,z:0.85},{sc:2,x:0,y:-50,z:0.95},{sc:3,x:0,y:-50,z:1.0},{sc:4,x:60,y:-50,z:0.95},{sc:5,x:0,y:-50,z:0.85}],sfx:()=>[]};
};
