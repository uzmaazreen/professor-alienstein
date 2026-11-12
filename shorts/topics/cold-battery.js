// Topic: Why phone batteries die in the cold
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function temp(t){ // 25C -> 0C -> back to 30C
  if(t<SC[2].s)return 25;
  const down=clamp((t-SC[2].s)/(SC[2].e-SC[2].s-1));
  if(t<SC[4].s)return 25-25*easeIO(down);
  return 0+30*clamp((t-SC[4].s)/3);
}
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2a44"/><stop offset="1" stop-color="#3b2f63"/></linearGradient>
 <clipPath id="bc"><rect x="-340" y="-420" width="680" height="840" rx="26"/></clipPath></defs>
 <rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/>
 <g id="snow"></g>
 <rect x="-360" y="-440" width="720" height="880" rx="36" fill="#2a2f3f" stroke="#cfd6e4" stroke-width="10"/>
 <rect x="-60" y="-500" width="120" height="60" rx="10" fill="#cfd6e4"/>
 <g clip-path="url(#bc)"><rect id="liq" x="-340" y="-420" width="680" height="840" fill="#d99a2b" opacity=".35"/><rect x="-340" y="-420" width="120" height="840" fill="#e5252a" opacity=".55"/><rect x="220" y="-420" width="120" height="840" fill="#4aa3ff" opacity=".55"/><g id="ions"></g></g>
 <text x="-280" y="-340" font-family="Poppins" font-weight="800" font-size="52" fill="#fff">−</text><text x="250" y="-340" font-family="Poppins" font-weight="800" font-size="52" fill="#fff">+</text>
 <g id="phone" opacity="0"><rect x="420" y="-360" width="220" height="400" rx="34" fill="#11131c" stroke="#cfd6e4" stroke-width="8"/><text id="pct" x="530" y="-120" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="72" fill="#7dff9a">25%</text></g>
 <g id="gauge" opacity="0"><rect x="-560" y="-380" width="70" height="560" rx="35" fill="#fff" stroke="#2a2033" stroke-width="6"/><rect id="mer" x="-542" y="150" width="34" height="0" rx="17" fill="#4aa3ff"/><circle cx="-525" cy="170" r="48" fill="#4aa3ff" stroke="#2a2033" stroke-width="6"/></g>
 </svg>`}
let G={};
function init(svg){G={snow:svg.querySelector('#snow'),ions:svg.querySelector('#ions'),liq:svg.querySelector('#liq'),phone:svg.querySelector('#phone'),pct:svg.querySelector('#pct'),gauge:svg.querySelector('#gauge'),mer:svg.querySelector('#mer')}}
let pos=[];for(let i=0;i<26;i++)pos.push(rnd(i));
function anim(t){
  const T=temp(t);const f=clamp(T/25);          // 1 = warm/fast, 0 = cold/slow
  let sn='';const cold=1-clamp(T/25);for(let i=0;i<40;i++){const ph=((t*0.15+rnd(i))%1);sn+=`<circle cx="${-1000+rnd(i+5)*2000}" cy="${-1000+ph*2000}" r="${3+rnd(i)*5}" fill="#fff" opacity="${0.5*cold}"/>`}G.snow.innerHTML=sn;
  G.liq.setAttribute('fill',mix('d99a2b','7fc4e8',cold));G.liq.setAttribute('opacity',0.3+0.2*cold);
  // ions travel left -> right with speed depending on temperature
  let s='';const sp=0.04+0.6*f*f;
  for(let i=0;i<26;i++){const u=((t*sp*(0.6+rnd(i+9)*0.8)+rnd(i))%1);const x=-300+u*600,y=-380+rnd(i+20)*760+Math.sin(t*3+i)*12*(0.3+f);
    s+=`<g transform="translate(${x} ${y})"><circle r="17" fill="${mix('ffd54a','cfe9ff',cold)}" stroke="#2a2033" stroke-width="3"/><text y="6" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="20" fill="#2a2033">+</text></g>`}
  G.ions.innerHTML=s;
  const gk=clamp((t-SC[2].s+0.4)/0.5);G.gauge.setAttribute('opacity',gk);
  G.mer.setAttribute('y',150-480*clamp(T/30));G.mer.setAttribute('height',480*clamp(T/30)+10);
  const pk=clamp((t-wt(3,0))/0.5);G.phone.setAttribute('opacity',pk);
  const off=t>=wt(3,6)&&t<SC[4].s;
  G.pct.textContent=off?'OFF':(t<SC[4].s?'20%':Math.round(20+clamp((t-SC[4].s)/3)*5)+'%');
  G.pct.setAttribute('fill',off?'#ff5a4d':'#7dff9a');
}
H({sc:0,w:5,x:0,y:-560,html:pill('20% → dead?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Ions swim through the battery')});
A({sc:1,w:4,x:0,y:480,html:lbl('Ions moving = electricity','#ffd54a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Cold = thick, slow syrup')});
A({sc:2,w:14,x:0,y:480,html:lbl('Ions crawl','#8fd3ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Phone shuts down early')});
H({sc:4,w:0,x:0,y:-560,html:pill('Keep it close to your body','#2d7fd3')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:0,z:0.9},{sc:1,x:0,y:0,z:1.05},{sc:2,x:-100,y:0,z:1.0},{sc:3,x:150,y:-100,z:1.0},{sc:4,x:60,y:0,z:0.9}],
 sfx:()=>[{t:wt(3,6),type:'ding'}]};
};
