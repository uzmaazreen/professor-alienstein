// Long video: what happens while you sleep.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','why','clock','pressure','stages','deep','rem','dreams','cycle','clean','memory','screens','caffeine','room','habits','nap','alarm','lack','myth','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const LB=(n,w,x,y,txt,col)=>A({sc:S(n),w:wi(S(n),w),x,y,html:lbl(txt,col)});
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={hook:[0,0],why:[2500,0],clock:[5000,0],press:[0,1400],stage:[2500,1400],deep:[5000,1400],rem:[0,2800],cycle:[2500,2800],clean:[5000,2800],mem:[0,4200],scr:[2500,4200],caf:[5000,4200],room:[0,5600],hab:[2500,5600],nap:[5000,5600],alarm:[7500,5600],lack:[0,7000],myth:[2500,7000]};
const P=(id,k,c1,c2,inner)=>{const [cx,cy]=PC[k];return R(cx,cy,panel(id,cx,cy,2200,1200,c1,c2,inner))};
const card=(x,y,w,h)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="#f5f1e6"/>`;
const eeg=(x0,y0,w,amp,freq,t,col,sw)=>{let d='';for(let i=0;i<=80;i++){const x=x0+w*i/80;d+=`${i?'L':'M'}${f1(x)} ${f1(y0+Math.sin(i*freq+t*3)*amp*(0.6+0.4*Math.sin(i*0.31+t)))} `}return `<path d="${d}" stroke="${col}" stroke-width="${sw||8}" fill="none" stroke-linejoin="round"/>`};
const brain=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="230" ry="170" fill="${col||'#f2a6b8'}" stroke="#c9738b" stroke-width="8"/><path d="M-150 -40 q50 -60 100 0 t100 0 t100 0 M-150 50 q50 55 100 0 t100 0 t100 0" stroke="#d7849a" stroke-width="8" fill="none"/></g>`;

function art(){
 let s=BG;
 {const [cx,cy]=PC.hook;let h=`<rect x="${cx-1100}" y="${cy+250}" width="2200" height="400" fill="#2a2f4a"/><rect x="${cx+300}" y="${cy-420}" width="380" height="440" rx="20" fill="#0a1230" stroke="#cfd8e6" stroke-width="12"/>`;
  for(let i=0;i<14;i++)h+=C(cx+330+rnd(i)*320,cy-390+rnd(i+3)*380,2+rnd(i+6)*3,'#fff',0.8);
  h+=C(cx+560,cy-260,60,'#f3f1dc')+C(cx+590,cy-275,52,'#0a1230');
  h+=`<rect x="${cx-700}" y="${cy+60}" width="800" height="260" rx="30" fill="#8a5ac0"/><rect x="${cx-720}" y="${cy+20}" width="150" height="300" rx="30" fill="#e9eef5"/><circle cx="${cx-600}" cy="${cy+10}" r="60" fill="#e0a77a"/><rect x="${cx-540}" y="${cy+90}" width="660" height="230" rx="40" fill="#5a3a90"/>`;
  h+=`<rect x="${cx-900}" y="${cy-380}" width="360" height="150" rx="20" fill="#10131a" stroke="#cfd8e6" stroke-width="8"/>`+tx(cx-720,cy-270,'11:00 PM',70,'#ff4b4b');
  h+=`<g id="d_hkz"></g>`;s+=P('hk','hook','#0f1b3a','#1f2d58',h);}
 {s+=P('wy','why','#1a2a47','#2a4066',`<g id="d_wyg"></g>`);}
 {s+=P('ck','clock','#15233d','#26385c',`<g id="d_ckg"></g>`);}
 {s+=P('pr','press','#1f2f4a','#2f4668',`<g id="d_prg"></g>`);}
 {s+=P('st','stage','#1a2a47','#2a4066',`<g id="d_stg"></g>`);}
 {s+=P('dp','deep','#13204a','#223a78',`<g id="d_dpg"></g>`);}
 {s+=P('rm','rem','#2a2050','#43307a',`<g id="d_rmg"></g>`);}
 {s+=P('cy','cycle','#1a2a47','#2a4066',`<g id="d_cyg"></g>`);}
 {s+=P('cl','clean','#17233d','#26385c',`<g id="d_clg"></g>`);}
 {s+=P('me','mem','#1f2f4a','#2f4668',`<g id="d_meg"></g>`);}
 {s+=P('sc','scr','#14203a','#233a64',`<g id="d_scg"></g>`);}
 {s+=P('ca','caf','#2a2438','#3d3454',`<g id="d_cag"></g>`);}
 {s+=P('ro','room','#17233d','#26385c',`<g id="d_rog"></g>`);}
 {s+=P('hb','hab','#1f3a3a','#2e5757',`<g id="d_hbg"></g>`);}
 {s+=P('np','nap','#1f2f4a','#2f4668',`<g id="d_npg"></g>`);}
 {s+=P('al','alarm','#2a2438','#43355e',`<g id="d_alg"></g>`);}
 {s+=P('lk','lack','#3a2430','#55354a',`<g id="d_lkg"></g>`);}
 {s+=P('my','myth','#2d2b3a','#443f5a',`<g id="d_myg"></g>`);}
 return s}

let G={};
function init(){['hkz','wyg','ckg','prg','stg','dpg','rmg','cyg','clg','meg','scg','cag','rog','hbg','npg','alg','lkg','myg'].forEach(k=>G[k]=document.getElementById('d_'+k))}
const stamp=(x,y,u)=>`<g transform="translate(${x} ${y}) scale(${f1(2.3-1.3*u)})" opacity="${u*0.85}">${cross(0,0,120,'#ff4b4b',26)}</g>`;
const HYP=[[0,0],[0.3,2],[0.8,3],[1.4,4],[1.9,3],[2.2,2],[2.4,1],[2.5,1],[3.0,2],[3.4,4],[3.9,3],[4.1,2],[4.2,1],[4.5,1],[4.9,2],[5.2,3],[5.6,2],[5.8,1],[6.2,1],[6.4,2],[6.9,1],[7.3,2],[7.6,0],[8,0]];
// stage index: 0 awake,1 REM,2 light,3 N2,4 deep  -> y order
function anim(t){
 // hook
 {const [cx,cy]=PC.hook;let g='';for(let i=0;i<6;i++){const u=((t*0.25+i/6)%1);g+=tx(cx-380+u*160+i*20,cy-30-u*260,'z',50+u*40,'#fff','middle',800).replace('<text','<text opacity="'+(1-u).toFixed(2)+'"')}G.hkz.innerHTML=g;}
 // why
 {const [cx,cy]=PC.why;let g=brain(cx,cy,1.5,'#f2a6b8');g+=`<rect x="${cx-260}" y="${cy-470}" width="520" height="90" rx="20" fill="#ffd23f"/>`+tx(cx,cy-405,'NIGHT SHIFT',54,'#10131a');
  const TT=[Tn('why','cleaning'),Tn('why','memories'),Tn('why','repairing')],NM=['Cleaning','Saving memories','Repairing body'],CO=['#4aa3ff','#c18cff','#ff7a8a'],POS=[[cx-650,cy+200],[cx,cy+330],[cx+650,cy+200]];
  TT.forEach((t0,i)=>{const u=easeOut(clamp((t-t0)/0.5));if(u<=0)return;const [x,y]=POS[i];g+=`<g opacity="${u}" transform="translate(${x} ${y}) scale(${f1(u)})">${card(0,0,420,170)}${C(-150,0,40+4*Math.sin(t*4),CO[i])}${tx(40,16,NM[i],36,'#3a2c12','middle',800)}</g>`});G.wyg.innerHTML=g;}
 // clock
 {const [cx,cy]=PC.clock;const a=(t*0.4)%6.283;let g=`<path d="M${cx-720} ${cy} a330 330 0 0 1 660 0z" fill="#ffd23f" opacity=".5" transform="rotate(0)"/><path d="M${cx-720} ${cy} a330 330 0 0 0 660 0z" fill="#26385c" opacity=".9"/><circle cx="${cx-390}" cy="${cy}" r="330" fill="none" stroke="#9fb4cf" stroke-width="8"/>`;
  g+=`<path d="M${cx-390} ${cy} L${f1(cx-390+Math.sin(a)*290)} ${f1(cy-Math.cos(a)*290)}" stroke="#fff" stroke-width="14" stroke-linecap="round"/>`+C(cx-390,cy-190,40,'#ffd23f')+C(cx-390,cy+190,40,'#f3f1dc')+tx(cx-390,cy-370,'Day',40,'#ffd23f')+tx(cx-390,cy+410,'Night',40,'#cfd8e6');
  let d='';for(let i=0;i<=60;i++){const x=cx+150+i*12,u=i/60,y=cy+200-380*Math.exp(-Math.pow((u-0.7)*4,2));d+=`${i?'L':'M'}${x} ${f1(y)} `}g+=`<path d="${d}" stroke="#6fb0ff" stroke-width="10" fill="none"/>`+tx(cx+500,cy-250,'Melatonin',46,'#6fb0ff')+tx(cx+150,cy+270,'Day',34,'#fff','start')+tx(cx+870,cy+270,'Night',34,'#fff','end');
  const u2=((a/6.283)*0.9+0.05),px=cx+150+u2*720;g+=C(px,cy+200-380*Math.exp(-Math.pow((u2-0.7)*4,2)),16,'#fff');G.ckg.innerHTML=g;}
 // pressure
 {const [cx,cy]=PC.press;const p=sp('pressure',t),lvl=t<Tn('pressure','longer')?p*0.5:Math.min(1,0.5+(p-0.5)*1.0);let g=`<rect x="${cx-130}" y="${cy-270}" width="260" height="620" rx="40" fill="#10192e" stroke="#9fb4cf" stroke-width="8"/>`;
  const h=580*lvl;g+=`<rect x="${cx-116}" y="${f1(cy+336-h)}" width="232" height="${f1(h)}" rx="30" fill="${mix('6fcf4a','ff4b4b',lvl)}"/>`+tx(cx,cy-300,'Adenosine',38,'#fff');
  for(let i=0;i<14;i++){const u=((t*0.3+rnd(i))%1);g+=C(cx-100+rnd(i+2)*200,cy+310-u*h,8,'#ffe14d',0.8)}
  const hr=7+Math.round(16*p);g+=tx(cx+600,cy-100,(hr>12?hr-12:hr)+(hr>=12?' PM':' AM'),110,'#fff');g+=C(cx+600,cy-260,50,hr<18?'#ffd23f':'#f3f1dc')+tx(cx+600,cy+120,lvl>0.75?'So sleepy...':'Fresh',50,'#fff');G.prg.innerHTML=g;}
 // stages
 {const [cx,cy]=PC.stage;const Y=[cy-280,cy-130,cy+20,cy+170,cy+300],CO=['#ffd23f','#c18cff','#8fd3ff','#4aa3ff','#2d5fd0'],NM=['Awake','REM','Light','Deeper','Deep'];let g='';
  NM.forEach((n,i)=>{g+=tx(cx-780,Y[i]-14,n,34,CO[i],'start')+`<path d="M${cx-800} ${Y[i]} H${cx+950}" stroke="#3a4b6e" stroke-width="3"/>`});
  const k=clamp((t-SC[S('stages')].s-1)/(SC[S('stages')].e-SC[S('stages')].s-3)),X=h=>cx-780+h/8*1700;let d='',last=null;
  for(const [h,st] of HYP){if(h/8>k)break;if(last!==null)d+=`L${f1(X(h))} ${f1(Y[last])} `;d+=`${d?'L':'M'}${f1(X(h))} ${f1(Y[st])} `;last=st}
  if(d)g+=`<path d="${d}" stroke="#fff" stroke-width="10" fill="none" stroke-linejoin="round"/>`;
  g+=tx(cx+80,cy+420,'Hours of sleep: 0 to 8',40,'#9fb4cf');G.stg.innerHTML=g;}
 // deep
 {const [cx,cy]=PC.deep;let g=tx(cx-500,cy-330,'Awake: fast, small waves',44,'#ffd23f','start')+eeg(cx-900,cy-220,1800,16,1.7,t,'#ffd23f')+tx(cx-500,cy+0,'Deep sleep: slow, big waves',44,'#6fb0ff','start')+eeg(cx-900,cy+170,1800,70,0.26,t,'#6fb0ff',12);
  const beat=1+0.12*Math.sin(t*3);g+=`<g transform="translate(${cx-600} ${cy+380}) scale(${f1(beat)})"><circle cx="-22" cy="0" r="32" fill="#e34b5f"/><circle cx="22" cy="0" r="32" fill="#e34b5f"/><path d="M-52 12 L0 70 L52 12Z" fill="#e34b5f"/></g>`+tx(cx-520,cy+395,'Slow heart + breathing',38,'#fff','start');
  const gr=clamp((t-Tn('deep','growth'))/0.6);g+=`<g opacity="${gr}">${card(cx+500,cy+440,520,110)}${tx(cx+500,cy+455,'Growth hormone released',34,'#3a2c12')}</g>`;G.dpg.innerHTML=g;}
 // REM + dreams
 {const [cx,cy]=PC.rem;let g=eeg(cx-900,cy-300,900,40,1.6,t,'#c18cff',9)+tx(cx-450,cy-200,'Brain: as active as awake',40,'#c18cff');
  for(const dx of [-380,-120]){g+=C(cx+dx,cy-20,90,'#fff')+C(cx+dx+Math.sin(t*9)*40,cy-20,36,'#2a2a30')}
  g+=tx(cx-250,cy+130,'Eyes dart (rapid eye movement)',38,'#fff')+`<rect x="${cx-300}" y="${cy+200}" width="600" height="130" rx="50" fill="#5a3a90"/>`+C(cx-240,cy+235,60,'#e0a77a')+`<rect x="${cx+300}" y="${cy+200}" width="90" height="80" rx="14" fill="#ffd23f"/><path d="M${cx+320} ${cy+200} v-30 a25 25 0 0 1 50 0 v30" stroke="#ffd23f" stroke-width="12" fill="none"/>`+tx(cx+350,cy+330,'Body paralysed',34,'#ffd23f');
  const dr=clamp((t-Tn('dreams','dream')+0.3)/0.8);if(dr>0){g+=`<g opacity="${dr}" transform="translate(${cx+500} ${cy-130}) scale(${f1(0.6+0.4*dr)})"><ellipse rx="400" ry="260" fill="#f5f1e6"/>`;[['#ffd23f',-200,-60],['#6fcf4a',0,60],['#ff7a8a',180,-70]].forEach(([c,x,y],i)=>{g+=C(x+Math.sin(t*1.5+i)*30,y+Math.cos(t*1.3+i)*20,60,c)});g+=`</g>`}G.rmg.innerHTML=g;}
 // cycles
 {const [cx,cy]=PC.cycle;const DP=[260,210,150,90,50],RM=[40,70,110,160,210],k=clamp((t-SC[S('cycle')].s-1)/(SC[S('cycle')].e-SC[S('cycle')].s-3));let g='';
  for(let i=0;i<5;i++){const u=easeOut(clamp(k*5-i)),x=cx-760+i*330;g+=`<rect x="${x}" y="${f1(cy+330-DP[i]*u)}" width="130" height="${f1(DP[i]*u)}" rx="10" fill="#4aa3ff"/><rect x="${x}" y="${f1(cy+330-(DP[i]+RM[i])*u)}" width="130" height="${f1(RM[i]*u)}" rx="10" fill="#c18cff"/>`+tx(x+65,cy+390,'Cycle '+(i+1),34,'#fff')}
  g+=`<rect x="${cx-760}" y="${cy-330}" width="40" height="40" fill="#4aa3ff"/>`+tx(cx-700,cy-298,'Deep sleep',38,'#fff','start')+`<rect x="${cx-380}" y="${cy-330}" width="40" height="40" fill="#c18cff"/>`+tx(cx-320,cy-298,'REM (dreams)',38,'#fff','start')+tx(cx+300,cy-298,'~90 min each',44,'#ffd23f','start');G.cyg.innerHTML=g;}
 // brain wash
 {const [cx,cy]=PC.clean;const s=easeIO(clamp(sp('clean',t)*1.6)),sep=lerp(1,1.55,s);let g='';
  for(let r=0;r<3;r++)for(let c=0;c<7;c++){g+=C(cx-600+c*150*sep+(r%2)*50,cy-230+r*150*sep,52,'#b57a8a')}
  for(let i=0;i<30;i++){const u=((t*0.25+rnd(i))%1),x0=cx-600+rnd(i+2)*1100,y0=cy-300+rnd(i+4)*550;const fl=s>0.4?u:0;g+=C(x0+fl*900+Math.sin(t+i)*8,y0+Math.sin(u*6)*30*fl,10,'#7a5230',s>0.4?(1-u):0.9)}
  if(s>0.4)for(let i=0;i<5;i++){const u=((t*0.4+i/5)%1);g+=`<g opacity="${(Math.sin(u*Math.PI)*0.8).toFixed(2)}">${arrowR(cx-700+u*800,cy-330+i*160,'#4aa3ff',9,80)}</g>`}
  g+=tx(cx,cy+350,s>0.4?'Deep sleep: space opens, fluid flushes waste out':'Awake: waste builds up',46,s>0.4?'#4aa3ff':'#ffb43b');G.clg.innerHTML=g;}
 // memory
 {const [cx,cy]=PC.mem;let g=`<rect x="${cx-250}" y="${cy-150}" width="300" height="300" rx="40" fill="#3b5f98" stroke="#9fc3ff" stroke-width="6"/>`+tx(cx-100,cy+210,'Short-term (hippocampus)',34,'#fff')+`<rect x="${cx+500}" y="${cy-300}" width="420" height="600" rx="30" fill="#2b3550" stroke="#9fb4cf" stroke-width="6"/>`+tx(cx+710,cy+350,'Long-term storage',34,'#fff');
  for(let i=0;i<4;i++)g+=`<rect x="${cx+530}" y="${cy-270+i*145}" width="360" height="115" rx="14" fill="#10192e"/>`;
  const sl=clamp((t-Tn('memory','during'))/1);for(let i=0;i<8;i++){const col=['#ffd23f','#6fcf4a','#ff7a8a','#4aa3ff'][i%4];const u=((t*0.2+i/8)%1);let x,y;if(sl>0){x=lerp(cx-100,cx+710,easeIO(u));y=lerp(cy,cy-200+(i%4)*145,easeIO(u))}else{x=cx-900+u*800;y=cy-250+rnd(i)*500}
   g+=`<rect x="${f1(x-28)}" y="${f1(y-28)}" width="56" height="56" rx="10" fill="${col}"/>`}
  g+=tx(cx-700,cy-320,sl>0?'Asleep: replay + save':'Awake: new things learned',44,sl>0?'#c18cff':'#fff','start');G.meg.innerHTML=g;}
 // screens
 {const [cx,cy]=PC.scr;const on=clamp((t-SC[S('screens')].s-3)/1);let g=`<rect x="${cx-800}" y="${cy-250}" width="300" height="520" rx="46" fill="#10131a" stroke="#cfd8e6" stroke-width="8"/><rect x="${cx-775}" y="${cy-220}" width="250" height="460" rx="26" fill="#4aa3ff"/>`;
  for(let i=0;i<7;i++){const u=((t*0.8+i/7)%1);g+=`<path d="M${f1(cx-500+u*500)} ${cy-120+i*40} l50 0" stroke="#7bb6ff" stroke-width="10" stroke-linecap="round" opacity="${(1-u)*on}"/>`}
  g+=`<ellipse cx="${cx+100}" cy="${cy}" rx="110" ry="70" fill="#fff"/>`+C(cx+100,cy,38,'#4aa3ff')+C(cx+100,cy,16,'#10131a');
  const mel=lerp(1,0.2,on);g+=`<rect x="${cx+420}" y="${cy-250}" width="140" height="500" rx="20" fill="#10192e"/><rect x="${cx+420}" y="${f1(cy+250-500*mel)}" width="140" height="${f1(500*mel)}" rx="20" fill="#6fb0ff"/>`+tx(cx+490,cy-290,'Melatonin',38,'#6fb0ff')+tx(cx+490,cy+330,mel<0.5?'Brain thinks: daytime!':'Sleepy',42,'#fff');G.scg.innerHTML=g;}
 // caffeine
 {const [cx,cy]=PC.caf;const cf=clamp((t-Tn('caffeine','looks'))/1.2);let g=tx(cx,cy-420,'Brain cell receptors',44,'#fff');
  for(let i=0;i<4;i++){const x=cx-540+i*360;g+=`<rect x="${x-90}" y="${cy-60}" width="180" height="200" rx="30" fill="#2b3550" stroke="#9fb4cf" stroke-width="6"/><rect x="${x-34}" y="${cy-60}" width="68" height="60" fill="#10192e"/>`;
   const block=i<3&&cf>0.5;if(block)g+=`<polygon points="${x},${cy-120} ${x+50},${cy-85} ${x+50},${cy-25} ${x},${cy+10} ${x-50},${cy-25} ${x-50},${cy-85}" fill="#8a4b2a"/>`;
   else{const u=((t*0.5+i/4)%1),dy=cf>0.5?Math.sin(u*Math.PI*2)*60:(1-easeOut(u))*-300;g+=`<rect x="${x-26}" y="${f1(cy-130+(cf>0.5?-Math.abs(dy):dy))}" width="52" height="70" rx="10" fill="#ffe14d"/>`}}
  g+=C(cx-700,cy+320,24,'#8a4b2a')+tx(cx-640,cy+332,'Caffeine (blocks the lock)',38,'#fff','start')+`<rect x="${cx+100}" y="${cy+292}" width="40" height="56" rx="8" fill="#ffe14d"/>`+tx(cx+160,cy+332,'Adenosine (sleepy signal)',38,'#fff','start');G.cag.innerHTML=g;}
 // room
 {const [cx,cy]=PC.room;let g=`<rect x="${cx-800}" y="${cy-400}" width="420" height="500" rx="16" fill="#0a1230" stroke="#cfd8e6" stroke-width="10"/><rect x="${cx-800}" y="${cy-400}" width="210" height="500" fill="#6b3f8a" opacity=".9"/><rect x="${cx-590}" y="${cy-400}" width="210" height="500" fill="#6b3f8a" opacity=".9"/>`+tx(cx-590,cy+170,'Dark',44,'#fff')+`<rect x="${cx-180}" y="${cy-380}" width="60" height="500" rx="30" fill="#fff" stroke="#10131a" stroke-width="6"/><rect x="${cx-166}" y="${cy-150}" width="32" height="250" rx="16" fill="#4aa3ff"/>`+tx(cx-150,cy+170,'18 to 20°C',44,'#fff');
  g+=tx(cx+380,cy-270,'Quiet',50,'#fff')+`<path d="M${cx+300} ${cy-140} h60 l60 -50 v140 l-60 -50 h-60z" fill="#cfd8e6"/>`+cross(cx+560,cy-130,40,'#ff4b4b',14);
  let d='';for(let i=0;i<=40;i++){const x=cx-300+i*20,y=cy+380-100*Math.sin(i/40*3.1416)*0.8-i*3;d+=`${i?'L':'M'}${x} ${f1(y)} `}g+=`<path d="${d}" stroke="#ff9a3d" stroke-width="9" fill="none"/>`+tx(cx+100,cy+470,'Body temperature falls at night',40,'#ff9a3d');
  g+=`<rect x="${cx+250}" y="${cy+90}" width="600" height="160" rx="30" fill="#8a5ac0"/><rect x="${cx+250}" y="${cy+60}" width="100" height="200" rx="30" fill="#e9eef5"/>`+tx(cx+560,cy+185,'z z z',60,'#fff');G.rog.innerHTML=g;}
 // habits
 {const [cx,cy]=PC.hab;const TT=['same','bright','caffeine','screens','save'],NM=['Same sleep + wake time','Bright light in the morning','No caffeine after noon','Screens off before bed','Bed = only for sleep'];let g='';
  TT.forEach((w,i)=>{const u=easeOut(clamp((t-Tn('habits',w))/0.5)),y=cy-290+i*170;g+=`<g opacity="${u}" transform="translate(${f1((1-u)*-120)} 0)"><rect x="${cx-800}" y="${y-70}" width="1600" height="140" rx="30" fill="#f5f1e6"/>`+C(cx-710,y,44,'#4caf50')+`<path d="M${cx-735} ${y} l18 20 l36 -40" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`+tx(cx-630,y+18,NM[i],52,'#3a2c12','start')+`</g>`});G.hbg.innerHTML=g;}
 // nap
 {const [cx,cy]=PC.nap;const k=clamp(sp('nap',t)*1.2);let g=`<rect x="${cx-900}" y="${cy-150}" width="1800" height="110" rx="20" fill="#10192e"/><rect x="${cx-900}" y="${cy-150}" width="400" height="110" rx="20" fill="#8fd3ff"/><rect x="${cx-500}" y="${cy-150}" width="1400" height="110" fill="#2d5fd0"/>`+tx(cx-700,cy-85,'Light',40,'#10131a')+tx(cx+200,cy-85,'Deep sleep',40,'#fff')+tx(cx-700,cy-190,'20 min',44,'#6fcf4a')+tx(cx+500,cy-190,'90 min = a full cycle',40,'#fff');
  const nx=cx-900+1800*(k*0.5);g+=`<path d="M${f1(nx)} ${cy-30} v100" stroke="#ffd23f" stroke-width="12"/>`;
  g+=`<g transform="translate(${cx-230} ${cy+250})">${card(0,0,640,360)}${C(0,-40,70,'#ffd23f')+C(-24,-56,8,'#10131a')+C(24,-56,8,'#10131a')+`<path d="M-30 -20 q30 30 60 0" stroke="#10131a" stroke-width="7" fill="none"/>`}${tx(0,110,'Wake in light sleep: fresh',38,'#3a2c12')}</g>`;
  g+=`<g transform="translate(${cx+500} ${cy+250})">${card(0,0,640,360)}${C(0,-40,70,'#b0b8c4')+C(-24,-56,8,'#10131a')+C(24,-56,8,'#10131a')+`<path d="M-30 0 q30 -26 60 0" stroke="#10131a" stroke-width="7" fill="none"/>`}${tx(0,110,'Wake in deep sleep: groggy',38,'#3a2c12')}</g>`;G.npg.innerHTML=g;}
 // alarm
 {const [cx,cy]=PC.alarm;const sh=Math.sin(t*40)*6*(1-0.0);let g=`<g transform="translate(${cx-400+sh} ${cy-100})"><circle r="170" fill="#ff4b4b"/><circle r="130" fill="#fff"/><path d="M0 0 V-90 M0 0 L60 40" stroke="#10131a" stroke-width="14" stroke-linecap="round"/><circle cx="-120" cy="-170" r="50" fill="#ffd23f"/><circle cx="120" cy="-170" r="50" fill="#ffd23f"/></g>`;
  for(let i=0;i<4;i++){const u=((t*0.9+i/4)%1);g+=`<circle cx="${cx-400}" cy="${cy-100}" r="${f1(220+u*180)}" fill="none" stroke="#ff9a8a" stroke-width="8" opacity="${(1-u).toFixed(2)}"/>`}
  g+=`<rect x="${cx+60}" y="${cy-250}" width="700" height="130" rx="20" fill="#2d5fd0"/>`+tx(cx+410,cy-165,'Deep sleep',54,'#fff');
  const fog=clamp((t-Tn('alarm','inertia'))/0.8);for(let i=0;i<8;i++){g+=C(cx+100+rnd(i)*700+Math.sin(t*0.8+i)*30,cy+80+rnd(i+4)*200,60+rnd(i+2)*50,'#b0b8c4',0.45*fog)}
  g+=tx(cx+410,cy+400,'Sleep inertia = heavy, foggy brain',44,'#fff');G.alg.innerHTML=g;}
 // lack
 {const [cx,cy]=PC.lack;const k=easeOut(clamp(sp('lack',t)*1.4)),NM=['Focus','Mood','Immunity','Memory'],CO=['#4aa3ff','#ffd23f','#6fcf4a','#c18cff'];let g='';
  NM.forEach((n,i)=>{const x=cx-700+i*470,h=lerp(420,150,k);g+=`<rect x="${x-70}" y="${cy-250}" width="140" height="420" rx="20" fill="#10192e"/><rect x="${x-70}" y="${f1(cy+170-h)}" width="140" height="${f1(h)}" rx="20" fill="${CO[i]}"/>`+tx(x,cy+240,n,44,'#fff')});
  g+=tx(cx,cy-310,'After too little sleep',50,'#ff9a8a');G.lkg.innerHTML=g;}
 // myths
 {const [cx,cy]=PC.myth;const TT=['exactly','weekend','alcohol'],NM=['"Everyone needs exactly 8 hours"','"Weekend catches up fully"','"Alcohol helps you sleep"'];let g='';
  TT.forEach((w,i)=>{const u=easeOut(clamp((t-Tn('myth',w))/0.4)),x=cx-640+i*640;g+=card(x,cy-20,560,560)+tx(x,cy-60,NM[i].split(' ').slice(0,3).join(' '),44,'#3a2c12')+tx(x,cy+10,NM[i].split(' ').slice(3).join(' '),44,'#3a2c12')+stamp(x,cy+150,u)});G.myg.innerHTML=g;}
}

// ================= LABELS =================
HD('hook','Why do we sleep?');
HD('why','Sleep = a busy night shift');
HD('clock','Your body clock + melatonin');
HD('pressure','Sleep pressure builds all day');
HD('stages','Sleep stages (hypnogram)');
HD('deep','Deep sleep: repair');
HD('rem','REM: eyes dart, brain active');
HD('dreams','Why do we dream?');
HD('cycle','Cycles of about 90 minutes');
HD('clean','Your brain takes a bath');
HD('memory','Sleep saves your memories');
HD('screens','Problem 1: screens','#d9232a');
HD('caffeine','Problem 2: caffeine','#d9232a');
HD('room','Problem 3: your room','#d9232a');
HD('habits','Habits for better sleep','#2f9d62');
HD('nap','Naps: short is best');
HD('alarm','Why alarms feel awful');
HD('lack','Too little sleep');
HD('myth','Myths','#d9232a');
HD('close','Sleep well, live well','#2d7fd3');

const cam=[];const add=(n,k,z,w,dy)=>{const [x,y]=PC[k];const o={sc:S(n),x:x,y:y+(dy||0),z:z||0.95};if(w!=null)o.w=wi(S(n),w);cam.push(o)};
add('hook','hook',0.95);add('why','why',0.95);add('clock','clock',0.95);add('pressure','press',0.95);add('stages','stage',0.95);add('deep','deep',0.95);
add('rem','rem',0.95);add('dreams','rem',1.1,null,-60);add('cycle','cycle',0.95);add('clean','clean',0.95);add('memory','mem',0.95);add('screens','scr',0.95);
add('caffeine','caf',0.95);add('room','room',0.95);add('habits','hab',0.95);add('nap','nap',0.95);add('alarm','alarm',0.95);add('lack','lack',0.95);add('myth','myth',0.95);add('close','hook',0.9);
return {art,init,anim,cam,sfx:()=>[]};
};
