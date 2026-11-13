// Shared drawing helpers for long-video topics: window.KIT(E) -> helpers
window.KIT=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,SC,WT}=E;
const wi=(s,w)=>{const k=WT[s].findIndex(o=>o.w.toLowerCase().replace(/[^a-z]/g,'').startsWith(w));return k<0?0:k};
const T=(s,w)=>wt(s,wi(s,w));
const prog=(i,t)=>clamp((t-SC[i].s)/(SC[i].e-SC[i].s));
const lerp=(a,b,k)=>a+(b-a)*k;
const f1=n=>n.toFixed(1);
const C=(x,y,r,f,o)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0.1,r))}" fill="${f}" opacity="${(o==null?1:clamp(o)).toFixed(2)}"/>`;
const panel=(id,cx,cy,w,h,c1,c2,inner)=>`<defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><clipPath id="${id}c"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="56"/></clipPath></defs><g clip-path="url(#${id}c)"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" fill="url(#${id}g)"/>${inner}</g><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="56" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="6"/>`;
const R=(cx,cy,inner)=>{const x=cx-1100,y=cy-600;return `<svg style="position:absolute;left:${x}px;top:${y}px;overflow:visible" width="2200" height="1200" viewBox="${x} ${y} 2200 1200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`};
const arrowUp=(x,y,col,w)=>`<path d="M${x} ${y} v-70 m-18 24 l18 -26 l18 26" stroke="${col}" stroke-width="${w||9}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrowR=(x,y,col,w,l)=>`<path d="M${x} ${y} h${l||70} m${(l||70)>0?-24:24} -18 l${(l||70)>0?24:-24} 18 l${(l||70)>0?-24:24} 18" stroke="${col}" stroke-width="${w||9}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const along=(P,u)=>{let L=0;const Ls=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);Ls.push(d);L+=d}let q=clamp(u)*L;for(let i=0;i<Ls.length;i++){if(q<=Ls[i]||i===Ls.length-1){const k=clamp(q/Ls[i]);return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}q-=Ls[i]}return P[P.length-1]};
const cross=(x,y,s,col,w)=>`<path d="M${x-s} ${y-s} L${x+s} ${y+s} M${x+s} ${y-s} L${x-s} ${y+s}" stroke="${col}" stroke-width="${w||16}" stroke-linecap="round"/>`;
const tx=(x,y,s,size,fill,anchor,w)=>`<text x="${x}" y="${y}" text-anchor="${anchor||'middle'}" font-family="Poppins" font-weight="${w||800}" font-size="${size}" fill="${fill}">${s}</text>`;
const person=(x,y,s,o)=>{o=o||{};const coat=o.coat||'#d9533b';return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-70" width="16" height="70" rx="6" fill="#2b3550"/><rect x="6" y="-70" width="16" height="70" rx="6" fill="#2b3550"/><rect x="-34" y="-170" width="68" height="110" rx="26" fill="${coat}"/><rect x="-44" y="-160" width="14" height="72" rx="7" fill="${coat}" transform="rotate(${o.arm||8} -37 -155)"/><rect x="30" y="-160" width="14" height="72" rx="7" fill="${coat}" transform="rotate(${-(o.arm||8)} 37 -155)"/><rect x="-30" y="-178" width="60" height="22" rx="10" fill="${o.scarf||'#f2c94c'}"/><circle cx="0" cy="-205" r="30" fill="${o.skin||'#e0a77a'}"/><path d="M-32 -212 a32 30 0 0 1 64 0 z" fill="${o.hat||'#3b6ea5'}"/></g>`};
const BG='<div style="position:absolute;left:-6000px;top:-3500px;width:18000px;height:13000px;background-color:#0d1626;background-image:radial-gradient(rgba(140,180,255,.13) 3px,transparent 3px);background-size:90px 90px"></div>';
return {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG};
};
