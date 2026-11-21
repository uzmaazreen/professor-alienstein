// Long video: what if you the internet shut down.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','what','first','upi','offices','travel','health','school','tv','delivery','grid','calls','markets','home','emergency','good','real','prep','lesson','close'];
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





const wifi=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${col}" stroke-width="30" stroke-linecap="round"><path d="M-170 -40 Q0 -180 170 -40"/><path d="M-110 30 Q0 -70 110 30"/><path d="M-50 100 Q0 60 50 100"/><circle cx="0" cy="150" r="14" fill="${col}"/></g>`;
const cellfn={
hook(g,cx,cy,t){const u=pop(t,'whole','hook');return stars(cx,cy,30)+wifi(cx-380,cy-20,1.4,'#4aa8ff')+`<path d="M${cx-560} ${cy-200} L${cx-200} ${cy+180}" stroke="#ff3b3b" stroke-width="30" stroke-linecap="round" stroke-dasharray="560" stroke-dashoffset="${(560*(1-u)).toFixed(0)}"/>`+tx(cx+300,cy-40,'24 HOURS',130,'#ffd23f')+tx(cx+300,cy+80,'No internet',64,'#fff')},
what(g,cx,cy,t){const N=[[-480,-120],[-300,120],[-120,-160],[80,60],[280,-120],[460,100],[-40,200],[200,-240]];let s='';const E=[[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5],[1,6],[6,3],[4,7],[2,7]];E.forEach(([a,b],i)=>{const A=N[a],B=N[b];s+=`<line x1="${cx+A[0]}" y1="${cy+A[1]}" x2="${cx+B[0]}" y2="${cy+B[1]}" stroke="rgba(120,180,255,.4)" stroke-width="6"/>`;const u=((t*0.5+i*0.13)%1);s+=C(cx+A[0]+(B[0]-A[0])*u,cy+A[1]+(B[1]-A[1])*u,10,'#ffd23f')});N.forEach(([x,y])=>{s+=C(cx+x,cy+y,22,'#4aa8ff')});return s+crd(cx,cy+330,'5 billion+ people online',pop(t,'five','what'),null,900)},
first(g,cx,cy,t){const u=clamp((t-Tn('first','minutes'))/5);let s='';for(let i=0;i<4;i++)s+=`<rect x="${cx-480+i*50}" y="${cy+100-i*40}" width="34" height="${40+i*40}" rx="8" fill="${i<4-Math.floor(u*4)?'#2fe0a8':'rgba(255,255,255,.18)'}"/>`;return s+tx(cx-390,cy+200,'No signal',42,'#ff9aa8')+crd(cx+330,cy-110,'Apps show errors',pop(t,'errors','first'),'#d9232a',800)+crd(cx+330,cy+80,'Calls and SMS may work',pop(t,'calls','first'),null,800)},
upi(g,cx,cy,t){return list('upi',t,cx,cy,[['upi','UPI, cards, net banking'],['shops','Shops ask for cash'],['atms','ATMs may stop','#d9232a'],['cash','Keep some cash','#2d7fd3']],1100)},
offices(g,cx,cy,t){return list('offices',t,cx,cy,[['emails','Emails, meetings, cloud files'],['companies','Companies send workers home'],['online','Most work needs the internet']],1300)},
travel(g,cx,cy,t){return list('travel',t,cx,cy,[['ticket','Online tickets, check in'],['maps','Maps stop working'],['special','Own special networks'],['delays','Delays likely','#d9232a']],1100)},
health(g,cx,cy,t){return list('health',t,cx,cy,[['records','Records and scans online'],['emergency','Emergency care continues','#2d7fd3'],['paper','Paper backups needed']],1200)},
school(g,cx,cy,t){return list('school',t,cx,cy,[['online','Online classes stop'],['homework','Homework portals down'],['books','Books and teachers again','#2d7fd3']],1200)},
tv(g,cx,cy,t){return list('tv',t,cx,cy,[['streaming','Streaming and reels stop','#d9232a'],['television','TV still works'],['radio','Radio still works']],1100)},
delivery(g,cx,cy,t){return list('delivery',t,cx,cy,[['food','Food and cab apps stop'],['shopping','Online shopping stops'],['local','Local shops matter again','#2d7fd3']],1200)},
grid(g,cx,cy,t){const u=pop(t,'backups','grid');return C(cx-450,cy-40,130,'#ffe27a',0.5+0.4*Math.sin(t*5)*u)+`<rect x="${cx-480}" y="${cy+80}" width="60" height="90" rx="12" fill="#9aa5b8"/>`+crd(cx+330,cy-110,'Grid uses networks',pop(t,'power','grid'),null,800)+crd(cx+330,cy+80,'Many have backups',pop(t,'backups','grid'),'#2d7fd3',800)},
calls(g,cx,cy,t){return list('calls',t,cx,cy,[['calls','Normal calls'],['sms','SMS and landlines'],['radio','Radio and TV news']],1000)},
markets(g,cx,cy,t){const u=clamp((t-Tn('markets','markets'))/6);let p='';for(let i=0;i<=24;i++){const x=cx-560+i*40;const y=cy-120+i*8*u*3+Math.sin(i*1.3)*30;p+=`${i?'L':'M'}${x} ${f1(y)}`}return `<path d="${p}" stroke="#ff5470" stroke-width="14" fill="none" stroke-linecap="round"/>`+crd(cx+480,cy-110,'Trading could stop',pop(t,'trading','markets'),'#d9232a',640)+crd(cx+480,cy+80,'Big losses in a day',pop(t,'lose','markets'),null,640)},
home(g,cx,cy,t){return list('home',t,cx,cy,[['speakers','Smart speakers'],['cameras','Cameras and locks'],['cloud','Need the cloud','#d9232a']],1000)},
emergency(g,cx,cy,t){return list('emergency',t,cx,cy,[['police','Police, fire, ambulance: backups'],['pressure','Under heavy pressure','#d9232a'],['neighbours','Neighbours matter most','#2d7fd3']],1300)},
good(g,cx,cy,t){return list('good',t,cx,cy,[['talk','Talk to family'],['outside','Go outside, read'],['sleep','Sleep better']],1000)},
real(g,cx,cy,t){return list('real',t,cx,cy,[['worldwide','Worldwide shutdown: very unlikely'],['routes','Many routes built in'],['regional','Regional outages do happen','#d9232a']],1300)},
prep(g,cx,cy,t){return list('prep',t,cx,cy,[['cash','Some cash at home'],['offline','Offline maps'],['documents','Save documents, numbers'],['power','Power bank and radio']],1200)},
lesson(g,cx,cy,t){return list('lesson',t,cx,cy,[['electricity','Like electricity today'],['notice','We notice it when gone'],['prepared','Be prepared','#2d7fd3']],1100)}};
function art(){let s=BG;ORDER.slice(0,19).forEach(k=>{s+=P(k)});return s}
let G={};
function init(){ORDER.slice(0,19).forEach(k=>G[k]=document.getElementById('d_'+k))}
function anim(t){ORDER.slice(0,19).forEach(k=>{const [cx,cy]=PC[k];G[k].innerHTML=cellfn[k](G[k],cx,cy,t)})}
const PILL={hook:'One day offline',what:'What is the internet?',first:'The first minutes',upi:'Money problems',offices:'Work and offices',travel:'Travel',health:'Hospitals',school:'Schools',tv:'Entertainment',delivery:'Delivery and shopping',grid:'Power and water',calls:'Calls are a lifeline',markets:'Markets panic',home:'Smart homes',emergency:'Emergencies',good:'The good side',real:'Could it happen?',prep:'How to prepare',lesson:'The big lesson',close:'Be prepared'};
ORDER.forEach(n=>HD(n,PILL[n],(n=='emergency')?'#d9232a':(n=='close'?'#2d7fd3':undefined)));
const cam=ORDER.map(n=>{const [x,y]=PC[n];return {sc:S(n),x,y,z:n=='close'?0.9:0.95}});
return {art,init,anim,cam,sfx:()=>[]};
};
