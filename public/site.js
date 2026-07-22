const media=window.BUNA_MEDIA||{};
const mediaFallback=media.farm||media.cup||'';
document.querySelectorAll('[data-media]').forEach((el)=>{const key=el.dataset.media;const image=media[key]||mediaFallback;if(image)el.style.setProperty('--image',`url("${image}")`);});
document.querySelectorAll('[data-media-img]').forEach((img)=>{const key=img.dataset.mediaImg;img.src=media[key]||mediaFallback;});
const stages=[
  {state:'Ripe cherry',detail:'Farm · Highlands'},
  {state:'Selected seed',detail:'Harvest · Selection'},
  {state:'Green bean',detail:'Drying · Sorting'},
  {state:'Developing roast',detail:'Heat · First crack'},
  {state:'Roasted bean',detail:'Roasted · Ready'},
  {state:'Served coffee',detail:'Brewed · Shared'}
];
const journey=document.querySelector('.journey');
const scenes=[...document.querySelectorAll('.scene')];
const copies=[...document.querySelectorAll('.copy')];
const stateLabel=document.getElementById('stateLabel');
const stageDetail=document.getElementById('stageDetail');
const percentLabel=document.getElementById('percentLabel');
const chapterLabel=document.getElementById('chapterLabel');
const chapterCurrent=document.getElementById('chapterCurrent');
const railProgress=document.getElementById('railProgress');
const bottomProgress=document.getElementById('bottomProgress');
let lastStage=-1,raf=0;
function clamp(v,a=0,b=1){return Math.min(b,Math.max(a,v))}
function update(){raf=0;const distance=Math.max(journey.offsetHeight-innerHeight,1);const p=clamp((scrollY-journey.offsetTop)/distance);const scaled=p*(stages.length-1);const stage=Math.min(stages.length-1,Math.round(scaled));scenes.forEach((el,i)=>{const opacity=clamp(1-Math.abs(scaled-i));el.style.opacity=opacity;el.classList.toggle('is-active',opacity>.5);el.style.setProperty('--scene-y',`${(p-.5)*2.5}%`)});if(stage!==lastStage){copies.forEach((el,i)=>el.classList.toggle('is-active',i===stage));stateLabel.textContent=stages[stage].state;stageDetail.textContent=stages[stage].detail;const n=String(stage+1).padStart(2,'0');chapterLabel.textContent=n;chapterCurrent.textContent=n;lastStage=stage}const pct=Math.round(p*100);percentLabel.textContent=String(pct).padStart(2,'0')+'%';railProgress.style.height=pct+'%';bottomProgress.style.transform=`scaleX(${Math.max(.02,p)})`}
function request(){if(!raf)raf=requestAnimationFrame(update)}
addEventListener('scroll',request,{passive:true});addEventListener('resize',request);update();
const loader=document.getElementById('loader');
const imageWait=[...document.images].map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}));
Promise.all(imageWait).finally(()=>setTimeout(()=>loader.classList.add('hidden'),350));
setTimeout(()=>loader.classList.add('hidden'),2200);