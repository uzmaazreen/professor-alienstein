// Topic: Why you can see your breath in winter
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a78b8"/><stop offset=".6" stop-color="#e9a98f"/><stop offset="1" stop-color="#f6d9b0"/></linearGradient>
 <radialGradient id="lung" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#ff7a5a" stop-opacity=".9"/><stop offset="1" stop-color="#ff7a5a" stop-opacity="0"/></radialGradient></defs>
 <rect x="-1200" y="-1300" width="2400" height="2200" fill="url(#dawn)"/>
 <path d="M-1200 300 L-800 0 L-500 220 L-150 -60 L250 240 L700 -30 L1200 260 V900 H-1200Z" fill="#7d93bd" opacity=".55"/>
 <rect x="-1200" y="420" width="2400" height="600" fill="#e8eef5"/>
 <g id="face">
  <path d="M-330 250 Q-330 -150 -90 -190 Q130 -210 190 -60 L215 -10 L170 20 L195 70 Q175 110 130 130 L90 150 L120 210 Q60 330 -40 380 L-330 380Z" fill="#f2c9a0" stroke="#2a2033" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-330 -20 Q-300 -230 -90 -240 Q110 -250 140 -110 Q40 -150 -90 -90 Q-250 -40 -330 -20Z" fill="#4a2c1b"/>
  <path d="M-340 330 Q-120 300 130 340 L150 470 L-340 470Z" fill="#7b4fd0" stroke="#2a2033" stroke-width="7"/>
  <circle cx="95" cy="-5" r="10" fill="#2a2033"/><path d="M70 -40 q20 -14 42 -4" stroke="#2a2033" stroke-width="6" fill="none"/>
  <ellipse id="mouth" cx="120" cy="115" rx="22" ry="14" fill="#7a1f2b" stroke="#2a2033" stroke-width="5"/></g>
 <ellipse id="lungs" cx="-110" cy="330" rx="180" ry="130" fill="url(#lung)" opacity="0"/>
 <g id="vap"></g></svg>`}
let G={};
function init(svg){G={vap:svg.querySelector('#vap'),lungs:svg.querySelector('#lungs'),mouth:svg.querySelector('#mouth')}}
function anim(t){
  G.lungs.setAttribute('opacity',clamp((t-wt(1,0))/0.6)*(0.55+0.25*Math.sin(t*2)));
  const cold=t<SC[4].s?1:Math.max(0,1-(t-SC[4].s)/1.2);   // last scene: warm day -> vapour stays invisible
  const mo=Math.max(0,Math.sin(t*1.6))*0.8;G.mouth.setAttribute('ry',8+mo*12);
  let s='';const N=44;
  for(let i=0;i<N;i++){const ph=((t*0.22+i/N)%1);const x=150+ph*620,y=118-ph*ph*70+Math.sin(ph*9+i)*26*ph+ (rnd(i)-.5)*24;
    const clump=clamp((ph-0.28)/0.35)*cold;
    if(t<SC[1].s-0.2)continue;
    const r=6+clump*(26+rnd(i+3)*18);
    if(clump<0.15)s+=`<g transform="translate(${x} ${y})"><circle r="6" fill="#bfe9ff" opacity=".7"/></g>`;
    else s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${0.75*(1-ph*0.5)}"/>`}
  G.vap.innerHTML=s;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Is that smoke?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Warm, wet air from lungs')});
A({sc:1,w:6,x:-60,y:130,html:lbl('37°C + water vapor','#ff5a4d')});
H({sc:2,w:0,x:0,y:-560,html:pill('Cold air squeezes vapor into droplets')});
A({sc:2,w:3,x:480,y:-40,html:lbl('0°C outside','#4aa3ff')});
A({sc:2,w:12,x:500,y:200,html:lbl('Tiny water droplets','#ffffff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Droplets bounce light = a cloud')});
H({sc:4,w:0,x:0,y:-560,html:pill('Warm day: vapor stays invisible')});
return {art,init,anim,
 cam:[{sc:0,x:180,y:100,z:0.9},{sc:1,x:-30,y:150,z:1.0},{sc:2,x:380,y:60,z:1.0},{sc:3,x:420,y:60,z:1.25},{sc:4,x:300,y:80,z:0.95}],
 sfx:()=>[]};
};
