// Topic: roti-puff
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#4a2a12','#7a4a22',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const p=easeIO(clamp((t-W(3,0))/2.2))*(t<W(5,0)?1:0.9);
 const steam=on(t,2,6);
 let a=`<g transform="translate(0 40)"><rect x="-460" y="200" width="920" height="40" rx="16" fill="#2a2a2a"/>`;
 const h=60+p*260;
 a+=`<path d="M-400 190 Q0 ${190-h*2} 400 190 Q0 ${190-h*0.2} -400 190Z" fill="#e8b878" stroke="#b97a3a" stroke-width="10"/>`;
 a+=`<path d="M-400 190 Q0 ${190-h*0.2+6} 400 190" stroke="#b97a3a" stroke-width="8" fill="none"/>`;
 for(let i=0;i<9;i++){const u=((t*0.7+i/9)%1);a+=`<circle cx="${-260+i*65}" cy="${190-h*(0.35+0.4*Math.sin(i*1.4+1))*(0.5+u*0.3)-20}" r="${8+p*8}" fill="#fff" opacity="${steam*(0.4+0.4*Math.sin(u*6.28))}"/>`}
 a+=`</g>`;
 G.a.innerHTML=a;
 let b='';
 for(let i=0;i<7;i++){const x=-300+i*100;b+=`<path d="M${x} 340 q-20 -40 0 -80 q20 -40 0 -80" stroke="#ff9a2e" stroke-width="12" fill="none" stroke-linecap="round" opacity=".5" transform="translate(0 ${Math.sin(t*6+i)*6})"/>`}
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Roti puffs up!')});
H({sc:1,w:0,x:0,y:-560,html:pill('Water inside dough')});
H({sc:2,w:0,x:0,y:-560,html:pill('Water becomes steam','#d9232a')});
A({sc:2,w:6,x:0,y:-120,html:lbl('Steam','#fff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Steam pushes layers apart','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('A tear = flat roti')});
H({sc:5,w:0,x:0,y:-560,html:pill('Roll evenly, hot tawa')});
return {art,init,anim,cam:[{sc:0,x:0,y:-30,z:1.05},{sc:1,x:0,y:-30,z:1.15},{sc:2,x:0,y:-60,z:1.15},{sc:3,x:0,y:-90,z:1.1},{sc:4,x:0,y:-90,z:1.1},{sc:5,x:0,y:-30,z:1.05}],sfx:()=>[]};
};
