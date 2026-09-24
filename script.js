const root=document.documentElement;
const saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;
document.getElementById('theme').onclick=()=>{
  const t=root.dataset.theme==='light'?'dark':'light';
  root.dataset.theme=t;localStorage.setItem('theme',t);
};
document.getElementById('yr').textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
