const sphereVideo=document.querySelector('.hero-globe-background video');
const spherePause=document.querySelector('.hero-background-pause');
if(sphereVideo&&spherePause){
 const bm=document.documentElement.lang==='ms';
 const update=()=>{spherePause.textContent=sphereVideo.paused?(bm?'Mainkan animasi':'Play animation'):(bm?'Jeda animasi':'Pause animation');spherePause.setAttribute('aria-pressed',String(sphereVideo.paused));};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){sphereVideo.autoplay=false;sphereVideo.pause();}
 spherePause.addEventListener('click',()=>{if(sphereVideo.paused)sphereVideo.play().catch(update);else sphereVideo.pause();});
 sphereVideo.addEventListener('play',update);sphereVideo.addEventListener('pause',update);update();
}
