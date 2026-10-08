const video=document.querySelector('.ks-video-wrap video');
const pause=document.querySelector('.ks-video-pause');
if(video&&pause){
 const bm=document.documentElement.lang==='ms';
 function label(){pause.textContent=video.paused?(bm?'Mainkan':'Play'):(bm?'Jeda':'Pause');pause.setAttribute('aria-pressed',String(video.paused));}
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){video.autoplay=false;video.pause();}
 pause.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{});}else{video.pause();}});
 video.addEventListener('play',label);video.addEventListener('pause',label);label();
}
