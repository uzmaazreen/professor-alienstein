// Topic: How soap kills germs (microscopic cutaway)
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
const R=190;
const N_LIP=36, N_SOAP=34;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs>
 <radialGradient id="mic" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#2f6bd0"/><stop offset="1" stop-color="#0b2557"/></radialGradient></defs>
 <rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#mic)"/>
 <g id="water"></g>
 <g id="big" opacity="0"></g>
 <g id="germ"></g><g id="soapg"></g></svg>`}
let G={};
function init(svg){G={water:svg.querySelector('#water'),germ:svg.querySelector('#germ'),soap:svg.querySelector('#soapg'),big:svg.querySelector('#big')}}
const soapMol=(x,y,rot,s=1)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 q-8 18 0 34 t0 34" fill="none" stroke="#ffb347" stroke-width="7" stroke-linecap="round"/><circle r="15" fill="#4aa3ff" stroke="#fff" stroke-width="3"/></g>`;
function anim(t){
  // drifting water molecules (background)
  let w='';for(let i=0;i<46;i++){const x=-900+rnd(i)*1800+Math.sin(t*0.4+i)*30,y=-700+rnd(i+70)*1500+Math.cos(t*0.5+i*2)*30;w+=`<circle cx="${x}" cy="${y}" r="${5+rnd(i+3)*5}" fill="#8fd3ff" opacity="${0.25+0.2*rnd(i+9)}"/>`}
  G.water.innerHTML=w;
  // attack progress
  const att=clamp((t-wt(3,0))/(SC[3].e-wt(3,0)-0.6));
  const burst=clamp((att-0.7)/0.3);
  const rinse=clamp((t-wt(4,0))/2.5);
  // germ
  let g='';
  const sh=1-0.35*burst;
  g+=`<g transform="scale(${sh})" opacity="${1-clamp((t-wt(4,3))/1.2)}">`;
  for(let i=0;i<N_LIP;i++){const a=i/N_LIP*Math.PI*2;const detach=clamp((att-(i/N_LIP)*0.6)/0.3);const rr=R+detach*(180+rnd(i)*160);const x=Math.cos(a)*rr,y=Math.sin(a)*rr+detach*Math.sin(t*2+i)*20;
    g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${16}" fill="#ffd54a" stroke="#b97a0c" stroke-width="3" opacity="${1-detach*0.5}"/>`;
    if(detach<0.3)g+=`<path d="M${Math.cos(a)*(R-16)} ${Math.sin(a)*(R-16)} l${Math.cos(a)*-26} ${Math.sin(a)*-26}" stroke="#b97a0c" stroke-width="5"/>`}
  g+=`<circle r="${R-40}" fill="${mix('8e9bd6','6a6a6a',burst)}" stroke="#2a2033" stroke-width="5"/>`;
  g+=`<path d="M-80 -20 q30 -50 60 0 t60 0 t60 0 M-90 30 q30 -40 60 0 t60 0" stroke="#fff" stroke-width="7" fill="none" opacity=".8"/>`;
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2+t*0.1;g+=`<path d="M${Math.cos(a)*(R+10)} ${Math.sin(a)*(R+10)} l${Math.cos(a)*46} ${Math.sin(a)*46}" stroke="#ee4b3f" stroke-width="8" stroke-linecap="round" opacity="${1-att}"/>`}
  g+=`</g>`;G.germ.innerHTML=g;
  // soap molecules: wander in -> stab into coat -> get carried away
  let s='';const appear=clamp((t-(SC[2].s-0.3))/0.8);
  if(appear>0)for(let i=0;i<N_SOAP;i++){const a=i/N_SOAP*Math.PI*2+rnd(i)*0.2;const far=380+rnd(i+5)*320;
    const wx=Math.cos(a+t*0.15)*far+Math.sin(t+i)*20,wy=Math.sin(a+t*0.15)*far+Math.cos(t*1.2+i)*20;
    const ax=Math.cos(a)*(R+8),ay=Math.sin(a)*(R+8);
    const k=easeOut(clamp((att*1.6)-(i/N_SOAP)*0.6));
    let x=wx+(ax-wx)*k,y=wy+(ay-wy)*k;const rot=(a*180/Math.PI)-90+(1-k)*Math.sin(t+i)*40+180;
    if(rinse>0){x+=rinse*rinse*900;y+=Math.sin(i)*rinse*60}
    s+=soapMol(x,y,rot,1.15);}
  G.soap.innerHTML=s;
  // big single soap molecule explainer (scene 2)
  const bk=clamp((t-wt(2,0))/0.6)*(1-clamp((t-SC[3].s+0.3)/0.5));
  G.big.setAttribute('opacity',bk);
  G.big.innerHTML=soapMol(0,0,0,0).replace('scale(0)','scale(1)')&&`<g transform="translate(-420 -470) scale(4.4)"><path d="M0 0 q-8 18 0 34 t0 34" fill="none" stroke="#ffb347" stroke-width="7" stroke-linecap="round"/><circle r="15" fill="#4aa3ff" stroke="#fff" stroke-width="2"/></g>`;
}
H({sc:0,w:3,x:0,y:-560,html:pill('How does soap kill germs?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Germs wear a greasy coat')});
A({sc:1,w:4,x:260,y:-120,html:lbl('Greasy outer coat','#ffd54a')});
H({sc:2,w:0,x:0,y:-560,html:pill('A soap molecule')});
A({sc:2,w:7,x:-420,y:-260,html:lbl('Head loves water','#4aa3ff')});
A({sc:2,w:12,x:-420,y:-80,html:lbl('Tail loves grease','#ffb347')});
H({sc:3,w:0,x:0,y:-560,html:pill('Soap rips the coat apart','#d9232a')});
A({sc:3,w:14,x:0,y:330,html:lbl('Germ falls apart','#ff5a4d')});
H({sc:4,w:0,x:0,y:-560,html:pill('Water carries it away')});
H({sc:4,w:22,x:0,y:-450,html:pill('Scrub for 20 seconds','#2d7fd3')});
H({sc:5,w:3,x:0,y:-560,html:pill('Plain soap works great')});
return {art,init,anim,
 cam:[{sc:0,x:0,y:0,z:0.85},{sc:1,x:60,y:-40,z:1.2},{sc:2,x:-260,y:-330,z:1.2},{sc:3,x:0,y:0,z:1.0},{sc:4,x:200,y:0,z:0.85},{sc:5,x:0,y:0,z:0.8}],
 sfx:()=>[{t:wt(3,8),type:'ding'}]};
};
