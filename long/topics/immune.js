// Long video: how the immune system works.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','walls','alarm','eater','fever','adaptive','antibody','memory','vaccine','cold','flu','allergy','auto','gut','habits','stress','antib','clean','myth','magic','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={};ORDER.slice(0,20).forEach((n,i)=>{PC[n]=[(i%3)*2500,Math.floor(i/3)*1400]});PC.close=PC.hook;
const COL={hook:['#1a2a47','#2a4066'],walls:['#1f3052','#2d4574'],alarm:['#3a2430','#55354a'],eater:['#1a2a47','#2a4066'],fever:['#3a2a24','#5a3a30'],adaptive:['#1f2f4a','#2f4668'],antibody:['#17233d','#26385c'],memory:['#1f3a3a','#2e5757'],vaccine:['#1f3052','#2d4574'],cold:['#2a3a4a','#3d5568'],flu:['#2a2438','#43355e'],allergy:['#3a3a24','#5a5a30'],auto:['#3a2430','#55354a'],gut:['#1f3a3a','#2e5757'],habits:['#1f3a3a','#2e5757'],stress:['#2d2b3a','#443f5a'],antib:['#1f2f4a','#2f4668'],clean:['#1f3052','#2d4574'],myth:['#2d2b3a','#443f5a'],magic:['#2d2b3a','#443f5a']};
const P=(k)=>{const [cx,cy]=PC[k];return R(cx,cy,panel('p_'+k,cx,cy,2200,1200,COL[k][0],COL[k][1],`<g id="d_${k}"></g>`))};
const card=(x,y,w,h,f)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="${f||'#f5f1e6'}"/>`;
const germ=(x,y,r,col,t)=>{let s=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1((t||0)*20)})">`;for(let i=0;i<10;i++){const a=i/10*6.283;s+=`<path d="M${f1(Math.cos(a)*r)} ${f1(Math.sin(a)*r)} L${f1(Math.cos(a)*r*1.5)} ${f1(Math.sin(a)*r*1.5)}" stroke="${col}" stroke-width="${f1(r*0.22)}" stroke-linecap="round"/>`}return s+`<circle r="${r}" fill="${col}"/><circle cx="${f1(-r*0.3)}" cy="${f1(-r*0.2)}" r="${f1(r*0.14)}" fill="#fff"/><circle cx="${f1(r*0.3)}" cy="${f1(-r*0.2)}" r="${f1(r*0.14)}" fill="#fff"/></g>`};
const wbc=(x,y,r,col)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col||'#f5f1e6'}" stroke="#9fb4cf" stroke-width="6"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*0.45)}" fill="#8a6ad0"/>`;
const yab=(x,y,s,col)=>`<path d="M${x} ${y+s} V${y} M${x} ${y} L${x-s*0.7} ${y-s*0.8} M${x} ${y} L${x+s*0.7} ${y-s*0.8}" stroke="${col}" stroke-width="${f1(s*0.18)}" stroke-linecap="round" fill="none"/>`;
const pop=(t,w,sc)=>easeOut(clamp((t-Tn(sc,w))/0.5));
const crd=(x,y,txt,u,c)=>`<g opacity="${u}" transform="translate(${f1(x)} ${f1(y+(1-u)*40)})">${card(0,0,640,130)}${tx(0,17,txt,44,c||'#3a2c12')}</g>`;
const bar=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${f}"/>`;
const cellfn={
hook(g,cx,cy,t){let s=`<circle cx="${cx}" cy="${cy}" r="330" fill="none" stroke="#6fcf4a" stroke-width="14" stroke-dasharray="40 20" transform="rotate(${f1(t*10)} ${cx} ${cy})" opacity=".8"/>`+C(cx,cy-190,60,'#e0a77a')+`<rect x="${cx-70}" y="${cy-120}" width="140" height="220" rx="50" fill="#f5f1e6"/><rect x="${cx-70}" y="${cy+90}" width="60" height="150" rx="25" fill="#3b5f98"/><rect x="${cx+10}" y="${cy+90}" width="60" height="150" rx="25" fill="#3b5f98"/>`;
 for(let i=0;i<9;i++){const a=i/9*6.283+rnd(i)*2,u=((t*0.18+rnd(i+3))%1),r=lerp(900,380,Math.min(u*1.4,1)),b=u>0.72?(u-0.72)*3.5:0;s+=germ(cx+Math.cos(a)*(r+b*300),cy+Math.sin(a)*(r+b*300)*0.75,36,['#ff7a8a','#ffb43b','#c18cff'][i%3],t+i)}return s},
walls(g,cx,cy,t){let s=`<rect x="${cx-120}" y="${cy-380}" width="110" height="760" fill="#b5653a"/>`;for(let r=0;r<10;r++)s+=`<path d="M${cx-120} ${cy-380+r*76} h110" stroke="#7a3c20" stroke-width="5"/>`;
 for(let i=0;i<7;i++){const u=((t*0.25+i/7)%1),x=cx-900+u*730;s+=germ(x,cy-300+i*100,34,'#ff7a8a',t+i)}
 s+=crd(cx+500,cy-300,'Skin',pop(t,'skin','walls'))+crd(cx+500,cy-120,'Mucus in nose',pop(t,'mucus','walls'))+crd(cx+500,cy+60,'Tears and saliva',pop(t,'tears','walls'))+crd(cx+500,cy+240,'Stomach acid',pop(t,'stomach','walls'));return s},
alarm(g,cx,cy,t){let s=`<rect x="${cx-1000}" y="${cy-60}" width="2000" height="140" fill="#e0a77a"/><rect x="${cx-1000}" y="${cy+80}" width="2000" height="400" fill="#c55a6a"/>`;
 const p=0.5+0.5*Math.sin(t*4);s+=`<ellipse cx="${cx-120}" cy="${cy+10}" rx="${f1(230+p*30)}" ry="${f1(110+p*15)}" fill="#ff4b4b" opacity=".6"/>`;
 s+=`<rect x="${cx-1000}" y="${cy+260}" width="2000" height="110" fill="#a8334a"/>`;for(let i=0;i<14;i++){const u=((t*0.3+i/14)%1);s+=C(cx-950+u*1000+Math.min(u,1)*0,cy+315,26,'#f5f1e6')}
 s+=germ(cx-120,cy-95,40,'#ffb43b',t);
 [['red','Red'],['warm','Warm'],['swollen','Swollen'],['sore','Sore']].forEach(([w,n],i)=>{s+=crd(cx+560,cy-250+i*130,n,pop(t,w,'alarm'),'#a8223a')});return s},
eater(g,cx,cy,t){const k=easeIO(clamp((t-Tn('eater','swallows')+1)/1.5));let s=`<circle cx="${cx+300}" cy="${cy}" r="${f1(230-60*k)}" fill="#f2c9a0" stroke="#c9976a" stroke-width="10"/>`;
 const gx=lerp(cx-450,cx+300,k);s+=germ(gx,cy,k>0.9?28:60,'#ff7a8a',t);s+=tx(cx+300,cy+310,'Macrophage = big eater',44,'#fff');
 const fl=pop(t,'backup','eater');s+=`<g opacity="${fl}"><path d="M${cx+300} ${cy-230} v-170" stroke="#fff" stroke-width="10"/><rect x="${cx+300}" y="${cy-440}" width="360" height="120" rx="14" fill="#f5f1e6"/>`+tx(cx+480,cy-365,'WANTED',46,'#a8223a')+`</g>`;return s},
fever(g,cx,cy,t){const k=easeIO(clamp((t-Tn('fever','hotter')+2.5)/3));const T0=37+k*2;let s=`<rect x="${cx-70}" y="${cy-400}" width="140" height="720" rx="70" fill="#10192e" stroke="#cfd8e6" stroke-width="8"/><circle cx="${cx}" cy="${cy+320}" r="110" fill="#ff4b4b"/><rect x="${cx-40}" y="${f1(cy+320-640*(k*0.6+0.3))}" width="80" height="${f1(640*(k*0.6+0.3))}" fill="#ff4b4b"/>`+tx(cx+620,cy-330,T0.toFixed(1)+' °C',90,'#fff');
 for(let i=0;i<10;i++){const sz=lerp(40,16,k),x=cx+300+(i%5)*160,y=cy-200+Math.floor(i/5)*200;s+=germ(x,y,sz,'#ff7a8a',t)}
 s+=tx(cx+620,cy+200,'Germs grow slower',44,'#fff')+tx(cx+620,cy+280,'Defenders work faster',44,'#6fcf4a');return s},
adaptive(g,cx,cy,t){const m=clamp((t-Tn('adaptive','copy')+3)/1);let s='';for(let r=0;r<4;r++)for(let c=0;c<9;c++){const hit=(r*9+c)==14;const x=cx-640+c*160,y=cy-280+r*170;const col=hit?'#ffd23f':['#8fd3ff','#c18cff','#6fcf4a'][(r+c)%3];s+=C(x,y,48,hit&&m>0?'#ffd23f':col,hit?1:(m>0?0.35:0.9))}
 if(m>0){const n=Math.floor(3+m*6+(t*2)%1);for(let i=0;i<n;i++)s+=C(cx-640+5*160+((i%3)-1)*80,cy-280+ (1)*170+90+Math.floor(i/3)*70,30,'#ffd23f')}
 s+=tx(cx-640,cy+330,'T cells + B cells',44,'#fff','start')+tx(cx+700,cy+330,'Only matching ones multiply',44,'#ffd23f','end');return s},
antibody(g,cx,cy,t){const k=easeOut(clamp((t-Tn('antibody','stick')+1)/2));let s=germ(cx,cy,130,'#ff7a8a',t*0.3);
 for(let i=0;i<12;i++){const a=i/12*6.283,r0=420,r1=175,r=lerp(r0+rnd(i)*250,r1,k);const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;s+=`<g transform="rotate(${f1(a*57.3+90)} ${f1(x)} ${f1(y)})">${yab(f1(x),f1(y),50,'#6fb0ff')}</g>`}
 s+=tx(cx,cy+330,'Antibodies: keys that fit one lock',44,'#fff');return s},
memory(g,cx,cy,t){const k1=clamp(sp('memory',t)*2.2),k2=clamp((t-Tn('memory','returns')+1)/1.5);let s=tx(cx-850,cy-240,'First time',44,'#ffb43b','start')+bar(cx-300,cy-290,1100,80,'#10192e')+bar(cx-300,cy-290,f1(1100*Math.min(k1,1)),80,'#ff7a8a')+tx(cx+800,cy-175,'Days to win',36,'#fff','end')
 +tx(cx-850,cy+60,'Next time',44,'#6fcf4a','start')+bar(cx-300,cy+10,1100,80,'#10192e')+bar(cx-300,cy+10,f1(160*k2),80,'#6fcf4a')+tx(cx+800,cy+125,'Hours to win',36,'#fff','end');
 for(let i=0;i<6;i++)s+=C(cx-700+i*120,cy+250,38,'#ffd23f')+tx(cx-700+i*120,cy+263,'M',34,'#10131a');return s+tx(cx+100,cy+263,'Memory cells stay for years',40,'#fff','start')},
vaccine(g,cx,cy,t){const k=easeIO(clamp(sp('vaccine',t)*1.5));let s=card(cx-650,cy,520,420)+germ(cx-650,cy-20,70,'#bdbdbd',0)+tx(cx-650,cy+150,'Harmless piece',42,'#3a2c12')+arrowR(cx-300,cy,'#fff',14,160)+`<circle cx="${cx+100}" cy="${cy}" r="170" fill="#f2c9a0"/>`+tx(cx+100,cy+270,'Practice fight',42,'#fff');
 for(let i=0;i<5;i++)s+=C(cx+100+Math.cos(i*1.3+t)*80,cy+Math.sin(i*1.3+t)*80,24,'#ffd23f',k);
 s+=arrowR(cx+330,cy,'#fff',14,160)+card(cx+700,cy,420,420)+tx(cx+700,cy-30,'Army ready',46,'#2f9d62')+tx(cx+700,cy+60,'Real germ: easy win',38,'#3a2c12');return s},
cold(g,cx,cy,t){let s=`<rect x="${cx-900}" y="${cy-50}" width="1100" height="260" rx="60" fill="#e8a9a0"/><rect x="${cx-900}" y="${cy-50}" width="1100" height="60" rx="30" fill="#c55a6a"/>`;
 for(let i=0;i<12;i++){const u=((t*0.3+i/12)%1);s+=germ(cx-850+u*1000,cy-110,24,'#ffb43b',t+i)}
 const m=pop(t,'mucus','cold');for(let i=0;i<10;i++){const u=((t*0.5+i/10)%1);s+=`<circle cx="${f1(cx-600+u*900)}" cy="${f1(cy+120+Math.sin(u*9)*14)}" r="22" fill="#9fe08a" opacity="${m}"/>`}
 s+=crd(cx+600,cy-250,'Virus makes copies',1)+crd(cx+600,cy-60,'Fight = symptoms',pop(t,'fight','cold'))+crd(cx+600,cy+130,'Mucus washes virus out',m);return s},
flu(g,cx,cy,t){const k=clamp((t-Tn('flu','changed')+1)/1.2);let s=card(cx-600,cy,560,520)+germ(cx-600,cy-30,110,'#ffb43b',0)+tx(cx-600,cy+190,'Memory: old face',40,'#3a2c12');
 s+=card(cx+300,cy,560,520)+`<g opacity="${0.3+0.7*k}">`+germ(cx+300,cy-30,110,'#7a5ad0',t)+`</g>`+tx(cx+300,cy+190,k>0.5?'New face this year':'Old face',40,'#3a2c12')+`<g opacity="${k}">`+cross(cx-80,cy,70,'#ff4b4b',22)+`</g>`+tx(cx,cy+340,'Flu vaccine is updated every year',44,'#fff');return s},
allergy(g,cx,cy,t){const k=pop(t,'histamine','allergy');let s=C(cx+200,cy,200,'#f2c9a0');for(let i=0;i<14;i++){const u=((t*0.3+rnd(i))%1);s+=C(cx-800+u*900,cy-300+rnd(i+2)*600,12,'#ffd23f')}
 s+=tx(cx-600,cy-300,'Pollen (harmless!)',44,'#ffd23f','start');for(let i=0;i<16;i++){const a=i/16*6.283,r=lerp(100,330,k*((t*0.8+i*0.1)%1));s+=C(cx+200+Math.cos(a)*r,cy+Math.sin(a)*r,16,'#ff4b4b',k)}
 s+=crd(cx-100,cy+300,'Histamine: sneeze, itch',k)+tx(cx+200,cy+6,'Overreaction',44,'#10131a');return s},
auto(g,cx,cy,t){let s=`<circle cx="${cx+200}" cy="${cy}" r="230" fill="#6fcf4a" stroke="#3a8a2a" stroke-width="10"/>`+tx(cx+200,cy+14,'Own cell',44,'#10131a');const a=pop(t,'attacks','auto');
 for(let i=0;i<8;i++){const an=i/8*6.283,r=lerp(700,320,a)+Math.sin(t*5+i)*12;s+=wbc(cx+200+Math.cos(an)*r,cy+Math.sin(an)*r,48,'#f5f1e6')}
 s+=tx(cx+200,cy+385,'Army mistakes friend for enemy',44,'#fff')+`<g opacity="${a}">`+cross(cx+200,cy,120,'#ff4b4b',20)+`</g>`;return s},
gut(g,cx,cy,t){let d='M'+(cx-850)+' '+(cy-200);for(let i=0;i<=40;i++){d+=`L${cx-850+i*42} ${f1(cy-200+Math.sin(i*0.5)*110+i*10)} `}let s=`<path d="${d}" stroke="#e8a9a0" stroke-width="140" fill="none" stroke-linecap="round" opacity=".9"/>`;
 for(let i=0;i<26;i++){const u=((t*0.15+i/26)%1),x=cx-850+u*1680,y=cy-200+Math.sin(u*40*0.5)*110+u*400+Math.sin(i*7)*26;s+=C(x,y,14,['#6fcf4a','#8fd3ff','#ffd23f'][i%3])}
 const f=pop(t,'fibre','gut');s+=crd(cx-300,cy+270,'Beans + fruit',f)+crd(cx+400,cy+270,'Vegetables + curd',f)+tx(cx,cy-300,'Friendly bacteria train your defenders',46,'#fff');return s},
habits(g,cx,cy,t){const L=[['sleep','Sleep enough'],['movement','Move daily'],['washing','Wash hands'],['vaccines','Get vaccines']];let s='';L.forEach(([w,n],i)=>{const u=pop(t,w,'habits'),y=cy-270+i*180;s+=`<g opacity="${u}" transform="translate(${f1((1-u)*-100)} 0)">${card(cx,y,1500,140)}${C(cx-620,y,44,'#4caf50')}<path d="M${cx-645} ${y} l18 20 l36 -40" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>`+tx(cx-540,y+18,n,54,'#3a2c12','start')+`</g>`});return s},
stress(g,cx,cy,t){const k=clamp(sp('stress',t)*1.4);let s=`<rect x="${cx-650}" y="${cy-200}" width="150" height="500" rx="20" fill="#10192e"/><rect x="${cx-650}" y="${f1(cy+300-500*k)}" width="150" height="${f1(500*k)}" rx="20" fill="#ff7a8a"/>`+tx(cx-575,cy-240,'Cortisol',42,'#ff7a8a')+tx(cx-575,cy+350,'Long stress',38,'#fff')
 s+=`<path d="M${cx+100} ${cy-300} q300 -50 600 0 v300 q0 250 -300 330 q-300 -80 -300 -330z" fill="#4aa3ff" opacity="${f1(1-0.6*k)}" transform="translate(${f1(-400*(1-0)+300)} 0) scale(1)"/>`;
 s+=tx(cx+400,cy-320,'Defence shield',44,'#fff')+tx(cx+400,cy+340,k>0.5?'Weaker':'Strong',50,k>0.5?'#ff7a8a':'#6fcf4a');return s},
antib(g,cx,cy,t){const p=pop(t,'nothing','antib');let s=card(cx-500,cy-30,820,620)+tx(cx-500,cy-270,'Bacteria',50,'#3a2c12');for(let i=0;i<5;i++){const alive=1-p*(i<5?1:0);s+=`<ellipse cx="${cx-760+i*130}" cy="${cy-60+Math.sin(t*2+i)*30}" rx="54" ry="28" fill="#6fcf4a" opacity="${f1(Math.max(alive,0.1))}"/>`}
 s+=tx(cx-500,cy+150,'Antibiotic kills them',40,'#2f9d62')+card(cx+500,cy-30,820,620)+tx(cx+500,cy-270,'Virus',50,'#3a2c12');for(let i=0;i<5;i++)s+=germ(cx+220+i*130,cy-60+Math.sin(t*2+i)*30,30,'#ffb43b',t+i);
 s+=tx(cx+500,cy+150,'No effect on viruses',40,'#a8223a')+tx(cx,cy+350,'Use only when your doctor prescribes',42,'#fff');return s},
clean(g,cx,cy,t){const a=pop(t,'soil','clean'),b=pop(t,'cleaning','clean');return crd(cx-450,cy-80,'Soil, animals: train the body',a)+crd(cx+450,cy-80,'Hand washing: still smart',b,'#2f6a2a')+tx(cx,cy+200,'Be normal, not extreme',56,'#ffd23f')+C(cx-450,cy+330,40+Math.sin(t*4)*3,'#8a5a2a',a)+C(cx+450,cy+330,40,'#8fd3ff',b)},
myth(g,cx,cy,t){const L=[['cold','Cold weather','causes colds'],['overnight','One juice','boosts overnight'],['balanced','Stronger','always better']];let s='';L.forEach(([w,a,b],i)=>{const u=pop(t,w,'myth'),x=cx-640+i*640;s+=card(x,cy-20,560,520)+tx(x,cy-60,a,48,'#3a2c12')+tx(x,cy+10,b,48,'#3a2c12')+`<g transform="translate(${x} ${cy+150}) scale(${f1(2-u)})" opacity="${u*0.9}">${cross(0,0,90,'#ff4b4b',22)}</g>`});return s},
magic(g,cx,cy,t){const L=[['single','No magic food','nothing prevents all illness'],['vitamin','Vitamin C / D','small help, or if low'],['doctor','See a doctor','weeks tired, repeat infections']];let s='';L.forEach(([w,a,b],i)=>{const u=pop(t,w,'magic'),x=cx-640+i*640;s+=`<g opacity="${u}">${card(x,cy-20,560,520)}${tx(x,cy-60,a,46,'#3a2c12')}${tx(x,cy+20,b.split(' ').slice(0,3).join(' '),34,'#5a4a2a')}${tx(x,cy+66,b.split(' ').slice(3).join(' '),34,'#5a4a2a')}</g>`});return s}};

function art(){let s=BG;ORDER.slice(0,20).forEach(k=>{s+=P(k)});return s}
let G={};
function init(){ORDER.slice(0,20).forEach(k=>G[k]=document.getElementById('d_'+k))}
function anim(t){ORDER.slice(0,20).forEach(k=>{const [cx,cy]=PC[k];G[k].innerHTML=cellfn[k](G[k],cx,cy,t)})}

const PILL={hook:'Your invisible army',walls:'Defence 1: the walls',alarm:'Defence 2: the alarm',eater:'Macrophage: big eater',fever:'Why fever helps',adaptive:'Special forces: T and B cells',antibody:'Antibodies = keys',memory:'The army remembers',vaccine:'How vaccines train you',cold:'Common cold',flu:'Why flu returns',allergy:'Allergy = false alarm','auto':'Autoimmune = friendly fire',gut:'Your gut helps',habits:'What really helps',stress:'Stress weakens defence',antib:'Antibiotics vs viruses',clean:'Is clean too clean?',myth:'Myths',magic:'No magic cures',close:'Stay healthy'};
ORDER.forEach(n=>HD(n,PILL[n],(n=='myth'||n=='magic')?'#d9232a':(n=='close'?'#2d7fd3':undefined)));
const cam=ORDER.map(n=>{const [x,y]=PC[n];return {sc:S(n),x,y,z:n=='close'?0.9:0.95}});
return {art,init,anim,cam,sfx:()=>[]};
};
