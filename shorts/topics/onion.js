// Topic: Why onions make you cry
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="ktw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e9d8"/><stop offset="1" stop-color="#e1cfb0"/></linearGradient>
 <linearGradient id="board" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c58f55"/><stop offset="1" stop-color="#9a6a3a"/></linearGradient>
 <clipPath id="oc"><ellipse cx="0" cy="0" rx="300" ry="260"/></clipPath></defs>
 <rect x="-1200" y="-1300" width="2400" height="2000" fill="url(#ktw)"/>
 <g stroke="#d3bf9d" stroke-width="3" opacity=".6">${Array.from({length:28},(_,i)=>`<path d="M-1200 ${-1300+i*75} H1200"/>`).join('')}</g>
 <rect x="-700" y="270" width="1400" height="260" rx="30" fill="url(#board)" stroke="#6b4424" stroke-width="8"/>
 <g transform="translate(0 0)"><ellipse cx="0" cy="0" rx="300" ry="260" fill="#f6e4f0" stroke="#7a4a82" stroke-width="10"/>
  <g clip-path="url(#oc)" fill="none" stroke="#caa1d6" stroke-width="8"><ellipse rx="240" ry="205"/><ellipse rx="175" ry="148"/><ellipse rx="110" ry="92"/><ellipse rx="50" ry="40"/></g>
  <g id="cells" clip-path="url(#oc)"></g></g>
 <g id="eye" opacity="0" transform="translate(620 -620)"><ellipse rx="170" ry="100" fill="#fff" stroke="#2a2033" stroke-width="8"/><circle id="iris" r="62" fill="#6a4c2a" stroke="#2a2033" stroke-width="6"/><circle r="26" fill="#111"/><circle cx="-18" cy="-20" r="10" fill="#fff"/><path d="M-170 -30 q-40 -60 -80 -70 M-100 -90 q-10 -60 -40 -90 M0 -100 q10 -70 -10 -110 M100 -92 q30 -60 70 -80" stroke="#2a2033" stroke-width="8" fill="none" stroke-linecap="round"/></g>
 <g id="gas"></g><g id="tears"></g>
 <g id="knife"><path d="M0 0 L420 -40 L430 -110 L-10 -120Z" fill="#dfe6ee" stroke="#6c7a88" stroke-width="6" stroke-linejoin="round"/><rect x="420" y="-120" width="230" height="70" rx="26" fill="#3b2f23" stroke="#1d1710" stroke-width="6"/></g></svg>`}
let G={};
function init(svg){G={cells:svg.querySelector('#cells'),knife:svg.querySelector('#knife'),gas:svg.querySelector('#gas'),tears:svg.querySelector('#tears'),eye:svg.querySelector('#eye')}}
function anim(t){
  const cut=easeIO(clamp((t-wt(2,4))/0.7));const cutDone=clamp((t-wt(2,5))/0.5);
  // cells: two chemicals in separate compartments
  let c='';for(let i=0;i<30;i++){const x=-260+(i%6)*105,y=-190+Math.floor(i/6)*95;const burst=cutDone*(rnd(i)>0.25?1:0)*(1-clamp((0.5-Math.abs(x)/900)*0));
    c+=`<rect x="${x}" y="${y}" width="86" height="76" rx="14" fill="#fbf1f9" stroke="#caa1d6" stroke-width="4"/>`;
    if(burst<0.1)c+=`<circle cx="${x+28}" cy="${y+38}" r="12" fill="#ffd54a" stroke="#2a2033" stroke-width="3"/><rect x="${x+46}" y="${y+26}" width="24" height="24" rx="6" fill="#6ec1ff" stroke="#2a2033" stroke-width="3"/>`;
    else c+=`<circle cx="${x+43+Math.sin(t*5+i)*8}" cy="${y+38+Math.cos(t*4+i)*8}" r="15" fill="#c9e86a" stroke="#2a2033" stroke-width="3" opacity="${0.5+0.5*burst}"/>`}
  G.cells.innerHTML=c;
  // knife swings down at "cuts"
  const ky=-420+cut*470;G.knife.setAttribute('transform',`translate(${-60} ${ky}) rotate(${-8+cut*10})`);G.knife.setAttribute('opacity',1-clamp((t-wt(2,12))/0.6));
  // gas rises towards the eye
  const gk=clamp((t-wt(2,7))/0.8);let g='';
  if(gk>0)for(let i=0;i<26;i++){const ph=((t*0.3+i/26)%1);const x=-150+ph*790+Math.sin(ph*8+i)*30,y=-60-ph*560+Math.cos(ph*6+i)*30;g+=`<circle cx="${x}" cy="${y}" r="${12+rnd(i)*12}" fill="#c9e86a" opacity="${0.6*gk*(1-ph*0.4)}" stroke="#7aa02a" stroke-width="2"/>`}
  G.gas.innerHTML=g;
  const ek=clamp((t-wt(2,12))/0.7)*(1-clamp((t-SC[4].s)/0.6));G.eye.setAttribute('opacity',Math.max(ek,clamp((t-SC[3].s)/0.7)*(1-clamp((t-SC[4].s-1)/0.6))));
  let tr='';const tk=clamp((t-wt(3,16))/0.8)*(t<SC[4].s?1:Math.max(0,1-(t-SC[4].s)/1.0));
  if(tk>0)for(let i=0;i<7;i++){const ph=((t*0.7+i/7)%1);tr+=`<path d="M0 -20 q18 30 0 46 q-18 -16 0 -46Z" fill="#6ec1ff" stroke="#1d6fb8" stroke-width="4" transform="translate(${470+i*40} ${-540+ph*420}) scale(1.3)" opacity="${tk*(1-ph)}"/>`}
  G.tears.innerHTML=tr;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Why the tears?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Two chemicals, kept apart')});
A({sc:1,w:8,x:-250,y:-290,html:lbl('Sulfur chemical','#ffd54a')});
A({sc:1,w:12,x:250,y:-290,html:lbl('Enzyme','#6ec1ff')});
H({sc:2,w:0,x:0,y:-560,html:pill('Cut → cells burst → they mix')});
A({sc:2,w:11,x:-100,y:-420,html:lbl('Stinging gas','#c9e86a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Gas + eye water = mild acid')});
A({sc:3,w:17,x:440,y:-250,html:lbl('Eyes make tears to rinse it','#6ec1ff')});
H({sc:4,w:3,x:0,y:-560,html:pill('Chill the onion')});
H({sc:4,w:9,x:0,y:-450,html:pill('Use a sharp knife','#2d7fd3')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:-120,z:0.9},{sc:1,x:0,y:-50,z:1.2},{sc:2,x:230,y:-250,z:1.0},{sc:3,x:400,y:-420,z:0.95},{sc:4,x:0,y:-120,z:0.85}],
 sfx:()=>[{t:wt(2,4),type:'ding'}]};
};
