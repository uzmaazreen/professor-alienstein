// Topic: stomach growl
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2430"/><stop offset="1" stop-color="#6a3a50"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#bg)"/><g id="a"></g><g id="b"></g></svg>`}
let G={};
function init(svg){G={a:svg.querySelector('#a'),b:svg.querySelector('#b')}}
function anim(t){
 const full=t<wt(2,0)?1:0;
 const wv=Math.sin(t*2.2);
 let a=`<path d="M-80 -420 v140 q-300 80 -260 320 q60 280 330 250 q260 -20 280 -220 q10 -120 -110 -150 l-60 -40 v-160z" fill="#e8908a" stroke="#b85a6a" stroke-width="10" transform="scale(${(1+0.04*wv).toFixed(3)} ${(1-0.05*wv).toFixed(3)})"/>`;
 if(full)for(let i=0;i<5;i++)a+=`<circle cx="${-160+i*70+Math.sin(i)*20}" cy="${40+Math.cos(i*2)*60}" r="34" fill="#c8a24a"/>`;
 else for(let i=0;i<10;i++){const u=((t*0.35+i/10)%1);a+=`<circle cx="${-200+rnd(i)*300+Math.sin(t*2+i)*30}" cy="${240-u*300}" r="${10+rnd(i+4)*14}" fill="#cfeaff" opacity=".8"/>`}
 G.a.innerHTML=a;
 let b='';const g=t>=wt(3,0)&&t<wt(4,0)+1;
 if(g)for(let i=0;i<3;i++){const u=((t*0.9+i/3)%1);b+=`<path d="M${180+u*220} -40 q50 40 0 80" stroke="#ffe14d" stroke-width="12" fill="none" opacity="${1-u}" stroke-linecap="round"/><path d="M${230+u*260} -80 q80 80 0 160" stroke="#ffe14d" stroke-width="10" fill="none" opacity="${1-u}" stroke-linecap="round"/>`}
 if(g)b+=`<text x="140" y="-300" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="110" fill="#fff" transform="rotate(${(Math.sin(t*10)*4).toFixed(1)} 140 -300)">GRRR</text>`;
 G.b.innerHTML=b;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Stomach growl')});
H({sc:1,w:0,x:0,y:-560,html:pill('Muscle tubes squeeze')});
A({sc:1,w:3,x:0,y:340,html:lbl('Waves push food on','#ffd23f')});
H({sc:2,w:0,x:0,y:-560,html:pill('Empty = air + liquid moves')});
H({sc:3,w:0,x:0,y:-560,html:pill('The sound echoes','#d9232a')});
H({sc:4,w:0,x:0,y:-560,html:pill('Normal, not only hunger','#2d7fd3')});
H({sc:5,w:0,x:0,y:-560,html:pill('Your stomach talks')});
return {art,init,anim,cam:[{sc:0,x:0,y:0,z:0.85},{sc:1,x:0,y:0,z:0.95},{sc:2,x:-40,y:0,z:1.0},{sc:3,x:100,y:-50,z:0.95},{sc:4,x:0,y:0,z:0.9},{sc:5,x:0,y:0,z:0.85}],sfx:()=>[]};
};
