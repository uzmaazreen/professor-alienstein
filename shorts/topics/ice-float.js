// Topic: Why does ice float? (lake cutaway + molecule close-up)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const mol=(x,y,s=1,rot=0)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle r="17" fill="#ee4b3f" stroke="#2a2033" stroke-width="3"/><circle cx="-19" cy="14" r="10" fill="#fff" stroke="#2a2033" stroke-width="3"/><circle cx="19" cy="14" r="10" fill="#fff" stroke="#2a2033" stroke-width="3"/></g>`;
const fishSVG=(c)=>`<g><ellipse rx="46" ry="22" fill="${c}" stroke="#2a2033" stroke-width="4"/><path d="M40 0 L72 -22 L72 22Z" fill="${c}" stroke="#2a2033" stroke-width="4" stroke-linejoin="round"/><circle cx="-24" cy="-5" r="5" fill="#2a2033"/><path d="M-8 -18 q14 -12 28 0" fill="none" stroke="#2a2033" stroke-width="3"/></g>`;
const FISH=[{y:190,c:'#ff9a4d',ph:0,sp:55},{y:330,c:'#ffd54a',ph:2,sp:40},{y:470,c:'#ff7a8a',ph:4,sp:65},{y:610,c:'#8bd3a5',ph:1,sp:48}];
const WX0=-520,WX1=520;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1040 2400 2800" style="position:absolute;left:-1200px;top:-1040px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb9e0"/><stop offset="1" stop-color="#cfe9f7"/></linearGradient>
 <linearGradient id="wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc4e8"/><stop offset="1" stop-color="#2a6fa8"/></linearGradient>
 <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5636"/><stop offset="1" stop-color="#4b321e"/></linearGradient>
 <clipPath id="lakeclip"><rect x="-520" y="0" width="1040" height="700"/></clipPath></defs>
 <rect x="-1200" y="-1040" width="2400" height="1040" fill="url(#sky)"/>
 <circle cx="760" cy="-420" r="90" fill="#fff6cf" opacity=".9"/>
 <path d="M-1200 -150 L-900 -420 L-520 -200 L-420 -330 L-250 -150Z" fill="#cfdde8"/><path d="M1200 -150 L900 -380 L520 -190 L420 -300 L250 -150Z" fill="#cfdde8"/>
 <path d="M-1200 -40 Q-900 -120 -520 -20 V700 H-1200Z" fill="#f4f8fb"/><path d="M1200 -40 Q900 -120 520 -20 V700 H1200Z" fill="#f4f8fb"/>
 <rect x="-1200" y="700" width="2400" height="700" fill="url(#soil)"/>
 <path d="M-520 0 V700 H520 V0Z" fill="url(#wat)"/>
 <g clip-path="url(#lakeclip)"><g id="fishg"></g><g id="bub"></g></g>
 <rect id="botice" x="-520" y="700" width="1040" height="0" fill="#e4f6ff" opacity=".93"/>
 <g id="chunks"></g>
 <rect id="topice" x="-520" y="-10" width="1040" height="0" fill="#f2fbff" stroke="#4aa3d8" stroke-width="8"/><g id="cracks" stroke="#9fd6f0" stroke-width="5" fill="none"><path d="M-380 10 l30 40 l-20 30"/><path d="M-60 0 l-25 45 l30 30"/><path d="M240 5 l30 35 l-25 35"/></g>
 <g id="panels" opacity="0">
  <rect x="-470" y="-760" width="440" height="440" rx="26" fill="#14385f" stroke="#fff" stroke-width="6"/>
  <rect id="icebox" x="30" y="-760" width="440" height="440" rx="26" fill="#14385f" stroke="#bfe9ff" stroke-width="6"/>
  <g id="mw"></g><g id="mi"></g></g>
 </svg>`}
let G={};
function init(svg){G={cr:svg.querySelector('#cracks'),fish:svg.querySelector('#fishg'),bub:svg.querySelector('#bub'),bot:svg.querySelector('#botice'),top:svg.querySelector('#topice'),chunks:svg.querySelector('#chunks'),panels:svg.querySelector('#panels'),mw:svg.querySelector('#mw'),mi:svg.querySelector('#mi'),icebox:svg.querySelector('#icebox')}}
const S4=()=>wt(4,6);               // when the "ice sinks" story starts
function state(t){
  // returns top ice thickness, bottom ice top-y
  let top=0,bot=700;
  const g=clamp((t-wt(2,0))/(wt(2,6)-wt(2,0)));
  top=90*easeOut(g);
  if(t>=SC[4].s){const k=clamp((t-SC[4].s)/1.0);top=90*(1-k)}
  if(t>=S4()){bot=700-640*easeIO(clamp((t-S4())/(SC[4].e-S4()-0.6)))}
  if(t>=SC[5].s){const k=easeIO(clamp((t-SC[5].s)/1.2));bot=700-(700-bot)*(1-k);top=90*k}
  return {top,bot}
}
function anim(t){
  const st=state(t);
  G.top.setAttribute('height',st.top);G.cr.setAttribute('opacity',clamp(st.top/90));G.bot.setAttribute('y',st.bot);G.bot.setAttribute('height',700-st.bot);
  let f='';FISH.forEach((o,i)=>{const frozen=st.bot<o.y+30;const x=Math.sin(t*0.5+o.ph)*340;const dir=Math.cos(t*0.5+o.ph)>0?1:-1;
    const y=o.y+(frozen?0:Math.sin(t*1.7+o.ph)*14);const xx=frozen?(o.ph*60-120):x;
    f+=`<g transform="translate(${xx} ${y}) scale(${-dir*(frozen?1:1)} 1)" opacity="${frozen?0.55:1}">${fishSVG(frozen?'#a9c8dc':o.c)}</g>`});
  G.fish.innerHTML=f;
  let b='';for(let i=0;i<10;i++){const ph=((t*0.2+i/10)%1);b+=`<circle cx="${-480+rnd(i)*960}" cy="${690-ph*660}" r="${3+rnd(i+4)*5}" fill="#fff" opacity="${0.35*(1-ph)}"/>`}G.bub.innerHTML=b;
  let c='';if(t>=SC[4].s&&t<SC[5].s+0.5){for(let i=0;i<8;i++){const t0=SC[4].s+i*0.35;const l=clamp((t-t0)/1.6);const y=-10+l*(st.bot-40);const x=-470+i*115;if(t>=t0)c+=`<rect x="${x}" y="${y}" width="90" height="50" rx="10" fill="#e9f8ff" stroke="#9ed4ef" stroke-width="4" transform="rotate(${l*40} ${x+45} ${y+25})" opacity="${t<SC[5].s?1:Math.max(0,1-(t-SC[5].s)*2)}"/>`}}G.chunks.innerHTML=c;
  const pk=clamp((t-(SC[1].s-0.8))/0.6)*(1-clamp((t-SC[2].s)/0.6));G.panels.setAttribute('opacity',pk);
  if(pk>0){let w='',m='';
    for(let i=0;i<12;i++){const gx=(i%4),gy=Math.floor(i/4);const x=-410+gx*95+Math.sin(t*3+i*2)*14,y=-690+gy*95+Math.cos(t*2.6+i*1.7)*14;w+=mol(x+40,y+25,1,Math.sin(t*2+i)*40)}
    for(let i=0;i<12;i++){const gx=(i%4),gy=Math.floor(i/4);const x=65+gx*118+Math.sin(t*4+i)*3,y=-715+gy*118+Math.cos(t*4+i)*3;m+=mol(x+30,y+60,1,(gx+gy)%2?30:-30)}
    G.mw.innerHTML=w;G.mi.innerHTML=m}
}
H({sc:0,w:4,x:0,y:-560,html:pill('What if ice sank?')});
A({sc:0,w:11,x:300,y:-90,html:lbl('−5°C air','#8fd3ff')});
H({sc:1,w:3,x:0,y:-560,html:pill('Water is weird')});
A({sc:1,w:8,x:-250,y:-240,html:lbl('Liquid: packed','#4aa3ff')});
A({sc:1,w:21,x:250,y:-240,html:lbl('Ice: roomy crystal','#bfe9ff')});
H({sc:1,w:30,x:0,y:-450,html:pill('Ice is ~9% lighter')});
H({sc:2,w:0,x:0,y:-560,html:pill('Ice forms a roof')});
A({sc:2,w:5,x:330,y:60,html:lbl('0°C ice','#bfe9ff')});
A({sc:2,w:15,x:230,y:620,html:lbl('4°C deep water','#4aa3ff')});
H({sc:3,w:1,x:0,y:-560,html:pill('Ice = a blanket')});
A({sc:3,w:15,x:-300,y:330,html:lbl('Fish stay alive')});
H({sc:4,w:0,x:0,y:-560,html:pill('If ice sank...')});
A({sc:4,w:12,x:0,y:300,html:lbl('Frozen solid','#ff5a4d')});
H({sc:5,w:3,x:0,y:-560,html:pill('A weird trick that saves life','#2d7fd3')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:330,z:0.85},{sc:1,x:0,y:-540,z:1.3},{sc:2,x:60,y:140,z:1.1},{sc:3,x:0,y:330,z:0.9},{sc:4,x:0,y:330,z:0.85},{sc:5,x:0,y:260,z:0.9}],
 sfx:()=>[{t:wt(4,6),type:'ding'}]};
};
