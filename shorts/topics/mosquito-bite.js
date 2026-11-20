// Topic: mosquito-bite
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#10264a','#1e3f73',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 let a=`<g opacity="${1-on(t,3,0)}">`+face(-330,-60,2.0,on(t,1,0)>0.5?0.4:0);
 const c1=on(t,1,6);
 for(let i=0;i<7;i++){const u=((t*0.5+i/7)%1);a+=`<text x="${-200+u*420}" y="${-40-Math.sin(u*6)*50}" font-size="46" fill="#ff9a9a" opacity="${c1*(1-u*0.4)}" font-weight="700">CO2</text>`}
 a+=mosq(430+Math.sin(t*3)*30,-120+Math.cos(t*2.5)*30,2.0,t)+`</g>`;
 G.a.innerHTML=a;
 let b='';const h=on(t,2,3);
 for(let i=0;i<4;i++){const u=((t*0.7+i/4)%1);b+=`<path d="M${-420+i*90} ${-240-u*120} q20 -30 0 -60" stroke="#ff7a4a" stroke-width="9" fill="none" stroke-linecap="round" opacity="${h*(1-u)*(1-on(t,3,0))}"/>`}
 const s=on(t,3,0);
 b+=`<g opacity="${s}">`+face(-330,520,1.2,0,'#c88a5a')+face(0,520,1.2,0,'#f2c9a0')+mosq(-330,380,1.2,t)+mosq(-260,420,1.0,t+1)+mosq(-400,430,0.9,t+2)+mosq(0,380,0.8,t)+`</g>`;
 const k=on(t,4,6);
 b+=`<g opacity="${k}"><rect x="260" y="400" width="150" height="190" rx="24" fill="#2a2a3a"/><rect x="450" y="400" width="150" height="190" rx="24" fill="#f5f1e6"/></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Mosquito magnet?')});
H({sc:1,w:0,x:0,y:-560,html:pill('They smell your breath')});
A({sc:1,w:9,x:100,y:-300,html:lbl('Carbon dioxide','#ff9a9a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Heat + skin smell','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Everyone smells different')});
H({sc:4,w:0,x:0,y:-560,html:pill('Dark clothes help them')});
H({sc:5,w:0,x:0,y:-560,html:pill('Cover up, no standing water','#2d7fd3')});
return {art,init,anim,cam:[{sc:0,x:0,y:-100,z:0.8},{sc:1,x:0,y:-100,z:0.85},{sc:2,x:-150,y:-150,z:0.9},{sc:3,x:140,y:420,z:0.85},{sc:4,x:140,y:420,z:0.85},{sc:5,x:140,y:420,z:0.8}],sfx:()=>[]};
};
