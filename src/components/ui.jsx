import {useEffect,useRef,useState} from 'react';
export function Cursor(){const r=useRef();const [big,setBig]=useState(false);
useEffect(()=>{const mv=e=>r.current&&(r.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);const ov=e=>setBig(!!e.target.closest('a,button,.hover'));
addEventListener('mousemove',mv);addEventListener('mouseover',ov);return()=>{removeEventListener('mousemove',mv);removeEventListener('mouseover',ov)}},[]);
return <div ref={r} className={'cursor'+(big?' big':'')}/>}
export function Magnetic({children,className='',href='#'}){const r=useRef();
const mv=e=>{const b=r.current.getBoundingClientRect();r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.3}px,${(e.clientY-b.top-b.height/2)*.3}px)`};
return <a ref={r} href={href} className={'btn '+className} onMouseMove={mv} onMouseLeave={()=>r.current.style.transform=''}>{children}</a>}
export function Preloader({done}){const [n,setN]=useState(0);
useEffect(()=>{let v=0;const t=setInterval(()=>{v+=Math.ceil(Math.random()*8);if(v>=100){v=100;clearInterval(t);setTimeout(done,350)}setN(v)},50);return()=>clearInterval(t)},[]);
return <div className="fixed inset-0 z-[90] flex items-end justify-between p-8 bg-[#0B0B0C] text-[#EDEDED]" style={{opacity:n>=100?0:1,transition:'opacity .5s',pointerEvents:'none'}}><span className="h-lg">Pixel Chai</span><span className="h-xl">{n}%</span></div>}
