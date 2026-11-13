// Topic: How a thermos keeps tea hot
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f8fb8"/><stop offset="1" stop-color="#c9d9ea"/></linearGradient>
 <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa7b4"/><stop offset=".5" stop-color="#f2f6fa"/><stop offset="1" stop-color="#8d9aa8"/></linearGradient>
 <linearGradient id="tea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8903a"/><stop offset="1" stop-color="#b85a14"/></linearGradient>
 <clipPath id="inner"><rect x="-190" y="-380" width="380" height="800" rx="40"/></clipPath></defs>
 <rect x="-1200" y="-1300" width="2400" height="2200" fill="url(#win)"/><g id="snow"></g>
 <rect x="-1200" y="520" width="2400" height="600" fill="#e9eff6"/>
 <rect x="-250" y="-460" width="500" height="960" rx="64" fill="url(#steel)" stroke="#5b6775" stroke-width="8"/>
 <rect x="-210" y="-420" width="420" height="880" rx="48" fill="#d9e6f2" stroke="#5b6775" stroke-width="5"/>
 <rect x="-190" y="-380" width="380" height="800" rx="40" fill="#fffaf0" stroke="#5b6775" stroke-width="6"/>
 <g clip-path="url(#inner)"><rect x="-190" y="-250" width="380" height="670" fill="url(#tea)"/><g id="tp"></g></g>
 <rect x="-210" y="-420" width="40" height="880" fill="#ffffff" opacity=".25"/>
 <rect x="-280" y="-540" width="560" height="100" rx="26" fill="#d9232a" stroke="#7a1218" stroke-width="7"/>
 <g id="vac"></g><g id="rays"></g><g id="steam"></g></svg>`}
let G={};
function init(svg){G={snow:svg.querySelector('#snow'),tp:svg.querySelector('#tp'),vac:svg.querySelector('#vac'),rays:svg.querySelector('#rays'),steam:svg.querySelector('#steam')}}
function anim(t){
  let sn='';for(let i=0;i<50;i++){const ph=((t*0.12+rnd(i))%1);sn+=`<circle cx="${-1000+rnd(i+5)*2000}" cy="${-1000+ph*1500}" r="${3+rnd(i)*5}" fill="#fff" opacity=".6"/>`}G.snow.innerHTML=sn;
  // tea particles (hot = jiggly)
  let p='';for(let i=0;i<22;i++){p+=`<circle cx="${-160+rnd(i)*320+Math.sin(t*6+i)*8}" cy="${-220+rnd(i+30)*620+Math.cos(t*5+i)*8}" r="9" fill="#ffd18a" opacity=".7"/>`}G.tp.innerHTML=p;
  // heat arrows trying to escape: conduction/convection/radiation, blocked at the vacuum
  const k=clamp((t-wt(1,10))/0.8);let a='';
  if(k>0)for(let i=0;i<6;i++){const ph=((t*0.5+i/6)%1);const y=-300+i*140;const x=-110+ph*60;const blockedAt=0.55;
    const x2=ph<blockedAt?-190-ph*180:-190-blockedAt*180-(ph-blockedAt)*0;const op=ph<blockedAt?1:Math.max(0,1-(ph-blockedAt)*8);
    a+=`<path d="M${x-80} ${y} h${40} m-14 -12 l16 12 l-16 12" transform="translate(${-ph*220} 0)" stroke="#ff5a2d" stroke-width="9" fill="none" stroke-linecap="round" opacity="${op}"/>`}
  G.rays.innerHTML=a;
  // vacuum highlight between walls
  const vk=clamp((t-wt(2,6))/0.6);G.vac.innerHTML=`<g opacity="${vk}"><rect x="-210" y="-420" width="20" height="880" fill="#a9d7ff" opacity="${0.5+0.3*Math.sin(t*3)}"/><rect x="190" y="-420" width="20" height="880" fill="#a9d7ff" opacity="${0.5+0.3*Math.sin(t*3)}"/></g>`;
  // mirror bounce
  let s='';const mk=clamp((t-wt(3,3))/0.6);if(mk>0)for(let i=0;i<5;i++){const ph=((t*0.7+i/5)%1);const y=-300+i*150;const x=ph<0.5?-120-ph*140:-190+(ph-0.5)*140;s+=`<circle cx="${x}" cy="${y}" r="8" fill="#ffe14d" stroke="#e5252a" stroke-width="3" opacity="${mk}"/>`}
  // steam under the lid
  let st='';const sk=clamp((t-wt(3,10))/0.6);if(sk>0)for(let i=0;i<5;i++){const ph=((t*0.35+i/5)%1);st+=`<circle cx="${-120+i*60}" cy="${-300-ph*60}" r="${12+ph*10}" fill="#fff" opacity="${0.7*sk*(1-ph)}"/>`}
  G.steam.innerHTML=st+s;
}
H({sc:0,w:5,x:0,y:-560,html:pill('Hot for hours?')});
H({sc:1,w:0,x:0,y:-560,html:pill('3 ways heat escapes')});
A({sc:1,w:7,x:-380,y:-120,html:lbl('Touch · Air · Rays','#ff5a4d')});
H({sc:2,w:0,x:0,y:-560,html:pill('Double wall + vacuum')});
A({sc:2,w:6,x:-60,y:580,html:lbl('Vacuum: nothing to carry heat','#a9d7ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Mirror walls bounce heat back')});
H({sc:4,w:3,x:0,y:-560,html:pill('Cold drinks stay cold too','#2d7fd3')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:-20,z:0.9},{sc:1,x:-30,y:-20,z:1.0},{sc:2,x:-120,y:-120,z:1.4},{sc:3,x:-100,y:-100,z:1.25},{sc:4,x:0,y:-20,z:0.85}],
 sfx:()=>[]};
};
