// Topic: Why fruit ripens faster next to apples (ethylene)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="kw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ecd6"/><stop offset="1" stop-color="#e6d3ae"/></linearGradient>
 <linearGradient id="tab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a97a46"/><stop offset="1" stop-color="#7a5430"/></linearGradient></defs>
 <rect x="-1200" y="-1300" width="2400" height="1900" fill="url(#kw)"/>
 <rect x="-1200" y="420" width="2400" height="900" fill="url(#tab)"/><rect x="-1200" y="414" width="2400" height="14" fill="#523519"/>
 <path d="M-460 300 Q-460 440 -300 440 H300 Q460 440 460 300 Z" fill="#d9c7a3" stroke="#7a5a2c" stroke-width="8"/>
 <g id="bag" opacity="0"><path d="M-520 -200 Q-560 260 -440 420 H440 Q560 260 520 -200 Q300 -330 -520 -200Z" fill="#dff3ff" fill-opacity=".35" stroke="#8fc3e0" stroke-width="8"/></g>
 <g id="fruit"></g><g id="eth"></g></svg>`}
let G={};
function init(svg){G={fruit:svg.querySelector('#fruit'),eth:svg.querySelector('#eth'),bag:svg.querySelector('#bag')}}
const banana=(x,y,rot,col,spots)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-160 -10 C-60 140 100 130 175 -55 C140 -30 105 5 45 25 C-30 45 -100 30 -160 -10Z" fill="${col}" stroke="#2a2033" stroke-width="7" stroke-linejoin="round"/><path d="M-140 0 q-14 -20 -4 -36" stroke="#5a4a24" stroke-width="12" fill="none" stroke-linecap="round"/>${spots>0?Array.from({length:7},(_,i)=>`<circle cx="${-90+i*34}" cy="${30+Math.sin(i)*10}" r="${4+spots*5}" fill="#5a3a1a" opacity="${spots}"/>`).join(''):''}</g>`;
function anim(t){
  const rp=clamp((t-wt(2,3))/(SC[2].e-wt(2,3)));         // banana ripening progress
  const rp2=t>=SC[3].s?clamp(rp+(t-SC[3].s)/6,0,1):rp;
  const col=rp2<0.6?mix('8ccf4a','ffd83d',rp2/0.6):mix('ffd83d','b8863a',(rp2-0.6)/0.4);
  let f='';
  f+=banana(-130,200,-8,col,clamp((rp2-0.55)*2));f+=banana(-60,160,-2,col,clamp((rp2-0.55)*2));
  f+=`<g transform="translate(250 200)"><circle r="120" fill="#e5252a" stroke="#2a2033" stroke-width="8"/><path d="M0 -118 q14 -50 50 -62" stroke="#5a3a1a" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M10 -120 q50 -30 70 -64 q-50 -6 -70 64Z" fill="#6cc46a" stroke="#2a2033" stroke-width="5"/><ellipse cx="-40" cy="-40" rx="26" ry="42" fill="#fff" opacity=".3" transform="rotate(20)"/></g>`;
  f+=`<g transform="translate(-380 230)"><circle r="70" fill="#ee7a2a" stroke="#2a2033" stroke-width="7"/><path d="M0 -68 q10 -30 34 -38" stroke="#5a3a1a" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
  G.fruit.innerHTML=f;
  // ethylene gas drifting from the apple to the bananas
  const gk=clamp((t-wt(1,4))/0.8);let e='';
  if(gk>0)for(let i=0;i<22;i++){const ph=((t*0.28+i/22)%1);const bag=t>=SC[3].s;
    const x=250-ph*(bag?560:470)+Math.sin(ph*10+i)*28,y=170-Math.sin(ph*Math.PI)*(bag?260:150)+Math.cos(ph*7+i)*20;
    e+=`<g transform="translate(${x} ${y})" opacity="${gk*(1-ph*0.3)}"><circle r="17" fill="#b9f27a" stroke="#4a8a1a" stroke-width="3"/><text y="5" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" fill="#2a5a0a">C₂H₄</text></g>`}
  G.eth.innerHTML=e;
  G.bag.setAttribute('opacity',clamp((t-SC[3].s)/0.6)*(1-clamp((t-SC[4].s)/0.5)));
}
H({sc:0,w:5,x:0,y:-560,html:pill('The fruits are talking?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Ethylene: a ripening signal')});
A({sc:1,w:7,x:250,y:20,html:lbl('Apple makes ethylene gas','#b9f27a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Banana: ripening ON')});
A({sc:2,w:12,x:-100,y:30,html:lbl('Sweeter, softer, browner','#ffd83d')});
H({sc:3,w:0,x:0,y:-560,html:pill('A closed bag traps the gas')});
H({sc:4,w:1,x:0,y:-560,html:pill('Keep apples apart','#2d7fd3')});
H({sc:4,w:7,x:0,y:-450,html:pill('Let the air move')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:60,z:0.95},{sc:1,x:200,y:80,z:1.15},{sc:2,x:50,y:100,z:1.1},{sc:3,x:0,y:60,z:0.95},{sc:4,x:0,y:100,z:0.9}],
 sfx:()=>[]};
};
