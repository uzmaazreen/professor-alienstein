// Topic: goosebumps
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#2a2050','#4a3a80',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const up=easeIO(clamp((t-W(1,10))/1.2))*(t<W(4,0)?1:0.5);
 let a=`<path d="M-420 260 Q0 180 420 260 V560 H-420Z" fill="#e0a77a"/><path d="M-420 260 Q0 180 420 260" stroke="#b97a4a" stroke-width="10" fill="none"/>`;
 for(let i=0;i<7;i++){const x=-330+i*110,y=235+Math.sin(i)*8;const lean=(1-up)*34;
  a+=`<ellipse cx="${x}" cy="${y+22}" rx="${18+up*10}" ry="${10+up*10}" fill="#c98a5a"/><path d="M${x} ${y+10} L${x+lean} ${y-150-up*20}" stroke="#4a3322" stroke-width="12" stroke-linecap="round"/>`}
 G.a.innerHTML=a;
 let b='';const c=on(t,2,3);
 b+=`<g opacity="${c}"><text x="-300" y="-100" font-size="130">&#10052;</text><text x="130" y="-100" font-size="130">&#127925;</text></g>`;
 const an=on(t,3,0)*(1-on(t,4,0));
 b+=`<g opacity="${an}" transform="translate(0 -300)"><ellipse cx="0" cy="0" rx="150" ry="110" fill="#c98a5a"/>${Array.from({length:12},(_,i)=>`<path d="M${-130+i*24} -90 l${(i%2?8:-8)} -${40+up*30}" stroke="#7a5a3a" stroke-width="10"/>`).join('')}<circle cx="-50" cy="-10" r="12" fill="#222"/><circle cx="50" cy="-10" r="12" fill="#222"/></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Goosebumps!')});
H({sc:1,w:0,x:0,y:-560,html:pill('Tiny muscle at each hair')});
A({sc:1,w:10,x:0,y:60,html:lbl('Hair stands up','#ffd23f')});
H({sc:2,w:0,x:0,y:-560,html:pill('Cold, fear, music','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Animals: warm and bigger')});
H({sc:4,w:0,x:0,y:-560,html:pill('We have little hair')});
H({sc:5,w:0,x:0,y:-560,html:pill('Leftover from ancestors','#2d7fd3')});
return {art,init,anim,cam:[{sc:0,x:0,y:100,z:0.8},{sc:1,x:0,y:150,z:1.0},{sc:2,x:0,y:50,z:0.85},{sc:3,x:0,y:-150,z:0.9},{sc:4,x:0,y:150,z:1.0},{sc:5,x:0,y:100,z:0.8}],sfx:()=>[]};
};
