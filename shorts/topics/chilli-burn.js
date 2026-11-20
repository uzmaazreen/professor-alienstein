// Topic: chilli-burn
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const W=(s,i)=>{const v=wt(s,i);return isNaN(v)?SC[s].s:v};
const on=(t,s,i)=>clamp((t-W(s,i))/0.5);
const face=(x,y,s,mouth,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+(mouth||0)*10}" rx="${28+(mouth||0)*22}" ry="${10+(mouth||0)*48}" fill="#5a1a2a"/></g>`;
const mosq=(x,y,s,t)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${-20+Math.sin(t*40)*18} -22 -28)"/><ellipse cx="22" cy="-28" rx="34" ry="12" fill="#cfeeff" opacity=".85" transform="rotate(${20-Math.sin(t*40)*18} 22 -28)"/><ellipse cx="0" cy="6" rx="16" ry="36" fill="#3a3a3a"/><path d="M-14 0 H14 M-14 14 H14" stroke="#fff" stroke-width="5"/><path d="M0 40 L0 80" stroke="#222" stroke-width="5"/><circle cx="0" cy="-34" r="12" fill="#3a3a3a"/></g>`;
const phone=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="30" fill="#10131a" stroke="${col||'#cfd8e6'}" stroke-width="8"/><rect x="-74" y="-148" width="148" height="296" rx="16" fill="#18263f"/></g>`;
function mk(bg1,bg2,ids){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>`+ids.map(i=>`<g id="${i}"></g>`).join('')+`</svg>`}
function art(){return mk('#4a0f12','#7a1f1a',['a','b'])}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const c=on(t,2,0);
 let a=`<g transform="translate(-180 0)"><circle r="190" fill="#e0a77a"/><path d="M-90 -40 q20 -20 40 0 M50 -40 q20 -20 40 0" stroke="#3a2a1a" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${80}" rx="${40+c*30}" ry="${14+c*34}" fill="#5a1a2a"/></g>`;
 a+=`<g transform="translate(330 -60) rotate(-20)"><path d="M-130 0 Q0 -60 150 -10 Q160 20 130 30 Q0 40 -130 30Z" fill="#d9232a"/><path d="M-130 0 L-160 -20" stroke="#2e7d32" stroke-width="16" stroke-linecap="round"/></g>`;
 for(let i=0;i<6;i++){const u=((t*0.6+i/6)%1);a+=`<circle cx="${300-u*380}" cy="${-60+u*120+Math.sin(i*3)*30}" r="12" fill="#ff7a2e" opacity="${on(t,1,4)*(1-u*0.3)}"/>`}
 G.a.innerHTML=a;
 let b='';
 b+=`<g opacity="${on(t,2,0)}"><text x="-180" y="-300" text-anchor="middle" font-size="110">&#128293;</text><text x="330" y="-250" text-anchor="middle" font-size="46" fill="#fff" font-weight="700">only 25&#176;C!</text></g>`;
 const m=on(t,3,10);
 b+=`<g opacity="${m}"><text x="-250" y="380" text-anchor="middle" font-size="150">&#128167;</text><text x="-250" y="470" text-anchor="middle" font-size="46" fill="#fff" font-weight="700">weak</text><text x="250" y="380" text-anchor="middle" font-size="150">&#129371;</text><text x="250" y="470" text-anchor="middle" font-size="46" fill="#8fe39a" font-weight="700">better</text></g>`;
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Why chilli burns')});
H({sc:1,w:0,x:0,y:-560,html:pill('Capsaicin')});
A({sc:1,w:5,x:300,y:-300,html:lbl('Capsaicin','#ff7a2e')});
H({sc:2,w:0,x:0,y:-560,html:pill('Tricks heat sensors','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Milk beats water','#2d7fd3')});
H({sc:4,w:0,x:0,y:-560,html:pill('Rice and bread help')});
H({sc:5,w:0,x:0,y:-560,html:pill('Do not rub your eyes')});
return {art,init,anim,cam:[{sc:0,x:0,y:-50,z:0.8},{sc:1,x:60,y:-50,z:0.85},{sc:2,x:60,y:-100,z:0.85},{sc:3,x:0,y:200,z:0.85},{sc:4,x:0,y:100,z:0.75},{sc:5,x:0,y:-50,z:0.8}],sfx:()=>[]};
};
