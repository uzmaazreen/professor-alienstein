// Topic: milk-boil
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#12306a','#2a5aa8',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const heat=clamp((t-W(1,0))/12);
 const rise=easeIn(clamp((t-W(3,3))/(Math.max(1,W(4,3)-W(3,3)))));
 const lvl=240+(1-0)*0-rise*190;
 let a=`<g transform="translate(0 100)"><path d="M-300 -100 V260 Q-300 300 -260 300 H260 Q300 300 300 260 V-100" fill="#cfd8e6" stroke="#9fb4cf" stroke-width="12"/>`;
 a+=`<rect x="-288" y="${lvl-240+20}" width="576" height="${300-(lvl-240+20)}" fill="#fffdf5"/>`;
 const skin=on(t,2,6);
 a+=`<path d="M-288 ${lvl-240+20} q144 -18 288 0 t288 0" stroke="#f1d99a" stroke-width="${10+skin*10}" fill="none" opacity="${skin}"/>`;
 const ov=on(t,4,0);
 if(ov>0)a+=`<path d="M-310 -100 q-30 120 -10 330 M310 -100 q30 120 10 330" stroke="#fffdf5" stroke-width="40" stroke-linecap="round" opacity="${ov}" fill="none"/>`;
 for(let i=0;i<8;i++){const u=((t*0.9+i/8)%1);a+=`<circle cx="${-220+i*62}" cy="${280-u*(280-(lvl-240+20))}" r="${10+(i%3)*5}" fill="#fff" opacity="${heat*0.8}"/>`}
 a+=`</g>`;
 G.a.innerHTML=a;
 let b='';const st=on(t,3,0);
 for(let i=0;i<5;i++){const u=((t*0.7+i/5)%1);b+=`<path d="M${-180+i*90} ${-190-u*110} q22 -30 0 -60" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity="${st*(1-u)*0.8}"/>`}
 G.b.innerHTML=b;
}
function easeIn(x){return x*x}
H({sc:0,w:3,x:0,y:-560,html:pill('Why milk spills')});
H({sc:1,w:0,x:0,y:-560,html:pill('Water + fat + protein')});
H({sc:2,w:0,x:0,y:-560,html:pill('A skin forms on top','#d9232a')});
A({sc:2,w:6,x:0,y:-250,html:lbl('Milk skin','#f1d99a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Steam pushes milk up','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Overflow!')});
H({sc:5,w:0,x:0,y:-560,html:pill('Low flame, stir, bigger pot')});
return {art,init,anim,cam:[{sc:0,x:0,y:0,z:1.0},{sc:1,x:0,y:0,z:1.1},{sc:2,x:0,y:0,z:1.1},{sc:3,x:0,y:0,z:1.1},{sc:4,x:0,y:0,z:1.1},{sc:5,x:0,y:0,z:1.0}],sfx:()=>[]};
};
