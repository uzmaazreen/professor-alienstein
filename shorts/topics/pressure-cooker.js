// Topic: pressure-cooker
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#1a2a3a','#3a5a7a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const pr=clamp((t-W(2,0))/6);
 let a=`<g transform="translate(0 80)"><path d="M-260 -120 V240 Q-260 280 -220 280 H220 Q260 280 260 240 V-120Z" fill="#cfd8e6" stroke="#9fb4cf" stroke-width="12"/><rect x="-290" y="-170" width="580" height="60" rx="26" fill="#9fb4cf"/><rect x="-18" y="-250" width="36" height="80" rx="8" fill="#7a8aa5"/>`;
 a+=`<rect x="-250" y="100" width="500" height="170" fill="#4aa3ff" opacity=".55"/>`;
 for(let i=0;i<8;i++){const u=((t*0.9+i/8)%1);a+=`<circle cx="${-200+i*57}" cy="${240-u*320}" r="9" fill="#fff" opacity="${0.8*(1-u)}"/>`}
 a+=`</g>`;
 const wh=on(t,4,2);
 for(let i=0;i<4;i++){const u=((t*1.1+i/4)%1);a+=`<path d="M${-40+i*14} ${-170-u*150} q20 -30 0 -60" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity="${wh*(1-u)}"/>`}
 G.a.innerHTML=a;
 let b='';
 const temp=100+20*pr;
 b+=`<g transform="translate(420 0)"><rect x="-16" y="-300" width="32" height="420" rx="16" fill="#fff"/><rect x="-10" y="${120-(temp-60)*5.5}" width="20" height="${(temp-60)*5.5}" fill="#ff4b4b"/><circle cy="140" r="36" fill="#ff4b4b"/></g><text x="420" y="-330" text-anchor="middle" font-size="64" fill="#fff" font-weight="800">${Math.round(temp)}&#176;C</text>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Cooker magic')});
H({sc:1,w:0,x:0,y:-560,html:pill('Open pot: 100 degrees')});
H({sc:2,w:0,x:0,y:-560,html:pill('Sealed: ~120 degrees','#d9232a')});
A({sc:2,w:5,x:-330,y:-320,html:lbl('Pressure rises','#ff7a8a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Faster cooking','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Whistle = safety')});
H({sc:5,w:0,x:0,y:-560,html:pill('Wait before opening')});
return {art,init,anim,cam:[{sc:0,x:100,y:-20,z:0.95},{sc:1,x:100,y:-20,z:1.0},{sc:2,x:100,y:-20,z:1.0},{sc:3,x:100,y:-20,z:1.0},{sc:4,x:0,y:-100,z:1.05},{sc:5,x:100,y:-20,z:0.95}],sfx:()=>[]};
};
