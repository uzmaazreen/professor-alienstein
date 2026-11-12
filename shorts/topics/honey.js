// Topic: Why honey never spoils (jar cutaway)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const HY=-330;                              // honey surface
const GERMS=[{x:-170,ph:0},{x:-40,ph:1.6},{x:110,ph:3.1},{x:200,ph:4.5},{x:-110,ph:5.9}];
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e6c8"/><stop offset="1" stop-color="#e2c99d"/></linearGradient>
 <linearGradient id="hn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc83d"/><stop offset="1" stop-color="#e58f10"/></linearGradient>
 <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c6b3c"/><stop offset="1" stop-color="#6b4424"/></linearGradient>
 <clipPath id="jc"><rect x="-300" y="-330" width="600" height="980" rx="30"/></clipPath>
 <filter id="sh2" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#3a2410" flood-opacity=".35"/></filter></defs>
 <rect x="-1200" y="-1300" width="2400" height="1960" fill="url(#wl)"/>
 <rect x="-1200" y="650" width="2400" height="900" fill="url(#wood)"/><rect x="-1200" y="644" width="2400" height="14" fill="#4a2d17"/>
 <ellipse cx="0" cy="690" rx="380" ry="30" fill="#2a1608" opacity=".4"/>
 <g filter="url(#sh2)"><rect x="-320" y="-520" width="640" height="1170" rx="50" fill="#e9f5ff" fill-opacity=".55" stroke="#9ab4c8" stroke-width="8"/>
 <rect x="-340" y="-600" width="680" height="100" rx="18" fill="#c9a227" stroke="#7a6010" stroke-width="6"/></g>
 <g clip-path="url(#jc)"><rect x="-300" y="-330" width="600" height="980" fill="url(#hn)" opacity=".95"/><g id="sugar"></g><g id="peroxide"></g><g id="germs"></g><g id="drops"></g></g>
 <path d="M-300 -330 Q0 -300 300 -330" fill="none" stroke="#ffe9a6" stroke-width="10" opacity=".8"/>
 <g id="bar" opacity="0"><rect x="-600" y="-300" width="120" height="600" rx="12" fill="#fff" stroke="#6b4424" stroke-width="6"/><rect id="b1" x="-594" y="-294" width="108" height="0" fill="#ffb81f"/><rect id="b2" x="-594" y="0" width="108" height="0" fill="#4aa3ff"/></g>
 <g id="rot"></g></svg>`}
let G={};
function init(svg){G={sugar:svg.querySelector('#sugar'),germs:svg.querySelector('#germs'),drops:svg.querySelector('#drops'),per:svg.querySelector('#peroxide'),bar:svg.querySelector('#bar'),b1:svg.querySelector('#b1'),b2:svg.querySelector('#b2')}}
const hex=(x,y,r)=>`<polygon points="${[0,1,2,3,4,5].map(k=>(x+Math.cos(k*Math.PI/3)*r).toFixed(1)+','+(y+Math.sin(k*Math.PI/3)*r).toFixed(1)).join(' ')}" fill="#fff3b8" stroke="#b97a0c" stroke-width="2.5"/>`;
function anim(t){
  let s='';for(let i=0;i<70;i++){const x=-270+rnd(i)*540+Math.sin(t*0.8+i)*5,y=-300+rnd(i+90)*920+Math.cos(t*0.9+i*2)*5;s+=hex(x,y,9)}
  G.sugar.innerHTML=s;
  // bar chart: 80% sugar / 17% water
  const bk=clamp((t-wt(1,4))/1.2);G.bar.setAttribute('opacity',bk*(1-clamp((t-SC[2].s)/0.6)));
  G.b1.setAttribute('y',-294+588*(1-0.8*bk));G.b1.setAttribute('height',588*0.8*bk);
  G.b2.setAttribute('y',-294+588*(1-0.8*bk)-588*0.17*bk);G.b2.setAttribute('height',588*0.17*bk);
  // germs fall in, lose water, shrivel
  let g='',d='';const ge=clamp((t-wt(1,10))/0.8)*(1-clamp((t-SC[3].s)/0.8)*0);
  GERMS.forEach((o,i)=>{const cyc=7,ph=((t*0.9+o.ph)%cyc)/cyc;const y=-520+ph*620;const inH=clamp((y-HY)/60);const shrink=1-0.5*inH;
    const col=mix('7ccf6a','a9a07c',inH);const gx=o.x+Math.sin(t*2+i)*8*(1-inH);
    g+=`<g transform="translate(${gx} ${y}) rotate(${Math.sin(t+i)*18}) scale(${shrink*2.1} ${shrink*2.1*(1-0.2*inH)})"><rect x="-34" y="-20" width="68" height="40" rx="20" fill="${col}" stroke="#2a2033" stroke-width="4"/><path d="M34 0 q22 -12 30 6 M-34 0 q-22 12 -30 -6" stroke="#2a2033" stroke-width="4" fill="none"/><circle cx="-10" cy="-4" r="4" fill="#2a2033"/><circle cx="10" cy="-4" r="4" fill="#2a2033"/>${inH>0.3?'<path d="M-14 8 q14 -8 28 0" stroke="#2a2033" stroke-width="3" fill="none"/>':''}</g>`;
    if(inH>0&&inH<1.0||(inH>=1&&ph<0.95)){for(let k=0;k<4;k++){const pp=((t*1.4+k/4+i*0.3)%1);d+=`<path d="M0 -10 q8 12 0 18 q-8 -6 0 -18Z" fill="#4aa3ff" stroke="#1d6fb8" stroke-width="2" transform="translate(${gx+(k-1.5)*26} ${y-10+pp*60}) scale(0.9)" opacity="${(1-pp)*inH}"/>`}}
  });G.germs.innerHTML=g;G.drops.innerHTML=d;
  // hydrogen peroxide bubbles
  let p='';const pk=clamp((t-wt(4,6))/1.0);if(pk>0)for(let i=0;i<14;i++){const ph=((t*0.25+i/14)%1);const x=-260+rnd(i)*520,y=620-ph*900;p+=`<g opacity="${pk*(1-Math.abs(ph-.5)*1.4)}"><circle cx="${x}" cy="${y}" r="20" fill="#fff" fill-opacity=".75" stroke="#7aa9cc" stroke-width="3"/><text x="${x}" y="${y+5}" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" fill="#1d6fb8">H₂O₂</text></g>`}
  G.per.innerHTML=p;
}
H({sc:0,w:5,x:0,y:-560,html:pill('Honey never spoils?')});
A({sc:0,w:11,x:0,y:-640,html:lbl('Thousands of years','#ffb81f')});
H({sc:1,w:0,x:0,y:-560,html:pill('1 · Sugar')});
A({sc:1,w:4,x:-420,y:-330,html:lbl('80% sugar','#ffb81f')});
A({sc:1,w:8,x:-420,y:-250,html:lbl('<20% water','#4aa3ff')});
H({sc:2,w:0,x:0,y:-560,html:pill('Osmosis: sugar sucks out water')});
A({sc:2,w:7,x:0,y:130,html:lbl('Germ shrivels like a raisin','#ff5a4d')});
H({sc:3,w:0,x:0,y:-560,html:pill('2 · Acid')});
A({sc:3,w:3,x:0,y:60,html:lbl('Acidic (pH ≈ 4)','#ff9a4d')});
H({sc:4,w:0,x:0,y:-560,html:pill('3 · Bee enzyme')});
A({sc:4,w:11,x:0,y:130,html:lbl('Hydrogen peroxide: germ killer','#ffffff')});
H({sc:5,w:3,x:0,y:-560,html:pill('Keep the lid tight')});
H({sc:5,w:11,x:0,y:-450,html:pill('No honey for babies under 1','#d9232a')});
return {art,init,anim,
 cam:[{sc:0,x:-60,y:30,z:0.85},{sc:1,x:-200,y:0,z:1.0},{sc:2,x:0,y:-150,z:1.45},{sc:3,x:0,y:-130,z:1.3},{sc:4,x:0,y:60,z:1.0},{sc:5,x:0,y:-440,z:1.3}],
 sfx:()=>[{t:wt(2,5),type:'ding'}]};
};
