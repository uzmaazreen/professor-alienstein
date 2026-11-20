// Topic: apple-brown
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#1f4a2a','#3a7a4a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const br=clamp((t-W(2,3))/8)*(1-on(t,3,0)*0.6);
 const col=mix('f6edc4','b97a3a',br);
 let a=`<g transform="translate(-220 0)"><circle r="210" fill="#d9322a"/><path d="M-30 -210 q0 -50 40 -80" stroke="#5a3a1a" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
 a+=`<g transform="translate(260 0)"><path d="M0 -200 Q200 -200 200 0 Q200 200 0 200 Z" fill="${col}" stroke="#d9322a" stroke-width="18"/><path d="M0 -200 Q-200 -200 -200 0 Q-200 200 0 200 Z" fill="${col}" stroke="#d9322a" stroke-width="18"/><circle cx="-40" cy="-20" r="14" fill="#5a3a1a"/><circle cx="40" cy="-20" r="14" fill="#5a3a1a"/></g>`;
 G.a.innerHTML=a;
 let b='';const o=on(t,2,3);
 for(let i=0;i<6;i++){const u=((t*0.5+i/6)%1);b+=`<text x="${100+u*180}" y="${-260+Math.sin(i*2)*50}" font-size="52" fill="#8fd3ff" font-weight="800" opacity="${o*(1-u)}">O2</text>`}
 const l=on(t,3,0);
 b+=`<g opacity="${l}"><text x="260" y="-290" text-anchor="middle" font-size="150">&#127819;</text></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Why apples go brown')});
H({sc:1,w:0,x:0,y:-560,html:pill('Cutting breaks the cells')});
H({sc:2,w:0,x:0,y:-560,html:pill('Air + enzyme = brown','#d9232a')});
A({sc:2,w:5,x:260,y:-330,html:lbl('Oxygen','#8fd3ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Lemon slows it','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Cold slows it too')});
H({sc:5,w:0,x:0,y:-560,html:pill('Usually safe to eat')});
return {art,init,anim,cam:[{sc:0,x:20,y:0,z:0.9},{sc:1,x:20,y:0,z:0.95},{sc:2,x:260,y:-50,z:1.0},{sc:3,x:260,y:-50,z:1.0},{sc:4,x:20,y:0,z:0.9},{sc:5,x:20,y:0,z:0.9}],sfx:()=>[]};
};
