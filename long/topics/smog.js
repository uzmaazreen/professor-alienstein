// Long video: why Delhi gets smog. One big world, one camera that flies between panels.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC,WT}=E;
const wi=(s,w)=>{const k=WT[s].findIndex(o=>o.w.toLowerCase().replace(/[^a-z]/g,'').startsWith(w));return k<0?0:k};
const T=(s,w)=>wt(s,wi(s,w));
const prog=(i,t)=>clamp((t-SC[i].s)/(SC[i].e-SC[i].s));
const lerp=(a,b,k)=>a+(b-a)*k;
const f1=n=>n.toFixed(1);
const C=(x,y,r,f,o)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0.1,r))}" fill="${f}" opacity="${(o==null?1:clamp(o)).toFixed(2)}"/>`;
const CL=SC.length-1; // outro index
const CLEAR0=SC[22].s, CLEAR1=SC[23].s+3;
const dens=t=>t<SC[0].e?0.3+0.6*prog(0,t):(t<CLEAR0?0.9:0.9-0.82*clamp((t-CLEAR0)/(CLEAR1-CLEAR0)));
const emit=t=>1-0.85*clamp((t-CLEAR0)/(CLEAR1-CLEAR0));
const aqiCol=v=>v>400?'#ff3b3b':v>300?'#ff6a3b':v>200?'#ffb43b':v>100?'#ffe14d':v>50?'#9ccc65':'#4caf50';
const aqiName=v=>v>400?'Severe':v>300?'Very poor':v>200?'Poor':v>100?'Moderate':v>50?'Satisfactory':'Good';

// ---------- helpers ----------
const panel=(id,cx,cy,w,h,c1,c2,inner)=>`<defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><clipPath id="${id}c"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="56"/></clipPath></defs><g clip-path="url(#${id}c)"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" fill="url(#${id}g)"/>${inner}</g><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="56" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="6"/>`;
const R=(x,y,w,h,inner)=>`<svg style="position:absolute;left:${x}px;top:${y}px;overflow:visible" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const arrowUp=(x,y,col,w)=>`<path d="M${x} ${y} v-70 m-18 24 l18 -26 l18 26" stroke="${col}" stroke-width="${w||9}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrowR=(x,y,col,w,l)=>`<path d="M${x} ${y} h${l||70} m-24 -18 l24 18 l-24 18" stroke="${col}" stroke-width="${w||9}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const along=(P,u)=>{let L=0;const Ls=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);Ls.push(d);L+=d}let q=u*L;for(let i=0;i<Ls.length;i++){if(q<=Ls[i]||i===Ls.length-1){const k=clamp(q/Ls[i]);return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}q-=Ls[i]}return P[P.length-1]};
const cross=(x,y,s,col,w)=>`<path d="M${x-s} ${y-s} L${x+s} ${y+s} M${x+s} ${y-s} L${x-s} ${y+s}" stroke="${col}" stroke-width="${w||16}" stroke-linecap="round"/>`;

// ---------- lung tree (deterministic) ----------
const TREE=[],LEAVES=[];
(function gen(x,y,a,len,d,path,seed){
  const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len,np=path.concat([[x2,y2]]);
  TREE.push([x,y,x2,y2,d]);
  if(d>=5){LEAVES.push(np);return}
  const sp=0.40+0.16*rnd(seed);
  gen(x2,y2,a-sp,len*0.76,d+1,np,seed*2+1);gen(x2,y2,a+sp,len*0.76,d+1,np,seed*2+2);
})(300,3000,Math.PI/2+0.62,250,0,[[300,2790],[300,3000]],3);
(function gen(x,y,a,len,d,path,seed){
  const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len,np=path.concat([[x2,y2]]);
  TREE.push([x,y,x2,y2,d]);
  if(d>=5){LEAVES.push(np);return}
  const sp=0.40+0.16*rnd(seed+40);
  gen(x2,y2,a-sp,len*0.76,d+1,np,seed*2+41);gen(x2,y2,a+sp,len*0.76,d+1,np,seed*2+42);
})(300,3000,Math.PI/2-0.62,250,0,[[300,2790],[300,3000]],7);
const LEAF=LEAVES[Math.floor(LEAVES.length*0.72)]; const LP=LEAF[LEAF.length-1];

// ================= ART =================
function art(){
 let s='<div style="position:absolute;left:-6000px;top:-3500px;width:16000px;height:11000px;background-color:#0d1626;background-image:radial-gradient(rgba(140,180,255,.13) 3px,transparent 3px);background-size:90px 90px"></div>';

 // ---- city + fields ----
 let c='';
 c+=`<circle id="sun" cx="560" cy="-300" r="90" fill="#fff4c0"/>`;
 for(let i=0;i<22;i++){const x=-1100+i*100,h=140+rnd(i+3)*220;c+=`<rect x="${x}" y="${300-h}" width="92" height="${h}" fill="#9bb5cf"/>`}
 for(let i=0;i<16;i++){const x=-1000+i*125,w=108,h=200+rnd(i+11)*330;c+=`<rect x="${x}" y="${300-h}" width="${w}" height="${h}" fill="${mix('5f7794','8aa2bd',rnd(i+2))}"/>`;
  for(let r=0;r<Math.floor((h-30)/46);r++)for(let q=0;q<3;q++){if(rnd(i*50+r*3+q)>.35)c+=`<rect x="${x+14+q*30}" y="${300-h+16+r*46}" width="18" height="26" fill="#e6f1fb" opacity=".7"/>`}}
 // factory + crane
 c+=`<rect x="1150" y="120" width="620" height="180" fill="#5b6472"/>`;for(let q=0;q<8;q++)c+=`<rect x="${1180+q*74}" y="160" width="40" height="50" fill="#cfe3f5" opacity=".7"/>`;
 [1250,1450].forEach(x=>{c+=`<rect x="${x}" y="-120" width="70" height="250" fill="#8a4c3a"/><rect x="${x}" y="-120" width="70" height="26" fill="#d9d2c8"/><rect x="${x}" y="-60" width="70" height="26" fill="#d9d2c8"/>`});
 c+=`<rect x="952" y="-150" width="18" height="450" fill="#f0b323"/><rect x="860" y="-150" width="290" height="16" fill="#f0b323"/><path d="M900 -134 V -60 M900 -60 h40" stroke="#444" stroke-width="4"/>`;
 // metro track
 c+=`<rect x="-1100" y="60" width="3000" height="14" fill="#8d96a3"/>`;for(let q=0;q<22;q++)c+=`<rect x="${-1050+q*140}" y="74" width="16" height="226" fill="#7d8796"/>`;
 c+=`<rect id="haze" x="-3900" y="-620" width="5800" height="1160" fill="#b39368" opacity="0"/>`;
 // AQI sign
 c+=`<rect x="-105" y="-370" width="10" height="140" fill="#555"/><rect x="-260" y="-545" width="320" height="180" rx="22" fill="#10131a" stroke="#fff" stroke-width="5"/><text x="-100" y="-495" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#aab">AQI</text><text id="aqn" x="-100" y="-400" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="104" fill="#ff3b3b">500</text>`;
 // fields
 c+=`<rect x="-3900" y="300" width="2800" height="240" fill="#b99b62"/>`;
 for(let q=0;q<90;q++){const x=-3880+q*31+rnd(q)*10;c+=`<path d="M${x} 305 l${(rnd(q+4)-.5)*10} -${34+rnd(q)*18}" stroke="${mix('d9bf6d','a8893f',rnd(q+9))}" stroke-width="6" stroke-linecap="round"/>`}
 c+=`<g transform="translate(-3560 300)"><rect x="-20" y="-110" width="40" height="80" rx="14" fill="#3b6ea5"/><rect x="-18" y="-30" width="14" height="30" fill="#2c3f58"/><rect x="4" y="-30" width="14" height="30" fill="#2c3f58"/><circle cx="0" cy="-130" r="22" fill="#e0a77a"/><path d="M-34 -138 h68 l-12 -22 h-44z" fill="#e8d28a"/></g>`;
 // city ground + road
 c+=`<rect x="-1100" y="300" width="3000" height="240" fill="#6b7380"/><rect x="-1100" y="300" width="3000" height="100" fill="#3a414d"/>`;
 for(let q=0;q<30;q++)c+=`<rect x="${-1080+q*100}" y="346" width="52" height="6" fill="#f2e6a0"/>`;
 c+=`<g id="mtr"></g><g id="cp"></g><g id="cars"></g><g id="fires"></g><g id="fs"></g><g id="chs"></g><g id="wnd"></g><g id="crk"></g>`;
 s+=R(-3900,-620,5800,1160,panel('cty',-1000,-40,5800,1160,'#79b4e6','#dcebf5',c));

 // ---- hair panel ----
 let h='';
 h+=`<defs><radialGradient id="hg"><stop offset="0" stop-color="#6b4226"/><stop offset=".8" stop-color="#3b2415"/><stop offset="1" stop-color="#241408"/></radialGradient></defs>`;
 h+=`<circle cx="-2400" cy="-1500" r="280" fill="url(#hg)" stroke="#c9a27a" stroke-width="10"/><circle cx="-2400" cy="-1500" r="200" fill="none" stroke="#8a5a36" stroke-width="3" opacity=".6"/>`;
 h+=`<path d="M-2680 -1180 h560" stroke="#fff" stroke-width="5"/><path d="M-2680 -1190 v20 M-2120 -1190 v20" stroke="#fff" stroke-width="5"/>`;
 h+=C(-1560,-1500,40,'#9aa1ab')+C(-1380,-1500,10,'#ff4b4b')+`<circle cx="-1380" cy="-1500" r="26" fill="none" stroke="#ff4b4b" stroke-width="4" stroke-dasharray="6 6"/>`;
 h+=`<g id="hrow"></g><g id="hbg"></g>`;
 s+=R(-3200,-2100,2200,1200,panel('hpn',-2100,-1500,2200,1200,'#1f3556','#2c4a78',h));

 // ---- gauge panel ----
 let g='';const gx=200,gy=-1200;
 const ang=v=>Math.PI-v/500*Math.PI;
 const pt=(r,v)=>`${f1(gx+r*Math.cos(ang(v)))} ${f1(gy-r*Math.sin(ang(v)))}`;
 const bnd=[0,50,100,200,300,400,500],cols=['#2e9d4f','#8bc34a','#f6d93a','#f59a23','#e5483a','#8c1d2f'];
 for(let i=0;i<6;i++)g+=`<path d="M${pt(520,bnd[i])} A520 520 0 0 1 ${pt(520,bnd[i+1])} L${pt(340,bnd[i+1])} A340 340 0 0 0 ${pt(340,bnd[i])}Z" fill="${cols[i]}" stroke="#10131a" stroke-width="6"/>`;
 [0,100,200,300,400,500].forEach(v=>{g+=`<text x="${f1(gx+585*Math.cos(ang(v)))}" y="${f1(gy-585*Math.sin(ang(v))+12)}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="36" fill="#cfd8e6">${v}</text>`});
 g+=`<g id="ndl"></g><circle cx="${gx}" cy="${gy}" r="34" fill="#e9eef6"/><text id="gn" x="${gx}" y="-1020" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="150" fill="#fff">0</text><text id="gc" x="${gx}" y="-940" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="58" fill="#4caf50">Good</text>`;
 s+=R(-900,-2100,2200,1200,panel('gpn',200,-1500,2200,1200,'#171e2c','#27324a',g));

 // ---- sky panels ----
 const bld=(x0,n,gy,col)=>{let q='';for(let i=0;i<n;i++){const hh=60+rnd(i+x0)*160;q+=`<rect x="${x0+i*70}" y="${gy-hh}" width="62" height="${hh}" fill="${col}"/>`}return q};
 // day
 let d='';
 d+=C(-1500,1130,75,'#fff1a8')+`<rect x="-3300" y="1900" width="2200" height="200" fill="#6f8f52"/>`+bld(-3050,15,1900,'#5b7a9c');
 [-2600,-2400].forEach(x=>{d+=`<rect x="${x}" y="1680" width="36" height="230" fill="#7a4a3a"/>`});
 d+=`<g id="dgs"></g><g id="dar"></g>`;
 s+=R(-3300,900,2200,1200,panel('dpn',-2200,1500,2200,1200,'#6fb0e8','#cfe6f6',d));
 // night
 let n='';
 for(let q=0;q<45;q++)n+=C(-760+rnd(q)*2120,950+rnd(q+3)*330,2+rnd(q+8)*3,'#fff',.6);
 n+=C(1050,1100,64,'#f3f1dc')+C(1080,1088,58,'#14224a');
 n+=`<rect x="-800" y="1150" width="2200" height="190" fill="#ff9a3d" opacity=".42"/><rect x="-800" y="1340" width="2200" height="560" fill="#3a78d0" opacity=".2"/>`;
 n+=`<rect x="-800" y="1900" width="2200" height="200" fill="#202a38"/>`+bld(-560,15,1900,'#10192a');
 [-150,60].forEach(x=>{n+=`<rect x="${x}" y="1690" width="34" height="220" fill="#2a3446"/>`});
 n+=`<rect id="nhz" x="-800" y="1340" width="2200" height="560" fill="#9a8a78" opacity="0"/><path id="lid" d="" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="26 16"/><g id="nps"></g><text id="nn" x="-740" y="1040" font-family="Poppins" font-weight="800" font-size="56" fill="#fff"></text>`;
 s+=R(-800,900,2200,1200,panel('npn',300,1500,2200,1200,'#0b1530','#1e2f55',n));
 // bowl
 let b='';
 b+=`<polygon points="3000,1900 3330,1130 3500,1280 3700,1030 3900,1900" fill="#7f8a9c"/><polygon points="3290,1190 3330,1130 3370,1210 3330,1200" fill="#fff"/><polygon points="3640,1090 3700,1030 3760,1100 3700,1120" fill="#fff"/>`;
 b+=`<rect x="1700" y="1900" width="1300" height="200" fill="#7a8f55"/>`+bld(2150,9,1900,'#4f6a8c');
 b+=`<path d="M1700 1990 q80 -30 160 0 t160 0 t160 0 t160 0" stroke="#4aa3ff" stroke-width="10" fill="none" opacity=".0"/>`;
 b+=`<path id="bwl" d="" fill="#9a8a78" opacity=".72"/><g id="bwa"></g>`;
 s+=R(1700,900,2200,1200,panel('bpn',2800,1500,2200,1200,'#8fc1e8','#dfeefa',b));

 // ---- nose ----
 let o='';
 o+=`<path d="M-1100 3170 C-1500 3110 -2500 3090 -3000 3240 L-3060 3520 C-2500 3540 -1500 3490 -1100 3440 Z" fill="#f9dcd6" stroke="#b5565b" stroke-width="10"/>`;
 o+=`<path d="M-1110 3186 C-1500 3126 -2500 3106 -2990 3250" stroke="#d8e88a" stroke-width="22" fill="none" opacity=".85"/><path d="M-1110 3424 C-1500 3474 -2500 3524 -3040 3500" stroke="#d8e88a" stroke-width="22" fill="none" opacity=".85"/>`;
 for(let q=0;q<22;q++){const x=-1150-q*20;o+=`<path d="M${x} 3190 l${-8+rnd(q)*6} 70" stroke="#5a3a2a" stroke-width="5" stroke-linecap="round"/><path d="M${x} 3428 l${-8+rnd(q+9)*6} -70" stroke="#5a3a2a" stroke-width="5" stroke-linecap="round"/>`}
 o+=`<g id="nps2"></g>`;
 s+=R(-3300,2700,2200,1200,panel('npa',-2200,3300,2200,1200,'#d9928b','#b9605f',o));

 // ---- lungs ----
 let l='';
 l+=`<ellipse cx="-90" cy="3390" rx="440" ry="480" fill="#e88f9f" opacity=".9"/><ellipse cx="690" cy="3390" rx="440" ry="480" fill="#e88f9f" opacity=".9"/>`;
 l+=`<rect x="276" y="2790" width="48" height="220" rx="14" fill="#f3d0c8" stroke="#9c3e55" stroke-width="6"/>`;
 TREE.forEach(sg=>{l+=`<path d="M${f1(sg[0])} ${f1(sg[1])} L${f1(sg[2])} ${f1(sg[3])}" stroke="#a8405b" stroke-width="${Math.max(3,22-sg[4]*4)}" stroke-linecap="round"/>`});
 LEAVES.forEach(p=>{const q=p[p.length-1];l+=C(q[0],q[1],15,'#ff9fb0')+C(q[0]+12,q[1]+10,11,'#ffb4c2')});
 l+=`<g id="lps"></g>`;
 s+=R(-800,2700,2200,1200,panel('lpn',300,3300,2200,1200,'#2a1a2e','#40233c',l));

 // ---- alveolus ----
 let v='';
 v+=`<path d="M3250 2750 A640 640 0 0 1 3250 3850" stroke="#c62d42" stroke-width="96" fill="none" opacity=".9"/><path d="M3250 2750 A640 640 0 0 1 3250 3850" stroke="#ef6a7c" stroke-width="22" fill="none" opacity=".6"/>`;
 v+=`<circle cx="2650" cy="3300" r="380" fill="#ffd6dd" opacity=".2" stroke="#ff9fb0" stroke-width="22"/>`;
 v+=`<g id="avp"></g>`;
 s+=R(1700,2700,2200,1200,panel('avp0',2800,3300,2200,1200,'#2a1a2e','#3d2236',v));

 // ---- body ----
 let y='';
 y+=`<rect x="5100" y="2970" width="400" height="740" rx="130" fill="#3c557a" stroke="#7ea6d6" stroke-width="8"/><circle cx="5300" cy="2850" r="125" fill="#3c557a" stroke="#7ea6d6" stroke-width="8"/><ellipse cx="5300" cy="2830" rx="80" ry="62" fill="#f2a6b8"/>`;
 y+=`<ellipse cx="5215" cy="3200" rx="64" ry="125" fill="#ff9fb0"/><ellipse cx="5385" cy="3200" rx="64" ry="125" fill="#ff9fb0"/>`;
 y+=`<path d="M5300 3250 L5300 3000 L5300 2900" stroke="#c62d42" stroke-width="16" fill="none" opacity=".7"/><g id="hrt"></g><g id="bdp"></g><g id="kid"></g>`;
 s+=R(4200,2700,2200,1200,panel('bdy',5300,3300,2200,1200,'#16243a','#223657',y));

 // ---- mask ----
 let m='';
 m+=`<text x="-3250" y="4690" font-family="Poppins" font-weight="700" font-size="34" fill="#9fb4cf">Outside air</text><text x="-1620" y="4690" font-family="Poppins" font-weight="700" font-size="34" fill="#9fb4cf">Your nose</text>`;
 // cloth lane: one sheet with big holes
 m+=`<rect x="-2215" y="4700" width="30" height="240" rx="8" fill="#a9c3de"/>`;[4740,4790,4840,4890].forEach(yy=>{m+=`<rect x="-2217" y="${yy}" width="34" height="26" fill="#2b3d56"/>`});
 // n95 lane: 4 dense layers
 for(let k=0;k<4;k++){m+=`<rect x="${-2300+k*50}" y="5260" width="26" height="240" rx="8" fill="#7bb6e8" opacity=".9"/>`;for(let q=0;q<22;q++){const yy=5262+rnd(q+k*30)*232;m+=`<path d="M${-2306+k*50} ${yy} l${38} ${(rnd(q+k*5)-.5)*30}" stroke="#d8ecff" stroke-width="4" opacity=".9"/>`}}
 m+=`<text x="-2245" y="5245" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="40" fill="#ffe14d">+ − + −</text>`;
 m+=`<g id="mps"></g>`;
 s+=R(-3300,4500,2200,1200,panel('msk',-2200,5100,2200,1200,'#1d2b3e','#2b3d56',m));

 // ---- purifier ----
 let p='';
 p+=`<rect x="-800" y="5560" width="2200" height="140" fill="#5a4a3b"/>`;
 p+=`<rect id="phz" x="-800" y="4500" width="2200" height="1060" fill="#9a8a78" opacity="0.6"/><g id="pps"></g>`;
 p+=`<rect x="170" y="5130" width="260" height="440" rx="30" fill="#e9eef5" stroke="#9fb0c4" stroke-width="8"/>`;
 p+=`<rect x="198" y="5160" width="204" height="150" rx="14" fill="#2a3446"/><path d="M208 5300 l14 -110 l14 110 l14 -110 l14 110 l14 -110 l14 110 l14 -110 l14 110 l14 -110 l14 110 l14 -110 l14 110" stroke="#f0d98a" stroke-width="6" fill="none"/>`;
 for(let q=0;q<6;q++)p+=`<rect x="206" y="${5350+q*30}" width="188" height="8" rx="4" fill="#b7c3d4"/>`;
 p+=`<g id="fan"></g><g id="cln"></g>`;
 s+=R(-800,4500,2200,1200,panel('pur',300,5100,2200,1200,'#2d3b4f','#43556e',p));

 // ---- habits ----
 let u='';
 u+=`<rect x="2150" y="4660" width="300" height="720" rx="46" fill="#10131a" stroke="#cfd8e6" stroke-width="8"/><text x="2300" y="4760" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="40" fill="#aab">AQI</text><text id="phn" x="2300" y="4900" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="110" fill="#ff3b3b">420</text><text id="phc" x="2300" y="4980" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="40" fill="#ff3b3b">Severe</text>`;
 u+=`<g id="jog"></g><g id="win"></g>`;
 s+=R(1700,4500,2200,1200,panel('hab',2800,5100,2200,1200,'#243346','#33465f',u));

 // ---- myths ----
 let w='';
 [4650,5300,5950].forEach((x,i)=>{w+=`<rect x="${x-190}" y="4720" width="380" height="440" rx="30" fill="#f5f1e6" stroke="#c9c2b0" stroke-width="6"/>`});
 w+=`<ellipse cx="4650" cy="4900" rx="110" ry="74" fill="#f4d93a" stroke="#c8a91a" stroke-width="6"/><path d="M4750 4860 q40 -40 70 -10 q-30 30 -70 10z" fill="#5da64c"/><text x="4650" y="5090" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="48" fill="#3a2c12">Lemon</text>`;
 w+=`<path d="M5200 4930 h200 q-10 90 -100 90 q-90 0 -100 -90z" fill="#d8dee8" stroke="#8f9bab" stroke-width="6"/><path d="M5250 4880 q-20 -30 0 -60 M5300 4880 q-20 -30 0 -60 M5350 4880 q-20 -30 0 -60" stroke="#9fb4cf" stroke-width="8" fill="none" stroke-linecap="round"/><text x="5300" y="5090" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="48" fill="#3a2c12">Steam</text>`;
 w+=`<path d="M5880 4830 h140 l-14 170 h-112z" fill="#e9eef5" stroke="#8f9bab" stroke-width="6"/><rect x="5900" y="4930" width="100" height="56" fill="#9a5a24"/><text x="5950" y="5090" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="46" fill="#3a2c12">Jaggery water</text>`;
 for(let q=0;q<3;q++){const x=4800+q*220;w+=`<path d="M${x-40} 5330 h80 l-14 70 h-52z" fill="#b5653a"/><ellipse cx="${x}" cy="5300" rx="22" ry="48" fill="#5da64c"/><ellipse cx="${x-32}" cy="5320" rx="20" ry="40" fill="#4c9a3d" transform="rotate(-30 ${x-32} 5320)"/><ellipse cx="${x+32}" cy="5320" rx="20" ry="40" fill="#4c9a3d" transform="rotate(30 ${x+32} 5320)"/>`}
 w+=`<g id="mx"></g>`;
 s+=R(4200,4500,2200,1200,panel('myt',5300,5100,2200,1200,'#243346','#33465f',w));
 return s}

// ================= INIT / ANIM =================
let G={};
function init(svg){const q=id=>document.getElementById(id);
 G={};['haze','sun','aqn','cp','cars','fires','fs','chs','wnd','crk','mtr','hrow','ndl','gn','gc','dgs','dar','nhz','lid','nps','nn','bwl','bwa','nps2','lps','avp','hrt','bdp','kid','mps','phz','pps','fan','cln','phn','phc','jog','win','mx'].forEach(k=>G[k]=document.getElementById(k));}

const CARS=[];for(let i=0;i<10;i++)CARS.push({lane:i%2,off:rnd(i+1)*2100,col:['#d23b3b','#e8c13a','#3b82d2','#f0f0f0','#2f9d62','#8e44ad'][i%6],sp:0.85+rnd(i)*0.3});
function carDist(t){const a=SC[6].s,b=SC[6].e;return 110*Math.min(t,a)+22*clamp(t-a,0,b-a)+110*Math.max(0,t-b)}
const FIRES=[-3450,-3150,-2850,-2550,-2250,-1950,-1650];
const FX0=SC[4].s+1.2;

function anim(t){
 const d=dens(t),em=emit(t);
 // ---- city ----
 G.haze.setAttribute('opacity',d*0.62);
 G.sun.setAttribute('opacity',1-d*0.55);
 const av=t<SC[0].e?lerp(160,500,easeOut(prog(0,t))):(t<CLEAR0?492+Math.sin(t*0.8)*8:lerp(492,70,clamp((t-CLEAR0)/(CLEAR1-CLEAR0))));
 G.aqn.textContent=Math.round(av);G.aqn.setAttribute('fill',aqiCol(av));
 // sky particles: fog (pale) + smoke (dark)
 let p='';const smk=clamp((t-T(1,'smoke'))/1.2)||0,fg=clamp((t-T(1,'fog'))/1.2)||0;
 for(let i=0;i<150;i++){const x=-1500+((rnd(i)*3000+t*(14+rnd(i+7)*20))%3000),y=-400+rnd(i+30)*700+Math.sin(t*0.8+i)*18;
  const fog=i%2===1;const on=t<SC[1].s?1:(t<SC[1].e?(fog?fg:smk):1);
  p+=C(x,y,fog?9+rnd(i+4)*10:4+rnd(i+5)*4,fog?'#eef6ff':'#3d3a38',(fog?0.55:0.7)*d*on*(i/150<d+0.1?1:0))}
 G.cp.innerHTML=p;
 // cars
 let k='';const dist=carDist(t),jam=t>=SC[6].s&&t<SC[6].e;
 CARS.forEach((c,i)=>{const dir=c.lane?-1:1;let x=((c.off+dir*dist*c.sp)%2100+2100)%2100-1100;const y=c.lane?366:312;
  k+=`<g transform="translate(${f1(x)} ${y}) scale(${dir} 1)"><rect x="-62" y="-4" width="124" height="34" rx="11" fill="${c.col}"/><rect x="-36" y="-26" width="72" height="26" rx="9" fill="${c.col}"/><rect x="-28" y="-22" width="26" height="18" fill="#cfe6f6"/><rect x="2" y="-22" width="26" height="18" fill="#cfe6f6"/><circle cx="-34" cy="30" r="13" fill="#222"/><circle cx="34" cy="30" r="13" fill="#222"/></g>`;
  for(let q=0;q<3;q++){const u=((t*(jam?0.9:1.6)+q/3+i*0.17)%1);k+=C(x-dir*(66+u*60),y+12-u*30,6+u*14,'#6a6a70',0.55*(1-u)*em*(jam?1.5:1))}});
 G.cars.innerHTML=k;
 // metro
 const mx=-1100+((t*160)%3200);G.mtr.innerHTML=`<g transform="translate(${f1(mx)} 10)">${[0,150,300].map(o=>`<rect x="${o}" y="0" width="140" height="48" rx="14" fill="#f5f5f5" stroke="#2d7fd3" stroke-width="5"/><rect x="${o+14}" y="10" width="112" height="16" fill="#8fd3ff"/>`).join('')}</g>`;
 // fires + field smoke
 const fo=clamp((t-FX0)/1.5)*em;let fi='',fsm='';
 FIRES.forEach((fx,j)=>{for(let q=0;q<7;q++){const hh=(60+Math.sin(t*9+q*2+j)*26+rnd(q+j)*30)*fo,xx=fx-90+q*30;fi+=`<path d="M${xx-16} 305 Q${xx} ${305-hh} ${xx+16} 305Z" fill="${q%2?'#ff7a1a':'#ffb21f'}"/>`}
  for(let q=0;q<12;q++){const u=((t*0.07+q/12+j*0.13)%1);const x=fx+u*(-950-fx)+Math.sin(u*9+q)*20,y=230-u*260*(1-u*0.3)+Math.sin(t+q)*8;fsm+=C(x,y,26+u*52,'#6a625a',0.5*(1-u*u)*fo*(u>0.9?(1-u)*10:1))}});
 G.fires.innerHTML=fi;G.fs.innerHTML=fsm;
 // wind arrows
 const wv=clamp((t-SC[5].s)/1)*(1-clamp((t-SC[5].e+0.5)/1));let wa='';for(let i=0;i<6;i++){const x=-3400+((t*170+i*480)%2900);wa+=arrowR(x,-250+(i%3)*70,'#fff',9,70).replace('<path','<path opacity="'+(0.8*wv)+'"')}
 G.wnd.innerHTML=wa;
 // chimney smoke
 let cs='';[1285,1485].forEach((cx,j)=>{for(let q=0;q<14;q++){const u=((t*0.16+q/14+j*0.3)%1);cs+=C(cx+Math.sin(u*5+j)*30+u*220,-130-u*480,22+u*70,'#74747a',0.6*(1-u)*em)}});
 G.chs.innerHTML=cs;
 // crackers
 let ck='';const tc=T(7,'diwali');[[500,-250,0],[720,-360,0.9],[300,-310,1.7]].forEach(([cx,cy,dl],j)=>{const u=clamp((t-tc-dl)/1.8);if(u>0&&u<1){const cols=['#ff4b8b','#ffe14d','#4bd0ff','#9dff6b'];for(let q=0;q<22;q++){const a=q/22*6.283,r=u*230;ck+=C(cx+Math.cos(a)*r,cy+Math.sin(a)*r+u*u*70,8*(1-u*0.5),cols[(q+j)%4],1-u)}}});
 G.crk.innerHTML=ck;

 // ---- hair ----
 let hr='';const th=T(2,'thirty')||SC[2].s+8;for(let q=0;q<28;q++){const u=clamp((t-th-q*0.07)/0.25);if(u>0)hr+=C(-2670+q*20,-1130,10*easeOut(u),'#ff4b4b')}
 for(let q=0;q<26;q++){hr+=C(-3150+((rnd(q)*2100+t*20)%2100),-2050+rnd(q+3)*850+Math.sin(t+q)*12,3+rnd(q+8)*3,'#9fb4cf',0.35)}
 G.hrow.innerHTML=hr;
 // ---- gauge ----
 const gv=clamp((t-SC[3].s-1.5)/(SC[3].e-SC[3].s-4))*470;const ga=(Math.PI-gv/500*Math.PI);
 const nx=200+Math.cos(ga)*440,ny=-1200-Math.sin(ga)*440;
 G.ndl.innerHTML=`<path d="M200 -1200 L${f1(nx)} ${f1(ny)}" stroke="#fff" stroke-width="16" stroke-linecap="round"/>`;
 G.gn.textContent=Math.round(gv);G.gn.setAttribute('fill',aqiCol(gv));G.gc.textContent=aqiName(gv);G.gc.setAttribute('fill',aqiCol(gv));

 // ---- day panel ----
 let dg='',da='';
 for(let q=0;q<36;q++){const ch=q%2?-2400:-2600;const u=((t*0.13+q/36)%1);dg+=C(ch+18+Math.sin(u*6+q)*34+u*120,1680-u*760,14+u*26,'#6e6a68',0.6*(1-u*u*u))}
 for(let q=0;q<7;q++){const u=((t*0.25+q/7)%1);da+=`<g opacity="${(Math.sin(u*Math.PI)).toFixed(2)}">${arrowUp(-3050+q*240,1880-u*620,'#ff8a3d',10)}</g>`}
 for(let q=0;q<3;q++){const u=((t*0.3+q/3)%1);const o=(Math.sin(u*Math.PI)*0.9).toFixed(2);da+=`<g opacity="${o}">${arrowR(-3260+u*420,1760-q*60,'#2d7fd3',9,60)}</g><g opacity="${o}">${arrowR(-1100-u*420,1760-q*60,'#2d7fd3',9,-60)}</g>`}
 G.dgs.innerHTML=dg;G.dar.innerHTML=da;

 // ---- night ----
 const ni=t<SC[11].s?0:prog(11,t);
 const hz=t<SC[10].s?0:(t<SC[11].s?0.08+0.12*prog(10,t):0.2+0.6*ni);
 G.nhz.setAttribute('opacity',hz);
 let lp='M-800 1335';for(let x=-800;x<=1400;x+=100)lp+=` L${x} ${f1(1335+Math.sin(x*0.01+t*1.2)*8)}`;G.lid.setAttribute('d',lp);
 let np='';for(let q=0;q<70;q++){const u=((t*0.12+rnd(q))%1);const cx=-600+rnd(q+5)*1800;let x=cx+Math.sin(u*5+q)*30,y;
  if(u<0.7){y=1860-easeOut(u/0.7)*500}else{y=1360+rnd(q+9)*140*(t<SC[11].s?0.4:1)+(u-0.7)*20;x+=(u-0.7)*(rnd(q)>.5?1:-1)*380}
  np+=C(x,y,12+rnd(q+2)*12,'#6a625a',0.65*(u>0.9?(1-u)*10:1)*emit(t))}
 G.nps.innerHTML=np;
 G.nn.textContent=t<SC[11].s?'':(ni<0.34?'Night 1':ni<0.67?'Night 2':'Night 3');
 // ---- bowl ----
 const bp=t<SC[12].s?0:prog(12,t);const lv=40+560*easeIO(clamp(bp*1.15));
 let bw=`M1700 ${f1(1900-lv)}`;for(let x=1700;x<=3900;x+=100)bw+=` L${x} ${f1(1900-lv+Math.sin(x*0.012+t*1.3)*10)}`;bw+=' L3900 1900 L1700 1900Z';G.bwl.setAttribute('d',bw);
 let ba='';const tr=T(12,'winter');ba+=`<g opacity="${clamp((t-SC[12].s-0.5)/0.8)}"><path d="M1760 1560 h90 m-20 -14 l20 14 l-20 14" stroke="#9fd0ff" stroke-width="7" fill="none" stroke-dasharray="14 10"/></g>`;
 const wu=((t*0.3)%1);ba+=`<g opacity="${clamp((t-T(12,'mountains')+0.2)/0.6)}"><g transform="translate(${f1(-wu*60)} 0)">${arrowR(3080,1150,'#9fd0ff',9,-160)}</g>${cross(3030,1150,28,'#ff4b4b',12)}</g>`;
 G.bwa.innerHTML=ba;

 // ---- nose particles ----
 let q2='';for(let i=0;i<30;i++){const u=((t/6+rnd(i+7))%1),big=i%3===0;const y0=3250+rnd(i)*160;let x,r,col,op=1;
  if(big){const xs=-1350-rnd(i+2)*350,k2=Math.min(1,u*2.4);x=lerp(-1000,xs,easeOut(k2));r=13+rnd(i+4)*4;col='#8a7b66';op=u>0.85?(1-u)*6.6:1;const yy=lerp(y0,rnd(i)>.5?3200:3410,k2);q2+=C(x,yy,r,col,op);continue}
  x=lerp(-1000,-2950,u);r=5;col='#d8304a';q2+=C(x,y0+Math.sin(u*12+i)*18,r,col,op)}
 G.nps2.innerHTML=q2;

 // ---- lungs particles ----
 let lq='';const lstart=T(15,'travels')||SC[15].s;for(let i=0;i<26;i++){const P=LEAVES[(i*5+3)%LEAVES.length];const u=((t/7+rnd(i+3))%1);const big=i%4===0;
  if(big){const [x,y]=along(P,Math.min(u*1.4,0.18));lq+=C(x,y,12,'#8a7b66',u>0.3?Math.max(0,1-(u-0.3)*8):1);continue}
  const [x,y]=along(P,Math.min(1,u*1.15));lq+=C(x,y,7,'#2a2a30')+`<circle cx="${f1(x)}" cy="${f1(y)}" r="11" fill="none" stroke="#ff4b4b" stroke-width="3"/>`}
 G.lps.innerHTML=lq;

 // ---- alveolus ----
 let av2='';const sp=T(16,'smallest')||SC[16].s+10;
 for(let i=0;i<16;i++){const u=((t/5+i/16)%1),a=(-0.9+rnd(i)*1.8);const sx=2150,sy=3300+(rnd(i+3)-.5)*160;const wx=2650+380*Math.cos(a),wy=3300+380*Math.sin(a);let x,y;
  if(u<0.5){const k2=easeIO(u/0.5);x=lerp(sx,wx,k2);y=lerp(sy,wy,k2)}else{const aa=a+(u-0.5)*1.6;x=2650+(380+(u-0.5)*2*130)*Math.cos(aa);y=3300+(380+(u-0.5)*2*130)*Math.sin(aa)}
  av2+=C(x,y,17,'#4aa3ff',0.95)+`<text x="${f1(x)}" y="${f1(y+7)}" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="18" fill="#fff">O₂</text>`}
 const pm=clamp((t-sp)/1.2);if(pm>0)for(let i=0;i<8;i++){const u=((t/5.5+i/8)%1),a=(-0.7+rnd(i+20)*1.4);const sx=2150,sy=3300+(rnd(i+9)-.5)*140;const wx=2650+380*Math.cos(a),wy=3300+380*Math.sin(a);let x,y;
  if(u<0.5){const k2=easeIO(u/0.5);x=lerp(sx,wx,k2);y=lerp(sy,wy,k2)}else{const aa=a+(u-0.5)*1.6;x=2650+(380+(u-0.5)*2*130)*Math.cos(aa);y=3300+(380+(u-0.5)*2*130)*Math.sin(aa)}
  av2+=C(x,y,10,'#2a2a30',pm)+`<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="none" stroke="#ff4b4b" stroke-width="4" opacity="${pm}"/>`}
 G.avp.innerHTML=av2;

 // ---- body ----
 const beat=1+0.12*Math.sin(t*7);G.hrt.innerHTML=`<path d="M5300 3300 C5240 3250 5240 3330 5300 3380 C5360 3330 5360 3250 5300 3300Z" fill="#e34b5f" transform="translate(5300 3330) scale(${(beat*1.6).toFixed(2)}) translate(-5300 -3330)"/>`;
 const BP=[[5300,3250],[5300,3000],[5300,2900],[5300,2840]];let bd='';const bs=T(17,'asthma')||SC[17].s;
 for(let i=0;i<10;i++){const u=((t/4+i/10)%1);const [x,y]=along(BP,u);bd+=C(x+(rnd(i)-.5)*10,y,9,'#2a2a30',clamp((t-SC[17].s)/1))}
 G.bdp.innerHTML=bd;
 const kr=(r)=>{const k3=1+0.22*Math.sin(t*r*6.283);return k3};
 G.kid.innerHTML=[[5900,'#5fa8e8',1,0.95,0.55],[6150,'#f0a35e',1.7,0.7,0.4]].map(([x,col,rate,hh,ww])=>`<g><circle cx="${x}" cy="${3040+(1-hh)*160}" r="${42*(0.5+hh*0.5)}" fill="#e0a77a"/><rect x="${x-52*ww-12}" y="${3100+(1-hh)*160}" width="${(52*ww+12)*2}" height="${420*hh}" rx="40" fill="${col}"/><ellipse cx="${x}" cy="${3200+(1-hh)*160}" rx="${34*kr(rate*0.45)}" ry="${48*kr(rate*0.45)}" fill="#ff9fb0"/></g>`).join('')+`<text x="5900" y="3660" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#cfd8e6">Adult</text><text x="6150" y="3660" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#cfd8e6">Child</text>`;

 // ---- masks ----
 let mp='';for(let i=0;i<34;i++){const lane=i%2;const y0=(lane?5290:4730)+((rnd(i)*190)),u=((t/6+rnd(i+11))%1),big=rnd(i+4)>0.55;const r=big?13:6;
  const x0=-3150,x1=-1700;let x;
  if(!lane){ if(big){const xs=-2235;x=lerp(x0,xs,Math.min(1,u*1.8));if(u>0.62)x=xs;mp+=C(x,y0,r,'#8a7b66',u>0.9?(1-u)*10:1)}else{x=lerp(x0,x1,u);mp+=C(x,y0+Math.sin(u*14+i)*10,r,'#d8304a',1)}}
  else{ const pass=rnd(i+40)>0.94;const xs=big?-2310:-2290+Math.floor(rnd(i+2)*4)*50;
    if(pass){x=lerp(x0,x1,u);mp+=C(x,y0,r,'#d8304a',1)}else{x=lerp(x0,xs,Math.min(1,u*1.8));if(u>0.55)x=xs;mp+=C(x,y0,r,big?'#8a7b66':'#d8304a',u>0.9?(1-u)*10:1)}}}
 G.mps.innerHTML=mp;

 // ---- purifier ----
 const pc=t<SC[19].s?0:prog(19,t);const lvl=0.62*(1-easeIO(clamp(pc*1.1)))+0.04;G.phz.setAttribute('opacity',lvl);
 let pp='';for(let i=0;i<60;i++){const u=((t*0.09+rnd(i))%1);const sx=-700+rnd(i+2)*2000,sy=4700+rnd(i+6)*780;const k3=easeIO(clamp((u-0.25)/0.7));pp+=C(lerp(sx,300,k3)+Math.sin(t+i)*8*(1-k3),lerp(sy,5240,k3),6+rnd(i+9)*6,'#5a504a',0.9*(1-k3)*(lvl+0.25>rnd(i+12)?1:0.1)*(t<SC[19].s?1:1))}
 G.pps.innerHTML=pp;
 G.fan.innerHTML=`<g transform="translate(300 5460) rotate(${f1(t*500)})"><circle r="62" fill="#2a3446"/>${[0,90,180,270].map(a=>`<path d="M0 0 Q30 -20 50 -50 Q10 -40 0 0Z" fill="#8fd3ff" transform="rotate(${a})"/>`).join('')}<circle r="10" fill="#e9eef5"/></g>`;
 let cn='';for(let i=0;i<18;i++){const u=((t*0.35+i/18)%1);cn+=C(300+Math.sin(u*8+i)*(30+u*140),5110-u*520,5+u*8,'#8fd3ff',0.8*(1-u))}
 G.cln.innerHTML=cn;

 // ---- habits ----
 const aft=T(20,'afternoon');const dayOk=t>=aft;G.phn.textContent=dayOk?'130':'420';G.phn.setAttribute('fill',dayOk?'#ffb43b':'#ff3b3b');G.phc.textContent=dayOk?'Moderate':'Severe';G.phc.setAttribute('fill',dayOk?'#ffb43b':'#ff3b3b');
 const jx=clamp((t-T(20,'jogging'))/0.4);G.jog.innerHTML=`<g transform="translate(2800 4960)"><circle cx="0" cy="-90" r="30" fill="#e0a77a"/><path d="M0 -60 L-6 40 M0 -50 L-50 -10 M0 -50 L44 -34 M-6 40 L-44 110 M-6 40 L40 100" stroke="#cfd8e6" stroke-width="14" stroke-linecap="round" fill="none"/><text x="0" y="170" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="44" fill="#ffb43b">6 AM</text><g transform="scale(${(2.3-1.3*easeOut(jx)).toFixed(2)})" opacity="${jx}">${cross(0,0,100,'#ff4b4b',22)}</g></g>`;
 const wo=clamp((t-aft)/0.8),wc=clamp((t-T(20,'windows'))/0.5);
 G.win.innerHTML=`<g transform="translate(3350 4960)"><rect x="-110" y="-150" width="220" height="300" rx="10" fill="#9fd0ff" stroke="#e9eef5" stroke-width="12"/><rect x="${f1(-104-wo*0)}" y="-144" width="${f1(102-wo*92)}" height="288" fill="#d9ecfa" opacity=".9"/><rect x="${f1(2+wo*92)}" y="-144" width="${f1(102-wo*92)}" height="288" fill="#d9ecfa" opacity=".9"/><path d="M-60 210 l30 30 l70 -70" stroke="#4caf50" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${wc*(1-wo)}"/><text x="0" y="300" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="40" fill="${wo>0.5?'#4caf50':'#ffb43b'}">${wo>0.5?'Afternoon: open':'Worst days: closed'}</text></g>`;

 // ---- myths ----
 let mxs='';[[4650,'lemon'],[5300,'steam'],[5950,'jaggery']].forEach(([x,w])=>{const u=clamp((t-T(21,w))/0.3);if(u>0)mxs+=`<g transform="translate(${x} 4930) scale(${(2.2-1.2*easeOut(u)).toFixed(2)})" opacity="${u}">${cross(0,0,110,'#ff4b4b',24)}</g>`});
 G.mx.innerHTML=mxs;
}

// ================= LABELS =================
H({sc:0,w:0,x:0,y:-400,html:pill('Delhi in November')});
H({sc:1,w:0,x:0,y:-400,html:pill('Smog = Smoke + Fog')});
A({sc:1,w:wi(1,'smoke'),x:-300,y:-140,html:lbl('Smoke','#3d3a38')});
A({sc:1,w:wi(1,'fog'),x:280,y:-120,html:lbl('Fog','#cfe3f7')});
H({sc:2,w:0,x:0,y:-400,html:pill('PM 2.5: too small to see')});
A({sc:2,w:wi(2,'strand'),x:-2400,y:-1850,html:lbl('1 hair ≈ 70 µm','#c9a27a')});
A({sc:2,w:wi(2,'two'),x:-1380,y:-1580,html:lbl('PM 2.5 = 2.5 µm','#ff4b4b')});
A({sc:2,w:wi(2,'twenty'),x:-2400,y:-1060,html:lbl('28 fit across 1 hair','#ff4b4b')});
H({sc:3,w:0,x:0,y:-400,html:pill('Air Quality Index (AQI)')});
H({sc:4,w:0,x:0,y:-400,html:pill('Source 1: Stubble burning')});
A({sc:4,w:wi(4,'only'),x:-3560,y:130,html:lbl('Few weeks to clear the field','#e8d28a')});
A({sc:4,w:wi(4,'burning'),x:-2550,y:-30,html:lbl('Burning = cheap & fast','#ff7a1a')});
H({sc:5,w:0,x:0,y:-400,html:pill('The smoke travels to Delhi')});
A({sc:5,w:wi(5,'northwest'),x:-2400,y:-340,html:lbl('North-west wind','#fff')});
H({sc:6,w:0,x:0,y:-400,html:pill('Source 2: Vehicles')});
A({sc:6,w:wi(6,'exhaust'),x:-50,y:190,html:lbl('Soot + nitrogen oxides','#8a8a90')});
A({sc:6,w:wi(6,'jammed'),x:420,y:250,html:lbl('Jam = more fumes','#ff7a1a')});
H({sc:7,w:0,x:0,y:-400,html:pill('Source 3: Factories, dust, crackers')});
A({sc:7,w:wi(7,'factories'),x:1350,y:-200,html:lbl('Factories & coal power plants','#8a4c3a')});
A({sc:7,w:wi(7,'construction'),x:1000,y:-250,html:lbl('Construction dust','#f0b323')});
A({sc:7,w:wi(7,'diwali'),x:500,y:-470,html:lbl('Diwali crackers','#ff4b8b')});
H({sc:8,w:0,x:0,y:-400,html:pill('Why is winter the worst?')});
A({sc:8,w:wi(8,'temperature'),x:-2200,y:1010,html:lbl('Temperature inversion','#ffb43b')});
H({sc:9,w:0,x:0,y:-400,html:pill('Normal day: warm air rises')});
A({sc:9,w:wi(9,'light'),x:-2250,y:1160,html:lbl('Warm air rises','#ff8a3d')});
A({sc:9,w:wi(9,'fresh'),x:-2650,y:1650,html:lbl('Fresh air comes in','#2d7fd3')});
H({sc:10,w:0,x:0,y:-400,html:pill('Winter night: cold air is heavy')});
A({sc:10,w:wi(10,'warm'),x:700,y:1250,html:lbl('Warm air = lid','#ffb43b')});
A({sc:10,w:wi(10,'cold'),x:-400,y:1700,html:lbl('Cold heavy air','#6fb0ff')});
H({sc:11,w:0,x:0,y:-400,html:pill('Smoke gets trapped under the lid')});
A({sc:11,w:wi(11,'invisible'),x:300,y:1290,html:lbl('Invisible lid','#fff')});
H({sc:12,w:0,x:0,y:-400,html:pill('Delhi is like a bowl')});
A({sc:12,w:wi(12,'himalayas'),x:3500,y:1000,html:lbl('Himalayas','#fff')});
A({sc:12,w:wi(12,'winter'),x:2050,y:1450,html:lbl('Weak winter wind','#9fd0ff')});
A({sc:12,w:wi(12,'sea'),x:2050,y:1000,html:lbl('Far from the sea','#4aa3ff')});
H({sc:13,w:0,x:0,y:-400,html:pill('Journey inside your nose')});
H({sc:14,w:0,x:0,y:-400,html:pill('Your nose: the doormat')});
A({sc:14,w:wi(14,'tiny'),x:-1500,y:3130,html:lbl('Nose hair + mucus','#d8e88a')});
A({sc:14,w:wi(14,'larger'),x:-1900,y:3500,html:lbl('Big dust: caught','#8a7b66')});
A({sc:14,w:wi(14,'sneeze'),x:-2500,y:3500,html:lbl('Sneeze it out!','#ff7a1a')});
H({sc:15,w:0,x:0,y:-400,html:pill('PM 2.5 slips through')});
A({sc:15,w:wi(15,'windpipe'),x:520,y:2880,html:lbl('Windpipe','#fff')});
A({sc:15,w:wi(15,'alveoli'),x:LP[0]+40,y:LP[1]+90,html:lbl('Alveoli: ~500 million air sacs','#ff9fb0')});
H({sc:16,w:0,x:0,y:-400,html:pill('Into your blood')});
A({sc:16,w:wi(16,'oxygen'),x:2200,y:3150,html:lbl('Oxygen goes in','#4aa3ff')});
A({sc:16,w:wi(16,'smallest'),x:3000,y:3000,html:lbl('PM 2.5 crosses too!','#ff4b4b')});
A({sc:16,w:wi(16,'heart'),x:3330,y:3760,html:lbl('Travels to heart & brain','#ff9fb0')});
H({sc:17,w:0,x:0,y:-400,html:pill('Harm to lungs, heart, brain')});
A({sc:17,w:wi(17,'asthma'),x:5100,y:3200,html:lbl('Asthma','#ff9fb0')});
A({sc:17,w:wi(17,'heart'),x:5520,y:3340,html:lbl('Heart','#e34b5f')});
A({sc:17,w:wi(17,'children'),x:6000,y:2840,html:lbl('Kids breathe faster','#f0a35e')});
H({sc:18,w:0,x:0,y:-400,html:pill('Protection 1: Masks')});
A({sc:18,w:wi(18,'cloth'),x:-2250,y:4660,html:lbl('Cloth / surgical: gaps','#ffb43b')});
A({sc:18,w:wi(18,'n95'),x:-2250,y:5230,html:lbl('N95: layers + static charge','#7bb6e8')});
H({sc:19,w:0,x:0,y:-400,html:pill('Protection 2: HEPA air purifier')});
A({sc:19,w:wi(19,'fan'),x:300,y:5090,html:lbl('Traps down to 0.3 µm','#8fd3ff')});
A({sc:19,w:wi(19,'doors'),x:-250,y:5230,html:lbl('Keep doors closed','#ffb43b')});
H({sc:20,w:0,x:0,y:-400,html:pill('Protection 3: Smart habits')});
A({sc:20,w:wi(20,'check'),x:2300,y:4600,html:lbl('Check AQI first','#ffe14d')});
A({sc:20,w:wi(20,'jogging'),x:2800,y:4760,html:lbl('No early-morning jog','#ff4b4b')});
H({sc:21,w:0,x:0,y:-400,html:pill('Myths vs science')});
A({sc:21,w:wi(21,'indoor'),x:5300,y:5460,html:lbl('You would need a jungle','#5da64c')});
H({sc:22,w:0,x:0,y:-400,html:pill('The real fix: all of us together')});
A({sc:22,w:wi(22,'public'),x:-300,y:20,html:lbl('Public transport','#2d7fd3')});
A({sc:22,w:wi(22,'factories'),x:1450,y:-250,html:lbl('Cleaner factories','#8a4c3a')});
A({sc:22,w:wi(22,'stubble'),x:-2800,y:130,html:lbl('No stubble burning','#e8d28a')});
A({sc:22,w:wi(22,'cracker'),x:500,y:-400,html:lbl('Less cracker smoke','#ff4b8b')});
H({sc:23,w:0,x:0,y:-400,html:pill('Understanding = first step','#2d7fd3')});

// ================= CAMERA =================
const cam=[
 {sc:0,x:-60,y:-110,z:0.85},{sc:0,w:wi(0,'screen'),x:-100,y:-330,z:1.5},
 {sc:1,x:0,y:10,z:1.25},{sc:1,w:wi(1,'mix'),x:200,y:40,z:1.4},
 {sc:2,x:-2200,y:-1500,z:0.95},{sc:2,w:wi(2,'twenty'),x:-2400,y:-1250,z:1.45},
 {sc:3,x:200,y:-1330,z:1.0},
 {sc:4,x:-3000,y:60,z:0.85},{sc:4,w:wi(4,'burning'),x:-2700,y:100,z:1.4},
 {sc:5,x:-2500,y:-60,z:0.75},{sc:5,w:wi(5,'carries'),x:-1500,y:-60,z:0.7},{sc:5,w:wi(5,'straight'),x:-500,y:-40,z:0.85},
 {sc:6,x:-250,y:120,z:1.4},{sc:6,w:wi(6,'slow'),x:300,y:140,z:1.5},
 {sc:7,x:1250,y:10,z:0.95},{sc:7,w:wi(7,'dust'),x:1000,y:60,z:1.25},{sc:7,w:wi(7,'diwali'),x:480,y:-160,z:1.0},
 {sc:8,x:-2200,y:1500,z:0.8},
 {sc:9,x:-2200,y:1480,z:1.0},
 {sc:10,x:300,y:1550,z:1.0},
 {sc:11,x:300,y:1450,z:1.35},
 {sc:12,x:2800,y:1500,z:0.95},{sc:12,w:wi(12,'bowl'),x:2800,y:1520,z:1.0},
 {sc:13,x:-2200,y:3300,z:0.9},
 {sc:14,x:-1700,y:3320,z:1.5},
 {sc:15,x:300,y:3170,z:0.8},{sc:15,w:wi(15,'alveoli'),x:LP[0]+40,y:LP[1]-20,z:1.7},
 {sc:16,x:2700,y:3300,z:1.15},{sc:16,w:wi(16,'smallest'),x:2950,y:3320,z:1.65},
 {sc:17,x:5300,y:3150,z:0.8},{sc:17,w:wi(17,'children'),x:5800,y:3250,z:1.1},
 {sc:18,x:-2200,y:5060,z:0.95},{sc:18,w:wi(18,'n95'),x:-2250,y:5330,z:1.5},
 {sc:19,x:300,y:5060,z:0.95},
 {sc:20,x:2800,y:5000,z:0.95},
 {sc:21,x:5300,y:5050,z:0.95},
 {sc:22,x:-700,y:0,z:0.6},{sc:22,w:wi(22,'cleaner'),x:600,y:-50,z:0.75},
 {sc:23,x:0,y:-250,z:0.9}];
return {art,init,anim,cam,sfx:()=>[]};
};
