// Long video: how AI chatbots work.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','keyboard','prob','read','tokens','embed','net','dials','loop','attn','gen','temp','halluc','limits','feedback','dc','use','avoid','myth','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const LB=(n,w,x,y,txt,col)=>A({sc:S(n),w:wi(S(n),w),x,y,html:lbl(txt,col)});
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={hook:[0,0],kb:[2500,0],prob:[5000,0],read:[0,1400],tok:[2500,1400],emb:[5000,1400],net:[0,2800],dial:[2500,2800],loop:[5000,2800],attn:[0,4200],gen:[2500,4200],temp:[5000,4200],hal:[0,5600],lim:[2500,5600],fb:[5000,5600],dc:[0,7000],use:[2500,7000],avoid:[5000,7000],myth:[7500,7000]};
const P=(id,k,c1,c2,inner)=>{const [cx,cy]=PC[k];return R(cx,cy,panel(id,cx,cy,2200,1200,c1,c2,inner))};
const bub=(x,y,w,h,fill,tail)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${fill}"/>`;
const card=(x,y,w,h)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="#f5f1e6"/>`;

function art(){
 let s=BG;
 {const [cx,cy]=PC.hook;let h=`<rect x="${cx-720}" y="${cy-460}" width="1440" height="920" rx="40" fill="#f3f6fb" stroke="#9fb4cf" stroke-width="8"/><rect x="${cx-720}" y="${cy-460}" width="1440" height="100" rx="40" fill="#3b5f98"/>`+tx(cx,cy-392,'AI Chat',44,'#fff');
  h+=bub(cx+120,cy-300,560,110,'#2d7fd3')+tx(cx+400,cy-230,'Why is the sky blue?',40,'#fff','middle',700);
  h+=C(cx-640,cy-80,48,'#6fcf4a')+`<rect x="${cx-665}" y="${cy-100}" width="50" height="14" rx="7" fill="#fff"/>`+bub(cx-560,cy-190,1200,420,'#dfe7f2');
  h+=`<g id="d_hch"></g>`;s+=P('hk','hook','#1a2a47','#2a4066',h);}
 {const [cx,cy]=PC.kb;let h=`<rect x="${cx-270}" y="${cy-450}" width="540" height="900" rx="64" fill="#10131a" stroke="#cfd8e6" stroke-width="10"/><rect x="${cx-240}" y="${cy-410}" width="480" height="820" rx="40" fill="#f3f6fb"/>`;
  for(let r=0;r<3;r++)for(let c=0;c<8-r;c++)h+=`<rect x="${cx-228+c*58+r*29}" y="${cy+90+r*86}" width="48" height="70" rx="10" fill="#cfd8e6"/>`;
  h+=`<g id="d_kbg"></g>`;s+=P('kb','kb','#1f3052','#2d4574',h);}
 {const [cx,cy]=PC.prob;let h=tx(cx-430,cy-330,'The sky is',90,'#fff','start')+`<rect x="${cx+60}" y="${cy-405}" width="300" height="110" rx="18" fill="none" stroke="#ffd23f" stroke-width="8" stroke-dasharray="18 12"/>`;
  h+=`<g id="d_pbr"></g>`;s+=P('pr','prob','#1d2c4a','#2c4472',h);}
 {const [cx,cy]=PC.read;let h=`<rect x="${cx+100}" y="${cy-220}" width="440" height="440" rx="70" fill="#3b5f98" stroke="#9fc3ff" stroke-width="8"/>`+tx(cx+320,cy+290,'The model',44,'#fff');
  h+=`<g id="d_rdg"></g>`;s+=P('rd','read','#1b2a46','#2b4068',h);}
 {const [cx,cy]=PC.tok;let h=tx(cx,cy-270,'Learning science is fun',80,'#fff');h+=`<g id="d_tkg"></g>`;s+=P('tk','tok','#1d2c4a','#2c4472',h);}
 {const [cx,cy]=PC.emb;let h=`<rect x="${cx-900}" y="${cy-480}" width="1800" height="960" rx="30" fill="#10192e" opacity=".7"/><path d="M${cx-900} ${cy} H${cx+900} M${cx} ${cy-480} V${cy+480}" stroke="#3a4b6e" stroke-width="3"/>`;h+=`<g id="d_emg"></g>`;s+=P('em','emb','#17233d','#26385c',h);}
 {const [cx,cy]=PC.net;s+=P('nt','net','#1b2a46','#2b4068',`<g id="d_ntg"></g>`);}
 {const [cx,cy]=PC.dial;s+=P('dl','dial','#1f2f4a','#2f4668',`<g id="d_dlg"></g>`);}
 {const [cx,cy]=PC.loop;s+=P('lp','loop','#1d2c4a','#2c4472',`<g id="d_lpg"></g>`);}
 {const [cx,cy]=PC.attn;s+=P('at','attn','#1b2a46','#2b4068',`<g id="d_atg"></g>`);}
 {const [cx,cy]=PC.gen;s+=P('ge','gen','#1d2c4a','#2c4472',tx(cx,cy-300,'The answer is written one token at a time',50,'#fff')+`<g id="d_geg"></g>`);}
 {const [cx,cy]=PC.temp;s+=P('te','temp','#2a2438','#3d3454',`<g id="d_teg"></g>`);}
 {const [cx,cy]=PC.hal;let h=bub(cx-700,cy-420,820,100,'#2d7fd3')+tx(cx-290,cy-355,"Tell me about the book 'The Silent Comet'",34,'#fff','middle',700);h+=`<g id="d_hag"></g>`;s+=P('ha','hal','#2d2030','#47304a',h);}
 {const [cx,cy]=PC.lim;s+=P('li','lim','#1f2f4a','#2f4668',`<g id="d_lig"></g>`);}
 {const [cx,cy]=PC.fb;s+=P('fb','fb','#1d2c4a','#2c4472',`<g id="d_fbg"></g>`);}
 {const [cx,cy]=PC.dc;s+=P('dc','dc','#16203a','#243558',`<g id="d_dcg"></g>`);}
 {const [cx,cy]=PC.use;s+=P('us','use','#1f3a3a','#2e5757',`<g id="d_usg"></g>`);}
 {const [cx,cy]=PC.avoid;s+=P('av','avoid','#3a2430','#55354a',`<g id="d_avg"></g>`);}
 {const [cx,cy]=PC.myth;s+=P('my','myth','#2d2b3a','#443f5a',`<g id="d_myg"></g>`);}
 return s}

let G={};
function init(){['d_hch','d_kbg','d_pbr','d_rdg','d_tkg','d_emg','d_ntg','d_dlg','d_lpg','d_atg','d_geg','d_teg','d_hag','d_lig','d_fbg','d_dcg','d_usg','d_avg','d_myg'].forEach(k=>G[k]=document.getElementById(k))}
const REPLY=['The sky looks blue because sunlight','scatters off tiny air molecules, and blue','light scatters the most.'];
const stamp=(x,y,txt,col,u,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot||-8}) scale(${f1(2.2-1.2*easeOut(u))})" opacity="${u}"><rect x="-230" y="-60" width="460" height="120" rx="18" fill="none" stroke="${col}" stroke-width="12"/>${tx(0,28,txt,70,col)}</g>`;
function xcard(g,x,y,w,txt,u,w2){return `<g transform="translate(${x} ${y}) scale(${f1(easeOut(u))})" opacity="${u}">${card(0,0,w,300)}${tx(0,10,txt,w2||44,'#3a2c12','middle',800)}</g>`}

function anim(t){
 // hook: typed reply
 {const [cx,cy]=PC.hook;const nChars=Math.floor(clamp((t-SC[S('hook')].s-3)/(SC[S('hook')].e-SC[S('hook')].s-6))*95);let k=nChars,g='';
  REPLY.forEach((ln,i)=>{const sh=ln.slice(0,Math.max(0,Math.min(ln.length,k)));k-=ln.length;g+=tx(cx-520,cy-90+i*90,sh,40,'#1b2a46','start',600)});
  if(Math.sin(t*6)>0)g+=`<rect x="${cx+330}" y="${cy+130}" width="14" height="50" fill="#1b2a46"/>`;G.d_hch.innerHTML=g;}
 // keyboard
 {const [cx,cy]=PC.kb;const sets=[['morning','night','luck'],['you','job','idea']],ph=Math.floor((t/2.4)%2),u=(t/2.4)%1;let g=tx(cx-200,cy-300,ph?'Thank':'Good',80,'#1b2a46','start')+(Math.sin(t*6)>0?`<rect x="${cx+(ph?160:100)}" y="${cy-360}" width="8" height="80" fill="#2d7fd3"/>`:'');
  sets[ph].forEach((w,i)=>{const on=u>0.55&&i===0;g+=`<rect x="${cx-230+i*155}" y="${cy-190}" width="145" height="64" rx="14" fill="${on?'#ffd23f':'#dfe7f2'}"/>`+tx(cx-157+i*155,cy-146,w,30,'#1b2a46','middle',700)});
  G.d_kbg.innerHTML=g;}
 // probabilities
 {const [cx,cy]=PC.prob,p=easeOut(clamp((t-SC[S('prob')].s-2)/3)),W=[['blue',0.62,'#4aa3ff'],['clear',0.15,'#9fd0ff'],['dark',0.1,'#8f9bab'],['grey',0.08,'#b0b8c4'],['banana',0.002,'#f4d93a']];let g='';
  W.forEach(([w,v,col],i)=>{const y=cy-170+i*110;g+=tx(cx-760,y+30,w,48,'#fff','start')+`<rect x="${cx-480}" y="${y-10}" width="${f1(1100*v*p+4)}" height="64" rx="16" fill="${col}"/>`+tx(cx-470+1100*v*p+30,y+40,Math.round(v*100*p)+'%',40,'#fff','start')});
  const pk=clamp((t-Tn('prob','picks'))/0.8);if(pk>0)g+=tx(cx+210,cy-325-(1-easeOut(pk))*-0,'blue',90,'#4aa3ff','middle');G.d_pbr.innerHTML=g;}
 // reading
 {const [cx,cy]=PC.read;let g='';const cols=['#ffd23f','#6fcf4a','#ff7a3b','#8e44ad'],NM=['Books','Web','Code','News'];
  for(let i=0;i<14;i++){const u=((t*0.12+i/14)%1),y0=cy-380+rnd(i)*760,x=lerp(cx-1000,cx+110,easeIO(u)),y=lerp(y0,cy+(rnd(i+5)-.5)*200,easeIO(u));g+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(1-0.5*u)})" opacity="${u>0.95?0:1}"><rect x="-45" y="-60" width="90" height="120" rx="8" fill="#fff"/><rect x="-45" y="-60" width="90" height="26" rx="8" fill="${cols[i%4]}"/>${[0,1,2,3].map(k=>`<rect x="-32" y="${-20+k*20}" width="64" height="7" rx="3" fill="#9fb4cf"/>`).join('')}</g>`}
  for(let k=0;k<4;k++)g+=`<rect x="${cx-950}" y="${cy-440+k*60}" width="130" height="44" rx="22" fill="${cols[k]}"/>`+tx(cx-885,cy-409+k*60,NM[k],26,'#10131a');
  g+=`<circle cx="${cx+320}" cy="${cy}" r="${f1(260+14*Math.sin(t*4))}" fill="#6fa8ff" opacity=".18"/>`+tx(cx+320,cy+10,'Learns patterns',46,'#fff');G.d_rdg.innerHTML=g;}
 // tokens
 {const [cx,cy]=PC.tok;const PCS=['Learn','ing',' science',' is',' fun'],IDS=[4821,278,6204,318,1257],COL=['#ff7a3b','#ffd23f','#6fcf4a','#4aa3ff','#c18cff'];let g='',x=cx-620;
  PCS.forEach((w,i)=>{const wd=Math.max(150,w.length*42+50),u=easeOut(clamp((t-SC[S('tokens')].s-4-i*0.9)/0.5));g+=`<g opacity="${u}" transform="translate(0 ${f1((1-u)*30)})"><rect x="${x}" y="${cy-60}" width="${wd}" height="120" rx="20" fill="${COL[i]}"/>`+tx(x+wd/2,cy+18,w.replace(' ','·'),52,'#10131a')+`<rect x="${x}" y="${cy+150}" width="${wd}" height="90" rx="16" fill="#10192e"/>`+tx(x+wd/2,cy+212,IDS[i],44,'#ffe14d')+`</g>`;x+=wd+22});
  g+=tx(cx,cy+330,'Each token gets a number',48,'#fff');G.d_tkg.innerHTML=g;}
 // embeddings
 {const [cx,cy]=PC.emb;const GR=[[['cat',-450,-190],['dog',-300,-110],['lion',-520,-60]],[['apple',380,-120],['mango',520,-210],['banana',470,-30]],[['Delhi',-90,250],['Paris',90,170],['Tokyo',190,310]]],CO=['#ff9a3d','#6fcf4a','#4aa3ff'],TW=['cat','apple','delhi'];let g='';
  GR.forEach((grp,gi)=>{const u=easeOut(clamp((t-Tn('embed',TW[gi]))/0.8));if(u<=0)return;g+=`<ellipse cx="${cx+grp.reduce((a,p)=>a+p[1],0)/3}" cy="${cy+grp.reduce((a,p)=>a+p[2],0)/3}" rx="${f1(230*u)}" ry="${f1(150*u)}" fill="${CO[gi]}" opacity=".18"/>`;
   grp.forEach(([w,x,y],i)=>{const dx=Math.sin(t*0.9+i+gi)*10,dy=Math.cos(t*0.7+i)*8;g+=C(cx+x+dx,cy+y+dy,14,CO[gi],u)+tx(cx+x+dx,cy+y+dy-28,w,38,'#fff','middle',700)})});
  G.d_emg.innerHTML=g;}
 // neural network
 {const [cx,cy]=PC.net;let g='';const LX=[-720,-360,0,360,720];
  for(let l=0;l<4;l++)for(let a=0;a<6;a++)for(let b=0;b<6;b++)g+=`<path d="M${cx+LX[l]} ${cy-350+a*140} L${cx+LX[l+1]} ${cy-350+b*140}" stroke="#5f7fb8" stroke-width="2" opacity=".35"/>`;
  for(let i=0;i<30;i++){const l=i%4,a=Math.floor(rnd(i)*6),b=Math.floor(rnd(i+7)*6),u=((t*0.5+rnd(i+3))%1);g+=C(lerp(cx+LX[l],cx+LX[l+1],u),lerp(cy-350+a*140,cy-350+b*140,u),9,'#ffe14d',0.9)}
  for(let l=0;l<5;l++)for(let a=0;a<6;a++){const br=0.35+0.65*(0.5+0.5*Math.sin(t*3-l*1.3+a));g+=C(cx+LX[l],cy-350+a*140,30,mix('2d4a7a','ffe14d',br))}
  g+=tx(cx-720,cy+430,'Input',40,'#fff')+tx(cx+720,cy+430,'Next-token scores',40,'#fff');G.d_ntg.innerHTML=g;}
 // dials
 {const [cx,cy]=PC.dial;const act=clamp(sp('dials',t)*2);let g='';
  for(let r=0;r<3;r++)for(let c=0;c<6;c++){const i=r*6+c,x=cx-625+c*250,y=cy-250+r*230,a=(rnd(i)*4.4-2.2)+Math.sin(t*1.3+i)*0.6*act;g+=C(x,y,80,'#2b3550')+`<circle cx="${x}" cy="${y}" r="80" fill="none" stroke="#9fb4cf" stroke-width="8"/><path d="M${x} ${y} L${f1(x+Math.sin(a)*66)} ${f1(y-Math.cos(a)*66)}" stroke="#ffd23f" stroke-width="10" stroke-linecap="round"/>`}
  g+=tx(cx,cy+420,'Billions of tiny dials',58,'#fff');G.d_dlg.innerHTML=g;}
 // training loop
 {const [cx,cy]=PC.loop;const N=[['1 Guess',-380,-80,'#ff9a3d'],['2 Check',380,-80,'#6fcf4a'],['3 Nudge',0,320,'#4aa3ff']],ph=Math.floor((t/1.6)%3);let g='';
  g+=`<path d="M${cx-170} ${cy-80} H${cx+170} M${cx+330} ${cy-10} L${cx+80} ${cy+250} M${cx-80} ${cy+250} L${cx-330} ${cy-10}" stroke="#9fb4cf" stroke-width="10" stroke-dasharray="20 14" fill="none"/>`;
  N.forEach(([w,x,y,col],i)=>{g+=C(cx+x,cy+y,i===ph?150:120,col,i===ph?1:0.55)+tx(cx+x,cy+y+14,w,46,'#10131a')});
  g+=tx(cx,cy-300,ph===0?'The sky is... green':ph===1?'Wrong! It was: blue':'Dials nudged a little',56,ph===1?'#ff6a6a':'#fff');
  const L=sp('loop',t);let pts='';for(let i=0;i<=40;i++){const u=i/40;pts+=`${i?'L':'M'}${f1(cx+600+u*380*L)} ${f1(cy+430-300*(1-0.8*u*L)+Math.sin(u*40)*8*(1-u))} `}
  g+=`<path d="${pts}" stroke="#ff6a6a" stroke-width="8" fill="none"/>`+tx(cx+780,cy+500,'Mistakes go down',32,'#fff');G.d_lpg.innerHTML=g;}
 // attention
 {const [cx,cy]=PC.attn;const W=['The','animal','did','not','cross','the','street','because','it','was','tired'],X=W.map((w,i)=>cx-950+i*190);let g='';
  const u=easeOut(clamp((t-Tn('attn','it'))/1)),WT_=[[1,0.95],[10,0.45],[6,0.18],[4,0.1]];
  WT_.forEach(([j,wgt])=>{g+=`<path d="M${X[8]} ${cy-30} Q${(X[8]+X[j])/2} ${f1(cy-30-Math.abs(X[8]-X[j])*0.55)} ${X[j]} ${cy-30}" stroke="#ffd23f" stroke-width="${f1(26*wgt*u)}" fill="none" stroke-linecap="round" opacity="${0.9*u}"/>`});
  W.forEach((w,i)=>{g+=tx(X[i],cy+40,w,i===8||i===1?50:44,i===8?'#ffd23f':i===1?'#6fcf4a':'#fff')});
  g+=tx(cx,cy+300,'"it" pays most attention to "animal"',54,'#fff');G.d_atg.innerHTML=g;}
 // generating
 {const [cx,cy]=PC.gen;const TK=['The',' sky',' is',' blue',' because',' sunlight',' scatters','.'],n=Math.floor(clamp((t-SC[S('gen')].s-3)/(SC[S('gen')].e-SC[S('gen')].s-6))*TK.length*1.001);let g='',x=cx-1000;
  TK.forEach((w,i)=>{const wd=w.length*34+70;if(i<n){g+=`<rect x="${x}" y="${cy-60}" width="${wd}" height="110" rx="20" fill="#4aa3ff"/>`+tx(x+wd/2,cy+16,w.replace(' ','·'),46,'#10131a')}x+=wd+14});
  if(n<TK.length){g+=`<rect x="${x}" y="${cy-60}" width="130" height="110" rx="20" fill="none" stroke="#ffd23f" stroke-width="8" stroke-dasharray="14 10"/>`+tx(x+65,cy+20,'?',64,'#ffd23f');for(let i=0;i<4;i++){const h=[160,90,50,20][i]*(0.6+0.4*Math.abs(Math.sin(t*5+i)));g+=`<rect x="${x+10+i*28}" y="${f1(cy-80-h)}" width="20" height="${f1(h)}" rx="6" fill="#ffd23f"/>`}}
  g+=tx(cx,cy+240,'Predict, add, repeat',60,'#ffe14d');G.d_geg.innerHTML=g;}
 // temperature
 {const [cx,cy]=PC.temp;const k=clamp((t-SC[S('temp')].s-2)/(SC[S('temp')].e-SC[S('temp')].s-4));let g='';
  g+=`<defs><linearGradient id="tgr" x1="0" x2="1"><stop offset="0" stop-color="#4aa3ff"/><stop offset="1" stop-color="#ff4b4b"/></linearGradient></defs><rect x="${cx-600}" y="${cy-300}" width="1200" height="40" rx="20" fill="url(#tgr)"/>`+C(cx-600+1200*k,cy-280,40,'#fff')+tx(cx-600,cy-340,'Low: safe',40,'#7bb6e8','start')+tx(cx+600,cy-340,'High: adventurous',40,'#ff8a8a','end');
  const TX=['The sky is blue.','The sky is blue and clear.','The sky is a huge blue ocean flipped upside down!'],AC=k<0.33?0:k<0.66?1:2;
  TX.forEach((w,i)=>{const y=cy-70+i*190;g+=`<rect x="${cx-700}" y="${y-70}" width="1400" height="140" rx="30" fill="${i===AC?'#f5f1e6':'#3a3d55'}"/>`+tx(cx,y+16,w,i===2?44:50,i===AC?'#3a2c12':'#8f9bab','middle',700)});G.d_teg.innerHTML=g;}
 // hallucination
 {const [cx,cy]=PC.hal;let g='';const u=clamp((t-SC[S('halluc')].s-2)/1);
  g+=`<g opacity="${u}">`+bub(cx-720,cy-280,1000,420,'#dfe7f2')+['Sure! It was written in 1987 by','Dr. R. Mehta and won a national','prize. It tells the story of...'].map((l,i)=>tx(cx-660,cy-190+i*90,l,40,'#1b2a46','start',600)).join('')+`</g>`;
  const f=easeOut(clamp((t-Tn('halluc','sounds')+0.5)/1.2)),v=0.12;
  g+=tx(cx+650,cy-300,'Sounds right',38,'#fff')+`<rect x="${cx+560}" y="${cy-260}" width="180" height="560" rx="20" fill="#10192e"/><rect x="${cx+560}" y="${f1(cy+300-540*f)}" width="180" height="${f1(540*f)}" rx="20" fill="#6fcf4a"/>`+tx(cx+900-100,cy-300,'',10,'#fff');
  g+=tx(cx+920,cy-300,'Verified',38,'#fff')+`<rect x="${cx+830}" y="${cy-260}" width="180" height="560" rx="20" fill="#10192e"/><rect x="${cx+830}" y="${f1(cy+300-540*v)}" width="180" height="${f1(540*v)}" rx="20" fill="#ff4b4b"/>`;
  const sk=clamp((t-Tn('halluc','invents'))/0.4);if(sk>0)g+=stamp(cx-250,cy+330,'MADE UP?','#ff4b4b',sk);G.d_hag.innerHTML=g;}
 // limits
 {const [cx,cy]=PC.lim;const k=clamp((t-SC[S('limits')].s-2)/(SC[S('limits')].e-SC[S('limits')].s-5));let g='';
  for(let i=0;i<9;i++){const y=cy-380+i*90,vis=i/9<k*1.1-0.2?0.3:1;g+=`<rect x="${cx-900}" y="${y}" width="${i%2?480:560}" height="64" rx="20" fill="${i%2?'#2d7fd3':'#dfe7f2'}" opacity="${vis}" transform="translate(${i%2?80:0} 0)"/>`}
  const wy=cy-380+k*340;g+=`<rect x="${cx-930}" y="${f1(wy)}" width="650" height="${400}" rx="20" fill="none" stroke="#ffd23f" stroke-width="8"/>`+tx(cx-600,cy+470,'Context window',44,'#ffd23f');
  g+=`<rect x="${cx+140}" y="${cy-350}" width="340" height="300" rx="26" fill="#dfe7f2"/><rect x="${cx+560}" y="${cy-350}" width="340" height="300" rx="26" fill="#dfe7f2"/>`+tx(cx+310,cy-190,'Chat 1',44,'#1b2a46')+tx(cx+730,cy-190,'Chat 2',44,'#1b2a46')+`<path d="M${cx+500} ${cy-200} h40" stroke="#ff4b4b" stroke-width="12"/>`+cross(cx+520,cy-200,36,'#ff4b4b',14)+tx(cx+610,cy+20,'Usually no shared memory',42,'#fff')+tx(cx+610,cy+150,'Knows only its training',42,'#ffd23f');G.d_lig.innerHTML=g;}
 // feedback
 {const [cx,cy]=PC.fb;const pk=easeOut(clamp((t-Tn('feedback','mark'))/0.8));let g='';
  g+=`<g transform="translate(${cx-420} ${cy-60})">${card(0,0,680,380)}${tx(0,-80,'Answer A',44,'#3a2c12')}<rect x="-250" y="-30" width="500" height="22" rx="11" fill="#c9c2b0"/><rect x="-250" y="14" width="380" height="22" rx="11" fill="#c9c2b0"/><rect x="-250" y="58" width="450" height="22" rx="11" fill="#c9c2b0"/></g>`;
  g+=`<g transform="translate(${cx+420} ${cy-60})">${card(0,0,680,380)}${tx(0,-80,'Answer B',44,'#3a2c12')}<rect x="-250" y="-30" width="500" height="22" rx="11" fill="#9ed67f"/><rect x="-250" y="14" width="440" height="22" rx="11" fill="#9ed67f"/><rect x="-250" y="58" width="500" height="22" rx="11" fill="#9ed67f"/></g>`;
  g+=`<path d="M${cx+480} ${cy+200} l60 70 l120 -140" stroke="#4caf50" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${pk}"/>`+cross(cx-380,cy+190,60,'#ff4b4b',22).replace('<path','<path opacity="'+pk+'"');
  g+=person(cx,cy+520,1.6,{coat:'#3b6ea5'})+tx(cx+330,cy+470,'Person picks the better answer',40,'#fff','start');G.d_fbg.innerHTML=g;}
 // data centre
 {const [cx,cy]=PC.dc;let g='';
  for(let r=0;r<5;r++){const x=cx-780+r*300;g+=`<rect x="${x}" y="${cy-380}" width="220" height="760" rx="16" fill="#2b3550" stroke="#5f7fb8" stroke-width="6"/>`;
   for(let k=0;k<12;k++){const on=Math.sin(t*(3+rnd(r*12+k)*5)+k)>0;g+=`<rect x="${x+20}" y="${cy-350+k*62}" width="180" height="46" rx="8" fill="#10192e"/>`+C(x+50,cy-327+k*62,8,on?'#6fcf4a':'#2d4a3a')+C(x+80,cy-327+k*62,8,Math.sin(t*4+k+r)>0.5?'#ffd23f':'#4a4326')}
   g+=`<g transform="translate(${x+110} ${cy-430}) rotate(${f1(t*300)})"><circle r="40" fill="#10192e"/>${[0,120,240].map(a=>`<path d="M0 0 Q20 -10 34 -30 Q8 -30 0 0Z" fill="#8fd3ff" transform="rotate(${a})"/>`).join('')}</g>`}
  g+=`<path d="M${cx-900} ${cy+450} H${cx+900}" stroke="#4aa3ff" stroke-width="14" stroke-dasharray="30 18" stroke-dashoffset="${f1(-t*60)}"/>`+tx(cx-300,cy+540,'Cooling water',36,'#8fd3ff','middle')+tx(cx+380,cy+540,'Electricity',36,'#ffd23f','middle');G.d_dcg.innerHTML=g;}
 // use well
 {const [cx,cy]=PC.use;const TT=['specific','context','step','check'],NM=['Be specific','Give context (class, goal)','Ask for step by step','Verify important facts'];let g='';
  TT.forEach((w,i)=>{const u=easeOut(clamp((t-Tn('use',w))/0.5)),y=cy-330+i*210;g+=`<g opacity="${u}" transform="translate(${f1((1-u)*-120)} 0)"><rect x="${cx-800}" y="${y-70}" width="1600" height="140" rx="30" fill="#f5f1e6"/>`+C(cx-710,y,44,'#4caf50')+`<path d="M${cx-735} ${y} l18 20 l36 -40" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`+tx(cx-630,y+18,NM[i],54,'#3a2c12','start')+`</g>`});G.d_usg.innerHTML=g;}
 // avoid
 {const [cx,cy]=PC.avoid;const TT=['passwords','medical','homework'],NM=['Passwords, OTP, bank details','Blind trust: health, law, money','Copying your homework'];let g='';
  TT.forEach((w,i)=>{const u=easeOut(clamp((t-Tn('avoid',w))/0.5)),y=cy-250+i*260;g+=`<g opacity="${u}" transform="translate(${f1((1-u)*120)} 0)"><rect x="${cx-800}" y="${y-90}" width="1600" height="180" rx="30" fill="#f5f1e6"/>`+C(cx-690,y,52,'#e5483a')+cross(cx-690,y,22,'#fff',12)+tx(cx-610,y+18,NM[i],54,'#3a2c12','start')+`</g>`});G.d_avg.innerHTML=g;}
 // myths
 {const [cx,cy]=PC.myth;const TT=['alive','copy','always'],NM=['"It is alive"','"It copy-pastes"','"It is always right"'];let g='';
  TT.forEach((w,i)=>{const u=easeOut(clamp((t-Tn('myth',w))/0.4)),x=cx-640+i*640;g+=card(x,cy-20,560,560)+tx(x,cy-20,NM[i],i===1?42:46,'#3a2c12')+`<g transform="translate(${x} ${cy-20}) scale(${f1(2.3-1.3*u)})" opacity="${u*0.8}">${cross(0,0,150,'#ff4b4b',28)}</g>`});G.d_myg.innerHTML=g;}
}

// ================= LABELS =================
HD('hook','How AI chatbots work');
HD('keyboard','Think: phone keyboard suggestions');
HD('prob','A next-word predictor');
HD('read','Training: reading lots of text');
HD('tokens','Step 1: tokens');
HD('embed','Step 2: a map of meaning');
LB('embed','similar',5000,1650,'Similar meaning = close together','#ffd23f');
HD('net','Step 3: neural network');
HD('dials','Billions of dials (parameters)');
HD('loop','Training = guess, check, nudge');
HD('attn','Attention: what matters?');
HD('gen','Writing the answer');
HD('temp','Temperature: safe vs adventurous');
HD('halluc','Warning: hallucinations','#d9232a');
HD('limits','Its limits');
HD('feedback','Human feedback');
HD('dc','Where it runs: data centres');
HD('use','How to use it well');
HD('avoid','What to avoid','#d9232a');
HD('myth','Myths','#d9232a');
HD('close','Now you know how it works','#2d7fd3');

// ================= CAMERA =================
const cam=[];const add=(n,k,z,w,dy)=>{const [x,y]=PC[k];const o={sc:S(n),x:x,y:y+(dy||0),z:z||0.95};if(w!=null)o.w=wi(S(n),w);cam.push(o)};
add('hook','hook',0.95);add('hook','hook',1.2,'millions'===0?null:'poems',0);
add('keyboard','kb',1.0);add('prob','prob',0.95);add('read','read',0.95);add('tokens','tok',0.95);add('embed','emb',0.95);
add('net','net',0.9);add('dials','dial',0.95);add('loop','loop',0.95);add('attn','attn',0.95);add('gen','gen',0.95);add('temp','temp',0.95);
add('halluc','hal',0.95);add('limits','lim',0.95);add('feedback','fb',0.95);add('dc','dc',0.9);add('use','use',0.95);add('avoid','avoid',0.95);add('myth','myth',0.95);add('close','hook',0.9);
return {art,init,anim,cam,sfx:()=>[]};
};
