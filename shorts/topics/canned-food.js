// Topic: How canned food lasts for years (can cutaway)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const GERMS=[{x:-130,y:-100,ph:0},{x:60,y:-180,ph:1.7},{x:150,y:60,ph:3.2},{x:-60,y:120,ph:4.4},{x:-170,y:200,ph:5.5},{x:100,y:230,ph:2.4}];
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="fw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe6ec"/><stop offset="1" stop-color="#b9c5cf"/></linearGradient>
 <linearGradient id="met" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa7b4"/><stop offset=".5" stop-color="#e8eef3"/><stop offset="1" stop-color="#8d9aa8"/></linearGradient>
 <radialGradient id="hot" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#ff5a2d" stop-opacity=".85"/><stop offset="1" stop-color="#ff5a2d" stop-opacity="0"/></radialGradient>
 <clipPath id="cc"><rect x="-250" y="-380" width="500" height="760" rx="14"/></clipPath>
 <filter id="sh3" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#1c2833" flood-opacity=".4"/></filter></defs>
 <rect x="-1200" y="-1300" width="2400" height="1980" fill="url(#fw)"/>
 <g stroke="#a9b6c1" stroke-width="3" opacity=".5">${Array.from({length:30},(_,i)=>`<path d="M-1200 ${-1300+i*70} H1200"/>`).join('')}${Array.from({length:30},(_,i)=>`<path d="M${-1200+i*90} -1300 V680"/>`).join('')}</g>
 <rect x="-1200" y="680" width="2400" height="800" fill="#7b8794"/><rect x="-1200" y="674" width="2400" height="14" fill="#56616d"/>
 <ellipse cx="0" cy="700" rx="330" ry="28" fill="#10181f" opacity=".4"/>
 <ellipse id="glow" cx="0" cy="0" rx="520" ry="560" fill="url(#hot)" opacity="0"/>
 <g filter="url(#sh3)"><rect x="-262" y="-392" width="524" height="784" rx="22" fill="url(#met)" stroke="#6c7a88" stroke-width="6"/></g>
 <g clip-path="url(#cc)"><rect x="-250" y="-380" width="500" height="760" fill="#f4f1ea"/><rect id="food" x="-250" y="-230" width="500" height="610" fill="#a0522d"/><g id="beans"></g><g id="steam"></g><g id="germs"></g></g>
 <path id="lid" d="M-262 -392 Q0 -392 262 -392" fill="none" stroke="#6c7a88" stroke-width="14" stroke-linecap="round"/>
 <g id="seam" opacity="0"><path d="M-262 -392 h524" stroke="#9aa7b4" stroke-width="22"/><circle cx="-262" cy="-392" r="20" fill="none" stroke="#56616d" stroke-width="8"/></g>
 <g id="gauge" opacity="0"><rect x="360" y="-380" width="70" height="560" rx="35" fill="#fff" stroke="#2a2033" stroke-width="6"/><rect id="merc" x="378" y="150" width="34" height="0" rx="17" fill="#ee4b2a"/><circle cx="395" cy="170" r="48" fill="#ee4b2a" stroke="#2a2033" stroke-width="6"/></g>
 <g id="warn" opacity="0"></g></svg>`}
let G={};
function init(svg){G={glow:svg.querySelector('#glow'),beans:svg.querySelector('#beans'),steam:svg.querySelector('#steam'),germs:svg.querySelector('#germs'),lid:svg.querySelector('#lid'),seam:svg.querySelector('#seam'),gauge:svg.querySelector('#gauge'),merc:svg.querySelector('#merc'),warn:svg.querySelector('#warn')}}
function anim(t){
  let b='';for(let i=0;i<26;i++){const x=-220+rnd(i)*440,y=-190+rnd(i+30)*540;b+=`<ellipse cx="${x}" cy="${y}" rx="22" ry="13" transform="rotate(${rnd(i+5)*180} ${x} ${y})" fill="#7a3a1c" stroke="#4a210f" stroke-width="3"/>`}
  G.beans.innerHTML=b;
  const heat=clamp((t-wt(2,6))/(SC[2].e-wt(2,6)-0.5));const cool=clamp((t-SC[3].s)/(SC[3].e-SC[3].s-0.5));
  const hotNow=heat*(1-cool*0.9);
  G.glow.setAttribute('opacity',hotNow*0.9);
  const gk=clamp((t-wt(2,3))/0.5)*(1-clamp((t-SC[4].s)/0.5));G.gauge.setAttribute('opacity',gk);
  const temp=20+101*hotNow;G.merc.setAttribute('y',150-480*clamp(temp/121));G.merc.setAttribute('height',480*clamp(temp/121)+10);
  // seam closes (scene 1)
  G.seam.setAttribute('opacity',clamp((t-wt(1,12))/0.5));
  // germs: bounce, die when hot
  let g='';GERMS.forEach((o,i)=>{const die=t>=SC[5].s?0:clamp((heat-i*0.12)/0.2);const x=o.x+Math.sin(t*1.3+o.ph)*50*(1-die),y=o.y+Math.cos(t*1.1+o.ph)*40*(1-die);
    const col=mix('7ccf6a','9a9a9a',die);const alive=die<1;
    g+=`<g transform="translate(${x} ${y}) rotate(${Math.sin(t+i)*20}) scale(1.9)"><rect x="-34" y="-20" width="68" height="40" rx="20" fill="${col}" stroke="#2a2033" stroke-width="4"/><path d="M34 0 q22 -12 30 6 M-34 0 q-22 12 -30 -6" stroke="#2a2033" stroke-width="4" fill="none"/>${alive?'<circle cx="-10" cy="-4" r="4" fill="#2a2033"/><circle cx="10" cy="-4" r="4" fill="#2a2033"/>':'<path d="M-16 -10 l12 12 m0 -12 l-12 12 M4 -10 l12 12 m0 -12 l-12 12" stroke="#2a2033" stroke-width="4"/>'}</g>`});
  G.germs.innerHTML=g;
  // steam bubbles in headspace, vanish when cooling
  let s='';const steamK=hotNow*(1-clamp((cool-0.2)/0.6));for(let i=0;i<9;i++){const ph=((t*0.5+i/9)%1);s+=`<circle cx="${-210+rnd(i)*420}" cy="${-230-ph*140}" r="${14+rnd(i+2)*10}" fill="#fff" opacity="${0.8*steamK*(1-ph)}"/>`}
  G.steam.innerHTML=s;
  // lid: flat -> pulled down (vacuum) ; bulge in last scene
  let dip=0;dip=cool*34;
  const bulge=clamp((t-wt(5,2))/1.2);
  const k=bulge>0?-60*bulge:dip;
  const after=t>=SC[4].s&&t<SC[5].s?34:0;
  const dd=t>=SC[4].s&&t<SC[5].s?34:(t>=SC[5].s?-60*bulge:dip);
  G.lid.setAttribute('d',`M-262 -392 Q0 ${-392+dd*2} 262 -392`);
  // vacuum arrows
  let w='';const va=cool*(1-clamp((t-SC[4].s)/0.4));if(va>0)for(let i=0;i<5;i++){const x=-180+i*90;w+=`<path d="M${x} -470 v50 m-14 -16 l14 18 l14 -18" stroke="#2d7fd3" stroke-width="9" fill="none" stroke-linecap="round" opacity="${va}"/>`}
  const wk=clamp((t-wt(5,2))/0.6);if(wk>0)w+=`<g opacity="${wk}"><path d="M-110 -560 l220 220 m0 -220 l-220 220" stroke="#d9232a" stroke-width="22" stroke-linecap="round"/></g>`;
  G.warn.innerHTML=w;G.warn.setAttribute('opacity',1);
}
H({sc:0,w:4,x:0,y:-560,html:pill('Years on a shelf?')});
H({sc:1,w:0,x:0,y:-560,html:pill('1 · Seal it')});
A({sc:1,w:12,x:330,y:-440,html:lbl('Double seam: nothing gets in','#ffffff')});
H({sc:2,w:0,x:0,y:-560,html:pill('2 · Cook it hot')});
A({sc:2,w:3,x:340,y:-440,html:lbl('Pressure cooker','#ff9a4d')});
A({sc:2,w:14,x:0,y:60,html:lbl('Germs destroyed','#ff5a4d')});
H({sc:3,w:0,x:0,y:-560,html:pill('3 · Cool it: vacuum')});
A({sc:3,w:12,x:0,y:-470,html:lbl('Almost no air left','#4aa3ff')});
H({sc:4,w:0,x:0,y:-560,html:pill('No germs + no air = years')});
H({sc:5,w:0,x:0,y:-560,html:pill('Bulging or dented?','#d9232a')});
H({sc:5,w:11,x:0,y:-450,html:pill('Throw it away')});
return {art,init,anim,
 cam:[{sc:0,x:60,y:0,z:0.85},{sc:1,x:30,y:-300,z:1.15},{sc:2,x:60,y:0,z:0.95},{sc:3,x:0,y:-200,z:1.1},{sc:4,x:0,y:0,z:0.85},{sc:5,x:0,y:-200,z:1.0}],
 sfx:()=>[{t:wt(4,0),type:'ding'}]};
};
