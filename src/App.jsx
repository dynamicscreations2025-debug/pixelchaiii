import {useEffect,useRef,useState,lazy,Suspense} from 'react';import Lenis from 'lenis';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import {motion} from 'framer-motion';import {Sun,Moon,Menu,X,ArrowUpRight} from 'lucide-react';
import {Cursor,Magnetic} from './components/ui.jsx';import {WORK,SERV,u} from './data.js';
const Hero3D=lazy(()=>import('./components/Scenes.jsx').then(m=>({default:m.HeroScene})));const Tunnel3D=lazy(()=>import('./components/Scenes.jsx').then(m=>({default:m.TunnelScene})));
gsap.registerPlugin(ScrollTrigger);
export default function App(){
 const [dark,setDark]=useState(false),[menu,setMenu]=useState(false),[show3D,setShow3D]=useState(false);const root=useRef();const mq=useRef();
 useEffect(()=>{const timer=setTimeout(()=>setShow3D(true),1200);return()=>clearTimeout(timer)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark]);
 useEffect(()=>{const l=new Lenis({duration:1.2});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);
  const ctx=gsap.context(()=>{
   gsap.from('.hero-line',{yPercent:110,stagger:.12,duration:1.4,ease:'expo.out'});
   gsap.utils.toArray('.count').forEach(el=>{const o={v:0},t=+el.dataset.to;gsap.to(o,{v:t,duration:2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'},onUpdate:()=>el.textContent=Math.round(o.v)+(el.dataset.s||'')});});
   gsap.utils.toArray('.bar').forEach(b=>gsap.fromTo(b,{scaleX:0},{scaleX:1,transformOrigin:'left',scrollTrigger:{trigger:b,start:'top 90%',end:'top 50%',scrub:true}}));
   const words=gsap.utils.toArray('.word');gsap.set(words,{opacity:0});
   const wt=gsap.timeline({scrollTrigger:{trigger:'.tunnel',start:'top top',end:'bottom bottom',scrub:true}});
   words.forEach(w=>{wt.fromTo(w,{opacity:0,scale:.85,filter:'blur(16px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1}).to(w,{opacity:1,duration:.8}).to(w,{opacity:0,scale:1.12,filter:'blur(16px)',duration:1})});
   ScrollTrigger.create({trigger:'.tunnel',start:'top top',end:'bottom bottom',pin:'.tunnel-in'});
   const sv=gsap.utils.toArray('.serv');gsap.set(sv.slice(1),{opacity:0,filter:'blur(24px)'});
   const tl=gsap.timeline({scrollTrigger:{trigger:'.services',start:'top top',end:'+=2400',pin:true,scrub:true}});
   sv.forEach((s,i)=>{if(i)tl.to(sv[i-1],{opacity:0,filter:'blur(24px)'}).to(s,{opacity:1,filter:'blur(0px)'},'<');tl.to({},{duration:.8})});
   gsap.utils.toArray('.phone').forEach((p,i)=>gsap.to(p,{y:-20-i*6,repeat:-1,yoyo:true,duration:2+i*.3,ease:'sine.inOut'}));
  },root);
  let x=0;const tick=()=>{x-=1.2+Math.abs(l.velocity||0)*.4;if(x<-mq.current.scrollWidth/2)x=0;mq.current.style.transform=`translateX(${x}px)`};gsap.ticker.add(tick);
  return()=>{ctx.revert();l.destroy();gsap.ticker.remove(tick)}},[]);
 const gal=useRef();const gm=e=>{const r=gal.current.getBoundingClientRect();gal.current.style.setProperty('--mx',(e.clientX-r.left)/r.width-.5);gal.current.style.setProperty('--my',(e.clientY-r.top)/r.height-.5)};
 const nav=['Work','Services','About','Contact'];
 return <div ref={root}><Cursor/>
 <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 rounded-full px-6 py-3 backdrop-blur-xl bg-[#0B0B0C]/80 text-white border border-white/15 shadow-lg w-[min(92vw,720px)] justify-between">
  <a href="#/" className="font-serif text-xl">Pixel Chai</a>
  <div className="hidden md:flex gap-6 text-sm">{nav.map(n=><a key={n} href={'#/'+n.toLowerCase()}>{n}</a>)}</div>
  <div className="flex gap-3 items-center"><button aria-label="Toggle theme" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="md:hidden" aria-label="Menu" onClick={()=>setMenu(!menu)}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div></nav>
 {menu&&<div className="fixed inset-0 z-40 bg-[#0B0B0C] text-white flex flex-col items-center justify-center gap-8 h-section">{nav.map(n=><a key={n} className="h-lg" href={'#/'+n.toLowerCase()} onClick={()=>setMenu(false)}>{n}</a>)}</div>}

 <header className="light-world relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-14 pb-16">
  <div className="absolute inset-0">{show3D&&<Suspense fallback={null}><Hero3D/></Suspense>}</div>
  <div className="relative pointer-events-none"><p className="label mb-6">Creative &amp; digital studio · Hyderabad</p>
   <h1 className="h-xl"><span className="block overflow-hidden"><span className="hero-line block">We build brands.</span></span><span className="block overflow-hidden"><span className="hero-line block italic text-chai">We create experiences.</span></span></h1>
   <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto"><Magnetic href="#work" className="solid">Explore our work</Magnetic><Magnetic href="#contact">Start a project</Magnetic></div></div></header>

 <section className="tunnel dark-world relative" style={{height:'400vh'}}><div className="tunnel-in h-screen relative overflow-hidden"><div className="absolute inset-0">{show3D&&<Suspense fallback={null}><Tunnel3D/></Suspense>}</div>
  <div className="relative h-full grid place-items-center">{['Next-gen','Engineering','Creativity','Technology'].map(w=><span key={w} className="word h-xl absolute text-center">{w}</span>)}</div></div></section>

 <section className="dark-world px-6 md:px-14 py-24 grid md:grid-cols-3 gap-12">
  {[[97,'%','Placeholder stat'],[12,'K','Placeholder stat'],[30,'+','Placeholder stat']].map(([n,s,t],i)=><div key={i}><div className="h-xl"><span className="count" data-to={n} data-s={s}>0</span></div><div className="bar h-px bg-[#4da3ff] my-4"/><p className="label">{t} — replace before publishing</p></div>)}</section>

 <section id="work" className="dark-world px-6 md:px-14 py-24 overflow-hidden"><h2 className="h-lg mb-16">Touching tomorrow, today.</h2>
  <div className="flex gap-6 justify-center pb-16">{[0,1,2,3,4].map(i=><div key={i} className="phone hover shrink-0 w-40 md:w-52 aspect-[9/19] rounded-[2rem] border-4 border-white/20 overflow-hidden" style={{transform:`rotate(${(i-2)*5}deg) translateY(${Math.abs(i-2)*20}px)`}}><img loading="lazy" src={u(i,400)} alt={WORK[i][0]} className="w-full h-full object-cover"/></div>)}</div>
  <div className="grid md:grid-cols-3 gap-6">{WORK.slice(0,6).map(([n,c],i)=><a key={n} className="hover group block"><div className="overflow-hidden rounded-xl aspect-[4/3]"><img loading="lazy" src={u(i+1,800)} alt={n} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/></div><div className="flex justify-between mt-3"><span className="font-serif text-2xl">{n}</span><ArrowUpRight/></div><p className="label">{c}</p></a>)}</div></section>

 <section className="light-world py-20 overflow-hidden"><div ref={mq} className="h-xl whitespace-nowrap w-max">{Array(2).fill('Where Human Intelligence Meets Digital Innovation. ').join('')}</div></section>

 <section ref={gal} onMouseMove={gm} className="dark-world relative h-[110vh] overflow-hidden" style={{'--mx':0,'--my':0}}>
  {Array.from({length:16}).map((_,i)=>{const d=.3+(i%4)*.35;return <img key={i} loading="lazy" src={u(i,500)} alt="" className="absolute rounded-lg object-cover" style={{width:`${110+d*90}px`,height:`${150+d*110}px`,left:`${(i*37)%88}%`,top:`${(i*53)%78}%`,opacity:.45+d*.4,transform:`translate(calc(var(--mx)*${-d*90}px),calc(var(--my)*${-d*90}px))`,transition:'transform .5s var(--ease)'}}/>})}
  <div className="absolute inset-0 grid place-items-center pointer-events-none"><h2 className="h-xl text-center">Welcome to our world.</h2></div></section>

 <section id="services" className="services dark-world relative h-screen overflow-hidden">{SERV.map(([t,l],i)=><div key={t} className="serv absolute inset-0 grid md:grid-cols-2 gap-8 items-center px-6 md:px-14"><h2 className="h-xl">{t}</h2><ul className="font-serif text-3xl md:text-4xl space-y-2">{l.map(x=><li key={x}>{x}</li>)}</ul></div>)}</section>

 <section className="light-world px-6 md:px-14 py-28 text-center"><h2 className="h-lg mb-14">Your next big idea, brought to life.</h2>
  <div className="relative mx-auto max-w-4xl"><div className="rounded-t-2xl border-8 border-espresso aspect-[16/10] overflow-hidden"><img loading="lazy" src={u(3,1200)} alt="Laptop project preview" className="w-full h-full object-cover"/></div><div className="h-3 bg-espresso rounded-b-xl mx-[-2%]"/>
   <div className="absolute -right-2 md:-right-14 -bottom-8 w-28 md:w-44 aspect-[9/19] rounded-[1.6rem] border-4 border-espresso overflow-hidden"><img loading="lazy" src={u(4,300)} alt="Phone project preview" className="w-full h-full object-cover"/></div></div></section>

 <footer id="contact" className="dark-world relative px-6 md:px-14 pt-28 pb-10 overflow-hidden"><h2 className="h-xl mb-10">Start your journey.</h2>
  <Magnetic href="mailto:hello@pixelchai.in" className="solid">Send a project enquiry</Magnetic>
  <p className="mt-8 opacity-70">hello@pixelchai.in · Hyderabad, India · Instagram · LinkedIn</p>
  <div className="font-serif select-none leading-none text-center opacity-[.07]" style={{fontSize:'22vw'}}>Pixel Chai</div></footer></div>}
