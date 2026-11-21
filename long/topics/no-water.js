// Long video: what if you you drink no water.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook', 'body', 'lose', 'thirst', 'day1', 'heart', 'kidney', 'skin', 'day2', 'brain', 'day3', 'survive', 'food', 'myth', 'need', 'signs', 'tips', 'doctor', 'lesson', 'close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={};ORDER.slice(0,19).forEach((n,i)=>{PC[n]=[(i%3)*2500,Math.floor(i/3)*1400]});PC.close=PC.hook;
const BGC=['#1a1230','#3a2050'];
const COL={};ORDER.slice(0,19).forEach((n,i)=>{COL[n]=[['#1a1230','#3a2050'],['#0a1a3a','#1a3a6a'],['#2a1a3a','#4a2a5a'],['#10264a','#1f4a7a']][i%4]});
const P=(k)=>{const [cx,cy]=PC[k];return R(cx,cy,panel('p_'+k,cx,cy,2200,1200,COL[k][0],COL[k][1],`<g id="d_${k}"></g>`))};
const card=(x,y,w,h,f)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="${f||'#f5f1e6'}"/>`;
const pop=(t,w,sc)=>easeOut(clamp((t-Tn(sc,w))/0.5));
const crd=(x,y,txt,u,c,w)=>{w=w||640;let ac='#2fe0a8';if(c&&/^#[0-9a-f]{6}$/i.test(c)){const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);ac=(r>140&&g<110)?'#ff5470':(b>r+40?'#4aa8ff':'#2fe0a8')}const sc=0.9+0.1*u;return `<g opacity="${u}" transform="translate(${f1(x-(1-u)*90)} ${f1(y)}) scale(${sc.toFixed(3)})"><rect x="${-w/2-8}" y="-73" width="${w+16}" height="146" rx="34" fill="${ac}" opacity=".22"/><rect x="${-w/2}" y="-65" width="${w}" height="130" rx="28" fill="#0f1a33" stroke="${ac}" stroke-width="4" stroke-opacity=".7"/><rect x="${-w/2+14}" y="-40" width="10" height="80" rx="5" fill="${ac}"/>${tx(14,17,txt,44,'#ffffff')}</g>`};
const stars=(cx,cy,n)=>{let s='';for(let i=0;i<n;i++)s+=C(cx-1000+rnd(i)*2000,cy-560+rnd(i+90)*1120,1.5+rnd(i+5)*3,'#fff',0.4+0.5*rnd(i+8));return s};
const _unused=(x,y,r,rot)=>`<clipPath id="ec${Math.round(x)}${Math.round(y)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/></clipPath><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#2d7fd3"/><g clip-path="url(#ec${Math.round(x)}${Math.round(y)})">`+[0,1,2].map(i=>{const dx=((rot*60+i*r*1.4)%(r*4.2))-r*2;return `<path d="M${f1(x+dx)} ${f1(y-r*0.3)} q${f1(r*0.3)} ${f1(-r*0.3)} ${f1(r*0.5)} ${f1(r*0.1)} q${f1(-r*0.1)} ${f1(r*0.5)} ${f1(-r*0.4)} ${f1(r*0.4)}z" fill="#4caf50"/>`}).join('')+`</g>`;
const wavesF=(cx,y,w,t,col)=>{let d=`M${cx-w} ${y}`;for(let i=0;i<=40;i++)d+=`L${cx-w+i*w*2/40} ${f1(y+Math.sin(i*0.7+t*2)*10)} `;return `<path d="${d} V${y+700} H${cx-w}z" fill="${col||'#2d7fd3'}" opacity=".85"/>`};
const house=(x,y,s)=>`<rect x="${x}" y="${y-s}" width="${s}" height="${s}" fill="#c87a4a"/><path d="M${x-10} ${y-s} L${x+s/2} ${y-s-s*0.5} L${x+s+10} ${y-s}z" fill="#8a3a2a"/>`;

const list=(sc,t,cx,cy,L,w,sz)=>{let s='';L.forEach(([wd,n,c],i)=>{const y=cy-(L.length-1)*95+i*190;s+=crd(cx,y,n,pop(t,wd,sc),c,w||1100)});return s};
const bed=(x,y)=>`<rect x="${x-260}" y="${y}" width="520" height="40" rx="10" fill="#8a5a3a"/><rect x="${x-260}" y="${y-60}" width="520" height="70" rx="26" fill="#cfe3ff"/><rect x="${x-250}" y="${y-100}" width="150" height="60" rx="26" fill="#fff"/>`;
const clock=(x,y,r,a)=>C(x,y,r,'#fff')+C(x,y,r-14,'#f5f1e6')+`<line x1="${x}" y1="${y}" x2="${f1(x+Math.sin(a)*r*0.65)}" y2="${f1(y-Math.cos(a)*r*0.65)}" stroke="#222" stroke-width="12" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${f1(x+Math.sin(a/12)*r*0.45)}" y2="${f1(y-Math.cos(a/12)*r*0.45)}" stroke="#222" stroke-width="16" stroke-linecap="round"/>`;
const face=(x,y,r,m)=>C(x,y,r,'#ffd23f')+C(x-r*0.35,y-r*0.2,r*0.1,'#222')+C(x+r*0.35,y-r*0.2,r*0.1,'#222')+(m=='sad'?`<path d="M${x-r*0.4} ${y+r*0.5} Q${x} ${y+r*0.1} ${x+r*0.4} ${y+r*0.5}" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/>`:m=='mad'?`<path d="M${x-r*0.55} ${y-r*0.45} L${x-r*0.15} ${y-r*0.3} M${x+r*0.55} ${y-r*0.45} L${x+r*0.15} ${y-r*0.3}" stroke="#222" stroke-width="12"/><path d="M${x-r*0.4} ${y+r*0.45} L${x+r*0.4} ${y+r*0.45}" stroke="#222" stroke-width="12" stroke-linecap="round"/>`:`<path d="M${x-r*0.4} ${y+r*0.3} Q${x} ${y+r*0.7} ${x+r*0.4} ${y+r*0.3}" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/>`);
const heart=(x,y,s)=>`<path transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" d="M0 60 C-120 -20 -60 -90 0 -35 C60 -90 120 -20 0 60Z" fill="#ff3b5c"/>`;



const cube=(x,y,s,r)=>`<rect x="${x-s/2}" y="${y-s/2}" width="${s}" height="${s}" rx="${s*0.1}" fill="#fff" stroke="#ddd" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`;
const cellfn={
hook(g,cx,cy,t){const u=pop(t,'three','hook');let d='';for(let i=0;i<8;i++){const a=i/8*6.283;d+=C(cx-380+Math.cos(a)*230*u,cy+Math.sin(a)*230*u,10,'#8fd3ff',0.6)}return stars(cx,cy,20)+`<g opacity="${u}"><path d="M${cx-380} ${cy-260} C${cx-120} ${cy-30} ${cx-190} ${cy+210} ${cx-380} ${cy+210} C${cx-570} ${cy+210} ${cx-640} ${cy-30} ${cx-380} ${cy-260}Z" fill="#3aa0ff" stroke="#fff" stroke-width="12"/><path d="M${cx-700} ${cy+260} L${cx-60} ${cy-300}" stroke="#ff3b3b" stroke-width="30" stroke-linecap="round"/></g>`+tx(cx+330,cy-60,'3',300,'#ffd23f')+tx(cx+330,cy+110,'DAYS',90,'#fff')+tx(cx+330,cy+200,'NO WATER',70,'#ff5470')},
body(g,cx,cy,t){return list('body',t,cx,cy,[['blood','Blood carries nutrients'],['waste','Water removes waste'],['temperature','Keeps temperature steady']],1200)},
lose(g,cx,cy,t){return list('lose',t,cx,cy,[['sweat','Sweat'],['urine','Urine'],['breathe','Every breath']],1200)},
thirst(g,cx,cy,t){return list('thirst',t,cx,cy,[['thirsty','Thirst alarm'],['dry','Dry mouth'],['darker','Darker urine']],1200)},
day1(g,cx,cy,t){return list('day1',t,cx,cy,[['headache','Headache'],['tiredness','Tiredness'],['focusing','Hard to focus']],1200)},
heart(g,cx,cy,t){return list('heart',t,cx,cy,[['thicker','Thicker blood'],['faster','Faster heartbeat'],['dizzy','Dizzy when standing']],1200)},
kidney(g,cx,cy,t){return list('kidney',t,cx,cy,[['kidneys','Kidneys save water'],['waste','Waste builds up'],['stones','Stones more likely']],1200)},
skin(g,cx,cy,t){return list('skin',t,cx,cy,[['dry','Dry skin'],['lips','Cracked lips'],['pinch','The skin pinch test']],1200)},
day2(g,cx,cy,t){return list('day2',t,cx,cy,[['weakness','Weakness'],['cramps','Muscle cramps'],['cool','Cannot cool down']],1200)},
brain(g,cx,cy,t){return list('brain',t,cx,cy,[['balance','Water and salts'],['confused','Confusion'],['faint','Fainting']],1200)},
day3(g,cx,cy,t){return list('day3',t,cx,cy,[['pressure','Very low blood pressure'],['pulse','Rapid pulse'],['emergency','Medical emergency','#ff4b4b']],1200)},
survive(g,cx,cy,t){return list('survive',t,cx,cy,[['three','About 3 days'],['heat','Hot weather: shorter'],['health','Depends on health']],1200)},
food(g,cx,cy,t){return list('food',t,cx,cy,[['weeks','Without food: weeks'],['days','Without water: days','#ff4b4b'],['first','Water comes first']],1200)},
myth(g,cx,cy,t){const L=[['eight','Exactly 8 glasses'],['tea','Only water counts'],['gulping','Gulp it all at once']];let s='';L.forEach(([w,a],i)=>{const u=pop(t,w,'myth'),x=cx-640+i*640;const ps=a.split(' ');const h=Math.ceil(ps.length/2);s+=card(x,cy-20,560,520)+tx(x,cy-70,ps.slice(0,h).join(' '),42,'#3a2c12')+tx(x,cy-10,ps.slice(h).join(' '),42,'#3a2c12')+`<g transform="translate(${x} ${cy+150})" opacity="${u}">${cross(0,0,60,'#ff4b4b',18)}</g>`});return s},
need(g,cx,cy,t){return list('need',t,cx,cy,[['litres','About 2 to 3 litres'],['summer','More in summer'],['exercise','More when exercising']],1200)},
signs(g,cx,cy,t){return list('signs',t,cx,cy,[['colour','Pale yellow is good'],['dark','Dark yellow: drink more'],['thirsty','Do not wait for thirst']],1200)},
tips(g,cx,cy,t){return list('tips',t,cx,cy,[['bottle','Keep a bottle near'],['waking','Glass after waking'],['cucumber','Water-rich foods']],1200)},
doctor(g,cx,cy,t){return list('doctor',t,cx,cy,[['vomiting','Vomiting or diarrhoea'],['babies','Babies and elders at risk'],['doctor','Talk to a doctor','#2d7fd3']],1200)},
lesson(g,cx,cy,t){return list('lesson',t,cx,cy,[['luxury','Water is the base'],['regularly','Drink regularly'],['colour','Watch urine colour']],1200)}};
function art(){let s=BG;ORDER.slice(0,19).forEach(k=>{s+=P(k)});return s}
let G={};
function init(){ORDER.slice(0,19).forEach(k=>G[k]=document.getElementById('d_'+k))}
function anim(t){ORDER.slice(0,19).forEach(k=>{const [cx,cy]=PC[k];G[k].innerHTML=cellfn[k](G[k],cx,cy,t)})}
const PILL={"hook": "3 days, no water", "body": "Your body is mostly water", "lose": "You lose water all day", "thirst": "Hours 1 to 12: thirst", "day1": "Day 1: headache and tired", "heart": "Your heart works harder", "kidney": "Your kidneys panic", "skin": "Skin and lips", "day2": "Day 2: weakness", "brain": "Your brain suffers", "day3": "Day 3: danger zone", "survive": "How long can we survive?", "food": "Water or food: which first?", "myth": "Water myths", "need": "How much do you need?", "signs": "Signs you need water", "tips": "Easy water habits", "doctor": "When to see a doctor", "lesson": "The big lesson", "close": "Thanks for watching"};
ORDER.forEach(n=>HD(n,PILL[n],(n=='myth')?'#d9232a':(n=='close'?'#2d7fd3':undefined)));
const cam=ORDER.map(n=>{const [x,y]=PC[n];return {sc:S(n),x,y,z:n=='close'?0.9:0.95}});
return {art,init,anim,cam,sfx:()=>[]};
};
