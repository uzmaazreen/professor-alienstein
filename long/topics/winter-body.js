// Long video: what winter does to your body. One board of panels, one camera that flies between them.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','core','sensor','vessels','pins','goose','shiver','brown','pee','sick','adv1','adv2','sleepy','joints','nose','skin','frost','layers','habits','alcohol','warn','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const LB=(n,w,x,y,txt,col)=>A({sc:S(n),w:wi(S(n),w),x,y,html:lbl(txt,col)});
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={hook:[0,0],core:[2500,0],sensor:[5000,0],vessels:[0,1400],goose:[2500,1400],shiver:[5000,1400],brown:[0,2800],pee:[2500,2800],virus:[5000,2800],room:[0,4200],sleep:[2500,4200],joint:[5000,4200],nose:[0,5600],skin:[2500,5600],frost:[5000,5600],layers:[0,7000],habits:[2500,7000],alc:[5000,7000],warn:[7500,7000]};
const warmAt=t=>t<SC[S('close')].s?0:clamp((t-SC[S('close')].s)/6);

function art(){
 let s=BG;
 // ---- hook: cold street ----
 {const [cx,cy]=PC.hook;let h='';
  h+=C(cx-700,cy-300,70,'#e9eef5',0.8);
  h+=`<rect x="${cx-1100}" y="${cy+300}" width="2200" height="400" fill="#eef4fa"/>`;
  for(let i=0;i<5;i++){const x=cx-950+i*430;h+=`<path d="M${x} ${cy+300} v-260 m0 90 l-70 -70 m70 20 l60 -60 m-60 120 l-50 -40" stroke="#3a3d4a" stroke-width="14" stroke-linecap="round" fill="none"/>`}
  h+=`<rect id="hwm" x="${cx-1100}" y="${cy-600}" width="2200" height="1200" fill="#ffb347" opacity="0"/>`;
  h+=`<g id="hsn"></g><g id="hbr"></g><g id="hper"></g><g id="hth"></g>`;
  s+=R(cx,cy,panel('hk',cx,cy,2200,1200,'#5a7ba6','#c9d9ea',h));}
 // ---- core ----
 {const [cx,cy]=PC.core;let h='';
  h+=`<defs><radialGradient id="cgl"><stop offset="0" stop-color="#ffb347"/><stop offset=".6" stop-color="#ff6a3b" stop-opacity=".6"/><stop offset="1" stop-color="#ff6a3b" stop-opacity="0"/></radialGradient></defs>`;
  h+=C(cx,cy-330,100,'#4f78b4')+`<rect x="${cx-140}" y="${cy-220}" width="280" height="400" rx="100" fill="#4f78b4"/><rect x="${cx-215}" y="${cy-210}" width="60" height="330" rx="30" fill="#4f78b4"/><rect x="${cx+155}" y="${cy-210}" width="60" height="330" rx="30" fill="#4f78b4"/><rect x="${cx-90}" y="${cy+150}" width="75" height="360" rx="34" fill="#4f78b4"/><rect x="${cx+15}" y="${cy+150}" width="75" height="360" rx="34" fill="#4f78b4"/>`;
  h+=`<circle id="cglow" cx="${cx}" cy="${cy-40}" r="230" fill="url(#cgl)"/>`;
  h+=`<rect x="${cx-780}" y="${cy-300}" width="60" height="520" rx="30" fill="#fff" stroke="#10131a" stroke-width="6"/><circle cx="${cx-750}" cy="${cy+250}" r="62" fill="#ff4b4b" stroke="#10131a" stroke-width="6"/><rect x="${cx-766}" y="${cy-280}" width="32" height="520" rx="16" fill="#ff4b4b"/>`+tx(cx-750,cy-340,'37°C',70,'#fff');
  h+=`<g id="carr"></g>`;
  s+=R(cx,cy,panel('co',cx,cy,2200,1200,'#0f2038','#1c3558',h));}
 // ---- sensor -> brain ----
 {const [cx,cy]=PC.sensor;let h='';
  h+=`<rect x="${cx-1000}" y="${cy-120}" width="750" height="360" fill="#e58f8f"/><rect x="${cx-1000}" y="${cy-200}" width="750" height="90" fill="#e6b48f"/>`;
  for(let i=0;i<5;i++){const x=cx-880+i*140;h+=C(x,cy-205,26,'#7bb6e8')+`<path d="M${x-14} ${cy-205} h28 M${x-7} ${cy-217} l14 24 M${x+7} ${cy-217} l-14 24" stroke="#fff" stroke-width="4"/>`}
  h+=`<path d="M${cx-600} ${cy-120} V${cy+100} H${cx+300} L${cx+550} ${cy}" stroke="#ffd23f" stroke-width="12" fill="none" stroke-linejoin="round" opacity=".75"/>`;
  h+=`<ellipse cx="${cx+700}" cy="${cy-20}" rx="270" ry="210" fill="#f2a6b8" stroke="#c9738b" stroke-width="8"/><path d="M${cx+560} ${cy-80} q60 -60 120 0 t120 0 M${cx+560} ${cy+20} q60 50 120 0 t120 0" stroke="#d7849a" stroke-width="8" fill="none"/>`;
  h+=`<g id="ssg"></g>`;
  s+=R(cx,cy,panel('se',cx,cy,2200,1200,'#15233d','#243a5e',h));}
 // ---- vessels ----
 {const [cx,cy]=PC.vessels;let h='';
  h+=`<rect x="${cx-1050}" y="${cy-300}" width="1250" height="900" fill="#e7a58f"/><rect x="${cx-1050}" y="${cy-300}" width="1250" height="70" fill="#f0c3a6"/>`;
  
  h+=`<g id="vtube"></g><g id="vspark"></g><g id="vhand"></g>`;
  s+=R(cx,cy,panel('ve',cx,cy,2200,1200,'#3a2530','#5a3440',h));}
 // ---- goosebumps ----
 {const [cx,cy]=PC.goose;let h='';
  h+=`<rect x="${cx-1000}" y="${cy+100}" width="1600" height="500" fill="#e58f8f"/><rect x="${cx-1000}" y="${cy+70}" width="1600" height="32" fill="#f0c3a6"/>`;
  h+=`<g id="gcon"></g>`;
  s+=R(cx,cy,panel('go',cx,cy,2200,1200,'#2a3a55','#3a4f72',h));}
 // ---- shivering ----
 {const [cx,cy]=PC.shiver;let h='';
  h+=`<rect x="${cx+790}" y="${cy-300}" width="60" height="560" rx="30" fill="#fff" stroke="#10131a" stroke-width="6"/>`;
  h+=`<g id="sbx"></g>`;
  s+=R(cx,cy,panel('sh',cx,cy,2200,1200,'#2a3140','#3b4560',h));}
 // ---- brown fat ----
 {const [cx,cy]=PC.brown;let h='';
  h+=C(cx-450,cy,230,'#f6e7a6')+C(cx-450,cy,170,'#fff3c4')+C(cx-540,cy-60,26,'#c9a85a')+tx(cx-450,cy+330,'White fat: stores energy',40,'#fff');
  h+=C(cx+450,cy,230,'#8a4b2a')+tx(cx+450,cy+330,'Brown fat: burns it as heat',40,'#fff');
  h+=`<g id="bwv"></g>`;
  s+=R(cx,cy,panel('br',cx,cy,2200,1200,'#2d2433','#43334b',h));}
 // ---- kidneys / bladder ----
 {const [cx,cy]=PC.pee;let h='';
  h+=C(cx,cy-330,100,'#4f78b4')+`<rect x="${cx-170}" y="${cy-220}" width="340" height="560" rx="110" fill="#3b5f98"/><rect x="${cx-250}" y="${cy-210}" width="60" height="420" rx="30" fill="#3b5f98"/><rect x="${cx+190}" y="${cy-210}" width="60" height="420" rx="30" fill="#3b5f98"/>`;
  h+=`<ellipse cx="${cx-90}" cy="${cy-30}" rx="40" ry="70" fill="#b0524a" transform="rotate(15 ${cx-90} ${cy-30})"/><ellipse cx="${cx+90}" cy="${cy-30}" rx="40" ry="70" fill="#b0524a" transform="rotate(-15 ${cx+90} ${cy-30})"/>`;
  h+=`<circle cx="${cx}" cy="${cy+210}" r="90" fill="none" stroke="#e9eef5" stroke-width="8"/>`;
  h+=`<g id="pbd"></g>`;
  s+=R(cx,cy,panel('pe',cx,cy,2200,1200,'#1f2f4a','#2c4468',h));}
 // ---- nose lining / viruses ----
 {const [cx,cy]=PC.virus;let h='';
  h+=`<rect x="${cx-1050}" y="${cy+250}" width="2100" height="400" fill="#e58f8f"/>`;
  h+=`<g id="vcil"></g><g id="vvir"></g>`;
  s+=R(cx,cy,panel('vi',cx,cy,2200,1200,'#1e2b44','#2d4064',h));}
 // ---- closed room ----
 {const [cx,cy]=PC.room;let h='';
  h+=`<rect x="${cx-1000}" y="${cy-380}" width="2000" height="860" fill="#7a6552"/><rect x="${cx-1000}" y="${cy-470}" width="2000" height="90" fill="#bcd6ee"/>`;
  h+=C(cx+620,cy-430,36,'#fff1a8')+`<rect x="${cx-300}" y="${cy-480}" width="600" height="110" fill="#9fd0ff" stroke="#e9eef5" stroke-width="12"/><path d="M${cx} ${cy-480} v110" stroke="#e9eef5" stroke-width="10"/>`;
  h+=`<g id="rpt"></g>`;
  s+=R(cx,cy,panel('ro',cx,cy,2200,1200,'#2b2f45','#3c4163',h));}
 // ---- sleepy ----
 {const [cx,cy]=PC.sleep;let h='';
  h+=`<path d="M${cx-900} ${cy-60} A330 330 0 0 1 ${cx-240} ${cy-60}" stroke="#ffd23f" stroke-width="8" fill="none" stroke-dasharray="20 14"/><path d="M${cx-900} ${cy-60} A190 190 0 0 1 ${cx-520} ${cy-60}" stroke="#6fb0ff" stroke-width="8" fill="none" stroke-dasharray="20 14"/>`;
  h+=tx(cx-570,cy-420,'Summer',40,'#ffd23f')+tx(cx-710,cy-170,'Winter',40,'#6fb0ff')+`<rect x="${cx-900}" y="${cy+60}" width="560" height="50" rx="25" fill="#ffd23f"/><rect x="${cx-900}" y="${cy+170}" width="400" height="50" rx="25" fill="#6fb0ff"/>`+tx(cx-620,cy+150,'14 hours of light',32,'#10131a')+tx(cx-700,cy+260,'10 hours of light',32,'#10131a');
  h+=`<g id="slp"></g>`;
  s+=R(cx,cy,panel('sl',cx,cy,2200,1200,'#1a2540','#2a3a60',h));}
 // ---- joints ----
 {const [cx,cy]=PC.joint;let h='';
  h+=`<rect x="${cx-70}" y="${cy-500}" width="140" height="450" rx="50" fill="#e8dcc0"/><rect x="${cx-70}" y="${cy+90}" width="140" height="450" rx="50" fill="#e8dcc0"/>`;
  h+=`<g id="jnt"></g>`;
  s+=R(cx,cy,panel('jo',cx,cy,2200,1200,'#2a2438','#3d3454',h));}
 // ---- runny nose ----
 {const [cx,cy]=PC.nose;let h='';
  h+=`<path d="M${cx-620} ${cy+350} L${cx-560} ${cy-120} H${cx-340} L${cx-280} ${cy+350}Z" fill="#cfe6f6" opacity=".4" stroke="#e9eef5" stroke-width="6"/><rect x="${cx-540}" y="${cy+20}" width="80" height="80" rx="14" fill="#fff" opacity=".7" transform="rotate(12 ${cx-500} ${cy+60})"/><rect x="${cx-440}" y="${cy+100}" width="80" height="80" rx="14" fill="#fff" opacity=".7" transform="rotate(-10 ${cx-400} ${cy+140})"/>`;
  h+=`<ellipse cx="${cx+450}" cy="${cy+50}" rx="170" ry="200" fill="#e7b496"/><ellipse cx="${cx+385}" cy="${cy+170}" rx="40" ry="26" fill="#3a2020"/><ellipse cx="${cx+515}" cy="${cy+170}" rx="40" ry="26" fill="#3a2020"/>`;
  h+=`<g id="nsb"></g>`;
  s+=R(cx,cy,panel('no',cx,cy,2200,1200,'#25304a','#34456a',h));}
 // ---- dry skin ----
 {const [cx,cy]=PC.skin;let h='';
  h+=`<rect x="${cx-700}" y="${cy+100}" width="1400" height="450" fill="#e58f8f"/><rect x="${cx-700}" y="${cy+100}" width="1400" height="80" fill="#f0c3a6"/>`;
  h+=`<g id="skn"></g>`;
  s+=R(cx,cy,panel('sk',cx,cy,2200,1200,'#2e3550','#46507a',h));}
 // ---- frostbite ----
 {const [cx,cy]=PC.frost;let h='';
  h+=`<g id="fng"></g>`;
  s+=R(cx,cy,panel('fr',cx,cy,2200,1200,'#233047','#33496b',h));}
 // ---- layers ----
 {const [cx,cy]=PC.layers;let h='';
  h+=`<rect x="${cx+40}" y="${cy-450}" width="320" height="900" fill="#e7a58f"/>`+tx(cx+200,cy-480,'Your skin',38,'#fff');
  h+=`<g id="lyr"></g>`;
  s+=R(cx,cy,panel('la',cx,cy,2200,1200,'#2b3550','#3d4a70',h));}
 // ---- habits ----
 {const [cx,cy]=PC.habits;s+=R(cx,cy,panel('ha',cx,cy,2200,1200,'#2f3b55','#42537a','<g id="hbt"></g>'));}
 // ---- alcohol ----
 {const [cx,cy]=PC.alc;s+=R(cx,cy,panel('al',cx,cy,2200,1200,'#2a2438','#40355a','<g id="alcg"></g>'));}
 // ---- warning ----
 {const [cx,cy]=PC.warn;s+=R(cx,cy,panel('wa',cx,cy,2200,1200,'#2d2b3a','#443f5a','<g id="wrn"></g>'));}
 return s}

let G={};
function init(){['hsn','hbr','hth','hwm','hper','cglow','carr','ssg','vtube','vhand','vspark','gcon','sbx','bwv','pbd','vcil','vvir','rpt','slp','jnt','nsb','skn','fng','lyr','hbt','alcg','wrn'].forEach(k=>G[k]=document.getElementById(k))}

const PV=[[-1000,1330],[-700,1470],[-350,1330],[0,1470],[200,1400]];
const VAL=[[0,1,2],[3,4,5],[6,7,8]];
function virus(x,y,r,o){let s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="#6fcf4a" opacity="${o}"/>`;for(let k=0;k<10;k++){const a=k/10*6.283;s+=`<path d="M${f1(x+Math.cos(a)*r)} ${f1(y+Math.sin(a)*r)} l${f1(Math.cos(a)*r*0.55)} ${f1(Math.sin(a)*r*0.55)}" stroke="#3f9b2a" stroke-width="5" opacity="${o}"/>`}return s}
function star(x,y,r,col){let s='';for(let k=0;k<6;k++){const a=k/6*6.283;s+=`M${f1(x)} ${f1(y)} l${f1(Math.cos(a)*r)} ${f1(Math.sin(a)*r)} `}return `<path d="${s}" stroke="${col}" stroke-width="6" stroke-linecap="round" fill="none"/>`}

function anim(t){
 // ===== hook =====
 {const [cx,cy]=PC.hook,wm=warmAt(t),cold=1-wm*0.85;G.hwm.setAttribute('opacity',wm*0.45);
  let sn='';for(let i=0;i<70;i++){const x=cx-1080+((rnd(i)*2160+t*30)%2160),y=cy-590+((rnd(i+3)*1180+t*(80+rnd(i)*60))%1180);sn+=C(x,y,3+rnd(i+5)*4,'#fff',0.8*cold)}G.hsn.innerHTML=sn;
  let br='';for(let i=0;i<6;i++){const u=((t*0.5+i/6)%1);br+=C(cx-90+u*240,cy-150-u*40,14+u*30,'#fff',0.7*(1-u)*cold)}G.hbr.innerHTML=br;
  const sh=Math.sin(t*40)*3*cold;G.hper.innerHTML=person(cx-150+sh,cy+330,2.4,{arm:8+cold*10,coat:'#d9533b'});
  const temp=lerp(6,24,wm),hh=420*clamp((temp+10)/45);
  G.hth.innerHTML=`<rect x="${cx+770}" y="${cy-200}" width="60" height="440" rx="30" fill="#fff" stroke="#10131a" stroke-width="6"/><circle cx="${cx+800}" cy="${cy+270}" r="60" fill="#ff4b4b" stroke="#10131a" stroke-width="6"/><rect x="${cx+784}" y="${f1(cy+240-hh)}" width="32" height="${f1(hh+30)}" rx="16" fill="#ff4b4b"/>`+tx(cx+800,cy-240,Math.round(temp)+'°C',62,'#fff');}
 // ===== core =====
 {const [cx,cy]=PC.core;G.cglow.setAttribute('opacity',0.7+0.2*Math.sin(t*3));
  let a='';for(let i=0;i<6;i++){const u=((t*0.5+i/6)%1),y=cy-300+i*110;a+=`<g opacity="${(1-u).toFixed(2)}">${arrowR(cx-1000+u*620,y,'#7bb6e8',9,70)}</g><g opacity="${(1-u).toFixed(2)}">${arrowR(cx+1000-u*620,y,'#7bb6e8',9,-70)}</g>`}G.carr.innerHTML=a;}
 // ===== sensor -> brain =====
 {const [cx,cy]=PC.sensor,P=[[cx-600,cy-120],[cx-600,cy+100],[cx+300,cy+100],[cx+550,cy]];let g='';
  for(let k=0;k<4;k++){const u=((t*0.3+k/4)%1),[x,y]=along(P,u);g+=C(x,y,18,'#ffe14d')+C(x,y,32,'#ffe14d',0.3)}
  g+=C(cx+700,cy+40,38+14*Math.sin(t*5),'#ffd23f',0.9)+C(cx+700,cy+40,70+10*Math.sin(t*5),'#ffd23f',0.25);G.ssg.innerHTML=g;}
 // ===== vessels (and pins & needles) =====
 {const [cx,cy]=PC.vessels;const vc=t<SC[S('vessels')].s?0:t<SC[S('pins')].s?sp('vessels',t):1-clamp((t-Tn('pins','rushes'))/2.5);
  const w=lerp(56,14,vc);const pts=PV.map(p=>[cx+p[0],cy+p[1]-1400+0]);
  let d=`M${pts[0][0]} ${pts[0][1]}`;for(let i=1;i<pts.length;i++)d+=` L${pts[i][0]} ${pts[i][1]}`;
  let g=`<path d="${d}" stroke="#a3253a" stroke-width="${f1(w+14)}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" stroke="#d9435c" stroke-width="${f1(w)}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  for(let i=0;i<22;i++){const u=((t*(0.22-0.15*vc)+i/22)%1),[x,y]=along(pts,u);g+=C(x,y,w*0.28,'#ff8a9b')}
  g+=tx(cx-500,cy+420,vc>0.5?'Narrow vessels: little warm blood':'Wide vessels: lots of warm blood',44,'#fff');G.vtube.innerHTML=g;
  const col=mix('f2b5a0','a9c6ea',vc);let hd=`<g transform="translate(${cx+640} ${cy})"><rect x="-110" y="-60" width="220" height="230" rx="50" fill="${col}"/>`;for(let i=0;i<4;i++)hd+=`<rect x="${-110+i*56}" y="-230" width="48" height="190" rx="24" fill="${col}"/>`;hd+=`<ellipse cx="-125" cy="40" rx="46" ry="90" fill="${col}" transform="rotate(25 -125 40)"/></g>`;G.vhand.innerHTML=hd;
  const pin=t<Tn('pins','nerves')?0:clamp((t-Tn('pins','nerves'))/0.5)*(1-clamp((t-SC[S('pins')].e+1)/1));let sk='';
  if(pin>0)for(let i=0;i<12;i++){if(Math.sin(t*28+i*2)>0){const x=cx-900+rnd(i)*1050,y=cy+1330-1400+rnd(i+4)*220+ (i%2?0:-260)+70;sk+=`<path d="M${f1(x)} ${f1(y)} l14 -26 l-12 0 l16 -30" stroke="#ffe14d" stroke-width="7" fill="none" stroke-linecap="round" opacity="${pin}"/>`}}
  G.vspark.innerHTML=sk;}
 // ===== goosebumps =====
 {const [cx,cy]=PC.goose,c=easeOut(clamp(sp('goose',t)*1.6)),a=lerp(22,86,c)*Math.PI/180;const bx=cx-250,by=cy+100;
  const tip=[bx+300*Math.cos(a),by-300*Math.sin(a)];const mp=[bx-250+c*40,by+60];const mq=[bx,by+240-c*50];
  let g=`<path d="M${bx-140} ${by} Q${bx} ${f1(by-80*c)} ${bx+140} ${by}Z" fill="#f0c3a6"/>`;
  g+=`<path d="M${bx} ${by} V${by+240}" stroke="#3a2418" stroke-width="10"/><path d="M${bx} ${by} L${f1(tip[0])} ${f1(tip[1])}" stroke="#3a2418" stroke-width="12" stroke-linecap="round"/>`;
  g+=`<path d="M${f1(mp[0])} ${mp[1]} L${bx} ${f1(mq[1])}" stroke="#c4455f" stroke-width="40" stroke-linecap="round"/>`;
  g+=tx(cx-260,cy+340,c>0.5?'Muscle pulls: hair stands up':'Tiny muscle relaxed',44,'#fff');
  const fur=clamp((t-Tn('goose','furry'))/0.6);if(fur>0){g+=C(cx+400,cy-120,100,'#caa07a',fur);for(let k=0;k<28;k++){const aa=k/28*6.283;g+=`<path d="M${f1(cx+400+Math.cos(aa)*100)} ${f1(cy-120+Math.sin(aa)*100)} l${f1(Math.cos(aa)*36)} ${f1(Math.sin(aa)*36)}" stroke="#caa07a" stroke-width="8" stroke-linecap="round" opacity="${fur}"/>`}g+=tx(cx+400,cy+80,'Fur traps warm air',36,'#fff')}
  G.gcon.innerHTML=g;}
 // ===== shivering =====
 {const [cx,cy]=PC.shiver,shv=clamp((t-SC[S('shiver')].s-1.5)/1),f=Math.sin(t*35),p=sp('shiver',t);let g='';
  g+=`<g transform="translate(${cx-100} 0) scale(${f1(1+0.05*f*shv)} 1) translate(${-(cx-100)} 0)">`;
  for(let i=0;i<6;i++)g+=`<rect x="${cx-600}" y="${cy-150+i*50}" width="1000" height="36" rx="18" fill="${i%2?'#c8506a':'#b53f5a'}"/>`;g+=`</g>`;
  for(let k=0;k<3;k++){const u=((t*0.8+k/3)%1);g+=`<circle cx="${cx-100}" cy="${cy+10}" r="${f1(u*320)}" fill="none" stroke="#ff9a3d" stroke-width="8" opacity="${(0.8*(1-u)*shv).toFixed(2)}"/>`}
  const bh=80+280*p;g+=`<rect x="${cx+806}" y="${f1(cy+240-bh)}" width="28" height="${f1(bh)}" rx="14" fill="#ff7a3b"/>`;
  g+=`<rect x="${cx-600}" y="${cy+330}" width="700" height="50" rx="14" fill="#1b2230" stroke="#fff" stroke-width="5"/><rect x="${cx-594}" y="${cy+336}" width="${f1(688*(1-0.7*p))}" height="38" rx="8" fill="#6fcf4a"/>`+tx(cx-250,cy+430,'Energy used up',38,'#fff');
  g+=person(cx-760+Math.sin(t*45)*4*shv,cy+500,1.3,{coat:'#3b6ea5',arm:20});G.sbx.innerHTML=g;}
 // ===== brown fat =====
 {const [cx,cy]=PC.brown,on=clamp((t-Tn('brown','cold'))/1.2);let g='';
  for(let i=0;i<22;i++){const a=rnd(i)*6.283,r=30+rnd(i+3)*140;g+=`<ellipse cx="${f1(cx+450+Math.cos(a)*r)}" cy="${f1(cy+Math.sin(a)*r)}" rx="26" ry="14" fill="#ff9a3d" opacity="${(0.4+0.6*on*(0.5+0.5*Math.sin(t*4+i))).toFixed(2)}" transform="rotate(${f1(a*57)} ${f1(cx+450+Math.cos(a)*r)} ${f1(cy+Math.sin(a)*r)})"/>`}
  for(let k=0;k<3;k++){const u=((t*0.6+k/3)%1);g+=`<circle cx="${cx+450}" cy="${cy}" r="${f1(240+u*160)}" fill="none" stroke="#ff7a3b" stroke-width="8" opacity="${(0.8*(1-u)*on).toFixed(2)}"/>`}G.bwv.innerHTML=g;}
 // ===== kidneys / bladder =====
 {const [cx,cy]=PC.pee,p=sp('pee',t);let g='';
  const Ps=[[[cx-150,cy+330],[cx-80,cy-30]],[[cx+150,cy+330],[cx+80,cy-30]],[[cx-200,cy-200],[cx-70,cy-70]],[[cx+200,cy-200],[cx+70,cy-70]]];
  Ps.forEach((P,j)=>{for(let i=0;i<8;i++){const u=((t*0.3+i/8+j*0.1)%1),[x,y]=along(P,u);g+=C(x,y,9,'#e0475f')}});
  const kb=1+0.12*p*Math.sin(t*5);g+=`<ellipse cx="${cx-90}" cy="${cy-30}" rx="${f1(40*kb)}" ry="${f1(70*kb)}" fill="#d9657b" opacity=".6" transform="rotate(15 ${cx-90} ${cy-30})"/><ellipse cx="${cx+90}" cy="${cy-30}" rx="${f1(40*kb)}" ry="${f1(70*kb)}" fill="#d9657b" opacity=".6" transform="rotate(-15 ${cx+90} ${cy-30})"/>`;
  for(let i=0;i<8;i++){const u=((t*(0.3+0.6*p)+i/8)%1);g+=C(cx-70+u*70+(i%2?100:0)*(1-u)*0,cy+40+u*120,7,'#ffe14d',0.9)}
  g+=C(cx,cy+210,18+66*p,'#ffe14d',0.9);G.pbd.innerHTML=g;}
 // ===== nose lining + viruses =====
 {const [cx,cy]=PC.virus,cold=clamp(sp('adv1',t)*1.4),fr=lerp(8,2.2,cold);let g='';
  for(let i=0;i<10;i++){const x=cx-950+i*190,inf=clamp((cold-0.45-rnd(i)*0.35)*3);g+=`<rect x="${x}" y="${cy+250}" width="170" height="120" rx="26" fill="${mix('e58f8f','a8d46a',inf)}" stroke="#b5565b" stroke-width="5"/>`;
   for(let k=0;k<6;k++){const xx=x+20+k*26,an=Math.sin(t*fr+i*0.7+k)*0.5;g+=`<path d="M${xx} ${cy+250} l${f1(Math.sin(an)*70)} ${f1(-70*Math.cos(an))}" stroke="#ffd0b0" stroke-width="6" stroke-linecap="round"/>`}}
  g+=`<rect x="${cx-1050}" y="${cy+110}" width="2100" height="130" fill="#d8e88a" opacity=".45"/>`;G.vcil.innerHTML=g;
  let v='';const desc=clamp((t-SC[S('adv1')].s)/3);
  for(let i=0;i<14;i++){const fy=cy-300+rnd(i+4)*500+Math.sin(t*0.8+i)*20,x0=cx-900+rnd(i)*1800;let y=lerp(fy,cy+170,easeOut(desc)),x=x0-(1-cold)*t*40*(desc>0.9?1:0);x=cx-1000+(((x-(cx-1000))%2000)+2000)%2000;
   const sink=clamp((cold-0.5)*3);y=lerp(y,cy+300,sink);v+=virus(x+Math.sin(t+i)*(desc<1?25:2),y,24,1-sink*0.8)}
  G.vvir.innerHTML=v;}
 // ===== closed room =====
 {const [cx,cy]=PC.room;const O=[cx-650,cy+120],PP=[[cx-650,cy+120],[cx-250,cy-120],[cx+300,cy+170],[cx+650,cy-60],[cx,cy+10]];const ts=Tn('adv2','sneeze'),u=clamp((t-ts)/7);let g='';
  PP.forEach((p,i)=>{const dist=Math.hypot(p[0]-O[0],p[1]-O[1]),inf=i===0||u*1500>dist;g+=C(p[0],p[1],46,['#d9533b','#3b6ea5','#2f9d62','#8e44ad','#e8c13a'][i])+C(p[0],p[1]-60,26,'#e0a77a')+(inf?`<circle cx="${p[0]}" cy="${p[1]-60}" r="34" fill="none" stroke="#6fcf4a" stroke-width="8"/>`:'')});
  if(u>0)for(let i=0;i<46;i++){const a=(rnd(i)-0.3)*1.2,r=u*(250+rnd(i+3)*1250);g+=C(O[0]+Math.cos(a)*r+Math.sin(t+i)*14,O[1]+Math.sin(a)*r*0.7,6+rnd(i+9)*4,'#6fcf4a',0.75*(u>0.9?(1-u)*10:1))}
  G.rpt.innerHTML=g;}
 // ===== sleepy =====
 {const [cx,cy]=PC.sleep,p=sp('sleepy',t);let g='';const sa=Math.PI+(t*0.35%1)*Math.PI;
  g+=C(cx-710+190*Math.cos(sa),cy-60+190*Math.sin(sa),34,'#fff1a8');
  const mh=lerp(120,300,p),sh=lerp(290,140,p);
  g+=`<rect x="${cx+260}" y="${f1(cy+300-mh)}" width="140" height="${f1(mh)}" rx="14" fill="#6fb0ff"/><rect x="${cx+480}" y="${f1(cy+300-sh)}" width="140" height="${f1(sh)}" rx="14" fill="#ffd23f"/>`+tx(cx+330,cy+360,'Melatonin',32,'#fff')+tx(cx+550,cy+360,'Serotonin',32,'#fff')+tx(cx+330,cy-60,'sleep',34,'#6fb0ff')+tx(cx+550,cy-60,'mood',34,'#ffd23f');
  g+=`<rect x="${cx-360}" y="${cy-380}" width="220" height="90" rx="16" fill="#8a5ac0"/><rect x="${cx-360}" y="${cy-310}" width="220" height="40" fill="#5a3a90"/>`;
  g+=tx(cx-250,cy-410,'z',60,'#fff')+tx(cx-200,cy-450,'z',44,'#fff');
  G.slp.innerHTML=g;}
 // ===== joints =====
 {const [cx,cy]=PC.joint,c=sp('joints',t),sw=lerp(1,1.2,c);let g='';
  g+=`<ellipse cx="${cx}" cy="${cy+20}" rx="${f1(210*sw)}" ry="${f1(125*sw)}" fill="#9ec8e8" opacity=".55"/>`;
  const spd=lerp(1.6,0.35,c);for(let i=0;i<26;i++){const a=rnd(i)*6.283+t*spd,r=0.2+rnd(i+3)*0.75;g+=C(cx+Math.cos(a)*190*sw*r,cy+20+Math.sin(a)*110*sw*r,7,'#e9f6ff',0.9)}
  if(c>0.45&&Math.sin(t*20)>0)g+=`<path d="M${f1(cx+230*sw)} ${cy+20} l30 -34 l-20 0 l34 -40" stroke="#ffe14d" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  g+=`<path d="M${cx-250} ${cy-430} Q${cx-340} ${cy+20} ${cx-250} ${cy+450}" stroke="#c4455f" stroke-width="${f1(30+c*16)}" fill="none" stroke-linecap="round" opacity=".75"/>`;
  const ang=lerp(-35,-85,c)*Math.PI/180,bx=cx-760,by=cy+20;g+=`<circle cx="${bx}" cy="${by}" r="170" fill="#10131a" stroke="#cfd8e6" stroke-width="10"/><path d="M${bx} ${by} L${f1(bx+150*Math.cos(ang))} ${f1(by+150*Math.sin(ang))}" stroke="#ff4b4b" stroke-width="10" stroke-linecap="round"/>`;
  G.jnt.innerHTML=g;}
 // ===== runny nose =====
 {const [cx,cy]=PC.nose;let g='';
  for(let i=0;i<12;i++){const x=cx-570+((rnd(i)*270)%260)+ (i%2?10:0),u=clamp((t-Tn('nose','condenses')+rnd(i)*3)/4);const y=cy-60+rnd(i+3)*400;if(u>0)g+=C(x,y+u*(i%3===0?100:0),7+u*6,'#cfeaff',0.9)}
  for(let i=0;i<5;i++){const u=((t*0.5+i/5)%1);g+=C(cx+385+(i%2?130:0)+(u-0.5)*30,cy+170-u*140,16+u*20,'#ffd6d0',0.6*(1-u))}
  const dr=((t*0.4)%1),on=clamp((t-Tn('nose','drips')+1)/1);if(on>0){g+=C(cx+385,cy+200+dr*80,8+dr*10,'#cfeaff',on*(1-dr*0.3))+`<path d="M${cx+385} ${cy+200} v${f1(dr*80)}" stroke="#cfeaff" stroke-width="6" opacity="${on}"/>`}
  g+=tx(cx-300,cy+400,'Cold glass: water drops form',36,'#fff')+tx(cx+450,cy+330,'Cold nose + warm breath = drips',36,'#fff');G.nsb.innerHTML=g;}
 // ===== dry skin =====
 {const [cx,cy]=PC.skin;const dry=clamp(sp('skin',t)*2),sh=clamp((t-Tn('skin','showers'))/1.5);let g='';
  const oil=lerp(16,3,Math.max(dry*0.5,sh));g+=`<rect x="${cx-700}" y="${f1(cy+100-oil)}" width="1400" height="${f1(oil)}" fill="#ffd23f" opacity=".9"/>`;
  if(dry>0.5||sh>0.3)for(let i=0;i<7;i++){const x=cx-600+i*190;g+=`<path d="M${x} ${cy+100} l12 40 l-16 30 l14 36" stroke="#8a3b3b" stroke-width="6" fill="none"/>`}
  for(let i=0;i<20;i++){const u=((t*0.3+i/20)%1);g+=C(cx-650+rnd(i)*1300,cy+90-u*420,9,'#7bd0ff',dry*(1-u))}
  g+=`<g opacity="${dry}">${arrowUp(cx-300,cy-120,'#9fb4cf',9)}${arrowUp(cx+100,cy-160,'#9fb4cf',9)}${arrowUp(cx+450,cy-120,'#9fb4cf',9)}</g>`+tx(cx,cy-330,'Dry winter air pulls water out of skin',44,'#fff');
  if(sh>0){g+=`<g opacity="${sh}"><rect x="${cx+560}" y="${cy-420}" width="150" height="40" rx="14" fill="#cfd8e6"/>`;for(let i=0;i<16;i++){const u=((t*0.9+i/16)%1);g+=C(cx+570+(i%6)*24,cy-380+u*470,7,'#7bd0ff',(1-u)*0.9)}g+=`</g>`}
  G.skn.innerHTML=g;}
 // ===== frostbite =====
 {const [cx,cy]=PC.frost,p=sp('frost',t);let g='';const col=mix('f0b49e','dde9f6',p);
  g+=`<rect x="${cx-700}" y="${cy-130}" width="1400" height="260" rx="130" fill="${col}" stroke="#a96a55" stroke-width="8"/><rect x="${cx-600}" y="${cy-30}" width="1050" height="60" rx="30" fill="#efe9d8"/>`;
  g+=`<path d="M${cx-650} ${cy-70} H${cx+560}" stroke="#a3253a" stroke-width="10" stroke-dasharray="${f1(60*(1-p)+4)} ${f1(30*p+12)}" opacity=".8"/>`;
  for(let i=0;i<16;i++){const r=p*(14+rnd(i)*26),x=cx+120+rnd(i+2)*520,y=cy-90+rnd(i+6)*180;if(r>4)g+=star(x,y,r,'#e9f7ff')}
  g+=tx(cx,cy+330,'Ice crystals damage the cells',44,'#fff');G.fng.innerHTML=g;}
 // ===== layers =====
 {const [cx,cy]=PC.layers,L=[clamp((t-Tn('layers','layers'))/0.6),clamp((t-Tn('layers','trapped'))/0.6),clamp((t-Tn('layers','wool')+0.001)/0.6)];
  const n=L[0]+L[1]+L[2];let g='';
  const XS=[cx-120,cx-240,cx-360],CS=['#f2c94c','#8a5ac0','#d9533b'];
  for(let i=0;i<3;i++){g+=`<rect x="${XS[i]}" y="${cy-450}" width="60" height="900" fill="${CS[i]}" opacity="${L[i]}"/>`;if(i<2)g+=`<rect x="${XS[i]-120}" y="${cy-450}" width="120" height="900" fill="#9fe3ff" opacity="${0.35*L[i+1]}"/>`}
  const reach=700*(1-0.3*n);
  for(let i=0;i<5;i++){const u=((t*0.5+i/5)%1);g+=`<g opacity="${(1-u).toFixed(2)}">${arrowR(cx+20-u*reach,cy-320+i*160,'#ff8a3d',10,-70)}</g>`;const w=((t*0.4+i/5)%1);g+=`<g opacity="${(0.9*(1-w*0.2)).toFixed(2)}">${arrowR(cx-1050+w*(650+(L[2]>0.5?-120:0)),cy-300+i*150,'#7bb6e8',9,70)}</g>`}
  g+=person(cx+700,cy+420,2.1,{coat:'#d9533b'});const cv=clamp((t-Tn('layers','cover'))/0.5);
  [[cx+700,cy-30],[cx+700,cy+30],[cx+590,cy+150],[cx+810,cy+150],[cx+700,cy+410]].forEach(([x,y])=>{g+=C(x,y,50+8*Math.sin(t*4),'#ff9a3d',0.45*cv)});
  g+=tx(cx-240,cy+400,'Air trapped between layers = insulation',40,'#fff');G.lyr.innerHTML=g;}
 // ===== habits =====
 {const [cx,cy]=PC.habits;const TT=[Tn('habits','drink'),Tn('habits','meals'),Tn('habits','moving'),Tn('habits','wash')],NM=['Warm drinks','Regular meals','Keep moving','Wash hands'];let g='';
  TT.forEach((t0,i)=>{const s=easeOut(clamp((t-t0)/0.5));if(s<=0)return;const x=cx-750+i*500;g+=`<g transform="translate(${x} ${cy}) scale(${f1(s)})"><rect x="-210" y="-300" width="420" height="600" rx="36" fill="#f5f1e6"/>`;
   if(i===0){g+=`<path d="M-90 -40 h180 q-10 130 -90 130 q-80 0 -90 -130z" fill="#d9533b"/><path d="M90 -20 q60 10 40 60 q-10 20 -50 20" stroke="#d9533b" stroke-width="14" fill="none"/>`;for(let k=0;k<3;k++){const u=((t*0.6+k/3)%1);g+=`<path d="M${-40+k*40} ${-60-u*70} q-14 -22 0 -44" stroke="#9fb4cf" stroke-width="9" fill="none" stroke-linecap="round" opacity="${1-u}"/>`}}
   if(i===1){g+=`<circle cx="0" cy="-10" r="120" fill="#fff" stroke="#c9c2b0" stroke-width="8"/><circle cx="-40" cy="-30" r="44" fill="#f4d93a"/><ellipse cx="46" cy="10" rx="42" ry="30" fill="#e8f0e0"/><circle cx="0" cy="48" r="26" fill="#5da64c"/>`}
   if(i===2){g+=`<g transform="translate(0 ${f1(Math.sin(t*6)*8)})"><circle cx="0" cy="-130" r="34" fill="#e0a77a"/><path d="M0 -96 V30 M0 -60 L-60 -10 M0 -60 L56 -30 M0 30 L-46 120 M0 30 L50 110" stroke="#3b6ea5" stroke-width="18" stroke-linecap="round" fill="none"/></g>`}
   if(i===3){g+=`<rect x="-30" y="-150" width="60" height="30" rx="8" fill="#9fb4cf"/><path d="M0 -120 v50" stroke="#9fb4cf" stroke-width="12"/><ellipse cx="0" cy="40" rx="90" ry="70" fill="#e0a77a"/>`;for(let k=0;k<8;k++){const u=((t*0.5+k/8)%1);g+=C(-60+(k%4)*40,-60+u*140,10+(k%3)*4,'#cfeaff',0.9*(1-u*0.5))}}
   g+=tx(0,250,NM[i],42,'#3a2c12')+`</g>`});
  G.hbt.innerHTML=g;}
 // ===== alcohol =====
 {const [cx,cy]=PC.alc,p=sp('alcohol',t);let g='';
  g+=`<path d="M${cx-900} ${cy-240} h190 q0 150 -95 170 q-95 -20 -95 -170z M${cx-805} ${cy-70} v190 M${cx-870} ${cy+120} h130" stroke="#e9eef5" stroke-width="12" fill="#9a2f4f" stroke-linejoin="round"/>`+tx(cx-805,cy+220,'Alcohol',40,'#fff');
  const w=lerp(14,56,p);g+=`<rect x="${cx-500}" y="${cy-250}" width="900" height="330" fill="#e7a58f"/><path d="M${cx-500} ${cy-80} H${cx+400}" stroke="#a3253a" stroke-width="${f1(w+12)}"/><path d="M${cx-500} ${cy-80} H${cx+400}" stroke="#d9435c" stroke-width="${f1(w)}"/>`+tx(cx-50,cy-290,'Vessels near the skin widen',40,'#fff');
  for(let i=0;i<5;i++){const u=((t*0.5+i/5)%1);g+=`<g opacity="${((1-u)*p).toFixed(2)}">${arrowUp(cx-380+i*190,cy-260-u*140,'#ff8a3d',10)}</g>`}
  const th=lerp(300,255,p);g+=`<rect x="${cx+730}" y="${cy-280}" width="60" height="520" rx="30" fill="#fff" stroke="#10131a" stroke-width="6"/><rect x="${cx+746}" y="${f1(cy+240-th)}" width="28" height="${f1(th)}" rx="14" fill="#ff4b4b"/>`+tx(cx+760,cy-320,'Core '+lerp(37,35.8,p).toFixed(1)+'°C',40,'#fff');
  g+=tx(cx-50,cy+230,'Feels warm, but you lose heat',44,'#ffb43b');
  const sw=clamp((t-Tn('alcohol','woollen'))/0.6);if(sw>0)g+=`<g opacity="${sw}"><rect x="${cx-500}" y="${cy+290}" width="900" height="130" rx="26" fill="#f5f1e6"/>`+tx(cx-50,cy+370,'Sweater: only holds the heat you make',44,'#3a2c12')+`</g>`;
  G.alcg.innerHTML=g;}
 // ===== warning =====
 {const [cx,cy]=PC.warn,p=sp('warn',t);let g='';const TT=[Tn('warn','shivers'),Tn('warn','speaks'),Tn('warn','confused'),Tn('warn','pale')];
  g+=`<g transform="rotate(${f1(p*8)} ${cx} ${cy+420})">${person(cx,cy+420,2.6,{coat:'#3b6ea5',skin:mix('e0a77a','e4eaf2',clamp((t-TT[3])/1.2))})}</g>`;
  const POS=[[cx-650,cy-250],[cx+650,cy-250],[cx-650,cy+150],[cx+650,cy+150]],NM=['Shivering stops','Slow speech','Confusion, sleepy','Very pale skin'];
  TT.forEach((t0,i)=>{const s=easeOut(clamp((t-t0)/0.5));if(s<=0)return;const [x,y]=POS[i];g+=`<g transform="translate(${x} ${y}) scale(${f1(s)})"><rect x="-230" y="-140" width="460" height="280" rx="30" fill="#f5f1e6"/>`;
   if(i===0)g+=`<path d="M-160 20 q20 -60 40 0 t40 0 t40 0 H100 H160" stroke="#c4455f" stroke-width="12" fill="none"/>`;
   if(i===1)g+=`<rect x="-120" y="-100" width="240" height="110" rx="30" fill="#fff" stroke="#8f9bab" stroke-width="8"/>`+tx(0,-20,'. . . .',70,'#3a2c12');
   if(i===2)g+=tx(0,10,'? ? ?',100,'#8e44ad');
   if(i===3)g+=`<circle cx="0" cy="-20" r="60" fill="#dde9f6" stroke="#8f9bab" stroke-width="8"/>`;
   g+=tx(0,112,NM[i],36,'#3a2c12')+`</g>`});
  G.wrn.innerHTML=g;}
}

// ================= LABELS =================
HD('hook','Winter vs your body');
HD('core','Your core must stay at 37°C');
LB('core','organs',2500,-480,'Organs work best at 37°C','#ffb347');
HD('sensor','Skin sensors alarm the brain');
LB('sensor','hypothalamus',5700,-300,'Hypothalamus = thermostat','#ffd23f');
HD('vessels','Trick 1: narrow vessels');
LB('vessels','narrow',-300,1050,'Less warm blood reaches hands','#a9c6ea');
HD('pins','Why warming up hurts');
LB('pins','pins',-300,1000,'Nerves fire = pins and needles','#ffe14d');
HD('goose','Trick 2: goosebumps');
LB('goose','tiny',2500,1230,'Tiny muscle + hair','#d9657b');
HD('shiver','Trick 3: shivering');
LB('shiver','muscles',4900,1100,'Muscles contract = heat','#ff9a3d');
HD('brown','Hidden heater: brown fat');
LB('brown','babies',0,2470,'Babies have lots. Adults: neck + shoulders','#ff9a3d');
HD('pee','Why you pee more in winter');
LB('pee','kidneys',2900,2700,'Kidneys filter extra blood','#d9657b');
LB('pee','scientists',2900,3000,'Cold diuresis','#ffe14d');
HD('sick','Why do colds spike in winter?');
LB('sick','viruses',4700,2500,'Viruses are always around','#6fcf4a');
HD('adv1','Advantage 1: weaker nose defence');
LB('adv1','slowly',5000,3180,'Cilia sweep slowly in the cold','#ffd0b0');
HD('adv2','Advantage 2 and 3');
LB('adv2','sneeze',-400,3860,'One sneeze reaches everyone','#6fcf4a');
LB('adv2','sunlight',620,3740,'Less sunlight = less vitamin D','#ffd23f');
HD('sleepy','Why winter makes you sleepy');
LB('sleepy','melatonin',2940,3900,'Hormone shift','#6fb0ff');
HD('joints','Why joints ache in the cold');
LB('joints','pressure',4240,4000,'Air pressure falls','#ff4b4b');
HD('nose','Why your nose runs');
HD('skin','Why skin and lips crack');
HD('frost','When cold goes too far: frostbite');
LB('frost','never',5000,5420,'Never rub it. Warm it gently.','#ffb43b');
HD('layers','How to stay warm: layers');
LB('layers','cover',700,6600,'Cover head, neck, hands, feet','#ff9a3d');
HD('habits','Small habits that help');
HD('alcohol','Myth: alcohol warms you','#d9232a');
HD('warn','Know the warning signs');
LB('warn','move',7500,6560,'Move to warmth + get medical help','#ff4b4b');
HD('close','Your body is working hard','#2d7fd3');

// ================= CAMERA =================
const cam=[];
const Z=0.95;
const add=(n,k,z,w,dy)=>{const [x,y]=PC[k];const o={sc:S(n),x:x,y:y+(dy||0),z:z||Z};if(w!=null)o.w=wi(S(n),w);cam.push(o)};
add('hook','hook',0.92);
add('core','core',0.95);add('core','core',1.25,'organs');
add('sensor','sensor',0.95);add('sensor','sensor',1.3,'hypothalamus',-20);
add('vessels','vessels',0.95);
add('pins','vessels',1.3,null,0);
add('goose','goose',0.95);add('goose','goose',1.25,'tiny',100);
add('shiver','shiver',0.95);
add('brown','brown',0.95);
add('pee','pee',0.95);add('pee','pee',1.25,'kidneys',-40);
add('sick','virus',0.95,null,-80);
add('adv1','virus',1.3,null,150);
add('adv2','room',0.95);
add('sleepy','sleep',0.95);
add('joints','joint',0.95);
add('nose','nose',0.95);
add('skin','skin',0.95);
add('frost','frost',1.0);
add('layers','layers',0.95);
add('habits','habits',0.95);
add('alcohol','alc',0.95);
add('warn','warn',0.95);
add('close','hook',0.85);
return {art,init,anim,cam,sfx:()=>[]};
};
