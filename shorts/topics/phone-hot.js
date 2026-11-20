// Topic: phone-hot
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#3a1a1a','#5a2a1a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const heat=Math.min(clamp((t-W(1,0))/10)*(0.5+0.5*on(t,2,0)),1);
 let a=phone(0,40,2.2,mix('cfd8e6','ff4b2b',heat));
 const cool=on(t,5,0);
 for(let i=0;i<5;i++){const u=((t*0.8+i/5)%1);a+=`<path d="M${-180+i*90} ${-380-u*160} q24 -34 0 -70 q-24 -34 0 -70" stroke="#ff7a4a" stroke-width="10" fill="none" stroke-linecap="round" opacity="${heat*(1-u)*(1-cool*0.7)}"/>`}
 G.a.innerHTML=a;
 let b='';const e=on(t,1,7);
 b+=`<g opacity="${e}">`+Array.from({length:6},(_,i)=>{const u=((t*0.9+i/6)%1);return `<circle cx="${-150+u*300}" cy="${60+Math.sin(i*2)*80}" r="12" fill="#ffd23f"/>`}).join('')+`</g>`;
 const th=on(t,3,0);
 b+=`<g opacity="${th*(1-cool)}"><text x="-480" y="560" font-size="140">&#9728;&#65039;</text><rect x="-250" y="500" width="500" height="90" rx="30" fill="#2a2a3a" opacity=".85"/><text x="0" y="570" text-anchor="middle" font-size="52" fill="#fff" font-weight="700">thick case</text></g>`;
 const g=on(t,2,0)*(1-on(t,3,0));
 b+=`<g opacity="${g}"><text x="260" y="-330" font-size="130">&#127918;</text></g>`;
 b+=`<g opacity="${cool}"><text x="-480" y="560" font-size="140">&#127795;</text></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Phone getting hot?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Electricity makes heat')});
A({sc:1,w:7,x:-380,y:-150,html:lbl('Current in wires','#ffd23f')});
H({sc:2,w:0,x:0,y:-560,html:pill('Heavy use = more heat','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Heat cannot escape')});
H({sc:4,w:0,x:0,y:-560,html:pill('Battery ages, phone slows')});
H({sc:5,w:0,x:0,y:-560,html:pill('Shade, no case','#2d7fd3')});
return {art,init,anim,cam:[{sc:0,x:0,y:50,z:0.85},{sc:1,x:0,y:50,z:0.95},{sc:2,x:0,y:50,z:0.9},{sc:3,x:0,y:150,z:0.85},{sc:4,x:0,y:50,z:0.9},{sc:5,x:0,y:150,z:0.85}],sfx:()=>[]};
};
