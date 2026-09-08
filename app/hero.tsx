'use client';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import {jumpToCountry} from './journey-navigation';
export default function Hero(){
 return <section className="still-hero" aria-labelledby="hero-title">
  <div className="still-hero-heading"><img className="hero-botanical" src="/images/hero-botanical.webp" alt="" width="153" height="408"/><p className="eyebrow">DIE WORLD COLLECTION</p><h1 id="hero-title">Vier Länder.<br/>Vier Gewürze.<br/><span>Eine Reise.</span></h1><p className="still-hero-description">Eine Prise Fernweh.<br/>Eine Welt voller Geschmack.</p></div>
  <div className="still-hero-scene"><img src="/images/hero-still.webp" alt="Ein olivgrüner Globus auf hellem Stein, umgeben von Kräutern, Zimt, Sternanis und Gewürzen" width="853" height="1016" fetchPriority="high"/><button className="hero-hotspot hotspot-europe" onClick={()=>jumpToCountry(0)} aria-label="Schweiz entdecken"><span className="hotspot-label">Schweiz <ArrowUpRight size={14}/></span></button><button className="hero-hotspot hotspot-india" onClick={()=>jumpToCountry(1)} aria-label="Indien entdecken"><span className="hotspot-label">Indien <ArrowUpRight size={14}/></span></button></div>
  <div className="still-hero-action"><a className="button" href="#reise">Gewürze entdecken <ArrowDown size={21}/></a><a className="still-scroll" href="#reise"><ArrowDown size={16}/><span>SCROLLEN & ENTDECKEN</span></a></div>
 </section>;
}
