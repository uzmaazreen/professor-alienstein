// Topic: fan-cool
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#17335c','#2f6aa8',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 let a=face(300,60,1.9,0);
 const sw=on(t,1,5);
 for(let i=0;i<5;i++)a+=`<ellipse cx="${210+i*45}" cy="${-70+(i%2)*10}" rx="10" ry="16" fill="#8fd3ff" opacity="${sw*(1-on(t,3,0)*0.5)}"/>`;
 const lay=on(t,2,3)*(1-on(t,3,2));
 a+=`<ellipse cx="300" cy="60" rx="230" ry="230" fill="#ff9a5a" opacity="${0.35*lay}"/>`;
 const sp=t*14;
 a+=`<g transform="translate(-380 60)"><rect x="-16" y="40" width="32" height="260" fill="#cfd8e6"/><circle r="40" fill="#cfd8e6"/><g transform="rotate(${sp})">${[0,120,240].map(r=>`<ellipse cx="0" cy="-110" rx="46" ry="110" fill="#e9eef5" stroke="#9fb4cf" stroke-width="6" transform="rotate(${r})"/>`).join('')}</g><circle r="30" fill="#7a8aa5"/></g>`;
 const w=on(t,3,0);
 for(let i=0;i<5;i++){const u=((t*0.9+i/5)%1);a+=`<path d="M${-220+u*300} ${-60+i*40} h70" stroke="#e8f6ff" stroke-width="9" stroke-linecap="round" opacity="${w*(1-u)}"/>`}
 G.a.innerHTML=a;
 let b='';const m=on(t,4,0);
 b+=`<g opacity="${m}"><circle cx="-380" cy="60" r="60" fill="none" stroke="#ff7a4a" stroke-width="8" stroke-dasharray="10 10"/></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Fan = cooler?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Drying sweat takes heat')});
A({sc:1,w:9,x:260,y:-250,html:lbl('Sweat','#8fd3ff')});
H({sc:2,w:0,x:0,y:-560,html:pill('Warm damp layer','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Fan blows it away','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Motor adds heat')});
H({sc:5,w:0,x:0,y:-560,html:pill('Off when you leave')});
return {art,init,anim,cam:[{sc:0,x:-40,y:-50,z:0.8},{sc:1,x:260,y:-30,z:0.95},{sc:2,x:260,y:-30,z:0.95},{sc:3,x:-40,y:-30,z:0.7},{sc:4,x:-380,y:60,z:0.95},{sc:5,x:-40,y:-30,z:0.7}],sfx:()=>[]};
};
