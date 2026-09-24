const root=document.documentElement;
const saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;
document.getElementById('theme').onclick=()=>{
  const t=root.dataset.theme==='light'?'dark':'light';
  root.dataset.theme=t;localStorage.setItem('theme',t);
};
document.getElementById('yr').textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- typing effect ---------- */
const words=['Electronics Systems','FPGA Design','Edge-AI','Embedded Systems','Signal Processing'];
const typed=document.getElementById('typed');let wi=0,ci=0,del=false;
(function type(){
  const w=words[wi];typed.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  ci+=del?-1:1;setTimeout(type,del?40:90);
})();

/* ---------- cursor glow, scroll progress ---------- */
const glow=document.querySelector('.cursor-glow'),bar=document.querySelector('.progress');
addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
addEventListener('scroll',()=>{bar.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'});

/* ---------- card spotlight + tilt ---------- */
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
    c.style.transform=`perspective(700px) rotateX(${(y/r.height-.5)*-6}deg) rotateY(${(x/r.width-.5)*6}deg) translateY(-3px)`;
  });
  c.addEventListener('mouseleave',()=>c.style.transform='');
});

/* ---------- particle network background ---------- */
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let W,H,pts=[];const m={x:-999,y:-999};
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;
  pts=Array.from({length:Math.min(90,Math.floor(W*H/16000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
size();addEventListener('resize',size);addEventListener('mousemove',e=>{m.x=e.clientX;m.y=e.clientY});
(function draw(){
  const col=getComputedStyle(root).getPropertyValue('--a').trim();
  cx.clearRect(0,0,W,H);cx.fillStyle=col;cx.strokeStyle=col;
  pts.forEach((p,i)=>{
    p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
    cx.globalAlpha=.7;cx.beginPath();cx.arc(p.x,p.y,1.6,0,7);cx.fill();
    for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<130){cx.globalAlpha=(1-d/130)*.3;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
    const dm=Math.hypot(p.x-m.x,p.y-m.y);
    if(dm<170){cx.globalAlpha=(1-dm/170)*.6;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}
  });
  requestAnimationFrame(draw);
})();
