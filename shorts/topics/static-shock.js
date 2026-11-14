// Topic: static shock from door handle
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ssbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a55"/><stop offset="1" stop-color="#3b4f8a"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#ssbg)"/>
<rect x="-1200" y="330" width="1000" height="40" fill="#9b3a4a"/><rect x="-1200" y="370" width="1000" height="40" fill="#7a2a3a"/>
<rect x="300" y="-420" width="360" height="800" rx="16" fill="#8a5a30" stroke="#5a3a1a" stroke-width="8"/>
<g id="drops"></g><g id="body"></g><g id="spark"></g></svg>`}
let G={};
function init(svg){G={drops:svg.querySelector('#drops'),body:svg.querySelector('#body'),spark:svg.querySelector('#spark')}}
function anim(t){
 const humid=t<wt(1,6)?0.9:(t<wt(2,0)?0.05:0.05);
 let d='';const n=t<wt(1,6)?46:5;
 for(let i=0;i<n;i++){const x=-950+rnd(i)*1900,y=-900+rnd(i+50)*900+Math.sin(t+i)*20;d+=`<circle cx="${x}" cy="${y}" r="${8+rnd(i+9)*8}" fill="#8fd3ff" opacity="${t<wt(1,6)?0.5:0.35}"/>`}
 G.drops.innerHTML=d;
 const ch=easeOut(clamp((t-wt(2,0))/(wt(3,0)-wt(2,0))));
 const zap=t>=wt(3,9)&&t<wt(3,9)+0.5;
 const after=t>=wt(3,9)?0:ch;
 const arm=zap?150:0;
 let b=`<circle cx="-440" cy="-120" r="80" fill="#e0a77a"/><rect x="-520" y="-40" width="160" height="300" rx="50" fill="#f5f1e6"/><rect x="-510" y="250" width="60" height="120" rx="20" fill="#3b5f98"/><rect x="-430" y="250" width="60" height="120" rx="20" fill="#3b5f98"/><path d="M-360 20 L${-200+arm} 20" stroke="#e0a77a" stroke-width="40" stroke-linecap="round"/>`;
 const m=Math.round(after*18);
 for(let i=0;i<m;i++){const a=i*2.4,x=-440+Math.cos(a)*(150+(i%3)*20),y=60+Math.sin(a)*(190+(i%2)*20);b+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="22" fill="#4aa3ff" stroke="#fff" stroke-width="4"/><path d="M${x-10} ${y} h20" stroke="#fff" stroke-width="6"/>`}
 b+=`<circle cx="320" cy="20" r="26" fill="#cfd8e6" stroke="#6a7a90" stroke-width="5"/>`;
 G.body.innerHTML=b;
 let s='';if(zap){s=`<path d="M-160 20 L-100 -30 L-60 50 L0 -10 L60 40 L290 20" stroke="#ffe14d" stroke-width="16" fill="none" stroke-linejoin="round"/><circle cx="300" cy="20" r="${60+Math.random()*30}" fill="#ffe14d" opacity=".5"/>`}
 G.spark.innerHTML=s;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Winter door shock')});
H({sc:1,w:0,x:0,y:-560,html:pill('Dry air keeps charge')});
A({sc:1,w:10,x:-300,y:-700,html:lbl('Few water drops','#8fd3ff')});
H({sc:2,w:0,x:0,y:-560,html:pill('Carpet gives electrons')});
A({sc:2,w:9,x:-440,y:-340,html:lbl('Electrons (negative)','#4aa3ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('They jump at once','#d9232a')});
A({sc:3,w:14,x:60,y:-200,html:lbl('Tiny lightning','#ffe14d')});
H({sc:4,w:0,x:0,y:-560,html:pill('Humidifier + moisturise','#2d7fd3')});
H({sc:5,w:0,x:0,y:-560,html:pill('Harmless spark')});
return {art,init,anim,cam:[{sc:0,x:-100,y:0,z:0.85},{sc:1,x:-100,y:-100,z:0.8},{sc:2,x:-300,y:50,z:1.0},{sc:3,x:-80,y:20,z:1.0},{sc:4,x:-100,y:0,z:0.85},{sc:5,x:-100,y:0,z:0.85}],
 sfx:()=>[{t:wt(3,9),type:'ding'}]};
};
