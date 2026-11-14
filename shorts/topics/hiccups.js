// Topic: hiccups
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2050"/><stop offset="1" stop-color="#4a3a80"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/><g id="a"></g><g id="b"></g></svg>`}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const hic=t>=wt(3,0)&&t<wt(3,0)+0.8?1:0;
 const jerk=hic?Math.max(0,1-(t-wt(3,0))/0.8):0;
 const br=0.5+0.5*Math.sin(t*1.6);
 const dia=t<wt(2,5)?br*40:(t<wt(3,0)?20:(jerk*120));
 const rep=t>=wt(2,0)?1:0;
 let a=`<path d="M-330 -330 q-80 250 -20 560 h620 q60 -310 -20 -560z" fill="#d9a07a" opacity=".5"/>`;
 a+=`<ellipse cx="-150" cy="-60" rx="140" ry="${(220+dia*0.2).toFixed(1)}" fill="#f2a6b8" stroke="#c9738b" stroke-width="8"/><ellipse cx="150" cy="-60" rx="140" ry="${(220+dia*0.2).toFixed(1)}" fill="#f2a6b8" stroke="#c9738b" stroke-width="8"/>`;
 a+=`<path d="M-300 ${170+dia} Q0 ${40+dia} 300 ${170+dia}" stroke="${rep&&t<wt(4,0)?'#ff4b4b':'#e8c46a'}" stroke-width="40" fill="none" stroke-linecap="round"/>`;
 a+=`<rect x="-30" y="-420" width="60" height="150" rx="30" fill="#cfd8e6"/><rect x="${-30}" y="-300" width="60" height="${hic?10:50}" rx="10" fill="#8a5a30"/>`;
 G.a.innerHTML=a;
 let b='';if(hic){b=`<g transform="translate(0 -480) scale(${(1+jerk*0.4).toFixed(2)})"><rect x="-130" y="-70" width="260" height="130" rx="40" fill="#fff"/>`+`<text x="0" y="25" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="90" fill="#d9232a">HIC!</text></g>`}
 G.b.innerHTML=b;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Why hiccups?')});
H({sc:1,w:0,x:0,y:-560,html:pill('The diaphragm muscle')});
A({sc:1,w:3,x:0,y:330,html:lbl('Diaphragm','#e8c46a')});
H({sc:2,w:0,x:0,y:-560,html:pill('It gets irritated','#d9232a')});
H({sc:3,w:0,x:0,y:-560,html:pill('Voice box snaps shut')});
H({sc:4,w:0,x:0,y:-560,html:pill('Reset the rhythm','#2d7fd3')});
H({sc:5,w:0,x:0,y:-560,html:pill('Usually passes soon')});
return {art,init,anim,cam:[{sc:0,x:0,y:-50,z:0.85},{sc:1,x:0,y:50,z:1.0},{sc:2,x:0,y:50,z:1.0},{sc:3,x:0,y:-100,z:1.0},{sc:4,x:0,y:0,z:0.9},{sc:5,x:0,y:0,z:0.85}],sfx:()=>[{t:wt(3,0),type:'ding'}]};
};
