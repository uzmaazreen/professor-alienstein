// Topic: yawning
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ybg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2050"/><stop offset="1" stop-color="#4a3a80"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#ybg)"/><g id="head"></g><g id="crowd"></g></svg>`}
let G={};
function init(svg){G={head:svg.querySelector('#head'),crowd:svg.querySelector('#crowd')}}
const face=(x,y,s,open,col)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="130" fill="${col||'#e0a77a'}"/><path d="M-70 -30 q20 -18 40 0 M30 -30 q20 -18 40 0" stroke="#3a2a1a" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="${50+open*10}" rx="${28+open*22}" ry="${10+open*48}" fill="#5a1a2a"/></g>`;
function anim(t){
 const y0=wt(2,0),y1=wt(3,8);
 const yw=t>=y0-0.2&&t<wt(3,0)?easeIO(clamp((t-y0)/2)):(t>=wt(3,0)&&t<y1?1-easeIO(clamp((t-wt(3,0)-1)/2)):0);
 const cool=clamp((t-wt(2,6))/2.5)*(t<wt(4,0)?1:0.6);
 let h=`<g>`+face(0,-100,2.4,yw,'#e0a77a')+`<ellipse cx="0" cy="-460" rx="230" ry="150" fill="${mix('ff8a4a','4aa3ff',cool)}" stroke="#fff" stroke-width="6" opacity=".92"/><path d="M-150 -460 q50 -60 100 0 t100 0 t100 0" stroke="#fff" stroke-width="7" fill="none" opacity=".7"/>`;
 if(yw>0.1)for(let i=0;i<6;i++){const u=((t*0.9+i/6)%1);h+=`<path d="M${-380+(i%3)*30} ${120+i*20-u*0} h${Math.round(120*(1-u))}" stroke="#8fd3ff" stroke-width="12" stroke-linecap="round" opacity="${(1-u)*yw}" transform="translate(${u*200} ${-50+i*14})"/>`}
 h+=`</g>`;G.head.innerHTML=h;
 const k=clamp((t-wt(4,0))/(SC[4].e-wt(4,0)-0.3));
 let c='';if(t>=wt(4,0)-0.2){for(let i=0;i<5;i++){const on=k*5>i+0.4;c+=face(-440+i*220,420,0.62,on?1:0,['#e0a77a','#c88a5a','#f2c9a0','#a8764a','#e0a77a'][i])}}
 G.crowd.innerHTML=c;
}
H({sc:0,w:3,x:0,y:-560,html:pill('Why do we yawn?')});
H({sc:1,w:0,x:0,y:-560,html:pill('Idea: cools the brain')});
H({sc:2,w:0,x:0,y:-560,html:pill('Cool air gulp')});
A({sc:2,w:9,x:-300,y:300,html:lbl('Cool air in','#8fd3ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Brain cools, you wake up','#2d7fd3')});
A({sc:3,w:6,x:330,y:-480,html:lbl('Brain cooler','#8fd3ff')});
H({sc:4,w:0,x:0,y:-560,html:pill('Contagious!','#d9232a')});
H({sc:5,w:0,x:0,y:-560,html:pill('Did you yawn?')});
return {art,init,anim,cam:[{sc:0,x:0,y:-100,z:0.8},{sc:1,x:0,y:-250,z:0.95},{sc:2,x:-60,y:-100,z:0.95},{sc:3,x:0,y:-250,z:0.95},{sc:4,x:0,y:150,z:0.85},{sc:5,x:0,y:-100,z:0.8}],
 sfx:()=>[]};
};
