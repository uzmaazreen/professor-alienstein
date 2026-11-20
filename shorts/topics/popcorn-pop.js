// Topic: popcorn-pop
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#2a1a3a','#5a3a6a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const heat=clamp((t-W(2,0))/6);
 const pop=on(t,3,5);
 let a='';
 if(pop<0.5){const sh=Math.sin(t*50)*heat*8;a+=`<g transform="translate(${sh} 0)"><path d="M0 -180 Q150 -120 130 40 Q100 160 0 170 Q-100 160 -130 40 Q-150 -120 0 -180Z" fill="${mix('f2c14e','ff7a2e',heat)}" stroke="#b97a0c" stroke-width="10"/>`;
  for(let i=0;i<10;i++){const u=((t*1.2+i/10)%1);a+=`<circle cx="${-60+(i%5)*30}" cy="${-60+Math.floor(i/5)*80-u*20}" r="${6+heat*10}" fill="#fff" opacity="${0.4*heat*(on(t,2,3))}"/>`}
  a+=`</g>`;}
 else{a+=`<g transform="translate(0 ${-pop*60})">`;[[-120,0,90],[0,-70,110],[120,20,95],[-40,70,80],[70,80,85]].forEach(([x,y,r],i)=>{a+=`<circle cx="${x*1.5}" cy="${y*1.5}" r="${r*1.1}" fill="#fff8e4" stroke="#e8d9a0" stroke-width="6"/>`});a+=`<circle cx="0" cy="140" r="30" fill="#f2c14e"/></g>`;}
 G.a.innerHTML=a;
 let b='';const p=on(t,2,6);
 b+=`<g opacity="${p*(pop<0.5?1:0)}">`+[0,60,120,180,240,300].map(r=>`<path d="M0 0 L${Math.cos(r*0.01745)*300} ${Math.sin(r*0.01745)*300}" stroke="#ff7a8a" stroke-width="12" stroke-linecap="round" transform="rotate(0)" opacity=".7"/>`).join('')+`</g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Why popcorn pops')});
H({sc:1,w:0,x:0,y:-560,html:pill('Water in the kernel')});
H({sc:2,w:0,x:0,y:-560,html:pill('Steam pressure builds','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('180 degrees: POP!','#2d7fd3')});
A({sc:3,w:5,x:0,y:-300,html:lbl('POP!','#ffd23f')});
H({sc:4,w:0,x:0,y:-560,html:pill('Old kernels stay unpopped')});
H({sc:5,w:0,x:0,y:-560,html:pill('Keep in a sealed jar')});
return {art,init,anim,cam:[{sc:0,x:0,y:0,z:1.05},{sc:1,x:0,y:0,z:1.2},{sc:2,x:0,y:0,z:1.2},{sc:3,x:0,y:0,z:1.1},{sc:4,x:0,y:0,z:1.15},{sc:5,x:0,y:0,z:1.05}],sfx:()=>[]};
};
