// Topic: How freezing preserves food (germs go to sleep)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const G0=[{x:-150,y:-160,ph:0},{x:60,y:-220,ph:1.4},{x:160,y:-30,ph:2.8},{x:-90,y:70,ph:4.1},{x:90,y:170,ph:5.3},{x:-190,y:210,ph:2.1}];
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="kit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset="1" stop-color="#d3dce6"/></linearGradient>
 <clipPath id="box"><rect x="-300" y="-330" width="600" height="700" rx="30"/></clipPath></defs>
 <rect id="bgk" x="-1200" y="-1300" width="2400" height="2200" fill="url(#kit)"/>
 <rect id="frostbg" x="-1200" y="-1300" width="2400" height="2200" fill="#bfe6ff" opacity="0"/>
 <rect x="-320" y="-350" width="640" height="740" rx="40" fill="#fff" stroke="#8f9bab" stroke-width="10"/>
 <g clip-path="url(#box)"><rect x="-300" y="-330" width="600" height="700" fill="#e7a35e"/><g id="food"></g><g id="germs"></g><g id="ice"></g></g>
 <g id="gauge" opacity="0"><rect x="400" y="-330" width="70" height="560" rx="35" fill="#fff" stroke="#2a2033" stroke-width="6"/><rect id="mer" x="418" y="150" width="34" height="0" rx="17" fill="#4aa3ff"/><circle cx="435" cy="170" r="48" fill="#4aa3ff" stroke="#2a2033" stroke-width="6"/></g>
 <g id="zz"></g></svg>`}
let G={};
function init(svg){G={food:svg.querySelector('#food'),germs:svg.querySelector('#germs'),ice:svg.querySelector('#ice'),frost:svg.querySelector('#frostbg'),gauge:svg.querySelector('#gauge'),mer:svg.querySelector('#mer'),zz:svg.querySelector('#zz')}}
function anim(t){
  const fr=clamp((t-wt(2,0))/(SC[2].e-wt(2,0)-0.6));                 // 0 -> 1 frozen
  const th=clamp((t-wt(3,0))/2.5)*(t<SC[4].s?1:0);                  // thaw in scene 3
  const cold=t>=SC[4].s?1:Math.max(fr*(1-th),0);
  G.frost.setAttribute('opacity',0.55*cold);
  let f='';for(let i=0;i<14;i++){const x=-260+(i%5)*115,y=-290+Math.floor(i/5)*150;f+=`<rect x="${x}" y="${y}" width="96" height="70" rx="16" fill="${mix('d9822b','ffb86b',rnd(i))}" stroke="#7a4a14" stroke-width="4"/>`}G.food.innerHTML=f;
  // germs: active when warm, sleeping when cold
  let g='',z='';const spoil=clamp((t-wt(1,0))/(SC[1].e-wt(1,0)));
  G0.forEach((o,i)=>{const act=1-cold;const x=o.x+Math.sin(t*(1+act*2)+o.ph)*60*act,y=o.y+Math.cos(t*(1+act*1.5)+o.ph)*50*act;
    const sc=1.9*(1+0.25*spoil*act);const col=mix('7ccf6a','a9c8e0',cold);
    g+=`<g transform="translate(${x} ${y}) rotate(${Math.sin(t*2*act+i)*20}) scale(${sc})"><rect x="-34" y="-20" width="68" height="40" rx="20" fill="${col}" stroke="#2a2033" stroke-width="4"/><path d="M34 0 q22 -12 30 6 M-34 0 q-22 12 -30 -6" stroke="#2a2033" stroke-width="4" fill="none"/>${cold>0.6?'<path d="M-20 -2 q8 8 16 0 M4 -2 q8 8 16 0" stroke="#2a2033" stroke-width="4" fill="none"/>':'<circle cx="-10" cy="-4" r="4" fill="#2a2033"/><circle cx="10" cy="-4" r="4" fill="#2a2033"/>'}</g>`;
    if(cold>0.6)z+=`<text x="${x+30}" y="${y-60-((t*30+i*20)%60)}" font-family="Poppins" font-weight="800" font-size="46" fill="#fff" stroke="#2d7fd3" stroke-width="3" opacity=".9">z</text>`});
  G.germs.innerHTML=g;G.zz.innerHTML=`<g transform="translate(0 0)">${z}</g>`;
  // ice crystals on the food
  let ic='';for(let i=0;i<30;i++){if(rnd(i)<cold)ic+=`<path d="M${-280+rnd(i+3)*560} ${-310+rnd(i+8)*660} l14 -22 l14 22 l-14 22z" fill="#e8f7ff" stroke="#8fd3ff" stroke-width="3" opacity=".9"/>`}G.ice.innerHTML=ic;
  const gk=clamp((t-wt(2,0)+0.3)/0.5)*(1-clamp((t-SC[4].s)/0.5));G.gauge.setAttribute('opacity',gk);
  const T=t<SC[3].s?(20-38*cold):(-18+38*th);G.mer.setAttribute('y',150-480*clamp((T+25)/60));G.mer.setAttribute('height',480*clamp((T+25)/60)+10);
}
H({sc:0,w:4,x:0,y:-560,html:pill('Months vs days?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Germs eat and multiply')});
A({sc:1,w:9,x:0,y:-440,html:lbl('Need warmth + liquid water','#7ccf6a')});
H({sc:2,w:0,x:0,y:-560,html:pill('−18°C: germs fall asleep')});
A({sc:2,w:11,x:330,y:-440,html:lbl('Water → ice','#bfe9ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Thaw it, they wake up')});
A({sc:3,w:9,x:0,y:-440,html:lbl('Thaw in the fridge','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Cold pauses germs, it doesn\'t kill them','#2d7fd3')});
return {art,init,anim,
 cam:[{sc:0,x:60,y:0,z:0.85},{sc:1,x:0,y:-20,z:1.0},{sc:2,x:60,y:-20,z:1.0},{sc:3,x:60,y:-20,z:1.0},{sc:4,x:60,y:0,z:0.85}],
 sfx:()=>[]};
};
