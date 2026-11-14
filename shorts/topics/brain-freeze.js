// Topic: brain freeze
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b3a6a"/><stop offset="1" stop-color="#3a6aa8"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/><g id="a"></g><g id="b"></g></svg>`}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const c=clamp((t-wt(2,0))/1.2),o=clamp((t-wt(2,10))/1.2);
 const w=lerp=>0;
 const th=t<wt(2,0)?34:(t<wt(2,10)?34-22*c:12+22*o);
 let a=`<path d="M-420 80 Q0 -120 420 80 L420 330 Q0 400 -420 330z" fill="#e8908a"/><path d="M-420 80 Q0 -120 420 80" stroke="#c55a6a" stroke-width="40" fill="none"/>`;
 a+=`<path d="M-350 30 Q0 -150 350 30" stroke="#ff4b4b" stroke-width="${th.toFixed(1)}" fill="none" stroke-linecap="round"/>`;
 a+=`<path d="M-350 100 L-350 330 M350 100 L350 330" stroke="#ffe14d" stroke-width="6" opacity=".7"/>`;
 const sc=t>=wt(1,0)?1:0;const ic=clamp((t-wt(1,0)+0.5)/1.0);
 a+=`<g transform="translate(0 ${(-300-(1-ic)*400).toFixed(0)})"><path d="M-70 40 L0 200 L70 40z" fill="#e8b878"/><circle cx="0" cy="0" r="90" fill="#f7a8c4"/><circle cx="-30" cy="-60" r="45" fill="#f7a8c4"/></g>`;
 for(let i=0;i<14;i++){const u=((t*0.5+i/14)%1);a+=`<circle cx="${-300+rnd(i)*600}" cy="${-120+u*60}" r="8" fill="#cfeaff" opacity="${(sc*(1-u)).toFixed(2)}"/>`}
 G.a.innerHTML=a;
 const p=clamp((t-wt(3,0))/0.8)*(t<wt(4,0)?1:0);
 let b='';if(p>0){let ss='';for(let i=0;i<8;i++){const an=i/8*6.283;ss+=`<path d="M${Math.cos(an)*60} ${Math.sin(an)*60} L${Math.cos(an)*(110+Math.sin(t*14+i)*20)} ${Math.sin(an)*(110+Math.sin(t*14+i)*20)}" stroke="#ffe14d" stroke-width="14" stroke-linecap="round"/>`}b=`<g transform="translate(0 -600)" opacity="${p}">${ss}<circle r="40" fill="#ff4b4b"/></g>`}
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Brain freeze')});
H({sc:1,w:0,x:0,y:-560,html:pill('Roof of mouth is sensitive')});
A({sc:1,w:11,x:0,y:260,html:lbl('Blood vessel','#ff7a6a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Shrinks, then opens','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Brain feels pain in head')});
H({sc:4,w:0,x:0,y:-560,html:pill('Warm it with your tongue','#2d7fd3')});
H({sc:5,w:0,x:0,y:-560,html:pill('Eat slowly')});
return {art,init,anim,cam:[{sc:0,x:0,y:-50,z:0.85},{sc:1,x:0,y:50,z:0.95},{sc:2,x:0,y:50,z:1.05},{sc:3,x:0,y:-150,z:0.9},{sc:4,x:0,y:50,z:0.95},{sc:5,x:0,y:-50,z:0.85}],sfx:()=>[]};
};
