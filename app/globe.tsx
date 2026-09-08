'use client';
import {forwardRef,useEffect,useImperativeHandle,useRef,useState} from 'react';
import * as THREE from 'three';
import {products} from './products';
import {interpolateDestination} from './journey-math.mjs';
export type GlobeHandle={setProgress:(value:number)=>void};
const positionFor=(longitude:number,latitude:number,radius:number)=>{const lat=latitude*Math.PI/180,lon=longitude*Math.PI/180;return new THREE.Vector3(Math.cos(lat)*Math.cos(lon),Math.sin(lat),-Math.cos(lat)*Math.sin(lon)).multiplyScalar(radius);};
const Globe=forwardRef<GlobeHandle,{active:number;onSelect:(i:number)=>void}>(function Globe({active,onSelect},forwarded){
 const host=useRef<HTMLDivElement>(null),api=useRef<(value:number)=>void>(()=>{}),pending=useRef(active),select=useRef(onSelect);
 const [failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 select.current=onSelect;
 useImperativeHandle(forwarded,()=>({setProgress(value){pending.current=value;api.current(value);}}),[]);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
  let dead=false,frame=0,visible=true,current=pending.current,target=pending.current;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
  element.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);
  const geometry=new THREE.SphereGeometry(1,64,40),material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1});
  const sphere=new THREE.Mesh(geometry,material);scene.add(sphere);
  scene.add(new THREE.AmbientLight(0xfffaed,2.0));const light=new THREE.DirectionalLight(0xfff9ec,2.4);scene.add(light);
  const pinGeometry=new THREE.SphereGeometry(.022,12,8),pinMaterial=new THREE.MeshBasicMaterial({color:0xb78a3e});
  const pins=products.map((p,i)=>{const pin=new THREE.Mesh(pinGeometry,pinMaterial);pin.position.copy(positionFor(...p.coordinates,1.013));pin.userData.index=i;scene.add(pin);return pin;});
  const render=()=>{
   frame=0;if(dead||!visible)return;
   current=reduced.matches?Math.round(target):current+(target-current)*.14;
   if(Math.abs(current-target)<.001)current=target;
   const [lon,lat]=interpolateDestination(products.map(p=>p.coordinates),current);
   camera.position.copy(positionFor(lon,lat-7,3.5));camera.lookAt(0,0,0);
   light.position.copy(camera.position).add(new THREE.Vector3(-2,3,1));
   renderer.render(scene,camera);
   if(!reduced.matches&&Math.abs(current-target)>.001)frame=requestAnimationFrame(render);
  };
  const request=()=>{if(!frame&&!dead&&visible)frame=requestAnimationFrame(render);};
  api.current=(value)=>{if(Math.abs(target-value)<.0005)return;target=value;request();};
  let lastWidth=0; const resize=()=>{const width=Math.round(element.clientWidth);if(width && width!==lastWidth){lastWidth=width;renderer.setSize(width,width,false);request();}};
  const ro=new ResizeObserver(resize);ro.observe(element);resize();
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)request();else{cancelAnimationFrame(frame);frame=0;}});io.observe(element);
  const texture=new THREE.TextureLoader().load('/images/earth-texture.png',()=>{if(dead)return;texture.colorSpace=THREE.SRGBColorSpace;material.map=texture;material.needsUpdate=true;setReady(true);request();},undefined,()=>{if(!dead)setFailed(true);});
  const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2();
  const hit=(event:PointerEvent)=>{const box=renderer.domElement.getBoundingClientRect();mouse.set((event.clientX-box.left)/box.width*2-1,-(event.clientY-box.top)/box.height*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects([sphere,...pins]);return hits[0]?.object.userData.index as number|undefined;};
  const click=(e:PointerEvent)=>{const index=hit(e);if(index!==undefined)select.current(index);};
  const move=(e:PointerEvent)=>{renderer.domElement.style.cursor=hit(e)===undefined?'default':'pointer';};
  const lost=(event:Event)=>{event.preventDefault();if(!dead)setFailed(true);};
  renderer.domElement.addEventListener('pointerup',click);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('webglcontextlost',lost);
  reduced.addEventListener('change',request);
  return()=>{dead=true;api.current=()=>{};cancelAnimationFrame(frame);ro.disconnect();io.disconnect();reduced.removeEventListener('change',request);renderer.domElement.removeEventListener('pointerup',click);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',lost);geometry.dispose();material.dispose();texture.dispose();pinGeometry.dispose();pinMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className={`globe-render gpu-globe ${ready&&!failed?'is-ready':''}`} role="img" aria-label={`Globus — ${products[active].country}`}><div ref={host} className="globe-canvas-host" style={{visibility:failed?'hidden':undefined}}/>{(!ready||failed)&&<img className="static-globe" src="/images/globe-fallback.svg" alt="Weltkarte"/>}</div>;
});
export default Globe;

