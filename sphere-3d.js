import * as THREE from './assets/three.module.js';
export function mountSphere(root,textureURL){
 const host=root.querySelector('.hero-globe-3d');if(!host)return;
 const fallback=()=>{host.classList.add('sphere-static');root.querySelector('.sphere-3d-pause')?.setAttribute('hidden','');};
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(error){fallback();return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,4.6);
 const assembly=new THREE.Group();assembly.position.set(.9,-.15,0);assembly.rotation.z=-.32;assembly.scale.setScalar(1.55);scene.add(assembly);
 // Studio reflections created procedurally so the shell remains crisp at any size.
 const faces=[];for(let i=0;i<6;i++){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');const g=ctx.createLinearGradient(0,0,0,128);g.addColorStop(0,'#bcd7ed');g.addColorStop(.25,'#203e61');g.addColorStop(.65,'#071528');g.addColorStop(1,'#457198');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);if(i!==3){ctx.fillStyle='#ecf7ff';ctx.fillRect(28,12,12,90);ctx.fillStyle='#86b6d9';ctx.fillRect(48,12,5,90);}faces.push(c);}
 const cube=new THREE.CubeTexture(faces);cube.needsUpdate=true;const pmrem=new THREE.PMREMGenerator(renderer);const env=pmrem.fromCubemap(cube).texture;scene.environment=env;cube.dispose();pmrem.dispose();
 scene.add(new THREE.AmbientLight(0xc1dcff,1.2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,4,5);scene.add(key);const rim=new THREE.DirectionalLight(0x6cb8ff,2);rim.position.set(3,1,-2);scene.add(rim);
 const sphereGeometry=new THREE.SphereGeometry(1,96,64);
 const glass=new THREE.Mesh(sphereGeometry,new THREE.MeshPhysicalMaterial({color:0xb9ddff,metalness:.12,roughness:.12,transparent:true,opacity:.19,side:THREE.FrontSide,depthWrite:false,envMapIntensity:1.2}));assembly.add(glass);
 const texture=new THREE.TextureLoader().load(textureURL,undefined,undefined,fallback);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 const landMaterial=new THREE.MeshStandardMaterial({map:texture,roughness:.8,metalness:.2,side:THREE.FrontSide});
 landMaterial.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
 vec3 landTex = texture2D(map, vMapUv).rgb;
 float water = step(landTex.r * 1.13, landTex.b) * step(landTex.g * 0.88, landTex.b);
 if (water > 0.5) discard;
 diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.77,0.66,0.40), 0.30);`);};
 const earth=new THREE.Mesh(sphereGeometry,landMaterial);earth.scale.setScalar(1.005);earth.rotation.y=2.6;assembly.add(earth);
 const segments=96,rows=32,count=(segments+1)*(rows+1),positions=new Float32Array(count*3),indices=[];
 for(let j=0;j<rows;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));geometry.setIndex(indices);
 const shell=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:0x0c3359,metalness:.78,roughness:.21,side:THREE.DoubleSide,envMapIntensity:1.7}));assembly.add(shell);
 const edgePositions=new Float32Array((segments+1)*3),edgeGeometry=new THREE.BufferGeometry();edgeGeometry.setAttribute('position',new THREE.BufferAttribute(edgePositions,3).setUsage(THREE.DynamicDrawUsage));const edge=new THREE.Line(edgeGeometry,new THREE.LineBasicMaterial({color:0x97c4df,transparent:true,opacity:.7}));assembly.add(edge);
 let lastProgress=-1;
 function peel(progress){if(Math.abs(progress-lastProgress)<.001)return;lastProgress=progress;shell.visible=edge.visible=progress<.997;
 for(let i=0;i<=segments;i++){const phi=i/segments*Math.PI*2;const cut=progress*Math.PI+Math.sin(phi+progress*2.3)*.33*Math.sin(progress*Math.PI);for(let j=0;j<=rows;j++){const theta=cut+(Math.PI-cut)*j/rows;const loosen=Math.sin(progress*Math.PI)*.12*j/rows;const radius=1.035+loosen;const offset=-progress*.08;const k=(j*(segments+1)+i)*3;positions[k]=-radius*Math.sin(theta)*Math.cos(phi);positions[k+1]=radius*Math.cos(theta)+offset;positions[k+2]=radius*Math.sin(theta)*Math.sin(phi);if(j===0){edgePositions[i*3]=positions[k];edgePositions[i*3+1]=positions[k+1];edgePositions[i*3+2]=positions[k+2];}}}
 geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();edgeGeometry.attributes.position.needsUpdate=true;geometry.computeBoundingSphere();}
 const button=root.querySelector('.sphere-3d-pause'),bm=document.documentElement.lang==='ms';let paused=false,visible=true,time=2,prev=0;const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 button?.addEventListener('click',()=>{paused=!paused;button.textContent=paused?(bm?'Mainkan animasi':'Play animation'):(bm?'Jeda animasi':'Pause animation');button.setAttribute('aria-pressed',String(paused));});
 const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;});observer.observe(host);
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();assembly.position.x=w<650?.35:.9;assembly.scale.setScalar(w<650?1.05:1.55);}const ro=new ResizeObserver(resize);ro.observe(host);resize();
 host.addEventListener('webglcontextlost',event=>{event.preventDefault();paused=true;fallback();});
 function frame(now){if(!host.isConnected){observer.disconnect();ro.disconnect();renderer.dispose();return;}const delta=prev?Math.min((now-prev)/1000,.05):0;prev=now;
 if(visible&&!paused&&!document.hidden&&!reduce.matches)time+=delta;
 const cycle=time%18;let p;if(cycle<2)p=0;else if(cycle<8)p=(cycle-2)/6;else if(cycle<13)p=1;else p=1-(cycle-13)/5;p=THREE.MathUtils.smoothstep(p,0,1);if(reduce.matches)p=.62;peel(p);earth.rotation.y=2.6+time*.13;shell.rotation.y=time*.08;edge.rotation.y=shell.rotation.y;glass.rotation.y=time*.09;if(visible)renderer.render(scene,camera);requestAnimationFrame(frame);}requestAnimationFrame(frame);
}
const websiteRoot=document.querySelector('.hero');if(websiteRoot)mountSphere(websiteRoot,new URL('./assets/earth.jpg',import.meta.url).href);
