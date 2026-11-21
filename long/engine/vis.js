// Visual library for long videos: body diagram with glowing organs, icons, pie, bars, meters.
window.VIS=(E,K)=>{
const {clamp,easeOut,rnd}=E;const {f1,C,tx}=K;
const G=(x,y,s,inner,extra)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" ${extra||''}>${inner}</g>`;
const ST='stroke="#fff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"';
// ---------- icons (centered, ~120 box) ----------
const IC={
drop:(t)=>`<path d="M0 -62 C28 -22 50 6 50 30 C50 56 28 68 0 68 C-28 68 -50 56 -50 30 C-50 6 -28 -22 0 -62Z" fill="#3aa0ff" ${ST}/><path d="M-26 28 C-26 44 -16 54 -2 56" stroke="#cfeeff" stroke-width="9" fill="none" stroke-linecap="round"/>`,
salt:()=>`<rect x="-38" y="-10" width="76" height="72" rx="14" fill="#e8f0ff" ${ST}/><path d="M-38 -10 Q-38 -58 0 -58 Q38 -58 38 -10Z" fill="#b9c8ea" ${ST}/><g fill="#33405f"><circle cx="-14" cy="-34" r="5"/><circle cx="0" cy="-42" r="5"/><circle cx="14" cy="-34" r="5"/><circle cx="0" cy="-26" r="5"/></g><text x="0" y="40" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="26" fill="#33405f">SALT</text>`,
bact:(t)=>`<g transform="rotate(${f1(-25+Math.sin(t*2)*8)})"><rect x="-56" y="-30" width="112" height="60" rx="30" fill="#7aff8a" ${ST}/><circle cx="-14" cy="-4" r="9" fill="#fff"/><circle cx="14" cy="-4" r="9" fill="#fff"/><circle cx="-12" cy="-3" r="4" fill="#111"/><circle cx="16" cy="-3" r="4" fill="#111"/><path d="M-10 12 Q0 20 10 12" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M56 0 q22 ${f1(Math.sin(t*5)*16)} 40 0 M-56 0 q-22 ${f1(-Math.sin(t*5)*16)} -40 0 M-20 -30 l-8 -22 M20 -30 l8 -22" stroke="#7aff8a" stroke-width="7" fill="none" stroke-linecap="round"/></g>`,
bowl:(t)=>`<g fill="none" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"><path d="M-40 -10 Q-28 -50 -14 -10 T14 -10 T40 -10"/><path d="M-30 6 Q-18 -34 -4 6 T24 6 T44 6"/></g><path d="M-62 4 H62 Q56 66 0 72 Q-56 66 -62 4Z" fill="#ff4b3a" ${ST}/><path d="M-26 -58 q-8 -14 0 -26 M0 -62 q-8 -14 0 -26 M26 -58 q-8 -14 0 -26" stroke="#fff" stroke-width="7" fill="none" opacity="${f1(0.5+0.4*Math.sin(t*4))}" stroke-linecap="round"/>`,
veg:()=>`<rect x="-14" y="10" width="28" height="56" rx="10" fill="#9be15d" ${ST}/><g fill="#2fbf4f" ${ST}><circle cx="-34" cy="-8" r="28"/><circle cx="34" cy="-8" r="28"/><circle cx="0" cy="-34" r="32"/><circle cx="0" cy="4" r="30"/></g>`,
egg:()=>`<path d="M0 -60 C34 -60 50 -10 50 22 C50 50 28 64 0 64 C-28 64 -50 50 -50 22 C-50 -10 -34 -60 0 -60Z" fill="#fffaf0" ${ST}/><circle cx="0" cy="18" r="22" fill="#ffc42e" stroke="#e59a00" stroke-width="5"/>`,
pill:()=>`<g transform="rotate(-35)"><rect x="-58" y="-26" width="116" height="52" rx="26" fill="#ff6a4a" ${ST}/><path d="M0 -26 H32 A26 26 0 0 1 32 26 H0Z" fill="#fff"/><rect x="-58" y="-26" width="116" height="52" rx="26" fill="none" ${ST}/></g>`,
bolt:(t)=>`<path d="M14 -68 L-36 8 H-6 L-18 68 L40 -14 H8Z" fill="#ffd23f" ${ST} opacity="${f1(0.8+0.2*Math.sin(t*8))}"/>`,
bolt0:()=>`<path d="M14 -68 L-36 8 H-6 L-18 68 L40 -14 H8Z" fill="#7a8190" ${ST}/>`,
cube:()=>`<rect x="-44" y="-44" width="88" height="88" rx="12" fill="#fff" stroke="#ddd" stroke-width="6" transform="rotate(-10)"/><g fill="#cfe3ff"><circle cx="-18" cy="-12" r="6"/><circle cx="14" cy="10" r="6"/><circle cx="-6" cy="22" r="6"/></g>`,
sun:(t)=>`<g stroke="#ffd23f" stroke-width="9" stroke-linecap="round" transform="rotate(${f1(t*30)})">${[0,1,2,3,4,5,6,7].map(i=>`<line x1="0" y1="-52" x2="0" y2="-72" transform="rotate(${i*45})"/>`).join('')}</g><circle r="38" fill="#ffd23f" ${ST}/>`,
therm:(t)=>`<rect x="-14" y="-64" width="28" height="100" rx="14" fill="#fff" ${ST}/><circle cx="0" cy="44" r="26" fill="#ff3b3b" ${ST}/><rect x="-6" y="${f1(-20-Math.abs(Math.sin(t*2))*30)}" width="12" height="${f1(60+Math.abs(Math.sin(t*2))*30)}" fill="#ff3b3b"/>`,
shield:()=>`<path d="M0 -64 L52 -42 V8 C52 40 28 58 0 70 C-28 58 -52 40 -52 8 V-42Z" fill="#4aa8ff" ${ST}/><path d="M-20 4 L-6 20 L24 -12" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
warn:()=>`<path d="M0 -62 L62 50 H-62Z" fill="#ffd23f" ${ST}/><rect x="-6" y="-24" width="12" height="40" rx="6" fill="#222"/><circle cx="0" cy="32" r="7" fill="#222"/>`,
sad:()=>`<circle r="56" fill="#ffd23f" ${ST}/><circle cx="-20" cy="-12" r="7" fill="#222"/><circle cx="20" cy="-12" r="7" fill="#222"/><path d="M-24 30 Q0 8 24 30" stroke="#222" stroke-width="8" fill="none" stroke-linecap="round"/>`,
happy:()=>`<circle r="56" fill="#ffd23f" ${ST}/><circle cx="-20" cy="-12" r="7" fill="#222"/><circle cx="20" cy="-12" r="7" fill="#222"/><path d="M-26 14 Q0 44 26 14" stroke="#222" stroke-width="8" fill="none" stroke-linecap="round"/>`,
zzz:(t)=>`<text x="-30" y="20" font-family="Poppins" font-weight="800" font-size="70" fill="#8fd3ff">Z</text><text x="10" y="-14" font-family="Poppins" font-weight="800" font-size="54" fill="#8fd3ff" opacity=".8">z</text>`,
dumb:()=>`<g ${ST}><rect x="-66" y="-30" width="22" height="60" rx="6" fill="#6b7a99"/><rect x="44" y="-30" width="22" height="60" rx="6" fill="#6b7a99"/><rect x="-44" y="-10" width="88" height="20" fill="#9aa8c8"/></g>`,
heartI:(t)=>`<path d="M0 54 C-86 -10 -46 -64 0 -24 C46 -64 86 -10 0 54Z" fill="#ff3b5c" ${ST} transform="scale(${f1(1+0.08*Math.abs(Math.sin(t*5)))})"/>`,
skin:()=>`<rect x="-46" y="-56" width="92" height="112" rx="26" fill="#f2c9a0" ${ST}/><g stroke="#c99468" stroke-width="5" stroke-linecap="round"><path d="M-22 -20 l10 8 M14 -30 l8 10 M-10 20 l12 -6 M20 24 l8 8"/></g>`,
hair:()=>`<g stroke="#5a3a22" stroke-width="12" stroke-linecap="round" fill="none"><path d="M-36 -50 Q-20 0 -36 54"/><path d="M-12 -56 Q4 0 -12 58"/><path d="M12 -56 Q28 0 12 58"/><path d="M36 -50 Q52 0 36 54"/></g>`,
food:()=>`<circle r="62" fill="#fff" ${ST}/><circle r="44" fill="#f0f4ff"/><circle cx="-14" cy="-8" r="16" fill="#ff6a4a"/><circle cx="14" cy="-14" r="14" fill="#7ed957"/><circle cx="6" cy="16" r="15" fill="#ffd23f"/>`,
water:(t)=>`<path d="M-40 -50 H40 L30 56 Q0 66 -30 56Z" fill="#cfeeff" opacity=".35" ${ST}/><path d="M-35 ${f1(-6+Math.sin(t*3)*3)} H35 L30 52 Q0 62 -30 52Z" fill="#3aa0ff"/>`,
clock:(t)=>`<circle r="58" fill="#fff" ${ST}/><line x1="0" y1="0" x2="0" y2="-38" stroke="#222" stroke-width="8" stroke-linecap="round" transform="rotate(${f1(t*40)})"/><line x1="0" y1="0" x2="26" y2="0" stroke="#222" stroke-width="8" stroke-linecap="round"/>`,
phone:()=>`<rect x="-34" y="-62" width="68" height="124" rx="14" fill="#2a3350" ${ST}/><rect x="-26" y="-48" width="52" height="86" rx="4" fill="#4aa8ff"/>`,
gut:()=>`<path d="M-50 -40 H50 V-6 H-50 V26 H50 V56" stroke="#ff9a7a" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
brainI:()=>`<path d="M0 -50 C-50 -64 -70 -20 -54 6 C-68 34 -36 62 -6 48 L-6 -50Z M0 -50 C50 -64 70 -20 54 6 C68 34 36 62 6 48 L6 -50Z" fill="#ff9ab8" ${ST}/>`,
lungI:()=>`<path d="M-8 -50 C-52 -44 -66 20 -56 50 C-40 62 -10 52 -8 30Z M8 -50 C52 -44 66 20 56 50 C40 62 10 52 8 30Z" fill="#ff8aa0" ${ST}/><path d="M0 -62 V-10" stroke="#fff" stroke-width="8"/>`,
kidI:()=>`<path d="M20 -56 C-30 -56 -56 -20 -40 20 C-30 48 -4 60 12 40 C0 20 8 8 24 2 C48 -8 50 -56 20 -56Z" fill="#c0506a" ${ST}/>`,
chart:(t)=>`<path d="M-56 50 H56 M-56 50 V-56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-44 -30 L-16 -4 L6 -14 L40 34" stroke="#ff5470" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
check:()=>`<circle r="54" fill="#2fe0a8" ${ST}/><path d="M-24 2 L-6 22 L26 -16" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
cross:()=>`<circle r="54" fill="#ff4b4b" ${ST}/><path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`,
doc:()=>`<rect x="-52" y="-24" width="104" height="82" rx="14" fill="#fff" ${ST}/><path d="M-24 -24 V-44 H24 V-24" stroke="#fff" stroke-width="9" fill="none"/><path d="M-12 8 H12 M0 -4 V20" stroke="#ff3b5c" stroke-width="12" stroke-linecap="round"/>`
};
const icon=(n,x,y,s,t)=>G(x,y,s,(IC[n]||IC.check)(t||0));
// ---------- body ----------
const ORG={brain:[0,-405],mouth:[0,-338],lungs:[0,-175],heart:[-28,-150],liver:[-70,-72],stomach:[52,-86],gut:[0,12],kidney:[0,-38],skin:[0,-120],muscle:[-190,-120],hair:[0,-470]};
const bodyBase=`<g fill="#bcd4ff" fill-opacity=".14" ${ST}><circle cx="0" cy="-390" r="92"/><rect x="-24" y="-300" width="48" height="40" rx="12"/><rect x="-150" y="-275" width="300" height="440" rx="90"/><rect x="-225" y="-250" width="62" height="330" rx="31" transform="rotate(7 -194 -250)"/><rect x="163" y="-250" width="62" height="330" rx="31" transform="rotate(-7 194 -250)"/><rect x="-125" y="130" width="100" height="400" rx="46"/><rect x="25" y="130" width="100" height="400" rx="46"/></g>`;
const organs=(o,t)=>{
 const dim=(k)=>o==k?1:0.28;const pu=1+0.07*Math.abs(Math.sin(t*5));
 const br=`<g opacity="${dim('brain')}"><path d="M0 -440 C-50 -450 -72 -410 -58 -384 C-70 -360 -40 -340 -8 -352 L-8 -440Z M0 -440 C50 -450 72 -410 58 -384 C70 -360 40 -340 8 -352 L8 -440Z" fill="#ff9ab8" ${ST}/></g>`;
 const mo=`<g opacity="${dim('mouth')}"><ellipse cx="0" cy="-338" rx="34" ry="${f1(12+(o=='mouth'?5*Math.sin(t*4):0))}" fill="#e0405f" ${ST}/></g>`;
 const lu=`<g opacity="${dim('lungs')}"><path d="M-12 -240 C-70 -236 -112 -170 -100 -108 C-84 -92 -30 -102 -12 -150Z M12 -240 C70 -236 112 -170 100 -108 C84 -92 30 -102 12 -150Z" fill="#ff8aa0" ${ST} transform="scale(1 ${f1(o=='lungs'?1+0.04*Math.sin(t*3):1)})"/></g>`;
 const he=G(-28,-150,o=='heart'?pu:1,`<path d="M0 46 C-82 -6 -48 -58 0 -20 C48 -58 82 -6 0 46Z" fill="#ff3b5c" ${ST}/>`,`opacity="${dim('heart')}"`);
 const li=`<g opacity="${dim('liver')}"><path d="M-120 -96 C-70 -126 -10 -108 0 -70 C-20 -30 -80 -26 -110 -52Z" fill="#b5502e" ${ST}/></g>`;
 const st=`<g opacity="${dim('stomach')}"><path d="M20 -126 C70 -126 100 -96 90 -54 C80 -26 40 -34 36 -62 C30 -80 14 -90 20 -126Z" fill="#ffb27a" ${ST}/></g>`;
 const gu=`<g opacity="${dim('gut')}"><path d="M-84 -14 H84 V22 H-84 V58 H84" stroke="#ff9a7a" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
 const ki=`<g opacity="${dim('kidney')}"><ellipse cx="-96" cy="-40" rx="24" ry="40" fill="#c0506a" ${ST}/><ellipse cx="96" cy="-40" rx="24" ry="40" fill="#c0506a" ${ST}/></g>`;
 return br+mo+lu+li+st+ki+gu+he;
};
const glow=(o,t)=>{if(!ORG[o])return '';const [x,y]=ORG[o];if(o=='skin')return `<rect x="-160" y="-290" width="320" height="460" rx="94" fill="none" stroke="#ffd23f" stroke-width="12" opacity="${f1(0.5+0.4*Math.sin(t*4))}"/>`;
 const r=o=='gut'?150:(o=='lungs'?170:(o=='brain'||o=='hair'?120:90));return `<circle cx="${x}" cy="${y}" r="${f1(r+10*Math.sin(t*4))}" fill="#ffd23f" opacity="${f1(0.22+0.1*Math.sin(t*4))}"/>`};
const body=(cx,cy,s,o,t)=>G(cx,cy,s,glow(o,t)+bodyBase+organs(o,t));
const orgPos=(cx,cy,s,o)=>{const [x,y]=ORG[o]||[0,-100];return [cx+x*s,cy+y*s]};
// ---------- tiles ----------
const tile=(x,y,w,ic,label,u,col,t)=>{const sc=0.9+0.1*u;let ac='#2fe0a8';if(col&&/^#[0-9a-f]{6}$/i.test(col)){const r=parseInt(col.slice(1,3),16),g=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);ac=(r>140&&g<110)?'#ff5470':(b>r+40?'#4aa8ff':'#2fe0a8')}
 const h=210;return `<g opacity="${f1(u)}" transform="translate(${f1(x)} ${f1(y+(1-u)*40)}) scale(${f1(sc)})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="40" fill="#0b1630" fill-opacity=".82" stroke="${ac}" stroke-width="6"/>${icon(ic,-w/2+120,0,1.2,t)}${tx(-w/2+230,16,label,48,'#fff','start',800)}</g>`};
// scene: body on left, tiles on right, dashed callout lines
const scene=(cx,cy,t,org,items,u)=>{let s=body(cx-560,cy+40,0.92,org,t);const [ox,oy]=orgPos(cx-560,cy+40,0.92,org);
 const n=items.length,sp=250;
 items.forEach((it,i)=>{const y=cy-(n-1)*sp/2+i*sp+10;const uu=u[i];if(uu>0.02){s+=`<path d="M${f1(ox)} ${f1(oy)} Q${f1((ox+cx+60)/2)} ${f1((oy+y)/2-80)} ${cx+70} ${f1(y)}" stroke="#ffd23f" stroke-width="5" fill="none" stroke-dasharray="14 12" stroke-dashoffset="${f1(-t*40)}" opacity="${f1(0.55*uu)}"/>`;}
  s+=tile(cx+500,y,860,it[2]||'check',it[1],uu,it[3],t)});
 return s};
// ---------- charts ----------
const pie=(cx,cy,r,sl,u,t)=>{const tot=sl.reduce((a,b)=>a+b[1],0);let a0=-Math.PI/2,s='';sl.forEach(([lab,v,col],i)=>{const a1=a0+v/tot*Math.PI*2*u;const lg=(a1-a0)>Math.PI?1:0;const x0=cx+Math.cos(a0)*r,y0=cy+Math.sin(a0)*r,x1=cx+Math.cos(a1)*r,y1=cy+Math.sin(a1)*r;if(a1-a0>0.01)s+=`<path d="M${cx} ${cy} L${f1(x0)} ${f1(y0)} A${r} ${r} 0 ${lg} 1 ${f1(x1)} ${f1(y1)}Z" fill="${col}" stroke="#0b1630" stroke-width="6"/>`;a0=a1});return s};
const bars=(cx,cy,bs,us,w,h)=>{let s='';const mx=Math.max(...bs.map(b=>b[1]));const bw=w/bs.length*0.62;bs.forEach(([lab,v,col,txt],i)=>{const x=cx-w/2+(i+0.5)*w/bs.length;const hh=v/mx*h*us[i];s+=`<rect x="${f1(x-bw/2)}" y="${f1(cy+h/2-hh)}" width="${f1(bw)}" height="${f1(hh)}" rx="18" fill="${col}" stroke="#fff" stroke-width="5"/>`+tx(x,cy+h/2+66,lab,44,'#fff')+(us[i]>0.6?tx(x,cy+h/2-hh-22,txt||'',56,'#ffd23f'):'')});s+=`<line x1="${cx-w/2}" y1="${cy+h/2}" x2="${cx+w/2}" y2="${cy+h/2}" stroke="#fff" stroke-width="6"/>`;return s};
const legend=(x,y,sl,us)=>{let s='';sl.forEach(([lab,v,col],i)=>{const uu=us[i]==null?us[us.length-1]:us[i];s+=`<g opacity="${f1(uu)}"><rect x="${x}" y="${y+i*110-34}" width="64" height="64" rx="14" fill="${col}" stroke="#fff" stroke-width="5"/>${tx(x+96,y+i*110+18,lab,56,'#fff','start')}</g>`});return s};
const meter=(x,y,w,v,col,lab,t)=>`<rect x="${x-w/2}" y="${y-30}" width="${w}" height="60" rx="30" fill="#0b1630" stroke="#fff" stroke-width="5"/><rect x="${x-w/2+6}" y="${y-24}" width="${f1(Math.max(1,(w-12)*v))}" height="48" rx="24" fill="${col}"/>`+tx(x,y-50,lab,44,'#fff');
return {G,IC,icon,body,orgPos,tile,scene,pie,bars,legend,meter,ORG};
};
