'use client';
import { useState } from 'react';
import { ArrowUpRight,Menu,X } from 'lucide-react';
import { Sheet,SheetContent,SheetTitle,SheetDescription } from '@/components/ui/sheet';
import { products,type Product } from './products';
import Hero from './hero';
import Journey from './journey';
function ProductImage({product}:{product:Product}){return <img className="product-image" src={product.image} alt={`${product.country} – ${product.blend}, Originalverpackung`} width="350" height="690" loading="lazy"/>}
export default function Experience(){
 const [menu,setMenu]=useState(false);
 return <><a className="skip-link" href="#reise">Zur Gewürzreise</a>
 <header className="site-header"><a className="wordmark" href="/">GLOBE SPICES<span>SPICES FROM AROUND THE WORLD</span></a><nav className="desktop-nav" aria-label="Hauptnavigation"><a href="#reise">Die Gewürzreise</a><a href="#kollektion">Unsere Gewürze</a><a href="#ueber-uns">Über uns</a></nav><a href="#reise" className="header-cta">Welt entdecken <ArrowUpRight size={17}/></a><button className="menu-button" aria-label="Menü öffnen" onClick={()=>setMenu(true)}><Menu/></button></header>
 <Sheet open={menu} onOpenChange={setMenu}><SheetContent className="mobile-menu" showCloseButton={false}><SheetTitle>Globe Spices</SheetTitle><SheetDescription>Vier Länder. Eine Reise.</SheetDescription><button className="close-menu" aria-label="Menü schliessen" onClick={()=>setMenu(false)}><X/></button><nav aria-label="Mobile Navigation">{[['Die Gewürzreise','#reise'],['Unsere Gewürze','#kollektion'],['Über uns','#ueber-uns']].map(([name,url])=><a key={url} href={url} onClick={()=>setMenu(false)}>{name}<ArrowUpRight/></a>)}</nav></SheetContent></Sheet>
 <main><Hero/>
 <Journey/>
 <section id="kollektion" className="collection"><div className="section-heading"><div><p className="eyebrow">DEINE KÜCHE. DEINE WELTREISE.</p><h2>Vier kleine Dosen.<br/><em>Eine ganze Welt.</em></h2></div><p>Ein vertrauter Geschmack. Ein neues Lieblingsgericht.<br/>Finde die Mischung, die zu dir passt.</p></div><div className="product-grid">{products.map((p,i)=><a key={p.id} className="product-card" href={`/gewuerze/${p.id}`} style={{'--country':p.color} as React.CSSProperties}><div className="card-top"><span>0{i+1} / {p.country.toUpperCase()}</span><ArrowUpRight size={20}/></div><ProductImage product={p}/><div className="card-bottom"><h3>{p.blend}</h3><span>{p.weight}</span></div><p>{p.short}</p><p className="card-use"><strong>Passt zu:</strong> {p.use}</p><span className="card-action">Details ansehen <ArrowUpRight size={16}/></span></a>)}</div></section>
 <section className="about" id="ueber-uns"><div className="about-number">6<span>KÖPFE. EINE IDEE.</span></div><div className="about-copy"><p className="eyebrow">AUS ZÜRICH. MIT NEUGIER.</p><h2>Unsere Welt.<br/><em>Deine Küche.</em></h2><p>Wir sind sechs Schülerinnen und Schüler der Kantonsschule Zürich Nord. Mit Globe Spices machen wir aus unserer Begeisterung für gutes Essen ein gemeinsames Unternehmen.</p><p>Vier Länder, zu denen wir einen persönlichen Bezug haben. Vier Mischungen, die Menschen an einen Tisch bringen. Und die Lust, etwas Eigenes auf die Beine zu stellen.</p><a className="text-link" href="https://www.instagram.com/globe_spices/" target="_blank" rel="noreferrer">Begleite unsere Reise auf Instagram <ArrowUpRight size={18}/></a></div></section></main>
 <footer><a className="wordmark" href="/">GLOBE SPICES<span>SPICES FROM AROUND THE WORLD</span></a><p>Vier Länder. Vier Gewürze. Eine Reise.</p><a href="https://www.instagram.com/globe_spices/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><span className="copyright">© {new Date().getFullYear()} Globe Spices · Zürich</span></footer></>;
}

