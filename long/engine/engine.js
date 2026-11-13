// Professor Alienstein - Shorts engine (2D cutaway explainer).
// Needs: window.TIMINGS (scene text + times, written by the pipeline) and window.TOPIC_FACTORY (a topic file).
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const easeOutBack=p=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)};
const easeIO=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
const easeOut=p=>1-Math.pow(1-p,3);
const rnd=(n)=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const mix=(a,b,k)=>{a=a.replace('#','');b=b.replace('#','');const pa=a.match(/\w\w/g).map(h=>parseInt(h,16)),pb=b.match(/\w\w/g).map(h=>parseInt(h,16));return 'rgb('+pa.map((v,i)=>Math.round(v+(pb[i]-v)*clamp(k))).join(',')+')'};

// ---------- script / timings ----------
const FPS=30;
const TM=window.TIMINGS;
const SC=TM.scenes;               // [{text,mood,s,e}]
const DUR=TM.duration;
const WT=SC.map(sc=>{const toks=sc.text.split(/\s+/);const a=sc.s+0.15,b=sc.e-0.3;
  const wts=toks.map(w=>w.replace(/[^\w'-]/g,'').length+2.2);const tot=wts.reduce((x,y)=>x+y,0);
  let c=a;return toks.map((w,i)=>{const d=(b-a)*wts[i]/tot;const o={w,s:c,e:c+d};c+=d;return o;});});
const wt=(sc,i)=>WT[sc][i].s;
const OUTRO=SC.length-1;

// ---------- helpers topics can use ----------
const IT=[];
function add(o){IT.push(Object.assign({kind:'drop',rot:0,layer:'hud'},o));}
const A=(o)=>add(Object.assign({kind:'fade',layer:'world'},o));       // label pinned to the drawing
const H=(o)=>add(Object.assign({kind:'fade',layer:'hud'},o));         // label fixed on the screen
const lbl=(txt,col,id)=>`<div class="tag">${col?`<i style="background:${col}"></i>`:''}<span ${id?`id="${id}"`:''}>${txt}</span></div>`;
const pill=(txt,bg)=>`<div class="pill"${bg?` style="background:${bg}"`:''}>${txt}</div>`;
const E={clamp,easeOutBack,easeIO,easeOut,rnd,mix,wt,SC,WT,add,A,H,lbl,pill,T:wt};

const topic=TOPIC_FACTORY(E);

// ---------- camera ----------
const K=topic.cam.map(k=>({t:(k.w!=null?wt(k.sc,k.w):SC[k.sc].s)+(k.off||0),x:k.x,y:k.y,z:k.z}));
{const last=K[K.length-1];K.push({t:SC[OUTRO].s,x:last.x,y:last.y,z:last.z*0.92});}
if(K[0].t>0)K.unshift(Object.assign({},K[0],{t:0}));
const TRAVEL=1.3;
function cam(t){
  let i=0;for(let k=0;k<K.length;k++){if(t>=K[k].t-TRAVEL)i=k}
  const b=K[i];
  if(i>0){const u=clamp((t-(b.t-TRAVEL))/TRAVEL);if(u<1){const e=easeIO(u),a=K[i-1];
    const lz=Math.log(a.z)+(Math.log(b.z)-Math.log(a.z))*e;
    return {x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e,z:Math.exp(lz),u,i}}}
  return {x:b.x,y:b.y,z:b.z,u:1,i};
}

// ---------- brand outro ----------
H({sc:OUTRO,dt:0.4,x:0,y:-110,html:`<div style="font:800 100px/1 Poppins;color:#fff;text-align:center;-webkit-text-stroke:14px #2d1a6b;paint-order:stroke fill;text-shadow:0 8px 0 #2d1a6b">Professor<br>Alienstein</div>`});
H({sc:OUTRO,dt:1.2,x:0,y:60,html:`<div class="pill" style="font-size:44px">How things work, explained simply.</div>`});

// ---------- build ----------
const world=document.getElementById('world'),hud=document.getElementById('hud');
world.innerHTML=topic.art();
if(topic.init)topic.init(world.querySelector('svg'));
IT.forEach(it=>{const e=document.createElement('div');e.className='item';e.innerHTML=it.html;(it.layer==='world'?world:hud).appendChild(e);it.el=e;
  it.t0=it.w!=null?wt(it.sc,it.w)-0.05:SC[it.sc].s+(it.dt||0);it.t0=Math.max(it.t0,SC[it.sc].s+0.45);});
const dust=document.getElementById('dust');const DU=[];
for(let i=0;i<40;i++){const d=document.createElement('div');d.className='d';const sz=3+rnd(i)*6;d.style.width=d.style.height=sz+'px';dust.appendChild(d);DU.push({d,x:rnd(i+50)*1920,y:rnd(i+80)*1080,sp:20+rnd(i+9)*40,ph:rnd(i)*6});}

// mascot (real brand image, mouth + blink drawn on top)
document.getElementById('mascot').innerHTML=`<div style="position:absolute;left:0;top:0;width:492px;height:650px"><img src="assets/mascot.png" width="492" height="650" style="display:block">
<div id="lidL" style="position:absolute;left:150px;top:210px;width:50px;height:46px;border-radius:50%;background:#e3f2fd;display:none"><div style="position:absolute;left:4px;right:4px;top:23px;height:7px;border-radius:4px;background:#1a1a1a"></div></div>
<div id="lidR" style="position:absolute;left:290px;top:210px;width:50px;height:46px;border-radius:50%;background:#e3f2fd;display:none"><div style="position:absolute;left:4px;right:4px;top:23px;height:7px;border-radius:4px;background:#1a1a1a"></div></div>
<div id="mo" style="position:absolute;left:190px;top:322px;width:106px;height:40px;border-radius:50%;background:#8c2236;border:7px solid #1a1a1a;display:none"></div></div>`;
const mEl=document.getElementById('mo'),lL=document.getElementById('lidL'),lR=document.getElementById('lidR');
function mascot(t,open){const bl=(t%3.4)<0.14;lL.style.display=lR.style.display=bl?'block':'none';
  if(open>0.12){const h=14+open*30;mEl.style.display='block';mEl.style.height=h+'px';mEl.style.top=(343-h/2)+'px'}else mEl.style.display='none'}

// captions
const CH=[];WT.forEach((ws,si)=>{let cur=[];ws.forEach((o,i)=>{cur.push(o);if(/[.,!?…]$/.test(o.w)||cur.length>=3||i===ws.length-1){CH.push({sc:si,words:cur});cur=[]}})});
CH.forEach(c=>{c.s=c.words[0].s;c.e=c.words[c.words.length-1].e+0.12});
const capEl=document.getElementById('cap');

// ---------- render one frame ----------
function render(t){
  const c=cam(t),c2=cam(t+0.016),c1=cam(t-0.016);
  const sp=Math.hypot(c2.x-c1.x,c2.y-c1.y)*c.z/0.032+Math.abs(Math.log(c2.z/c1.z))/0.032*500;
  const z=c.z,cx=c.x+Math.sin(t*0.9)*8,cy=c.y+Math.cos(t*0.7)*6;
  world.style.transform=`translate(960px,470px) scale(${z}) translate(${-cx}px,${-cy}px)`;
  const blur=Math.min(18,sp/240);world.style.filter=blur>0.4?`blur(${blur.toFixed(2)}px)`:'none';
  topic.anim(t,z);

  IT.forEach(it=>{const l=t-it.t0,el=it.el;const fo=clamp((SC[it.sc].e+0.15-t)/0.3);
    if(it.sc===OUTRO&&t>=SC[OUTRO].s){/* outro items stay until the end */}
    if(l<0||(fo<=0&&it.sc!==OUTRO)){el.style.opacity=0;return}
    const keep=it.sc===OUTRO?1:fo;
    const inv=it.layer==='world'?1/z:1;let tr,fil='none';
    if(it.kind==='fade'){const p=easeOut(clamp(l/0.45));tr=`translate(${it.x}px,${it.y+(1-p)*24}px) translate(-50%,-50%) scale(${(0.88+0.12*p)*inv})`;el.style.opacity=p*keep}
    else if(it.kind==='stamp'){const p=clamp(l/0.28),e2=easeOut(p),s2=2.3-1.3*e2;const shake=l<0.5?Math.sin(l*70)*(1-l/0.5)*5:0;
      tr=`translate(${it.x+shake}px,${it.y}px) translate(-50%,-50%) rotate(${it.rot+(1-e2)*-8}deg) scale(${s2*inv})`;el.style.opacity=clamp(l/0.1)*keep}
    else{const p=clamp(l/0.6),s2=1.0+0.35*(1-clamp(p*1.15)),wob=Math.sin(l*16)*(1-p)*2.5;
      tr=`translate(${it.x}px,${it.y-(1-clamp(p))*60}px) translate(-50%,-50%) rotate(${it.rot+wob}deg) scale(${s2*inv})`;el.style.opacity=clamp(l/0.15)*keep}
    el.style.transform=tr;el.style.filter=fil;if(it.upd)it.upd(el,t,l);});

  DU.forEach(o=>{const x=(o.x+Math.sin(t*0.6+o.ph)*40)%1920,y=((o.y-t*o.sp)%1080+1080)%1080;o.d.style.transform=`translate(${x}px,${y}px)`;o.d.style.opacity=.25+.35*Math.abs(Math.sin(t*1.3+o.ph))});
  document.getElementById('light').style.backgroundPosition=`${Math.sin(t*0.35)*60}px 0`;
  document.getElementById('grain').style.transform=`translate(${(Math.floor(t*30)*37)%20}px,${(Math.floor(t*30)*53)%20}px)`;
  document.getElementById('endv').style.opacity=clamp((t-SC[OUTRO].s+0.1)/0.5);

  let ci=-1;for(let k=0;k<CH.length;k++){if(t>=CH[k].s-0.02&&t<CH[k].e)ci=k}
  if(ci>=0){const cc=CH[ci];const act=cc.words.findIndex(o=>t>=o.s&&t<o.e);
    capEl.innerHTML=cc.words.map((o,j)=>`<span class="${j===act?'on':''}" style="display:inline-block;transform:scale(${j===act?(1+0.18*Math.max(0,1-(t-o.s)/0.18)):1})">${o.w}</span>`).join(' ');
    capEl.style.display='block';capEl.style.top=(975-capEl.offsetHeight/2)+'px'}else capEl.style.display='none';

  let si=0;SC.forEach((q,i)=>{if(t>=q.s)si=i});
  let open=0;
  if(TM.env){const f=Math.min(TM.env.length-1,Math.max(0,Math.round(t*FPS)));open=clamp(TM.env[f]*1.5)}
  else for(const o of WT[si]){if(t>=o.s&&t<o.e){open=0.3+0.7*Math.abs(Math.sin(Math.PI*(t-o.s)/0.16));break}}
  mascot(t,open);const mood=SC[si].mood||'happy';const pop=mood==='shock'?1+0.06*Math.max(0,1-(t-SC[si].s)/0.4):1;
  const bob=Math.sin(t*(mood==='laugh'?5:2.2))*(mood==='laugh'?9:6);const tilt=mood==='think'?-3:0;
  document.getElementById('mascot').style.transform=`translateY(${bob}px) rotate(${tilt+Math.sin(t*1.4)*2}deg) scale(${0.5*(si===OUTRO?1.1:1)*pop})`;
}
window.render=render;
window.META={FPS,DUR,SC,items:IT.map(i=>({t0:i.t0,kind:i.kind,sc:i.sc})),cam:K.map(k=>k.t),extra:(topic.sfx?topic.sfx():[])};
render(0);
