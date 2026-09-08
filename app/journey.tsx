'use client';
import {useEffect,useState,useRef,lazy,Suspense} from 'react';
import {ArrowDown,ArrowUpRight,Leaf,MapPin} from 'lucide-react';
import {products,type Product} from './products';
import {jumpToCountry,journeyOffset} from './journey-navigation';
import {chapterState} from './journey-math.mjs';
import type {GlobeHandle} from './globe';
const Globe=lazy(()=>import('./globe'));
function ProductImage({product}:{product:Product}){return <img className="product-image" src={product.image} alt={product.country+' — '+product.blend+', Originalverpackung'} width="335" height="687" loading="lazy"/>}
export default function Journey(){
 const [active,setActive]=useState(0),[mounted,setMounted]=useState(false);
 const globeRef=useRef<GlobeHandle>(null),mountRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){setMounted(true);observer.disconnect();}},{rootMargin:'250px'});if(mountRef.current)observer.observe(mountRef.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{let frame=0;let current=-1;let tops:number[]=[];
 const measure=()=>{tops=products.map(p=>(document.getElementById(p.id)?.getBoundingClientRect().top??0)+scrollY);};
 const update=()=>{frame=0;const {index,progress:position}=chapterState(tops,scrollY+journeyOffset()+1);
 globeRef.current?.setProgress(position);
 if(current!==index){current=index;setActive(index);}
 };
 const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const resize=()=>{measure();scroll();};measure();update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',resize);
 const ro=new ResizeObserver(resize);document.querySelectorAll('.chapter').forEach(el=>ro.observe(el));
 return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',scroll);removeEventListener('resize',resize);ro.disconnect();};
 },[mounted]);
 const jump=jumpToCountry;
 return ( <section className="journey" id="reise" aria-label="Interaktive Gewürzreise"><div className="journey-intro"><p className="eyebrow">DEM GESCHMACK AUF DER SPUR</p><h2>Die Welt dreht sich.<br/><em>Um guten Geschmack.</em></h2><p>Folge deiner Neugier. Scrolle von Land zu Land<br/>oder wähle dein nächstes Reiseziel.</p></div><div className="journey-layout"><div className="globe-stage"><nav className="country-nav" aria-label="Reiseziel wählen">{products.map((p,i)=><button key={p.id} onClick={()=>jump(i)} aria-current={active===i?'step':undefined} style={{'--country':p.color} as React.CSSProperties}><span className="country-number">0{i+1}</span>{p.country}</button>)}</nav><div className="journey-globe" ref={mountRef}>{mounted?<Suspense fallback={<img src="/images/globe-fallback.svg" alt="Weltkarte"/>}><Globe ref={globeRef} onSelect={jump} active={active}/></Suspense>:<img className="journey-placeholder" src="/images/globe-fallback.svg" alt="Weltkarte"/>}</div><div className="globe-caption"><MapPin size={16}/><span>{products[active].landmark}</span><span className="caption-count">0{active+1} / 04</span></div><p className="globe-hint">Scrollen & entdecken <ArrowDown size={13}/></p></div>
 <div className="chapters">{products.map((p,i)=><article id={p.id} tabIndex={-1} key={p.id} className={`chapter ${active===i?'is-active':''}`} style={{'--country':p.color} as React.CSSProperties}><div className="chapter-heading"><p className="eyebrow"><span className="chapter-index">0{i+1}</span>{p.country.toUpperCase()}</p><h2>{p.title[0]}<br/><em>{p.title[1]}</em></h2></div><div className="chapter-product"><div className="product-photo"><ProductImage product={p}/><span className="weight">{p.weight} · WORLD COLLECTION</span></div><div className="product-copy"><p className="tasting-note">{p.note}</p><h3>{p.blend}</h3><p>{p.description}</p><a className="text-link" href={`/gewuerze/${p.id}`}>Zum Gewürz <ArrowUpRight size={18}/></a></div></div><div className="cooking-note"><Leaf size={18}/><p>{p.use}</p></div></article>)}</div></div></section>
);
}
