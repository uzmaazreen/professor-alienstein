// Topic: How does a fridge work?  (2D cutaway)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,add,A,H,lbl,pill,SC}=E;

// ---- geometry of the refrigerant loop ----
const evap=[[210,-480],[70,-480],[70,-448],[210,-448],[210,-416],[70,-416],[70,-384],[210,-384],[210,-352],[70,-352],[70,-320],[210,-320]];
const suction=[[262,-320],[262,510],[200,510],[200,552]];
const compP=[[200,552],[200,600]];
const disch=[[200,600],[330,600],[400,600],[400,520]];
const cond=[];for(let r=0;r<25;r++){const y=520-r*40;const x=(r%2===0)?335:400;const px=(r%2===0)?400:335;cond.push([px,y],[x,y]);}
const capil=[[335,-440],[335,-480],[210,-480]];
const PATH=[...evap,...suction,...compP,...disch,...cond,...capil];
const CUM=[0];for(let i=1;i<PATH.length;i++)CUM.push(CUM[i-1]+Math.hypot(PATH[i][0]-PATH[i-1][0],PATH[i][1]-PATH[i-1][1]));
const LEN=CUM[CUM.length-1];
const B_E1=CUM[evap.length-1],B_S1=CUM[evap.length+suction.length-1],B_C1=CUM[evap.length+suction.length+compP.length-1],B_D1=CUM[evap.length+suction.length+compP.length+disch.length-1],B_K1=CUM[evap.length+suction.length+compP.length+disch.length+cond.length-1];
function pointAt(u){u=((u%LEN)+LEN)%LEN;let i=1;while(i<CUM.length-1&&CUM[i]<u)i++;const a=PATH[i-1],b=PATH[i];const f=(u-CUM[i-1])/((CUM[i]-CUM[i-1])||1);return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]}
function dotStyle(u){
  if(u<B_E1){const f=u/B_E1;return {c:mix('2d7fd3','cdf3ff',f),r:9+f*5}}
  if(u<B_S1)return {c:'#cdf3ff',r:14};
  if(u<B_C1){const f=(u-B_S1)/(B_C1-B_S1);return {c:mix('cdf3ff','ff3b2f',f),r:14-f*3}}
  if(u<B_D1)return {c:'#ff3b2f',r:11};
  if(u<B_K1){const f=(u-B_D1)/(B_K1-B_D1);return {c:mix('ff3b2f','ff9a4d',Math.min(1,f*1.1)),r:11-f*2}}
  const f=(u-B_K1)/(LEN-B_K1);return {c:mix('ff9a4d','2d7fd3',f*f),r:9}
}
const poly=(pts,sw,col)=>`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
const food=`<g stroke="#2a2033" stroke-width="4" stroke-linejoin="round">
 <rect x="-240" y="-215" width="70" height="105" rx="8" fill="#fff"/><rect x="-240" y="-170" width="70" height="40" fill="#4aa3ff"/><path d="M-240 -215 l20 -22 h30 l20 22" fill="#fff"/>
 <rect x="-120" y="-190" width="60" height="80" rx="10" fill="#f6e2b8"/><rect x="-124" y="-206" width="68" height="20" rx="6" fill="#e5822a"/>
 <circle cx="20" cy="-136" r="27" fill="#e5252a"/><path d="M20 -164 q8 -14 18 -14" fill="none"/>
 <path d="M95 -110 L170 -110 L95 -170Z" fill="#ffd54a"/><circle cx="125" cy="-124" r="6" fill="#e5a800"/>
 <rect x="-230" y="60" width="150" height="52" rx="10" fill="#c8f0c0"/><rect x="-230" y="48" width="150" height="16" rx="6" fill="#4caf50"/>
 <rect x="-30" y="-10" width="30" height="120" rx="12" fill="#8bd3a5"/><rect x="-26" y="-28" width="22" height="22" rx="4" fill="#d9232a"/>
 <rect x="60" y="86" width="130" height="26" rx="6" fill="#efe2c4"/><circle cx="90" cy="72" r="16" fill="#fff"/><circle cx="125" cy="72" r="16" fill="#fff"/><circle cx="160" cy="72" r="16" fill="#fff"/>
 <path d="M-210 332 q70 -90 150 0 Z" fill="#6cc46a"/><circle cx="20" cy="310" r="26" fill="#ee4b2a"/><circle cx="85" cy="316" r="22" fill="#ee4b2a"/><circle cx="140" cy="318" r="18" fill="#ffb347"/></g>`;
const shelves=[-100,120,340].map(y=>`<rect x="-280" y="${y}" width="500" height="12" fill="#bfe0f5" stroke="#8fb5cf" stroke-width="3"/>`).join('');
const fz=`<g stroke="#2a2033" stroke-width="4"><rect x="-240" y="-410" width="110" height="60" rx="8" fill="#d9f1ff"/><rect x="-240" y="-350" width="110" height="40" rx="8" fill="#b8e3ff"/><rect x="-110" y="-380" width="80" height="70" rx="8" fill="#ffd6e0"/></g>`;

function art(){return `<svg id="scn" width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e3c8"/><stop offset="1" stop-color="#dcc7a4"/></linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3f"/><stop offset="1" stop-color="#6e4526"/></linearGradient>
  <linearGradient id="cav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f5ff"/><stop offset="1" stop-color="#bfe2fa"/></linearGradient>
  <linearGradient id="room" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a3d" stop-opacity=".75"/><stop offset="1" stop-color="#ff7a3d" stop-opacity="0"/></linearGradient>
  <radialGradient id="cglow"><stop offset="0" stop-color="#ff3b2f" stop-opacity=".9"/><stop offset="1" stop-color="#ff3b2f" stop-opacity="0"/></radialGradient>
  <pattern id="foam" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#ffe8a3"/><circle cx="6" cy="6" r="2.5" fill="#f2c85b"/><circle cx="17" cy="15" r="2" fill="#f2c85b"/></pattern>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#3a2410" flood-opacity=".35"/></filter></defs>
  <rect x="-1200" y="-1300" width="2400" height="1860" fill="url(#wall)"/>
  <g stroke="#cdb48c" stroke-width="3" opacity=".5">${Array.from({length:30},(_,i)=>`<path d="M-1200 ${-1300+i*62} H1200"/>`).join('')}${Array.from({length:30},(_,i)=>`<path d="M${-1200+i*82} -1300 V560"/>`).join('')}</g>
  <rect x="-1200" y="560" width="2400" height="1000" fill="url(#floor)"/><rect x="-1200" y="556" width="2400" height="16" fill="#4a2d17"/>
  <g stroke="#5d3a1e" stroke-width="3" opacity=".6">${Array.from({length:14},(_,i)=>`<path d="M-1200 ${600+i*58} H1200"/>`).join('')}</g>
  <ellipse cx="-10" cy="650" rx="470" ry="40" fill="#2a1608" opacity=".35"/>
  <rect id="roomT" x="330" y="-1300" width="900" height="1860" fill="url(#room)" opacity="0"/>
  <rect id="wallgap" x="560" y="-420" width="40" height="980" fill="#b9a98a" stroke="#8a7a5d" stroke-width="5" opacity="0"/>
  <g filter="url(#sh)">
  <rect x="-330" y="-560" width="648" height="1200" rx="28" fill="#f4f7fa" stroke="#8f9bab" stroke-width="6"/>
  <rect x="-292" y="-548" width="592" height="1068" fill="url(#foam)"/>
  <rect x="-280" y="-500" width="500" height="970" fill="url(#cav)"/>
  <rect x="-280" y="-312" width="500" height="14" fill="#a9c6dd" stroke="#8fb5cf" stroke-width="3"/>
  <rect x="-318" y="520" width="618" height="108" rx="8" fill="#3b4252" stroke="#1d222d" stroke-width="5"/>
  <rect x="300" y="-560" width="18" height="1200" fill="#d4dae3" stroke="#8f9bab" stroke-width="4"/>
  </g>
  ${shelves}${fz}${food}
  <rect id="frost" x="60" y="-495" width="165" height="190" rx="10" fill="#fff" opacity="0"/>
  ${poly(evap,14,'#7aa9cc')}${poly(suction,12,'#c8743a')}${poly(compP,12,'#c8743a')}${poly(disch,12,'#c8743a')}${poly(cond,11,'#2b2f3a')}${poly(capil,7,'#c8743a')}
  <ellipse id="cg" cx="200" cy="585" rx="190" ry="120" fill="url(#cglow)" opacity="0"/>
  <path d="M118 636 V588 Q118 538 200 538 Q282 538 282 588 V636Z" fill="#2b303b" stroke="#0f1218" stroke-width="6"/>
  <path d="M138 628 V590 Q138 556 200 556 Q262 556 262 590 V628Z" fill="#59657a"/>
  <g id="pis"></g>
  <g id="door"><rect x="-330" y="-548" width="50" height="1018" rx="12" fill="#ffffff" stroke="#8f9bab" stroke-width="6"/><rect x="-352" y="-330" width="20" height="190" rx="9" fill="#4a5264"/><rect x="-280" y="-100" width="40" height="10" fill="#bfe0f5"/><rect x="-280" y="120" width="40" height="10" fill="#bfe0f5"/></g>
  <g id="fog"></g><g id="harr"></g><g id="hw"></g><g id="dots"></g></svg>`}

let G={};
function init(svg){G={dots:svg.querySelector('#dots'),harr:svg.querySelector('#harr'),hw:svg.querySelector('#hw'),fog:svg.querySelector('#fog'),pis:svg.querySelector('#pis'),door:svg.querySelector('#door'),cg:svg.querySelector('#cg'),roomT:svg.querySelector('#roomT'),gap:svg.querySelector('#wallgap'),frost:svg.querySelector('#frost')}}

function anim(t){
  const dv=clamp((t-(SC[1].s-0.4))/1.2);
  let s='';const N=64,spc=LEN/N;const speed=(t>wt(4,8)?260:190);
  if(dv>0)for(let i=0;i<N;i++){const u=((t*speed+i*spc)%LEN);const [x,y]=pointAt(u);const st=dotStyle(u);
    s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${st.r.toFixed(1)}" fill="${st.c}" fill-opacity=".9" stroke="#1d222d" stroke-width="3" opacity="${dv}"/>`;}
  G.dots.innerHTML=s;
  G.frost.setAttribute('opacity',0.35*clamp((t-wt(1,8))/2));
  const ha=clamp((t-wt(1,12))/0.6)*(1-clamp((t-SC[2].s)/0.5));let a='';
  if(ha>0)for(let i=0;i<5;i++){const x=-190+i*70,ph=((t*0.55+i*0.2)%1),y=60-ph*350;a+=`<path d="M${x} ${y} v34 M${x-15} ${y+14} L${x} ${y-4} L${x+15} ${y+14}" stroke="#e5252a" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${ha*(1-Math.abs(ph-.5)*.9)}"/>`}
  G.harr.innerHTML=a;
  const sq=easeIO(clamp((t-wt(2,3))/(wt(2,8)-wt(2,3))));const amp=10+sq*8;const py=592-Math.abs(Math.sin(t*(5+sq*10)))*amp;
  const hot=t>=wt(2,3)?0.3+0.7*sq:0.1;let pp=`<rect x="186" y="${py-34}" width="28" height="${72-(py-560)}" fill="#8e96a6" stroke="#0f1218" stroke-width="4"/><rect x="172" y="${py-44}" width="56" height="14" rx="4" fill="#cfd5df" stroke="#0f1218" stroke-width="4"/>`;
  for(let i=0;i<10;i++){const sp2=2+sq*5;pp+=`<circle cx="${150+((Math.sin(t*sp2+i*1.9)+1)/2)*100}" cy="${py+8+((Math.sin(t*sp2*1.3+i*2.7)+1)/2)*(618-py-16)}" r="6" fill="${mix('cdf3ff','ff3b2f',sq)}" stroke="#0f1218" stroke-width="2"/>`}
  G.pis.innerHTML=pp;
  G.cg.setAttribute('opacity',(t>=wt(2,3)&&t<wt(3,5))?hot*0.9*clamp((t-wt(2,3))/1.5):(t>=wt(3,5)?Math.max(0,.9-(t-wt(3,5))*.4):0));
  const hk=clamp((t-wt(3,5))/0.8);let w='';
  if(hk>0)for(let i=0;i<9;i++){const ph=((t*0.5+i/9)%1),y=-380+i*100,x=430+ph*420;w+=`<path d="M${x} ${y} q16 -22 32 0 t32 0 t32 0" stroke="#e5252a" stroke-width="10" fill="none" stroke-linecap="round" opacity="${hk*(1-ph)}"/>`}
  G.hw.innerHTML=w;
  G.roomT.setAttribute('opacity',clamp((t-wt(3,5))/2)*0.55*(t>=wt(4,10)?Math.max(0.35,1-(t-wt(4,10))*.3):1));
  const dk=easeIO(clamp((t-wt(5,9))/0.9));
  G.door.setAttribute('transform',`translate(${-dk*90} ${dk*30}) rotate(${-dk*6} -305 470)`);
  let f='';if(dk>0)for(let i=0;i<8;i++){const ph=((t*0.6+i/8)%1),x=-340-ph*300,y=-100+i*70+Math.sin(t*3+i)*10;f+=`<ellipse cx="${x}" cy="${y+ph*160}" rx="${50+ph*40}" ry="${26+ph*18}" fill="#bfe6ff" opacity="${0.8*dk*(1-ph)}"/>`}
  G.fog.innerHTML=f;G.gap.setAttribute('opacity',clamp((t-wt(5,3))/0.5)*(t<wt(5,9)?1:0.0)*0.9);
}

// ---- on-screen labels (word numbers match the narration in fridge.json) ----
A({sc:0,w:1,x:-130,y:90,html:lbl('4°C inside','#4aa3ff')});
A({sc:0,w:7,x:470,y:140,html:lbl('warm back','#ff5a4d')});
H({sc:0,w:5,x:0,y:-560,html:pill("Fridges don't make cold")});
H({sc:0,w:8,x:0,y:-450,html:pill('They move heat')});
H({sc:1,w:2,x:0,y:-560,html:pill('1 · Evaporation')});
A({sc:1,w:4,x:-130,y:-395,html:lbl('−18°C freezer','#4aa3ff')});
A({sc:1,w:7,x:-150,y:-215,html:lbl('Cold coil: liquid → gas','#4aa3ff')});
A({sc:1,w:14,x:-150,y:-20,html:lbl('Heat sucked out of food','#ff5a4d')});
H({sc:2,w:2,x:0,y:-560,html:pill('2 · Compression')});
A({sc:2,w:2,x:20,y:470,html:lbl('Compressor')});
A({sc:2,w:9,x:20,y:688,html:lbl('≈ 70°C','#ff5a4d','tc'),upd:(el,t)=>{const k=clamp((t-wt(2,9))/1.2);el.querySelector('#tc').textContent='≈ '+Math.round(25+45*k)+'°C'}});
H({sc:3,w:0,x:0,y:-560,html:pill('3 · Condensation')});
A({sc:3,w:1,x:520,y:-420,html:lbl('Hot coils (outside the fridge)')});
A({sc:3,w:3,x:560,y:-190,html:lbl('≈ 45°C','#ff5a4d')});
A({sc:3,w:11,x:520,y:420,html:lbl('gas → liquid','#4aa3ff')});
H({sc:4,w:0,x:0,y:-560,html:pill('4 · Expansion')});
A({sc:4,w:2,x:285,y:-560,html:lbl('Tiny tube')});
A({sc:4,w:10,x:120,y:-640,html:lbl('≈ −25°C','#4aa3ff')});
H({sc:4,w:13,x:0,y:-560,html:pill('The loop repeats, 24/7')});
H({sc:5,w:1,x:0,y:-570,html:pill('Leave a gap behind it')});
H({sc:5,w:6,x:0,y:-450,html:pill('Close the door fast')});
H({sc:5,w:14,x:0,y:-330,html:pill('A fridge is NOT an air conditioner','#d9232a')});

return {art,init,anim,
  cam:[{sc:0,x:-10,y:60,z:0.9},{sc:1,x:50,y:-270,z:1.3},{sc:2,x:190,y:540,z:1.25},{sc:3,x:380,y:30,z:0.95},{sc:4,x:290,y:-430,z:1.45},{sc:4,w:12,off:-0.2,x:20,y:0,z:0.8},{sc:5,x:-10,y:20,z:0.8}],
  sfx:()=>[{t:wt(2,3),type:'hum',d:5.5},{t:wt(4,10),type:'ding'},{t:wt(5,17),type:'ding'}]};
};
