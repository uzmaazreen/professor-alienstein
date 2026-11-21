// Long video: what if the Moon disappeared.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','origin','pull','tides','sun','coast','dark','animals','coral','tilt','wobble','season','spin','early','drift','eclipse','calendar','myth','survive','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={};ORDER.slice(0,19).forEach((n,i)=>{PC[n]=[(i%3)*2500,Math.floor(i/3)*1400]});PC.close=PC.hook;
const COL={hook:['#0a1230','#1a2a55'],origin:['#1a1230','#3a2050'],pull:['#0f1b3a','#1f2d58'],tides:['#10264a','#1f4a7a'],sun:['#10264a','#1f4a7a'],coast:['#2a4a6a','#4a7a9a'],dark:['#050a1a','#10183a'],animals:['#1a2a47','#2a4066'],coral:['#0a3a5a','#1a6a8a'],tilt:['#0f1b3a','#1f2d58'],wobble:['#1a1230','#3a2050'],season:['#0f1b3a','#1f2d58'],spin:['#1a2a47','#2a4066'],early:['#2a2438','#43355e'],drift:['#0a1230','#1a2a55'],eclipse:['#0a0a1a','#1a1a3a'],calendar:['#1f2f4a','#2f4668'],myth:['#2d2b3a','#443f5a'],survive:['#1f3a3a','#2e5757']};
const P=(k)=>{const [cx,cy]=PC[k];return R(cx,cy,panel('p_'+k,cx,cy,2200,1200,COL[k][0],COL[k][1],`<g id="d_${k}"></g>`))};
const card=(x,y,w,h,f)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="${f||'#f5f1e6'}"/>`;
const pop=(t,w,sc)=>easeOut(clamp((t-Tn(sc,w))/0.5));
const crd=(x,y,txt,u,c,w)=>{w=w||640;let ac='#2fe0a8';if(c&&/^#[0-9a-f]{6}$/i.test(c)){const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);ac=(r>140&&g<110)?'#ff5470':(b>r+40?'#4aa8ff':'#2fe0a8')}const sc=0.9+0.1*u;return `<g opacity="${u}" transform="translate(${f1(x-(1-u)*90)} ${f1(y)}) scale(${sc.toFixed(3)})"><rect x="${-w/2-8}" y="-73" width="${w+16}" height="146" rx="34" fill="${ac}" opacity=".22"/><rect x="${-w/2}" y="-65" width="${w}" height="130" rx="28" fill="#0f1a33" stroke="${ac}" stroke-width="4" stroke-opacity=".7"/><rect x="${-w/2+14}" y="-40" width="10" height="80" rx="5" fill="${ac}"/>${tx(14,17,txt,44,'#ffffff')}</g>`};
const stars=(cx,cy,n)=>{let s='';for(let i=0;i<n;i++)s+=C(cx-1000+rnd(i)*2000,cy-560+rnd(i+90)*1120,1.5+rnd(i+5)*3,'#fff',0.4+0.5*rnd(i+8));return s};
const moon=(x,y,r,o)=>`<g opacity="${o==null?1:o}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#d9d6c8"/><circle cx="${f1(x-r*0.3)}" cy="${f1(y-r*0.25)}" r="${f1(r*0.2)}" fill="#b9b6a8"/><circle cx="${f1(x+r*0.35)}" cy="${f1(y+r*0.1)}" r="${f1(r*0.28)}" fill="#c4c1b3"/><circle cx="${f1(x-r*0.1)}" cy="${f1(y+r*0.45)}" r="${f1(r*0.15)}" fill="#b9b6a8"/></g>`;
const earth=(x,y,r)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#2d7fd3"/><path d="M${f1(x-r*0.5)} ${f1(y-r*0.3)} q${f1(r*0.3)} ${f1(-r*0.3)} ${f1(r*0.5)} ${f1(r*0.1)} q${f1(-r*0.1)} ${f1(r*0.5)} ${f1(-r*0.4)} ${f1(r*0.4)}z M${f1(x+r*0.2)} ${f1(y+r*0.3)} q${f1(r*0.4)} ${f1(-r*0.2)} ${f1(r*0.4)} ${f1(r*0.2)} q${f1(-r*0.2)} ${f1(r*0.3)} ${f1(-r*0.4)} ${f1(-r*0.1)}z" fill="#4caf50"/>`;
const cellfn={
hook(g,cx,cy,t){const gone=clamp((t-Tn('hook','gone')+0.2)/1.2);let s=stars(cx,cy,60)+moon(cx-250,cy,280,1-gone);if(gone>0&&gone<1)s+=`<circle cx="${cx-250}" cy="${cy}" r="${f1(280+gone*300)}" fill="none" stroke="#fff" stroke-width="6" opacity="${f1(1-gone)}"/>`;
 s+=crd(cx+520,cy-250,'Tides',pop(t,'tides','hook'),null,520)+crd(cx+520,cy-90,'Nights',pop(t,'nights','hook'),null,520)+crd(cx+520,cy+70,'Animals',pop(t,'animals','hook'),null,520)+crd(cx+520,cy+230,'Length of your day',pop(t,'day','hook'),null,520);return s},
origin(g,cx,cy,t){const k=easeIO(clamp(sp('origin',t)*2));const imp=clamp((t-Tn('origin','crash')+0.6)/0.6);let s=stars(cx,cy,40)+earth(cx,cy+60,260);
 if(imp<1)s+=`<circle cx="${f1(lerp(cx-900,cx-210,Math.min(1,k*1.4)))}" cy="${f1(cy-120)}" r="140" fill="#e8743a" stroke="#ffb43b" stroke-width="10"/>`+tx(cx-900+k*600,cy-330,'Mars-size planet',40,'#ffb43b');
 else{const d=imp-1;for(let i=0;i<30;i++){const a=i/30*6.283,r=300+((t*40+i*13)%200);s+=C(cx+Math.cos(a)*(300+80*Math.sin(i)),cy+60+Math.sin(a)*(300+80*Math.sin(i)),8+rnd(i)*10,'#e8743a',0.8)}
  const m=clamp((t-Tn('origin','clumped')+0.3)/1.5);s+=`<circle cx="${cx+520}" cy="${cy-150}" r="${f1(30+90*m)}" fill="#d9d6c8"/>`+tx(cx+520,cy+60,'New Moon!',44,'#fff')}
 return s},
pull(g,cx,cy,t){const gv=pop(t,'gravity','pull');let s=stars(cx,cy,50)+earth(cx-350,cy,280)+moon(cx+500,cy,70);
 for(let i=0;i<5;i++){const u=((t*0.5+i/5)%1);s+=`<path d="M${f1(cx+380-u*80)} ${cy-120+i*60} l-60 0" stroke="#ffd23f" stroke-width="10" stroke-linecap="round" opacity="${f1(gv*(1-u))}"/>`}
 s+=tx(cx+500,cy+170,'Moon = 1/4 of Earth wide',40,'#fff')+tx(cx-350,cy+390,'Earth',40,'#fff');return s},
tides(g,cx,cy,t){const a=t*0.4;let s=stars(cx,cy,30)+moon(cx+850,cy,80);
 s+=`<ellipse cx="${cx-100}" cy="${cy}" rx="440" ry="330" fill="#4aa3ff" opacity=".55"/>`+earth(cx-100,cy,280)+`<g transform="rotate(${f1(a*20)} ${cx-100} ${cy})"><rect x="${cx-110}" y="${cy-310}" width="20" height="40" fill="#fff"/></g>`;
 s+=tx(cx-100,cy-345,'Bulge facing Moon',38,'#8fd3ff')+tx(cx-100,cy+420,'Second bulge on far side',38,'#8fd3ff')+crd(cx+520,cy+280,'Tides: twice a day',pop(t,'twice','tides'),null,560);return s},
sun(g,cx,cy,t){const a=pop(t,'sun','sun'),b=pop(t,'without','sun');let s=tx(cx-760,cy-200,'Tide from Moon',44,'#cfd8e6','start')+`<rect x="${cx-200}" y="${cy-250}" width="${f1(1000*a*0.67)}" height="90" rx="45" fill="#d9d6c8"/>`+tx(cx-760,cy-30,'Tide from Sun',44,'#cfd8e6','start')+`<rect x="${cx-200}" y="${cy-80}" width="${f1(1000*a*0.33)}" height="90" rx="45" fill="#ffd23f"/>`;
 s+=`<g opacity="${b}">`+tx(cx-760,cy+150,'No Moon',44,'#ff9a8a','start')+`<rect x="${cx-200}" y="${cy+100}" width="${f1(1000*0.33)}" height="90" rx="45" fill="#ff7a8a"/></g>`+tx(cx,cy+330,'Without the Moon: about a third',50,'#fff');return s},
coast(g,cx,cy,t){const lv=0.5+0.5*Math.sin(t*0.8);const wy=cy+60-lv*160;let s=`<path d="M${cx-1000} ${cy-250} L${cx-100} ${cy+260} L${cx+1000} ${cy+300} V${cy+600} H${cx-1000}z" fill="#c8a870"/><path d="M${cx-1000} ${f1(wy)} H${cx+1000} V${cy+600} H${cx-1000}z" fill="#3a8ad8" opacity=".7"/>`;
 const r=pop(t,'rock','coast');s+=`<g opacity="${r}">`+C(cx+300,cy+270,50,'#7a7a8a')+C(cx+420,cy+290,36,'#8a8a9a')+`<ellipse cx="${cx+80}" cy="${cy+250}" rx="50" ry="30" fill="#ff7a6a"/>`+tx(cx+300,cy+160,'Rock pools',40,'#fff')+`</g>`;
 s+=crd(cx-500,cy-300,'Wet, dry, wet, dry...',1,null,640);return s},
dark(g,cx,cy,t){const w=clamp((t-Tn('dark','without')+0.3)/1.2);let s=stars(cx,cy,70)+moon(cx-400,cy-230,160,1-w)+`<circle cx="${cx-400}" cy="${cy-230}" r="${f1(260+60*Math.sin(t*2))}" fill="#fff" opacity="${f1(0.12*(1-w))}"/>`;
 s+=`<path d="M${cx-1000} ${cy+250} q300 -150 600 0 t600 0 t600 0 V${cy+600} H${cx-1000}z" fill="${w>0.5?'#05070f':'#1a2238'}"/>`+tx(cx+350,cy-100,w>0.5?'No Moon: very dark':'Full Moon light',50,w>0.5?'#ff9a8a':'#ffd23f');return s},
animals(g,cx,cy,t){const L=[['dung','Dung beetles steer by moonlight'],['sea','Sea animals follow the lunar cycle'],['hunters','Hunters and hunted change habits']];let s='';L.forEach(([w,n],i)=>{const u=pop(t,w,'animals');s+=crd(cx,cy-230+i*200,n,u,null,1300)});return s},
coral(g,cx,cy,t){const e=pop(t,'release','coral');let s=moon(cx+700,cy-330,110)+`<path d="M${cx-1000} ${cy+380} H${cx+1000} V${cy+600} H${cx-1000}z" fill="#8a5a3a"/>`;
 for(let i=0;i<9;i++){const x=cx-800+i*200;s+=`<path d="M${x} ${cy+380} q-30 -90 0 -140 q30 -40 20 -100" stroke="#ff7a8a" stroke-width="30" fill="none" stroke-linecap="round"/>`}
 for(let i=0;i<70;i++){const u=((t*0.15+rnd(i))%1);s+=C(cx-800+rnd(i+3)*1600,cy+300-u*800,6+rnd(i+6)*8,i%2?'#ffd2e0':'#fff',e*(1-u))}
 s+=tx(cx-100,cy-290,'Spawn together after full Moon',48,'#fff');return s},
tilt(g,cx,cy,t){const sw=pop(t,'twenty','tilt');let s=stars(cx,cy,30)+`<g transform="rotate(23 ${cx-250} ${cy})"><path d="M${cx-250} ${cy-400} V${cy+400}" stroke="#fff" stroke-width="8" stroke-dasharray="20 14"/>`+earth(cx-250,cy,260)+`</g>`+moon(cx+600+Math.sin(t)*20,cy-100,90)+`<g opacity="${sw}">`+tx(cx+100,cy+330,'Tilt about 23 degrees = seasons',48,'#ffd23f','start')+`</g>`;return s},
wobble(g,cx,cy,t){const w=clamp((t-Tn('wobble','without')+0.2)/1.0);const ang=w>0?23+Math.sin(t*0.9)*55*w:23;let s=stars(cx,cy,30)+`<g transform="rotate(${f1(ang)} ${cx} ${cy})"><path d="M${cx} ${cy-400} V${cy+400}" stroke="#fff" stroke-width="8" stroke-dasharray="20 14"/>`+earth(cx,cy,260)+`</g>`;
 s+=tx(cx+330,cy-60,w>0.2?'No Moon: tilt swings':'With Moon: steady',50,w>0.2?'#ff9a8a':'#6fcf4a','start')+tx(cx+330,cy+30,'(over millions of years)',38,'#cfd8e6','start');return s},
season(g,cx,cy,t){const u1=pop(t,'upright','season'),u2=pop(t,'tipped','season');let s=`<g opacity="${u1}">`+earth(cx-450,cy,200)+tx(cx-450,cy+300,'Upright: hardly any seasons',40,'#fff')+`</g><g opacity="${u2}"><g transform="rotate(80 ${cx+450} ${cy})">`+earth(cx+450,cy,200)+`</g>`+tx(cx+450,cy+300,'Tipped over: extreme seasons',40,'#fff')+`</g>`;
 s+=C(cx-950,cy,80,'#ffd23f')+tx(cx-950,cy+130,'Sun',36,'#fff');return s},
spin(g,cx,cy,t){const k=pop(t,'two','spin');let s=earth(cx-400,cy,230)+`<g transform="rotate(${f1(t*30)} ${cx-400} ${cy})"><rect x="${cx-410}" y="${cy-240}" width="20" height="50" fill="#fff"/></g>`+`<path d="M${cx-700} ${cy+320} q300 60 600 0" stroke="#4aa3ff" stroke-width="12" fill="none" stroke-dasharray="20 14"/>`+tx(cx-400,cy+400,'Tides act like a brake',40,'#8fd3ff')+`<g opacity="${k}">`+card(cx+500,cy,640,300)+tx(cx+500,cy-20,'+2 ms',100,'#d9232a')+tx(cx+500,cy+70,'longer day every century',38,'#3a2c12')+`</g>`;return s},
early(g,cx,cy,t){const a=pop(t,'hundreds','early'),b=pop(t,'young','early');let s=tx(cx-850,cy-200,'Today',44,'#fff','start')+`<rect x="${cx-450}" y="${cy-250}" width="1200" height="80" rx="40" fill="#4aa3ff"/>`+tx(cx+740,cy-190,'24 h',40,'#10131a','end')
 +`<g opacity="${a}">`+tx(cx-850,cy-40,'400M years ago',44,'#fff','start')+`<rect x="${cx-450}" y="${cy-90}" width="1100" height="80" rx="40" fill="#8fd3ff"/>`+tx(cx+640,cy-30,'~22 h',40,'#10131a','end')+`</g>`
 +`<g opacity="${b}">`+tx(cx-850,cy+120,'Young Moon',44,'#fff','start')+`<rect x="${cx-450}" y="${cy+70}" width="300" height="80" rx="40" fill="#ffd23f"/>`+tx(cx-150,cy+130,'a few hours',40,'#10131a','end')+`</g>`+tx(cx,cy+360,'Measured in old coral and shell growth',42,'#cfd8e6');return s},
drift(g,cx,cy,t){const d=((t*0.08)%1)*60;let s=stars(cx,cy,30)+earth(cx-600,cy,220)+moon(cx+250+d,cy,70)+`<path d="M${cx+250} ${cy+150} H${cx+250+d}" stroke="#ffd23f" stroke-width="10"/>`+arrowR(cx+330,cy-180,'#ffd23f',12,150);
 s+=tx(cx+150,cy+260,'3.8 cm every year',60,'#ffd23f')+crd(cx+150,cy+400,'About as fast as fingernails grow',pop(t,'fingernails','drift'),null,980);return s},
eclipse(g,cx,cy,t){const a=pop(t,'four','eclipse');let s=C(cx-700,cy-60,200,'#ffd23f')+C(cx-700,cy-60,250,'#ffd23f',0.2)+moon(cx+100,cy,40)+earth(cx+700,cy,90)+tx(cx-700,cy-330,'Sun: 400x bigger',40,'#fff')+tx(cx+100,cy+160,'Moon: 400x closer',40,'#fff');
 s+=`<g opacity="${a}">`+C(cx+100,cy-300,5,'#fff')+`</g>`+crd(cx,cy-330,'Same size in our sky = total eclipse',a,null,1100)+tx(cx,cy+300,'A lucky coincidence that will not last',44,'#ffd23f');return s},
calendar(g,cx,cy,t){let s='';const ph=pop(t,'phases','calendar');for(let i=0;i<8;i++){const x=cx-770+i*220;s+=C(x,cy,85,'#10131a')+`<path d="M${x} ${cy-85} a85 85 0 0 1 0 170 a${f1(85*Math.cos(i/8*6.283))} 85 0 0 ${i<4?0:1} 0 -170z" fill="#d9d6c8" opacity="${ph}"/>`}
 return s+tx(cx,cy-250,'Month comes from Moon',60,'#fff')+tx(cx,cy+240,'Phases counted time for farming and festivals',44,'#cfd8e6')},
myth(g,cx,cy,t){const L=[['fly','Earth flies off','into space'],['crazy','Full Moon makes','people crazy'],['far','Far side','is always dark']];let s='';L.forEach(([w,a,b],i)=>{const u=pop(t,w,'myth'),x=cx-640+i*640;s+=card(x,cy-20,560,520)+tx(x,cy-60,a,44,'#3a2c12')+tx(x,cy+10,b,44,'#3a2c12')+`<g transform="translate(${x} ${cy+150}) scale(${f1(2-u)})" opacity="${u*0.9}">${cross(0,0,90,'#ff4b4b',22)}</g>`});return s},
survive(g,cx,cy,t){const L=[['weaker','Weaker tides'],['darker','Darker nights'],['wobble','Wobblier seasons?'],['animals','Animals must adjust']];let s='';L.forEach(([w,n],i)=>{const u=pop(t,w,'survive'),y=cy-270+i*170;s+=`<g opacity="${u}" transform="translate(${f1((1-u)*-100)} 0)">${card(cx,y,1400,130)}${tx(cx,y+18,n,54,'#3a2c12')}</g>`});return s}};
function art(){let s=BG;ORDER.slice(0,19).forEach(k=>{s+=P(k)});return s}
let G={};
function init(){ORDER.slice(0,19).forEach(k=>G[k]=document.getElementById('d_'+k))}
function anim(t){ORDER.slice(0,19).forEach(k=>{const [cx,cy]=PC[k];G[k].innerHTML=cellfn[k](G[k],cx,cy,t)})}
const PILL={hook:'What if the Moon vanished?',origin:'Born in a giant crash',pull:'The Moon pulls on Earth',tides:'Ocean tides',sun:'Moon vs Sun tides',coast:'Tides shape the coast',dark:'Much darker nights',animals:'Animals use moonlight',coral:'Corals spawn by the Moon',tilt:'Earth is tilted',wobble:'Moon steadies the tilt',season:'What tilt does to seasons',spin:'Moon slows Earth',early:'Days were shorter',drift:'The Moon is leaving',eclipse:'A lucky coincidence',calendar:'Our calendar',myth:'Myths',survive:'Would we survive?',close:'Look up tonight'};
ORDER.forEach(n=>HD(n,PILL[n],(n=='myth')?'#d9232a':(n=='close'?'#2d7fd3':undefined)));
const cam=ORDER.map(n=>{const [x,y]=PC[n];return {sc:S(n),x,y,z:n=='close'?0.9:0.95}});
return {art,init,anim,cam,sfx:()=>[]};
};
