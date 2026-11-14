// Topic: knuckle cracking
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="kbg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#7a3a50"/><stop offset="1" stop-color="#2a1230"/></radialGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#kbg)"/><g id="j"></g><g id="pop"></g></svg>`}
let G={};
function init(svg){G={j:svg.querySelector('#j'),pop:svg.querySelector('#pop')}}
function anim(t){
 const pull=easeIO(clamp((t-wt(2,3))/1.6));
 const rel=t>=wt(4,0)?0:pull;
 const gap=60+rel*220;
 const bag=t>=wt(1,0);
 let j='';
 j+=`<rect x="${-760}" y="-110" width="${620-gap/2}" height="220" rx="100" fill="#f5f1e6" stroke="#cfc6a8" stroke-width="8"/><rect x="${gap/2+140}" y="-110" width="${620-gap/2}" height="220" rx="100" fill="#f5f1e6" stroke="#cfc6a8" stroke-width="8"/>`;
 if(bag)j+=`<ellipse cx="0" cy="0" rx="${gap/2+170}" ry="130" fill="#ffe28a" opacity=".55" stroke="#ffb43b" stroke-width="6" stroke-dasharray="14 10"/>`;
 if(bag)for(let i=0;i<20;i++){const a=i*2.4+t*0.3,r=rnd(i)*(gap/2+110);j+=`<circle cx="${Math.cos(a)*r}" cy="${Math.sin(a)*Math.min(90,r*0.7)}" r="8" fill="#ffd23f" opacity=".8"/>`}
 G.j.innerHTML=j;
 const tp=wt(3,3);const bu=clamp((t-tp)/0.25);
 let p='';
 if(t>=tp&&t<wt(4,0)+0.5){const sz=bu<1?bu*50:50;p+=`<circle cx="0" cy="0" r="${sz.toFixed(1)}" fill="#fff" opacity=".9" stroke="#8fd3ff" stroke-width="6"/>`;if(t<tp+0.7){const u=(t-tp)/0.7;p+=`<circle cx="0" cy="0" r="${60+u*260}" fill="none" stroke="#fff" stroke-width="${10*(1-u)}" opacity="${1-u}"/>`}}
 G.pop.innerHTML=p;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Why knuckles pop')});
H({sc:1,w:0,x:0,y:-560,html:pill('Joint = sealed bag of liquid')});
A({sc:1,w:6,x:0,y:-250,html:lbl('Slippery liquid','#ffd23f')});
H({sc:2,w:0,x:0,y:-560,html:pill('Pull = pressure drops')});
H({sc:3,w:0,x:0,y:-560,html:pill('A bubble forms: POP','#d9232a')});
A({sc:3,w:9,x:0,y:260,html:lbl('Gas bubble','#8fd3ff')});
H({sc:4,w:0,x:0,y:-560,html:pill('20 minute wait','#2d7fd3')});
H({sc:5,w:0,x:0,y:-560,html:pill('Not proven to cause arthritis')});
return {art,init,anim,cam:[{sc:0,x:0,y:0,z:0.8},{sc:1,x:0,y:0,z:0.9},{sc:2,x:0,y:0,z:1.0},{sc:3,x:0,y:0,z:1.15},{sc:4,x:0,y:0,z:0.9},{sc:5,x:0,y:0,z:0.8}],
 sfx:()=>[{t:wt(3,3),type:'ding'}]};
};
