// Long video: what if you all insects vanished.
window.TOPIC_FACTORY=(E)=>{
const {clamp,easeIO,easeOut,rnd,mix,A,H,lbl,pill,SC,WT}=E;
const K=window.KIT(E);const {wi,T,prog,lerp,f1,C,panel,R,arrowUp,arrowR,along,cross,tx,person,BG}=K;
const ORDER=['hook','many','pollin','crops','choc','birds','web','dung','recycle','soil','products','mosq','debate','collapse','decline','help','myth','safe','lesson','close'];
const S=n=>ORDER.indexOf(n);
const sp=(n,t)=>prog(S(n),t);
const Tn=(n,w)=>T(S(n),w);
const HD=(n,txt,bg)=>H({sc:S(n),w:0,x:0,y:-400,html:pill(txt,bg)});
const PC={};ORDER.slice(0,19).forEach((n,i)=>{PC[n]=[(i%3)*2500,Math.floor(i/3)*1400]});PC.close=PC.hook;
const BGC=['#1a1230','#3a2050'];
const COL={};ORDER.slice(0,19).forEach((n,i)=>{COL[n]=[['#1a1230','#3a2050'],['#0a1a3a','#1a3a6a'],['#2a1a3a','#4a2a5a'],['#10264a','#1f4a7a']][i%4]});
const P=(k)=>{const [cx,cy]=PC[k];return R(cx,cy,panel('p_'+k,cx,cy,2200,1200,COL[k][0],COL[k][1],`<g id="d_${k}"></g>`))};
const card=(x,y,w,h,f)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="30" fill="${f||'#f5f1e6'}"/>`;
const pop=(t,w,sc)=>easeOut(clamp((t-Tn(sc,w))/0.5));
const crd=(x,y,txt,u,c,w)=>`<g opacity="${u}" transform="translate(${f1(x)} ${f1(y+(1-u)*40)})">${card(0,0,w||640,130)}${tx(0,17,txt,44,c||'#3a2c12')}</g>`;
const stars=(cx,cy,n)=>{let s='';for(let i=0;i<n;i++)s+=C(cx-1000+rnd(i)*2000,cy-560+rnd(i+90)*1120,1.5+rnd(i+5)*3,'#fff',0.4+0.5*rnd(i+8));return s};
const _unused=(x,y,r,rot)=>`<clipPath id="ec${Math.round(x)}${Math.round(y)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/></clipPath><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#2d7fd3"/><g clip-path="url(#ec${Math.round(x)}${Math.round(y)})">`+[0,1,2].map(i=>{const dx=((rot*60+i*r*1.4)%(r*4.2))-r*2;return `<path d="M${f1(x+dx)} ${f1(y-r*0.3)} q${f1(r*0.3)} ${f1(-r*0.3)} ${f1(r*0.5)} ${f1(r*0.1)} q${f1(-r*0.1)} ${f1(r*0.5)} ${f1(-r*0.4)} ${f1(r*0.4)}z" fill="#4caf50"/>`}).join('')+`</g>`;
const wavesF=(cx,y,w,t,col)=>{let d=`M${cx-w} ${y}`;for(let i=0;i<=40;i++)d+=`L${cx-w+i*w*2/40} ${f1(y+Math.sin(i*0.7+t*2)*10)} `;return `<path d="${d} V${y+700} H${cx-w}z" fill="${col||'#2d7fd3'}" opacity=".85"/>`};
const house=(x,y,s)=>`<rect x="${x}" y="${y-s}" width="${s}" height="${s}" fill="#c87a4a"/><path d="M${x-10} ${y-s} L${x+s/2} ${y-s-s*0.5} L${x+s+10} ${y-s}z" fill="#8a3a2a"/>`;

const list=(sc,t,cx,cy,L,w,sz)=>{let s='';L.forEach(([wd,n,c],i)=>{const y=cy-(L.length-1)*95+i*190;s+=crd(cx,y,n,pop(t,wd,sc),c,w||1100)});return s};
const bed=(x,y)=>`<rect x="${x-260}" y="${y}" width="520" height="40" rx="10" fill="#8a5a3a"/><rect x="${x-260}" y="${y-60}" width="520" height="70" rx="26" fill="#cfe3ff"/><rect x="${x-250}" y="${y-100}" width="150" height="60" rx="26" fill="#fff"/>`;
const clock=(x,y,r,a)=>C(x,y,r,'#fff')+C(x,y,r-14,'#f5f1e6')+`<line x1="${x}" y1="${y}" x2="${f1(x+Math.sin(a)*r*0.65)}" y2="${f1(y-Math.cos(a)*r*0.65)}" stroke="#222" stroke-width="12" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${f1(x+Math.sin(a/12)*r*0.45)}" y2="${f1(y-Math.cos(a/12)*r*0.45)}" stroke="#222" stroke-width="16" stroke-linecap="round"/>`;
const face=(x,y,r,m)=>C(x,y,r,'#ffd23f')+C(x-r*0.35,y-r*0.2,r*0.1,'#222')+C(x+r*0.35,y-r*0.2,r*0.1,'#222')+(m=='sad'?`<path d="M${x-r*0.4} ${y+r*0.5} Q${x} ${y+r*0.1} ${x+r*0.4} ${y+r*0.5}" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/>`:m=='mad'?`<path d="M${x-r*0.55} ${y-r*0.45} L${x-r*0.15} ${y-r*0.3} M${x+r*0.55} ${y-r*0.45} L${x+r*0.15} ${y-r*0.3}" stroke="#222" stroke-width="12"/><path d="M${x-r*0.4} ${y+r*0.45} L${x+r*0.4} ${y+r*0.45}" stroke="#222" stroke-width="12" stroke-linecap="round"/>`:`<path d="M${x-r*0.4} ${y+r*0.3} Q${x} ${y+r*0.7} ${x+r*0.4} ${y+r*0.3}" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/>`);
const heart=(x,y,s)=>`<path transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" d="M0 60 C-120 -20 -60 -90 0 -35 C60 -90 120 -20 0 60Z" fill="#ff3b5c"/>`;


const bug=(x,y,s,fl)=>{const w=Math.sin(fl*30)*0.3;return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><ellipse cx="-24" cy="-26" rx="30" ry="14" fill="#cfeeff" transform="rotate(${f1(-25+w*40)} -24 -26)"/><ellipse cx="24" cy="-26" rx="30" ry="14" fill="#cfeeff" transform="rotate(${f1(25-w*40)} 24 -26)"/><ellipse cx="0" cy="8" rx="22" ry="34" fill="#ffd23f"/><path d="M-20 4 H20 M-18 18 H18" stroke="#222" stroke-width="7"/><circle cx="0" cy="-30" r="15" fill="#ffd23f"/><circle cx="-6" cy="-32" r="3.5" fill="#222"/><circle cx="6" cy="-32" r="3.5" fill="#222"/></g>`};
const flower=(x,y,s)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-5" y="0" width="10" height="120" fill="#4caf50"/>`+[0,1,2,3,4].map(i=>`<ellipse cx="${f1(Math.cos(i*1.257)*32)}" cy="${f1(Math.sin(i*1.257)*32)}" rx="24" ry="14" fill="#ff7aa8" transform="rotate(${i*72} ${f1(Math.cos(i*1.257)*32)} ${f1(Math.sin(i*1.257)*32)})"/>`).join('')+`<circle r="16" fill="#ffd23f"/></g>`;
const cellfn={
hook(g,cx,cy,t){const u=pop(t,'disappeared','hook');return stars(cx,cy,30)+`<g opacity="${1-u*0.8}">`+bug(cx-450,cy-60,3,t)+bug(cx-150,cy+80,2,t+1)+`</g>`+flower(cx+200,cy-120,2.4)+tx(cx+330,cy+240,'No more insects?',64,'#ffd23f')},
many(g,cx,cy,t){let s='';for(let i=0;i<14;i++)s+=bug(cx-700+((i*173)%1400),cy-300+((i*97)%600),1.2+rnd(i)*0.8,t+i);return s+crd(cx,cy,'Over 1 million species described',pop(t,'million','many'),null,1200)},
pollin(g,cx,cy,t){const u=clamp((t-Tn('pollin','carry'))/4);return flower(cx-450,cy-100,2.2)+flower(cx+250,cy-100,2.2)+bug(cx-450+u*700,cy-170-Math.sin(u*3.14)*80,2.4,t)+tx(cx-100,cy+260,'Pollen travels flower to flower',50,'#fff')},
crops(g,cx,cy,t){return crd(cx,cy-230,'About 3 in 4 crop types',pop(t,'three','crops'),null,1000)+crd(cx,cy-30,'benefit from pollinators',pop(t,'animal','crops'),null,1000)+crd(cx,cy+170,'Less food, higher prices',pop(t,'food','crops'),'#a01c1c',1000)},
choc(g,cx,cy,t){return list('choc',t,cx,cy,[['cocoa','Cocoa: tiny midges pollinate'],['coffee','Coffee: boosted by bees'],['breakfast','A very sad breakfast','#a01c1c']],1200)},
birds(g,cx,cy,t){return list('birds',t,cx,cy,[['birds','Birds feed insects to chicks'],['without','No insects: fewer birds','#a01c1c']],1200)},
web(g,cx,cy,t){return list('web',t,cx,cy,[['frogs','Frogs, lizards, spiders'],['bats','Bats and fish'],['tower','The food web shakes','#a01c1c']],1100)},
dung(g,cx,cy,t){return list('dung',t,cx,cy,[['dung','Dung beetles clean waste'],['without','Without them: dung piles up','#a01c1c'],['plants','Harder for plants to grow']],1200)},
recycle(g,cx,cy,t){return list('recycle',t,cx,cy,[['beetles','Beetles, ants, termites'],['break','Break down dead material'],['nutrients','Nutrients stay locked away','#a01c1c']],1200)},
soil(g,cx,cy,t){return list('soil',t,cx,cy,[['ants','Tunnels let air and water in'],['healthy','Healthy soil, healthy plants']],1200)},
products(g,cx,cy,t){return list('products',t,cx,cy,[['honey','Honey'],['silk','Silk'],['shellac','Shellac']],800)},
mosq(g,cx,cy,t){return list('mosq',t,cx,cy,[['malaria','Some spread malaria and dengue'],['food','Also food for fish and birds'],['complicated','It is complicated','#2d7fd3']],1300)},
debate(g,cx,cy,t){return list('debate',t,cx,cy,[['targeted','Target only the disease species'],['studied','Studied very carefully'],['connected','Everything is connected','#2d7fd3']],1300)},
collapse(g,cx,cy,t){return list('collapse',t,cx,cy,[['ecosystems','Ecosystems could collapse','#a01c1c'],['farming','Farming would struggle'],['wilson','"The little things that run the world"']],1300)},
decline(g,cx,cy,t){return list('decline',t,cx,cy,[['habitat','Habitat loss'],['pesticides','Pesticides'],['climate','Climate change'],['artificial','Light at night']],900)},
help(g,cx,cy,t){return list('help',t,cx,cy,[['plant','Plant flowers'],['wild','Leave a wild patch'],['pesticides','Fewer pesticides'],['switch','Lights off at night']],900)},
myth(g,cx,cy,t){const L=[['pests','All insects are pests'],['bite','Most insects bite'],['dirty','Bugs are always dirty']];let s='';L.forEach(([w,a],i)=>{const u=pop(t,w,'myth'),x=cx-640+i*640;const ps=a.split(' ');const h=Math.ceil(ps.length/2);s+=card(x,cy-20,560,520)+tx(x,cy-70,ps.slice(0,h).join(' '),42,'#3a2c12')+tx(x,cy-10,ps.slice(h).join(' '),42,'#3a2c12')+`<g transform="translate(${x} ${cy+150}) scale(${f1(2-u)})" opacity="${u*0.9}">${cross(0,0,90,'#ff4b4b',22)}</g>`});return s},
safe(g,cx,cy,t){return list('safe',t,cx,cy,[['world','A world with insects'],['protect','Protect them'],['stable','Stable food and nature','#2d7fd3']],1100)},
lesson(g,cx,cy,t){return list('lesson',t,cx,cy,[['pollinating','Pollinating'],['recycling','Recycling'],['feeding','Feeding others'],['soil','Keeping soil alive']],1000)}};
function art(){let s=BG;ORDER.slice(0,19).forEach(k=>{s+=P(k)});return s}
let G={};
function init(){ORDER.slice(0,19).forEach(k=>G[k]=document.getElementById('d_'+k))}
function anim(t){ORDER.slice(0,19).forEach(k=>{const [cx,cy]=PC[k];G[k].innerHTML=cellfn[k](G[k],cx,cy,t)})}
const PILL={hook:'No insects at all?',many:'How many insects?',pollin:'Pollination',crops:'Our food crops',choc:'Chocolate and coffee',birds:'The food chain',web:'The whole food web',dung:'Dung beetles',recycle:'Nature\'s recyclers',soil:'Healthy soil',products:'Honey, silk and more',mosq:'What about mosquitoes?',debate:'A careful debate',collapse:'The big picture',decline:'It is already happening',help:'How you can help',myth:'Insect myths',safe:'The safe version',lesson:'The big lesson',close:'Thank you, little ones'};
ORDER.forEach(n=>HD(n,PILL[n],(n=='myth')?'#d9232a':(n=='close'?'#2d7fd3':undefined)));
const cam=ORDER.map(n=>{const [x,y]=PC[n];return {sc:S(n),x,y,z:n=='close'?0.9:0.95}});
return {art,init,anim,cam,sfx:()=>[]};
};
