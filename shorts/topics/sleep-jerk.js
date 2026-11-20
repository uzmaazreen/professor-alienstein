// Topic: sleep-jerk
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#0d1535','#22306a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const j=on(t,2,0)>0&&Math.sin(t*2)>0.2&&t<W(4,0)?1:0;
 let a=`<rect x="-440" y="120" width="880" height="60" rx="20" fill="#7a5a3a"/><rect x="-440" y="40" width="880" height="100" rx="40" fill="#cfe3ff"/><rect x="-420" y="-10" width="230" height="80" rx="34" fill="#fff"/>`;
 a+=`<g transform="translate(0 ${j?-70:0})"><circle cx="-300" cy="-30" r="70" fill="#e0a77a"/><rect x="-230" y="-50" width="560" height="100" rx="50" fill="#5a7ad6"/></g>`;
 const z=on(t,0,10);
 a+=`<text x="-120" y="-190" font-size="100" fill="#8fd3ff" opacity="${z*(1-j)}" font-weight="800">Zzz</text>`;
 G.a.innerHTML=a;
 let b='';const f=on(t,2,10);
 b+=`<g opacity="${f}"><path d="M60 -400 v200" stroke="#ff7a8a" stroke-width="14" stroke-linecap="round"/><polygon points="20,-210 100,-210 60,-140" fill="#ff7a8a"/><text x="130" y="-300" font-size="60" fill="#fff" font-weight="800">Falling?</text></g>`;
 const c=on(t,3,10);
 b+=`<g opacity="${c}"><text x="-140" y="400" font-size="150">&#9749;</text><text x="120" y="400" font-size="150">&#128561;</text></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('The falling jolt')});
H({sc:1,w:0,x:0,y:-560,html:pill('Hypnic jerk')});
A({sc:1,w:6,x:0,y:-350,html:lbl('Very common','#ffd23f')});
H({sc:2,w:0,x:0,y:-560,html:pill('Brain misreads muscles','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Tired, stress, caffeine')});
H({sc:4,w:0,x:0,y:-560,html:pill('Usually harmless')});
H({sc:5,w:0,x:0,y:-560,html:pill('Steady bedtime helps','#2d7fd3')});
return {art,init,anim,cam:[{sc:0,x:0,y:-50,z:0.8},{sc:1,x:0,y:-50,z:0.85},{sc:2,x:0,y:-150,z:0.85},{sc:3,x:0,y:100,z:0.75},{sc:4,x:0,y:-50,z:0.85},{sc:5,x:0,y:-50,z:0.8}],sfx:()=>[]};
};
