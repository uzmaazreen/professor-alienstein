// Topic: chapped lips
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,wt,A,H,lbl,pill,SC}=E;
function art(){return `<svg width="2400" height="2800" viewBox="-1200 -1300 2400 2800" style="position:absolute;left:-1200px;top:-1300px;overflow:visible" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="clbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb4e8"/><stop offset="1" stop-color="#d8e8f8"/></linearGradient></defs>
<rect x="-1200" y="-1300" width="2400" height="2800" fill="url(#clbg)"/>
<g id="skin"></g><g id="wat"></g><g id="tg"></g></svg>`}
let G={};
function init(svg){G={skin:svg.querySelector('#skin'),wat:svg.querySelector('#wat'),tg:svg.querySelector('#tg')}}
function anim(t){
 const balm=clamp((t-wt(4,4))/1.0);
 const lipThin=t>=wt(1,0);
 const th=lipThin?70:150;
 let s=`<rect x="-500" y="${-80}" width="1000" height="${th}" fill="#f0b9a0"/><rect x="-500" y="${-80+th}" width="1000" height="420" fill="#d98a7a"/><rect x="-500" y="${-80+th+420}" width="1000" height="200" fill="#b8584f"/>`;
 s+=`<rect x="-500" y="${-80+th}" width="1000" height="10" fill="#c46a5a"/>`;
 if(t<wt(1,0)||t>=wt(1,0)){} 
 // oil glands only when skin is thick (scene 0/1 compare)
 if(t<wt(2,0)){for(let i=0;i<4;i++)s+=`<ellipse cx="${-380+i*250}" cy="${-20+th/2+60}" rx="30" ry="46" fill="#ffd23f" opacity="${t<wt(1,0)?0:0.0}"/>`}
 if(balm>0)s+=`<rect x="-500" y="${-80-balm*50}" width="1000" height="${balm*50}" fill="#ffe9a8" opacity=".9"/>`;
 G.skin.innerHTML=s;
 let w='';const esc=clamp((t-wt(2,0))/1.2);
 for(let i=0;i<22;i++){const u=((t*0.25+rnd(i))%1);const x=-460+rnd(i+3)*920;const y0=-80+th+300;const lim=balm>0.5?-80+th-20:-480;const y=Math.max(y0-u*(y0+500)*esc,lim);if(esc>0)w+=`<circle cx="${x}" cy="${y}" r="${14+rnd(i)*8}" fill="#5aa8ff" opacity="${(esc*0.9).toFixed(2)}"/>`}
 for(let i=0;i<14;i++)w+=`<circle cx="${-460+i*70}" cy="${-80+th+260+Math.sin(i)*60}" r="14" fill="#5aa8ff" opacity=".5"/>`;
 G.wat.innerHTML=w;
 const lk=clamp((t-wt(3,0)-0.6)/0.8);
 let g='';if(lk>0&&lk<1)g=`<ellipse cx="${-300+lk*600}" cy="-110" rx="120" ry="48" fill="#e86a82" opacity=".9"/>`;
 if(t>=wt(3,0)+0.6&&t<wt(4,0)){for(let i=0;i<8;i++){const u=((t*0.8+i/8)%1);g+=`<circle cx="${-400+i*110}" cy="${-110-u*200}" r="10" fill="#fff" opacity="${1-u}"/>`}}
 G.tg.innerHTML=g;
}
H({sc:0,w:4,x:0,y:-560,html:pill('Why lips crack')});
H({sc:1,w:0,x:0,y:-560,html:pill('Thin skin, no oil')});
A({sc:1,w:7,x:0,y:-260,html:lbl('Super thin lip skin','#ffd54a')});
H({sc:2,w:0,x:0,y:-560,html:pill('Water escapes')});
A({sc:2,w:8,x:0,y:-330,html:lbl('Dry winter air','#8fd3ff')});
H({sc:3,w:0,x:0,y:-560,html:pill('Licking makes it worse','#d9232a')});
H({sc:4,w:0,x:0,y:-560,html:pill('Seal it with balm','#2d7fd3')});
A({sc:4,w:7,x:0,y:-330,html:lbl('Balm shield','#ffe9a8')});
H({sc:5,w:0,x:0,y:-560,html:pill('Fix is outside')});
return {art,init,anim,cam:[{sc:0,x:0,y:100,z:0.85},{sc:1,x:0,y:100,z:0.95},{sc:2,x:0,y:100,z:0.95},{sc:3,x:0,y:50,z:1.0},{sc:4,x:0,y:50,z:1.0},{sc:5,x:0,y:100,z:0.85}],
 sfx:()=>[]};
};
